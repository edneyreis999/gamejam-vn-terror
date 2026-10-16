# QA Run Report — 2026-10-16 — campfire-hero-bonds

- **Scope:** fogueira, conversas opcionais, memória das perdas e checkpoints.
- **Cadence tier:** targeted.
- **Build:** `feat/campfire-hero-bonds`, base/head `e920095` mais árvore de trabalho. Fontes/hashes de cada candidato ficam no seu report; não há commit deste trabalho.
- **Environment:** macOS, Chrome local, cópias podadas/perfis próprios do adapter; PT/EN, 1280×720 e 1920×1080. Nenhum save do usuário.
- **Status:** in-progress; execução técnica encerrada, julgamentos humanos pendentes.

## Flows in Scope

[Jornada de campanha](../journeys/J-mz-complete-campaign.md), recuperação/exportação, acessibilidade e revisão criativa existentes. [Guia e variantes](../guides/campfire-hero-bonds.md), [charter](../charters/CH-campfire-hero-bonds.md), [autoridade de verificação](../../../planos/tasks/campfire-hero-bonds/verification.md).

## Session Matrix & Results

Os IDs abaixo identificam diretórios locais em `docs/qa/runs/campfire-hero-bonds/runs/`. Os arquivos brutos são ignorados pelo Git; este relato conserva os resultados e limites para um clone novo.

| Sessão | Sensores / resultado | Evidência |
| --- | --- | --- |
| Primeira integração | Pass funcional; inspeção encontrou Help grande e rótulos escuros | `3adcd567-b7eb-4ae8-8957-98b0f7f8b4e4` |
| Correção visual | Pass funcional e inspeção das capturas: hint compacto, controles legíveis, NEW separado; posições2/4, interjeição e Continue após conversa | `22bbee0c-db7f-43b9-b429-76e9bfdbed0c` |
| Perdas e recuperação | Pass: duas reações ordenadas com reload entre elas, conversa interrompida não lida, Sobre witness/after e away/first, novo after após luto; imagens inspecionadas | `d24d71bc-5bf1-4843-8768-9534a3caf6be` |
| Grupos reduzidos | Pass: retorno com dois/um vivos totais, atribuições/mortes preservadas, oitava morte segue ao final ruim; imagens1920×1080 inspecionadas, movimento reduzido sem retratos mortos | `5fba5a64-6acb-440b-997e-f43ad94be387` |
| Rotas, idioma e áudio | Pass: novo sufixo em base lida; Igreja/Parque2/2/1, Vilarejo2/2/2 até Conselho; Options/PT/mute/restauração, mouse e HIDE. PT1280×720 inspecionado; escuta humana pendente | `731125e8-9bb4-44bd-9b1b-3640a735dd73` |
| Fade normal simultâneo | Pass: três chegadas, incluindo perdas anteriores; opacidades iguais,61 amostras em60 frames até remoção; PNG intermediário inspecionado | `cc2f8d1f-872c-4c91-ae48-56923ae4848e` |
| Retorno automático com reservas | Gameplay concluído: último presente morre na posição3, volta à formação com cinco reservas e sem final ruim; serialização do resultado corrigida após coleta | `d2487bd3-7f4e-4893-b2b9-c01eaa477d9f`; `.artifacts/campfire-auto-postcollection.json` |
| Aceite criativo | Pending: editorial/emocional, UI, composição e escuta | V-009 e quadro humano em verification.md |

## Session Debriefs

Todos os percursos dirigidos começam por Novo jogo e escolha pública de arquivo. O lote reduzido aprende somente os dois encontros já revelados e planeja escolhas legais com as competências publicadas; não injeta mortes, estado ou seed. Os snapshots são leituras, nunca comandos de campanha.

A primeira receita de perdas usava a variável de nome do palco para o menu de vítimas; a segunda esperava um menu fechar mesmo quando o próximo o substituía imediatamente. Falhas `470573d8` e `da4929d4` são de receita, preservadas; `d24d71bc` cobre o percurso corrigido. O primeiro lote de rotas esperava retorno à taverna ao desmarcar herói, mas o comportamento nativo permanece no herói; `1a8da825` preserva essa falha. `2406cc11` não iniciou gameplay: a porta estava ocupada pelo outro lote próprio; o executor registrou falha e cleanup. Os lotes seguintes rodam sequencialmente.

`b47461cc` confirmou que o botão ☰ da fogueira abria Scene_Menu por command351. O evento agora chama Scene_Options diretamente. É uma correção da nova superfície, sem alterar engine/Coreto. Apenas o comando nesse ramo mudou, sem mover índices: os percursos anteriores que não abriam Options conservam equivalência; a revisão de Options/idioma/áudio requer o novo lote.

