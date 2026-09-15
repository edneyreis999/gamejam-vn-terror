# Integração das skills de QA — Gamejam

O jogo fica em `rpg-maker/The Dryland Drowned/`. A integração usa
`rpg-maker/qa/directed-adapter.mjs`; o contrato comum está em
[project-integration.md](../../.agents/skills/rpg-maker-mz-qa-execution/references/project-integration.md).
As regras de campanha e os produtores de checkpoints continuam em
[eventbridge-minimal-runtime.md](../../docs/qa/guides/eventbridge-minimal-runtime.md).

- Preparo: `prepare({project,output,archivePath})` cria exatamente `output` quando
  fornecido; sem ele, preserva a preparação temporária usada pelos comandos locais.
- Saves: `storageFixture` conserva o archive inventariado e sua origem exata.
  A captura declara `scenario.storage.expectedRef`, retorna o payload real em
  `state` e registra o artefato em checkpoints e storageExports. O helper local
  `native-save-archive.mjs` valida payload, índice, campanha e proveniência.
- Reabertura: os casos locais usam `reopenPage()` para manter o mesmo contexto.
  Um cenário que exija recriação completa deve usar `reopenContext()` explicitamente.
- Áudio: os casos existentes declaram `audioFormat:'webm'`; o executor comum também
  oferece WAV. O formato e o artefato registrado fazem parte do contrato do caso.
- Movimento reduzido e touch permanecem disponíveis. Verificações genéricas de
  geometria/raster e a rotina de teste de zoom nativo foram retiradas.

## Recibos e caminho ordinário

A entrada `request-evidence.mjs` está instalada com os mesmos módulos comuns.
Esta integração não declara `describeRequest`/`describePrepared`: os checkpoints
dependentes de história ainda não têm receita completa de equivalência para reúso.
Por isso pedidos seguem o preparo/QA ordinário, sem falso reaproveitamento e sem
exigir reparo da otimização. O suporte ao `output` explícito permite esse caminho.
Para habilitar reúso posteriormente, mapear também origem/porta, archive, produtor,
variantes de ambiente e dependências transitivas; a simples igualdade do jogo não basta.

## Contexto documental e distribuição

As ADRs deste projeto ficam em `docs/adrs/`. A skill de extração de ADRs deve seguir
esse diretório; a skill raio X depende de invocação humana e não é executada ao
concluir tasks. Uma instalação Coreto substitui skills e outros arquivos do ambiente,
sem reconciliar alterações locais; não usar o instalador integral como sincronização
restrita. Esta entrega permite continuar a manutenção nos dois projetos.
