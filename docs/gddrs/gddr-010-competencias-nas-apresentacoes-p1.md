# GDDR-010: Competências nas apresentações P1

- **Status:** Accepted
- **Recorded on:** 2026-11-17
- **Decision date:** 2026-11-17
- **Last updated:** 2026-11-17
- **Scope:** Comunicação de motivação, contribuição e competências nas apresentações P1 dos oito heróis H1–H8 na taverna.
- **Decision source:** decisão de Edney após entrevista, na sessão `sess-7d2e638ca0d5d7a4`, mensagem `VovuCLsMlkAZhYjZ`, em 2026-11-17T14:12:50.431575Z; autorização e conteúdo conferidos pela coordenação e transmitidos ao autor documental. Sem link público durável.
- **GDD:** [§14.1 — Comunicação das competências e contrato de P1](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#141-comunicação-das-competências-e-contrato-de-p1).

## Context

A preparação exige escolher pessoas para o grupo, mas o contrato anterior proibia nomear suas competências ao jogador. O dono definiu que a apresentação deve comunicar a motivação do herói e sua contribuição prática para essa escolha. O par de competências e suas definições já existem no GDD; o problema de comunicação não autoriza modificar a matriz.

## Decision

Cada P1 de H1–H8, pela opção Conversar na taverna, mostra por que o herói quer participar e o que pode oferecer. Nomeia exatamente as duas competências canônicas do herói, com seus nomes exatos destacados no texto, conforme as matrizes dos [§§9](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#9-matriz-mecânica-dos-heróis) e [18](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#18-heróis-e-conteúdo-de-personagem).

A situação descrita ou discutida demonstra a aplicação de cada competência segundo o [§8.2](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#82-competências-e-fronteiras). Inserir apenas os nomes não basta. Força é potência contra peso, resistência ou bloqueio; Conhecimento aplica estudo técnico, acadêmico, histórico ou arquitetônico. Navegar ou escolher terreno firme não demonstra Conhecimento por si só. Essa distinção não cria um incidente biográfico.

A exceção de nomeação vale somente para P1. Opções, descrições e resultados das armadilhas continuam sem nomes de competências e sem indicação de viabilidade ou executor. Cards e demais superfícies conservam seus limites. Pares, distribuição, definições, sucesso determinístico, formação, leitura, revelações e arquitetura de mapas permanecem inalterados. A decisão não reescreve P2/P3 nem muda quantitativos de falas ou caixas.

Este registro não decide referências regionais, não aprova prosa e não autoriza integração por si só. Autoria de cenas, localização, apresentação, implementação e validação continuam em escopos próprios.

## Alternatives considered

Não foi fornecida uma comparação formal de alternativas. O sigilo absoluto é a regra anterior parcialmente substituída, não uma alternativa com avaliação inventada neste registro.

## Rationale

A intenção expressa pelo dono é dar ao jogador motivação e contribuição compreensíveis para escolher o grupo. Associar nomes a situações coerentes com as definições torna explícito o que cada herói oferece; reconhecer a ação adequada nas armadilhas continua a cargo do jogador. Esse efeito é pretendido, não resultado de playtest.

## Consequences

As apresentações precisarão demonstrar as duas competências sem transformar a conversa em uma lista de rótulos ou sugerir um terceiro domínio. A revisão deve conferir clareza, fidelidade à matriz e relação entre ação e definição. A decisão pode orientar nova prosa, mas não altera os textos atualmente jogáveis. Integração, validação técnica, aceite editorial e eficácia da escolha permanecem pendentes.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [ADR-G001](../adrs/adr-g001-mapas-de-interacao-dos-herois.md#decisão) | Partially supersedes | Proibição de expor competências na Decisão 4 e preservação do sigilo na linha ADR-024 da tabela, somente em P1 H1–H8 | Autoria em mapas próprios, menus, transferências, composição, formação, persistência e demais limites; não restaura a identificação recitada já substituída em setembro |
| [ADR-024 histórica mantida](../adrs/historico/init-rpg-maker-mz/adr-024.md) | Partially supersedes | Sigilo de competências no corpo e na atualização de 14/09, somente em P1 | Hover/foco apenas destacam; menu, seleção, retirada e retorno sob ADR-G001; remoção do perfil recitado sob updated-narrative-copy; sigilo nas demais superfícies |
| [updated-narrative-copy / ADR-001](../../planos/tasks/updated-narrative-copy/adrs/adr-001-approved-copy-and-dialogue-boundary.md) | Partially supersedes | Preservação de hidden competencies na Decisão 2 e no item de supersessão da ADR-024, somente para a futura redação P1 | Fonte e aceite históricos do incremento, remoção da identificação recitada, nomes de falante, menu, bustos, formação, catálogo, sequência fatal e inscrições |

Os três predecessores recebem avisos recíprocos datados de substituição parcial: ADR-G001, a cópia mantida da ADR-024 e a ADR-001 de `updated-narrative-copy`. Seus corpos históricos, evidências e aceites anteriores permanecem intactos, incluindo o aceite de 2026-09-25/26. A prevalência nova está registrada aqui e no GDD; a manutenção desses links não reabre o conteúdo ou a verificação dos incrementos concluídos.

O [GDDR-009](gddr-009-piloto-narrativo-gorvak-bimbren.md) continua regendo a liberdade de quantidade apenas nas três cenas do piloto; este registro não amplia nem revoga esse recorte.

## Sources and evidence

- Decisão humana de 17/11/2026, identificada acima: contrato recebido após entrevista, sem nova deliberação pelo autor.
- GDD §§8.2, 9, 14.1 e 18: definições, pares e comunicação. A matriz não mudou.
- ADR-G001, cópia mantida da ADR-024 e ADR de updated-narrative-copy: cadeia do sigilo e das mudanças de consulta, com datas e aceites anteriores preservados.
- Esta entrega é documental. Nenhum P1 novo foi escrito ou integrado; não houve execução de runtime, teste de gameplay, playtest ou aceite humano da prosa decorrente da decisão.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-11-17 | Registrada como Accepted a comunicação explícita das duas competências em P1, com motivação e contribuição; substituição parcial do sigilo, sem mudança arquitetural | Decisão de Edney, mensagem VovuCLsMlkAZhYjZ, 2026-11-17T14:12:50.431575Z |
| 2026-11-17 | Concluída a reciprocidade com os três predecessores, acrescentando aviso e histórico na ADR de updated-narrative-copy sem alterar seu corpo original | Ampliação de ownership pela coordenação para registrar a mesma decisão humana, sem nova decisão de produto |