## Automated Evidence

| Seleção | Resultado | Recibo local |
| --- | --- | --- |
| Fast canônico podado | 61/61 pass; browserPeak0 | `.artifacts/campfire-fast-20261016-05` |
| IT-013,014,018,019 | 4/4 pass; retirada nativa, checkpoints existentes, falhas de gravação | `.artifacts/campfire-native-20261016-01` |
| IT-014 ampliado | Pass: camp_entry, camp_arrival_complete, social_complete, camp_exit com Continue e bytes reais, além dos checkpoints anteriores | `.artifacts/campfire-checkpoints-20261016-02` |
| Validação de idioma | 881 chaves, English/Portuguese, sem erro | `.artifacts/campfire-language-final.json` |
| Inventário nativo/poda | 48 bases,8 sufixos,3 chegadas,16 lutos,16 assuntos;404 linhas; todas as chaves/assets referenciados presentes | `.artifacts/campfire-content-inventory.json` |

A primeira ampliação de IT-014 instalava a fase depois do checkpoint que pretendia observar. O recibo `campfire-checkpoints-20261016-01` preserva a falha; a correção começa na consequência anterior e observa a transição real. As fixtures de integração instalam estados limitados e interceptam I/O para observar boundaries; não são evidência de campanha jogada.

Os testes novos protegem elegibilidade, consumo e save, não aparência. UT-033/034 mantêm suas regras de final e removem apenas comparações obsoletas de prosa traduzida, que violavam a regra do projeto e a pergunta5 sobre comportamento versus implementação.

## Human Verifications Needed

- Edney: revisar o corpus PT/EN integrado e avaliar voz, revelações, continuidade, interesse e fadiga.
- Pati/usuário: avaliar descoberta e leitura das opções/NEW.
- Lucas/usuário: avaliar composição e ausências.
- Usuário: ouvir gravação de fogo, mute e saídas e avaliar mix/transições.

## Cleanup and Limits

Reports concluídos conferidos registram fechamento de touch/input/audio capture, sessão de captura, context, browser e service. Os receipts de request preservam exit codes/PIDs. Nenhuma aba/servidor preexistente foi encerrado.

A otimização opcional de reúso retornou `incomplete-dependencies`; o fluxo ordinário preparou/coletou os candidatos. Isso não transforma execução em inspeção ou aceite humano. F-001 permanece waived; gamepad/zoom/mobile excluídos. As capturas para devlog são candidatas, com promoção após aceite. Nenhum commit, stage, PR, Trello ou publicação ocorreu.

## Final Status

`BLOCKED` para entrega final apenas pelos julgamentos humanos indicados na verificação. Implementação e QA técnica concluídas; revisão de código SHIP. A aprovação técnica da spec não aprova automaticamente texto, imagem ou áudio do candidato.

## Inspeção vinculada aos runs

Inspeção do agente `/root`, 2026-10-16: 22bbee0c camp-first-arrival e hero-new/read; d24d71bc two-survivor-camp, second-grief-resumed e about-after-bridge-new; 5fba5a64 camp-living-total-1/2; 731125e8 camp-portuguese, hero-portuguese e camp-hidden; cc2f8d1f all-dead-fade-67. Texto/controles estão dentro da imagem, NEW fica separado, mortos aparecem semitransparentes na captura temporal e somem no palco final. Isso é inspeção técnica, sem aprovar composição/vozes. Os reports/PNG preservam SHA256; como a otimização não emitiu collection receipts, este registro ordinário mantém a inspeção, sem simular um receipt de reúso.

Ambiente registrado: Chrome155.0.8059.80, Node22.23.2, macOS arm64 (Darwin25.5.0). A captura de áudio usa o grafo WebAudio a48kHz, não prova saída física nem conforto. O arquivo `731125e8-9bb4-44bd-9b1b-3640a735dd73/camp-options-and-exits.webm` é o material de escuta.

O lote automático d2487bd3 concluiu todas as asserções e capturou o arquivo próprio, mas seu verificador omitiu o campo obrigatório `limits` no resultado. O report original conserva a falha de serialização. O verificador corrigido foi executado sobre os mesmos artefatos, com validação das referências e hash do report, em `.artifacts/campfire-auto-postcollection.json`; não houve nova execução de gameplay. O cleanup original fechou todos os recursos.

## Material para revisão

Links abaixo apontam a evidência local, ainda sem promoção para entrega versionada.

