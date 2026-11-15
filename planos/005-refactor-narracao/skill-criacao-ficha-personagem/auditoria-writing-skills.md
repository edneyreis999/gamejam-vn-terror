# Auditoria do `writing-skills`, item a item

Roteiro: `.claude/skills/writing-skills/references/checklist.md`. Alvo: `ficha-de-personagem/SKILL.md`. A tabela principal vale para a v3; a seção "Atualização para a v5", no fim, traz o que mudou. Cada item traz o resultado na v2 (a testada até a aprovação do Drull) e na v3.

## Parte A, doutrina

### A1. Invocação e description

| Item | v2 | v3 | Observação |
| --- | --- | --- | --- |
| Invocação merecida | Pass | Pass | Um agente que recebe "faça a ficha do personagem X" precisa alcançar a skill sozinho |
| Palavra-guia na frente | Pass | Pass | "Entrevista"/"Entrevistar": é o comportamento que a skill impõe antes de preencher |
| Um gatilho por ramo | **Fail** | Pass | A v2 listava "a ficha, o perfil de voz ou a assinatura de fala" para o mesmo ramo. A v3 tem um gatilho: pedir a ficha de um personagem |
| Só gatilhos | Pass | Pass | Uma frase diz o que a skill faz (a doutrina chama de primeiro trabalho da description); o corpo não a repete |

### A2. Hierarquia da informação

| Item | v2 | v3 | Observação |
| --- | --- | --- | --- |
| Conteúdo tipado | Pass | Pass | Passo 1 (perguntar) e passo 2 (preencher) com *Done when*; as 29 perguntas e o modelo são referência dentro dos passos |
| Critérios de conclusão | Pass | Pass | O do passo 2 passou a ser exaustivo: "cada afirmação da ficha, inclusive intenção, causa e generalização, está numa resposta" |
| Divulgação por ramo | Pass | Pass | Um ramo só; tudo é necessário em toda execução. Sem `references/` |
| Ponteiros com "quando" | Pass | Pass | Um ponteiro: "Copie o modelo abaixo", no passo em que é usado |
| Co-localização | Pass | Pass | Perguntas sob o passo 1; diretrizes e modelo sob o passo 2 |

### A3. Poda

| Item | v2 | v3 | Observação |
| --- | --- | --- | --- |
| Fonte única | **Fail** | Pass | A v2 dizia na abertura "Tudo o que entra nela vem das respostas" e repetia no *Done when*. A v3 só tem a versão do *Done when*. O modelo também existe em `modelo-ficha-personagem.md`, fora da skill, de propósito (ver o plano) |
| Relevância | Pass | Pass | Toda linha é pergunta, regra de preenchimento ou campo do modelo |
| Caça ao no-op | Pass | Pass | Rodada em cada frase. "Peça falas literais e a situação" e "o texto será lido, não ouvido" mudam o comportamento (sem elas, a ficha vira adjetivos) |
| Negação | Pass | Pass | Restam "sem menção às perguntas ou às respostas" e "nada mais", cada uma ao lado do que fazer (escrever como documento do personagem; usar "sem evidência") |
| Palavras-guia | Pass | Pass | "Evidência"/"sem evidência" sustenta as três regras de fidelidade |

## Parte B, especificação

### B1. Metadados

| Item | v3 |
| --- | --- |
| Nome | Pass: `ficha-de-personagem`, igual à pasta, minúsculas e hífen único |
| Tamanho da description | Pass: cerca de 230 caracteres |
| Gatilhos positivos e negativos | Pass: "Use quando…", "Não use para…" |
| Terceira pessoa | Pass: "o usuário", sem "eu/você" |

Validador (`validate-metadata.py`): SUCCESS.

### B2. Estrutura

| Item | v3 |
| --- | --- |
| Pastas padrão, planas | Pass: só `SKILL.md` |
| Sem documentos humanos | Pass |
| Barras `/` | Pass: a skill não cita caminhos |
| Caminhos de helpers | Pass: sem helpers |
| Sem órfãos | Pass: sem arquivos além do `SKILL.md` |

