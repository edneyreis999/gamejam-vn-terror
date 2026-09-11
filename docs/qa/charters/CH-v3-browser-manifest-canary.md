> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# CH-v3-browser-manifest-canary: Manifesto e relatório local

```yaml
charter:
  id: CH-v3-browser-manifest-canary
  mission: "Como Caio, abrir o runner adjacente e conferir que manifesto, registros e relatório atual permanecem atribuíveis e operáveis offline."
  mode: charter-with-tour
  persona:
    name: Caio, estrategista recorrente
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-run-browser-contract
  entry_point: retired HTML artifact (tests.html)
  scenarios: [LOC-local-launch-session, ACC-accessibility-diagnostics]
  tour: Feature Tour
  time_box_minutes: 30
  guidance:
    must_try:
      - "Abrir tests.html por file URL com rede desligada e aguardar a execução sequencial"
      - "Conferir 158 IDs V2, 10 BASE, 168 registrados, zero duplicados e concordância com window.__expeditionTestResults"
      - "Em cópias descartáveis, remover uma entrada do manifesto e duplicar outra; ambos os desvios devem falhar com o ID ausente ou duplicado atribuível"
      - "Se houver falha, confirmar ID, mensagem e stack; se não houver, confirmar 168 aprovados e zero falhas"
      - "Fechar durante uma execução e reabrir para confirmar reinício desde o primeiro caso"
    must_avoid:
      - "Usar totais históricos de 231/351, iniciar servidor, instalar ferramenta ou aproveitar resultado parcial"
```
