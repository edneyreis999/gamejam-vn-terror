// Editorial comments for native MZ calls. Run with --check to verify coverage only.
import assert from 'node:assert/strict';
import { readdir, readFile, writeFile } from 'node:fs/promises';
const data = new URL('../../../rpg-maker/The Dryland Drowned/data/', import.meta.url);
const plugins = new Set(['Dryland_EventBridge', 'Dryland_Presentation']);
const checkOnly = process.argv.includes('--check');
const queryDescriptions = {
 phase: 'a etapa atual da campanha', selectedDungeonId: 'a rota escolhida para partir',
 dungeonId: 'a rota da expedição atual', endingId: 'o desfecho definido pela campanha',
 position: 'a posição atual na expedição', passageId: 'a identidade da passagem atual',
 readingScene: 'a identidade da cena em leitura', readingIndex: 'a posição da passagem na leitura (começa em zero)',
 hasReading: 'se existe uma leitura de campanha em andamento',
 passageRead: 'se a passagem indicada já foi lida nesta campanha',
 heroAlive: 'se o herói está vivo', heroSelected: 'se o herói está selecionado no grupo',
 heroDead: 'se o herói morreu', heroName: 'o nome público do herói',
 automaticFormation: 'se a formação do grupo é automática', selectedCount: 'quantos heróis estão selecionados',
 requiredCount: 'quantos integrantes são necessários para partir', canDepart: 'se as regras permitem partir',
 canRetreat: 'se as regras permitem recuar', routeName: 'o nome público da rota',
 routeProgress: 'quantos encontros da rota foram atravessados', routeTotal: 'o total de encontros da rota',
 routeStatus: 'o estado de disponibilidade da rota', deadCount: 'quantos heróis morreram',
 deathRoute: 'a rota em que o herói morreu', deathEncounter: 'o encontro em que o herói morreu',
 encounterName: 'o nome público do encontro', encounterId: 'a identidade do encontro atual',
 candidateCount: 'quantos heróis podem ser escolhidos para o sacrifício',
 candidate: 'o herói na posição indicada da lista de candidatos ao sacrifício',
 climaxHero: 'o herói na posição indicada do grupo que chegou ao clímax'
};
const actionDescriptions = {
 BEGIN: 'Inicia a campanha e sorteia sua configuração inicial.',
 TOGGLE_HERO: 'Solicita incluir ou retirar o herói do grupo, respeitando as regras de formação.',
 SELECT_DESTINATION: 'Solicita escolher a rota da próxima expedição.',
 DEPART: 'Solicita iniciar a expedição com o grupo e a rota selecionados.',
 ENTER_DUNGEON: 'Solicita entrar no próximo encontro da expedição.',
 CHOOSE_APPROACH: 'Solicita aplicar a abordagem escolhida; as regras calculam sua consequência.',
 SELECT_VICTIM: 'Solicita sacrificar o herói escolhido; as regras registram a morte e sua consequência.',
 REQUEST_RETREAT: 'Solicita abrir a confirmação de recuo da expedição.',
 CANCEL_RETREAT: 'Cancela a solicitação de recuo e recupera a etapa anterior.',
 CONFIRM_RETREAT: 'Confirma o recuo e aplica o retorno definido pelas regras da campanha.',
 CHOOSE_ENDING: 'Solicita o desfecho escolhido para o Medalhão.'
};
const reasons = {
 new_campaign: 'início da campanha', departure: 'partida', reveal: 'entrada no encontro',
 approach: 'abordagem escolhida', sacrifice: 'sacrifício', consequence: 'consequência concluída',
 reward: 'recompensa', council: 'Conselho', ending: 'desfecho'
};
const identity = (args, variableKey, valueKey) => Number(args[variableKey]) > 0
 ? ` Usa a identidade contida na variável ${args[variableKey]}.`
 : args[valueKey] ? ` Identidade: ${args[valueKey]}.` : '';
