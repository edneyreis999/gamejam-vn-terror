# CH-mz-keyboard-qa

```yaml
charter:
  id: CH-mz-keyboard-qa
  mission: "Concluir preparação e decisões com foco, HIDE e opções preservando a campanha."
  mode: charter-with-tour
  persona:
    name: Joana, jogadora ampliada
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-mz-qa-accessibility
  scenarios: ["ACC-mz-hide-keyboard-qa"]
  tour: Feature Tour
  time_box_minutes: 90
  guidance:
    must_try:
      - "Usar teclado em 1280×720 e 1920×1080 e zoom que mantenha o mínimo."
      - "Ocultar e restaurar mensagens e escolhas com Tab e clique; abrir opções e silenciar."
      - "Repetir a ausência com movimento reduzido e comparar os três métodos QA antes/depois."
    must_avoid:
      - "Não alterar estado de campanha, switches ou variáveis para produzir uma cena E2E."
      - "Não usar saves pessoais, publicar o pacote ou tratar evidência automatizada como aceite humano."
```

Setup e teardown: [plano MZ](../guides/native-mz-cycle.md). A missão é imutável; debriefs ficam no relatório datado da execução. Ao encerrar o time-box, registrar o que foi alcançado e planejar outra sessão para o restante.
