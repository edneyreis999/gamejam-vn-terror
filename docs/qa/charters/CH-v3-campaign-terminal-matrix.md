> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# CH-v3-campaign-terminal-matrix: Ordens, precedências e terminais V3

```yaml
charter:
  id: CH-v3-campaign-terminal-matrix
  mission: "Como Caio, concluir campanhas frescas pelas duas ordens e pelos três desfechos para detectar mistura de progresso, precedência incorreta ou reinício contaminado."
  mode: scenario-based
  persona:
    name: Caio, estrategista recorrente
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-complete-campaign
  entry_point: retired HTML artifact (index.html)
  scenarios: [CAM-dungeon-progression-outcomes, ENC-encounter-consequences, FOR-formation-roster]
  tour: Feature Tour
  time_box_minutes: 90
  guidance:
    must_try:
      - "Executar Ferro/Vozes e Vozes/Ferro em sessões frescas e chegar ao Legado 5+5+6"
      - "Alcançar reunião sem mortes, destruição com mortes e perda total; conferir omissão do memorial sem mortes e memorial dos oito"
      - "Matar o último membro do grupo na última posição com reservas, chegar ao Conselho com Ivaí sozinho e também provar a prioridade da oitava morte"
      - "Parar em Campanha concluída, depois usar Jogar novamente e confirmar avisos, oito vivos e nenhum estado herdado"
      - "Abandonar uma execução no meio por reload e confirmar nova sessão sem retomada"
    must_avoid:
      - "Usar dispatch, injetar estado, transportar reservas ao Conselho ou tratar resultados antigos como observação"
```