### B3. Corpo e scripts

| Item | v3 |
| --- | --- |
| Corpo enxuto (< 500 linhas) | Pass: 173 |
| Modo imperativo | Pass: "Faça", "Peça", "Copie", "Resuma", "Escreva" |
| Termos do domínio | Pass: "ficha", "fala", "personagem", "campo", "evidência" |
| Scripts em CLI | Pass: não se aplica |
| Papéis dos helpers | Pass: não se aplica |
| Estados de falha | Pass: a skill não roda scripts; não há boilerplate de erro |

## Resultado

Todos os itens da v3 estão em Pass. Os dois Fails da v2 (gatilhos repetidos e frase duplicada) foram corrigidos na v3, junto com a diretriz de fidelidade (ver `rodadas/revisao-criterio-fidelidade.md`). A v3 é a versão que precisa passar na revalidação.

## Atualização para a v5 (180 linhas)

Mudanças desde a v3: um item de diretriz sobre a forma das falas (v4) e o passo 3, "Conferir" (v5).

| Item | v5 | Observação |
| --- | --- | --- |
| A2, conteúdo tipado | Pass | O passo 3 é um passo, com *Done when* |
| A2, critério de conclusão | Pass | "toda frase fora das aspas aponta para uma resposta": decidível frase a frase |
| A2, co-localização | Pass | Perguntar, preencher e conferir em passos seguidos; o modelo fica no fim |
| A3, fonte única | **Fail (menor)** | O item sobre a forma das falas (passo 2) e a cláusula "a forma atribuída às falas" do passo 3 dizem a mesma coisa. Remover um dos dois muda a skill validada e pede nova rodada; a decisão ficou para o dono do plano |
| A3, caça ao no-op | Pass | O passo 3 mudou o comportamento: os deslizes de sequência e de citação da v4 não reapareceram na v5 |
| A3, negação | Pass | Sem novas proibições |
| B3, corpo enxuto | Pass | 180 linhas |
| Demais itens | Pass | Sem mudança desde a v3 |

O audit da v5 tem um Fail menor em aberto, descrito acima.

## Atualização para a v6 (179 linhas)

Mudanças desde a v5: o item sobre a forma das falas saiu do passo 2; a regra do passo 2 cita o rótulo que abre um campo; o passo 3 lista o rótulo entre o que se confere e concentra a conferência da forma.

| Item | v6 | Observação |
| --- | --- | --- |
| A1 (invocação, palavra-guia, um gatilho, só gatilhos) | Pass | Sem mudança desde a v3 |
| A2 (tipado, critérios, divulgação, ponteiros, co-localização) | Pass | O passo 3 tem *Done when*: "toda frase fora das aspas aponta para uma resposta" |
| A3, fonte única | Pass | O Fail da v5 está resolvido: a conferência da forma das falas vive só no passo 3; o passo 2 só diz o que escrever |
| A3, relevância e caça ao no-op | Pass | O passo 3 mudou o comportamento (os deslizes de sequência e de citação da v4 não reapareceram em v5 nem em v6) |
| A3, negação | Pass | "do contrário, o campo traz só as falas e os fatos lado a lado" é positivo; "sem menção às perguntas ou às respostas" continua ao lado do que fazer |
| A3, palavras-guia | Pass | "evidência", "rótulo", "alcance" |
| B1 a B3 | Pass | 179 linhas; só `SKILL.md`; validador SUCCESS |

Todos os itens da v6 estão em Pass.

## Atualização para a v7 — 2026-11-13

Por pedido do autor, as lacunas passam a receber complementos plausíveis, marcados como **Criação**. As regras de preenchimento e conferência foram ajustadas juntas. Esta auditoria verifica a skill; não repete a validação por agentes da v6 nem avalia o resultado de um diálogo.

