# Integração narrativa aprovada — ciclo de QA

Contrato: [spec](../../../planos/tasks/approved-narrative-dialogue-staging/spec.md), [sensores e S-01–11](../../../planos/tasks/approved-narrative-dialogue-staging/verification.md#runtime-scenarios), [lotes A–F](../../../planos/tasks/approved-narrative-dialogue-staging/task-10.md#resumable-lots). Operador: Codex. Personas orientam perspectivas; não são revisores humanos fictícios.

## Entrada e prontidão

O candidato integra os cinco PRs fixados pela spec. Tasks01–09 concluídas; execução independente e revisão disponíveis encerradas. O [relatório final](../reports/2026-09-18-approved-narrative-dialogue-staging.md) registra134 casos canônicos com resultado válido pela composição do agregado e retestes, onze lotes dirigidos e os bloqueios de prisão visual, audição e captura no editor. Este guia preserva as receitas; a task10 permanece BLOCKED.

Por ADR-G004/G006, a preparação documental de 09 pode ocorrer enquanto termina a verificação de 08. Execução dirigida só começa com os resultados focados aplicáveis verdes e uma cópia congelada do candidato. O agregado conserva seu próprio resultado; falha nele é investigada e invalida os lotes afetados, sem transformar uma execução dirigida em substituto do teste.

Ambiente: Node 22+, Python 3 e Chrome instalado; executor em `.agents/skills/rpg-maker-mz-qa-execution/scripts/`, Playwright/FFmpeg já instalados. Referências de viewport: 1280×720 normal e 1920×1080 reduzido, DPR 1; registrar `Graphics.width/height`, sem zoom/gamepad/mobile. Uma aba por contexto isolado. Nunca usar perfil pessoal.

Para abertura manual, ler `docs/_memory/local-game-run.md` e executar `npm start` na raiz. Para execução dirigida isolada, reutilizar o adapter existente `rpg-maker/qa/directed-adapter.mjs`, que serve somente a cópia preparada com o servidor nativo de testes. Essa especialização preserva jogo/origem/entrada e evita escrever saves pessoais. Antes de cada execução, identificar o ocupante de 18726 com `lsof -nP -iTCP:18726 -sTCP:LISTEN`; não encerrar processo desconhecido. O agregado usa18726; a cópia dirigida usa `DRYLAND_QA_PORT=18727`, com origem mantida em todas as ramificações/Continues. Essa separação permite coleta sobre o mesmo candidato congelado sem disputa de porta; observar eventual contenção antes de interpretar timeout.

## Matriz de execução

| Execução | Entrada e passos | Cenários / lotes | Observação independente |
| --- | --- | --- | --- |
| physical-first | Novo jogo, arquivo 1 vazio; seis unidades do prólogo; visitar/conversar/selecionar/remover oito heróis, respostas de grupo cheio; Igreja → Parque → Vilarejo; reunir; créditos naturais; reabrir/Continue | S-01/02/04/05/07/08/10/11; A/B/C/E/F | Rheed velho sozinho sobre preto, tavernas e som distintos; recompensas antes das duas narrações; Conselho na ordem aprovada; epílogos elegíveis; mesmo final salvo |
| supernatural-first | Importar arquivo 1 genuíno da primeira execução antes do boot; Novo jogo no arquivo 2; silenciar quatro volumes, restaurar 40; repetir matriz com mouse/teclado em 1920 reduzido; Parque → Igreja → Vilarejo; destruir; pular créditos | Mesmos S/lotes, ordem e perfil opostos | Os dois arquivos coexistem; ações e leitura de 2 não reescrevem 1; restauração de HIDE e opções preserva trecho/campanha |
| branch-destroy | Cópia imutável do archive final-choice da primeira campanha; Continue no mesmo arquivo; ler qualquer narração não salva novamente; destruir em filho independente | S-07/08/10; C/E | Mesmo payload pai da escolha reunir; nenhum save editado; repetição de texto não salvo é permitida, medalhão não é concedido duas vezes |
| bad | Novo contexto e arquivo vazio; escolher abordagens sem competência quando disponíveis, sacrificar por menu; retornar com reservas até oito mortes; ler perda total/créditos | S-04/06/08; B/D | Oitava morte prevalece; não inventar testemunhas/epílogos, morte e desfecho comprometidos uma vez |
| Fixtures nativas | Reusar casos canônicos abaixo; setup sintético é declarado e não conta como campanha jogada | S-03/06/09; D | Todas as 30 respostas, oito epílogos/páginas e combinações legais do Conselho; sequência/seen sem conclusão antecipada |

O caso materializado é [task-10-directed.mjs](../../../planos/tasks/approved-narrative-dialogue-staging/task-10-directed.mjs). As escolhas são entradas públicas; inspeção de campanha, pictures, texto, áudio e saves é somente leitura. Nenhum seed, ator, rota ou histórico é injetado.

## Evidência técnica retida

| Obrigação | Caso canônico / produtor | Limite de reúso |
| --- | --- | --- |
| Prólogо e defaults | IT-004/035/047/071, UT-057, IT-028/029; task01 | Dados do prólogo, provider/defaults, áudio e fixtures equivalentes |
| Heróis e despedidas | IT-081/012; task02 | Oito heróis, menus e normal/reduzido; imagens exigem inspeção própria |
| 30 sucessos | IT-082/083/084 e oráculo PR18; task03 | Todos os encontros/abordagens; B3–B8 e falhas preservados |
| Peças/fechamentos | UT-032, IT-052/053; task04 | Duas ordens, reward antes da narração, próximo input após Continue |
| Conselho | UT-033, IT-054/061; task05 | Elenco elegível e slots legais, narrador com pictures de cena preservadas durante HIDE, Irati por último |
| Finais/epílogos | UT-034–036, IT-048/073; tasks06/07 | Três desfechos, oito ilustrações integrais e todas as caixas, ambos perfis |
| Continue/autoria | IT-014/062/067; task08 | Dois arquivos, payload/índice, leitura parcial, arquivo correto e texto nativamente editável |

Comandos da raiz: `node --test --test-name-pattern='<IDs registrados>' rpg-maker/tests/campaign.test.mjs` para correção afetada; `node --test rpg-maker/tests/*.test.mjs` uma vez no agregado. Logs focados em `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/`; capturas de fixtures mantêm o caminho canônico `docs/qa/evidence/init-rpg-maker-mz/`. Não renomear evidência de outro candidato como atual. Recibos incluem dependências; não editar árvores de testes/runtime durante o agregado.

## Comandos dirigidos e saves

Materializar um request v1 por variante, com `spec`, `consumer: task-10`, `case`, `adapter`, `scenario` e claims apontando ao heading `Runtime scenarios` do verification. Antes de preparar cópia, executar:

```sh
node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project . --request <request.json>
```

O adapter não oferece receita completa de equivalência; o caminho ordinário prepara/coleta e registra essa limitação. Variáveis: `DRYLAND_QA_STAGING=physical-first|supernatural-first|branch-destroy|bad`, `DRYLAND_QA_MOTION=reduce`, `DRYLAND_QA_FILE=2`, `DRYLAND_QA_CREDITS=natural|keyboard|mouse`, `DRYLAND_QA_SAVE_ARCHIVE=<archive real>`. O request e o log registram seus valores efetivos. Saídas novas ficam em `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-10/`.

Capturar opening/result/reward-before-closure/Council-medallion/ending somente após payload e índice confirmados; `captureNativeSave` valida isso. O archive final-choice contém o último checkpoint real, possivelmente no Conselho: não fabricar save da tela de escolha. Filhos importam esse pai antes do boot e navegam Continue. Registrar hashes do pai/filhos e leitura reiniciada legitimamente. Para S-10 reabrir e executar o próximo input em cada fronteira; o caso principal cobre final, casos de retomada dos archives cobrem as demais. Os dois arquivos também têm prova nativa IT-014 separada da dirigida.

## Inspeção, som e devlog

Inspecionar todos os consumidores alterados: prólogo, oito heróis e respostas alternativas, despedidas, limiares, duas amantes, ambos fechamentos, Conselho/narrador/Andirá/opiniões, três finais e oito epílogos. HIDE revela os quatro limites de cada fonte sem bustos. Conferir primeira/intermediária/última caixa dos textos longos e o indicador de avanço. Entradas/foco/saídas precisam de vídeo, além de stills e geometria.

Gravar vídeo do contexto e WAV estéreo do master WebAudio em segmentos por contexto, incluindo abertura/silêncio e mudanças reais dos quatro volumes. Conferir buffers com IT-029 e ouvir os arquivos efetivos; registrar ouvinte/data/método e resultado por trecho. Se não houver sensor capaz de ouvir, V-006 continua pendente apesar dos WAVs. Fonte/prosa/arte já aprovadas não são reabertas; conforto/gosto fora dos critérios confirmados é acompanhamento opcional.

Devlog: selecionar Rheed velho/preto → jovem/taverna, um fechamento e epílogo inteiro com HIDE; conservar som da transição. Abrir o evento correspondente no editor MZ para a captura de autoria; IT-067 não substitui imagem do editor. Publicação não está autorizada.

## Falhas, invalidação e encerramento

Preservar primeira falha, prefixo causal, input, console e payload. Corrigir no dono da task e repetir só lotes afetados. Após duas tentativas sem informação nova, registrar a hipótese refutável seguinte e continuar lotes independentes. Mudanças de regras/event lists invalidam saves; arte/defaults invalidam renders; áudio invalida escuta; transport/input invalida sensores dependentes. Ausência de sensor não é PASS.

O bug de [prisões ausentes](../bugs/BUG-20260911-lovers-prison-not-visible.md) foi reconfirmado nas capturas IT-052 desta execução. O enquadramento compartilhado corrigido em ciclos posteriores não aprova este candidato por herança. Clipping do indicador orienta inspeção de texto longo; memorial aceito/deferido não é reaberto.

O executor fecha aba/contexto/Chrome e servidor em `finally`; confirmar porta/processos liberados e preservar saídas, archives e perfis preexistentes. Remover apenas fixture temporária própria depois de reter hashes/proveniência. Relatório, tasks e verification distinguem coleta, inspeção e aceite humano. Nenhum commit, card ou mensagem remota.
