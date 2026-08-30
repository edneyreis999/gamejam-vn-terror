# CH-offline-all-images-blocked: Sessão local sem rede nem imagens

```yaml
charter:
  id: CH-offline-all-images-blocked
  mission: "Como Rui, atravessar a entrada e encontros com rede e imagens bloqueadas para provar que texto e ações continuam suficientes."
  mode: charter-with-tour
  persona:
    name: Rui, revisor de conteúdo
    device: desktop
    network: flaky
    locale: pt-BR
  journey: J-local-offline-launch
  scenarios: [LOC-local-launch-session, ART-encounter-art-content]
  tour: Network Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Abrir index.html por file URL com rede offline"
      - "Bloquear todos os dezesseis JPEGs e continuar escolhas"
      - "Recarregar durante um encontro e confirmar sessão nova"
    must_avoid:
      - "Adicionar servidor, cache, áudio ou fallback remoto"
```