| Item | v7 | Evidência |
| --- | --- | --- |
| A1 — Invocação merecida | Pass | O pedido de ficha para escrever diálogo precisa alcançar a entrevista automaticamente. |
| A1 — Palavra-guia na frente | Pass | A descrição abre com “Entrevistar”. |
| A1 — Um gatilho por ramo | Pass | Um ramo: pedir uma ficha de personagem para escrever diálogo. |
| A1 — Só gatilhos | Pass | A descrição delimita o pedido atendido e os pedidos excluídos. |
| A2 — Conteúdo tipado | Pass | Três passos com critérios; perguntas e modelo como referências internas. |
| A2 — Critérios de conclusão | Pass | Cobrem resposta às perguntas, preenchimento de todos os campos e conferência final. |
| A2 — Divulgação por ramo | Pass | Um ramo; perguntas e modelo são usados na mesma execução. |
| A2 — Ponteiros com condição | Pass | “Copie o modelo abaixo” aparece no passo de preenchimento; não há referências externas. |
| A2 — Co-localização | Pass | Entrevista, preenchimento criativo e conferência têm seus próprios passos. |
| A3 — Fonte única | Pass | A regra de criação fica no passo 2; o passo 3 confere o resultado. A cópia externa do modelo, exigida pelo plano, é idêntica ao bloco interno. |
| A3 — Relevância | Pass | As instruções restantes orientam entrevista, voz, preenchimento ou conferência da ficha. |
| A3 — Caça ao no-op | Pass | Foram retiradas a exigência de rastrear toda afirmação a uma resposta e a regra sobre texto de processo; a criação agora tem uma instrução direta. |
| A3 — Negação | Pass | O preenchimento indica o que criar e como identificar; não manda deixar uma lacuna nem apagar toda inferência. |
| A3 — Palavras-guia | Pass | “Criação”, “citações” e “coerência” distinguem os tipos de conteúdo sem uma nova taxonomia. |
| B1 — Nome | Pass | `ficha-de-personagem`, igual ao diretório, em minúsculas e com hífens simples. |
| B1 — Tamanho da descrição | Pass | Menos de 1.024 caracteres; validada pelo helper de metadados. |
| B1 — Gatilhos positivos e negativos | Pass | A descrição contém “Use quando” e “Não use para”. |
| B1 — Terceira pessoa | Pass | A descrição se refere ao usuário, sem primeira pessoa. |
| B2 — Pastas padrão e planas | Pass | A skill contém apenas `SKILL.md`. |
| B2 — Sem documentos humanos internos | Pass | Plano, auditoria, fichas e histórico ficam fora da pasta da skill. |
| B2 — Barras nos caminhos | Pass | Não há caminhos de execução no corpo da skill. |
| B2 — Caminhos explícitos de helpers | Pass | A skill não possui helpers. |
| B2 — Sem órfãos | Pass | Não há arquivos auxiliares dentro da skill. |
| B3 — Corpo enxuto | Pass | Menos de 500 linhas; esta revisão reduz o corpo em uma linha. |
| B3 — Imperativo | Pass | “Faça”, “Preserve”, “Complete”, “Marque”, “Confira” e “Compare”. |
| B3 — Termos do domínio | Pass | Ficha, personagem, fala, personalidade, voz e história. |
| B3 — Design de CLI | Pass | Não se aplica: a skill não executa scripts. |
| B3 — Papéis dos helpers | Pass | Não se aplica: não há helpers. |
| B3 — Estados de falha | Pass | Contradições são esclarecidas na entrevista ou corrigidas na conferência; não há boilerplate de erros técnicos. |

Conferências: metadados válidos; bloco do modelo idêntico ao externo; cópia instalada idêntica à v7; symlink do Claude resolvendo para a cópia instalada; nenhuma lacuna “sem evidência”, “sem exemplo” ou “sem fala” nas cinco fichas de trabalho. Os registros históricos da v6 conservam essas expressões.
