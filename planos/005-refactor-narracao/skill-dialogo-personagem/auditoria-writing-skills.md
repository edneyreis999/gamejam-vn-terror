# Auditoria de criar-dialogo — v4

Escopo: pacote `criar-dialogo/`. A qualidade dos textos e os testes de transferência têm seus próprios vereditos em `validacao.md`; este documento confere a skill contra cada item de `writing-skills/references/checklist.md`.

## A1. Invocation & description

| Item | Resultado | Evidência |
| --- | --- | --- |
| Invocation earned | Pass | Invocação pelo modelo permite que um agente de autoria alcance o procedimento ao receber um pedido de diálogo. Há um único domínio explícito: criar a cena com fichas já disponíveis. |
| Leading word front-loaded | Pass | A descrição começa com “Diálogo”. |
| One trigger per branch | Pass | Um ramo: escrever uma cena entre dois personagens. Não enumera sinônimos como ramos adicionais. |
| Triggers only | Pass | Descrição informa alcance e exclusão de criação de fichas, sem persona, elogios ou resumo do método. |

## A2. Information hierarchy

| Item | Resultado | Evidência |
| --- | --- | --- |
| Content typed | Pass | Dois passos: entender a cena; escrever e revisar. Perguntas e diretrizes estão junto do passo em que se aplicam. |
| Completion criteria | Pass | Primeiro passo termina quando lacunas capazes de alterar acontecimentos/personagens foram respondidas. Segundo pede revisão dos três aspectos nomeados, correção do que falhar e entrega do diálogo. |
| Disclosure by branch | Pass | Há um único ramo e 310 palavras; todo material necessário está inline. Nenhuma referência externa desnecessária. |
| Pointers worded for when | Pass | Não há ponteiros de carregamento; fichas e pedido são entradas fornecidas pelo solicitante. |
| Co-location | Pass | Perguntas, tratamento das lacunas e liberdade para compor ficam juntos. Voz, continuidade e revisão ficam no passo de escrita. |

## A3. Pruning

| Item | Resultado | Evidência |
| --- | --- | --- |
| Single source of truth | Pass | Uma lista de perguntas e uma revisão. Cópias históricas das versões ficam fora do pacote, sem serem lidas pela skill. A pergunta de margem coleta a decisão; a diretriz de continuidade aplica essa decisão ao escrever. |
| Relevance | Pass | Cada linha trata de entradas, lacunas, composição, revisão ou saída. O procedimento de experimento não foi instalado na skill. |
| No-op hunt | Pass | Revisão sentença por sentença: perguntas selecionam contexto; “nenhum” desobriga conflitos artificiais; distinção entre fatos e soluções evita terceirizar composição; ritmo/continuidade/repetição respondem à v1; adaptação das amostras e preservação dos obstáculos respondem à v2; estado de chegada responde à v3. Removidas da base as exigências de verbo em toda fala e de compreensão só pela fala anterior. |
| Negation | Pass | Diretrizes orientadas por ações positivas. Duas exclusões delimitadas: não criar fichas (gatilho) e não imprimir planejamento interno (entregar o diálogo). Não há lista de formas literárias proibidas. |
| Leading words | Pass | Vocabulário compacto: voz, continuidade, ritmo, silêncio, interrupção. Sem repetições de qualificadores como “rico”, “natural”, “profundo”. |

## B1. Metadata & discovery

| Item | Resultado | Evidência |
| --- | --- | --- |
| Naming | Pass | `criar-dialogo`, 13 caracteres, minúsculas e hífen; idêntico ao nome da pasta do pacote. |
| Description length | Pass | Abaixo de 1.024 caracteres; validador retornou sucesso. |
| Trigger coverage | Pass | “Use para escrever uma cena” e “não use para criar fichas de personagem”. |
| Third-person tone | Pass | Descrição sem primeira pessoa ou tratamento pessoal; imperativos em terceira pessoa. |

## B2. File structure & paths

| Item | Resultado | Evidência |
| --- | --- | --- |
| Standard folders, flat | Pass | Pacote contém somente `SKILL.md`; não precisa de subpastas. |
| No human docs | Pass | Auditoria, validação, fichas de teste e rodadas estão fora de `criar-dialogo/`. |
| Forward slashes | Pass | Nenhum caminho de plataforma no corpo da skill. |
| Explicit helper paths | Pass | Não há helper instalado ou necessário. |
| No orphans | Pass | O único arquivo do pacote é seu ponto de entrada. |

## B3. Body & scripts

| Item | Resultado | Evidência |
| --- | --- | --- |
| Lean body | Pass | 33 linhas e 310 palavras, incluindo metadados e títulos. Sem template, script ou arquivo de perguntas separado. |
| Imperative mood | Pass | “Leia”, “Responda”, “pergunte”, “Escreva”, “Deixe”, “Releia”, “Corte”, “Conclua”. |
| Domain-native terms | Pass | Fala, voz, cena, personagem, leitor e continuidade; sem terminologia de implementação. |
| CLI design | Pass | Não há tarefa frágil de parsing ou automação para instalar neste procedimento de escrita. Sem CLI. |
| Helper roles | Pass | Nenhum helper referenciado. Validador de autoria é ferramenta externa de conferência, não parte da skill. |
| Failure states | Pass | Lacuna factual se resolve perguntando; falha de clareza, voz ou progressão se resolve revisando. Sem boilerplate de falhas de execução inexistentes. |

## Conferências executadas

- `python3 .agents/skills/writing-skills/scripts/validate-metadata.py --name criar-dialogo --description 'Diálogo entre dois personagens a partir de suas fichas. Use para escrever uma cena; não use para criar fichas de personagem.'` → exit 0, `SUCCESS: Metadata is valid and optimized for discovery.`
- Inspeção do diretório → somente `criar-dialogo/SKILL.md`.
- SHA-256 do pacote v4: `fb7128b2c442f21b85fe21a53ce0e623afac0c1e59b71ea50e94a7679dc5b7e3`. Conferida a igualdade byte a byte das cópias usadas nas rodadas 06, 07 e 08. As versões anteriores permanecem em suas rodadas.
- Conferência final dos artefatos: oito diálogos, oito comparações e entrevistas/respostas presentes; 29 itens Pass nesta auditoria. Busca no pacote por nomes de personagens, locais, objeto mágico e referências às rodadas → nenhuma ocorrência.

Nenhum teste do jogo foi executado: o incremento é uma skill de escrita em laboratório; não altera implementação, regras, persistência, engine, plugins ou assets. A verificação pertinente é o exercício real da skill com agentes, acompanhado da auditoria estrutural.
