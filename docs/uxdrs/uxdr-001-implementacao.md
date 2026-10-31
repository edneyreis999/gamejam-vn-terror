# UXDR-001 — acompanhamento da implementação

Estado: **implementação e verificação técnica concluídas sobre o pacote 1.6.1. Telas de áudio, configurações gerais, menu principal, taverna, caixa de diálogo (incluindo a correção do padding do falante), ações do personagem, seleção de destino, escolha de abordagem de armadilha, fogueira, seleção de herói para sacrifício, despedida, escolha do medalhão, memorial, créditos, Salvar/Carregar e título aceitas. Pendências atuais discriminadas abaixo.**

## Revisão — fundos dos oito epílogos, 2026-10-31

A pedido do usuário, substituídos os oito fundos pretos pelas ilustrações individuais preservadas no histórico e referenciadas no GDD. Os PNGs de `Dryland_EpilogueH1` a `Dryland_EpilogueH8` foram recuperados de `c654c78`, com SHA-256 idêntico ao manifesto `rpg-maker/asset-provenance/approved-narrative-epilogues.json`. Os fundos pretos haviam sido introduzidos em `4faacfa`, após a troca das artes individuais em `8fb5daf`.

Correspondências conferidas: Gorvak na forja; Elowen orientando batedores no rio; Griznik na oficina; Seraphina na casa de cura; Bimbren no posto de mensageiros; Liora preparando o atlas; Vaelith no arquivo; Draska na reconstrução da mina. Preservadas as artes integrais, as proporções e as associações nativas nos mapas 29–36. Nenhuma alteração de código, texto, eventos, elegibilidade ou saves. Não foi necessário gerar novas imagens. Aceite visual desta revisão pendente.

Conferido no navegador do Codex, por carregamento nativo do Arquivo 1 e avanço até Seraphina: fundo visível, Ocultar exibindo a arte integral e Tab restaurando a mesma fala. [Captura para avaliação](assets/uxdr-001/runtime/epilogo-seraphina-fundo-restaurado.png). As outras sete artes foram inspecionadas como arquivos e suas associações aos mapas conferidas; não se declara nova jornada de runtime para cada herói. Momento demonstrável: a casa de cura ao fundo e a alternância de Ocultar. Os assets permanecem nos nomes nativos carregados pelo jogo; não há novo recurso de preset ou geração de imagens.

## Aceite visual — título do jogo, 2026-10-31

O usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de título. A aprovação abrange a composição em duas linhas com Cinzel Decorative exclusiva do título, cor clara com contorno bordô e menu sobre pergaminho. [Captura aceita](assets/uxdr-001/runtime/titulo-cinzel-decorative.png). As pendências desta tela nas propostas históricas abaixo ficam resolvidas. O aceite corresponde à tela em PT apresentada e não amplia a cobertura técnica ou o aceite das variantes em EN.

### Histórico da proposta

Próxima tela apresentada após este aceite: [epílogo de Seraphina](assets/uxdr-001/runtime/epilogo-apos-aceite-titulo.png), alcançado pelo carregamento nativo do Arquivo 1 e avanço das falas do encerramento e memorial. A composição permanece pendente de aceite; a área superior está preta, sem ilustração visível. Nenhum arquivo foi sobrescrito nesta apresentação.

Refinamento solicitado pelo usuário: usar **Cinzel Decorative apenas no título do jogo**. Aplicado às duas linhas, pelo alias existente CoretoCinzel, preservando as fontes dos demais componentes. Esta revisão substitui a escolha de Averia da proposta abaixo. Conferido em PT no navegador do Codex, sem cortes ou sobreposição: [título com Cinzel Decorative](assets/uxdr-001/runtime/titulo-cinzel-decorative.png). Bundle e manifesto sincronizados; sintaxe conferida. A composição continua aguardando aceite visual.

Solicitado aproximar o título da linguagem da marca. Proposta implementada para avaliação: Averia Libre já configurada no papel Title, duas linhas centralizadas (Afogados / em Terra Seca), hierarquia de 84/44 px e pergaminho claro #F4E3BF com contorno bordô #360A0B. O fundo e o menu permanecem na composição existente. O adaptador identifica a imagem de título e fornece as linhas localizadas; o desenho fica no Design System, sem alterar eventos, controles ou saves. Textos PT/EN no Languages.tsv e no perfil do pacote.

Conferido o título em PT após recarregar no navegador do Codex: [proposta para avaliação](assets/uxdr-001/runtime/titulo-tipografia-revisada.png). EN ainda sem inspeção visual nesta revisão. Sintaxe e diff conferidos; pacote, consumidor e manifesto sincronizados. Revisão deslop restrita ao incremento, sem teste de aparência. **Proposta pendente de aceite**, não incorporada às decisões confirmadas do UXDR. Momento demonstrável: abertura da tela de título com a nova hierarquia tipográfica.

## Aceite visual — configurações gerais, 2026-10-31

O usuário declarou “Agora ficou bom!” e autorizou registrar o aceite de Configurações gerais. A aprovação abrange Idioma e Efeitos de texto com opções explícitas Desligado/Ligado, lacre no valor ativo e composição compartilhada. [Captura aceita](assets/uxdr-001/runtime/configuracoes-efeitos-ligado-desligado.png). As pendências visuais desta seção nas iterações abaixo ficam resolvidas, sem ampliar a cobertura técnica. Áudio permanece aceito.

Próxima tela apresentada pelo retorno nativo ao menu inicial: [tela de título](assets/uxdr-001/runtime/titulo-aceite-pendente.png), ainda aguardando aceite visual.

## Revisão — opções explícitas de efeitos de texto, 2026-10-31

A pedido do usuário, Efeitos de texto apresenta Desligado/Ligado, com lacre no valor ativo e divisória compartilhada, seguindo a linha de Idioma. Cliques nos valores escolhem diretamente o estado; repetir o clique no estado ativo não o inverte. O provedor continua executando as mudanças e mantendo o mesmo booleano persistido. Setas esquerda/direita conservadas. Traduções Off/On incluídas no Languages.tsv e no perfil do pacote.

Conferidos no navegador do Codex os dois estados por mouse, repetição do clique em Desligado e setas esquerda/direita. Restaurado Ligado, valor inicial. [Captura para aceite](assets/uxdr-001/runtime/configuracoes-efeitos-ligado-desligado.png). Aceite visual pendente. Sintaxe aprovada; pacote, bundle e manifesto sincronizados, preview do preset com zero alterações. Revisão deslop restrita ao incremento. Sem testes de aparência; EN e nova persistência após reinício não foram exercitados nesta revisão.

## Aceite visual — Salvar/Carregar, 2026-10-31

O usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de Salvar/Carregar. A aprovação abrange a composição compartilhada de arquivos apresentada em Carregar, com pergaminho unificado, divisórias, destaque da seleção e livro nos arquivos existentes. [Captura aceita](assets/uxdr-001/runtime/arquivos-revisao-final.png). O estado provisório registrado anteriormente fica resolvido; não houve gravação ou carregamento de arquivo nesta apresentação, nem ampliação da cobertura técnica.

Próxima tela apresentada: [Configurações — Geral](assets/uxdr-001/runtime/configuracoes-geral-aceite-pendente.png), com Idioma e Efeitos de texto. Aberta pelo menu inicial, sem alterar preferências. Aceite visual desta seção pendente; Áudio permanece aceito.

## Aceite visual — créditos, 2026-10-31

O usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de créditos. A aprovação corresponde à composição apresentada com personagem, pergaminho, texto dos créditos e controle de pular. [Captura aceita](assets/uxdr-001/runtime/creditos-aceite-pendente.png); o nome do arquivo conserva o estado anterior à aprovação. Este aceite não amplia a cobertura técnica registrada.

## Pendências atuais de avaliação visual — 2026-10-31

Esta lista consolida a conversa e prevalece sobre os apontamentos de aceite pendente das iterações históricas abaixo.

- **Epílogos:** o padding do falante foi aceito; a composição do encerramento, incluindo a área preta acima da caixa, não recebeu aceite específico.
- **Variantes de desfecho (destruir o medalhão e perda de todos os heróis):** não há aceite visual individual registrado nesta rodada. A aprovação da escolha do medalhão não aprova automaticamente as cenas resultantes. A tela de título foi aceita em 2026-10-31.

PT/EN, movimento reduzido e estados alternativos (como destino restante/bloqueado) são variações de conferência, não novas telas. A cobertura técnica histórica não constitui aceite visual humano dessas variações após os refinamentos. As telas já aprovadas não voltam a ficar pendentes por terem apontamentos antigos no histórico.

