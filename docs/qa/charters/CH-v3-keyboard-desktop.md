> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# CH-v3-keyboard-desktop: Campanha por teclado no desktop suportado

```yaml
charter:
  id: CH-v3-keyboard-desktop
  mission: "Como Joana, percorrer S01–S12 por teclado com zoom e movimento reduzido para encontrar barreiras dentro do desktop efetivo suportado."
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
      - "Manter área efetiva mínima de 1280×720 após zoom e usar Tab, Shift+Tab, setas, Enter, Espaço e Escape"
      - "Inspecionar heróis, selecionar equipe, operar destino, leitura, recuo, sacrifício, Conselho, desfecho e Jogar novamente sem mouse"
      - "Ativar movimento reduzido e confirmar ausência imediata, foco visível/devolvido e nenhuma decisão dependente de animação"
      - "Abandonar por reload durante leitura e confirmar abertura sem texto visto herdado"
    must_avoid:
      - "Usar 320 px, viewport estreito, touch, dispatch ou declarar resultado de VoiceOver"
```
