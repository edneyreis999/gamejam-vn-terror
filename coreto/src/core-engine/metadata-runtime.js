function installMetadataOperations() {
    const owners = new WeakMap();
    const active = new Set();
    const terminal = new Set(['success', 'failure', 'unknown']);
    const waitMode = 'coretoMetadata';

    function detach(record) {
        record.attached = false;
        record.controller.abort();
        if (record.interpreter._waitMode === waitMode) record.interpreter.setWaitMode('');
        owners.delete(record.interpreter);
        active.delete(record);
    }
    function detachScene(scene) {
        for (const record of active) if (record.scene === scene) detach(record);
    }
    function showFeedback(text) {
        const popup = SceneManager._scene?._textPopupWindow;
        if (!popup) return;
        const width = Graphics.width - 2 * (popup.itemPadding() + $gameSystem.windowPadding());
        const lines = [];
        for (const paragraph of text.split('\n')) {
            let line = '';
            for (const word of paragraph.split(' ')) {
                const next = line ? `${line} ${word}` : word;
                if (line && popup.textSizeEx(next).width > width) {
                    lines.push(line);
                    line = '';
                }
                if (popup.textSizeEx(word).width > width) {
                    for (const character of word) {
                        if (line && popup.textSizeEx(line + character).width > width) {
                            lines.push(line);
                            line = '';
                        }
                        line += character;
                    }
                } else line = line ? `${line} ${word}` : word;
            }
            lines.push(line);
        }
        $textPopup(lines.join('\n'));
    }
    function feedback(record, text) {
        if (record.attached && SceneManager._scene === record.scene) showFeedback(text);
    }
    function session() {
        if (!$gameTemp.isPlaytest()) throw new MetadataError('METADATA_PLAYTEST_ONLY', 'Metadata commands require playtest mode.');
        const value = globalThis.CoretoMetadataSession;
        const endpoint = typeof value?.endpoint === 'string' ? /^(\/(?:[A-Za-z0-9_-]+\/)*)__coreto\/metadata\/write$/.exec(value.endpoint) : null;
        if (!value || value.schemaVersion !== 1 || !endpoint || value.receiptEndpoint !== endpoint[1] + '__coreto/metadata/receipt' ||
            !/^[a-f0-9]{64}$/.test(value.token) || !Number.isInteger(value.timeoutMs) || value.timeoutMs < 1 || value.timeoutMs > 30000) {
            throw new MetadataError('METADATA_SERVICE_REQUIRED', 'Start the local Coreto playtest server described in coreto/README.md and open its playtest URL.');
        }
        return value;
    }
    async function request(record, url, options = {}) {
        const controller = new AbortController();
        const cancel = () => controller.abort(new MetadataError('METADATA_OPERATION_CANCELLED', 'The originating event or scene has ended.'));
        record.controller.signal.addEventListener('abort', cancel, {once: true});
        if (record.controller.signal.aborted) cancel();
        const timer = setTimeout(() => controller.abort(new MetadataError('METADATA_TRANSPORT_TIMEOUT', 'The metadata service did not respond within the transport limit.')), record.session.timeoutMs);
        try {
            const response = await fetch(url, {...options, signal: controller.signal, cache: 'no-store'});
            // Consume the body before releasing the deadline: headers alone do not complete a read.
            const text = await response.text();
            return {response, text};
        } catch (error) {
            if (controller.signal.aborted) throw controller.signal.reason;
            throw error;
        } finally {
            clearTimeout(timer);
            record.controller.signal.removeEventListener('abort', cancel);
        }
    }
    async function readData(record, name) {
        const {response, text} = await request(record, `data/${name}`);
        if (!response.ok) throw new MetadataError('METADATA_READ_FAILED', `Could not read ${name} (HTTP ${response.status}).`);
        const hash = response.headers.get('X-Coreto-Content-SHA256');
        if (!/^[a-f0-9]{64}$/.test(hash ?? '')) throw new MetadataError('METADATA_SOURCE_HASH_REQUIRED', `The development service did not identify ${name}.`);
        record.sources[name] = hash;
        try { return JSON.parse(text); }
        catch { throw new MetadataError('METADATA_INVALID_DATA', `${name} is not valid JSON.`); }
    }
    async function collect(record) {
        const data = {};
        const load = async name => { data[name] = await readData(record, name); };
        if (record.type === 'ExportAllMapText') {
            await Promise.all(['CommonEvents.json', 'MapInfos.json'].map(load));
            const maps = metadataDatabase(data['MapInfos.json'], 'MapInfos');
            await Promise.all(maps.map(info => load(`Map${String(info.id).padStart(3, '0')}.json`)));
        } else if (record.type === 'ExportCurMapText') {
            await Promise.all(['CommonEvents.json', `Map${String(record.context.id).padStart(3, '0')}.json`].map(load));
        } else await Promise.all(['CommonEvents.json', 'Troops.json'].map(load));
        return extractMetadataText({type: record.type, context: record.context, data});
    }
    async function post(record, endpoint, document) {
        const {response, text} = await request(record, endpoint, {
            method: 'POST', headers: {'Content-Type': 'application/json', 'X-Coreto-Metadata-Token': record.session.token}, body: JSON.stringify(document)
        });
        let result;
        try { result = JSON.parse(text); }
        catch { throw new MetadataError('METADATA_INVALID_RECEIPT', 'The service response was not a metadata receipt.'); }
        if (!response.ok && result.status === 'failure' && result.error?.code && !result.requestId) return {...result, requestId: record.requestId};
        if (result.requestId !== record.requestId || !['writing', ...terminal].includes(result.status)) {
            throw new MetadataError('METADATA_INVALID_RECEIPT', result.error?.message || `The service rejected the request (HTTP ${response.status}).`);
        }
        return result;
    }
    async function run(record, supplied) {
        let sent = false;
        try {
            feedback(record, supplied ? 'Preparando coordenadas...' : 'Extraindo textos...');
            const content = supplied ?? await collect(record);
            if (!record.attached) return;
            const document = {schemaVersion: 1, requestId: record.requestId, type: record.type, context: record.context, content, sources: record.sources};
            validateMetadataDocument(document);
            const bytes = new TextEncoder().encode(typeof content === 'string' ? content : JSON.stringify(content, null, 2) + '\n');
            const digest = await crypto.subtle.digest('SHA-256', bytes);
            const expectedHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
            if (!record.attached) return;
            record.status = 'writing';
            feedback(record, 'Gravando metadados...');
            sent = true;
            let result;
            try { result = await post(record, record.session.endpoint, document); }
            catch (error) {
                if (!record.attached) return;
                try { result = await post(record, record.session.receiptEndpoint, {requestId: record.requestId}); }
                catch { throw new MetadataError('METADATA_WRITE_UNCONFIRMED', `The write was not confirmed. Inspect the destination or query receipt ${record.requestId} before retrying.`); }
            }
            if (result.status === 'writing') throw new MetadataError('METADATA_WRITE_UNCONFIRMED', `The service is still processing receipt ${record.requestId}; no success has been confirmed.`);
            record.status = result.status;
            if (result.status === 'success') {
                if (result.relativePath !== `.RPGMakerMZ-metadata/${metadataFilename(document)}` || result.bytes !== bytes.length || result.sha256 !== expectedHash) throw new MetadataError('METADATA_INVALID_RECEIPT', 'The success receipt does not identify the expected file and content.');
                feedback(record, `Arquivo salvo: ${result.relativePath}`);
            } else feedback(record, `Gravação ${result.status === 'unknown' ? 'não confirmada' : 'falhou'}: ${result.error?.message || 'consulte o recibo.'}`);
        } catch (error) {
            record.status = sent ? 'unknown' : 'failure';
            if (record.attached) {
                feedback(record, `Exportação ${sent ? 'não confirmada' : 'falhou'}: ${error.message}`);
                console.error(`[${error.code || 'METADATA_TRANSPORT_FAILED'}] ${error.message}`);
            }
        } finally {
            record.controller.abort();
            active.delete(record);
        }
    }
    function begin(interpreter, type, context, supplied) {
        let capability, requestId;
        try {
            capability = session();
            if (typeof globalThis.crypto?.randomUUID !== 'function' || typeof crypto.subtle?.digest !== 'function') throw new MetadataError('METADATA_BROWSER_CAPABILITY', 'This browser cannot identify and verify a metadata request.');
            requestId = crypto.randomUUID();
        } catch (error) {
            showFeedback(`Exportação falhou: ${error.message}`);
            console.error(`[${error.code || 'METADATA_SERVICE_REQUIRED'}] ${error.message}`);
            return Promise.resolve();
        }
        const previous = owners.get(interpreter);
        if (previous) detach(previous);
        const record = {interpreter, scene: SceneManager._scene, type, context, requestId, session: capability, status: 'collecting', sources: {}, attached: true, controller: new AbortController()};
        owners.set(interpreter, record);
        active.add(record);
        interpreter.setWaitMode(waitMode);
        return run(record, supplied);
    }
    const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function(...args) {
        if (this._waitMode !== waitMode) return updateWaitMode.apply(this, args);
        const record = owners.get(this);
        if (record?.attached && !terminal.has(record.status)) return true;
        this.setWaitMode('');
        return false;
    };
    for (const method of ['clear', 'terminate']) {
        const previous = Game_Interpreter.prototype[method];
        Game_Interpreter.prototype[method] = function(...args) {
            for (let interpreter = this; interpreter; interpreter = interpreter._childInterpreter) {
                const record = owners.get(interpreter);
                if (record) detach(record);
            }
            return previous.apply(this, args);
        };
    }
    for (const method of ['terminate', 'destroy']) {
        const previous = Scene_Base.prototype[method];
        Scene_Base.prototype[method] = function(...args) {
            detachScene(this);
            return previous.apply(this, args);
        };
    }
    const setupMap = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(...args) {
        detachScene(SceneManager._scene);
        return setupMap.apply(this, args);
    };
    for (const method of ['createGameObjects', 'extractSaveContents']) {
        const previous = DataManager[method];
        DataManager[method] = function(...args) {
            for (const record of active) detach(record);
            return previous.apply(this, args);
        };
    }
    for (const type of metadataTypes.filter(type => type.startsWith('Export'))) {
        PluginManager.registerCommand(catalog.pluginId, type, function() {
            let context = null;
            if (type === 'ExportCurMapText') context = {type: 'map', id: $gameMap.mapId()};
            if (type === 'ExportCurTroopText') context = {type: 'troop', id: $gameParty.inBattle() ? $gameTroop._troopId : 0};
            if (context && (!Number.isSafeInteger(context.id) || context.id <= 0)) {
                showFeedback('Exportação falhou: o contexto de mapa ou batalha não é válido.');
                console.error('[METADATA_INVALID_CONTEXT] No current map or troop is available.');
                return;
            }
            return begin(this, type, context);
        });
    }
    return {writeCoordinates: (interpreter, snapshot) => begin(interpreter, 'PictureCoordinatesMode', snapshot.context, snapshot)};
}
