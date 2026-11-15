# Plano: skill de criação de ficha de personagem

## Atualização em 2026-11-13: complementos criativos (v7)

O autor pediu para remover a regra que deixava campos sem evidência e preencher as lacunas com informações plausíveis. A v7 permite esses complementos, identificados como **Criação**, e confere sua coerência com o personagem. Citações e afirmações sobre a fonte continuam sendo verificadas contra o material fornecido. O modelo externo e a skill instalada em `.agents` foram sincronizados.

As fichas de trabalho estão em `../reverse-eng-livro/`: Ghork, Eraste, o trio, Lala e Drull. As de Lala e Drull partem das fichas v6; as três anteriores foram completadas no próprio diretório. As rodadas permanecem como entregues. A skill v6 foi preservada em `rodadas/ficha-de-personagem-v6.skill.md`.

O plano e os resultados abaixo registram a validação anterior. A aprovação da v6 não valida a v7: esta revisão recebeu conferência editorial, de metadados e de sincronização, sem nova rodada com agentes nem experimento de diálogo. A auditoria da v7 está em `auditoria-writing-skills.md`.

## Objetivo

Criar uma skill que guia um agente a montar uma ficha de personagem, para escrever diálogo, com o mesmo nível de detalhe da [ficha do Ghork](../reverse-eng-livro/ghork.md) ou maior. O agente não tem acesso à fonte: tudo o que sabe do personagem vem das perguntas que faz a quem conhece o personagem.

A skill é promovida para `.agents` só depois de passar nas fases 1 e 2.

## Estrutura

```
skill-criacao-ficha-personagem/
├── plano.md                     (este arquivo)
├── prompt-inicial-companion.md  (pedido original do autor)
├── rodadas/                     (registro de cada rodada, para auditoria)
└── ficha-de-personagem/
    └── SKILL.md                 (o nome da skill é igual ao nome da pasta)
```

A `SKILL.md` tem três partes:
- o modelo de ficha, copiado de [modelo-ficha-personagem.md](../modelo-ficha-personagem.md);
- as perguntas sanitizadas;
- as diretrizes de preenchimento.

A primeira versão é a mais simples possível: o modelo e o mínimo de instrução para o agente perguntar antes de preencher.

## Papéis

- **Agente-ficha:** subagente que recebe só a skill e o nome do personagem. Roda numa cópia isolada do repositório (worktree), com a instrução de usar apenas o que vem no prompt e nas respostas. As pastas `livro-ghork/` e `reverse-eng-livro/` não estão no git e por isso não entram na cópia; o PDF está commitado e entra, daí a instrução.
- **Oráculo:** eu, com acesso ao livro. Respondo às perguntas do agente.
- **Juiz:** eu, comparando a ficha do agente com o gabarito, pelos critérios abaixo.

O agente devolve as perguntas como resultado. Eu respondo com SendMessage, que continua o mesmo agente, até ele declarar a ficha pronta.

## Regras do oráculo

1. Respondo só com trechos do livro: a fala literal e a situação em que ela aparece, mais contagens quando a pergunta pedir frequência.
2. Nunca respondo com conclusões da minha ficha do Ghork, como "ele tem o bordão X". Se a pergunta pede o hábito, respondo com as falas em que ele aparece, e o agente tira a conclusão.
3. Respondo só o que foi perguntado. O que o agente não perguntou fica fora da ficha, e a falha aparece no julgamento.
4. Cada rodada é gravada em `rodadas/<personagem>-<n>.md`, com as perguntas originais, as perguntas sanitizadas, minhas respostas, a ficha do agente e o julgamento.

## Perguntas sanitizadas

- **Genéricas:** a pergunta do agente vira uma pergunta que serve para qualquer personagem de qualquer jogo, livro ou roteiro, sem nomes nem enredo.
- **Respondíveis de memória:** no uso real, quem responde é o autor, que pode não ter um texto para consultar. A pergunta pede o que ele sabe responder ("Ele repete alguma expressão? Com que frequência e em que situação?") e nunca exige contagem. O oráculo pode responder com contagem, porque tem o livro.
- **Ligadas ao modelo:** cada pergunta alimenta pelo menos um campo do modelo.

## Critério de aprovação

A ficha do agente passa quando cumpre as três exigências:

1. **Fidelidade:** toda afirmação da ficha vem de uma resposta do oráculo. Uma única invenção reprova a ficha.
2. **Cobertura:** cada marca do gabarito aparece na ficha do agente, com a situação em que surge. No Ghork, por exemplo:
   - o bordão "Isso não é importante… O que importa é…";
   - a gagueira quando está encurralado;
   - chamar os outros pelo nome;
   - "Calma" ou "Relaxa" para quem está nervoso ou ameaçador;
   - "Poxa" seguido do nome.
