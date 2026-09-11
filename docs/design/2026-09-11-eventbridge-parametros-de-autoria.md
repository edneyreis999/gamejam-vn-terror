# EventBridge: parâmetros para manutenção pelo editor

Análise de 2026-09-11 para Edney e a equipe de autoria, UI/UX e arte. **Proposta técnica, sem implementação ou aprovação de novo comportamento.** Objetivo: permitir ajustes recorrentes de apresentação sem exigir edição de JavaScript.

Desdobramento posterior nesta mesma data: o usuário autorizou os cinco parâmetros. O incremento [vn-focus-parameters](../../planos/tasks/vn-focus-parameters/spec.md) e sua [verificação](../../planos/tasks/vn-focus-parameters/verification.md) registram a implementação. As demais oportunidades estão no [known issue de manutenção visual](../known-issues/KI-20260911-eventbridge-manutencao-visual-no-editor.md). A análise abaixo conserva as propostas e constatações do momento anterior à implementação.

## Recomendação

Criar um grupo **Bustos — Foco da conversa** nos parâmetros do `Dryland_EventBridge`, com cinco controles: escurecimento dos ouvintes, escala dos ouvintes, escala do falante, recuo dos ouvintes e duração da troca de foco. Os quatro ajustes de estilo já existentes saem dos comandos individuais; o multiplicador próprio do falante é uma capacidade nova, inicialmente em 100% para preservar a apresentação atual.

O evento passa a indicar somente **qual posição fala**. Imagem, escala base, posição da entrada, sequência de falas e saída continuam na autoria nativa. O plugin aplica o estilo global e o usa também na reconstrução após Continue ou retorno de Opções.

Não recomendo transformar todas as constantes do EventBridge em parâmetros. Cada controle deve corresponder a uma tarefa compreensível do editor. IDs internos, regras da campanha, validações e mecanismos de save continuam responsabilidade da programação.

## Evidências locais e limites desta análise

