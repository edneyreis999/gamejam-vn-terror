# QA Run Report — 2026-09-11 — diálogos com bustos nativos

- **Scope:** spec `vn-picture-busts-dialogues`, autoria nativa, ensemble, foco, Continue e controles.
- **Cadence tier:** full para o incremento; não renova aceite audiovisual de toda a campanha.
- **Build:** working tree `mz-20260911-busts-native-01`, revisão inicial congelada em task-09/review-20260911-round1; EventBridge atual `7b161464b1ccb489a01502ce8bae57fa4ba2c13fc46ea8ad30c953d984736e55` após correção RD0001.
- **Environment:** Chrome 153.0.8010.36 local na porta 18727, 1280×720 normal e 1920×1080 com movimento reduzido, Node 22.23.2, perfis e cópias descartáveis.
- **Started:** 2026-09-11 · **Status:** blocked — V007 / V008

## Personas

| Persona | Base | Device / Network / Locale | Sessions |
| --- | --- | --- | --- |
| Caio | Power User | desktop/local/pt-BR | CH-vn-picture-busts-dialogues |
| Joana | Accessibility-Reliant User | desktop/teclado/reduced/pt-BR | variantes maiores e controles |
| Lia | New User | desktop/mouse+teclado/pt-BR | perda e preparação |
| Rui | Recovering User | desktop/local/pt-BR | autoria e inspeção de arte |

Personas orientam a inspeção do agente; nenhum desses nomes identifica uma sessão humana realizada.

## Flows in Scope

[Guia e ledger](../guides/vn-picture-busts-dialogues.md), [campanha](../journeys/J-mz-complete-campaign.md), [recuperação](../journeys/J-mz-recovery-export.md), [acessibilidade](../journeys/J-mz-qa-accessibility.md) e [revisão visual](../journeys/J-mz-creative-review.md). A execução mantém suas seis famílias de cenário.

## Session Matrix & Results

| Lote | Cenário | Execução dirigida | Inspeção / limite |
| --- | --- | --- | --- |
| T normal + ampliado/reduzido | FOR | PASS, oito heróis × quatro famílias, 32 seções / 72 caixas por modo | 144 capturas das quatro famílias na tarefa02 e 83 amostras da09 inspecionadas; PASS visual no escopo |
| C1–C8 normal | CAM/ART | PASS, oito produtores legais e 21 pares herói/posição | Demanda e todos os focos elegíveis inspecionados |
| R1–R8 ampliado/reduzido | LOC/CAM/ART | PASS, Continue de cada master, outra escolha final, master intacto | Todos os focos elegíveis inspecionados |
| I nos dois modos | CAM/ART | PASS, descoberta sobrenatural primeiro e final destruir | Texto/enquadramento passam; prisão visível falha |
| Z nos dois modos | CAM/LOC | PASS, Conselho sem heróis com reservas, sem epílogos | Ivaí e Andirá inspecionados sem retratos de heróis |
| L nos dois modos | ENC/CAM/LOC | PASS, oito despedidas, perda total e Continue terminal | Oito despedidas por área e saída inspecionadas |
| U | ACC | Controles dirigidos da tarefa06; suíte completa pós-correção PASS | Escopo retido após análise da correção RD0001 e suíte atual |
| S | LOC | Save/recovery da tarefa 05/06 e oito masters legais usados na 09 | Compatibilidade dos archives é estrita por fontes; não alterar hashes para reutilizá-los |
| F | ART/LOC | 2x2 e edição dos dados no Chrome passam | BLOCKED: evidência de edição no MZ indisponível |
| X | ACC/LOC | Interrupções nativas da06; suíte completa pós-correção PASS | Integrações identificadas, sem alegação de navegação E2E |

## Session Debriefs

O primeiro candidato passou nos 138 testes registrados, sem falhas ou skips, e na CLI de conteúdo: `task-09/2026-09-11T09-22-24-373Z`. Em seguida, os 24 lotes dirigidos passaram nas asserções: C1/R1 e os 22 lotes de `task-09/final-lots-20260911/results.json`. Os relatórios brutos conservam `executed-awaiting-review`; os vereditos visuais vêm das inspeções registradas, não desse status do executor.

A revisão encontrou RD0001, reproduzido pelo IT-068 em `task-09/2026-09-11T10-33-49-447Z`: um helper criava busto sem conversa responsável após início rejeitado. A correção passou no mesmo teste, incluindo 2x2 completo, em `task-09/2026-09-11T10-35-04-415Z`. A suíte completa pós-correção passou138/138, sem falhas/skips, CLI exit0, em `task-09/2026-09-11T10-36-54-403Z` (1900,7s). A segunda rodada de revisão estática confirmou a correção e não encontrou outros defeitos de código. A análise de impacto conserva somente os observáveis visuais/de conteúdo não alterados dos24 lotes anteriores; quatro novas execuções confirmam os caminhos afetados no código atual.

