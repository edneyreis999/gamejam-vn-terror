# Personas do protótipo

```yaml
personas:
  - name: Lia, primeira expedicionária
    base: New User
    goal: compreender a formação e chegar ao primeiro resultado sem conhecer regras internas
    device: laptop
    network: wifi-fast
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 60
  - name: Caio, estrategista recorrente
    base: Power User
    goal: concluir e reproduzir uma campanha usando o histórico e a seed
    device: desktop
    network: wifi-fast
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 20
  - name: Joana, jogadora ampliada
    base: Accessibility-Reliant User
    goal: concluir a campanha só por teclado com zoom e movimento reduzido
    device: laptop
    network: wifi-fast
    modality: keyboard-only
    locale: pt-BR
    patience_seconds: 90
  - name: Rui, revisor de conteúdo
    base: Recovering User
    goal: confiar que arte, fallback e texto não entregam pistas nem quebram a campanha
    device: desktop
    network: flaky
    modality: mouse-keyboard
    locale: pt-BR
    patience_seconds: 30
```

Não existe superfície touch/mobile formal; a largura estreita representa reflow no Chrome desktop. Por isso uma persona Mobile não foi criada.
