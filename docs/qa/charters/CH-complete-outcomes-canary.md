# CH-complete-outcomes-canary: Vitória, derrota e reset

```yaml
charter:
  id: CH-complete-outcomes-canary
  mission: "Como Lia, concluir vitória e derrota em sessões frescas para detectar regressões entre encontro, masmorra, desfecho e reset."
  mode: scenario-based
  persona:
    name: Lia, primeira expedicionária
    device: laptop
    network: wifi-fast
    locale: pt-BR
  journey: J-complete-campaign
  scenarios: [CAM-dungeon-progression-outcomes, ENC-encounter-consequences]
  tour: Feature Tour
  time_box_minutes: 90
  guidance:
    must_try:
      - "Vencer com oito sobreviventes"
      - "Morrer oito vezes e confirmar a consequência do bardo"
      - "Iniciar campanha nova após os dois terminais"
    must_avoid:
      - "Pular estados pelo DevTools"
```
