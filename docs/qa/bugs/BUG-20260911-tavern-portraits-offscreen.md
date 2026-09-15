# BUG-20260911-tavern-portraits-offscreen: heróis aparecem cortados ou ausentes nas conversas

- **Status:** resolved — correção técnica verificada no checkout em 2026-09-15; ainda sem commit
- **Impact (user-side):** Friction
- **Severity:** Medium · **Priority:** P2
- **Persona Affected:** Rui, revisor de conteúdo
- **Journey Step:** J-mz-creative-review, apresentação dos heróis na taverna
- **Scenarios:** ART-mz-visual-audio-runtime
- **Found:** 2026-09-11 · **Report:** [final verify de pr3-taverna](../../../planos/tasks/pr3-taverna/verification.md)
- **Responsável sugerido:** Lucas, Technical Art, com apoio de Edney para os eventos nativos.

## Summary

Ao escolher Conversar, o jogador vê apenas recortes muito ampliados de vários heróis. Elowen e Vaelith não aparecem nos dois primeiros quadros, embora seus nomes e textos sejam exibidos. O palco com os oito heróis permanece visível e as interações completam. O problema também foi reproduzido com os dados da main `ee70f87`, antes da integração do PR #3.

## Reproduction

- **Charter:** CH-vn-picture-busts-dialogues · **Tour:** Feature Tour, recorte dirigido da taverna
- **Environment:** macOS, Chrome 153.0.8010.36, 1280×720, DPR 1, pt-BR, movimento normal; contexto isolado, sem save instalado.

1. Abrir o jogo e escolher Jogar.
2. Avançar o prólogo até a taverna.
3. Escolher Elowen ou Vaelith e depois Conversar.
4. Observar a apresentação e avançar para a descrição seguinte.
5. Repetir com Gorvak para observar o recorte ampliado.

**Expected:** o retrato do interlocutor é visível junto de sua apresentação.
**Actual:** Elowen e Vaelith ficam fora da tela; os demais retratos inspecionados aparecem com recorte excessivo.

## Evidence

[Elowen](../deliveries/pr3-taverna/conversation-elowen.png), [Vaelith](../deliveries/pr3-taverna/conversation-vaelith.png), [Gorvak/Ivaí](../deliveries/pr3-taverna/conversation-gorvak-ivai.png) e [Elowen na main](../deliveries/pr3-taverna/main-elowen.png). Hashes e revisões em [provenance.json](../deliveries/pr3-taverna/provenance.json).

O controle dirigido na main esperou bitmap carregado, opacidade 255 e movimento terminado. Para Elowen e Vaelith: imagem 2160×3840, âncora (0,5; 1), posição (320; 850), escala 100%, sprite visível e alpha 1. O topo do bitmap fica em y=-2990. O limite inferior da área não transparente fica em y=-90 para Elowen e y=-334 para Vaelith: toda a ilustração está acima do viewport. Não é imagem faltante nem falha de carregamento.

## Fix

- **Root cause:** os eventos de perfil usam imagens integrais com grandes dimensões/margens transparentes a 100%, ancoradas pela base em y=850. Os parâmetros e os PNGs relevantes de Elowen/Vaelith são idênticos à main; a integração preserva essa configuração. Gorvak preserva a entrada acordada em (200; 725), também a 100%.
- **Fix commit:** nenhum. O final verify não mudou PNGs, escalas ou posições; a decisão de enquadramento deve respeitar a preservação aprovada no ADR-001 de pr3-taverna.
- **Regression test:** reprodução dirigida e inspeção visual acima. Os testes existentes validam identidade, geometria e foco, mas não garantem pixels não transparentes do personagem dentro da tela.

## Verification

Reproduzido no candidato `mz-20260911-pr3-taverna-02` e no controle da main `mz-20260911-focus-parameters-02`. Nenhuma correção foi aplicada ou aprovada neste registro. O recorte de preservação do merge passa; a apresentação dos retratos permanece reprovada.


## Re-found (2026-09-14) — epilogues after map authorship expansion

The same oversized solo-portrait setup remains in Maps029–036, copied from CE306/308/310/312/314/316/318/320. Directed campaign `campaign-physical-before-framing` reached Elowen through a fresh game, physical route first, native Council/Reunir and epilogues; `passage-52.png` shows her text with no portrait. Integration IT058 also captured Draska's oversized legs. These local records are under `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/`; they retain the failing source hashes.

