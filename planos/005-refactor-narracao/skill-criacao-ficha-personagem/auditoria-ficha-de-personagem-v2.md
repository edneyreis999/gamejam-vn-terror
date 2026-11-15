# Auditoria da ficha-de-personagem-v2

Data: 2026-11-13.

Escopo: autoria da nova [skill](ficha-de-personagem-v2/SKILL.md), conforme a discussão sobre Autor, Pesquisador e Revisor independente. Esta auditoria aplica os 29 itens do checklist de `writing-skills`; não executa esses papéis para produzir uma ficha.

## A1. Invocação e descrição

| Item | Resultado | Evidência |
| --- | --- | --- |
| Invocation earned | Pass | A descrição permite alcançar a skill por pedidos de criação ou revisão de ficha; a versão foi criada na pasta de trabalho, sem instalação. |
| Leading word front-loaded | Pass | A descrição começa com “Ficha de personagem”. |
| One trigger per branch | Pass | Há dois usos distintos: criar uma ficha e revisar a voz de uma ficha existente. A disponibilidade de cenas distingue a fonte de trabalho dentro da criação. |
| Triggers only | Pass | A descrição contém os usos e suas exclusões; a divisão de papéis fica no corpo. |

## A2. Hierarquia da informação

| Item | Resultado | Evidência |
| --- | --- | --- |
| Content typed | Pass | O corpo contém o contrato de papéis e cinco etapas; os procedimentos dos agentes têm etapas e formatos de retorno. Perguntas e modelo são referências. |
| Completion criteria | Pass | As etapas terminam em “Concluído quando”, cobrindo perguntas encaminhadas, campos, exercícios, dimensões de revisão e resolução dos apontamentos. Limitações permanecem como pendências. |
| Disclosure by branch | Pass | Os procedimentos detalhados de pesquisa e revisão ficam em arquivos próprios, lidos pelo papel correspondente. O fluxo do Autor fica no SKILL.md. |
| Pointers worded for when | Pass | As perguntas e o modelo devem ser lidos integralmente antes da entrevista; cada agente deve ler integralmente seu procedimento ao ser convocado. |
| Co-location | Pass | Fontes e formato das respostas ficam no procedimento do Pesquisador; critérios, parecer e reteste ficam no do Revisor. |

## A3. Poda

| Item | Resultado | Evidência |
| --- | --- | --- |
| Single source of truth | Pass | A v2 possui uma lista de perguntas, um modelo e uma definição detalhada da rubrica. O corpo usa ponteiros e resumos de passagem entre os papéis. A versão anterior permanece uma versão separada. |
| Relevance | Pass | Os parágrafos foram conferidos contra coleta de intenção, pesquisa, elaboração ou revisão da ficha. Não foram incluídos fluxo de jogo, instalação ou execução automática de cenas. |
| No-op hunt | Pass | A descrição foi reduzida aos gatilhos; as instruções mantidas mudam seleção de fontes, divisão de trabalho, preenchimento, revisão ou declaração de limites. |
| Negation | Pass | As proibições restantes delimitam integridade e escopo: não simular revisão independente, não fabricar citações e não promover inspiração a fato. Cada caso indica a conduta ou o estado de entrega correspondente. |
| Leading words | Pass | Autor, Pesquisador, Revisor, Criação e os cinco nomes das dimensões são usados de forma consistente. |

## B1. Metadados e descoberta

| Item | Resultado | Evidência |
| --- | --- | --- |
| Naming | Pass | `ficha-de-personagem-v2` corresponde exatamente à pasta e passou no validador de metadados. |
| Description length | Pass | A descrição passou no limite de 1.024 caracteres do validador. |
| Trigger coverage | Pass | “Use quando” abrange criação e revisão; “Não use” exclui cenas completas, enredo e mecânicas. |
| Third-person tone | Pass | Descrição em terceira pessoa, sem interpelação ao leitor; validador concluído com código 0. |

## B2. Estrutura e caminhos

| Item | Resultado | Evidência |
| --- | --- | --- |
| Standard folders, flat | Pass | O pacote tem SKILL.md, três arquivos em `references/` e um em `assets/`, sem subpastas adicionais. |
| No human docs | Pass | Esta auditoria fica fora do pacote. Não há README, changelog nem guia de instalação dentro da skill. |
| Forward slashes | Pass | Todos os links internos são relativos e usam `/`. |
| Explicit helper paths | Pass | A skill não empacota nem invoca scripts auxiliares. O validador de autoria foi executado pelo caminho absoluto da skill `writing-skills`. |
| No orphans | Pass | Uma checagem percorreu os links a partir do SKILL.md e alcançou os cinco arquivos do pacote. |

## B3. Corpo e scripts

| Item | Resultado | Evidência |
| --- | --- | --- |
| Lean body | Pass | SKILL.md tem 79 linhas; os detalhes de cada agente e as referências ficam nos arquivos vinculados. |
| Imperative mood | Pass | Instruções usam imperativos como Leia, Convoque, Entregue, Preencha e Confira; tabelas e critérios descrevem seus contratos. |
| Domain-native terms | Pass | A terminologia trata de voz, fala, interlocutor, cena, personagem, universo, intenção e fontes. |
| CLI design | Pass | Sem scripts de execução no pacote: o procedimento usa leitura, pesquisa e subagentes, sem necessidade de uma nova CLI. |
| Helper roles | Pass | Sem helpers executáveis empacotados. A autoridade de escrita está definida: somente o Autor altera a ficha; os outros agentes trabalham em leitura. |
| Failure states | Pass | Há tratamento para delegação indisponível, fontes inacessíveis, falta de fichas para comparação e decisões criativas abertas. Revisada, Revisar e Pendente têm condições distintas. |

## Conferências realizadas e limite da evidência

- Metadados extraídos do arquivo final e verificados por `validate-metadata.py`: código 0.
- As 29 perguntas são idênticas às da versão anterior, na mesma ordem.
- O modelo conserva sete seções e 48 campos, além do passado e das relações. A única mudança textual no modelo é pedir frequência em vez de exigir quantidade no campo de expressões características.
- Links internos, profundidade das pastas e espaços finais foram conferidos por uma checagem estática sem instalar ferramentas.
- Hashes confirmaram a preservação da versão anterior, da skill instalada em `.agents` e do modelo compartilhado.
- A leitura do procedimento cobriu os caminhos com material próprio suficiente, com base escassa e pesquisa externa, e com delegação ou fonte indisponível. Isso é inspeção do contrato, não execução dessas jornadas.

Resultado: auditoria de autoria e checagens estáticas concluídas. A v2 ainda não foi executada para criar uma ficha nem avaliada num experimento de diálogo; a qualidade observada nas versões anteriores não é atribuída automaticamente a esta versão.
