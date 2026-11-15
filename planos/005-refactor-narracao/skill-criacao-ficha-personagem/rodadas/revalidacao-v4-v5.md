# Revalidação v4 e v5

Critério: o único, em `revisao-criterio-fidelidade.md`. Verificação mecânica em cada ficha (`scratchpad/tools/audit.py`): citações contra as respostas e o livro; marcadores de causa, intenção, generalização e sequência fora das aspas; afirmações sobre a forma das falas, conferidas à mão contra as falas citadas. Agentes novos, com `skill.md` e `respondidas.md` numa pasta limpa; cada transcript mostra só essas leituras (mais o arquivo de respostas adicionais, quando o agente fez perguntas).

## v4 (v3 + diretriz sobre a forma das falas)

| Ficha | Veredito | Motivo |
| --- | --- | --- |
| Ghork (`ghork-v4-ficha.md`) | **Aprovada** | 361 citações, todas existem. Todas as afirmações sobre a forma das falas conferem com as falas citadas ("três das quatro terminam em exclamação", "duas dessas quatro trazem Obrigado e duas trazem não posso", "as quatro trazem o nome Eraste", "cada alerta traz o nome ou título de quem ouve e termina em exclamação") |
| Lala (`lala-v4-ficha.md`) | **Reprovada** | "É interrompida pelo Dam: 'Mas, Dam...'; então diz 'Que deselegante! Deixe-me ao menos terminar de falar.'" Liga duas cenas (cap. 9 e cap. 4) numa sequência que nenhuma resposta afirma |
| Drull (`drull-v4-ficha.md`) | **Reprovada** | Citação com erro de digitação ("Not esquenta miolo") e "A fala dele ao Ghork é sempre curta e pelo nome", contradita pela lista que vem logo depois ("Fácil! [...] Não esquenta miolo.", "Guerreiros!", "Cofrinho!" não trazem o nome) |

O agente do Drull fez uma rodada de perguntas (8) antes da ficha. Respostas em `drull-v4-respostas.md`.

## v5 (v4 + passo 3, "Conferir")

| Ficha | Veredito | Motivo |
| --- | --- | --- |
| Lala (`lala-v5-ficha.md`) | **Aprovada** | 310 citações, todas existem (as duas restantes: "infalíveis", em texto corrido, e a mensagem neutra do modelo). Os dois fatos que a v4 ligava ficam em frases separadas. Afirmações sobre a forma conferidas ("deselegante" em 5 falas: as quatro de "Ai" e mais uma; posição do nome nas falas) |
| Drull (`drull-v5-ficha.md`) | **Aprovado** | 270 citações, todas existem. "Em 4 das 5 falas em que se nomeia, 'Drull' abre a fala" e "'Gruuuu' fecha duas falas" conferem. Sem sequência nem generalização sem resposta |
| Ghork (`ghork-v5-ficha.md`) | **Reprovada** | 339 citações, todas existem. "Defeito: Engana os outros." é hábito geral que nenhuma resposta afirma (as respostas dão as falas do Dam e do pai); a própria ficha traz "Eu não posso mentir para o meu pai". "Depois da reprovação o tom muda" afirma uma mudança sem dizer qual |

O agente do Drull fez uma rodada de perguntas (3). Respostas em `drull-v5-respostas.md`.

## Reclassificação da v3

Com o critério único, o "Duas dessas recusas começam por 'Obrigado'" da ficha do Ghork na v3 (uma das duas começa por "Pelas divindades!") conta como reprovação de precisão. Antes eu o tinha registrado sem reprovar. A v3 fica então: Ghork reprovado, Lala e Drull aprovados.

## Leitura do conjunto

| Versão | Ghork | Lala | Drull |
| --- | --- | --- | --- |
| v2 | reprovada | reprovada | aprovado |
| v3 | reprovada (precisão) | aprovada | aprovado |
| v4 | aprovada | reprovada | reprovada |
| v5 | reprovada | aprovada | aprovado |

- **Plano, fase 1** ("uma ficha do Ghork passa"): cumprida pela v4.
- **Plano, fase 2** ("Lala e Drull passam seguidos, sem mudança na skill"): cumprida pela v5. A v3 também teria cumprido, mas a v4 e a v5 foram criadas depois de falhas encontradas.
- **Ghork na v5 reprova.** Não era exigido pelo plano, mas fica registrado: com a versão final, um dos três agentes ainda escreveu um rótulo geral sem base.
- **Taxa de deslizes por ficha:** de uma a duas em cada três fichas tem uma frase fora das aspas sem base, em cada versão. O passo "Conferir" eliminou os deslizes de sequência e de citação que a v4 tinha na Lala e no Drull, mas não o rótulo de "Defeito" do Ghork. O que pega todos é a verificação mecânica e a leitura à mão das afirmações sobre forma e hábito, feitas por mim fora da skill.
- **Causa provável do rótulo:** nas respostas do oráculo, a regra "nunca conclusões" deixa o campo "Defeito" sem base além das falas; o agente preenche com um rótulo. No uso real, quem responde (o autor) daria o defeito, e a pergunta 4 da skill o pede.
