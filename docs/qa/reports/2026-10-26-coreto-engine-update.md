# Atualização da Coreto Engine — 2026-10-26

Atualização aplicada ao jogo `rpg-maker/The Dryland Drowned`. As verificações selecionadas passaram; os diagnósticos estáticos anteriores descritos abaixo permanecem.

## Entrega e preservação

- Origem: `Pixi-Rework`, commit `691420273adb39b458eae5d05d9c332f0a834c10`.
- Baseline do consumidor: `5e3e00741acd0f84f9b75c486120a7b68c8d3589`, com Git limpo antes da atualização.
- Instalação pelo helper oficial, com seleção explícita de `rpg-maker/The Dryland Drowned`: 70 arquivos existentes atualizados e 56 novos, antes dos ajustes de testes e deste relatório.
- Os 18 bundles foram entregues. Os 16 anteriormente ativos continuam ativos; ItemsEquips e SkillsStates não foram ativados. `js/plugins.js` permaneceu idêntico.
- A skill `game-coreto-eng-design-system` foi substituída integralmente pela versão oficial 1.3.0, conforme instrução do usuário. Seus 38 arquivos conferem com a origem e o recibo `.coreto-skills.json`. Nenhum preset foi aplicado ao jogo.
- Os 1.554 arquivos protegidos do jogo permaneceram idênticos, incluindo dados, traduções, assets, saves e plugins próprios. O conteúdo local fora dos blocos Coreto de `AGENTS.md`, `CLAUDE.md` e `.gitignore` foi preservado.

O [backup e os inventários](../../../.artifacts/coreto-update-20261026/) incluem a instalação anterior, os arquivos ignorados relevantes e a skill substituída. Dependências `node_modules` não integram o backup. A origem permaneceu sem alterações rastreadas; `temp/` já existia como não rastreado. Não houve commit ou publicação.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| Origem: `make test-fast` | 38 jobs aprovados |
| Integridade da distribuição e preservação | Aprovadas; nenhuma divergência com a origem ou alteração em arquivo protegido |
| Skill: `node --test rpg-maker/tests/design-system-cli.test.mjs` | 3 testes aprovados, em fixtures descartáveis |
| Dryland: grupo rápido | 61 casos aprovados |
| Dryland: integração selecionada | IT-002, IT-006, IT-025, IT-038, IT-047, IT-066, IT-080 e IT-078 aprovados, considerando a reexecução de IT-047 |
| Save entre versões | Aprovado em Chrome, com perfil e cópia do jogo isolados |

O runner do Dryland usou `--pruned` e seleção explícita via `--ids`. A seleção cobre integração de campanha, diálogos, escolhas, HIDE, Options, imagens, referências de eventos, transferências e Continue. O máximo observado foi de oito browsers; todas as execuções terminaram com zero browsers restantes. O Node do consumidor foi 26.7.0; os testes rápidos da origem usaram 22.23.2.

Na jornada entre versões, inputs públicos produziram o save inicial com a engine antiga, na sequência 1/fase `intro`. Após substituir somente os bundles da cópia, o navegador foi reiniciado com o mesmo perfil e origem HTTP. Continue restaurou o estado exato sem regravar o payload. A jornada recrutou H1/H2/H3 e partiu para a dungeon; o novo save, sequência 12/fase `dungeon_intro`, também foi restaurado após outra reinicialização. Nenhum save pessoal ou estado de campanha fabricado foi usado. Browser e servidor foram encerrados.

Evidências: [resultado consolidado](../../../.artifacts/coreto-update-20261026/result.json), [casos do jogo reconciliados](../../../.artifacts/coreto-update-20261026/game-reconciled.json), [jornada entre versões](../../../.artifacts/coreto-update-20261026/cross-version-run-04/cross-version-save.json) e [preservação final](../../../.artifacts/coreto-update-20261026/final-preservation.json).

## Ajustes de testes e tentativas

O teste da skill passou a carregar o preset por `loadPreset(coreto)`, interface da versão distribuída. IT-047 passou a ler `CommonEvents.json` pelo servidor, como já fazia com os mapas: o runtime acrescenta o cache `CPC`, inclusive na engine anterior, e não representa o JSON autorado. As asserções de eventos retirados, referências e assets foram mantidas. IT-047 passou na reexecução isolada. O diff desses dois ajustes foi revisado, sem mudanças de comportamento do jogo.

As três primeiras tentativas da jornada entre versões foram preservadas: corrigiram, respectivamente, a espera pela criação da janela de mensagens, a observação do checkpoint inicial antes do prólogo e a expectativa de retorno automático à formação após recrutamento. A quarta tentativa passou integralmente. Nenhuma dessas correções alterou a engine ou os dados do jogo.

## Limites e escopo revisto

Por instrução do usuário durante a execução, a suíte E2E completa do Pixi foi interrompida: ele informou já tê-la executado na implementação da spec 22 e limitou nova cobertura da origem, no máximo, aos plugins ativos do Dryland. Não foi iniciada outra suíte geral. O recibo interrompido registra cancelamento e zero browsers/contextos restantes; não representa PASS da suíte completa. A evidência anterior da spec 22 foi informada pelo usuário, não reexecutada nesta entrega.

As validações estáticas antes e depois conservaram os mesmos problemas: estrutura de branches em `common-event:2/list/37` e `common-event:38/list/78`, e `IO_FAILURE` no validador Message Core ao ler `originalCoreId`. O [comparativo](../../../.artifacts/coreto-update-20261026/validation-comparison.json) registra esses resultados. Não foram alterados eventos ou validadores para ocultá-los.

A jornada entre versões comprova o checkpoint inicial e a continuidade até a primeira partida, não todos os saves possíveis. A seleção não certifica novos recursos de plugins inativos, gamepad, revisão artística, publicação ou o pacote de release em `dist/`.
