# Eventos Comuns desapareciam do banco de dados do RPG Maker MZ

- **Data do incidente e da correção:** 15 de setembro de 2026.
- **Estado técnico:** corrigido e verificado no editor MZ do macOS; três testes de integração passaram.
- **Público:** programação, autoria de eventos e revisão de alterações do projeto.
- **Introdução:** commit `f411756`, integrado na `main` pelo PR #13, merge `5936afa`.
- **Persistência:** o PR #14, merge `8678d9d`, conservou a representação defeituosa.
- **Base investigada:** `19135ca`.
- **Escopo:** representação dos registros retirados de `CommonEvents.json` e validação da autoria pelo editor.

## Resumo

Ao abrir **Banco de Dados → Eventos Comuns**, o editor mostrava a lista completamente vazia e os campos desabilitados. O arquivo de dados continuava contendo 119 eventos. A migração anterior havia transferido conteúdo para mapas nativos e substituído os 232 registros retirados por `null`, preservando suas posições no array.

Essa representação passava pela leitura de JSON e era exigida pelo teste de inventário. Entretanto, no editor instalado, o banco deixava de apresentar os Eventos Comuns. A correção substituiu apenas esses 232 `null` por registros nativos vazios, com os mesmos IDs, sem nome, sem ativação automática e com apenas o comando terminal. O índice zero continuou `null`.

A investigação confirmou a recuperação primeiro em uma cópia descartável e depois no projeto original. O teste de inventário foi corrigido para detectar essa representação inválida e impedir chamadas a eventos retirados. Os corpos dos 119 eventos existentes foram preservados integralmente.

## Impacto e alcance

O impacto confirmado foi na **autoria**: a equipe não conseguia localizar, consultar ou editar os Eventos Comuns pela lista do banco de dados. Isso incluía CE004 — Configuração do jogo e os demais helpers ainda utilizados pela campanha. O sintoma aparentava perda de conteúdo, embora os registros sobreviventes continuassem no arquivo.

| Aspecto | Evidência e limite |
| --- | --- |
| Editor | Lista vazia reproduzida no MZ do macOS, inclusive após reabrir o projeto |
| Arquivo | 352 posições: índice zero reservado, 232 posições retiradas e 119 registros existentes |
| Conteúdo sobrevivente | Nenhuma perda observada; comparação estrutural confirmou sua preservação na correção |
| Campanha | Os testes selecionados passaram após a correção; não foi executada uma campanha completa |
| Saves | Não houve validação de migração de saves antigos nem demonstração de perda de saves |
| Outros ambientes | Editor Windows e outras versões do MZ não foram testados neste incidente |
| Pessoas e duração | Não foram medidos o número de pessoas afetadas nem o início exato da indisponibilidade percebida |

Não se atribui uma classificação formal de severidade: o projeto não aplicou uma escala de incidentes nesta investigação. A lista de autoria, porém, estava indisponível no ambiente reproduzido.

## Linha do tempo

Os horários de commits abaixo são os registrados pelo Git, em UTC−03:00. Eles identificam a evolução do código, não o instante em que alguém percebeu o problema.

| Momento | Evento | Relevância |
| --- | --- | --- |
| 14/09, 10:38:12 | `de4f976` — campanha por eventos nativos | O banco tinha 352 posições e somente o índice zero era `null` |
| 15/09, 00:06:10 | `f411756` — organização de conversas e cenas nos mapas | O banco passou a ter 233 `null`, incluindo o índice zero; CE001 foi retirado |
| 15/09, 00:08:02 | `27549e4` — formatação dos bancos | A representação de Eventos Comuns permaneceu igual à do commit anterior |
| 15/09, 03:17:25 | `65ef0a3` — enquadramento do Conselho e despedidas | Alterou comandos de apresentação, mantendo os mesmos 232 slots retirados como `null` |
| 15/09, 10:38:01 | Merge `5936afa`, PR #13 | Integração da migração que introduziu o defeito na `main` |
| 15/09, 12:27:22 | Merge `8678d9d`, PR #14 | O problema continuou presente depois do último PR apontado no relato |
| Investigação em 15/09 | Relato do usuário e abertura do editor | Lista vazia reproduzida; comparação do Git localizou a mudança anterior ao PR #14 |
| Investigação em 15/09 | Experimento em cópia descartável | Substituir apenas os slots por registros vazios restaurou a lista e o conteúdo de CE004 |
| Investigação em 15/09 | IT-047 atualizado sobre os dados defeituosos | Falha explícita em CE001, antes de corrigir o projeto |
| 15/09, 15:13:29–15:14:04 | Execução após a correção | IT-001, IT-047 e IT-004 passaram; os horários vêm dos registros canônicos |
| Após a correção | Reabertura do projeto original no editor | Lista restaurada e CE004 legível, sem salvar alterações pela interface |

