# CH-v3-offline-local-canary: Pacote local, imagens e abandono

```yaml
charter:
  id: CH-v3-offline-local-canary
  mission: "Como Rui, atravessar a entrada e a primeira decisão com rede e imagens indisponíveis para provar suficiência do pacote local e abandono limpo."
  mode: charter-with-tour
  persona:
    name: Rui, revisor de conteúdo
    device: desktop
    network: flaky
    locale: pt-BR
  journey: J-local-offline-launch
  entry_point: file:///…/prototype/index.html
  scenarios: [LOC-local-launch-session, ART-encounter-art-content]
  tour: Network Tour
  time_box_minutes: 60
  guidance:
    must_try:
      - "Abrir o pacote original e uma cópia relocada com a rede do Chrome desligada"
      - "Chegar à primeira abordagem, bloquear JPEGs locais e confirmar que texto e ações continuam suficientes"
      - "Em uma cópia descartável, remover o prólogo obrigatório prologue.01 e confirmar estado fatal legível, diagnóstico missing_narrative_content e ação Recarregar a página"
      - "Recarregar na preparação e durante o encontro para confirmar avisos, sessão nova e nenhuma retomada"
      - "Observar zero requisições HTTP(S) e nenhum fallback remoto"
    must_avoid:
      - "Adicionar servidor, cache, persistência, áudio ou usar o canário como aprovação humana de arte"
```
