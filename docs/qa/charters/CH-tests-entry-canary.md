# CH-tests-entry-canary: Canário do runner local

```yaml
charter:
  id: CH-tests-entry-canary
  mission: "Como Caio, abrir o runner adjacente para confirmar que fontes de produção e o contrato de 231 casos continuam operáveis sem infraestrutura."
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
      - "Abrir tests.html diretamente com rede desligada"
      - "Registrar total, aprovados, falhas e diagnósticos esperados"
    must_avoid:
      - "Instalar Playwright, npm, Make ou iniciar servidor"
```