O último PR era um ponto de partida útil para a busca, mas o diff entre ele e seu primeiro pai não introduziu os slots nulos. A origem está no PR #13. Não foi necessário reverter os ajustes de bustos do PR #14.

## Causa técnica

### Representação de um registro retirado

A migração preservou o tamanho do array e os IDs dos eventos restantes. O erro estava em como representava a posição desocupada:

```js
for (const id of retired) events[id] = null;
```

Esse padrão aparece em [implement-prologue-map.mjs](../../../planos/tasks/eventbridge-minimal-runtime/implement-prologue-map.mjs) e [implement-campaign-maps.mjs](../../../planos/tasks/eventbridge-minimal-runtime/implement-campaign-maps.mjs), além das migrações dos heróis. A migração do prólogo retirou CE001 e levou suas mensagens ao Map002.

O registro vazio que recuperou o banco no editor foi:

```json
{
    "id": 1,
    "name": "",
    "trigger": 0,
    "switchId": 1,
    "list": [
        { "code": 0, "indent": 0, "parameters": [] }
    ]
}
```

Cada posição recebe seu próprio `id`. A lista contém apenas o comando terminal, sem diálogo, regra ou chamada. Isso mantém um registro editável no banco, sem restaurar o conteúdo migrado. Esses registros são posições vazias da estrutura nativa, não conteúdo provisório nem placeholders de assets.

O array continua com 352 posições. Depois da correção, são 351 registros indexados e um `null` reservado no índice zero. Os slots nulos de **eventos de mapa** não foram alterados: pertencem a outra estrutura, e esta reprodução não justifica generalizar a substituição para todos os arquivos JSON.

### O que foi demonstrado sobre o editor

O teste controlado manteve os eventos existentes e trocou somente a representação das posições retiradas. O editor passou de lista vazia para lista populada, com CE004 acessível. A mesma recuperação foi observada após aplicar a mudança no projeto original.

Isso sustenta a relação causal entre os slots nulos e o defeito observado. **O código interno do editor não foi inspecionado.** Não se afirma que o MZ “para no primeiro `null`”, nem que todas as versões tenham o mesmo algoritmo. Também não se isolou cada um dos 232 slots para determinar qual combinação mínima provoca o sintoma. A correção normaliza todos os registros retirados para a representação nativa que foi validada.

### Por que JSON válido não garantiu autoria válida

O motor JavaScript e o editor são consumidores distintos dos mesmos dados. No [motor local](<../../../rpg-maker/The Dryland Drowned/js/rmmz_managers.js>), `DataManager.onXhrLoad` lê o arquivo com `JSON.parse`; a extração de metadados ignora entradas nulas. Isso permite que verificações de carregamento e consultas aos eventos restantes avancem sem provar que o editor consegue montar sua lista.

A validade sintática de JSON, a preservação de IDs e a ausência de chamadas pendentes são necessárias, mas não cobrem sozinhas o contrato de autoria pelo MZ.

## Por que a regressão passou pelas verificações

### 1. A especificação transformou uma hipótese técnica em requisito

MA-008 orientava substituir os Common Events deslocados por `null`, sem renumerar, e vedava substitutos vazios. O GDD também mencionava preservar slots nulos. A implementação seguiu essa orientação, embora ela não estivesse sustentada por uma verificação do banco no editor.

O objetivo legítimo era eliminar corpos duplicados depois de migrar seus consumidores. A escolha de codificação do slot acabou tratada como parte desse objetivo. Preservar um registro nativo vazio satisfaz a remoção do conteúdo sem comprometer a lista de autoria.

### 2. O teste reforçava a representação defeituosa

O IT-047 continha uma asserção equivalente a:

