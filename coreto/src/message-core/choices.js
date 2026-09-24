function installMessageChoices() {
    const interpreter = Game_Interpreter.prototype;
    interpreter.addContinuousShowChoices = function() {
        // Event data is shared by parallel interpreters; edits belong to this execution.
        this._list = this._list.map(command => ({...command, parameters: JSON.parse(JSON.stringify(command.parameters))}));
        const root = this._index, indent = this._indent;
        let branches = 0;
        for (let cursor = root+1; cursor < this._list.length; cursor++) {
            const command = this._list[cursor];
            if (command.indent !== indent) continue;
            if (command.code === 402) command.parameters[0] = branches++;
            if (command.code !== 404) continue;
            const next = this._list[cursor+1];
            if (next?.code !== 102 || next.indent !== indent) break;
            const target = this._list[root].parameters;
            if (next.parameters[2] >= 0) target[2] = next.parameters[2]+branches;
            if (next.parameters[1] >= 0) target[1] = next.parameters[1]+branches;
            else if (next.parameters[1] === -2) target[1] = -2;
            target[0].push(...next.parameters[0]);
            this._list.splice(cursor, 2);
            cursor--;
        }
        return this._list[root].parameters;
    };
    const setupChoices = interpreter.setupChoices;
    interpreter.setupChoices = function() {
        delete this._branch[this._indent];
        setupChoices.call(this, this.addContinuousShowChoices());
        $gameMessage.setupShuffleChoices();
    };
    const cancelBranch = interpreter.command403;
    interpreter.command403 = function(...args) {
        if (!Object.hasOwn(this._branch, this._indent)) {
            this.skipBranch();
            return true;
        }
        return cancelBranch.apply(this, args);
    };
    const message = Game_Message.prototype;
    const setChoices = message.setChoices;
    message.setChoices = function(...args) {
        this._scriptCall = true;
        this._choiceIndexArray = undefined;
        this._maxShuffleChoices = undefined;
        return setChoices.apply(this, args);
    };
    message.setupShuffleChoices = function() {
        this._scriptCall = false;
        this._choiceIndexArray = this._choices.map((_, index) => index);
        this._maxShuffleChoices = this._choices.length;
        let shuffle = false;
        this._choices = this._choices.map(text => text.replace(/<SHUFFLE(?:: (VAR )?(\d+))?>/gi, (_, variable, limit) => {
            shuffle = true;
            if (limit !== undefined) this._maxShuffleChoices = Math.min(this._maxShuffleChoices, variable ? $gameVariables.value(Number(limit)) || 1 : Number(limit));
            return '';
        }));
        if (shuffle) {
            for (let i = this._choiceIndexArray.length-1; i > 0; i--) {
                const j = Math.randomInt(i+1);
                [this._choiceIndexArray[i], this._choiceIndexArray[j]] = [this._choiceIndexArray[j], this._choiceIndexArray[i]];
            }
            if (this.choiceCancelType() !== -2) this._choiceCancelType = -1;
        }
    };
    message.choiceIndexArray = function() { if (!this._choiceIndexArray) this.setupShuffleChoices(); return this._choiceIndexArray; };
    message.maxShuffleChoices = function() { if (this._maxShuffleChoices === undefined) this.setupShuffleChoices(); return this._maxShuffleChoices; };

    const base = Window_Base.prototype;
    base.isChoiceWindow = function() { return this instanceof Window_ChoiceList || this.constructor.name === 'Window_MessageLog'; };
    base.convertShowChoiceEscapeCodes = function(text) {
        if (!this.isChoiceWindow()) return text;
        return text.replace(/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi, '')
            .replace(/<(?:SHOW|HIDE|DISABLE|ENABLE) (?:SWITCH|SWITCHES): (.*?)>/gi, '')
            .replace(/<(?:SHOW|HIDE|DISABLE|ENABLE) (?:ALL|ANY) (?:SWITCH|SWITCHES): (.*?)>/gi, '')
            .replace(/<CHOICE (?:WIDTH|INDENT): (\d+)>/gi, '')
            .replace(/<(?:BGCOLOR|BG COLOR): (.*?)>/gi, '')
            .replace(/<(?:FG|BG) ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>/gi, '')
            .replace(/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE) *(.*?): (.*?)>/gi, '');
    };
    function passesGates(text, positive, negative, switchNames) {
        if (new RegExp(`<${negative}>`, 'i').test(text)) return false;
        if (new RegExp(`<${positive}>`, 'i').test(text)) return true;
        for (const [word, any, rejectOn] of [[positive,false,false],[positive,true,false],[negative,false,true],[negative,true,true]]) {
            const match = text.match(new RegExp(`<${word} ${any ? 'ANY ' : '(?:ALL )?'}(?:${switchNames}): (.*?)>`, 'i'));
            if (!match) continue;
            const states = match[1].split(',').map(id => $gameSwitches.value(Number(id) || 0));
            const enabled = any ? states.some(Boolean) : states.every(Boolean);
            if (enabled === rejectOn) return false;
        }
        return true;
    }
    const window = Window_ChoiceList.prototype;
    window.isChoiceVisible = function(text) { return passesGates(text, 'SHOW', 'HIDE', 'SW|SWITCH|SWITCHES'); };
    window.isChoiceEnabled = function(text) { return passesGates(text, 'ENABLE', 'DISABLE', 'SWITCH|SWITCHES'); };
    window.convertChoiceMacros = function(text) { return this.convertTextMacros(text); };
    window.parseChoiceText = function(text) { return text.replace(/<(?:BR|LINEBREAK)>/gi, '\n').replace(/<LINE\x1bWrapBreak[0]BREAK>/gi, '\n'); };
    window.makeCommandListScriptCall = function() {
        $gameMessage.choices().forEach((raw, index) => {
            const text = this.convertChoiceMacros(raw);
            if (this.isChoiceVisible(text)) this.addCommand(this.parseChoiceText(text), 'choice', this.isChoiceEnabled(text), index);
        });
    };
    window.makeCommandListShuffle = function() {
        const indices = $gameMessage.choiceIndexArray();
        const limit = $gameMessage.maxShuffleChoices();
        for (const index of indices) {
            if (this._list.length >= limit) break;
            const raw = $gameMessage.choices()[index];
            if (raw === undefined) continue;
            const text = this.convertChoiceMacros(raw);
            if (this.isChoiceVisible(text)) this.addCommand(this.parseChoiceText(text), 'choice', this.isChoiceEnabled(text), index);
        }
    };
    window.clearChoiceHelpDescriptions = function() {
        this._choiceHelpDescriptions = {};
        if (this._helpWindow) { this._helpWindow.clear(); this._helpWindow.hide(); }
    };
    window.applyChoiceHelpDescriptions = function() {
        const pattern = /<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;
        this._list.forEach((item, index) => {
            const match = item.name.match(pattern);
            this._choiceHelpDescriptions[index] = match ? match[1].trim() : '';
            if (match) item.name = item.name.replace(pattern, '').trim();
        });
    };
    window.makeCommandList = function() {
        if ($gameMessage._scriptCall) this.makeCommandListScriptCall();
        else this.makeCommandListShuffle();
        this.clearChoiceHelpDescriptions();
        this.applyChoiceHelpDescriptions();
    };
    window.updateHelp = function() {
        if (!this._helpWindow) return;
        const description = this._choiceHelpDescriptions?.[this.index()] || '';
        this._helpWindow.setText(description);
        if (description) this._helpWindow.show();
        else this._helpWindow.hide();
    };
    window.processFailsafeChoice = function() {
        if (this._list.some(item => item.enabled)) return;
        this.deactivate(); this.close(); $gameMessage._choices = [];
        if (this._messageWindow.isOpen()) this._messageWindow.startPause();
    };
    window.start = function() { this.refresh(); this.selectDefault(); this.open(); this.activate(); this.processFailsafeChoice(); };
    window.selectDefault = function() {
        const original = $gameMessage.choiceDefaultType();
        const visible = this._list.findIndex(item => item.ext === original);
        this.select(original < 0 ? -1 : visible >= 0 ? visible : this._list.findIndex(item => item.enabled));
    };
    window.callOkHandler = function() {
        $gameMessage.onChoice(this.currentExt());
        this._messageWindow.terminateMessage();
        this.close();
        this._helpWindow?.clear();
    };
    const cancel = window.callCancelHandler;
    window.callCancelHandler = function() {
        const result = cancel.apply(this, arguments);
        this._helpWindow?.clear();
        return result;
    };
    const close = window.close;
    window.close = function(...args) { this._helpWindow?.hide(); return close.apply(this, args); };
    window.itemHeight = function() { return $gameSystem.getChoiceListLineHeight()+8; };
    window.maxCols = function() { return $gameSystem.getChoiceListMaxColumns(); };
    window.maxLines = function() {
        const y = this._messageWindow?.y || 0, height = this._messageWindow?.height || 0;
        return y < Graphics.boxHeight/2 && y+height > Graphics.boxHeight/2 ? 4 : $gameSystem.getChoiceListMaxRows();
    };
    window.numVisibleRows = function() {
        let count = $gameMessage.choices().filter(text => this.isChoiceVisible(this.convertChoiceMacros(text))).length;
        if (!$gameMessage._scriptCall) count = Math.min(count, $gameMessage.maxShuffleChoices());
        return Math.max(1, Math.min(Math.ceil(count/this.maxCols()), this.maxLines()));
    };
    window.getStartingChoiceWidth = function() {
        let width = $gameSystem.getChoiceListMinChoiceWidth();
        for (const text of $gameMessage.choices()) for (const match of text.matchAll(/<CHOICE WIDTH: (\d+)>/gi)) width = Math.max(width, Number(match[1]));
        return Math.max(1, width);
    };
    window.getChoiceIndent = function(text) { return Number([...text.matchAll(/<(?:CHOICE|CHOICE |)INDENT: (\d+)>/gi)].at(-1)?.[1]) || 0; };
    window.maxChoiceWidth = function() {
        return this._list.reduce((width, item) => Math.max(width, Math.ceil(this.textSizeEx(item.name).width+this.getChoiceIndent(item.name))+this.itemPadding()*2), this.getStartingChoiceWidth());
    };
    const nativeWindowX = window.windowX;
    window.windowX = function() {
        return this._messageWindow ? this.messageCoreWindowX() : nativeWindowX.call(this);
    };
    window.messageCoreWindowX = function() {
        const position = $gameMessage.choicePositionType();
        if (position === 1) return (Graphics.boxWidth-this.windowWidth())/2;
        return this._messageWindow.x + (position === 2 ? this._messageWindow.width-this.windowWidth() : 0);
    };
    window.windowWidth = function() { return Math.min((this.maxChoiceWidth()+this.colSpacing())*this.maxCols()+this.padding*2, Graphics.width); };
    window.choiceAlignText = function() { const align = $gameSystem.getChoiceListTextAlign(); return align === 'default' ? '' : `<${align}>`; };
    window.drawItemContents = function(index) {
        const rect = this.itemRectWithPadding(index), text = this.choiceAlignText()+this.commandName(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        const height = this.textSizeEx(text).height;
        this.drawTextEx(text, rect.x+this.getChoiceIndent(text), Math.max(rect.y, rect.y+Math.round((rect.height-height)/2)), rect.width);
    };
    window.drawItem = function(index) { this.drawItemContents(index); };
    window.addChoiceDistance = function() {
        const distance = $gameSystem.getChoiceMessageDistance() || 0, message = this._messageWindow;
        const name = message._nameBoxWindow;
        const nameHeight = name && name.openness > 0 && name.width > 0 ? name.height : 0;
        if (distance < 0 && (message.isClosed() || message.isClosing())) this.y = Math.round((Graphics.boxHeight-this.height)/2);
        else if (message.y >= Graphics.boxHeight/2) this.y = distance >= 0 ? this.y-distance : Math.floor((message.y-this.height-nameHeight)/2);
        else if (distance >= 0) this.y += distance;
        else this.y += Math.floor((Graphics.boxHeight-message.y-message.height-nameHeight-this.height)/2)+nameHeight;
    };
    const placement = window.updatePlacement;
    window.updatePlacement = function() { placement.call(this); this.addChoiceDistance(); this.clampPlacementPosition(); };
    window.refresh = function() {
        this.clearCommandList(); this.makeCommandList();
        if (this._messageWindow) { this.updatePlacement(); this.placeCancelButton(); }
        this.createContents(); this.updateBackground(); this.refreshDimmerBitmap();
        Window_Selectable.prototype.refresh.call(this);
    };
    const scene = Scene_Message.prototype;
    scene.choiceListHelpWindowRect = function() { return new Rectangle(0, 0, Graphics.boxWidth, this.calcWindowHeight(2, false)); };
    scene.createChoiceListHelpWindow = function() {
        const help = new Window_Help(this.choiceListHelpWindowRect());
        help.hide(); this._choiceListWindow.setHelpWindow(help); this._messageWindow.setChoiceListHelpWindow(help);
        this.addWindow(help); this._choiceListHelpWindow = help;
    };
    Window_Message.prototype.setChoiceListHelpWindow = function(help) { this._choiceListHelpWindow = help; };
    const create = scene.createAllWindows;
    scene.createAllWindows = function(...args) { create.apply(this, args); this.createChoiceListHelpWindow(); };
    messageApi.registerCommand('ChoiceWindowDistance', function(args) { $gameSystem.setChoiceMessageDistance(args.Distance); });
    messageApi.registerCommand('ChoiceWindowProperties', function(args) {
        for (const [field, suffix] of [['LineHeight','LineHeight'],['MaxRows','MaxRows'],['MaxCols','MaxColumns']]) {
            if (args[field] > 0) $gameSystem[`setChoiceList${suffix}`](args[field]);
        }
        $gameSystem.setChoiceListMinChoiceWidth(args.MinWidth);
        $gameSystem.setChoiceListTextAlign(args.TextAlign);
    });
}
installMessageChoices();