## Correção global — margem do nome do falante, 2026-10-31

**Aceite visual confirmado em 31/10/2026:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da correção do padding do nome do falante. A aprovação abrange o espaçamento apresentado na caixa de Seraphina e aplicado pelo componente compartilhado; não constitui aceite das demais telas de encerramento.

Próxima composição apresentada no navegador do Codex: [créditos](assets/uxdr-001/runtime/creditos-aceite-pendente.png), por avanço nativo dos epílogos. Aceite visual posteriormente confirmado na seção acima.

Ajustado o componente compartilhado Window_NameBox: margem adicional de 4 px em cada lado do desenho, largura compensada e altura mínima baseada na medição do texto com 8 px de folga vertical. A área reservada ao falante dentro do pergaminho cresce 8 px para separar nome e fala. Mantidos Averia Libre em 28 px e #360A0B, interpretação nativa dos nomes e controles do provedor. A correção alcança as caixas de diálogo que usam o componente compartilhado.

Fonte do pacote, bundle do jogo e manifesto sincronizados em 1.6.1. Sintaxe aprovada; preview de reaplicação do preset sem alterações. Revisão deslop restrita ao incremento, sem teste de aparência. Inspeção visual e aceite desta correção registrados separadamente dos aceites anteriores.

Conferido no navegador do Codex, após recarregamento e avanço nativo até o epílogo: nome de Seraphina visível por inteiro, incluindo o descendente de “p”, com espaço antes da fala. [Captura da correção](assets/uxdr-001/runtime/epilogo-seraphina-padding-falante.png). Inspeção em PT nesta caixa; não representa nova conferência individual de todas as cenas ou de EN. Aceite humano da correção confirmado acima. A área preta acima do diálogo permanece como já registrada no epílogo.

## Aceite visual — memorial, 2026-10-31

O usuário declarou “Agora ficou bom!” e autorizou registrar o aceite do memorial. A aprovação abrange as lápides lado a lado, os retratos emoldurados, as inscrições abaixo e o pergaminho único que inclui a frase e os controles do rodapé. Referência aceita: [memorial lado a lado](assets/uxdr-001/runtime/memorial-lado-a-lado.png). As pendências de aceite do memorial citadas no histórico ficam resolvidas para esta composição. O aceite não amplia a cobertura técnica registrada. Próxima tela apresentada por avanço nativo das falas do memorial: [epílogo de Seraphina](assets/uxdr-001/runtime/epilogo-seraphina-aceite-pendente.png), ainda sem aceite. Na captura, a área acima da caixa de diálogo aparece preta, sem ilustração visível.

## Revisão do memorial — distribuição original lado a lado, 2026-10-31

O usuário esclareceu que deseja a distribuição original lado a lado. Restaurados os valores nativos dos CE59/60 a partir do baseline do repositório: até quatro lápides por fileira, retrato emoldurado e inscrições nas posições originais. Removida a projeção de texto lateral do adaptador. Após inspeção, preservado o enquadramento superior da lápide sem desenhar o pedestal atrás das inscrições; posições e escalas nativas permanecem intactas. O pergaminho também alcança o topo das pedras. Preservado o pergaminho único, incluindo rodapé. Esta revisão substitui as composições experimentais abaixo; aceite visual pendente. Captura: [lápides lado a lado](assets/uxdr-001/runtime/memorial-lado-a-lado.png). Conferência em PT com cinco mortos; outras quantidades, EN e movimento reduzido não foram reinspecionados.

Mutação ensaiada em cópia descartável e idempotente; 177 comandos de apresentação restaurados, sem mudanças nos demais comandos ou eventos. Scripts temporários removidos, sintaxe aprovada, perfil sincronizado e manifesto atualizado. Verificadores nativos mantêm somente as falhas preexistentes no CE2 e CreditsPage. Revisão deslop restrita ao incremento, sem testes de aparência.

## Revisão do memorial — disposição anterior restaurada, 2026-10-31

A pedido do usuário, desfeita a coluna única: restauradas as coordenadas, escalas das lápides/retratos e dimensões das inscrições da composição anterior (duas colunas a partir de quatro mortos). Mantido o pergaminho único, incluindo frase e controles do rodapé. A tentativa abaixo permanece como histórico, sem aceite. Conferência em PT com cinco mortos por carregamento nativo do save: [composição restaurada](assets/uxdr-001/runtime/memorial-restaurado-pergaminho-unico.png). Outras quantidades, EN e movimento reduzido não foram reinspecionados nesta revisão.

CE59/60 alterados apenas nos valores de apresentação, com ensaio descartável e reaplicação idempotente. Perfil do pacote e do jogo sincronizados; sintaxe aprovada. Verificadores nativos continuam apontando somente as pendências preexistentes do CE2 e CreditsPage. Revisão deslop restrita à restauração; sem novos testes de aparência. Aceite visual pendente.

## Revisão do memorial — coluna única e rodapé integrado, 2026-10-31

Por solicitação do usuário, a lista passa a uma única coluna, com lápide/retrato à esquerda e inscrição à direita. A frase e os controles do rodapé compartilham o mesmo pergaminho; a janela nativa conserva texto, avanço e HIDE, mas não desenha uma segunda folha. Esta revisão substitui a distribuição em duas colunas descrita no histórico abaixo. Conferida no navegador do Codex com cinco mortos em PT, após carregamento nativo e animação de entrada: [captura](assets/uxdr-001/runtime/memorial-coluna-unica-rodape.png). Aceite visual pendente. Outras quantidades, EN e movimento reduzido não foram reinspecionados nesta revisão.

Coordenadas e escalas dos CE59/60 ajustadas, sem mudar comandos, dados de morte ou progressão. Mutação validada primeiro em cópia descartável, reaplicação idempotente, scripts removidos. Sintaxe e teste existente de projeção aprovados; verificadores nativos mantêm apenas os problemas anteriores no CE2 e CreditsPage. Pacote, perfil e bundle sincronizados em 1.6.1; revisão deslop restrita ao incremento, sem testes de aparência.

## Iteração de aceite — memorial em pergaminho unificado, 2026-10-31

Aplicada a referência de lápide/retrato à esquerda e inscrição à direita, sobre uma única folha, sem cartões individuais ou divisórias sobre o texto. Até três mortos ocupam uma coluna; de quatro a oito, duas colunas, conservando todos na mesma tela. O adaptador reaproveita a parte superior da lápide existente e os retratos aprovados; nenhum asset foi substituído. Nomes, causas e locais permanecem os registrados na campanha, sem incorporar as frases ilustrativas do anexo.

CE59 recebeu apenas coordenadas e escalas da composição; CE60 recebeu as escalas correspondentes dos retratos finais, inclusive no ramo de movimento reduzido. Estrutura dos eventos, elegibilidade, duração da animação e fluxo de encerramento preservados. As inscrições são projetadas sem as quebras de linha dos antigos cartões estreitos. O Design System compartilha uma folha entre as imagens e a mantém atrás dos retratos.

Conferência no navegador do Codex por carregamento nativo do save e avanço das duas falas do desfecho: cinco heróis, animação de entrada e composição estabilizada em PT. [Captura atualizada](assets/uxdr-001/runtime/memorial-pergaminho-unificado.png). **Aceite visual pendente.** EN, outras quantidades de mortos e movimento reduzido ainda não tiveram nova inspeção visual nesta iteração; não se declara nova jornada completa.

Mutações de dados ensaiadas em cópia descartável, reaplicação sem alteração e releitura verificadas; scripts temporários removidos. Sintaxe dos plugins, teste existente de projeção e validação do pacote aprovados. Preview do preset sem alterações. Verificadores nativos mantêm os problemas preexistentes já documentados no CE2 e no plugin CreditsPage ausente, sem apontamentos nos CE59/60. Revisão deslop restrita ao incremento; sem testes de aparência. Perfil, bundle e manifesto 1.6.1 sincronizados. Momento demonstrável: entrada dos retratos e leitura conjunta das inscrições no pergaminho.

## Iteração de aceite — medalhão central, 2026-10-31

Próxima tela apresentada: [memorial do encerramento](assets/uxdr-001/runtime/memorial-final-aceite-pendente.png), alcançado por confirmação nativa de “Reunir o medalhão” e avanço das falas do desfecho. **Aceite do memorial pendente.**

