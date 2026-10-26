export function validateMessageDependencies(active, own, dependencies, fail) {
    for (const [name, version] of Object.entries({...dependencies.consumers, ...dependencies.integrations})) {
        const entries = active.filter(plugin => plugin.name === name);
        if (entries.length > 1) fail('MESSAGE_DEPENDENCY_DUPLICATE', `Duplicate plugin: ${name}.`);
        if (!entries.length) continue;
        if (!entries[0].description.includes(`[Version ${version}]`)) fail('MESSAGE_DEPENDENCY_VERSION', `Use ${name} ${version}.`);
        if (name in dependencies.consumers && active.indexOf(entries[0]) < active.indexOf(own)) {
            fail('MESSAGE_CONSUMER_ORDER', `Place ${name} after Message.`);
        }
    }
    const tooltip = active.findIndex(plugin => plugin.name === 'VisuMZ_3_StateTooltips');
    if (tooltip >= 0) {
        for (const alternatives of [['VisuMZ_1_BattleCore', 'Coreto_1_BattleCore'], ['VisuMZ_1_SkillsStatesCore', 'Coreto_1_SkillsStatesCore']]) {
            const providers = active.filter(plugin => alternatives.includes(plugin.name));
            if (providers.length !== 1 || active.indexOf(providers[0]) > tooltip) {
                fail('MESSAGE_TOOLTIP_DEPENDENCY', `Place exactly one ${alternatives.join(' or ')} before StateTooltips.`);
            }
        }
    }
}
