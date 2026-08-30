# CH-seeded-diagnostics-reproduction: Reproduzir e inspecionar duas sessões

```yaml
charter:
  id: CH-seeded-diagnostics-reproduction
  mission: "Como Caio, repetir seed 20260830 e ações idênticas para provar snapshots atômicos, validação não mutante e reseed fechado."
  mode: strategy-based
  persona:
    name: Caio, estrategista recorrente
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-reproduce-campaign
  scenarios: [ACC-accessibility-diagnostics, CAM-dungeon-progression-outcomes]
  tour: Garbage Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Testar seeds 0, 4294967295, inválida e tardia"
      - "Comparar assignments e actionHistory de duas sessões frescas"
      - "Registrar validate e o S11 controlado sem expor backdoor"
    must_avoid:
      - "Mutar snapshot, injetar catálogo ou reparar violações"
```