**Aceite visual confirmado em 31/10/2026:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de escolha do medalhão e apresentar a próxima tela. A aprovação abrange a composição central, a mesma gravação nos três estados, os controles de texto e as prévias com suas descrições. Referências: [duas metades](assets/uxdr-001/runtime/medalhao-duas-metades.png), [reunido](assets/uxdr-001/runtime/medalhao-reunido.png) e [fragmentado](assets/uxdr-001/runtime/medalhao-fragmentado.png). Este aceite não amplia a cobertura técnica registrada abaixo.

Direção solicitada pelo usuário registrada no UXDR e no GDD. Os dois controles agora são textos; a ilustração central usa uma única arte transparente, recortada em peças que conservam a mesma gravação. Sem foco, são duas metades; reunir aproxima as peças e destruir as fragmenta. Cada foco apresenta a consequência correspondente em PT/EN. Transição técnica de 420 ms, reversível a partir da posição atual; movimento reduzido aplica o destino diretamente.

O adaptador fornece arte, peças, estados e descrições; o Design System desenha a prévia e o pergaminho. Os índices, textos nativos de escolha e consequências dos eventos foram preservados. O primeiro foco desta tela fica vazio até a interação, evitando antecipar um desfecho. Não há handler de confirmação na ilustração nem estado novo no save.

Conferidos no navegador do Codex, após recarregar e retomar o save pelo menu: [duas metades](assets/uxdr-001/runtime/medalhao-duas-metades.png), [reunido](assets/uxdr-001/runtime/medalhao-reunido.png) e [fragmentado](assets/uxdr-001/runtime/medalhao-fragmentado.png). Setas alternaram as prévias com as descrições corretas; mover/clicar fora dos controles restaurou as metades sem confirmar desfecho. A revisão parou na escolha, sem executar nenhum final. PT inspecionado; EN e movimento reduzido implementados, ainda sem nova inspeção visual específica deste incremento.

Sintaxe dos dois plugins e `validate` 1.6.1 aprovados; preview de reaplicação com zero alterações. Suíte do pacote: 14 testes aprovados, 9 integrações condicionais não executadas, zero falhas. Ajustado apenas o mock da cobertura existente de projeção, para comportar o novo gancho de foco. Nenhum teste de aparência criado. Asset referenciado pelo plugin ativo e incluído no perfil/manifesto; não foi repetida a distribuição podada nesta iteração. Revisão deslop restrita ao incremento, sem reverter alterações anteriores.

Arte: `Dryland_Medallion.png`, gerada a partir da referência `Dryland_FinalReunite.png`: medalhão circular inteiro em ouro antigo, tinta sépia, ondas de rio, ramos e aro com rebites; fundo transparente, sem pergaminho, corrente, texto ou rachaduras. As rachaduras são recortes da mesma arte no runtime. A arte histórica permanece preservada.

**Aceite visual confirmado.** Momento demonstrável para o devlog: mostrar as metades em repouso, focar reunir, alternar para destruir e sair dos controles, mantendo os textos como únicas ações.

## Iteração de aceite — falante na despedida, 2026-10-30

**Aceite visual confirmado:** após a inclusão do nome do falante, o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de despedida e apresentar a próxima tela. Referência: [despedida de Gorvak com nome](assets/uxdr-001/runtime/despedida-nome-heroi.png). As pendências de aceite da despedida descritas no histórico abaixo ficam resolvidas.

Preenchido o campo nativo de falante nos oito eventos de despedida (CE282–289), com chaves `speaker.hero.h1`–`speaker.hero.h8` em PT/EN no `Languages.tsv`. A identificação reutiliza a caixa compartilhada de nome, sem alterar falas, decisões ou ordem dos eventos. Conferida a despedida de Gorvak após recarregar o arquivo nativo no navegador do Codex. [Captura corrigida](assets/uxdr-001/runtime/despedida-nome-heroi.png). **Aceite desta cena pendente.**

Diff limitado a oito campos de falante e oito chaves de nomes; JSON e diff conferidos, sem teste de aparência. Os verificadores gerais apontaram problemas preexistentes fora do incremento: plugin CreditsPage ausente, dois parâmetros numéricos e cinco erros de estrutura no CE2 (confirmado idêntico ao HEAD). Não se declara aprovação desses verificadores. Revisão deslop sem alterações adicionais.

## Iteração de aceite — nome do herói no sacrifício, 2026-10-30

**Aceite visual confirmado:** após a inclusão do nome do herói em hover/foco, o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela de seleção de herói para sacrifício e apresentar a próxima tela. A aprovação abrange a composição, o destaque dos heróis e a identificação do falante na caixa de diálogo. [Captura aceita](assets/uxdr-001/runtime/sacrificio-nome-heroi.png). As pendências de aceite desta tela citadas abaixo ficam resolvidas.

Próxima apresentação: [despedida após escolher Gorvak](assets/uxdr-001/runtime/sacrificio-despedida-revisao.png), aberta por ação normal do jogador na sessão de revisão. Esta cena ainda aguarda avaliação humana.

A prévia de fala agora apresenta o nome do herói em hover/foco, usando a caixa nativa de nome do falante e sua configuração compartilhada: Averia Libre, 28 px e `#360A0B`. O nome vem das variáveis já preenchidas pelo evento; a fala reserva a mesma faixa vertical das demais caixas de diálogo. Ao encerrar a prévia, o adaptador libera o nome que apresentou sem substituir um novo falante definido pela narrativa.

Conferida no navegador do Codex a troca de foco por teclado entre Bimbren e Griznik, com nome e fala correspondentes, sem confirmar sacrifício. Sintaxe e diff conferidos; revisão deslop restrita ao incremento. Não foram criados testes de aparência. [Captura para revisão](assets/uxdr-001/runtime/sacrificio-nome-heroi.png). **Aceite visual da seleção de sacrifício pendente.** Momento demonstrável: alternar entre heróis e observar nome, fala e expressão juntos.

## Iteração de aceite — fogueira, 2026-10-30

**Aceite visual confirmado:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da fogueira e apresentar a seleção de herói para sacrifício. A aprovação inclui a composição e o botão “Voltar à taverna” no mesmo padrão de “Menu” e “Continuar”. [Captura aceita](assets/uxdr-001/runtime/fogueira-retorno-botao.png). A pendência de aceite descrita abaixo está resolvida; a seleção de sacrifício permanece pendente.

“Voltar à taverna” recebeu o feedback compartilhado de botão: sublinhado em repouso e pena, halo e ampliação no foco. A exceção que removia feedback da imagem 40 agora se restringe ao contador de integrantes no mapa da taverna; ela não se aplica ao botão da fogueira. Perfil e adaptador do jogo sincronizados, manifesto atualizado, sintaxe e diff conferidos; reaplicação em preview sem alterações. Verificados repouso e foco por teclado no navegador, sem acionar o retorno. [Captura](assets/uxdr-001/runtime/fogueira-retorno-botao.png). Aceite visual pendente.

## Iteração de aceite — abordagens de armadilha, 2026-10-30

**Aceite visual confirmado:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite e avançar. A aprovação inclui composição, destaque das imagens, legibilidade de “Ocultar” e orientação persistente no topo durante HIDE. As pendências de aceite desta tela mencionadas no histórico abaixo ficam resolvidas. Evidências: [tela aceita](assets/uxdr-001/runtime/abordagens-ocultar-legivel.png) e [orientação aceita](assets/uxdr-001/runtime/abordagens-hide-orientacao.png).

**Composição aprovada, acabamento em revisão:** o usuário gostou da disposição dos elementos, mas apontou a compressão de “Ocultar” e solicitou orientação para desfazer HIDE. O botão passou de 104 × 44 para 208 × 54, comportando a fonte Action e as reservas do indicador sem compressão. A orientação compartilhada no topo agora permanece durante HIDE e reaparece a cada uso. Texto PT/EN em `Languages.tsv`: Tab ou clique esquerdo restaura a interface.

Conferidos no navegador: botão legível, aviso persistente por mais de cinco segundos, segundo uso de HIDE, restauração por clique e por Tab, sem escolher abordagem. [Botão corrigido](assets/uxdr-001/runtime/abordagens-ocultar-legivel.png) e [orientação no topo](assets/uxdr-001/runtime/abordagens-hide-orientacao.png). Sintaxe e validação passaram; recibo `2026-10-31T01-29-22-506Z-fccad93f`. A composição permanece preservada; estes ajustes ainda aguardam avaliação humana.

Corrigida a sobreposição entre “Ocultar” e o título do encontro. O título ocupa uma linha própria; “Ocultar” e “Rever descrição” ficam no rodapé, dentro do mesmo pergaminho. As divisórias continuam usando o token compartilhado `#360A0B` a 30%.

