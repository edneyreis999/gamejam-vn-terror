# Entrega aceita — coreto-english-localization

Edney aprovou a entrega em 2026-09-29: “essa spec está aprovada. pode executar
o final verify.” (D-025, V-005). O aceite cobre o jogo inteiro em inglês
americano e português, com o inglês como padrão, sobre a base Coreto de
d17d886. Estado: **aceito com follow-ups conhecidos**; não é publicação da
game jam.

## Comportamento entregue

- Opções → Geral: Idioma (English/Português) e Efeitos de texto, com
  preferência lembrada entre sessões; troca ao vivo, inclusive no meio de um
  diálogo, sem avançar a leitura.
- Todo o texto do jogador em `rpg-maker/The Dryland Drowned/Languages.tsv`
  (451 chaves, colunas `Key`, `English`, `Portuguese`); os eventos guardam só
  `$[chave]` e mantêm a mesma estrutura. Fluxo de edição no
  [README do jogo](../../../../rpg-maker/README.md#idiomas-e-textos).
- Nomes de rota/encontro, status e causas do memorial vêm de variáveis com
  chaves, resolvidas na exibição; saves novos guardam chaves, independentes
  de idioma.
- Título estático “The Dryland Drowned” na aba, janela e metadados do save.
- Tratamento de texto: itálico para vozes e inscrições; uma única fala
  animada (Andirá), que para quando Efeitos de texto está desligado.

## Validação preservada

V-001 (cobertura estática de todo o corpus) e V-006 (parâmetros contra a base)
passaram; QA em runtime reduzido por decisão de Edney (D-024), com o racional
na [spec](../../../../planos/tasks/coreto-english-localization/spec.md#qa-scope-reduction-d-024)
e o [relatório](../../reports/2026-09-29-coreto-english-localization.md).
Revisão da implementação: `SHIP`. A suíte existente tem 80 falhas por
pré-condições em PT obsoletas e uma dependência ausente, sem regressão real
observada.

## Follow-ups conhecidos

- Itens do texto-fonte (L15 F03, F10, F12, F14), mantidos como entregues.
- Atualizar os helpers dos testes para escolher o título por chave ou índice.
- 22 imagens com marca “PLACEHOLDER” (arte, fora desta spec).
- Variantes cortadas pela D-024 (comparação PT, 1920×1080, fechamentos
  Destruir e Perda total).

## Material para compor o devlog

Momento demonstrável: a opção de idioma, a mesma cena nos dois idiomas e uma
escolha legível em inglês. Capturas reais, pixels sem alteração;
[proveniência](selected-images.json). Nenhum devlog foi composto ou publicado.

- [Opção de idioma](images/language-option-en.png): Opções → Geral em inglês.
- [Prólogo em português](images/prologue-pt.png) e
  [o mesmo trecho em inglês](images/prologue-en.png), trocados pelo botão
  Options no meio da fala.
- [Escolha de abordagem em inglês](images/encounter-choice-en.png): três
  rótulos quebrados nos quadros e cabeçalho com nome traduzido.
- [Escolha final do Conselho em inglês](images/council-choice-en.png).

Evidência bruta preservada localmente (não versionada) em
`.artifacts/archives/coreto-english-localization-accepted-20260929/` com
`MANIFEST.sha256` (130 arquivos, conferidos); disponível só nesta máquina.
