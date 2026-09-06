# CH-v3-seeded-public-contract: Reprodução e fronteiras V3

```yaml
charter:
  id: CH-v3-seeded-public-contract
  mission: "Como Caio, pressionar seeds, leituras e diagnósticos V3 para provar reprodução somente leitura e separação entre informação pública e privada."
  mode: strategy-based
  persona:
    name: Caio, estrategista recorrente
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-reproduce-campaign
  entry_point: file:///…/prototype/index.html e Chrome DevTools antes de Jogar
  scenarios: [ACC-accessibility-diagnostics, CAM-dungeon-progression-outcomes, FOR-formation-roster, ENC-encounter-consequences]
  tour: Garbage Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Testar seeds 0, 4294967295, inválida e tardia, então repetir mesma seed/ordem/roteiro em sessões frescas"
      - "Tentar alterar snapshot e validate retornados e confirmar que leituras posteriores continuam intactas"
      - "Conferir que expeditionQA expõe só setSeed, snapshot e validate; comparar diagnóstico com nomes, rumores e progresso públicos"
      - "Completar passagens, revisitar, pular sequências vistas e parar antes de texto inédito ou decisão"
      - "Recarregar sem reaplicar seed e confirmar snapshot pronto sem estado herdado"
    must_avoid:
      - "Adicionar método mutante, usar diagnóstico para decidir abordagem ou aceitar vazamento de competência, viabilidade ou atribuição futura"
```
