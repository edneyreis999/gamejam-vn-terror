# BUG-20260917-prologo-busto-e-nome-intermitentes: busto e identificação somem durante a leitura

- **Status:** closed — falso positivo de inspeção, corrigido em 2026-09-17; nenhuma correção de runtime necessária.
- **Impact (user-side):** Friction
- **Severity:** Medium · **Priority:** P1 para o aceite deste prólogo.
- **Disciplina:** Programação, com revisão visual de Technical Art/UI/UX.
- **Persona Affected:** Lia, primeira expedicionária.
- **Journey Step:** J-mz-complete-campaign, abertura.
- **Scenarios:** ART-mz-visual-audio-runtime; ACC-mz-hide-keyboard-qa.
- **Found:** 2026-09-17 · **Report:** [ciclo do prólogo](../reports/2026-09-17-prologo-rheed.md).

## Conclusão corrigida — 2026-09-17

A alegação de pixels ausentes foi refutada pela decodificação dos PNGs originais com System.Drawing: 78 comparações exatas de regiões de busto/nome/restauração coincidiram com a composição de referência na mesma execução. Em `A1-run`, toda a área acima da caixa de diálogo (1280 × 512) é idêntica entre as caixas 1 e 4: zero pixels diferentes. A região do nome na pergunta do jovem também coincide com a identificação de Rheed. A prévia usada na inspeção não foi uma representação confiável dessas regiões; o mecanismo exato dessa divergência de exibição não foi estabelecido. O erro confirmado foi atribuir a prévia ao conteúdo do arquivo e abrir um bug de produto sem conferir os pixels.

Foram comparados canvas e captura do Chrome com e sem escala forçada; ambos contêm o retrato. As hipóteses de GPU, escala e AttachedPictures não se sustentam. Nenhum vendor, evento ou asset foi modificado para ocultar o sintoma. A inspeção corrigida usa o arquivo original, hashes de regiões e visualizações derivadas, preservando o PNG como evidência primária. Isso confirma presença e estabilidade, não substitui aceite humano de enquadramento.

Evidência local: `task-03/pixel-audit.json`, `audit-pixels.ps1`, `inspection-box4.jpg`, `review-A3.jpg`, os diagnósticos `runs/43207f10-2a64-4b22-a153-e33e37637112` e `canvas-forced-scale`. O relatório do ciclo registra separadamente a correção do input de QA.

## Registro inicial preservado — conclusões visuais superadas

As seções seguintes registram a interpretação inicial, agora refutada; não representam o status corrente.

## Summary

Algumas caixas de narração aparecem com fundo preto e texto, mas sem o busto de Rheed e sem a caixa do nome. Algumas capturas também não mostram os botões inferiores. A pergunta do Rheed jovem pode perder o nome, embora a ausência de busto nessa fala seja intencional. O texto e os dados internos continuam corretos; isso não basta para aprovar a apresentação.

## Reproduction

- **Charter:** CH-prologo-rheed · **Tour:** Feature Tour.
- **Environment:** Windows 10.0.26200, Chrome 152.0.7977.83, Node 22.21.0; perfis isolados, `http://127.0.0.1:18729/`; 1280×720 e 1920×1080, DPR 1, normal/reduzido, escala padrão.
1. Iniciar jogo num arquivo vazio pela UI.
2. Avançar a apresentação de Rheed até “Naqueles dias...” e a descrição dos papéis de Irati.
3. Comparar as imagens com a primeira caixa. Em outra execução, usar HIDE/restaurar e Configurações/voltar na narração e repetir a observação.

**Expected:** busto de Rheed em N01–N03 e identificação visível quando a mensagem está aberta; controles restaurados. N05 mantém nome Rheed sem busto.

**Actual:** pixels de busto/nome ausentes em parte das capturas, inclusive sem usar Configurações. O problema é intermitente entre caixas/execuções, não um desaparecimento permanente do objeto de imagem.

## Evidence

Raiz local ignorada: `docs/qa/evidence/prologo-rheed/task-03/`.

- `A1-run/opening-box-4.png`, `controls-0-keyboard-restored.png`: ausência visual.
- `A1-render-diagnostic/opening-box-2.png`: ausência persiste após 60 quadros observados; janela aberta, sprite worldVisible=true e worldAlpha=1 nas leituras. A espera por abertura completa não resolveu.
- `runs/91a4e7d5-02c4-46b3-9150-e36c6d12a070/opening-box-2.png` e `opening-box-4.png`: reprodução a 1920×1080 normal, sem teste de controles.
- `runs/bdf08745-4612-42f8-b622-ec4ab9285040/opening-box-8.png`: pergunta sem identificação a 1920×1080 reduzido.
- `A2-software-diagnostic/opening-box-4.png`: reprodução com SwiftShader. Essa comparação não é correção nem substituição da variante padrão.
- Cada diretório contém `report.json`, fontes/hashes e histórico de inputs. Os registros internos não foram usados como prova de pixels corretos.

## Diagnosis and next action

Não confirmado se a origem é composição do runtime, renderização das janelas/plugins ou mecanismo de captura. Hipóteses de captura antes da abertura e problema exclusivo da GPU padrão não explicaram a reprodução. Próxima investigação: comparar saída do canvas e captura da janela no mesmo estado, inspecionar camadas/máscaras das janelas e o vínculo nativo de AttachedPictures. Não alterar vendor/engine nem forçar software como correção sem causa demonstrada e respeito ao contrato aprovado.

Uma tentativa diagnóstica A1 com SwiftShader também expirou ao retornar de Configurações; o erro original foi preservado e não atribuído ao jogo sem isolamento. A2 por software completou o fluxo e reproduziu a ausência visual.

Este sintoma difere do [enquadramento histórico](BUG-20260911-tavern-portraits-offscreen.md), cuja causa era posição/escala: agora a mesma composição alterna entre visível e ausente e afeta também o nome.

## Verification

V-002 reprovado na inspeção; V-004 sem aceite. Nenhuma correção de runtime aplicada nesta task. Reexecutar somente os lotes afetados após diagnóstico e correção, preservando estes registros negativos.
