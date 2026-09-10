# CH-mz-recovery-export

```yaml
charter:
  id: CH-mz-recovery-export
  mission: "Editar uma cópia e recuperar decisões no pacote completo após falhas isoladas."
  mode: charter-with-tour
  persona:
    name: Rui, revisor de conteúdo
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-mz-recovery-export
  scenarios: ["LOC-mz-session-recovery-export","ART-mz-visual-audio-runtime"]
  tour: Network Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Injetar rejeição somente na fronteira I/O ou indisponibilidade do asset requerido."
      - "Salvar uma edição em cópia completa no editor e validar antes de exportar."
      - "Incluir todos os assets e percorrer entrada, escolha, save e Continue no pacote."
    must_avoid:
      - "Não alterar estado de campanha, switches ou variáveis para produzir uma cena E2E."
      - "Não usar saves pessoais, publicar o pacote ou tratar evidência automatizada como aceite humano."
```

Setup e teardown: [plano MZ](../guides/native-mz-cycle.md). A missão é imutável; debriefs ficam no relatório datado da execução. Ao encerrar o time-box, registrar o que foi alcançado e planejar outra sessão para o restante.
