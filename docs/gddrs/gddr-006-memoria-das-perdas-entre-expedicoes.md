# GDDR-006: Memória das perdas entre expedições

- **Status:** Accepted
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Histórico de luto, desaparecimento visual e reações na fogueira ao longo da campanha.
- **Decision source:** respostas explícitas do usuário na entrevista da spec em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Chegada, ausência e luto](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-perdas).

## Context

O GDDR-003 definiu três aberturas de Rheed e o reconhecimento da perda, deixando em aberto o efeito de formar outra expedição e a coordenação entre taverna e fogueira. Tratar uma partida nova como se ninguém tivesse morrido apagaria o histórico emocional. Limitar as reações a mortes recentes também excluiria o companheiro que ficou na cidade.

## Decision

### Três tons, com memória de campanha

Manter exatamente três aberturas compartilhadas de Rheed mais velho: nenhuma morte na campanha; morte nova desde a partida ou a fogueira anterior da tentativa atual; perdas anteriores sem nova morte nesse intervalo. Partir novamente redefine apenas o intervalo de morte recente. Não apaga o luto nem produz variantes por vítima, rota ou trio.

### Ausência visual independente por local

Em toda chegada real à fogueira, todos os heróis mortos da campanha aparecem brevemente e desaparecem juntos em um segundo, inclusive mortos em expedições anteriores. Vivos fora da expedição não aparecem. Mortos nunca são interativos. Com redução de movimento, seus lugares já estão vazios. Voltar de um menu, conversa ou Options não é nova chegada.

Na taverna, cada nova morte recebe seu desaparecimento no primeiro retorno, mesmo que já tenha sido mostrada em uma ou mais fogueiras. Retornos seguintes à taverna não repetem ausências reconhecidas. Os dois locais não consomem o efeito um do outro.

### Reação por vínculo

Depois da narração e do desaparecimento, apresentar automaticamente a reação curta de cada herói vivo presente que tenha um companheiro morto entre os oito pares canônicos. A morte pode ter ocorrido em outra expedição. Cada direção sobrevivente → morto ocorre uma vez por campanha; não exigir que o sobrevivente tenha testemunhado a perda.

Quando várias reações estiverem pendentes, apresentar todas em ordem estável de sobrevivente H1–H8 e, para o mesmo sobrevivente, de companheiro H1–H8. Somente a conclusão consome a reação. As conversas opcionais começam depois dessa chegada; não criar outra abertura de Rheed para cada reação.

Os assuntos da taverna continuam separados: abertura de testemunha ou de quem ficou na cidade, ponte conforme a reação da fogueira já ocorreu ou não, e aprofundamento. Ler o assunto não consome a reação futura da fogueira. Uma nova campanha reinicia os históricos.

## Alternatives considered

- Mostrar na fogueira apenas mortos recentes ou da expedição atual: o usuário escolheu lembrar todos os mortos em cada chegada.
- Consumir o efeito da taverna na fogueira: rejeitado; cada nova morte continua aparecendo no primeiro retorno à cidade.
- Limitar a reação à tentativa atual ou selecionar apenas um vínculo: substituído pela decisão de apresentar cada direção elegível uma vez na campanha.
- Acrescentar variantes à narração de Rheed: descartado desde o GDDR-003; o limite de três permanece.

## Rationale

A decisão do usuário dá continuidade às perdas mesmo depois de trocar a formação. O desaparecimento repetido funciona como lembrança, enquanto a fala específica não se repete. Separar os dois locais conserva o reconhecimento da morte para quem volta à taverna, sem multiplicar as aberturas do narrador.

## Consequences

A chegada pode acumular mais de uma reação; duração e repetição visual precisam de avaliação humana. É necessário distinguir leitura de reação, testemunho e apresentação da ausência. A elegibilidade deriva de morte, presença e vínculos existentes, sem novos arcos para outras combinações. Não há evidência de aceite emocional do fluxo implementado.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-003](gddr-003-reconhecimento-das-perdas.md) | Partially supersedes | Escopo apenas da expedição na abertura sem perdas; alcance e consumo do desaparecimento; seleção/frequência das reações e pendências entre tentativas/locais | Exatamente três aberturas, Rheed em cores antes da fogueira, redução de movimento, morte permanente, luto opcional da taverna com testemunho e aprofundamento, ausência de fogueira vazia |
| [GDDR-002](gddr-002-conversas-e-vinculos-dos-herois.md) | Complements | Nenhum | Conteúdo opcional, oito vínculos e fronteira editorial |
| [GDDR-004](gddr-004-descoberta-de-conversas-ineditas.md) | Complements | Nenhum | Novidade determinada por conteúdo disponível e concluído |

## Sources and evidence

- Entrevista da spec em 16/10/2026: decisões de memória global, desaparecimentos independentes e reação única por direção de vínculo.
- [Spec incremental](../../planos/tasks/campfire-hero-bonds/spec.md) e [proposta narrativa](../../planos/tasks/campfire-hero-bonds/campfire-hero-bonds.narrativa.md): comportamento especificado e textos completos sujeitos a revisão; integração e playtest pendentes.
- [GDDR-003](gddr-003-reconhecimento-das-perdas.md): registro original, preservado como histórico parcial.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registrado como Accepted; substituição parcial do GDDR-003, sem declarar implementação. | Respostas do usuário na entrevista da spec. |
