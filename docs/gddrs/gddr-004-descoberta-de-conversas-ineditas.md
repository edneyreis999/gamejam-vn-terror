# GDDR-004: Descoberta de conversas inéditas

- **Status:** Accepted
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Indicadores de assuntos disponíveis não lidos e persistência da leitura.
- **Decision source:** discussão com o usuário em 15–16/10/2026, decisões consolidadas e plano de registro aprovado em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Fogueiras e vínculos](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-novidades).

## Context

Após conversar com um herói, o jogador pode presumir que não há novos assuntos. As mortes liberam conversas sobre companheiros e cada fogueira oferece conteúdo próprio. A descoberta desse conteúdo não deve depender de abrir repetidamente todos os menus.

## Decision

### Sinalização em dois níveis

- Na taverna e na fogueira, um indicador discreto no herói clicável informa que existe algum assunto atualmente disponível ainda não lido. Deve ser distinguível do destaque de integrante selecionado e perceptível na navegação por teclado.
- No menu, uma etiqueta visual separada e estática `NOVO!` / `NEW!` identifica cada assunto inédito. Não concatenar a etiqueta ao texto do botão.
- No menu da taverna, preservar `Conversar` / `Talk` e acrescentar assuntos `Sobre <herói>` / `About <hero>` após a perda, para sobreviventes com vínculo previsto. Cada companheiro é um assunto separado.
- Após a leitura, o assunto sobre o morto continua acessível, sem a etiqueta de novidade. O indicador externo permanece enquanto houver outro assunto disponível não lido.
- O marcador sinaliza conteúdo acessível naquele momento, não conversas futuras.

### Leitura e persistência

Concluir a conversa consome sua novidade; apenas focar o herói ou abrir seu menu não consome. O histórico acompanha o save da campanha e não reinicia ao mudar o idioma. Uma campanha nova começa com histórico próprio. O checkpoint de gravação e a migração dos saves anteriores serão definidos na spec, sem inferir autosave em cada caixa de texto.

### Referência visual

Usar o recurso `NEW! Labels` de `VisuMZ_1_ItemsEquipsCore.js` como referência de etiqueta independente, com tipografia e posicionamento próprios. O usuário escolheu a versão estática, sem o fade opcional dessa referência. A consulta ao plugin não autoriza sua ativação, modificação ou inclusão como dependência: o recurso documentado destina-se a itens, não garante suporte direto a escolhas de diálogo. A aparência exata do indicador externo e da etiqueta será especificada e inspecionada no jogo.

## Alternatives considered

- Acrescentar “— Novo” ao rótulo do botão: substituído, a pedido do usuário, por uma etiqueta separada.
- Exclamação piscante ou contador de pendências: evitados para não apresentar o luto como tarefa a cumprir.
- Consumir novidade ao abrir o menu: não corresponde à leitura da conversa.

## Rationale

O indicador permite descobrir conteúdo novo sem consultar todos os heróis por tentativa. A etiqueta no assunto explica onde está a novidade. Persistir a leitura preserva essa informação entre sessões; apresentar a marca separadamente mantém o nome do assunto legível.

## Consequences

A integração precisa distinguir assunto disponível, assunto lido e integrante selecionado, com persistência coerente. Compatibilidade com saves anteriores e forma de sinalizar a leitura inicial ainda precisam de especificação. A aparência requer inspeção visual; regras de consumo e persistência são comportamento verificável.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-001](gddr-001-fogueiras-e-ritmo-da-expedicao.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-002](gddr-002-conversas-e-vinculos-dos-herois.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-003](gddr-003-reconhecimento-das-perdas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |

## Sources and evidence

- [Spec incremental](../../planos/tasks/campfire-hero-bonds/spec.md) e [proposta narrativa completa](../../planos/tasks/campfire-hero-bonds/campfire-hero-bonds.narrativa.md), redigidas em 16/10/2026. O design adotado permanece; texto, projeto técnico e evidência de implementação aguardam seus próprios aceites.

- [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): regras da campanha, fichas subordinadas, oito pares e apresentação vigente; o registro atualiza o design, não certifica o runtime.
- Discussão de 15–16/10/2026 e autorização de 16/10/2026: fonte das decisões e motivações atribuídas ao usuário.
- Inspeção local durante a discussão: cenário `Dryland_Camp.png` e mapa Acampamento (Map045) existentes, mapa sem eventos. Isso demonstra material disponível, não a feature implementada.
- `rpg-maker/The Dryland Drowned/js/plugins/VisuMZ_1_ItemsEquipsCore.js`: cópia local fornecida pelo usuário, seção `Plugin Parameters: NEW! Labels`; referência de itens, ausente da configuração ativa na inspeção. O arquivo está fora do versionamento nesta gravação e não é acrescentado por esta alteração documental.
- Textos finais, spec incremental, integração e verificação do novo fluxo permanecem pendentes. Nenhum teste ou aceite emocional é declarado por este registro.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registro como Accepted das decisões consolidadas; implementação e redação final pendentes. | Discussão de 15–16/10/2026 e autorização do plano em 16/10/2026. |
| 2026-10-16 | Acrescentados os documentos da spec e da proposta narrativa como material de revisão. | Autoria da spec solicitada pelo usuário. |
