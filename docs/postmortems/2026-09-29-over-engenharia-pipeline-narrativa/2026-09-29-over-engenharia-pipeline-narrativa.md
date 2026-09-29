# Pipeline "documento → JSON" e oráculo fixado criaram três fontes da verdade para o mesmo texto

- **Data da correção:** 29 de setembro de 2026.
- **Estado técnico:** resolvido na branch `humanizacao-narrativa`; textos aplicados direto nos dados do jogo, máquina de sincronização e oráculo removidos, teste desacoplado. Sem commit ainda no momento deste registro.
- **Público:** narrativa, programação, autoria de eventos e quem revisa alterações do projeto.
- **Introdução do padrão:** commit `c654c78` (2026-09-18), task `approved-narrative-dialogue-staging` (integração dos PRs #15–#19). Ali nasceram os scripts `task-NN-integrate.py`, o `task-08-source-oracle.py` e o fixture `rpg-maker/tests/fixtures/approved-trap-successes.json`.
- **Extensão do padrão:** commit `cee2b11` (2026-09-26), task `updated-narrative-copy`, com `integrate-copy.py` e a fixação do oráculo como sensor de teste permanente.
- **Base investigada:** `3f9a08f` (HEAD da branch).
- **Escopo:** representação da cópia narrativa das armadilhas e falas de heróis, e o acoplamento entre `docs/narrativa/`, `data/*.json` e a suíte `rpg-maker/tests/`.

## Resumo

O mesmo texto de armadilha passou a existir em **três representações paralelas** que precisavam ser mantidas em sincronia à mão ou por script:

1. **Docs-fonte** — `docs/narrativa/armadilhas/## *.md` e `docs/narrativa/herois/# Falas de cada herói.md`, tratados como "cópia aprovada do jogador".
2. **Dados de runtime** — `data/Map007–023, Map037–044, CommonEvents.json`, que é o que a engine realmente lê e o jogador vê.
3. **Oráculo fixado de teste** — `approved-trap-successes.json`, um *snapshot* da prosa de sucesso usado como "oráculo independente" pelo `encounters.mjs`.

A sincronização era feita por scripts geradores (`task-*-integrate.py`, depois `integrate-copy.py`) que **liam os docs e regeneravam os JSON**. Como toda cópia, as três representações divergiram: a task `updated-narrative-copy` atualizou docs e mapas, mas **não** regenerou o oráculo. O resultado foi um teste (`IT-082/083/084`) silenciosamente vermelho desde então, e um repositório onde ninguém sabia mais qual das três cópias mandava.

Ao aplicar uma rodada humana de melhorias de clareza (`docs/narrativa/## possíveis melhoras no jogo.md`) diretamente nos mapas, a própria máquina reagiu contra o humano: `integrate-copy.py` abortou com `Unexpected candidate drift: Map007.json`, e um futuro `--write` teria **revertido silenciosamente** o trabalho manual, restaurando o texto antigo a partir dos docs.

A solução foi colapsar para **uma única fonte da verdade — os dados do jogo** — e remover a máquina que sustentava as cópias.

## O que era a over-engenharia

Para um Visual Novel de game jam, o fluxo montado era desproporcional ao problema ("trocar uma frase"):

- **Docs como fonte primária.** A prosa era escrita em markdown com um formato próprio (`## A1.md` com seções de descrição, opções, sucessos, falha, morte) que só o gerador entendia.
- **Geradores por increment.** `approved-narrative-dialogue-staging` acumulou dezenas de `task-01-integrate.py` … `task-10-*.py` mais dezenas de `task-10-request-*.json`. `updated-narrative-copy` adicionou `integrate-copy.py` (12,9 KB) e `verify-playthrough.mjs`.
- **Oráculo fixado.** `task-08-source-oracle.py` produziu `approved-trap-successes.json` com hash `sha256` por passagem, consumido pelo teste permanente como "the independent oracle".
- **Validador de gramática e pré-condições** embutidos no gerador (`verify_grammar`, checagem de que cada mapa é "baseline ou valor gerado").

O ponto mais revelador: a própria `verification.md` do `updated-narrative-copy` (linha 141) registrou que `integrate-copy.py` era "offline, pinned-increment transformation … **not a reusable whole-game generator**". A intenção declarada era um script de migração de uso único. Mas o **oráculo ficou fixado na suíte de teste permanente**, o que transformou um script de uso único em um acoplamento eterno que exigia regeneração a cada mudança de texto.

E havia um sinal claro, ignorado, de que o usuário nunca pediu essa cerimônia: nas decisões `D-008` e `D-017` do increment anterior, o usuário disse repetidamente "mantenha simples, aceito as inconsistências deste increment, eu refino depois". A intenção sempre foi *menos é mais*; a máquina cresceu à revelia dela.

## Como operava e o problema que causou

O modelo do gerador (`integrate-copy.py`, `main()`):

1. lê os 17 docs-fonte;
2. carrega o `baseline` de cada JSON (do git) e calcula o valor `desired` (baseline + prosa dos docs);
3. **pré-condição:** cada arquivo em disco tem de ser *ou* o baseline *ou* o `desired`. Qualquer terceiro estado é rejeitado como `Unexpected candidate drift`;
4. com `--write`, sobrescreve o JSON com o `desired` (gerado dos docs).

Consequências:

- **Drift entre as três cópias.** `updated-narrative-copy` mudou docs+mapas para "A fuligem revela um espaço calmo…", mas o oráculo continuou com a prosa antiga de outro increment ("Mesmo com tudo girando…"). Em HEAD, **10 de 30** passagens de sucesso batiam com o oráculo; 20 não batiam. O teste `IT-082/083/084` estava vermelho e assim permaneceu, sem ninguém perceber — um oráculo que é cópia está *fadado* a envelhecer a cada alteração.
- **A máquina brigando com o humano.** Editar o jogo direto (o gesto mais natural, o que um humano faz no editor do MZ) viola a pré-condição do gerador. Pior: rodar `--write` de novo **reverteria** a edição humana, porque os docs — a "fonte" — ainda tinham o texto antigo. O trabalho de clareza teria desaparecido silenciosamente num commit futuro.
- **Confusão de fonte da verdade.** Diante de três textos diferentes para a mesma cena, nem agente nem humano conseguiam responder "qual vale?". A resposta correta sempre foi a mais simples: **vale o que a engine carrega e o jogador lê** — os dados do jogo.

## Linha do tempo

Horários de commit em UTC−03:00; marcam a evolução do código, não quando alguém percebeu o problema.

| Momento | Evento | Relevância |
| --- | --- | --- |
| 2026-09-18 `c654c78` | `approved-narrative-dialogue-staging` integra PRs #15–#19 | Nasce o padrão: docs-fonte, `task-*-integrate.py`, `task-08-source-oracle.py` e o fixture `approved-trap-successes.json` |
| 2026-09-26 `cee2b11` | `updated-narrative-copy` atualiza encontros e conversas | Docs e mapas mudam; `integrate-copy.py` entra; **o oráculo não é regenerado** → drift |
| 2026-09-28 | `## possíveis melhoras no jogo.md` registra melhorias de clareza | Uma 4ª camada de intenção, sobre docs que já eram espelho defasado dos mapas |
| 2026-09-29 | Melhorias aplicadas direto nos mapas; `integrate-copy.py` acusa `candidate drift` | A máquina revela o conflito com a edição humana |
| 2026-09-29 | Colapso para fonte única; remoção da máquina; teste desacoplado | Resolução |

## Como solucionamos

**Princípio:** uma fonte da verdade, e ela é o que roda no jogo.

1. **Aplicar a clareza direto nos dados do jogo** (14 arquivos `data/*.json`), como um humano faria no editor. Textos longos (`Show Text`) são uma string única e quebram sozinhos pelo word-wrap do MessageCore; rótulos de botão (picture text das escolhas) recebem a quebra manual onde cabe, porque esse texto não passa pelo wrap da janela.
2. **Remover a máquina de cópias:** `integrate-copy.py`, `verify-playthrough.mjs`, o gerador anterior `approved-narrative-dialogue-staging/task-03-integrate.py`, e o oráculo `approved-trap-successes.json`.
3. **Remover os docs-espelho:** os 16 `docs/narrativa/armadilhas/## *.md` e os dois arquivos de falas dos heróis (`# Falas de cada herói.md` e `Falas-de-cada-herói.md`).
4. **Desacoplar o teste, preservando cobertura real.** Em `encounters.mjs`, removemos apenas a asserção "o mapa tem de ser igual ao snapshot externo" (o oráculo). As demais asserções permanecem — e elas comparam o texto exibido no jogo com **o texto do próprio mapa** (`passageBoxes`), ou seja, são auto-referenciais: verificam comportamento contra os dados reais, e **nunca envelhecem**.

Registros de decisão do increment (`spec.md`, `verification.md`, ADRs) foram mantidos como histórico: descrevem *por que* e *quando*, não duplicam o *conteúdo* do jogo.

## Documentação defasada: o custo de espelhar o código

O incidente é um caso particular de um problema maior que ficou espalhado no repositório: **documentos que espelham o conteúdo do jogo**. Os `## A*.md`/`## B*.md` eram uma segunda cópia da prosa que já vivia nos mapas; os dois arquivos de "falas dos heróis" eram cópias concorrentes entre si (o próprio spec teve de escrever uma frase — "o arquivo com hífen *não* é a entrada" — só para desambiguar duas cópias quase idênticas). Cópias assim:

- **confundem mais do que ajudam** — agente e humano perdem tempo decidindo qual versão vale;
- **degradam em silêncio** — nada avisa quando o mapa muda e o doc não;
- **dão falsa confiança** — parecem fonte autoritativa quando são a versão mais velha.

### Até que ponto vale documentar em game dev

A observação do time é exata: **em desenvolvimento de jogos, a documentação nunca estará mais atualizada que o código; no máximo estará igual.** Se o melhor caso de um documento é "empatar" com o jogo, então todo documento que *espelha* o jogo só pode empatar ou perder — nunca agrega, e quase sempre atrasa.

O critério que adotamos, um teste de fumaça de uma pergunta só:

> **"Se eu mudar o jogo, este documento é *obrigado* a mudar junto?"**
> - **Sim** → é um espelho. Não escreva à mão. Ou o jogo é a fonte (não documente), ou é gerado sob demanda (nunca mantido manualmente).
> - **Não** → o documento captura algo que o código não guarda (um *porquê*). É durável e vale a pena.

Traduzindo para as camadas do projeto:

| Vale documentar (durável, não espelha o jogo) | Não documentar à mão (espelha o jogo, vai defasar) |
| --- | --- |
| Pilares e intenção de design (GDD canônico) | Texto de diálogo, descrição de cena, falas |
| Decisões irreversíveis e seus trade-offs (ADRs) | Valores de balanceamento, dano, custos, IDs |
| Post-mortems de incidentes | Estrutura de eventos, ordem de comandos, switches |
| Runbooks: como rodar, como testar, como depurar | Layout de tela, coordenadas, quebras de linha |
| Glossário e contratos entre disciplinas | "Catálogos" que recopiam dados do jogo em markdown/JSON |

Em game dev, **os dados do jogo (mapas, eventos, banco de dados) já são o documento de design no nível mais fino que existe.** No detalhe de frase, valor e coordenada, não há documento que ganhe da engine — só há documento que atrasa. Documente o **porquê** e os **ponteiros** (onde olhar, como executar); deixe o **o quê** e o **quanto** morarem no jogo, protegidos por testes que **leem o jogo** em vez de guardarem uma cópia dele.

## Prevenção

- **Uma fonte da verdade por fato.** Para conteúdo do jogo, é o dado nativo em `rpg-maker/The Dryland Drowned/`. Editar lá, como um humano no editor.
- **Sem geradores doc→dado como pipeline permanente.** Migração de uso único, quando necessária, é executada e depois **removida** — não fica de guarda exigindo re-sincronização.
- **Testes auto-referenciais, não snapshots externos.** Prefira asserções que comparam o comportamento com os próprios dados de runtime. Snapshots fixados de conteúdo ("oráculos") envelhecem a cada alteração e viram ruído vermelho.
- **Aplicar o teste de fumaça acima antes de criar qualquer doc.** Se ele é obrigado a mudar quando o jogo muda, não nasça.

Consolidado como princípio reutilizável em [L-014](../../_memory/lessons/L-014-jogo-e-a-fonte-nao-docs-espelho.md).

## Limites deste encerramento

- Não houve commit até este registro; o diff está pronto para revisão.
- A suíte de browser completa não foi reexecutada aqui: a mudança apenas **remove** uma asserção e edita texto auto-consistente, sem caminho para introduzir falha nova. As asserções auto-referenciais que restam continuam válidas.
- Registros históricos das tasks `approved-narrative-dialogue-staging` e `updated-narrative-copy` (spec, ADR, verification) foram preservados; se o time quiser aplicar a mesma limpeza aos demais `task-*-integrate.py` do increment anterior, isso fica como trabalho separado.