3. **Exemplo e frequência:** cada marca tem uma fala de exemplo e uma frequência (rara ou frequente), pelo menos no nível do gabarito.

O julgamento lista, campo por campo, o que faltou ou foi inventado.

## Regra contra acúmulo

- Cada pergunta, diretriz ou campo novo cita o campo da ficha que falhou na rodada que o motivou.
- Uma pergunta que não mudou nenhuma ficha em duas rodadas sai da skill.
- Mudanças no modelo dentro da skill são feitas também em `modelo-ficha-personagem.md`, para os dois não divergirem.

## Fase 1: Ghork

- **Gabarito:** [reverse-eng-livro/ghork.md](../reverse-eng-livro/ghork.md).
- **Rodada 1:** o agente-ficha recebe só a skill mínima, pergunta, recebe as respostas e entrega a ficha. Eu julgo.
- **Se reprovar:**
  - Sanitizo as perguntas que o agente fez, acrescento as que faltaram para cobrir as marcas perdidas e escrevo as diretrizes que teriam evitado as falhas.
  - Um novo agente recebe a skill atualizada e as perguntas já respondidas (as respostas da rodada anterior, mais as novas). Essa rodada testa as diretrizes de preenchimento; as perguntas são testadas na fase 2.
- **Fim da fase 1:** quando uma ficha do Ghork passar no critério.

## Fase 2: personagens novos

O agente-ficha recebe só a skill e faz as próprias perguntas. Sem ficha pronta como referência, eu respondo direto do livro. O gabarito do julgamento é uma releitura do livro: as marcas do personagem que aparecem nas falas dele.

1. **Lala.**
2. **Drull:** é o mais diferente do Ghork. Fala de si na terceira pessoa, em frases de duas palavras ("Drull forte. Protege Ghork."), e testa se o modelo dá conta de uma fala atípica.

**A skill fica pronta** quando a Lala e o Drull passarem seguidos, sem mudança nenhuma na skill. Se algum deles falhar, a skill muda e a contagem recomeça com o próximo personagem: Dam, Orcquius e os demais do livro.

## Riscos conhecidos

- **O modelo de ficha ainda não foi testado num diálogo.** Se o experimento de reproduzir a cena do livro mostrar que falta algum campo, a skill terá que mudar o modelo de novo.
- **O oráculo é parcial no Ghork**, porque escreveu o gabarito. As regras do oráculo e o registro das rodadas reduzem esse risco, e a fase 2 não tem esse problema.

## Fora deste plano

- Promover a skill para `.agents`.
- O experimento de reproduzir as falas da cena do livro.
- Commits.

## Resultado (execução)

### Histórico de veredictos (critério único de fidelidade, com limiar de gravidade)

| Versão da skill | Ghork | Lala | Drull |
| --- | --- | --- | --- |
| mínima | reprovada | | |
| v2 | reprovada (revisão) | reprovada (revisão) | aprovado |
| v3 | reprovada (precisão) | aprovada | aprovado |
| v4 | aprovada | reprovada | reprovada |
| v5 | reprovada | aprovada | aprovado |
| **v6** | **aprovada** | **aprovada** | **aprovado** |

Detalhe em `rodadas/`: `ghork-1.md`, `ghork-2.md`, `lala-1.md`, `drull-1.md`, `revisao-criterio-fidelidade.md`, `revalidacao-v3.md`, `revalidacao-v4-v5.md`, `revalidacao-v6.md`. Auditoria item a item em `auditoria-writing-skills.md`.

Os julgamentos originais da v2 (Ghork, Lala) e da v3 (Ghork) foram generosos demais: aceitei como interpretação do campo uma intenção, uma generalização e uma imprecisão que a própria skill proibia. O aviso do hook de meta provocou a revisão.

### O que mudou, por versão (cada mudança ligada ao campo que falhou)

- **v2 (depois da rodada 1 do Ghork):** 29 perguntas genéricas; diretriz de causa; diretriz de ficha sem texto de processo; campo "Mudança ao longo da história" no §4 (copiado também para `modelo-ficha-personagem.md`).
- **v3 (depois da revisão de Ghork e Lala):** diretriz de fidelidade reescrita para cobrir intenção, finalidade e hábito geral; *Done when* do passo 2 exaustivo; `description` com um gatilho; frase duplicada removida.
- **v4 (depois da imprecisão na ficha do Ghork v3):** item sobre a forma das falas.
- **v5 (depois dos deslizes de sequência e de citação na v4):** passo 3, "Conferir": releitura frase a frase, fora das aspas, com uma resposta para cada frase.
- **v6 (escolha do dono do plano: fechar as sobras):** o item sobre a forma das falas saiu do passo 2 (a conferência vive só no passo 3, o que resolve o Fail da auditoria); o rótulo que abre um campo (defeito, medo, desejo) entrou na regra do passo 2 e no passo 3 (a falha do Ghork na v5).

