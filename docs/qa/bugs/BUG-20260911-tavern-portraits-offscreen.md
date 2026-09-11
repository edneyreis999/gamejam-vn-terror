# BUG-20260911-tavern-portraits-offscreen: heróis aparecem cortados ou ausentes nas conversas

- **Status:** open
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