```js
assert.equal(events[id], null);
```

Ela comprovava que a migração havia produzido o formato pedido pela spec. Não verificava se o formato atendia ao editor. Como implementação e expectativa compartilhavam a mesma premissa incorreta, o teste podia passar enquanto a equipe ficava sem acesso à lista.

O defeito não foi resolvido relaxando o teste. A expectativa foi corrigida com base na reprodução real e recebeu uma proteção adicional: uma chamada nativa não pode apontar para um ID retirado, mesmo que agora exista ali um objeto vazio.

### 3. O limite das evidências não impediu a conclusão técnica

A verificação anterior registrava MAV-011/012 como PASS e destacava os 232 slots nulos como resultado correto. Já a entrega agregada mantinha pareceres humanos pendentes, incluindo autoria. Esse bloqueio era uma limitação legítima, mas não tornava a representação do banco tecnicamente correta.

Abrir a lista e ler um evento é uma verificação objetiva e curta, distinta do julgamento humano sobre a qualidade do fluxo de autoria. A evidência anterior não cobria essa regressão no candidato investigado. Não há base para afirmar que uma determinada execução de CI falhou ou foi ignorada, nem para concluir que o editor nunca foi aberto em etapas anteriores.

### Síntese causal

```text
Objetivo: retirar conteúdo duplicado após migrar cenas para mapas
    ↓
Spec escolhe null como representação obrigatória dos slots retirados
    ↓
Scripts produzem essa representação; IT-047 passa a exigi-la
    ↓
JSON e referências passam, sem provar a lista do editor
    ↓
Banco de Eventos Comuns aparece vazio para a equipe
```

A falha atravessou especificação, transformação de dados e teste. A análise não depende de atribuir culpa a uma pessoa; corrigir somente o JSON deixaria a orientação e a expectativa de teste prontas para reintroduzir o problema.

## Investigação e correção

1. Abrir o projeto real no RPG Maker MZ e observar a lista vazia.
2. Reabrir o projeto para confirmar que o sintoma persistia.
3. Comparar `CommonEvents.json` em `de4f976`, `f411756`, `27549e4`, nos merges #13/#14 e na base investigada.
4. Constatar que os 119 registros sobreviventes existiam e que os 232 slots nulos precediam o último PR.
5. Preparar uma cópia descartável, com dados e plugins copiados, para testar a substituição dos slots sem alterar o projeto original.
6. Abrir essa cópia no MZ e confirmar a lista e CE004.
7. Atualizar IT-047 e obter a falha de regressão sobre os dados ainda defeituosos.
8. Executar a [transformação de correção](../../../planos/tasks/eventbridge-minimal-runtime/fix-common-event-editor-slots.mjs) no projeto; executá-la novamente e obter zero alterações.
9. Validar os testes selecionados e a equivalência estrutural dos registros existentes.
10. Reabrir o projeto original e confirmar a lista e o conteúdo de CE004 no editor.

A transformação declara seu arquivo de destino, verifica a representação de entrada, preserva IDs, grava JSON com a formatação existente e relê o resultado. Não renumera o banco. Os scripts antigos de migração permanecem como registros históricos; não são um procedimento de manutenção a ser reaplicado sobre a versão atual.

Também foram corrigidas a orientação do [GDD canônico](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md) e a interpretação de MA-008 na [spec](../../../planos/tasks/eventbridge-minimal-runtime/spec.md). O texto histórico foi contextualizado, sem atribuir retroativamente a correção aos resultados anteriores.

## Evidências de validação

Ambiente observado: macOS com RPG Maker MZ instalado; testes de integração nativa no Chrome e Node **22.23.2**. A versão exata do aplicativo editor não foi registrada. A porta 18738 foi usada pelos testes, com contexto próprio.