### Estado final

- **Skill:** `ficha-de-personagem`, v6, 179 linhas. Idêntica, byte a byte, às três cópias que os agentes da v6 leram (`cmp`).
- **Fase 1** (uma ficha do Ghork aprovada): cumprida (v4 e v6).
- **Fase 2** (Lala e Drull aprovados seguidos, sem mudança na skill): cumprida pela v6 (e pela v5).
- **Auditoria do `writing-skills`:** todos os itens em Pass na v6.
- **Promoção:** feita depois da v6, por escolha do dono do plano ("fechar as sobras antes; só então promovo"):
  - `.agents/skills/ficha-de-personagem/SKILL.md`: cópia exata da v6 (`cmp`);
  - `.claude/skills/ficha-de-personagem`: symlink para `../../.agents/skills/ficha-de-personagem`, como as outras skills do projeto que vivem em `.agents`;
  - validador de metadados: SUCCESS sobre a pasta promovida;
  - `.agents/` está no `.gitignore` do projeto; a skill promovida não aparece em `git status` e não foi adicionada ao git.
- **Escopo das revalidações v3 a v6:** as 29 perguntas ficaram idênticas desde a v2, então reutilizei as respostas já coletadas e conferidas; elas testam o preenchimento. As perguntas rodaram com agentes que as fizeram na rodada 1 do Ghork, na Lala e no Drull (fase 2 original). O agente do Drull fez perguntas de acompanhamento na v4 e na v5; na v6 elas já vinham respondidas.

### Desvios do plano

- **Sem isolamento por worktree.** O hook de criação falhou ("returned no worktree path"). Os agentes rodaram no repositório, com a instrução de usar só arquivos de uma pasta limpa no scratchpad. Cada transcript mostra só essas leituras.
- **Oráculo.** Erros meus corrigidos antes do envio (contexto, atribuição de falas, trechos completados por mim). Toda resposta teve as citações conferidas por script contra o livro.
- **Gabaritos da fase 2** (`lala-gabarito.md`, `drull-gabarito.md`) registrados antes das perguntas; cada um teve uma correção de contagem antes das perguntas.
- **A pergunta 22** ("o que fica igual em todas as situações") ficou sem resposta de propósito nas fichas (regra 2 do oráculo). O campo ficou "sem evidência" no Ghork e na Lala; no Drull, em algumas versões, o agente o preencheu com o que as falas citadas mostram.
- **Mudanças depois de aprovações** (o `description` na v2, depois as versões v3 a v6). Cada uma foi revalidada.
- **Promoção para `.agents`:** o plano a listava como fora do escopo; ela aconteceu porque o dono do plano escolheu essa sequência ao ser consultado.

### Regra "pergunta que não muda ficha em duas rodadas sai": aplicada

Aplicada às rodadas da Lala e do Drull (`rodadas/poda-de-perguntas.md`). Duas perguntas não mudaram nenhuma ficha: a 22 e a 28. Decisão do dono do plano: manter as duas como exceção justificada, porque ficaram inertes pela forma do teste. A skill promovida não mudou. Reavaliar no primeiro uso real.

### Fora deste plano, e depois dele

O plano lista o experimento de reproduzir a cena do livro em "Fora deste plano", e o dono do plano pediu antes para não rodar o agente de diálogo ("nós vamos discutir essa estratégia"). Por isso estas duas pendências não pertencem à execução e dependem dele:

- **Modelo de ficha testado num diálogo:** é um risco conhecido do plano. Se o experimento mostrar que falta um campo, o modelo muda de novo.
- **Tamanho das fichas como obstáculo para escrever diálogo** (gabarito do Ghork: 13 KB; fichas dos agentes na v6: 32, 22 e 20 KB): só o experimento responde.

### Outras observações

- **Amostra pequena:** três fichas por versão. A v6 foi a primeira a passar três de três; é evidência, não garantia. Um autor que usa a skill continua precisando ler a ficha. O script de auditoria (`rodadas/audit.py`, com caminhos do scratchpad no código) não faz parte da skill.
- **Marca "curiosidade impaciente" da Lala:** só em parte, porque uma das falas não estava nas respostas.
- **Imprecisão registrada, não reprovada:** na ficha do Ghork v6, o campo da Shad traz "insiste que a mãe não precisa se preocupar com a comida", paráfrase da fala dele.
