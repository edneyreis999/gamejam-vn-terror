> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# Executar o contrato automatizado local

```mermaid
flowchart TD
  A[Entry: abrir retired HTML artifact (tests.html) por file URL] --> B[Runner carrega fontes reais e manifesto]
  B --> C[Auditar IDs esperados, registrados e duplicados]
  C --> D[Executar os casos sequencialmente com raízes isoladas]
  D --> E{Alguma falha ou divergência de registro?}
  E -->|não| F[Relatório estruturado completo com 168 aprovados no baseline atual]
  E -->|sim| G[Resultado nomeia caso, falha e stack]
  F --> H[True end: resumo, lista e window.__expeditionTestResults inspecionáveis]
  G --> H2[True end de falha: diagnóstico permanece inspecionável]
  B -.->|fechar durante execução| X[Abandono: execução interrompida]
  X --> A2[Reabrir reinicia do primeiro caso, sem aproveitar resultado parcial]
  A2 --> B
```

```yaml
journey:
  id: J-run-browser-contract
  name: Executar contrato do navegador
  value_statement: "O colaborador verifica o manifesto atual e o runtime local sem instalar ferramentas nem depender de rede."
  personas: ["Caio, estrategista recorrente"]
  entry_points:
    - url: retired HTML artifact (tests.html)
      origin: direct
  actions:
    - step: 1
      verb: Abrir o runner local em Chrome com rede desligada
      expected_observable: As fontes de produção e o manifesto são carregados por caminhos relativos
    - step: 2
      verb: Conferir o contrato de registro antes de aceitar o resumo
      expected_observable: IDs ausentes, extras ou duplicados tornam a execução falha; o baseline atual declara 158 V2 e 10 BASE
    - step: 3
      verb: Aguardar a execução completa
      expected_observable: O relatório atual conclui com 168 totais, 168 aprovados e zero falhas, sem substituir o total pelo histórico de 231 ou 351
    - step: 4
      verb: Inspecionar resumo, resultados e exportação
      expected_observable: A lista e window.__expeditionTestResults concordam em total, aprovados, falhas e identidade dos casos
  goal:
    observable: O contrato registrado coincide com o manifesto e cada falha, se houver, permanece atribuível a um ID
    side_effects: [relatorio-em-memoria]
  true_end_state: O resumo, a lista e window.__expeditionTestResults permanecem inspecionáveis após conclusão ou falha
  exit:
    natural: aba de testes com relatório completo
  abandonment:
    - at_step: 3
      how: Fechar durante a execução
      resume: Nova abertura reinicia a suíte desde o primeiro caso e descarta o resultado parcial
  crosses: [fontes-de-producao, runner-local, manifesto-atual, contrato-v3]
```
