# Personas do protótipo

```yaml
personas:
  - name: Lia, primeira expedicionária
    base: New User
    goal: compreender a preparação, assumir uma perda irreversível e chegar a um desfecho sem conhecer regras internas
    device: laptop
    network: wifi-fast
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 60
  - name: Caio, estrategista recorrente
    base: Power User
    goal: concluir e reproduzir campanhas V3 pelas duas ordens usando somente controles do jogador e diagnóstico somente leitura
    device: desktop
    network: wifi-fast
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 20
  - name: Joana, jogadora ampliada
    base: Accessibility-Reliant User
    goal: concluir a campanha por teclado com zoom e movimento reduzido mantendo área efetiva mínima de 1280×720 CSS px
    device: laptop
    network: wifi-fast
    modality: keyboard-only
    locale: pt-BR
    patience_seconds: 90
  - name: Rui, revisor de conteúdo
    base: Recovering User
    goal: avaliar em pessoa se texto, sensibilidade cultural, arte provisória e fallbacks preservam confiança e não entregam pistas privadas
    device: desktop
    network: flaky
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 30
```

Não existe superfície touch/mobile formal neste incremento; por isso uma persona Mobile não foi criada. Largura abaixo de 1280×720 efetivos, inclusive quando causada por zoom, está fora do alvo do protótipo.

Joana cobre teclado, foco visível, ordem de leitura, zoom dentro da área suportada e movimento reduzido. Uma sessão humana com VoiceOver continua pendente e não pode ser substituída por Axe, inspeção do DOM ou observação de agente. Rui mantém aprovação editorial, cultural e de arte final separada de testes automatizados, comparação visual e travessia funcional.
