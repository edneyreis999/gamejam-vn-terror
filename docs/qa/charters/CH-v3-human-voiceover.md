> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# CH-v3-human-voiceover: Leitura da campanha com VoiceOver

```yaml
charter:
  id: CH-v3-human-voiceover
  mission: "Como Joana com VoiceOver, caminhar os principais estados da campanha para avaliar nomes, ordem, anúncios, diálogos e mudanças dinâmicas como uma pessoa usuária."
  mode: charter-with-tour
  persona:
    name: Joana, jogadora ampliada
    device: laptop
    network: wifi-fast
    locale: pt-BR
  journey: J-complete-campaign
  entry_point: retired HTML artifact (index.html)
  scenarios: [ACC-accessibility-diagnostics, FOR-formation-roster, ENC-encounter-consequences, CAM-dungeon-progression-outcomes]
  tour: Feature Tour
  time_box_minutes: 90
  guidance:
    must_try:
      - "Usar VoiceOver real nos avisos, leitura, taverna, destino, encontro, aviso irreversível, retorno, Conselho e terminal"
      - "Confirmar nomes acessíveis, ordem coerente, mudança de foco e anúncio de erro, morte, ausência e desbloqueio"
      - "Completar um desfecho e abandonar outra sessão por reload, registrando onde a orientação se perde"
    must_avoid:
      - "Substituir a pessoa por Axe, inspeção do DOM, roteiro automatizado ou inferência de agente"
```