As ilustrações foram associadas às respectivas opções pelo adaptador Dryland, reutilizando o destaque da taverna: halo suave sobre a silhueta, clareamento e escala de 110%, sem escurecer as demais. A associação foi conferida nas 48 ilustrações dos eventos de armadilhas. O caminho compartilhado conserva a exceção de movimento reduzido, sem escala; essa preferência não foi reexecutada nesta revisão.

Verificação no navegador do Codex: carregamento nativo do arquivo, título sem sobreposição, troca de foco por teclado e HIDE com retorno por Tab preservando a segunda opção, sem confirmação de abordagem. Sintaxe e validação do pacote passaram; reaplicação em preview retornou `changed: 0`. Revisão deslop limitada ao incremento, preservando as alterações anteriores. Não foram criados testes de aparência. Recibo: `2026-10-31T01-16-16-973Z-13df2c2e`.

[Captura para revisão](assets/uxdr-001/runtime/abordagens-rodape-halo.png). **Aceite visual desta tela permanece pendente.** Momento para o devlog: alternar o foco entre as ilustrações e ocultar/restaurar o pergaminho sem resolver o encontro.

## Iteração de aceite — descrição dos destinos, 2026-10-30

**Aceite visual da seleção de destino confirmado:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite e avançar. A aprovação inclui a composição apresentada, o destaque das imagens e o halo com ampliação leve no título e na descrição, sem sublinhado ou pena nesses dois trechos. [Captura aceita](assets/uxdr-001/runtime/destinos-titulo-halo.png). As pendências de acabamento desta tela citadas abaixo ficam resolvidas. A próxima tela de avaliação é a escolha de abordagem de armadilha, ainda pendente de aceite.

**Extensão solicitada ao título:** o título agora compartilha o efeito da descrição: halo e ampliação de 5% no hover/foco, sem sublinhado nem pena, mantendo a tinta escura. Movimento reduzido conserva apenas o halo. A alteração foi feita na mesma rotina de desenho e preserva a regra de disponibilidade. Esta revisão substitui a preservação do título descrita abaixo; aceite visual ainda pendente.

Recibo do título: `2026-10-30T23-42-55-381Z-85dae485`. Build, sintaxe, validação e reaplicação sem mudanças concluídos. Revisão localizada do diff conforme deslop, sem testes de aparência. Na revisão seguinte, a pedido do usuário, o jogo foi recarregado no navegador do Codex e a seleção de destino reaberta por ações normais da taverna. Título e descrição em foco conferidos na [captura atualizada](assets/uxdr-001/runtime/destinos-titulo-halo.png), sem confirmar caminho. Aceite humano permanece pendente.

A pedido do usuário, a descrição acompanha o foco do destino com ampliação de 5% e halo lilás compartilhado, sem sublinhado ou pena. Título mantém sua apresentação; descrição mantém tinta escura. Movimento reduzido dispensa a ampliação e indisponíveis não recebem destaque. O adaptador identifica o trecho descritivo, e o Design System desenha a ênfase sem acrescentar uma ação.

Pacote 1.6.1 sincronizado; recibo `2026-10-30T23-32-08-058Z-b92ac438`. O instalador indicou conflito no adaptador: comparação integral mostrou apenas a nova propriedade desta revisão; as cópias do perfil e do jogo foram sincronizadas sem perder outras alterações. Build, sintaxe, validação, revisão do diff e reaplicação sem mudanças concluídos. Conferência no Codex alternando os dois destinos disponíveis pelo teclado, sem escolher caminho. [Captura da descrição em foco](assets/uxdr-001/runtime/destinos-descricao-halo.png). Acabamento pendente de aceite humano; sem testes de aparência.

## Iteração de aceite — ações do personagem, 2026-10-30

**Aceite visual confirmado:** o usuário declarou “Essa tela ficou boa!” e autorizou registrar o aceite das ações do personagem. A aprovação corresponde à composição apresentada com Conversar, Selecionar e Voltar à taverna, incluindo seus estados visuais. [Captura aceita](assets/uxdr-001/runtime/aceite-acoes-personagem-pendente.png). O nome do arquivo preserva a captura anterior à aprovação. A avaliação seguinte é a seleção de destino, ainda sem aceite.

## Iteração de aceite — diálogo, 2026-10-30

**Aceite visual confirmado:** o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da caixa de diálogo e aplicar o padrão a todas as caixas do jogo. A aprovação inclui nome do falante em 28 px, cor `#360A0B`, e borda de página na base do pergaminho. O padrão já é global nos componentes `Window_NameBox` e `Window_Message`; fonte e bundle instalado têm o mesmo SHA-256, e não há sobrescritas desses métodos nos adaptadores Dryland. Não é necessário editar cada evento. A captura abaixo documenta a caixa aceita; as pendências citadas a seguir são históricas.

A pedido do usuário, nome do falante ampliado para 28 px em Averia Libre, cor `#360A0B`, com reserva de altura ajustada. Indicador de continuidade reposicionado junto à margem inferior direita do pergaminho, preservando quadros, animação e avanço nativo. Alteração no componente compartilhado; rótulos de arquivos não recebem o aumento de fonte.

Pacote 1.6.1 sincronizado pelo recibo `2026-10-30T23-07-26-013Z-16a99e0a`. Build, sintaxe e validação concluídos; reaplicação com zero mudanças. Conferência visual na conversa com Gorvak no navegador do Codex, sem gravar saves. [Captura da revisão](assets/uxdr-001/runtime/dialogo-nome-borda-base.png). Aceite humano desta tela pendente; não foram criados testes de aparência nem repetidas as jornadas anteriores.

## Iteração de aceite — silhuetas na taverna, 2026-10-30

**Aceite visual da taverna confirmado:** após a revisão do halo e da ampliação dos controles de texto, o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite da tela e avançar. A aprovação abrange a composição, o foco das imagens pela silhueta, o halo lilás suave, o clareamento somente da opção em foco e os controles de texto com halo e ampliação de 10%. As pendências anteriores desta tela ficam resolvidas. O próximo item de avaliação é a conversa com personagem, incluindo caixa de diálogo e controles de leitura; seu aceite continua pendente.

[Captura da taverna aceita](assets/uxdr-001/runtime/aceite-taverna-final.png).

**Aceite do destaque das imagens:** o usuário declarou “Os botões de imagem ficaram bons”. O halo e o clareamento das imagens ficam aceitos nesta revisão. Para texto e texto com ícone, pediu halo perceptível e ampliação de 10%. Aplicado contorno lilás sob os glifos e ícones, além da difusão, e escala de desenho de 1,10 com alvos de interação estáveis. Movimento reduzido conserva o halo sem ampliar. Removida a escala antiga de 5% dos ícones em texto para evitar composição de escalas. Sintaxe, validação e reaplicação sem mudanças verificadas; sem testes de aparência. Aceite dos botões de texto continua pendente.

Recibo final `2026-10-30T22-57-52-619Z-75eaa490`; [captura de texto com ícone em foco](assets/uxdr-001/runtime/texto-icone-halo-110.png). Conferência visual no título e nos arquivos pelo navegador do Codex, seguida de retorno à taverna pelo save existente, sem gravar arquivos.

**Halo suave compartilhado:** o usuário pediu reduzir o roxo intenso e aplicar o mesmo tratamento a imagens, texto e texto com ícone em todo o jogo. Escolhido lilás dessaturado `#BCA6C9`, por se distinguir do pergaminho e manter relação com o roxo da marca. Calibração: 45% de opacidade, difusão de 4 px, expansão da silhueta de 0,75 px; clareamento da imagem reduzido de 45 para 28 nos canais RGB. Os controles de texto recebem halo nos traços e na pena; os ícones acionáveis de menus, áudio, arquivos e voltar compartilham os tokens. Informações e indisponíveis não recebem o efeito. UXDR, GDD e documentação do pacote atualizados; acabamento pendente de aceite humano.

Recibo `2026-10-30T22-49-19-908Z-2dd704f8`: apenas bundle permitido instalado, pacote 1.6.1 sincronizado. Sintaxe, validação, revisão do diff e reaplicação com zero mudanças concluídas. Amostras conferidas no Codex: [texto](assets/uxdr-001/runtime/halo-lilas-texto.png), [texto com ícone](assets/uxdr-001/runtime/halo-lilas-texto-icone.png) e [silhueta](assets/uxdr-001/runtime/halo-lilas-taverna.png). Não foram criados testes de aparência nem repetidas as jornadas anteriores.

