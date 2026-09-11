# Material de entrega — bustos em diálogos nativos

O incremento troca a inferência automática de retrato por comandos editáveis nos Common Events. As conversas da taverna mantêm o herói entre perfil e diálogo; Ivaí entra na primeira fala dele. No Conselho, o grupo ocupa posições estáveis, cede lugar à intervenção refletida de Andirá e retorna para as opiniões individuais. Continue recompõe a apresentação sem criar outro cursor de campanha.

O resultado e seus limites são mantidos em [verification.md](../../../../planos/tasks/vn-picture-busts-dialogues/verification.md) e no [relatório de QA](../../reports/2026-09-11-vn-picture-busts-dialogues.md). Este diretório preserva material para um futuro devlog; não constitui publicação ou aceite humano.

| Captura | O que mostra |
| --- | --- |
| [Ivaí pergunta](tavern-ivai.png) / [Gorvak responde](tavern-gorvak.png) | Mesmos participantes permanecem em cena, com alternância do foco |
| [Demanda do Conselho](council-demand.png) | Três heróis em uma campanha percorrida por ações legais |
| [Confissão de Ivaí](council-ivai.png) | Ivaí em foco e os três ouvintes à esquerda |
| [Intervenção de Andirá](council-andira.png) | Arte refletida existente, com os heróis fora da composição |
| [Retorno às opiniões](council-opinions-restored.png) | Grupo nas mesmas posições e foco em Griznik |
| [Exemplo 2x2](2x2-native-normal.png) / [movimento reduzido](2x2-native-reduced.png) | Fixture técnica isolada usando o caminho de produção; não é uma conversa da história |
| [Posição e escala editadas](authored-position-scale.png) | Alteração nos dados nativos visível no Chrome; não prova edição no editor MZ |
| [Pérola](known-gap-perola-prison.png) / [Floraí](known-gap-florai-prison.png) | Limite conhecido: os retratos existentes não mostram as prisões exigidas |

A origem e o SHA-256 de cada PNG estão em [selected-provenance.json](selected-provenance.json). As imagens são cópias sem edição das capturas inspecionadas. Os caminhos em `docs/qa/evidence/` apontam para evidência bruta local ignorada pelo Git, disponível nesta máquina; as imagens selecionadas acima e seus relatos independem desse arquivo local.

Momento sugerido para o devlog: uma troca contínua entre herói e Ivaí, seguida da demanda do Conselho, intervenção e retorno do grupo. Apresentar o 2x2 separadamente como exemplo de autoria. Não há captura válida da edição no MZ: a ferramenta de controle de janelas não conseguiu acessar o editor nesta sessão.

O [resumo da revisão](review-summary.json) registra a correção confirmada e a hipótese refutada; o [banco do Conselho](council-bank-ledger.json) conserva a origem dos oito rosters. O veredito de código não substitui os dois sensores técnicos ainda pendentes.

## Fechamento local

[Verificação consolidada](verification-summary.json) e [quatro lotes atuais/novo master](post-review-lot-ledger.json) distinguem resultados atuais da evidência visual preservada. A revisão de código passou; o incremento continua NOT_READY por V007 (prisões) e V008 (editor). Onze PNGs selecionados mantêm a proveniência original; nenhum foi relabelado como captura do código posterior.