RD0002 foi suprimido após conferir os checkpoints permitidos. A reprodução prejudicial inseria um checkpoint fora da autoria aprovada. O checkpoint real após `council.01` ainda não contém bustos; CE40 restabelece a conversa antes dos helpers. A triagem permanece ao lado da revisão inicial, sem apresentar análise estática como reprodução no navegador.

## What Was Fixed

- [Cancelamento deixava bustos](../bugs/BUG-20260911-busts-survive-cancel.md): filhos e reconstrução perdem autoridade antes de limpar apenas suas pictures.
- [Skip bloqueava escolha final](../bugs/BUG-20260911-seen-skip-blocks-final-choice.md): término do caminho S agora limpa o pause que o avanço nativo consome.
- [Saída instantânea deixava Andirá/heróis](../bugs/BUG-20260911-reduced-exit-leaves-andira.md): autoerase com duração zero finalizado no adaptador sem alterar vendor.
- [Helper sem conversa responsável](../bugs/BUG-20260911-ownerless-bust-helper.md): chamadas aos helpers e aos trechos com bustos exigem a responsabilidade ativa correspondente.

As correções estão no diff local, sem commit; primeiras falhas e retestes permanecem nos registros vinculados.

## Runtime Errors Observed

Falhas de fixture preservadas: input antes de título pronto; recuo sem reescolher destino; retenção da janela anterior ao exemplo2x2; sensor de bitmap que parava antes da reconstrução privada. Cada preparação foi corrigida e repetida no dono, sem promover a tentativa falha a PASS. A primeira tentativa de produtor na tarefa 09 falhou no executor por nomes de captura com ponto; o observador foi corrigido e todos os lotes seguintes passaram. Os defeitos confirmados de runtime/autoria estão nos quatro bugs acima.

## Human Verifications Needed

Nenhuma aprovação humana é dependência deste loop (ADR003). `human_accepted` permanece false para a composição nova. O aceite humano histórico da baseline não a aprova automaticamente.

## Technical Gaps

V008: MZ instalado/rodando, mas CUA não obtém janela (`cgWindowNotFound`). Nenhum campo foi editado/aceito no editor. Edição nativa no Chrome passou e não substitui esse sensor. V007: capturas reais de Pérola/Church e Floraí/Figtree confirmam ausência de prisão visível. [Bug de Technical Art](../bugs/BUG-20260911-lovers-prison-not-visible.md); PNGs são obrigatoriamente preservados neste incremento. A matriz restante foi percorrida e a consolidação de revisão, equivalência e suíte pós-correção foi concluída. O [indicador de pausa cortado](../bugs/BUG-20260911-pause-indicator-clipped.md) também foi registrado como refinamento existente de UI/UX, confirmado em captura anterior à migração de epílogos; não remove palavras nem impede o avanço.

## Final Status

**NOT_READY por V007 e V008.** Sete tarefas concluídas;07 e09 permanecem bloqueadas pelos critérios acima. A implementação local cobre63 seções/103 caixas originais, preservando258 identidades/282 caixas e1.234 arquivos protegidos. A suíte completa pós-correção passou138/138 e a revisão encerrou sem defeitos confirmados de código abertos.

Foram28 lotes dirigidos bem-sucedidos em suas asserções:24 da revisão anterior e quatro na atual (C1normal, R1Continue ampliado/reduzido, Tnormal e Tampliado/reduzido). A retenção dos24 cobre observáveis que não mudaram, conforme a análise das três proteções de entrada alteradas; I/Z/L e os outros sete grupos não foram reapresentados como execuções novas. Todos os arquivos de jogo e testes canônicos coincidem com a suíte atual. A instrumentação temporal posterior é somente leitura, foi revisada e executada nos dois novos lotesT.

O banco tem oito masters históricos incompatíveis com a revisão atual e um novo master H1/H2/H3 compatível, íntegro após Continue e conferido contra1.419 arquivos. Prefixo do produtor74,8s; restauração do consumidor2,8s; Conselho/arquivamento10,2s e14,0s; finais8,2s e9,6s, respectivamente. Esses tempos são medidos, sem extrapolação de desempenho.

A inspeção independente da taverna cobre254 PNGs. O índice do agente principal contém212 PNGs únicos em41 registros; há sobreposição entre esses conjuntos. Os112 estados estáveis da taverna atual coincidem com a matriz preservada. As novas amostras temporais inspecionadas são21 no modo normal e12 no ampliado/reduzido; intervalos de screenshots não comprovam cadência contínua. Onze capturas selecionadas preservam o momento demonstrável para devlog. Nenhuma aprovação humana nova foi inferida.

[Resumo verificável](../deliveries/vn-picture-busts-dialogues/verification-summary.json) · [lotes atuais e novo save](../deliveries/vn-picture-busts-dialogues/post-review-lot-ledger.json) · [revisão](../deliveries/vn-picture-busts-dialogues/review-summary.json) · [capturas e proveniência](../deliveries/vn-picture-busts-dialogues/README.md). Masters e relatórios brutos permanecem em `docs/qa/evidence/vn-picture-busts-dialogues/`; cópias/perfis descartáveis foram encerrados. Nenhum staging, commit, PR ou publicação foi realizado.