O usuário considerou a composição boa e rejeitou o halo retangular e o escurecimento das alternativas. O destaque compartilhado agora deriva do canal alfa da arte: contorno e halo acompanham a silhueta, incluindo a escala de foco. O bitmap do halo é reutilizado por arte. A imagem em foco recebe clareamento; demais imagens mantêm o tom normal. Movimento reduzido continua dispensando a escala, conservando halo e contraste. A direção substitui o escurecimento registrado no UXDR e GDD; intensidade e acabamento aguardam aceite humano.

Pacote 1.6.1 e bundle sincronizados pelo recibo `2026-10-30T22-42-06-010Z-2112e099`. Sintaxe, validação sem erros/avisos, revisão do diff e reaplicação sem alterações concluídas. Conferência visual por navegação de teclado entre [Gorvak](assets/uxdr-001/runtime/taverna-silhueta-gorvak.png) e [Griznik](assets/uxdr-001/runtime/taverna-silhueta-griznik.png), com restauração da aparência anterior. Nenhum recrutamento ou gravação realizado. As jornadas completas anteriores não foram repetidas nesta revisão visual.

## Iteração de aceite — arquivos, 2026-10-30

**Encaminhamento do usuário:** “Por enquanto, deixe como está e vamos pra próxima tela”. A revisão dos arquivos fica mantida provisoriamente, sem aceite visual definitivo; a avaliação segue para a taverna.

**Estados do livro:** a pedido do usuário, saves existentes exibem livro fechado fora do foco e livro aberto no hover/seleção. Reutilizada a arte anterior do livro fechado com pena, recuperada do recibo de 21:27; slots vazios permanecem sem ícone. O estado usa a seleção do provedor, compartilhada com o destaque da linha. Conferidos os dois estados por navegação de teclado no Codex, sem confirmar arquivos: [fechado](assets/uxdr-001/runtime/arquivo-livro-fechado.png) e [aberto](assets/uxdr-001/runtime/arquivo-livro-aberto.png). Bundle, asset e manifesto sincronizados pelo recibo `2026-10-30T22-32-26-263Z-6b8a98dd`; sintaxe e validação passaram, reaplicação com zero alterações. Aceite visual pendente.

**Refinamento solicitado:** arquivos ocupados recebem o livro aberto com pena já aprovado para Salvar, em 1,3× a fonte do nome. Slots vazios não recebem ícone; os nomes mantêm o alinhamento da coluna. O desenho compartilhado usa os metadados existentes do provedor. Pacote e jogo sincronizados; recibo `packages/coreto-design-system/backups/design-system/2026-10-30T22-12-42-067Z-82c782a7/receipt.json`. Sintaxe e validação passaram; reaplicação sem alterações. Conferência no navegador do Codex sem carregar ou gravar arquivos. [Tela com livros](assets/uxdr-001/runtime/aceite-carregar-livros.png). Aceite visual pendente.

O usuário rejeitou o espaço vazio e a separação pouco clara da grade de arquivos. A revisão usa uma coluna com cinco linhas visíveis, pergaminho único para ajuda e lista, divisórias horizontais `#360A0B` a 30%, faixa de foco roxa suave, traço lateral e pena junto ao nome. Data fica sob o nome; tempo e indicação do arquivo mais recente ficam à direita. Imagens, personagens e descrição, quando presentes nos metadados, conservam uma região central. A composição compartilhada atende Salvar e Carregar; seleção, callbacks e persistência continuam com o provedor.

Preset migra os valores anteriores de BoxRows/BoxCols (2/3) para 5/1. Pacote 1.6.1, manifesto, configuração do provedor e bundle permitido sincronizados. Recibos: `packages/coreto-design-system/backups/design-system/2026-10-30T21-58-01-447Z-972f379e/receipt.json` e `2026-10-30T21-59-52-544Z-b1c215ad/receipt.json`. Sintaxe, validação sem erros/avisos, revisão do diff e reaplicação sem mudanças concluídas. Não foram criados testes de aparência. Conferência visual em Carregar via Continuar no título, sem confirmar um arquivo. [Tela apresentada](assets/uxdr-001/runtime/aceite-carregar-lista.png). **Aceite visual desta revisão pendente.**

## Iteração de aceite — ícones do menu, 2026-10-30

**Aceite visual do menu principal confirmado em 2026-10-30:** após as revisões de ícones, contadores e divisórias, o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite do menu e apresentar a próxima tela. A aprovação abrange o menu mostrado na [captura final](assets/uxdr-001/runtime/divisorias-corrigidas.png), incluindo Salvar com livro aberto e pena, moeda com profundidade, rodapé sem rótulo Tempo, contadores em Outfit e divisórias sem acúmulo de opacidade. As pendências de aceite nas revisões abaixo são históricas e ficam resolvidas para esta tela. Salvar, Carregar e demais cenas ainda dependem de avaliação própria.

**Correção após nova observação das divisórias:** a conferência anterior dos tokens não detectou acúmulo de tinta. A divisória vertical dos comandos fica no intervalo entre itens, fora da área limpa por `redrawItem`; mudanças de foco redesenhavam a linha sobre a anterior. Agora esse intervalo é limpo antes de redesenhar a divisória, preservando `#360A0B` a 30%. O ajuste compartilhado cobre menu e categorias das opções. Os demais consumidores limpam o bitmap ou recriam os conteúdos antes das divisórias. [Antes](assets/uxdr-001/runtime/divisorias-antes.png) e [após alternar foco](assets/uxdr-001/runtime/divisorias-corrigidas.png).

Na mesma instalação, a moeda ganhou borda lateral e aro em perspectiva discreta, mantendo 26 px. Asset final `packages/coreto-design-system/assets/CoretoTheme_Coin.png`, gerado por imagegen integrado a partir da arte anterior. Prompt: moeda medieval levemente inclinada, espessura visível à direita, aro frontal em relevo, losango central; profundidade expressa por contornos bordô e espaços transparentes, sem gradientes ou detalhes finos, legível a 26 px. Pacote, preset, compatibilidade e manifesto sincronizados. Recibo: `packages/coreto-design-system/backups/design-system/2026-10-30T21-45-25-032Z-86e708aa/receipt.json`. Sintaxe, validação sem erros/avisos e reaplicação com zero mudanças concluídas; aceite visual pendente.

**Padronização das divisórias:** solicitado `#360A0B` a 30% em todas as telas. Conferência do pacote e do bundle instalado confirmou que `tokens.divider` e `tokens.dividerOpacity` já possuem esses valores. A função compartilhada `divider` atende menu principal, categorias/seções/idiomas das opções, grupos de escolhas por imagens e controles do diálogo; não foram encontrados desenhos independentes de divisórias nos adaptadores Dryland. Validação do pacote sem erros ou avisos. A solicitação foi explicitada no UXDR sem mudança redundante no runtime e sem declarar novo aceite visual das telas.

**Terceira revisão — rodapé:** por solicitação do usuário, retirado o rótulo Tempo. O contador aparece ao lado da ampulheta; tempo e ouro usam o papel Body (Outfit 20 px), com ícones de 26 px (1,3× a fonte). Ampulheta e moeda receberam artes transparentes simplificadas, com reamostragem compartilhada de alta qualidade. UXDR e GDD atualizados para substituir a decisão anterior sobre o rótulo. Pacote/preset/manifesto sincronizados; instalação limitada ao bundle e dois PNGs, recibo `packages/coreto-design-system/backups/design-system/2026-10-30T21-34-31-632Z-c01c60fc/receipt.json`. Sintaxe, validação sem erros/avisos, revisão das alterações e reaplicação sem mudanças conferidas. [Rodapé apresentado](assets/uxdr-001/runtime/aceite-menu-rodape.png); aceite humano desta revisão pendente.

Assets finais `packages/coreto-design-system/assets/CoretoTheme_Clock.png` e `CoretoTheme_Coin.png`, copiados pelo instalador para `img/system/` do jogo. Gerados com imagegen integrado; prompt: ícone medieval minimalista em tinta bordô #360A0B, traços orgânicos fortes, espaços internos amplos, legível a 26 px, fundo transparente, sem texto, hachuras ou sombras; ampulheta com duas câmaras e monte de areia inferior; moeda frontal com aro e marca central em losango.

