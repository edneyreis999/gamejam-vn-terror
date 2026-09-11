# Jogar por teclado com conforto e inspeção sem mutação

```mermaid
flowchart TD
A["Abrir Chrome com área efetiva mínima suportada"] --> B
B["Inspecionar seed e estado pelos três métodos documentados"] --> C
C["Preparar o grupo por teclado e consultar sem selecionar"] --> D
D["Ler, ocultar e restaurar uma mensagem"] --> E
E["Escolher uma abordagem ou sacrifício após ocultar e restaurar escolhas"] --> F
F["Abrir opções, silenciar quatro categorias e retornar"] --> G
G["Repetir preparação e controles a 1920×1080, com zoom e movimento reduzido"] --> H
H["Confirmar estado, RNG e registro de ações e encerrar a sessão"]
D -->|Tab ou clique| D
E -->|cancelar recuo| E
F -->|Escape| E
D -.-> X["Abandono: fechar a aba ou interromper a revisão"]
X --> R["Restaurar o mesmo trecho com Tab ou clique sem avançá-lo; Continue usa o checkpoint se a aba fechar."]
R --> A
H --> Z["Ações ocorrem somente por decisão explícita; inspeção, HIDE e opções preservam a campanha."]
```

```yaml
journey:
  id: J-mz-qa-accessibility
  name: "Jogar por teclado com conforto e inspeção sem mutação"
  value_statement: "Ler e tomar decisões com foco visível, volume escolhido, HIDE e movimento reduzido."
  personas: ["Joana, jogadora ampliada"]
  entry_points:
    - url: http://127.0.0.1:18726/
      origin: direct
  actions:
    - step: 1
      verb: "Abrir Chrome com área efetiva mínima suportada"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 2
      verb: "Inspecionar seed e estado pelos três métodos documentados"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 3
      verb: "Preparar o grupo por teclado e consultar sem selecionar"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 4
      verb: "Ler, ocultar e restaurar uma mensagem"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 5
      verb: "Escolher uma abordagem ou sacrifício após ocultar e restaurar escolhas"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 6
      verb: "Abrir opções, silenciar quatro categorias e retornar"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 7
      verb: "Repetir preparação e controles a 1920×1080, com zoom e movimento reduzido"
      expected_observable: "A superfície nativa responde à ação explícita e mantém a decisão anterior até novo aceite."
    - step: 8
      verb: "Confirmar estado, RNG e registro de ações e encerrar a sessão"
      expected_observable: "Ações ocorrem somente por decisão explícita; inspeção, HIDE e opções preservam a campanha."
  goal:
    observable: "Ações ocorrem somente por decisão explícita; inspeção, HIDE e opções preservam a campanha."
    side_effects: ["Preferências de áudio persistem separadamente da campanha."]
  true_end_state: "Ações ocorrem somente por decisão explícita; inspeção, HIDE e opções preservam a campanha."
  exit:
    natural: Título ou sessão local encerrada
  abandonment:
    - at_step: 4
      how: Fechar a aba ou suspender a revisão
      resume: "Restaurar o mesmo trecho com Tab ou clique sem avançá-lo; Continue usa o checkpoint se a aba fechar."
  crosses: ["UI/UX","Programação"]
```

Preparação, receitas, sensores e teardown: [plano MZ](../guides/native-mz-cycle.md). O histórico HTML permanece em suas próprias jornadas.

Para o incremento de bustos, seguir os [lotes nativos de diálogo](../guides/vn-picture-busts-dialogues.md). A jornada existente continua dona do fluxo; exportação, audição e aceite humano históricos não acrescentam gates ao incremento autorizado.
