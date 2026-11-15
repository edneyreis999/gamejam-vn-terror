# GDDR-008: Recriação das vozes e continuidade de Rheed

- **Status:** Accepted
- **Recorded on:** 2026-11-14
- **Decision date:** 2026-11-14
- **Last updated:** 2026-11-14
- **Scope:** Caracterização do elenco, autoridade das fichas e enquadramento narrativo de Rheed; sem alteração do runtime.
- **Decision source:** direção acordada e execução autorizada pelo dono em 14/11/2026, na conversa “Recriação das fichas de personagens com Grok”; esclarecimento direto do dono no mesmo dia sobre a praça de Daratrine e as memórias próprias de Rheed. Conversas sem link público durável.
- **GDD:** [Personagens](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#18-heróis-e-conteúdo-de-personagem), [mundo e narração](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#41-mundo-sem-humanos) e [apresentação de Rheed](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#272-apresentação-vigente-nesta-integração).

## Context

O elenco tinha duas coleções de fichas que reproduziam biografias e vozes antigas. O dono pediu recriação de 17 fichas para 16 personagens, incluindo as duas idades de Rheed, com pessoas falhas, contraditórias e moralmente desconfortáveis. Pretende distinguir as vozes também em afeto, ajuda, humor, alívio e vulnerabilidade, sem homogeneizar o elenco em cinismo ou trauma. Essa intenção não é evidência de efeito emocional já obtido.

As competências e os vínculos têm consequências mecânicas que a recriação não pode mudar. O livro do dono fornece a identidade de Rheed velho, enquanto o GDD fixa a participação do jovem na expedição. Textos implementados e decisões históricas não podem ser confundidos com a nova fonte de caracterização.

## Decision

### Uma autoridade de caracterização

Adotar [docs/narrativa/personagens/](../narrativa/personagens/README.md) para as 17 fichas, a comparação e a pesquisa. Retirar as 17 fichas e os dois documentos de apoio de `planos/005-refactor-narracao/ficha-personagens/`, além das oito `docs/narrativa/herois/Ficha_H*.md`. O histórico das oito fichas H1–H8 permanece no Git público; os 19 documentos da coleção anterior permanecem apenas no arquivo local privado, fora da publicação. Não manter uma segunda coleção ativa.

Dos heróis antigos, preservar nomes e pares exatos de competências. Retirar biografias, idades, ofícios, motivações, arquétipos, personalidades e interpretações interpessoais antigos como restrições. Preservar a identidade visual dos retratos existentes e uma conexão plausível entre competências e ações. Personalidade pode contrastar com aparência. As sete figuras da história preservam suas funções e acontecimentos essenciais no GDD.

As fichas seguem sete seções, 48 campos, passado e relações, com exemplos escritos e seis exercícios comuns mais a mensagem neutra. Evidência, inferência e **Criação** devem ser distinguíveis. Pesquisa de cenas humanas, inclusive dos três filmes brasileiros indicados pelo dono, fica em registro separado. Inspiração em vilões e anti-heróis não autoriza cópia de falas, biografia, tecnologia ou temas externos. Preservar terror psicológico 16+, mundo sem humanos e exclusões de gore explícito, violência sexual e drogas.

### Rheed em duas idades

Rheed velho é o mesmo Theodor Rheed do livro do dono. O jovem deve ser reconhecível como fase anterior dessa pessoa, com lacunas compatíveis identificadas como **Criação**. As falas de outros personagens e a prosa descritiva do livro não se tornam automaticamente falas literais de Rheed.

No presente do jogo, Rheed conta suas próprias memórias da expedição durante a Noite da História, na praça de Daratrine. Isso substitui a indeterminação anterior da cidade nas seções 4.1, 19.2 e 27.2 do GDD somente nesse enquadramento; não nomeia os locais da expedição. Preservar `Dryland_Coreto`, retratos, vídeos e distinção temporal existentes, sem nova arte ou mecânica de memória.

### Regras e texto implementado

Preservar os oito pares H1–H5, H1–H8, H2–H6, H2–H7, H3–H8, H3–H6, H4–H5 e H4–H7. Seu significado interpessoal pode mudar, sem novos arcos bilaterais para os demais vinte pares. Preservar participação opcional, presença, perdas por direção sobrevivente → morto, as três aberturas compartilhadas de fogueira sem variantes por vítima e todos os quantitativos e condições do GDD.

No Conselho, manter ordem H1–H8 dos vivos presentes, H1/H4/H5/H7 aconselhando reunir e H2/H3/H6/H8 aconselhando destruir, sem voto ou bloqueio da escolha. Recriar reações e razões verbais não altera esses lados. Preservar a cronologia, revelações, sete regras do medalhão, finais, epílogos e despedidas predefinidos, competências e limites de Ivaí/Rheed na campanha.

A nova caracterização não integra nem reescreve falas no jogo. `Languages.tsv`, eventos, assets, mecânicas e saves ficam intactos. A redação jogável mantém sua proveniência e seus estados de aceite; é baseline para uma integração futura, sem impor os traços descartados às novas fichas. Revisão independente, aceite editorial humano e integração no runtime são estados separados.

## Alternatives considered

- Preservar as personalidades antigas como limite: não corresponde à recriação autorizada; apenas nomes, competências e identidade visual dos heróis permanecem obrigatórios.
- Conservar coleções paralelas: contraria a decisão explícita de retirar as fichas superadas e manter uma autoridade corrente.
- Manter a cidade do narrador indefinida: substituído pelo esclarecimento direto do dono sobre Daratrine.

Não há evidência de comparação formal entre outras alternativas; não se atribui ao dono uma avaliação que não foi registrada.

## Rationale

O dono quer personagens distintos e utilizáveis para escrever diálogo novo, com contradições e amplitude emocional. Separar fontes, criação e texto implementado permite desenvolver essas vozes sem transformar placeholders ou pesquisa externa em cânone. A continuidade de Rheed preserva a ligação com o livro, e a manutenção das regras evita que uma decisão de caracterização altere a campanha.

## Consequences

Autores e revisores passam a consultar um índice único. Referências ativas precisam apontar para ele; documentos históricos conservam seus caminhos e estados originais. A retirada das fichas não retira conteúdo do jogo. Uma futura integração de diálogos deverá conciliar novas vozes, tradução e regras existentes em escopo próprio.

A revisão documental independente do conteúdo está registrada no índice; o julgamento humano sobre a diversidade de voz e a eficácia emocional permanece pendente. **Accepted** registra a adoção desta direção, não aprovação de cada ficha, conclusão da revisão independente ou resultado de playtest. O [índice de personagens](../narrativa/personagens/README.md#estado-da-entrega) explicita esses estados.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-002](gddr-002-conversas-e-vinculos-dos-herois.md) | Complements | Nenhum; a substituição recai sobre a antiga caracterização no GDD e nas fichas, não sobre as decisões deste registro | Conteúdo e contagens das conversas, pares, participantes, leitura opcional, fronteiras de revelação e distinção entre autoria e aceite |

O contexto histórico do GDDR-002 descreve as fichas disponíveis à época; sua decisão não congela o conteúdo delas. Por isso, não há supersessão total ou parcial desse GDDR, nem mudança retroativa de sua data ou evidência.

## Sources and evidence

- Instruções do dono de 14/11/2026: recriação do elenco e autorização de execução; depois, praça de Daratrine, memórias próprias e permissão de completar lacunas compatíveis de Rheed. A atribuição datada preserva a decisão sem depender de um pacote de execução ignorado.
- [Pesquisa](../narrativa/personagens/pesquisa.md): inventário de fontes, hashes dos 27 capítulos, passagens verificadas, arte e referências externas. Seu manifesto não equivale a uma leitura integral independente do livro.
- Livro fornecido pelo dono em `planos/005-refactor-narracao/livro-ghork/` e modelo modificado em `planos/005-refactor-narracao/modelo-ficha-personagem.md`: insumos preservados, não copiados para esta entrega.
- [Fichas](../narrativa/personagens/README.md) e [comparação](../narrativa/personagens/comparacao-vozes.md): material de autoria sujeito à revisão e ao aceite indicados no índice; não prova de integração no jogo.
- [GDD](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): autoridade preservada de mundo, trama, competências e participação.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-11-14 | Registro como Accepted da recriação, autoridade única e continuidade de Rheed; revisão das fichas, aceite humano e integração de falas não declarados concluídos | Direção e esclarecimento do dono em 14/11/2026 |
| 2026-11-14 | Estado da revisão documental remetido ao índice após o parecer sobre `9c8fe7a4ba774e376f5e6930d350ce0d056a0775`; decisão Accepted preservada, sem aceite humano ou integração no jogo | Parecer independente sobre o conteúdo em 14/11/2026 |
