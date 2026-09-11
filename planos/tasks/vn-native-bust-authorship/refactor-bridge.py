"""Materialized migration of the EventBridge visual ownership contract."""
from pathlib import Path

target = Path('rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js')
s = target.read_text()

def span(start, end, replacement):
    global s
    a = s.index(start)
    b = s.index(end, a)
    s = s[:a] + replacement + s[b:]

span(' * @param BustFocus\n', ' * @command CaptureContext\n', '')
span(' * @arg slots\n', ' * @command Present\n', '')
span(' * Ajuste o estilo global', ' * Guia:', ''' * Autore imagem, escala, posição, tom e foco nos eventos com VNPictureBusts.
 * O EventBridge restaura a composição ao retomar a conversa.
 * A restauração reaplica comandos visuais sem falas, escolhas ou ações da campanha.
 * Animações pontuais não se repetem; ciclos contínuos podem reiniciar.
 * Expressões nos parâmetros devem ser puras: serão avaliadas novamente na retomada.
''')
span('  const bustCommands = {', '  const visualFamily =', '''  function isNativeBustCommand(p) {
    return p.length === 4 && p[0] === 'VisuMZ_2_VNPictureBusts' && typeof p[1] === 'string' &&
      typeof p[2] === 'string' && p[3] && typeof p[3] === 'object' && !Array.isArray(p[3]);
  }
''')
s = s.replace('function parseEventCatalog(commonEvents, system, style = defaultFocusStyle)', 'function parseEventCatalog(commonEvents, system)')
s = s.replace('let previous = null, transition = null;', 'let previous = null;')
span("            if (!validBustCommand(p, system, slots)", "          } else if (c.code === 657)", "            if (!isNativeBustCommand(p)) fail();\n")
span('            if (p.length !== 1 || !Number.isInteger(p[0]) || p[0] < 0 || p[0] > 60 ||', '          } else if (pure &&', '            if (p.length !== 1 || !Number.isInteger(p[0]) || p[0] < 0) fail();\n')
s = s.replace('        if (![357, 657].includes(c.code)) transition = null;\n', '')
s = s.replace('    if (!violations.length) validateVisualEntries(commonEvents, locations, visualSources, issue);\n', '')
span('  // Track possible entry fields', '  function validateEnvelope', '''  function restorationCommands(commonEvents, parsed, id, box) {
    if (parsed.violations.length || !parsed.locations[id] || !Number.isInteger(box) || box < 0) throw new Error('Invalid visual restoration input');
    const commands = [];
    function append(list, base = 0) {
      for (const command of list) {
        if (command.code === 117) {
          append(commonEvents[command.parameters[0]].list, base + command.indent);
        } else if ([111, 411, 412].includes(command.code) ||
            (command.code === 357 && isNativeBustCommand(command.parameters))) {
          commands.push({ ...clone(command), indent: base + command.indent });
        }
      }
    }
    function section(sectionId, selectedBox) {
      for (const source of parsed.visualSources[sectionId] || []) section(source);
      const location = parsed.locations[sectionId];
      const list = commonEvents[location.commonEventId].list.slice(location.start, location.end);
      const texts = list.flatMap((command, index) => command.code === 101 ? [index] : []);
      const end = selectedBox === undefined ? list.length : texts[selectedBox];
      if (end === undefined) throw new Error(`Invalid visual text box: ${sectionId}.${selectedBox}`);
      append(list.slice(0, end), -location.indent);
    }
    section(id, box);
    commands.push({ code: 0, indent: 0, parameters: [] });
    return commands;
  }

''')
s = s.replace('parseFocusParameters, parseEventCatalog, deriveVisualComposition,', 'parseEventCatalog, restorationCommands,')
span('  const focusConfiguration =', '  let registry;', '')
s = s.replace(', focusStyle);', ');')
s = s.replace('    owner.initialTargets.clear();\n    owner.bases.clear();\n    owner.focusTargets.clear();\n', '')
s = s.replace('function beginConversation(key, slots)', 'function beginConversation(key)')
s = s.replace("conversation = { key, serial: ++conversationSerial, phase: 'preparing', slots: new Set(slots), initialTargets: new Map(), bases: new Map(), focusTargets: new Map() };", "conversation = { key, serial: ++conversationSerial, slots: new Set(), recovery: null };")
s = s.replace("    owner.phase = 'closed';\n", '')
span("    const allocation = hasOwn(args, 'slots')", "    if (args.operation === 'reconcile')", '''    if (keys !== 'kind,operation' || !['tavern', 'council'].includes(args.kind) ||
        !['begin', 'reconcile', 'end'].includes(args.operation)) return reportRejection('Conversation', commandError('invalid_target'));
    const key = args.kind === 'council' ? 'council' : `tavern.${$gameVariables.value(22)}`;
''')
s = s.replace('beginConversation(key, slots)', 'beginConversation(key)')
span('  const nativePluginCommand = Game_Interpreter.prototype.command357;', '  const nativeWait =', '''  const nativePluginCommand = Game_Interpreter.prototype.command357;
  let creatingBustFor = null;
  const showBustPicture = Game_Screen.prototype.showPicture;
  Game_Screen.prototype.showPicture = function(id, ...args) {
    showBustPicture.call(this, id, ...args);
    if (creatingBustFor) creatingBustFor.slots.add(id);
  };
  Game_Interpreter.prototype.command357 = function(params) {
    if (params[0] !== 'VisuMZ_2_VNPictureBusts' || !this._drylandDialogueOwner) return nativePluginCommand.call(this, params);
    if (!conversation || this._drylandDialogueOwner !== conversation.serial) return true;
    if (this._drylandRecovery && params[1] === 'Basic_PlayAniBust') return true;
    if (['Basic_EnterBust', 'Basic_GraphicChange'].includes(params[1]) && !ImageManager.loadPicture(params[3]['PictureName:str']).isReady()) return false;
    // The vendor decodes arguments in place. Keep editor commands reusable for restoration.
    const args = clone(params[3]);
    const immediate = this._drylandRecovery || global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (immediate && hasOwn(args, 'Duration:eval')) args['Duration:eval'] = '0';
    const previousOwner = creatingBustFor;
    creatingBustFor = conversation;
    let result;
    try {
      result = nativePluginCommand.call(this, [params[0], params[1], params[2], args]);
    } finally {
      creatingBustFor = previousOwner;
    }
    // An instantaneous native fade has no clock on which the vendor can auto-erase.
    if (Number(args['Duration:eval']) === 0 && [true, 'true'].includes(args['AutoErase:eval'])) {
      const ids = args['PictureID:arrayeval'];
      for (const id of Array.isArray(ids) ? ids : JSON.parse(ids)) $gameScreen.erasePicture(Number(id));
    }
    return result;
  };
''')
s = s.replace("    const owner = beginConversation(key, key.startsWith('tavern.') ? [60, 63] : slots);\n    for (const slot of owner.slots) $gameScreen.erasePicture(slot);", "    const owner = beginConversation(key);")
span('    // Final effects have no passage-completion authority.', '    recovery.setup(commands, root._eventId);', '''    // This interpreter contains native visual commands only and cannot complete passages.
    const recovery = new Game_Interpreter();
    const commands = restorationCommands($dataCommonEvents, registry, id, box);
''')
s = s.replace("        owner.phase = 'active';\n", '')
s = s.replace('if (conversation?.initialTargets.has(this._pictureId) || (conversation?.recovery && conversation.slots.has(this._pictureId)))', 'if (conversation?.recovery && conversation.slots.has(this._pictureId))')
s = s.replace('beginConversation(passageId, dialogueSlots(passageId))', 'beginConversation(passageId)')
span('  const executeCommand = Game_Interpreter.prototype.executeCommand;', '  function presentInvalidCampaign', '''  const executeCommand = Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand = function() {
    if ($gameTemp._drylandInvalid && !this._drylandErrorPresentation) return false;
    return executeCommand.call(this);
  };
''')
span('  function dialogueSlots(', '  /** Index native', r"""  function isBustDialogue(id) {
    return /^(profile|speech|selection|party_full|farewell|epilogue|opinion)\.H[1-8]$/.test(id) ||
      /^council\.(challenge|solo|confession|andira)$/.test(id) ||
      /^lover\.(physical|supernatural)\.(warning|second)$/.test(id);
  }

""")
s = s.replace('function presentationGraph(list, id, slots, ancestry', 'function presentationGraph(list, id, ancestry').replace('id, slots, [...ancestry', 'id, [...ancestry').replace('id, dialogueSlots(id), [], false, indent', 'id, [], false, indent').replace('new Set([60, 61, 62, 63, 64, 65]), [helper.commonEventId]', '[helper.commonEventId]')
s = s.replace('!dialogueSlots(source).size', '!isBustDialogue(source)').replace('dialogueSlots(passageId).size', 'isBustDialogue(passageId)').replace('const id = presentation.passageId, slots = dialogueSlots(id);\n    if (!slots.size) return;', 'const id = presentation.passageId;\n    if (!isBustDialogue(id)) return;')
assert 'focusStyle' not in s and 'initialTargets' not in s and 'validBustCommand' not in s
target.write_text(s)
print(target)
