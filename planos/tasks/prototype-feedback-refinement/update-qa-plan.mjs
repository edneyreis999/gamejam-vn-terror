import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const root='planos/tasks/prototype-feedback-refinement/';
for(let i=1;i<=11;i++)assert.match(readFileSync(root+`task-${String(i).padStart(2,'0')}.md`,'utf8'),/status: completed/);
const scopes={
 'FOR-mz-formation-roster':'S-001/002/003; A/B/C/E. Título e ciência fresca, oito visitas, seleção/remoção/grupo cheio, Seguir→mapa→Partir, Quadro somente com mortos e gravação do arquivo atual.',
 'ENC-mz-encounter-sacrifice-retreat':'S-002; B. Vítima não primeira, despedida antes da consequência nomeada, morte/checkpoint únicos, recuos voluntário/automático e ausência de mortos antigos e recentes.',
 'CAM-mz-discovery-closing':'S-003/004; C/D. Duas ordens/fechamentos, transição após todo o texto, painéis Reunir/Destruir, cemitério íntegro e epílogos elegíveis narrados por Rheed.',
 'LOC-mz-session-recovery-export':'S-001/003/004; A/C/D. Saves próprios, ciência desmarcada no Continue, mesmo arquivo, introdução salva antes/depois e leitura não salva, último save válido e ramificações de pai imutável. Exportação/NW.js não integra este incremento.',
 'ACC-mz-hide-keyboard-qa':'S-001–004; A–E. Alvos integrais, teclado/ponteiro, foco, HIDE/Opções, 1280 normal e 1920 reduzido; sem zoom nativo/gamepad.',
 'ART-mz-visual-audio-runtime':'S-001–004/T-007; A–E. Famílias de retratos e caixas, textos completos, sete nomes/oito túmulos, ausência/retorno em vídeo, Town1/People2 nos epílogos sem aplauso e sem vazamento nos créditos.',
 'ART-mz-human-approval':'E. Pareceres contra frames/clips/áudio concretos: UI, arte/enquadramento, narrativa/transcrição, ritmo e escuta. D-025 não é aceite deste candidato.'
};
const section='## Prototype feedback refinement — 2026-09-25';
for(const [id,scope] of Object.entries(scopes)){
 const path='docs/qa/scenarios/'+id+'.md',source=readFileSync(path,'utf8');assert.ok(!source.includes(section));
 writeFileSync(path,source+'\n\n'+section+'\n\n**Planejado; execução dirigida e aceite deste candidato pendentes.** '+scope+' [Guia](../guides/prototype-feedback-refinement.md) · [charter](../charters/CH-prototype-feedback-refinement.md). Os vereditos históricos acima permanecem ligados às suas fontes. A task 13 registra os resultados por lote e mantém os três bugs reportados até o reteste dirigido.\n');
}
for(const name of ['J-mz-complete-campaign','J-mz-recovery-export','J-mz-qa-accessibility','J-mz-creative-review']){
 const path='docs/qa/journeys/'+name+'.md',source=readFileSync(path,'utf8');assert.ok(!source.includes(section));
 writeFileSync(path,source+'\n\n'+section+'\n\nA jornada preserva seu histórico e recebe os lotes aplicáveis A–E do [guia incremental](../guides/prototype-feedback-refinement.md). Novo jogo/Continuar passam por ciência fresca; a preparação usa Seguir, mapa e Partir; Quadro lista mortos; epílogos usam Rheed velho. Execução e pareceres ainda pendentes neste incremento; sensores técnicos têm recibos separados.\n');
}
const index='docs/qa/README.md';let source=readFileSync(index,'utf8');
const at=source.indexOf('## Ciclo corrente');assert.ok(at>=0);
source=source.slice(0,at)+'## Ciclo corrente — prototype-feedback-refinement\n\n[Guia](guides/prototype-feedback-refinement.md) · [charter](charters/CH-prototype-feedback-refinement.md) · [verificação](../../planos/tasks/prototype-feedback-refinement/verification.md). Tarefas técnicas 01–11 concluídas; QA dirigido/Editor/aceite final planejados nos lotes A–E da task 13. Nenhum PASS humano é herdado.\n\n'+source.slice(at).replace('## Ciclo corrente — integração narrativa aprovada','## Ciclo anterior — integração narrativa aprovada');
writeFileSync(index,source);
const guide='docs/qa/guides/prototype-feedback-refinement.md';
writeFileSync(guide,readFileSync(guide,'utf8').replace('Estado do preparo: tarefas 01–10 técnicas concluídas; tarefa 11 em validação. Execução dirigida depende do resultado técnico aplicável e do inventário congelado.','Estado do preparo: tarefas 01–11 técnicas concluídas, recibos reconciliados nas tasks. Execução dirigida começa pelo inventário congelado.'));
const charter='docs/qa/charters/CH-prototype-feedback-refinement.md';
writeFileSync(charter,readFileSync(charter,'utf8').replace('Estado: planejamento em preparação enquanto a tarefa 11 termina seus sensores técnicos.','Estado: planejamento concluído; execução pela tarefa 13.'));
let task=readFileSync(root+'task-12.md','utf8').replace('status: pending','status: completed').replaceAll('- [ ]','- [x]');
task=task.replace('Pending. No QA cycle has been planned or run by this task yet.','QA planning completed 2026-09-25 with rpg-maker-mz-qa-report. The incremental guide/charter maps all V portions and T sensors to S-001–004/lots A–E, records candidate/own-save/origin prerequisites, public entry, native Editor round-trip, 1280/1920 variants, current technical receipts and their invalidation rules. Seven existing scenarios and four journeys gained this increment without changing historical verdicts. The three existing bugs remain assigned to directed retest. G006 keeps distinct route closings, both voluntary endings, total loss and a multi-death return in both modes; repetitive hero matrices use their explicit technical representatives without claiming a new played campaign. User judgments remain against concrete future material. No game launch, remote assignment or publication was performed by this planning task.');
writeFileSync(root+'task-12.md',task);
writeFileSync(root+'tasks.md',readFileSync(root+'tasks.md','utf8').replace('task 12 is in progress','task 13 is in progress').replace('QA-PLAN | pending','QA-PLAN | completed').replace('QA-PLAN | in_progress','QA-PLAN | completed').replace('T-001; T-007 | pending','T-001; T-007 | in_progress').replace('[task-12.md](task-12.md) is active','[task-13.md](task-13.md) is active'));
writeFileSync(root+'task-13.md',readFileSync(root+'task-13.md','utf8').replace('status: pending','status: in_progress').replace('Pending. No implementation, QA session, test result, screenshot, audio recording or delivery acceptance is claimed by this task file.','Active 2026-09-25. Tasks 01–11 technical receipts and task 12 planning are ready. The current guide/charter owns selected A–E journeys. Candidate freeze, integrated selection, public-input campaigns and native Editor round-trip are next; no directed or human PASS is claimed yet.'));
writeFileSync(root+'verification.md',readFileSync(root+'verification.md','utf8')+'\n\nTask 12 QA-PLAN completed 2026-09-25: [guide](../../../docs/qa/guides/prototype-feedback-refinement.md) and [charter](../../../docs/qa/charters/CH-prototype-feedback-refinement.md) map every remaining portion, entry, variant, provenance and evidence destination. Existing scenario/journey histories are preserved. Task 13 is active; live/editor/human statuses remain pending.\n');
