# Limitação conhecida: manutenção visual do EventBridge ainda depende de JavaScript

Data: 2026-09-11. Estado: **adiado; sem implementação, prazo ou compromisso neste incremento**. Público: Edney, UI/UX e Technical Art.

## Contexto e objetivo

O usuário quer que o time consiga atualizar a apresentação do jogo pelo editor sem ser especialista em JavaScript. Autorizou implementar os cinco parâmetros de foco e pediu registrar o restante das oportunidades para retomada futura.

A [análise de autoria](../design/2026-09-11-eventbridge-parametros-de-autoria.md) contém o levantamento técnico. A [spec vn-focus-parameters](../../planos/tasks/vn-focus-parameters/spec.md) delimita o incremento dos cinco controles. Este known issue guarda exclusivamente o trabalho remanescente; não reabre textos narrativos ou regras da campanha.

## O que já fica fora desta pendência

Escurecimento dos ouvintes, escala dos ouvintes, escala do falante, recuo e duração da troca de foco têm configuração global no EventBridge. Os comandos Focus indicam apenas a posição. A autoria de textos continua em Show Text/Show Choices, já compreendida e aceita pelo usuário. Imagem e base de entrada dos bustos continuam nos eventos.

A ampliação de participantes e uma possível evolução do VNPictureBusts têm [registro próprio](KI-20260911-bustos-participantes-e-foco-por-posicao.md), incluindo a futura preservação desses cinco controles. Não são pré-requisitos das oportunidades abaixo.

## Pendências de manutenção

| Área | Dependência atual de JavaScript | Proposta para discussão futura | Cuidados e consumidores |
| --- | --- | --- | --- |
| Recortes do memorial | `memorialCrops`, oito retângulos por herói; `memorialBustCrop`, expansão derivada | Formulário por herói com X, Y, largura e altura; ajustes de expansão se houver necessidade | Prioridade sugerida quando os PNGs forem padronizados. O catálogo deve continuar determinando identidade e ordem dos mortos; reordenar configurações de arte não pode mudar a campanha. Validar limites no bitmap e composição do memorial. |
| Destaque de navegação | `focusSettings`, tom selecionado +65 e normal 0 | Intensidade numérica num grupo de estilo da interface | Distinguir navegação, participante selecionado para o grupo e falante da conversa. Não usar o parâmetro dos ouvintes para todos esses estados. |
| Opções indisponíveis | Tom -70/-70/-70 com cinza 180; opacidade 100 para Partir | Campos de escurecimento, cinza e opacidade do estilo indisponível | Habilitação continua nas regras. Rotas e Partir não usam necessariamente a mesma opacidade; preservar distinções até aprovação de UI/UX. |
| Imagens criadas pelo plugin | Nomes `Dryland_Tag`, `Dryland_Panel`, `Dryland_Button`, `Dryland_Approach` e `Dryland_EncounterTitle` | Seletores de arquivo em `img/pictures` | Mapear todas as referências nos eventos e no plugin antes da troca. Dimensões, âncoras e área clicável precisam continuar coerentes. |
| Rótulos da interface | Strings como Conversar, Selecionar, Retirar do grupo, Destinos, Elenco, Partir e Fechar | Fonte editorial única ou grupo de campos de texto da interface | O mesmo significado aparece no desenho e nas escolhas. Não criar duas cópias editáveis. Não mover parágrafos narrativos para parâmetros. |
| Tipografia e margens | Tamanhos 16/18/20/22/28 e margem de PictureText 8 | Papéis de estilo, por exemplo legenda, corpo, botão e título | Fonte geral já pertence às configurações nativas/MessageCore. Validar medidas, quebra de linha e legibilidade, evitando constantes individuais sem contexto. |
| Layout de componentes | Coordenadas de painéis, lista de abordagens, aviso e botão de skip | Grupos por componente ou autoria nativa, conforme a responsabilidade de cada tela | Posição, tamanho, texto e interação precisam mudar juntos; não oferecer dezenas de números que o time precise coordenar manualmente. |
| Layout dinâmico do memorial e sacrifício | Colunas, espaçamentos e alturas calculados no plugin e projetados para variáveis | Perfis de layout por tela, com campos compreensíveis | Testar quantidades diferentes de participantes/mortos e consumidores nos Common Events; não alterar tamanho do grupo ou elegibilidade. |
| Fundos de destinos | Associação de rota a Church/Figtree/Council em Observe | Seletores de imagem por destino, se for a autoridade adequada | Conferir mudanças de fundo narrativas e referências nos eventos. Um parâmetro global não deve sobrescrever a intenção de uma cena. |

As âncoras de código estão no [Dryland_EventBridge](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js), especialmente `showFormation`, `showPanel`, `observeMemorial`, `Observe`, `setupChoices`, `Window_DrylandNotice` e `Window_DrylandSkip`. Revalidar o levantamento ao retomar: não congelar números de linha como contrato.

## Limites da proposta

Não promover a parâmetros IDs de variáveis/pictures/Common Events, checkpoints, formato de saves, guards de propriedade, elegibilidade ou estados de campanha. Esses valores e comportamentos são contratos compartilhados, não ajustes visuais independentes. Também não flexibilizar o desaparecimento dos mortos durante um segundo, confirmado no GDD, sem decisão de produto específica.

Controles já oferecidos por plugins nativos devem ser avaliados no seu próprio local de configuração. Por exemplo, MessageVisibility oferece a tecla de HIDE, mas o EventBridge também reconhece Tab diretamente; o skip usa S e um rótulo que inclui a tecla. Remapeamento exige unificar os consumidores, não acrescentar um campo isolado. A largura e as linhas da mensagem também têm escritas em eventos/plugins que precisam ser mapeadas antes de uma configuração global.

Nenhum PNG deve ser modificado automaticamente por esta pendência. O GDD canônico preserva a autoridade de design e a distinção entre confirmado, baseline de protótipo e pendente.

## Gatilho e roteiro para retomada

Retomar quando uma tarefa real de arte ou UI/UX exigir abrir JavaScript para um ajuste recorrente. Começar pelo componente que bloqueia essa tarefa, evitando transformar o levantamento inteiro num único pacote.

1. Descrever a operação que a pessoa precisa executar no editor, com exemplo concreto.
2. Mapear leitores e escritores do valor no plugin, eventos e plugins fornecedores.
3. Escolher uma única autoridade editável e campos numéricos, seletores de arquivo ou formulários; nenhum campo deve exigir JavaScript ou arrays manuais.
4. Separar identidade/regra de domínio dos dados de apresentação e definir a política de save quando houver impacto.
5. Criar uma spec incremental com migração, defaults equivalentes e validação clara.
6. Demonstrar a edição pelo fluxo do time, verificar a tela real e registrar limitações remanescentes.

Os critérios de aceitação devem incluir parâmetros inválidos, assets ausentes, componentes com textos longos, layouts com quantidades diferentes, navegação e Continue quando aplicável. Usar as suítes canônicas existentes e evidência visual para composição; não substituir verificação da tela por uma asserção de número.

Momento de devlog futuro: mostrar um ajuste de recorte ou estilo no editor e o resultado correspondente no jogo sem editar JavaScript. Capturas devem usar as artes vigentes naquela implementação.

## Estado do registro

Este documento registra trabalho futuro solicitado pelo usuário. Não houve implementação ou playtest destas oportunidades, alteração de plugin VisuStella, criação de cards remotos ou aprovação antecipada dos respectivos designs. O estado técnico dos cinco parâmetros pertence à verificação da sua spec, não a este backlog local de limitações.
