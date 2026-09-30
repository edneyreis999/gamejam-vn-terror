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
- Mantenha a estrutura das cenas nos eventos nativos, o texto do jogador em PT/EN em `<jogo>/Languages.tsv` (eventos só com `$[chave]`), regras nos plugins de domínio e testes em `rpg-maker/tests/`, conforme os contratos MZ aprovados.
- Para abrir o jogo no Windows ou macOS com Node 22+ e Chrome, execute `npm start` na raiz; leia `docs/_memory/local-game-run.md` antes de iniciar ou reutilizar o servidor.

# Testes

- Regras e persistência ganham teste; aparência não. Teste é manutenção contínua: só nasce se protege algo que o jogador ou o dono do jogo sentiria perder.
- Antes de criar um teste, responda a cada pergunta; sem boa resposta, não crie:
  1. Que decisão ou regra ele protege, e que bug concreto ele impediria?
  2. O jogador ou o dono do jogo notaria se isso quebrasse? Ou só o teste notaria?
  3. Dá para ver isso a olho nu em 10 segundos? Cor, posição, texto de botão e layout não ganham teste; save, morte, progresso e ordem de eventos ganham.
  4. Quanto isso muda por mês? Interface em iteração é o pior alvo.
  5. Ele checa comportamento ou implementação? Um refactor que mantém o jogo igual não pode quebrá-lo.
  6. Já existe teste que cobre o mesmo risco? Quatro testes com a mesma falha não são quatro seguranças.
  7. Quanto custa? Abrir navegador e depender de texto localizado só se justificam para proteger algo caro de perder.
  8. Quem conserta quando quebrar, e em quanto tempo?
- Testes não comparam texto traduzido: usam a chave (`$[chave]`) ou o valor lido de `Languages.tsv`. `$gameMessage.choices()` guarda a chave crua, não o texto exibido.
- Teste vermelho: descubra a causa antes de agir. Se o jogo está certo e o teste está desatualizado, corrija o teste quando ele protege regra ou persistência. Exclua apenas o que reprova as perguntas acima (aparência, posição, texto de botão, layout em iteração) e diga no commit qual pergunta reprovou. Nunca exclua só porque está vermelho.
- Rode a suíte com `node --test --test-concurrency=1 "rpg-maker/tests/**/*.test.mjs"`: todos os arquivos usam a porta 18726, então rodar em paralelo falha com "Address already in use". Se sobrar um `http.server` órfão, encerre-o antes de rodar de novo.

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
