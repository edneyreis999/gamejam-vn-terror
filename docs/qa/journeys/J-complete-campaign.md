# Concluir a campanha completa em qualquer ordem

```mermaid
flowchart TD
  A[Entry local] --> B[Introdução neutra]
  B --> C[Preparação inicial: dois caminhos disponíveis e Legado bloqueado]
  C --> D{Escolher caminho inicial ou heróis primeiro}
  D -->|Ferro e Raízes| E[Escolher três heróis]
  D -->|Vozes e Espelhos| E
  D -->|Heróis primeiro| H0[Escolher três heróis]
  H0 --> R0{Escolher caminho inicial}
  R0 -->|Ferro e Raízes| F
  R0 -->|Vozes e Espelhos| F
  E --> F[Partir para o caminho escolhido]
  F --> G[Revelar encontro]
  G --> H{Abordagem cobre competência?}
  H -->|sim| I[Explicação e avanço]
  H -->|não| J[Escolher e confirmar sacrifício]
  J --> K[Elenco recalculado]
  I --> L{Recuar ou continuar?}
  K --> L
  L -->|recuar| M[Voltar à preparação com consequências e registros preservados]
  M --> M2{Algum caminho inicial já foi concluído?}
  M2 -->|não| C
  M2 -->|sim| C2
  L -->|continuar| N{Caminho concluído?}
  N -->|não| G
  N -->|sim| O[Reconhecer parte do mapa recuperada]
  O --> P{Quantas partes?}
  P -->|1 de 2| Q[Devlog: concluído estático, outro inicial selecionado, Legado bloqueado]
  Q --> C2[Preparação após 1/2: concluído estático, outro disponível e selecionado, Legado bloqueado]
  C2 --> C3[Formar o grupo e confirmar Partir]
  C3 --> F
  P -->|2 de 2| R[Legado liberado e selecionado]
  R --> R2[Voltar à preparação, formar o grupo e confirmar Partir]
  R2 --> S[Atravessar seis encontros finais]
  S --> T{Há sobreviventes?}
  T -->|sim| U[Vitória e epílogos]
  T -->|não| V[Derrota total]
  U --> W[Campanha nova]
  V --> W
  W --> X[True end: abertura limpa, sem rota ou consequência anterior]
  C -.->|fechar aba| Y[Abandono: sessão em memória perdida]
  G -.->|fechar aba| Y
  Y --> A
```

```yaml
journey:
  id: J-complete-campaign
  name: Concluir expedição em qualquer ordem
  value_statement: "O jogador escolhe a ordem dos dois caminhos iniciais, administra perdas e alcança um desfecho coerente pelo Caminho do Legado."
  personas: ["Lia, primeira expedicionária", "Caio, estrategista recorrente", "Joana, jogadora ampliada", "Rui, revisor de conteúdo"]
  entry_points:
    - url: file:///…/prototype/index.html
      origin: direct
  actions:
    - step: 1
      verb: Comparar os dois caminhos iniciais e o Legado bloqueado
      expected_observable: Dois rádios começam desmarcados e o terceiro cartão explica a exigência de duas partes do mapa
    - step: 2
      verb: Escolher destino e três heróis em qualquer ordem
      expected_observable: As duas escolhas são preservadas e a partida compromete somente o caminho selecionado
    - step: 3
      verb: Resolver encontros, sacrificar ou recuar para trocar de caminho
      expected_observable: Mortes, atribuições e maior percurso permanecem ligados ao caminho correto, mas a nova tentativa recomeça no primeiro marco
    - step: 4
      verb: Concluir os dois caminhos iniciais em qualquer ordem
      expected_observable: "1/2 — após a primeira conclusão, o caminho concluído vira cartão estático, o outro fica selecionado e o Legado mostra 1 de 2 partes; 2/2 — após a segunda, ambos ficam estáticos e o Legado fica selecionado em 2 de 2."
    - step: 5
      verb: Confirmar a formação e Partir para o Caminho do Legado, atravessá-lo e iniciar campanha nova
      expected_observable: O Legado fica selecionado automaticamente, mas exige grupo válido e Partir explícito; seis encontros levam a vitória ou derrota e o reset remove toda consequência da sessão anterior
  goal:
    observable: As ordens Ferro/Vozes e Vozes/Ferro convergem para o Legado e um desfecho sem repetição de caminho concluído
    side_effects: [historico-aceito-da-sessao, atribuicoes-por-caminho, partes-do-mapa]
  true_end_state: Iniciar campanha nova retorna à abertura sem mortes, atribuições, progresso dos caminhos em zero, partes do mapa, rota selecionada ou rota ativa
  exit:
    natural: nova campanha pronta
  abandonment:
    - at_step: 2
      how: Fechar ou recarregar a aba durante a preparação
      resume: Uma sessão limpa aparece, sem recuperação implícita
    - at_step: 3
      how: Fechar ou recarregar a aba durante uma consequência
      resume: Uma sessão limpa aparece, sem recuperação implícita
  crosses: [preparacao, encontros, imagens, caminhos, fragmentos, desfechos, acessibilidade]
```
