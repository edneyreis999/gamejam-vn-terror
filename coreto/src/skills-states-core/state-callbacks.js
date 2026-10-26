function skillsStatesCallbackBody(source, context) {
    return 'try {\n' + source + '\n} catch (error) {\n' +
        'if ($gameTemp.isPlaytest()) console.log(new Error("SkillsStates state " + stateId + ' +
        JSON.stringify(' ' + context + ': ') + ' + error.message));\n}';
}