- [Fogueira em português](../runs/campfire-hero-bonds/runs/731125e8-9bb4-44bd-9b1b-3640a735dd73/camp-portuguese.png).
- [Reação de luto retomada](../runs/campfire-hero-bonds/runs/d24d71bc-5bf1-4843-8768-9534a3caf6be/second-grief-resumed.png).
- [Assunto da taverna renovado](../runs/campfire-hero-bonds/runs/d24d71bc-5bf1-4843-8768-9534a3caf6be/about-after-bridge-new.png).
- [Ausências simultâneas na chegada](../runs/campfire-hero-bonds/runs/cc2f8d1f-872c-4c91-ae48-56923ae4848e/all-dead-fade-67.png).
- [Um sobrevivente em1920×1080](../runs/campfire-hero-bonds/runs/5fba5a64-6acb-440b-997e-f43ad94be387/camp-living-total-1-round-3.png).
- [Áudio real: fogo, mute, restauração e saídas](../runs/campfire-hero-bonds/runs/731125e8-9bb4-44bd-9b1b-3640a735dd73/camp-options-and-exits.webm).

O momento sugerido para devlog combina ausência/reação e o assunto Sobre renovado. Não houve publicação nem inferência de aceite criativo.

## Presentation refinement requested after review

The owner replaced the lower conversation help with an icon inside each nameplate, extended the nameplates to camp, chose three seconds total for death fades, and required Talk-specific framing plus continuous interlocutors across social reading segments. Implementation stays in the same feature branch.

Fresh technical receipts: 61 fast cases pass (`.artifacts/campfire-refinement-fast-01`); IT-009/010/011 pass (`.artifacts/campfire-refinement-absence-02`). The tests now cover both dead-art pictures and their independent hitboxes; removed coordinate assertions were appearance checks (project question3), not loss-state protection. The native read/save/action boundaries are preserved.

Local directed material (not fresh-clone inputs):

- [EN1280 nameplates, HIDE, camp + guest and Continue](../runs/campfire-hero-bonds/runs/85fcd9fe-dd93-4957-b34a-4df0d1ec31dc/report.json). Agent inspected `formation-nameplates.png`, `camp-nameplates.png`, `social-composition-6.png`: labels fit; guest and original interlocutor coexist.
- [EN1920 grief/About and three repeated 180-frame absences](../runs/campfire-hero-bonds/runs/9ec06f29-e4ff-406b-b08a-01c160ca7455/report.json). Agent inspected Bimbren opening/body captures `social-composition-5.png` and `social-composition-7.png`; mirrored framing and initial interlocutor match the requested composition. The temporal observer verifies continuing pictures do not disappear between units.

The old screenshots and 60-frame camp observations remain historical for the superseded appearance. Unchanged route/domain/audio proofs remain valid in their original scope. Full worst-case human composition/editorial/audio acceptance remains with task09; these narrower technical observations do not close it.

Preserved failures: `4a02c6af` had a temporal observation bound sized for the former shorter fade; the corrected collector measured 180 frames in `9ec06f29`. `0fd610d3` stopped in the ordinary tavern Menu because the QA route omitted its Options selection; the video retained that evidence. No gameplay-state injection was used to recover either attempt. All completed runs closed their owned contexts, browsers and services.

Devlog material: show the new tavern/camp nameplates, then Bimbren’s first About line with Rheed already listening, and a guest intervention with all continuing participants. Use the recorded death fade video and temporal samples for the three-second timing; a still alone does not prove duration. Current overall status and later PT/reduced evidence: [verification](../../../planos/tasks/campfire-hero-bonds/verification.md#presentation-refinement).

PT/reduced follow-up: [f3ecd89d](../runs/campfire-hero-bonds/runs/f3ecd89d-7c54-4910-9fce-bba4d6314a04/report.json) passed after selecting Portuguese through Menu → Options. Agent inspected formation/camp nameplates and social-composition-6; no label overlap or lower novelty help, with all continuing participants visible. Browser errors: none. All owned resources closed. Scoped technical refinement PASS; wider human acceptance remains pending.

## Ícone nativo acima das placas — atualização posterior

O pedido posterior substitui o desenho dentro da placa pelo ícone 04 do IconSet, 32×32, centralizado 4 px acima; os nomes voltam a 18 px e ao centro. A verificação dirigida em PT/EN cobriu as duas cenas, topo da taverna, ✓, leitura/inédito, presença e HIDE/restauração. Inspeção do agente: **PASS**; nenhum erro de browser e todos os recursos próprios encerrados. Nenhum teste automatizado de aparência foi criado. Os resultados e as seis novas capturas selecionadas estão na [verificação do ícone nativo](../../../planos/tasks/campfire-hero-bonds/verification.md#native-icon-results-and-selected-captures), que substitui as capturas anteriores apenas para as placas. Aceite humano da spec mais ampla continua pendente.
