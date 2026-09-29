# L-014 — O jogo é a fonte; não espelhe conteúdo em docs

Em game dev, a documentação nunca fica mais atualizada que o código — no máximo empata. Logo, todo doc que *espelha* conteúdo do jogo (texto de diálogo, valores, IDs, estrutura de eventos, layout) só pode empatar ou defasar; nunca agrega. Mantenha uma fonte da verdade por fato: os dados nativos em `rpg-maker/The Dryland Drowned/`. Edite lá, como um humano no editor.

Teste de fumaça antes de criar qualquer doc ou fixture: **"Se eu mudar o jogo, isto é obrigado a mudar junto?"** Se sim, é espelho — não escreva à mão (o jogo é a fonte; se precisar, gere sob demanda e descarte). Se não (captura um *porquê*: decisão, trade-off, intenção, runbook), é durável e vale a pena.

Corolários: sem geradores doc→dado como pipeline permanente — migração é de uso único, executada e removida, não deixada de guarda exigindo re-sincronização. Prefira testes auto-referenciais (comparam o comportamento com os próprios dados de runtime) a snapshots/oráculos externos, que envelhecem a cada alteração e viram ruído vermelho. Caso completo em [`docs/postmortems/2026-09-29-over-engenharia-pipeline-narrativa`](../../postmortems/2026-09-29-over-engenharia-pipeline-narrativa/2026-09-29-over-engenharia-pipeline-narrativa.md). Relacionada: [[L-006]] (greenfield: apagar, não adaptar), [[L-013]] (não nomear implementação onde não deve).