| Verificação | Resultado | O que demonstra |
| --- | --- | --- |
| Editor antes | Lista vazia, inclusive após reabrir | Reprodução do relato |
| Cópia corrigida | Lista restaurada e CE004 legível | Experimento controlado da correção |
| IT-047 atualizado, antes | FAIL: `CE1 must remain a native database record readable by the editor` | A nova expectativa detecta os dados defeituosos |
| IT-001, depois | PASS | Entrada nativa, plugins, prólogo e hierarquia de mapas |
| IT-047, depois | PASS | Registros, slots retirados, inventário e referências nativas cobertos pelo teste |
| IT-004, depois | PASS | Execução do prólogo e conclusão de leitura exatamente uma vez |
| Comparação estrutural | 232 slots substituídos; 119 corpos preservados | Escopo semântico da alteração |
| Segunda execução do script | Zero alterações | Idempotência no candidato corrigido |
| Editor original corrigido | Lista restaurada, CE004 selecionado e legível | Recuperação na fonte de autoria usada pela equipe |
| `git diff --check` | PASS | Ausência de erros de whitespace no diff |

Comando executado depois da correção:

```sh
DRYLAND_QA_PORT=18738 node --test --test-name-pattern='IT-047|IT-001|IT-004' rpg-maker/tests/campaign.test.mjs
```

Resultado: **3 testes passaram, 0 falharam**, em aproximadamente 34,4 segundos. A execução anterior de IT-047 levou aproximadamente 6,4 segundos e terminou com código de saída 1, pela asserção de CE001.

O [registro de evidências](evidencias.json) preserva hashes, horários e o alcance da verificação. Os logs selecionados acompanham este documento: [falha antes](before.txt) e [passes depois](after.txt). Somente espaços finais de linhas foram removidos de `before.txt`; o registro conserva os hashes original e publicado. Os registros canônicos completos e o acervo `.artifacts/common-event-editor-slots/` permanecem locais e não são necessários para compreender o diagnóstico.

As imagens do editor foram observadas durante a sessão, mas **não foram arquivadas como PNG**. Este documento não apresenta uma captura posterior como se fosse evidência anterior ao reparo.

## Prevenção e trabalho restante

| Medida | Estado neste incidente | Critério de conclusão |
| --- | --- | --- |
| Recuperar os slots retirados como registros vazios | Implementada | Lista acessível no editor e diff restrito à representação dos slots |
| Corrigir a expectativa do IT-047 | Implementada | Falha nos dados anteriores e passa nos corrigidos |
| Impedir chamadas nativas a IDs retirados | Implementada no IT-047 | Objetos vazios não tornam válidas chamadas a conteúdo removido |
| Corrigir GDD/spec e preservar a ressalva histórica | Implementada | A orientação vigente não manda reintroduzir `null` nesses registros |
| Registrar causa, limites e evidências transportáveis | Implementada neste postmortem | Diagnóstico compreensível a partir do repositório |
| Incluir inspeção curta no editor ao revisar migrações de banco | Recomendada; não automatizada neste incidente | Abrir o candidato final, consultar a lista e ler registros no início e no fim do banco |
| Validar edição, gravação e reabertura em cópia descartável | Recomendada; não executada neste incidente | Um campo editado no MZ persiste sem perda dos demais registros |
| Repetir a inspeção no editor Windows | Pendente | Lista e conteúdo legíveis no ambiente Windows da equipe |

As recomendações não receberam responsáveis, prazos ou cards de Trello nesta entrega. Uma futura programação de trabalho deve seguir o fluxo do quadro. Elas não são apresentadas como medidas já adotadas ou testes já executados.

Para próximas revisões, a pergunta útil é: **qual consumidor real ainda pode falhar mesmo que o arquivo seja JSON válido e o teste passe?** Em mudanças de autoria, o editor precisa fazer parte da resposta. Já a legibilidade artística, o ritmo e o conforto de uso continuam exigindo seus próprios pareceres.

## Limites do encerramento

A correção recupera o acesso aos Eventos Comuns no ambiente reproduzido. Não certifica uma campanha completa, compatibilidade de saves anteriores, comportamento de todas as versões do editor ou o aceite humano agregado da spec EventBridge. Os testes e a revisão estática mantêm seus alcances específicos.

O [registro de verificação da entrega](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#correção-da-lista-de-eventos-comuns-no-editor--2026-09-15) é a fonte do estado técnico desta correção. Este postmortem explica o incidente e não cria um segundo controle de tarefas.

**Material para devlog:** demonstrar Banco de Dados → Eventos Comuns → CE004 — Configuração do jogo, mostrando a lista recuperada e os comandos acessíveis. Uma nova captura pode ilustrar o resultado, identificada com sua própria data; não substitui a evidência visual não arquivada do diagnóstico.
