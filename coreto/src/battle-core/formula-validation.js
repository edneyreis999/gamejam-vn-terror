function checkBattleFormulaForMechanics(formula) {
    return /\.(?:(?:gain|lose|set)(?:Hp|Mp|Tp)|(?:add|remove)(?:Buff|Debuff|State)|clearStates|recoverAll)\s*\(/.test(formula);
}
function installBattleFormulaValidation(settings) {
    const onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        const result = onDatabaseLoaded.call(this);
        if (settings.Damage.CheckFormulaMechanics) {
            for (const [kind,items] of [['Skill',$dataSkills],['Item',$dataItems]]) {
                for (const item of items.filter(Boolean)) {
                    if (checkBattleFormulaForMechanics(item.damage.formula)) {
                        alert(`[Coreto Battle] ${kind} #${item.id} ${item.name}: a fórmula de dano altera o estado do combate. Mova esses efeitos para efeitos da ação ou callbacks; previsões e auto battle também avaliam a fórmula.`);
                    }
                }
            }
        }
        return result;
    };
}
