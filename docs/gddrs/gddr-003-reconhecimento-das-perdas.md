# GDDR-003: Reconhecimento das perdas na fogueira e na taverna

- **Status:** Partially superseded
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Narração das pausas, ausência visual e diálogos de luto.
- **Decision source:** discussão com o usuário em 15–16/10/2026, decisões consolidadas e plano de registro aprovado em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Fogueiras e vínculos](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-perdas).

> **Substituição parcial em 2026-10-16:** o [GDDR-006](gddr-006-memoria-das-perdas-entre-expedicoes.md) substitui o alcance do histórico de perdas, o desaparecimento entre locais e a seleção/frequência das reações. Permanecem ativos as três aberturas, sua apresentação, a morte permanente, a redução de movimento e os assuntos contextuais da taverna. O corpo original abaixo preserva a decisão e as pendências daquela etapa; o sucessor resolve os pontos indicados.

## Context

A morte é permanente, mas uma pausa que ignora a ausência pode enfraquecer seu impacto. O usuário propôs reutilizar a apresentação de Rheed mais velho e o desaparecimento já existente na taverna. É necessário reconhecer perdas sem escrever uma narração para cada vítima e combinação de sobreviventes.

## Decision

### Três aberturas compartilhadas

Rheed mais velho, em cores e na apresentação já usada em suas narrações, introduz a pausa antes de aparecer a fogueira. Escrever exatamente três textos compartilhados entre as fogueiras, sem variantes por vítima, rota ou composição:

| Estado da expedição | Tom |
| --- | --- |
| Nenhuma perda na expedição até agora | Alívio e esperança cautelosa |
| Morte desde a última pausa | Melancolia e percepção da ausência |
| Perdas anteriores, sem morte nova | Continuidade apesar das ausências |

As aberturas não precisam citar nomes. A narração enquadra a lembrança coletiva; as reações dos heróis mostram aspectos particulares da relação.

### Entrada na fogueira e reações

Após a narração, mostrar o acampamento e aplicar aos integrantes mortos o desaparecimento gradual inspirado na taverna. O efeito representa uma ausência: não ressuscita, permite selecionar ou dá fala ao morto. Preservar o tratamento de redução de movimento. A extensão reutiliza o efeito de um segundo; o consumo da mesma perda entre fogueira e taverna ainda precisa ser definido na spec.

Uma reação curta de sobrevivente com vínculo pode ocorrer antes das conversas opcionais. Não exigir uma segunda fala de luto em toda chegada nem repetir nela o que Rheed acabou de dizer. Se duas mortes ocorreram desde a pausa anterior, a chegada reconhece as perdas em conjunto, sem repetir duas cerimônias. Quando nenhum herói permanece, respeitar retorno automático ou bad ending, sem introduzir fogueira vazia.

### Luto na taverna

Escrever novos assuntos sobre companheiros mortos para sobreviventes dos pares canônicos. Distinguir quem testemunhou a perda de quem ficou na cidade. Quando alguém já reagiu na fogueira, a conversa da taverna desenvolve o sentimento em vez de repetir a mesma reação. Assuntos ficam disponíveis no menu como `Sobre <herói>` / `About <hero>`.

Usar os fatos de morte e presença da campanha também para preparar nomes textuais quando necessários. Uma variável de apresentação pode conter os nomes formatados; ela não é uma segunda fonte independente de quem morreu ou chegou vivo.

### Pendências

Definir na spec o alcance do histórico emocional ao recuar e formar outra expedição, a seleção de reação quando houver mais de um vínculo elegível e o tratamento de perdas já apresentadas em outro local. As três aberturas não autorizam novas variantes de narração para resolver esses casos.

## Alternatives considered

- Uma narração por morte ou combinação: o usuário delimitou explicitamente três aberturas compartilhadas.
- Tratar toda chegada sem morte nova como leve: ignoraria perdas anteriores da mesma expedição.
- Usar apenas o desaparecimento visual: não basta para expressar a reação dos sobreviventes.
- Repetir o mesmo luto em Rheed e no herói: acrescentaria duração sem acrescentar perspectiva.

## Rationale

Concentrar o tom coletivo em três narrações reduz variações de texto. Reservar gestos e falas específicas aos sobreviventes dá identidade à perda. O retorno à taverna mostra também o impacto sobre quem não participou da expedição.

## Consequences

O conteúdo precisa distinguir morte recente, perda anterior e ausência por não participar da expedição. Diálogos posteriores não devem soar indiferentes ao luto. Compatibilidade narrativa entre fogueira e taverna exige revisão; não implica criar uma versão completa de cada conversa para cada morte.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-006](gddr-006-memoria-das-perdas-entre-expedicoes.md) | Partially superseded by | O alcance do histórico de perdas, o desaparecimento entre locais e a seleção/frequência das reações | As três aberturas, sua apresentação, a morte permanente, a redução de movimento e os assuntos contextuais da taverna |
| [GDDR-001](gddr-001-fogueiras-e-ritmo-da-expedicao.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-002](gddr-002-conversas-e-vinculos-dos-herois.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-004](gddr-004-descoberta-de-conversas-ineditas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
Amplia a exceção visual das seções 19.1.1 e 22 do GDD para incluir desaparecimento na fogueira. Preserva a morte permanente, a apresentação anterior da taverna e o memorial; a coordenação do efeito entre locais permanece pendente.


## Sources and evidence

- [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): regras da campanha, fichas subordinadas, oito pares e apresentação vigente; o registro atualiza o design, não certifica o runtime.
- Discussão de 15–16/10/2026 e autorização de 16/10/2026: fonte das decisões e motivações atribuídas ao usuário.
- Inspeção local durante a discussão: cenário `Dryland_Camp.png` e mapa Acampamento (Map045) existentes, mapa sem eventos. Isso demonstra material disponível, não a feature implementada.
- Textos finais, spec incremental, integração e verificação do novo fluxo permanecem pendentes. Nenhum teste ou aceite emocional é declarado por este registro.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registro como Accepted das decisões consolidadas; implementação e redação final pendentes. | Discussão de 15–16/10/2026 e autorização do plano em 16/10/2026. |
| 2026-10-16 | Substituição parcial por GDDR-006; corpo original preservado. | [GDDR-006](gddr-006-memoria-das-perdas-entre-expedicoes.md) |
