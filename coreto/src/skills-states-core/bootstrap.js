function installSkillsStatesCore() {
    if (globalThis.Imported?.VisuMZ_1_SkillsStatesCore) throw new CoreError('SS_DUPLICATE_PROVIDER', 'Enable only one SkillsStates provider.');
    const api = installComplement(catalog, 'SkillsStatesCore', 'SS');
    installSkillsStatesCosts(api.settings.Costs);
    installSkillsStatesSkills(api.settings.Skills);
    VisuMZ.SkillsStatesCore.Settings = api.settings;
    installSkillsStatesLifecycle(api.settings.States);
    installSkillsStatesEffects();
    installSkillsStatesCategories();
    installSkillsStatesBuffs(api.settings.Buffs);
    installSkillsStatesPassives(api.settings.PassiveStates);
    installSkillsStatesToggles(api.settings.Toggles);
    installSkillsStatesAuras();
    installSkillsStatesCommands();
    installSkillsStatesSkillPresentation(api.settings.Skills, JSON.parse(api.rawParameters['Skills:struct'] || '{}'));
    installSkillsStatesStatePresentation(api.settings.States, api.settings.Buffs);
    globalThis.Imported ??= {};
    Imported.Coreto_1_SkillsStatesCore = true;
    Imported.VisuMZ_1_SkillsStatesCore = true;
    api.capabilities = ['configured-skill-costs', 'replacement-resource-gauges', 'skill-types', 'skill-availability', 'skill-list-order', 'applied-state-lifecycle', 'state-origin-data', 'periodic-state-effects', 'state-categories', 'buffs-debuffs', 'passive-states', 'skill-toggles', 'auras-miasmas'];
    return api;
}
installSkillsStatesCore();
