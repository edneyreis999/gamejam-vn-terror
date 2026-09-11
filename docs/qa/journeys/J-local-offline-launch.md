> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# Abrir e abandonar uma sessão local offline

```mermaid
flowchart TD
  A[Entry: abrir retired HTML artifact (index.html) por file URL com rede desligada] --> B[Avisos de conteúdo e Jogar em PT-BR]
  B --> C[Prólogo e preparação sem recurso remoto]
  C --> D[Dois caminhos iniciais disponíveis e Legado bloqueado]
  D --> E[Escolher destino e heróis em qualquer ordem]
  E --> F[Partir e ler o primeiro encontro]
  F -->|imagem local indisponível| G[Fallback mantém texto, estado e ações]
  F --> H[True end 1: primeira decisão continua operável offline]
  G --> H
  C -.->|recarregar ou fechar| X[Abandono: sessão em memória descartada]
  F -.->|recarregar ou fechar| X
  X --> Y[True end 2: nova abertura sem rota, mortes ou texto visto]
```

```yaml
journey:
  id: J-local-offline-launch
  name: Abrir sessão local offline
  value_statement: "O jogador inicia o protótipo e alcança uma decisão usando somente o pacote local."
  personas: ["Lia, primeira expedicionária", "Rui, revisor de conteúdo"]
  entry_points:
    - url: retired HTML artifact (index.html)
      origin: direct
  actions:
    - step: 1
      verb: Abrir index.html no Chrome desktop com rede desligada
      expected_observable: Avisos, Jogar e prólogo aparecem em PT-BR sem HTTP(S), servidor ou instalação
    - step: 2
      verb: Preparar destino e equipe
      expected_observable: Os dois caminhos iniciais estão disponíveis, Legado está bloqueado e nenhuma seleção é inventada
    - step: 3
      verb: Partir e chegar à primeira escolha com imagens disponíveis ou bloqueadas
      expected_observable: Texto e controles bastam para compreender e continuar, sem fallback remoto
    - step: 4
      verb: Recarregar durante preparação ou encontro
      expected_observable: A abertura reaparece e nenhuma campanha é retomada
  goal:
    observable: A primeira decisão de encontro permanece jogável offline e reload encerra a sessão anterior
    side_effects: [sessao-em-memoria]
  true_end_state: A escolha do primeiro encontro está operável offline; após abandono, uma nova abertura não contém estado anterior
  exit:
    natural: primeira decisão operável ou nova abertura após reload
  abandonment:
    - at_step: 2
      how: Recarregar ou fechar durante preparação
      resume: Nova sessão mostra avisos e nenhum destino selecionado
    - at_step: 3
      how: Recarregar ou fechar depois de partir
      resume: Nova sessão começa antes do prólogo e não oferece continuação
  crosses: [arquivos-locais, S01, S02, S03, S04, S05, S12]
```
