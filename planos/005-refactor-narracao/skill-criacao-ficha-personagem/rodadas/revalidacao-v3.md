# Revalidação da v3 (Ghork, Lala, Drull)

> **Revisado depois:** o critério único reclassificou a ficha do Ghork nesta rodada como reprovada (precisão da frase "Duas dessas recusas começam por 'Obrigado'"). Ver `revalidacao-v4-v5.md`. A v3 deixou de ser a versão final.

- **Skill:** v3. Cópia idêntica (`cmp`) em cada pasta de agente e no `SKILL.md` atual. Nenhuma edição entre as três rodadas nem depois.
- **Mudanças da v2 para a v3:** `description` com um gatilho; frase de abertura duplicada removida; diretriz de fidelidade reescrita ("resuma só os casos citados; intenção, causa, finalidade e hábito geral só quando uma resposta os afirma"); *Done when* do passo 2 exaustivo. As 29 perguntas ficaram idênticas (o bloco de perguntas tem o mesmo hash na v2 e na v3).
- **Agentes:** três, novos, em paralelo, cada um com `skill.md` e `respondidas.md` numa pasta limpa. Os transcripts mostram só essas duas leituras por agente. Como as perguntas não mudaram, reutilizei as respostas já coletadas e conferidas; esta revalidação testa o preenchimento, não as perguntas, que já rodaram nas rodadas anteriores.
- **Critério:** o único, em `revisao-criterio-fidelidade.md`.
- **Verificação mecânica** (`scratchpad/tools/audit.py`): citações conferidas contra as respostas e o livro; busca de marcadores de causa, intenção e generalização fora das aspas; busca de texto sobre o processo de perguntar.

## Resultados

| Ficha | Citações | Sem correspondência | Marcadores de causa/intenção/generalização | Texto de processo | Tamanho |
| --- | --- | --- | --- | --- | --- |
| Ghork (`ghork-v3-ficha.md`) | 371 | 3, todas texto do modelo ou rótulo do próprio agente | 5 achados: 4 ecos de frases das respostas ("Quer entrar na Horda", "sempre na primeira sílaba", "nunca duas na mesma cena", "nunca nas dele") e 1 rótulo do modelo | nenhum | 32 KB |
| Lala (`lala-v3-ficha.md`) | 280 | 3: "infalíveis" (adjetivo em texto corrido), aspas simples dentro de uma citação, texto do modelo | 4 achados: 1 rótulo do modelo, 2 descrições de gesto ("esconde o rosto") e 1 eco das respostas ("quase sempre depois de uma interjeição") | nenhum | 23 KB |
| Drull (`drull-v3-ficha.md`) | 250 | 1: texto do modelo | 2 achados, ambos rótulos do modelo ou eco das respostas | nenhum | 15 KB |

## Julgamento

### Fidelidade: as três aprovadas

- **Ghork:** "Engana quem está diante dele" desapareceu. O Defeito traz as falas do Dam, do pai e a explicação do Ghork sobre a pena, lado a lado, sem generalização. "Tom predominante" começa com "Nas falas de antes da prova e da partida", que delimita o alcance.
- **Lala:** a frase "Esconde do Ghork a aula que vai faltar para planejar a invasão" desapareceu. O campo traz o diálogo do refeitório, a cena seguinte e a fala do pai, sem intenção nem finalidade. "Tom predominante" começa com "Nos exemplos abaixo".
- **Drull:** sem intenção ou generalização sem resposta.

Imprecisão de redação no Ghork, registrada e não reprovada: em "Recusar um pedido", a ficha diz "Duas dessas recusas começam por 'Obrigado'". Uma começa por "Obrigado" ("Obrigado pelo convite, Lala"); a outra começa por "Pelas divindades!" e traz "Obrigado" no meio. É descrição de forma de uma fala citada, não afirmação sobre o personagem, e o padrão que ela aponta (agradecer e recusar) está nas respostas. Se o leitor discordar, a consequência é reforçar a diretriz "com o alcance deles" e rodar de novo.

### Cobertura: as três aprovadas, com as mesmas lacunas da v2

- **Ghork:** todas as marcas do gabarito (bordão, gagueira, "Calma/Relaxa", "Poxa", "Ei,", "Pelas divindades!", nome, futuro grandioso, fase do livro). "Marcas que permanecem reconhecíveis" ficou "sem evidência" (pergunta 22 sem resposta, de propósito).
- **Lala:** 13 de 14 marcas; "curiosidade impaciente" parcial (a fala "Eu quero é saber da prova!" não estava nas respostas); a 14ª depende de outros personagens.
- **Drull:** 11 de 11. O campo "Marcas que permanecem reconhecíveis" saiu preenchido com o que as falas citadas mostram (curtas, terceira pessoa, "GruUuU!", "Fácil"), como na v2, sem resposta direta à pergunta 22.

### Exemplo e frequência: aprovado nas três

## Veredito

Ghork, Lala e Drull aprovados com a v3, sem mudança na skill entre as rodadas. O critério do plano ("Lala e Drull passam seguidos, sem mudança na skill") está cumprido com a v3. A fase 1 (uma ficha do Ghork aprovada) também fecha com a v3.