function describe(command) {
 const [plugin, name, , args] = command.parameters;
 if (plugin === 'Dryland_EventBridge') {
  switch (name) {
   case 'ConfigureHero': case 'ConfigureRoute': case 'ConfigureEncounter':
    return `Define o nome público de ${args.id}: “${args.name}”. O plugin lê este cadastro ao carregar o banco de dados.`;
   case 'Query': {
    assert.ok(queryDescriptions[args.kind], `Consulta sem descrição: ${args.kind}`);
    const outputs = [];
    if (Number(args.variable) > 0) outputs.push(`variável ${args.variable}`);
    if (Number(args.switch) > 0) outputs.push(`switch ${args.switch} (ligado = verdadeiro)`);
    assert.ok(outputs.length, 'Consulta sem destino de saída');
    const index = ['candidate', 'climaxHero'].includes(args.kind) ? ` Posição: ${args.index || 0} (começa em zero).` : '';
    return `Consulta ${queryDescriptions[args.kind]}.${identity(args, 'identityVariable', 'id')}${index} Grava em ${outputs.join(' e ')}; preserva os fatos da campanha.`;
   }
   case 'CaptureContext':
    return 'Guarda a etapa de progresso e a passagem atuais neste evento. As próximas ações usam essa referência para rejeitar escolhas ou conclusões que ficaram desatualizadas.';
   case 'ReadingComplete':
    return 'Conclui a passagem capturada, se a campanha ainda estiver no ponto esperado. As regras atualizam o progresso e indicam o próximo salvamento na variável 46.';
   case 'Action':
    assert.ok(actionDescriptions[args.action], `Ação sem descrição: ${args.action}`);
    return `${actionDescriptions[args.action]}${identity(args, 'valueVariable', 'value')} As regras validam a ação; a variável ${args.resultVariable || 24} recebe “ok” ou o motivo da recusa.`;
   case 'Checkpoint':
    assert.ok(reasons[args.reason], `Checkpoint sem descrição: ${args.reason}`);
    return `Valida o ponto de salvamento: ${reasons[args.reason]}. Se necessário, solicita o autosave ao SaveCore no arquivo atual e espera a gravação; evita repetir o mesmo ponto já salvo.`;
  }
 }
 if (plugin === 'Dryland_Presentation') {
  switch (name) {
   case 'ObservationBegin':
    return `Identifica a leitura ${args.unit || 'pelo ID deste evento comum'} e consulta seu histórico. Reinicia os controles e permite FAST somente se essa unidade já foi concluída.`;
   case 'ObservationComplete':
    return 'Marca esta unidade como lida no histórico de leitura e encerra seus controles. A releitura poderá usar FAST; o comando não salva o arquivo por conta própria.';
   case 'ReadingPermission':
    return `Consulta o switch ${args.switch}: ligado permite FAST nesta leitura, desligado bloqueia. Reinicia os modos de avanço; FAST depende da escolha do jogador.`;
   case 'ReadingEnd':
    return 'Encerra os controles desta leitura e desliga os modos de avanço. A conclusão da passagem da campanha fica a cargo do EventBridge.';
   case 'MotionPreference':
    return `Consulta a preferência do sistema/navegador por movimento reduzido. Grava verdadeiro ou falso na variável ${args.variable} para o evento escolher a duração dos efeitos.`;
   case 'ChoiceFocus':
    return `Prepara o foco do próximo menu (${args.key}). ${args.remember === 'true' ? 'Restaura a última opção focada desse grupo, se ainda disponível.' : 'Usa o foco inicial definido pelas escolhas nativas.'} ${args.horizontal === 'true' ? 'Permite navegar também pelas setas esquerda/direita.' : 'Mantém a navegação nativa das escolhas.'}`;
   case 'BindInterfacePicture':
    return `Identifica a imagem ${args.picture} como interface: “${args.name}”. Ela acompanha o HIDE; ocultá-la preserva sua opacidade e posição autoradas.`;
   case 'BindScrollSkip':
    return `Vincula a imagem ${args.picture} ao salto da rolagem: clique nela ou use a tecla de ${args.key === 'cancel' ? 'cancelar' : args.key}. O atalho funciona enquanto a imagem estiver visível e houver texto rolando.`;
   case 'ConsumeInput':
    return 'Consome a confirmação atual e exige soltar o botão ou a tecla antes da próxima confirmação. Isso impede que o mesmo gesto avance duas interfaces.';
   case 'InterfaceVisibility':
    return `${args.hidden === 'true' ? 'Registra a interface como oculta e bloqueia navegação nas escolhas escondidas.' : 'Registra a interface como visível e reaplica a visibilidade das escolhas.'} Consome o gesto atual para evitar uma confirmação involuntária.`;
   case 'ArmEffect':
    return `Marca o efeito “${args.key}” como pendente apenas nesta sessão. O evento poderá consumi-lo uma vez para apresentar a ausência do herói.`;
   case 'TakeEffect':
    return `Consulta e consome o efeito pendente “${args.key}”. Grava na variável ${args.variable} se ele estava marcado; a próxima consulta só será positiva se o efeito for armado novamente.`;
  }
 }
 throw Error(`Comando sem descrição: ${plugin}.${name}`);
}
function comment(command) {
 const lines = [];
 for (const word of describe(command).split(' ')) {
  if (!lines.length || lines.at(-1).length + word.length + 1 > 78) lines.push(word);
  else lines[lines.length - 1] += ` ${word}`;
 }
 return lines.map((line, i) => ({ code: i ? 408 : 108, indent: command.indent, parameters: [line] }));
}
const target = c => c?.code === 357 && plugins.has(c.parameters[0]);
function lists(document, name) {
 if (name === 'CommonEvents.json') return document.filter(Boolean).map(e => e.list);
 if (name === 'Troops.json') return document.filter(Boolean).flatMap(e => e.pages.map(p => p.list));
 return document.events.filter(Boolean).flatMap(e => e.pages.map(p => p.list));
}
const changes = []; let calls = 0; let added = 0;
for (const name of (await readdir(data)).filter(n => /^(CommonEvents|Troops|Map\d{3})\.json$/.test(n)).sort()) {
 const url = new URL(name, data), source = await readFile(url, 'utf8'), document = JSON.parse(source);
 const before = structuredClone(document); let inserted = 0;
 for (const list of lists(document, name)) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
   const c = list[i];
   if (target(c)) {
    calls++;
    const block = comment(c);
    if (JSON.stringify(list.slice(Math.max(0, i - block.length), i)) !== JSON.stringify(block)) {
     assert.ok(!checkOnly, `${name}: falta comentário para ${c.parameters[0]}.${c.parameters[1]}`);
     result.push(...block); inserted++; added++;
    }
   }
   result.push(c);
  }
  list.splice(0, list.length, ...result);
 }
 if (!inserted) continue;
 // Every executable record, including plugin annotations, keeps its exact order/payload.
 const withoutComments = value => Array.isArray(value)
  ? value.filter(v => ![108, 408].includes(v?.code)).map(withoutComments)
  : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withoutComments(v)])) : value;
 assert.deepEqual(withoutComments(document), withoutComments(before));
 const styles = [undefined, 2, 4].filter(indent => JSON.stringify(before, null, indent) === source.trimEnd());
 assert.equal(styles.length, 1, `${name}: formato de origem não reconhecido`);
 const output = JSON.stringify(document, null, styles[0]) + (source.endsWith('\n') ? '\n' : '');
 assert.deepEqual(JSON.parse(output), document);
 changes.push({ name, url, output, inserted });
}
assert.ok(calls > 0, 'Nenhuma chamada Dryland encontrada');
for (const { url, output } of changes) await writeFile(url, output);
console.log(JSON.stringify({ calls, commentsAdded: added, filesChanged: changes.map(({ name, inserted }) => ({ name, comments: inserted })) }, null, 2));
