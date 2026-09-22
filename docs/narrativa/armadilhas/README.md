# Armadilhas — referência editorial

Este catálogo reúne cenas, três abordagens, três sucessos e uma síntese da falha de cada encontro A1–A8 e B1–B8. Serve à revisão narrativa; os textos jogáveis continuam nos eventos nativos de `rpg-maker/The Dryland Drowned/data/Map007.json` a `Map022.json`. Não há carregamento deste diretório pelo jogo nem sincronização automática com os eventos.

O [GDD canônico](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especialmente §§10, 12, 13 e 14, permanece a autoridade de design. Os títulos dos sucessos identificam abordagens para autoria; não substituem automaticamente as opções apresentadas ao jogador. A síntese de falha não substitui os textos por abordagem, a escolha da vítima, a despedida e a morte nos eventos.

## Estados do conteúdo

| Conteúdo | Estado e limite |
| --- | --- |
| Identidade dos 16 encontros, três abordagens e regras da campanha | **Confirmado** no GDD; a revisão preserva essas associações. |
| Trinta sucessos de A1–A8 e B1–B2 integrados pelo PR #20 | **Baseline de protótipo**. Os parágrafos aceitos naquela entrega permanecem nos eventos; esta revisão não reescreve sua aprovação nem suas evidências. |
| Dezoito sucessos de B3–B8 vindos do PR #21 | **Pendente** de aprovação editorial e integração. Os eventos já possuem outros textos; estes documentos não comprovam que as propostas foram implementadas. |
| Cenas, escolhas e falhas reunidas no PR #25; refinamentos desta revisão | Referência para revisão, com aprovação editorial final e eventual integração **Pendentes**. |
| Aplicação destes refinamentos ao jogo, testes de apresentação e novas imagens | **Fora do escopo** desta revisão documental. Mudanças posteriores de comportamento exigem spec incremental. |

## Proveniência e consolidação

Comparação realizada em 22/09/2026, com revisões fixadas:

| Origem | Entrega efetiva |
| --- | --- |
| [PR #18](https://github.com/edneyreis999/gamejam-vn-terror/pull/18), `2f91f94610ea27671d2bfeb9b5e4bf16abe718de` | Dez arquivos preenchidos, com 30 sucessos; B3–B8 vazios. Fechado sem merge individual por consolidação no #20. O título e parte da descrição não correspondem ao conteúdo efetivo dessa revisão. |
| [PR #20](https://github.com/edneyreis999/gamejam-vn-terror/pull/20), merge `76b44e200c16a992926df57eceb48ed41e4e2edc` | Integra os 30 sucessos nos eventos e preserva descrições, opções, falhas, mortes e B3–B8. |
| [PR #21](https://github.com/edneyreis999/gamejam-vn-terror/pull/21), `9e86e8320eb7eed2dc37b87ccc819603028baf57` | Repete os 30 sucessos do #18 e acrescenta 18 para B3–B8. Os 48 resultados estão representados neste catálogo, com os quatro refinamentos identificados abaixo. |
| [PR #25](https://github.com/edneyreis999/gamejam-vn-terror/pull/25), importação `26fb033cd2acaed17024e06c6aa6f3dd959a3903` | Reúne os 16 encontros completos e uma lista de imagens. Na importação, 46 dos 48 sucessos eram literais ao #21; os outros dois eram variantes de A1. A revisão posterior fica concentrada neste PR. |

O limite aprovado do #20 está na [ADR de integração dos sucessos](../../../planos/tasks/approved-narrative-dialogue-staging/adrs/adr-002-trap-prose-integration-boundary.md) e na [análise histórica do #18](../../../planos/tasks/approved-narrative-dialogue-staging/source-analysis-pr18.md). Esses registros descrevem a entrega histórica, não a aprovação dos refinamentos atuais.

## Correções desta revisão

| Encontro | Correção documental |
| --- | --- |
| A1, sucesso 1 | O vento retorna a outra garrafa inteira, sem sugerir retorno ao recipiente que se quebrou na apresentação. |
| A1, sucesso 2 | As presilhas são fechadas antes de libertarem novos redemoinhos; as garrafas já podem estar tremendo. A frase final explicita a fuga. |
| B3, sucesso 3 | O barro frio e o vento servem de referências do ambiente real em meio às lembranças, sem acrescentar queimadura física à ameaça. |
| B7, sucesso 2 | A descoberta cruza datas futuras com os nomes que aparecem na mortalha; remove a data anterior ao nascimento do grupo, incompatível com a apresentação. |
| A4 | Escolhas e sucessos seguem a mesma ordem: escalar, conter as barras, resistir ao rugido e alcançar a trava. |
| A1 e B8 | Corrigida a numeração repetida do terceiro sucesso. |
| Todos | Título da seção de sucessos, espaços e término de arquivo padronizados; corrigidas grafia, capitalização e marcação de negrito identificadas. |

Os 44 demais parágrafos de sucesso permanecem literais ao #21. Nenhum encontro ou resultado foi removido. A lista de imagens da importação foi preservada; ela não atesta produção nem aprovação dos assets.

## Pendência de B1 — Matinta

A falha do próprio GDD §12.3 retira todas as vozes e depois exige que um herói responda com o próprio nome. A redação foi preservada neste catálogo enquanto a decisão estiver pendente. Uma correção possível é fazer o roubo das vozes estar em curso e exigir a resposta antes que a última voz se apague; isso precisa ser registrado na autoridade de design antes de alterar o evento. Não considerar essa inconsistência resolvida pelo fechamento de um PR sobreposto.

## Verificação documental

- Os 30 resultados do #18 foram comparados aos trechos nativos identificados por `result.<encontro>-<abordagem>.success.01`, tanto no merge do #20 quanto em `main` (`04d5253e81fcd22ec0c120b9e82bd17d2bf541c1`). Correspondem integralmente, desconsiderando apenas quebras de linha e as marcações nativas `<br>`.
- A revisão conserva 16 encontros, 48 escolhas e 48 sucessos, com três entradas numeradas em cada seção e uma síntese de falha por encontro. As diferenças de prosa em relação ao #21 são A1-1, A1-2, B3-3 e B7-2.
- A leitura comparativa com o GDD preserva ordem e intenção das abordagens, ausência de executor nomeado nos sucessos e ausência de etiquetas de competências. B1 permanece explicitamente pendente.
- Os eventos, plugins, assets, testes e specs históricas não são alterados. Não foi executado playtest: esta entrega não muda o runtime nem comprova ritmo, legibilidade ou apresentação dentro do jogo.

Momento para devlog: comparação entre a cena de uma armadilha e suas três resoluções no documento revisado. Captura sugerida: antes/depois de A1 ou B7, identificando o material como revisão editorial ainda não integrada.