The task16 correction changes only the existing Scale_ScaleTo and Move_MoveToCoordinates parameters in each epilogue, using the same hero's solo layout from Maps037–044. Images, command positions, text, reading IDs, actions, save policy and vendor/plugin code remain unchanged. The materialized `fix-epilogue-framing.mjs` in the active spec checks preconditions and preserves native JSON structure. Fix is in the working tree, without a commit. IT073 now exercises all8 epilogues in both motion modes, requires loaded visible sprites within screen width and captures the framing; IT062 checks all8 native serialized presentations. Directed and visual retests remain in progress in task16. Earlier tavern-only findings and preservation decisions above remain historical.


## Current scoped verification — 2026-09-14

The eight tavern interaction maps now pass the48-image normal/reduced review. The epilogue correction passes IT047/062/073 and the independent16-image review: H1–H8 have visible faces and torsos, including H2 in both route orders. Source inspection confirms only Scale/Move at native command indices18/19 changed in each epilogue. This is technical framing verification; composition approval remains separate.

The bug stays **open** for the shared Council presentation. A genuine current campaign reaches Map023 and `campaign-physical-01/story-76.png` shows oversized/cropped Gorvak, Griznik and Ivaí. The inherited generic scales/positions are still authored in the Council/shared helpers, unlike the calibrated solo scenes. The active technical-art contract explicitly preserves Council/Andirá and shared styles; the user was asked whether to extend scope. Pending that decision, this is a confirmed follow-up, not a visual PASS or an implemented correction. Raw current evidence and reviewer reports are indexed by task16 of eventbridge-minimal-runtime.

The farewell shared presentation is also affected: `continuity-farewell-01/bust-1-farewell-H4.png` visibly shows only Seraphina's enlarged feet while her final line is displayed. This is a confirmed framing failure, distinct from the passing HIDE/Options/Continue behavior. The shared farewell bodies were retained rather than migrated in this increment; include their calibration in the same presentation follow-up, with all eight assets checked.


## Correção compartilhada — 2026-09-15

A solicitação explícita do usuário autorizou o escopo antes adiado. Os bloqueios técnicos remanescentes foram corrigidos nos seguintes locais:

| Cena | Local no editor |
| --- | --- |
| Conselho — heróis, Ivaí e reflexo de Andirá | Map023, evento001; CEs068/069/070/071 (falantes), 073 (entrada), 074 (intervenção) e079 (neutro). CE075 reutiliza a entrada corrigida. |
| Despedida de Gorvak | CE282 — farewell.H1 |
| Despedida de Elowen | CE283 — farewell.H2 |
| Despedida de Griznik | CE284 — farewell.H3 |
| Despedida de Seraphina | CE285 — farewell.H4 |
| Despedida de Bimbren | CE286 — farewell.H5 |
| Despedida de Liora | CE287 — farewell.H6 |
| Despedida de Vaelith | CE288 — farewell.H7 |
| Despedida de Draska | CE289 — farewell.H8 |

A escala genérica ignorava dimensões e margens transparentes dos PNGs. O Conselho agora usa escala/posição nativa por personagem, com variantes absolutas de falante/ouvinte; Ivaí e a arte existente de Andirá foram reenquadrados. As despedidas usam os parâmetros individuais já calibrados nos mapas037–044. Nenhum PNG ou plugin foi modificado. Conversas da taverna e epílogos conservam a correção e as verificações anteriores descritas acima.

IT012/061 reproduziram o defeito com os dados antigos e passaram após a alteração. IT012 cobre agora os oito heróis em ambos os modos; IT047/054/062 também passam. A inspeção real de18 capturas do Conselho e16 das despedidas confirma rostos/parte superior visíveis sem corte indevido; a janela sobrepõe a parte inferior conforme o enquadramento solo existente. Isso encerra este bug técnico, sem aprovar composição artística, navegação ou áudio. A [verificação da task16](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#correção-dos-bustos-compartilhados--2026-09-15) registra comandos, evidência, equivalência e os quatro pareceres humanos ainda pendentes. As seções anteriores preservam as observações de suas respectivas datas.