**Segunda revisão:** Configurações e Carregar foram aprovados pelo usuário. A pedido dele, Salvar passou a representar um **livro aberto com pena**. Apenas `CoretoTheme_Save.png` foi substituído no jogo, pelo instalador do pacote 1.6.1; preset, histórico de compatibilidade e manifesto atualizados. Recibo: `packages/coreto-design-system/backups/design-system/2026-10-30T21-27-39-732Z-ee1017ce/receipt.json`. Validação sem erros/avisos e reaplicação com zero mudanças. [Menu com Salvar revisado](assets/uxdr-001/runtime/aceite-menu-salvar-aberto.png); o novo Salvar e o aceite global do menu permanecem pendentes.

Arte gerada com imagegen integrado a partir de Carregar. Prompt: preservar o livro aberto e os traços orgânicos bordô #360A0B, retirar completamente a seta e colocar uma pena diagonal sobre a página direita, com ponta tocando a página; silhueta minimalista legível a 29 px, espaços internos amplos, fundo transparente, sem texto, hachuras, sombras ou detalhes pequenos. Asset final: `packages/coreto-design-system/assets/CoretoTheme_Save.png`, instalado em `rpg-maker/The Dryland Drowned/img/system/CoretoTheme_Save.png`.

O usuário solicitou o mesmo tratamento aprovado no áudio e ícones distintos para Salvar e Carregar. Configurações usa ferramentas cruzadas; Salvar, livro com pena; Carregar, livro aberto com seta de retorno. As três artes transparentes foram produzidas com imagegen em tinta bordô, silhuetas simples e espaços internos amplos. Os comandos, a ampulheta e a moeda usam tamanho de 1,3× a fonte Menu e intervalo de 12 px; a moeda também passa pela reamostragem de alta qualidade compartilhada. O carregamento registra Load e Coin como assets internos do tema, preservando os parâmetros públicos existentes.

Pacote 1.6.1, preset, manifesto e jogo sincronizados. A instalação alterou apenas o bundle permitido e três PNGs: recibo `packages/coreto-design-system/backups/design-system/2026-10-30T21-22-12-143Z-a360adc9/receipt.json`. Sintaxe do bundle, validação sem erros/avisos, revisão deslop das alterações e reaplicação sem mudanças conferidas. Menu reaberto por ações públicas no navegador do Codex; nenhuma gravação de save realizada. [Captura da revisão](assets/uxdr-001/runtime/aceite-menu-revisado.png). **Aceite visual do menu pendente; áudio permanece aceito.**

## Iteração de aceite — ícones de áudio, 2026-10-30

**Aceite visual da tela de áudio confirmado em 2026-10-30:** após a segunda revisão, o usuário declarou “Agora ficou bom!” e autorizou registrar o aceite e avançar para a próxima tela. A aprovação abrange a tela de áudio apresentada com os quatro ícones revisados, tamanho proporcional à fonte e reamostragem de alta qualidade, conforme a [captura aceita](assets/uxdr-001/runtime/audio-reamostragem-alta.png). As demais telas do UXDR-001 continuam aguardando avaliação individual. As pendências citadas nas duas revisões abaixo descrevem o histórico anterior a este aceite.

**Segunda revisão:** o usuário considerou a identificação melhor, mas rejeitou o acabamento pixelado no runtime. A função compartilhada `drawIcon` reduzia os PNGs grandes pela filtragem padrão ao desenhar no bitmap da janela. Agora prepara cada versão colorida no tamanho solicitado, com `imageSmoothingEnabled` e `imageSmoothingQuality = high`, guarda o resultado no cache limitado existente e o desenha em coordenadas inteiras sem nova redução. Os PNGs, as proporções e os controles foram preservados. Conferência visual no navegador integrado, sintaxe do bundle, validação do pacote, diff e reaplicação com zero mudanças concluídas; aceite humano ainda pendente. Comparação: [antes](assets/uxdr-001/runtime/audio-antes-reamostragem.png) e [reamostragem de alta qualidade](assets/uxdr-001/runtime/audio-reamostragem-alta.png). Recibo: `packages/coreto-design-system/backups/design-system/2026-10-30T21-01-53-001Z-51fbc48f/receipt.json`.

O usuário rejeitou a legibilidade dos ícones na primeira apresentação: pequenos em relação à fonte e sem distinção clara entre Temas e Efeitos. Autorizou aumentar e simplificar as artes e diferenciar Temas com uma trombeta. A revisão está aplicada, **aguardando novo aceite desta tela**, sem avançar para as demais.

Os quatro ícones usam agora silhuetas simples: alaúde, duas folhas em redemoinho, trombeta e sino com badalo. O desenho das opções reserva 1,3× o tamanho da fonte Menu e 12 px de intervalo até o rótulo. `meVolume` usa o asset configurável `Jingle`; `seVolume` conserva `SoundEffects`. Preset, manifesto, pacote e jogo foram sincronizados. Apenas o bundle permitido e quatro PNGs mudaram na instalação, com recibo `packages/coreto-design-system/backups/design-system/2026-10-30T20-55-48-269Z-8bbc5627/receipt.json`.

Verificação desta revisão: sintaxe, `validate` sem erros/avisos, reaplicação com zero alterações, revisão deslop e navegação por teclado na tela de áudio do navegador integrado. Os quatro volumes permaneceram em 40%. Não foram criados testes de aparência nem repetidas as jornadas de campanha para esta alteração visual. [Captura apresentada ao usuário](assets/uxdr-001/runtime/aceite-audio-revisado.png).

Artes produzidas com a ferramenta integrada imagegen e salvas em `packages/coreto-design-system/assets/CoretoTheme_{Music,Ambience,Jingle,SoundEffects}.png`, com cópias instaladas em `rpg-maker/The Dryland Drowned/img/system/`. Prompt comum: ícone único de interface medieval em tinta bordô #360A0B, silhueta simples, traços grossos orgânicos, espaços internos amplos, legível a 36 px, fundo transparente, sem hachuras, textura, sombra, texto ou moldura; ocupar aproximadamente 90% do quadrado. Assuntos: alaúde com corpo de pera e duas linhas de corda; exatamente duas folhas em uma espiral de vento; trombeta heráldica com campana larga, sem válvulas nem estandarte; sino de mão com cabo curto, abertura larga e badalo redondo visível.

## Fechamento da retomada Windows — 2026-10-30

Esta seção reúne os resultados atuais. As seções seguintes preservam o histórico das tentativas e seus impedimentos; suas listas de pendências não descrevem o estado atual.

### Implementação e ambiente

O pacote 1.6.1 e o consumidor foram sincronizados pelo instalador, preservando as alterações anteriores. Menu, opções, imagens, sacrifício, HIDE e continuidade usam a camada compartilhada; os adaptadores conservam contexto e regras da campanha. O rodapé do menu reserva áreas distintas para rótulo e valor; `Carregar` e `Tempo` usam as traduções do jogo. O preset contém os assets transparentes e as associações necessárias à reaplicação. Engine, outros bundles Coreto e catálogo congelado não foram editados.

O executor Windows agora resolve `python.exe`, verifica Python 3.8+ e usa o executável real retornado por `sys.executable`. Nesta máquina ele corresponde a `C:\Users\psiei\AppData\Local\Programs\Python\Python314\python.exe`. `DRYLAND_PYTHON` permite seleção explícita. O alias `python3` da Microsoft Store deixou de bloquear a execução; não foi necessário modificar o PATH global. Portas efêmeras evitam a porta reservada pelo Windows. Fixtures usam junctions, o navegador usa D3D11 e o encerramento aguarda a liberação do perfil. A inspeção manual permaneceu no navegador integrado do Codex.

A regressão encontrou e corrigiu dois defeitos adicionais de integração: o título ficava preso ao tentar atravessar `Continuar` indisponível, e os créditos tentavam chamar `picture()` no sprite de pergaminho compartilhado. As correções preservam confirmação única e retorno ao título.

### Jornadas e evidências

As três campanhas abaixo partiram de Novo jogo, usaram entradas públicas de jogador, concluíram créditos e retornaram ao título. Depois foram reabertas por Continuar, conferindo o arquivo nativo e a preservação exata do save terminal. Os relatórios têm zero erros na execução final; `executed-awaiting-review` distingue execução técnica de aceite humano.

| Jornada | Resultado técnico | Evidência local em `.artifacts/uxdr-001/` |
| --- | --- | --- |
| Física → sobrenatural → reunir | Concluída, 356 s | `journeys-complete/JOURNEY-physical-first-reunite/` |
| Sobrenatural → física → destruir | Concluída, 343 s | `journeys-complete/JOURNEY-supernatural-first-destroy/` |
| Perda de todos os heróis → final ruim | Concluída, 300 s | `remaining-complete/JOURNEY-bad/` |
| Demonstração normal | Concluída, 114 s | `remaining-complete/UXDR-001-normal/` |
| Demonstração com movimento reduzido | Concluída, 152 s | `demo-complete/UXDR-001-reduced/` |

