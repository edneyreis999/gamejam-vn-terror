# BUG-20260909-memorial-survivors-total-loss: Memorial menciona sobreviventes após perda total

- **Status:** open
- **Impact (user-side):** Confusion
- **Severity:** Low · **Priority:** P2
- **Persona Affected:** Caio, estrategista recorrente
- **Journey Step:** J-mz-complete-campaign, memorial após perda total
- **Scenarios:** ART-mz-human-approval
- **Found:** 2026-09-09
- **Discipline:** Narrativa

## Reproduction

Executar a receita legal `final-sixth-total-loss`, ler o final ruim e entrar no memorial. Oito heróis morreram; o final também declara a morte de Ivaí. A narração diz: “Antes de partir, os sobreviventes dizem os nomes daqueles que a expedição perdeu.”

## Expected and observed

O memorial deve ser coerente com a ausência de sobreviventes. A frase fixa pressupõe testemunhas vivas. Evidência atual: `../evidence/init-rpg-maker-mz/task-13/directed-loss-large-20260909-01/passage-138.png` e `report.json`, observação `boundary-terminal`.

## Next action

Revisão narrativa deve definir texto compatível com o final ruim e avaliar os epílogos fixos que pressupõem perdas em campanhas sem mortes. Conteúdo não alterado implicitamente durante QA; aceite editorial final permanece pendente. A renderização das oito sepulturas e a continuação funcional passaram.

## Disposição no aceite — 2026-09-10

O usuário aprovou os testes humanos após este ponto ser apresentado. Mantido aberto como refinamento conhecido aceito para o incremento; não há correção ou reteste do texto. Deixou de bloquear o aceite da Task13. Tratar eventual mudança em spec incremental.
