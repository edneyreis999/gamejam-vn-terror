# CH-eventbridge-first-campaign: preparar e retomar uma expedição nativa

```yaml
charter:
  id: CH-eventbridge-first-campaign
  mission: "Descobrir os heróis e preparar uma expedição sem confundir consulta, seleção e arquivo de campanha."
  mode: charter-with-tour
  persona:
    name: Lia, primeira expedicionária
    device: desktop
    network: wifi-fast
    locale: pt-BR
  journey: J-mz-complete-campaign
  scenarios: [FOR-mz-formation-roster, ENC-mz-encounter-sacrifice-retreat, LOC-mz-session-recovery-export]
  tour: Feature Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Cancelar a primeira seleção de arquivo, começar uma campanha e consultar os oito heróis."
      - "Comparar Conversar, Selecionar, Retirar, Destinos e Elenco; partir e recuar por escolhas explícitas."
      - "Fechar/reabrir e continuar o arquivo escolhido, registrando o checkpoint que realmente foi salvo."
    must_avoid:
      - "Não alterar campanha, seed, switches ou variáveis pela inspeção."
      - "Não usar saves pessoais nem transferir aceites históricos para a nova UI."
```

Setup, banco, observáveis e teardown: [guia corrente](../guides/eventbridge-minimal-runtime.md). Missão imutável; debriefs ficam no relatório datado, com a sessão encerrada dentro do time-box.
