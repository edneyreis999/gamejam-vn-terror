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
  entry_point: file:///…/prototype/index.html
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
