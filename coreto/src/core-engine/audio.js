function installAudioCommands() {
    for (const channel of ["Bgm", "Bgs"]) {
        for (const [property, lower, upper] of [["Volume", 0, 100], ["Pitch", 50, 150], ["Pan", -100, 100]]) {
            const field = property.toLowerCase();
            const command = catalog.commands.find(command => command.key === `AudioChange${channel}${property}`);
            PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
                const args = convertEventArguments(command, raw);
                const current = AudioManager[`_current${channel}`];
                if (!current) return;
                const buffer = AudioManager[`_${channel.toLowerCase()}Buffer`];
                const position = buffer.seek();
                current.pos = position;
                current[field] = Math.round(args[field]).clamp(lower, upper);
                AudioManager[`update${channel}Parameters`](current);
                AudioManager[`play${channel}`](current, position);
                buffer._startPlaying(position);
            });
        }
    }
}