As demonstrações cobrem teclado, foco entre imagens, entrada/saída rápida do hover da borda e HIDE restaurado por Tab e clique. O estado da campanha, texto, opções e foco são comparados antes/depois de HIDE; a restauração não confirma a abordagem. Hover não altera a campanha. As capturas normal/reduzida foram inspecionadas: o modo reduzido conserva contorno e contraste, sem ampliar a imagem, e a borda alterna diretamente entre extremos. Caixa e texto ficam imóveis.

A inspeção manual no navegador integrado percorreu prólogo, taverna, menu, opções, mudança PT/EN e save/load. Conferiu lacre da categoria separado da pena do foco, nomes localizados e rodapé sem sobreposição. Trata-se de uma sessão manual delimitada; as campanhas completas acima são jornadas dirigidas, não playtest humano.

### Material para revisão e devlog

- [Vídeo do jogo — 21 segundos, 1280×720, sem áudio](assets/uxdr-001/runtime/uxdr-001-devlog.mp4): taverna → seleção de imagens → HIDE → borda abrindo/fechando. Cortes da gravação da demonstração normal final; não é mockup.
- Menus: [PT](assets/uxdr-001/runtime/menu-pt-final.jpg), [EN](assets/uxdr-001/runtime/menu-en-final.jpg), [opções PT](assets/uxdr-001/runtime/opcoes-pt-final.jpg), [áudio EN](assets/uxdr-001/runtime/audio-en-final.jpg).
- Destinos: [primeiro foco](assets/uxdr-001/runtime/destinations-first-normal.png), [segundo foco](assets/uxdr-001/runtime/destinations-second-normal.png), [mesmo segundo foco com movimento reduzido](assets/uxdr-001/runtime/destinations-second-reduced.png).
- Armadilha: [visível](assets/uxdr-001/runtime/trap-visible-normal.png), [oculta](assets/uxdr-001/runtime/trap-hidden-normal.png), [restaurada](assets/uxdr-001/runtime/trap-restored-normal.png).
- Borda: [fechada](assets/uxdr-001/runtime/page-closed-normal.png), [aberta](assets/uxdr-001/runtime/page-open-normal.png), [aberta com movimento reduzido](assets/uxdr-001/runtime/page-open-reduced.png).
- [Sacrifício](assets/uxdr-001/runtime/sacrifice-final.png) e [escolha final](assets/uxdr-001/runtime/ending-choice-final.png).

As outras capturas comparáveis ficam no mesmo diretório, com sufixos `normal` e `reduced`. Gravações integrais, logs, observações e arquivos nativos permanecem nas pastas de evidência das jornadas.

### Verificação e limites

- Pacote final: **23/23**, zero ignorados (`package-complete.log`). Inclui preservação, instalação, reaplicação idempotente e recuperação. Entrada de autoria do consumidor: **15/15** (`consumer-authoring-final.log`).
- `validate` sem erros/avisos; preview de reaplicação `changed: 0`. Bundle e perfis iguais aos instalados. Último recibo de alteração: `packages/coreto-design-system/backups/design-system/2026-10-30T19-47-34-299Z-0aec9d36/receipt.json`.
- Conferência final: sintaxe de 35 arquivos JavaScript, sincronização byte a byte dos três plugins distribuídos e sete assets alterados, links locais do acervo e `git diff --check` aprovados. Revisão `deslop` concluída sem necessidade de reescrita adicional. O catálogo de API documenta os callbacks opcionais de rótulo de menu e tempo; não muda handlers nem símbolos nativos.
- Distribuição podada: **714 entradas**, abaixo do limite de 1000. Verificações de comportamento selecionadas por risco conforme ADR-G006, sem declarar execução da suíte inteira de `verify-build`.
- **12 verificações canônicas selecionadas aprovadas na distribuição podada:** IT-007, IT-008, IT-015, IT-016, IT-017, IT-025, IT-026, IT-027, IT-038, IT-058, UT-059 e UT-073. Evidências: `pruned-behavior-final` (IT-015/025/026/027/038 e UT-059/073), `pruned-closure` (IT-007), `pruned-final-selection` (IT-008/017) e `pruned-reading-final` (IT-016/058). Este último encerrou com `status: pass`, zero testes ignorados e zero navegadores remanescentes. IT-058 percorreu os oito epílogos e créditos por mouse, teclado, avanço automático, aceleração e acionamento tardio, conferindo retorno único e bytes do save. Rodadas anteriores permanecem como diagnóstico; seus agregados com falha não são declarados aprovados.
- Limites configurados 10 workers/10 browsers; rodadas finais usaram 1/1 por executor e no máximo dois navegadores automatizados simultâneos entre executores. A tentativa com quatro simultâneos teve contenção e erro de carregamento; somente os casos afetados foram repetidos. Os relatórios finais registram encerramento e ausência de navegadores próprios remanescentes. A aba integrada do usuário foi preservada.

Os testes passaram a aguardar janelas nativas prontas e toda a leitura atual do resultado de morte. Reconhecimento do título remove controles de fonte e usa a chave crua; créditos usam o mapa e a velocidade autorais atuais. Foi removida somente a variante artificial de créditos de 80 linhas que exigia `_blockIndex` e altura de pixels de um provedor anterior (reprovava as perguntas 3 e 5 da política de testes). Permanecem verificações de epílogos reais, avanço, aceleração, retorno único e save. Asserções de nomes de assets/layout do IT-008 também foram substituídas por comportamento de indisponibilidade, sem testes de pixels ou traduções literais.

O aceite visual humano dos derivados finais permanece pendente. NW.js, gamepad e zoom nativo continuam fora desta entrega. Não houve alteração de formato de saves nem migração de arquivos pessoais.

## Histórico das etapas anteriores

## Verificação no navegador integrado — 2026-10-30

O usuário direcionou a inspeção para o navegador integrado do Codex. O servidor em `18727` respondeu e a jornada foi executada nesse navegador, sem depender do acesso ao aplicativo Chrome. O impedimento de acesso descrito abaixo é histórico.

A inspeção encontrou e corrigiu uma falha de inicialização: `Window_ChoiceList.select(0)` era chamado antes de a lista conter um comando. A verificação de disponibilidade agora respeita esse ciclo nativo. A revisão também bloqueou o hit test de escolhas indisponíveis, para que clicar nelas não confirme a escolha anteriormente focada, e a confirmação com índice -1. A navegação considera centros de arte e imagens aninhadas, mantendo os índices nativos.

No menu, o provedor usa seu próprio `drawItem`; incluir explicitamente `Window_MenuCommand` no desenho compartilhado corrigiu a ausência de pena, divisórias e substituição de ícones. Moeda e ícones de áudio estão integrados. A seta de retorno usa o asset do pacote. O alinhamento final dos comandos foi ajustado após a captura comparativa.

Observado no jogo: inicialização, prólogo em inglês, borda fechada com mouse e aberta com teclado, taverna, consulta e seleção de Gorvak, menu, opções em PT/EN, categoria ativa com lacre, áudio e save/load nativo retornando à taverna. A mudança para português permaneceu após sair das opções. Essas observações não equivalem à cobertura integral das jornadas.

Evidências: [menu anterior à correção](assets/uxdr-001/runtime/menu-en.jpg), [menu com foco e ícones](assets/uxdr-001/runtime/menu-en-corrigido.jpg), [opções PT](assets/uxdr-001/runtime/opcoes-pt.jpg), [áudio PT](assets/uxdr-001/runtime/audio-pt.jpg). São capturas intermediárias da inspeção; o alinhamento final e a última revisão do retorno ainda precisam de nova captura.

### Resultados técnicos desta retomada

