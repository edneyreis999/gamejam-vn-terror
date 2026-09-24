@AGENTS.md

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/The Dryland Drowned</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda e os catálogos da CLI antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->
