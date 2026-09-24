# Restrições do projeto

- Preserve engine e plugins MZ; novas dependências, serviços remotos ou mudanças nesses contratos exigem design aprovado.
- Mantenha a inspeção de QA somente leitura e restrinja mutações da campanha a ações validadas do jogador.
- Use placeholders somente durante o desenvolvimento; substitua todos por assets finais antes da entrega.

# Fonte de verdade

- Consulte o GDD canônico em `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` antes de propor ou implementar decisões de design; ele prevalece sobre versões numeradas, mantidas como histórico.
- Preserve a distinção entre `Confirmado`, `Baseline de protótipo`, `Pendente` e `Fora do escopo`; não transforme pendências em decisões implícitas.
- Trate specs Compozy concluídas como baselines históricas; descreva mudanças posteriores de comportamento em uma spec incremental.
- Leia `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md` e `docs/_memory/glossary.md` antes de criar specs Compozy.

# Implementação e execução

- Use `rpg-maker/The Dryland Drowned/` como única implementação do jogo, sem build; consulte seus dados, plugins e assets.
- Mantenha conteúdo nos eventos nativos, regras nos plugins de domínio e testes em `rpg-maker/tests/`, conforme os contratos MZ aprovados.
- Para abrir o jogo no Windows ou macOS com Node 22+ e Chrome, execute `npm start` na raiz; leia `docs/_memory/local-game-run.md` antes de iniciar ou reutilizar o servidor.

# Planejamento e entregas

- Ao planejar, executar, retomar ou verificar tarefas, aplique as ADRs G004–G006 em `docs/adrs/README.md`.
- Antes de planejar trabalho, distribuir responsáveis, registrar bugs ou operar o Trello, leia `docs/_memory/trello-workflow.md`.
- Siga `.gitmessage` ao preparar mensagens de commit.
- Siga `.github/pull_request_template.md` ao preparar pull requests.
- Ao alterar um fluxo visível, preserve ou atualize o momento demonstrável e a captura sugerida para o devlog.

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/The Dryland Drowned</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda e os catálogos da CLI antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->