- Pacote completo após as correções: **23/23**, sem ignorados (`.artifacts/uxdr-001/package-runtime-fixes.log`).
- Entrada de autoria do consumidor migrada de 1.3.0 para 1.6.1: **15/15** (`.artifacts/uxdr-001/consumer-authoring-final.log`). Reutiliza a cobertura de preservação, rollback e recuperação do pacote; mantém instalação/idempotência do consumidor e rejeição de provedor obrigatório ausente. SaveCore é opcional no pacote atual; o caso usa MessageVisibility, exigido pelo perfil.
- `validate`: nenhum erro ou aviso. Reaplicação: `changed: 0`. Sintaxe e `git diff --check` aprovados. Engine e catálogo congelado sem alterações.
- Execução direta dos casos UT: **59 aprovados, 2 bloqueados por infraestrutura**. UT-073 passou na repetição fora do sandbox. UT-059 e IT-015/025/026 não chegaram à jornada: o helper invoca `python3`, que no Windows desta máquina aponta ao alias da Microsoft Store, apesar de existir `python.exe` instalado. Logs: `fast-direct.log` e `behavior.log` em `.artifacts/uxdr-001/`.
- O executor agregado também encontrou `EPERM` ao criar symlinks no sandbox. A execução direta usou um processo e nenhum paralelismo de navegadores; os limites configurados 10/10 continuam sendo tetos. A suíte do pacote usou concorrência 1 e zero navegadores. A inspeção manual usou uma aba integrada.
- Cópia descartável podada: **714 entradas**, dentro do limite 1000. A poda não prova carregamento de todos os assets nem substitui `verify-build`; essa verificação continua pendente. Fonte e saves originais preservados.

### Pendências para fechamento

Executar as jornadas completas de destinos, indisponíveis, quarto herói, armadilhas/HIDE, sacrifício e finais; conferir teclado após a última revisão, alternância rápida de foco e movimento reduzido. Completar a verificação da distribuição podada e produzir o vídeo curto do devlog. O comando `python3` e as fixtures do executor precisam de preparação compatível com Windows antes da regressão automatizada; nenhuma falha foi convertida em aprovação. A skill `game-test-infrastructure`, exigida pelas instruções locais para reparar essa infraestrutura, não foi encontrada nos catálogos e diretórios de skills consultados nesta sessão.

O momento demonstrável continua sendo: ações leves da taverna → foco e escurecimento entre imagens → ocultar/restaurar armadilha sem escolher → abertura/fechamento da borda. Capturar PT/EN comparáveis e submeter o resultado ao aceite visual humano. Gamepad, zoom nativo e NW.js continuam fora da cobertura.

## Retomada pelo pacote 1.6.1

As alterações anteriores do bundle e do adaptador foram preservadas nos fontes de `packages/coreto-design-system`. O bundle foi reconstruído e comparado byte a byte com o consumidor; o adaptador IllustratedChoices também está sincronizado.

Foram integrados ao código: traço fino e pena nas ações de texto; lacre menor e categoria ativa; composição compartilhada de pergaminho para o menu; reserva de largura do valor do tempo; atlas de três quadros para continuidade com foco automático de teclado, reversão e movimento reduzido; HIDE nas abordagens; destaque de imagens com escala, contorno, halo e escurecimento do grupo. O sacrifício conserva expressões e falas sem aplicar um segundo escurecimento.

Os ícones de ampulheta, moeda, alaúde, sino, retorno e folhas foram exportados de atlas gerado, com transparência, e instalados pelo pacote. A borda foi preparada a partir da referência aprovada. Essas artes precisam de conferência em tamanho de uso nas cenas; aprovação do UXDR não é aceite automático dos derivados de produção.

O instalador aplicou dez arquivos e o preview seguinte retornou `changed: 0`. O recibo local está em `packages/coreto-design-system/backups/design-system/2026-10-30T17-50-50-963Z-ebbe225b/receipt.json`. O catálogo congelado não foi alterado. Os hashes dos adaptadores oficiais anteriores foram adicionados à migração, sem aceitar arquivos personalizados arbitrários.

A suíte revelou uma falha anterior na detecção de traduções duplicadas: somente a primeira ocorrência era conferida. A validação agora examina todas as ocorrências antes de escrever. O teste existente protege contra sobrescrita de tradução personalizada.

### Limite atual da validação visual

**Verificação do pacote:** 23/23 testes aprovados, zero ignorados, com `CORETO_TEST_PROJECT` apontando para uma cópia descartável dos arquivos da baseline Git e `CORETO_TEST_CLI` para a CLI instalada. Um processo de testes, nenhum navegador criado pela suíte. Log local: `.artifacts/uxdr-001/package-final.log`. Inclui instalação, atualização, idempotência, rollback, restauração byte a byte, proteção de personalizações e callbacks. Sintaxe dos plugins e sincronização byte a byte entre bundle/perfil e consumidor também conferidas; `validate` retornou zero erros e avisos.

O acesso do controle de computador ao Google Chrome foi negado com `Computer Use was not approved to use Google Chrome`. O navegador integrado não acessou `http://127.0.0.1:18726/` e retornou timeout. Foi solicitada a habilitação do Chrome ao usuário; a ausência de resposta não foi tratada como aprovação. Não foi usada outra automação para contornar essa negativa.

Permanecem necessários: inspeção PT/EN das cenas, regressão de navegação e confirmação, save/load, distribuição podada e captura de vídeo. A composição, os alvos de interação, o foco e os assets não são declarados aprovados no jogo apenas pela análise estática.

Referência: [decisões aprovadas](uxdr-001-linguagem-visual-e-estados-de-interacao.md).

## Alterações iniciadas

- Navegação de escolhas ignora entradas indisponíveis, usa posições de imagens vinculadas quando disponíveis e mantém índices dos eventos.
- Restauração procura a escolha lembrada ou a próxima disponível; ausência de opções produz índice -1.
- Confirmação de escolha indisponível retorna sem buzzer.
- Destinos deixam de produzir lacre a partir do texto `selected`.
- Desenho compartilhado usa lacre de 16 px, traço fino em ações habilitadas e pena também nas ações auxiliares em foco.
- Categoria de opções aberta recebe estado ativo separado do foco.

Essas alterações ainda precisam de inspeção no jogo e testes de comportamento. Não constituem implementação completa do plano.

## Verificação em 2026-10-30

As verificações `node --check` passaram nos três plugins alterados: DesignSystem, IllustratedChoices e Presentation.

`node --test rpg-maker/tests/design-system-cli.test.mjs`: 1 aprovado e 2 reprovados. A falha ocorre no preflight com `PLUGIN_VERSION: Install DesignSystem 1.3.0 before authoring.` O bundle instalado identifica-se como 1.6.1; o preset e o catálogo congelado continuam em 1.3.0. As alterações desta entrega não modificaram essas versões. Não foi removida ou burlada a verificação de versão.

### Correção do diagnóstico do aplicador

A investigação posterior identificou que o comando acima exercita o aplicador legado. O pacote entregue em 2026-10-29, `packages/coreto-design-system`, já contém CLI, catálogo e preset 1.6.1. Sua CLI passou em `validate` sem erros ou avisos e leu `/Menu` com Averia 22. Não é necessário alterar o catálogo congelado para usar essa versão.

O preview `install --preset dryland --dry-run` da CLI nova interrompeu corretamente com `Personalização conflitante: js/plugins/Dryland_6_IllustratedChoices.js`, pois esse arquivo já recebeu alterações desta implementação. Não houve reinstalação nem sobrescrita. A continuação deve integrar as mudanças nos fontes/perfil do pacote e atualizar sua distribuição de forma coerente, preservando as alterações do jogo; não basta mudar a string de versão do aplicador antigo.

## Pendências identificadas antes da retomada

Lista histórica da primeira etapa; o estado mais recente e os limites de verificação estão na seção de retomada acima. A cobertura legada em `rpg-maker/tests/design-system-cli.test.mjs` ainda aponta para a ferramenta 1.3.0 e não foi declarada aprovada pelos testes do pacote 1.6.1.

- Completar navegação e disponibilidade em todos os consumidores, incluindo hit testing de imagens, menus e restauração por ordem visual.
- Integrar destaque, halo e escurecimento compartilhados, preservando expressões e consequências do sacrifício.
- Concluir composição dos menus e separação do tempo.
- Preparar e integrar ícones finais e atlas de continuidade; implementar a máquina de estados aprovada e movimento reduzido.
- Integrar HIDE nas escolhas de armadilhas e verificar restauração sem confirmação.
- Usar o pacote 1.6.1 como origem da evolução, sincronizar fontes/perfil e consumidores antes de validar reaplicação/recuperação; reconciliar a cobertura legada sem burlar suas verificações.
- Executar cobertura de comportamento, jornadas PT/EN e compatibilidade da distribuição podada/save/load.
- Produzir capturas e vídeo do devlog; registrar aceite visual humano separadamente.

Não foram executados playtest, distribuição podada, save/load ou captura de vídeo nesta etapa. O GDD e o UXDR permanecem como aprovação de design, sem declaração de integração concluída.
