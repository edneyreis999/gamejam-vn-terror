# CH-route-tests-entry-canary: Canário do contrato de 351 casos

```yaml
charter:
  id: CH-route-tests-entry-canary
  mission: "Como Caio, abrir o runner local atualizado para confirmar que o contrato de 351 casos e as duas ordens continuam operáveis sem instalação, servidor ou rede."
  mode: charter-with-tour
  persona:
    name: Caio, estrategista recorrente
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-run-browser-contract
  scenarios: [LOC-local-launch-session, ACC-accessibility-diagnostics]
  tour: Feature Tour
  time_box_minutes: 30
  guidance:
    must_try:
      - "Abrir tests.html diretamente por file URL em Chrome com a rede desligada"
      - "Confirmar exatamente 351 registrados, 351 aprovados, zero falhas e o resumo exportado"
      - "Localizar E2E-023 e E2E-024 na lista para confirmar as duas ordens completas"
    must_avoid:
      - "Editar o runner, instalar dependências, iniciar servidor ou reutilizar o charter histórico de 231 casos"
```

<!-- O charter é durável e imutável; debriefs pertencem ao relatório de cada execução. -->
