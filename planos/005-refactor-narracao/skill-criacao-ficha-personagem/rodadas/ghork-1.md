# Rodada 1: Ghork

- **Skill testada:** versão mínima (modelo + "Perguntar" + "Preencher").
- **Agente:** subagente sem isolamento (o hook de worktree falhou), sem ferramentas. O transcript registra 0 chamadas de ferramenta.
- **Gabarito:** `reverse-eng-livro/ghork.md`.
- **Arquivos desta rodada:**
  - `ghork-1-perguntas.md`: as 49 perguntas originais do agente;
  - `ghork-1-respostas.md`: respostas do oráculo;
  - `ghork-1-ficha.md`: a ficha do agente.

## Registro do oráculo

- As respostas usam só falas literais e as situações em que aparecem. Sem número de capítulo.
- Duas respostas trouxeram dado além da fala, porque a pergunta pedia frequência (Q24, Q25): contagens de "Calma/Relaxa", "Ei,", "Poxa", do bordão ("três vezes, nunca duas na mesma cena") e de "Pelas divindades!". Essas contagens saíram da minha leitura do livro. Isso é viés do oráculo no Ghork, previsto no plano.
- Q38 ("o que continua igual?") ficou sem resposta de propósito (regra 2 do oráculo).
- Q49 (o que as perguntas não cobriram) foi respondida com o formato do livro (pensamentos em itálico), nada mais.

## Julgamento

**Verificação mecânica:** 300 citações da ficha conferidas contra as respostas e o livro. Todas existem. Nenhuma fala inventada.

### 1. Fidelidade: reprovada

Uma afirmação de fato não sai de nenhuma resposta:
- §7 Eraste: "Colega orc que o persegue (**por causa da pena "mágica"**)" e §2 Defeito: "(...) e o Eraste **passou a persegui-lo**". Nenhuma resposta liga a perseguição à pena. O agente uniu duas respostas (Q7 e Q47) numa causa.

Duas afirmações no limite, tratadas como interpretação do campo "Personalidade em ação" e não como invenção:
- §7 Lala: "ela e o Dam insistem que a prova é má ideia" (a resposta diz só que insistem no refeitório).
- §7 Shad: "Protege-a com a mentira pequena" (a resposta não dá o motivo).

### 2. Cobertura: aprovada, com uma ausência

| Marca do gabarito | Na ficha |
| --- | --- |
| Bordão "Isso não é importante! O que importa é…" | Presente, 3 vezes, com as três situações |
| Gagueira quando encurralado | Presente, 3 falas; situação "acuado, escondendo algo, surpresa" (sem "não sabe o que dizer e precisa achar as palavras") |
| Chamar os outros pelo nome | Presente |
| "Calma"/"Relaxa" para quem está nervoso ou ameaçador | Presente, 5 falas, "acalmando o outro" |
| "Poxa" seguido do nome | Presente, 3 vezes; situação só implícita nos exemplos |
| "Ei," para chamar ou convidar | Presente, 3 falas |
| "Pelas divindades!" | Presente, 1 vez |
| Não insulta pelo tamanho, não xinga | Presente |
| Futuro grandioso mesmo no medo | Presente |
| **Fase do livro (confiante antes da reprovação, mais sério depois)** | **Ausente** |

A fase do livro falta porque o modelo não tem campo para isso e nenhuma pergunta do agente a cobriu. O gabarito a registra como linha extra em §4.

### 3. Exemplo e frequência: aprovado

Cada marca traz fala de exemplo e frequência.

## Defeitos fora dos três critérios

- **Texto de processo dentro da ficha:** "Nenhuma resposta nomeia o defeito", "Nenhuma resposta usa a palavra 'vergonha'", "Notas sobre as falas acima", "Notas finais sobre a evidência", "Nenhuma resposta trouxe um resumo disso". Quem escreve diálogo com a ficha não precisa disso.
- **Tamanho:** 27 KB, o dobro do gabarito (13 KB). Muitas falas se repetem em vários campos. Não reprova nenhum critério; fica registrado.

## Veredito: REPROVADA (fidelidade)

## Mudanças na skill (cada uma cita o campo que falhou)

| Mudança | Campo que falhou |
| --- | --- |
| Diretriz: registrar cada fato como a resposta o deu; duas respostas lado a lado, sem "porque" que nenhuma delas afirma | §7 Relações (Eraste); §2 Defeito |
| Diretriz: a ficha traz só o personagem; campo sem base recebe "sem evidência" e nada mais | §2 Defeito; §4 Sob vergonha; §4 Marcas que permanecem; §5 notas; notas finais |
| Campo novo no modelo (skill e `modelo-ficha-personagem.md`) e pergunta 23: "Mudança ao longo da história" | §4, fase do livro do gabarito |
| Perguntas sanitizadas (29), derivadas das 49 do agente, mais a nova | todas as seções |

## Próximo passo

Rodada 2 de Ghork: agente novo, skill atualizada, perguntas já respondidas (as respostas desta rodada e a resposta da pergunta nova). Testa as diretrizes de preenchimento; as perguntas sanitizadas são testadas na fase 2.