Foram inspecionados o [EventBridge](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js), seus consumidores nativos, o cabeçalho público do VNPictureBusts instalado, a configuração dos plugins, o validador de conteúdo e o mecanismo de revisão nativa. Referências de autoridade: [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md), [spec entregue de foco por posição](../../planos/tasks/vn-slot-authorship/spec.md) e [guia de autoria](../../rpg-maker/README.md#editar-bustos-e-foco-dos-diálogos).

Constatações no estado consultado:

- `Dryland_EventBridge` está ativo, após `Dryland_CampaignRules` e os plugins VisuMZ usados pela apresentação. Sua configuração em [plugins.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins.js) é `parameters: {}`; o cabeçalho declara comandos, mas nenhum `@param`.
- Existem **sete comandos Focus publicados**, nos Common Events 68–72, 74 e 79. Todos repetem `listenerScale=90`, `listenerTone=[-24,-24,-24,0]`, `offset=16` e `duration=20`. O CE79 é neutro, mas ainda armazena os mesmos argumentos.
- `validFocusCommand` exige exatamente esses argumentos mais `slot`. `focusedTargets` calcula o estilo a partir deles. O callback de Focus e `deriveVisualComposition` usam esse cálculo; `transformCommands` produz as operações nativas.
- O VNPictureBusts já oferece parâmetros de tom claro/escuro, escala e âncora. O foco do EventBridge emite **Tone_CustomToneBust**, Scale e Move com valores próprios. Alterar o preset de tom escuro do fornecedor não é a fonte do escurecimento desta conversa.
- Há configurações de apresentação fixadas em JavaScript fora dos bustos: recortes do memorial, estilos de botões, imagens de interface, fontes, textos de interface e parte do layout.

As localizações por função são preferíveis a números de linha porque o plugin está em evolução. Nenhuma alteração de runtime, PNG, texto narrativo ou regra foi realizada nesta análise. Não houve novo playtest nem teste de uma implementação de parâmetros; ela ainda não existe.

## Controles propostos para a primeira alteração

| Nome no Plugin Manager | Valor inicial | Significado para quem edita | Origem atual |
| --- | --- | --- | --- |
| Escurecimento dos ouvintes | 24 | Quanto maior, mais escuros ficam os participantes que escutam; zero não escurece | `listenerTone` nos sete comandos |
| Escala dos ouvintes (%) | 90 | Tamanho enquanto escutam, relativo à escala base da entrada | `listenerScale` nos sete comandos |
| Escala do falante (%) | 100 | Tamanho enquanto fala, relativo à escala base da entrada | Hoje o fator é implicitamente 100%; nova capacidade |
| Recuo dos ouvintes (pixels) | 16 | Afastamento horizontal em relação à posição base enquanto escutam | `offset` nos sete comandos |
| Duração da troca de foco (frames) | 20 | Tempo da mudança de escala, posição e tom entre falantes | `duration` nos sete comandos |

Para escurecimento, recomendo **um campo numérico de 0 a 255**, em vez de exigir que o time escreva `[-60,-60,-60,0]`. O plugin deriva o tom `[-intensidade,-intensidade,-intensidade,0]`. São unidades de tom, não porcentagem de luminosidade nem alteração de opacidade. A escolha preserva exatamente o tom atual com o valor 24. Ajustes artísticos de cor e dessaturação podem justificar campos separados no futuro; não há uso publicado que exija isso agora.

Os limites atuais de escala do ouvinte (1–100), recuo (0–100) e duração (0–60) podem ser preservados na primeira migração. Para o novo fator de falante, uma faixa inicial proposta de 100–150 permite ampliação moderada; esse limite é uma recomendação de interface ainda sujeita à validação visual. Nenhuma faixa numérica garante por si só que a arte não será cortada.

Exemplo com entrada base de 60% no Conselho: falante em 110% resulta em 66% da imagem; ouvinte em 90% resulta em 54%. Com entrada de 100% na taverna, os mesmos fatores resultam em 110% e 90%. O tamanho de escuta não deve depender do tamanho aumentado do falante nem do último quadro da animação.

O foco neutro continua devolvendo todos à base, sem escurecimento ou aumento. Um foco para posição autorizada vazia continua sem efeito. Andirá mantém a exceção atual de não receber recuo horizontal. A preferência de movimento reduzido e a reconstrução usam duração zero, preservando os alvos configurados.

## Como o time usaria

```text
Plugin Manager → Dryland_EventBridge → Bustos — Foco da conversa
    Escurecimento dos ouvintes: 60
    Escala dos ouvintes: 90
    Escala do falante: 110
    Recuo dos ouvintes: 16
    Duração da troca de foco: 20

Database → Common Events → conversa
    Entrada da imagem + escala base + posição base
    Chamar foco da posição que fala
    Show Text
```

Os nomes dos parâmetros devem estar em português, com unidade, valor padrão e uma frase explicativa. O evento não deve mostrar opções de estilo que deixaram de ter efeito. Não introduzir campos de JavaScript, expressões `eval` ou edição manual de JSON na rotina do time.

Proposta para este primeiro incremento: **um estilo global, sem substituição por cena**. Assim não existe um valor escondido num evento anulando a escolha feita no Plugin Manager. Caso uma cena realmente precise de estilo diferente, avaliar depois um preset nomeado e explícito; não manter duas autoridades por antecipação.

As alterações são carregadas ao reiniciar/recarregar o jogo. Não há necessidade demonstrada de recarga dinâmica dos parâmetros durante uma partida aberta. A validação de autoria deve ser disponibilizada por uma ação de ferramentas compreensível para o time, sem exigir alteração de código. Os comandos de revisão já documentados continuam sendo uma dependência operacional até existir essa interface; parâmetros sozinhos não eliminam essa etapa.

## Outras oportunidades encontradas

Estas são oportunidades de manutenção, não um pacote implicitamente aprovado. A primeira alteração de foco pode ser entregue sem executar as demais.

| Área | O que está fixo hoje | Destino recomendado | Prioridade e impacto |
| --- | --- | --- | --- |
| Recortes dos oito retratos do memorial | `memorialCrops`: retângulos por H1–H8; `memorialBustCrop`: expansão derivada | Grupo avançado de arte com formulários por herói, campos X/Y/largura/altura; expansão separada se necessária | Alta oportunidade para a próxima etapa: trocar os PNGs pode exigir recalibrar estes recortes, mesmo após os diálogos estarem corretos. |
| Destaque de escolhas | `focusSettings`: tom selecionado +65 e normal 0 | Grupo Estilo da interface, com intensidade numérica | Boa candidata posterior. Afeta botões/seleção de navegação, não o falante nem a participação no grupo. |
| Aparência de opção indisponível | Tom `[-70,-70,-70,180]`; opacidade 100 no botão Partir | Campos numéricos de escurecimento, cinza e opacidade por estilo | Boa candidata posterior, preservando a regra de habilitação. Rotas e Partir têm usos diferentes de opacidade; não homogeneizar sem intenção. |
| Imagens de interface criadas pelo plugin | `Dryland_Tag`, `Dryland_Panel`, `Dryland_Button`, `Dryland_Approach`, `Dryland_EncounterTitle` | Seletores de arquivo em `img/pictures`, quando o plugin for a autoridade daquela imagem | Útil para arte. Inspecionar também referências nos eventos, dimensões e áreas clicáveis; mudar somente uma referência não resolve duplicação. |
| Rótulos de interface gerados pelo plugin | Conversar, Selecionar, Retirar do grupo, Destinos, Elenco, Partir, Fechar e outros | Grupo de textos da interface ou fonte editorial própria, com uma chave por significado e uso compartilhado | Útil para revisão de interface. Rótulos duplicados entre desenho e escolhas devem usar a mesma fonte. Não incluir falas narrativas aqui. |
| Tipografia de interface | `\\FS[16/18/20/22/28]`, fonte 22 no aviso, margem de PictureText 8 | Papéis de estilo: legenda, corpo, botão, título; campos de tamanho/margem | Evolução de UI/UX que exige verificar caixas e quebras de linha. A fonte geral já pertence às configurações nativas/MessageCore. |
| Layout gerado pelo plugin | Painel 640/320, escolhas em 640/375 com passo 115, aviso 160/12/960/90, botão de skip 846/12/418/62 | Grupos por componente ou autoria nativa quando couber, com campos visuais e limites | Maior custo. Não expor cada número isolado: posição, tamanho, texto e clique precisam mudar juntos. |
| Memorial e palco dinâmicos | Memorial com quatro colunas, passo 310, alturas 300/180; candidatos com passo 340 e Y 350/585 | Perfis de layout por tela após definir quem é a fonte | Não é um ajuste global simples. As posições alimentam variáveis e eventos; exige preservar o cálculo para quantidades diferentes. |
| Fundos de destinos gerados no plugin | physical/Church, supernatural/Figtree, final/Council em Observe | Seletores de imagem por destino, somente após unificar com a autoria dos mesmos fundos nos eventos | Oportunidade secundária; não criar uma fonte global que conflite com mudanças de fundo narrativas. |

Nos recortes do memorial, os valores atuais também fornecem a lista usada para ordenar/selecionar mortos. Ao extrair os recortes, a identidade e ordem dos heróis precisam continuar vindo do catálogo da campanha. Reordenar a lista de configuração visual não pode mudar quem aparece nem o significado dos registros de morte. É um exemplo de por que mover um objeto JavaScript diretamente para um parâmetro JSON não basta.

Para os campos de arquivo, usar seletores do editor; para recortes e estilos, formulários estruturados com números. Um parâmetro tecnicamente editável que exige interpretar arrays, códigos de heróis ou fórmulas ainda transfere trabalho de programação ao time.

## O que manter fora dos parâmetros do EventBridge

| Item | Lugar adequado / motivo |
| --- | --- |
| Falas e escolhas narrativas | Show Text/Show Choices nos Common Events, conforme a autoria já aceita. Nenhuma ação solicitada nesta área. |
| Imagem e transformação base de uma entrada de diálogo | Comandos nativos daquela cena; não duplicar coordenadas por personagem num catálogo global. |
| Duração de entrada/saída de uma cena | Comandos nativos existentes. O parâmetro proposto controla a troca de foco, não todas as animações do jogo. |
| Esperas que fazem parte da narrativa | Eventos; não confundir ritmo da cena com estilo de foco. |
| Novos participantes e conjuntos de slots | Permanecem no [known issue adiado](../known-issues/KI-20260911-bustos-participantes-e-foco-por-posicao.md). Não ampliar composições nesta análise. |
| Picture IDs reservados, IDs de variáveis/Common Events, marcadores de seções | Contratos de integração referenciados por vários consumidores. Expor um número sem migrar todos eles cria configuração que quebra o jogo. |
| Heróis válidos, elegibilidade, tamanho do grupo, fases, escolhas permitidas | Regras de domínio e catálogo, não estilo visual. |
| Checkpoints, formato do save, ownership, cancelamento, Retry e proteção de inputs | Invariantes de execução, não opções de personalização. |
| Desaparecimento de mortos na taverna durante um segundo | Comportamento confirmado no GDD, não candidato livre a alteração de duração neste incremento. |
| HIDE, remapeamento de teclas, opções de leitura/áudio | Conferir primeiro os plugins que já possuem esses controles. Não duplicar configurações em outro plugin. |

Exemplo de dependência que impede uma promoção isolada: o EventBridge reconhece Tab diretamente, enquanto MessageVisibility possui `ToggleKey`. O skip usa a tecla S e um rótulo que inclui “(S)”. Permitir mudar teclas exige unificar reconhecimento, instruções visíveis e configuração existente. Um campo de número de tecla no EventBridge não resolveria a manutenção.

Outro caso: Observe closing força quatro linhas e largura 1280 na janela de mensagem. Transformar esse ponto em parâmetro sem revisar as demais cenas poderia fazer o ajuste funcionar no Conselho e ser sobrescrito em outro trecho. A configuração precisa seguir a autoridade de layout da mensagem em todo o fluxo.

## Estratégia técnica para os parâmetros de foco

### Uma configuração, dois consumidores

| Informação | Fonte | Leitura e duração | Persistência |
| --- | --- | --- | --- |
| Estilo global de foco | Plugin Manager, salvo em plugins.js | Decodificado e validado uma vez na inicialização; usado pelo executor e pelo redutor | Configuração do projeto; não copiar para a campanha |
| Imagem e base da entrada | Common Events | Comandos nativos; base transitória da conversa | Autoria do projeto; recomposta após load |
| Posição que fala | Comando Focus da seção | Aplicação do comando e reconstrução até a caixa atual | Segue o cursor nativo e a autoria, sem nova variável global |
| Alvos animados, caches e dono da conversa | Derivados das fontes anteriores | Transitórios, descartados no encerramento/retomada | Não acrescentar ao envelope da campanha |

Criar uma função pura para decodificar/validar a configuração e produzir um objeto imutável. O navegador fornece os parâmetros do Plugin Manager; o CLI e os testes fornecem a configuração do projeto por um carregador apropriado. `focusedTargets` e `deriveVisualComposition` recebem o mesmo estilo resolvido. Não fazer o redutor depender de um `PluginManager` global nem criar defaults diferentes nos testes.

As entradas são strings no arquivo de plugins, mesmo para campos numéricos. Ausência numa instalação que ainda não tenha salvo os novos campos pode usar os defaults documentados; um valor explícito inválido deve gerar diagnóstico identificando plugin, grupo, campo e limite. Evitar trocar silenciosamente uma configuração inválida por 24/90/100. Em uma futura versão, uma estrutura incompleta causada por erro deve ser distinguida da migração deliberada de campos ausentes.

O [validador atual](../../rpg-maker/tools/validate-content.mjs) lê CommonEvents, System, assets e manifesto, mas não valida parâmetros de plugins. Ele precisa passar a ler e validar a configuração pertinente sem executar o conjunto de plugins de runtime. A inicialização do navegador e o CLI devem recusar os mesmos valores, com mensagem compreensível para quem usa o editor.

### Migração dos eventos

1. Introduzir os parâmetros com os valores atuais e fator de falante 100, para equivalência inicial.
2. Simplificar o comando Focus para guardar apenas a posição e migrar suas sete ocorrências publicadas, incluindo Andirá e foco neutro. Manter os auxiliares 68–79 e suas chamadas; esta mudança não precisa reduzir mais Common Events.
3. Atualizar `validFocusCommand`, o cálculo de alvos, o executor e o redutor. Migrar fixtures e argumentos usados pelos testes canônicos. Procurar chamadas também em maps e outros dados suportados antes de concluir a migração.
4. Remover do editor os argumentos de estilo antigos. Não mantê-los visíveis enquanto o runtime os ignora. Uma forma antiga encontrada após a migração deve ser apontada pela validação, com orientação para atualizar o comando.
5. Atualizar revisão nativa, documentação e evidência. Os comentários 657 do editor e as referências das seções precisam permanecer consistentes.

A comparação da migração deve comprovar que os defaults geram os mesmos targets para todas as composições publicadas. Depois disso, uma configuração não padrão demonstra que o time controla o resultado pelo Plugin Manager, sem modificar outro arquivo manualmente.

### Saves e aplicação de mudanças de estilo

O manifesto atual calcula revisão a partir dos JSON nativos de dados; não inclui `plugins.js`. A primeira migração modifica comandos serializados e precisa de revisão nativa nova, conservando saves incompatíveis conforme o contrato existente.

Para edições posteriores apenas nesses cinco parâmetros visuais, recomendo **recompor usando o estilo atual do projeto**, sem invalidar o progresso por mudar escurecimento. Essa é uma política proposta para a spec, ainda não um comportamento verificado. Uma mudança de estilo não deve ser confundida com uma mudança estrutural de comando ou conteúdo.

O estilo resolvido precisa constar nos fingerprints de QA/fixtures para impedir reutilizar evidência visual de uma configuração diferente. Não adicionar indiscriminadamente todo `plugins.js` ao bloqueio de saves: isso faria uma alteração visual potencialmente inutilizar progresso sem necessidade. A compatibilidade deve distinguir configuração cosmética, estrutura nativa e regras de campanha.

### Estados e transições a preservar

| Situação | Resultado proposto |
| --- | --- |
| Abrir conversa | Entradas estabelecem bases; Focus usa o estilo global atual |
| Alternar falante | Alvos derivados novamente das bases, sem acumular redução |
| Repetir foco | Mantém alvo e não reinicia animação idêntica |
| Foco neutro | Base e tom normal para todos, sem multiplicador de falante |
| Focar slot permitido vazio | Nenhuma mudança na composição |
| Focar slot alheio ou sem dono | Rejeição existente, sem efeito em pictures externas |
| Continue/Opções/skip | Mesma configuração do executor, redução da autoria até a caixa atual, sem repetir efeitos narrativos |
| Movimento reduzido | Mesmos alvos configurados, duração zero |
| Fechar/cancelar conversa | Limpeza dos participantes e dos caches existentes |

## Verificação necessária para uma futura implementação

- **Configuração:** campos do editor, limites, strings vazias/malformadas, defaults de migração, validação equivalente no CLI e navegador. Não basta mudar o `@default` do cabeçalho.
- **Equivalência:** manter 24/90/100/16/20 produz o resultado atual, inclusive Council/Andirá, neutro e posições vazias.
- **Mudança real:** com intensidade 60, ouvinte recebe `[-60,-60,-60,0]`; com escala de falante 110, escala base 60 resulta em 66, sem alterar a base.
- **Retomada:** usar configuração não padrão e verificar execução normal, Opções e Continue no mesmo trecho. Verificar também retomada de save estruturalmente compatível após trocar somente o estilo.
- **Integração:** repetir foco, alternar participantes, HIDE, reduced motion, skip, cancelamento e pictures externas. Reutilizar as suítes canônicas, especialmente UT071/072 e IT067/068; não copiar cobertura para uma suíte paralela.
- **Autoria pelo time:** abrir Plugin Manager, mudar um número, salvar e testar sem editar JavaScript ou JSON. A prova deve incluir diagnóstico de um parâmetro inválido e identificação da configuração a corrigir.
- **Visual:** conferir texto, escala e recuo nos dois tamanhos de área suportados. O fator novo de falante exige verificação de sobreposição e corte; a padronização futura dos PNGs continua fora de implementação automática.

## Sequência sugerida e decisões pendentes

Primeiro, entregar o grupo de foco com os cinco controles, um estilo global e defaults equivalentes. Depois, avaliar recortes do memorial e estilos de interface como incrementos próprios, priorizados pela dificuldade real de manutenção. Textos narrativos e novos participantes não entram nessa sequência por instrução do usuário.

Para transformar esta análise em spec, ficam explícitas três propostas a confirmar no fluxo de design: intensidade numérica em vez de tom RGB livre; ausência inicial de substituições por cena; uso do estilo atual ao retomar saves estruturalmente compatíveis. O multiplicador de falante também deve ser nomeado como capacidade nova, não como simples movimentação de um valor já configurável.

O critério de sucesso é o time conseguir explicar onde ajustar cada coisa: **estilo comum no Plugin Manager; conteúdo e composição da cena nos eventos; programação para criar capacidades novas e manter os contratos internos**. Aumentar o número de parâmetros, sozinho, não mede autonomia de autoria.
