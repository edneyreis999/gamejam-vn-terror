# Fonte de verdade

- Consulte `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` antes de propor ou implementar decisões de design.
- Trate versões numeradas do GDD como histórico; em conflitos, prevalece o GDD canônico sem sufixo de versão.
- Preserve a distinção entre `Confirmado`, `Baseline de protótipo`, `Pendente` e `Fora do escopo`; não transforme pendências em decisões implícitas.
- Trate specs Compozy concluídas como baselines históricas; descreva mudanças posteriores de comportamento em uma spec incremental.

# Autoria de specs

- Leia `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md` e `docs/_memory/glossary.md` antes de criar specs Compozy.
- Derive fatos do repositório e consulte o usuário somente sobre decisões de produto ou trade-offs.
- Registre decisões relevantes aceitas no diretório de ADRs da spec ativa.

# Arquitetura

- Trabalhe no jogo em `rpg-maker/The Dryland Drowned/`; use seus dados, plugins e assets como fonte da implementação. O jogo local roda no Chrome pelo servidor documentado abaixo, sem build nem serviços remotos.
- Mantenha conteúdo nos eventos nativos, regras nos plugins de domínio e testes em `rpg-maker/tests/`, conforme os contratos MZ aprovados.

# Segurança

- Preserve engine e plugins MZ; novas dependências, serviços remotos ou mudanças nesses contratos exigem design aprovado.
- Mantenha a inspeção de QA somente leitura e restrinja mutações da campanha a ações validadas do jogador.

# Abrir o jogo

- Com Node 22+ e Chrome instalados, execute `npm --prefix "rpg-maker/The Dryland Drowned" start` na raiz, no Windows ou macOS; o servidor usa `http://127.0.0.1:18726/` e abre o Chrome. Mantenha o processo em execução durante a sessão.
- Se houver `EADDRINUSE` ou aviso de porta ocupada, identifique o processo com `lsof -nP -iTCP:18726 -sTCP:LISTEN` no macOS ou `netstat -ano | findstr :18726` no Windows e confirme o conteúdo servido antes de reutilizar o endereço; não encerre processos desconhecidos. Para outra porta livre, execute `npm --prefix "rpg-maker/The Dryland Drowned" start -- --port 18727` e informe que saves da porta anterior não aparecem no novo endereço.

# Gestão no Trello

- Se o MCP do Trello retornar `unauthorized_client: refresh_token is invalid`, renove a autenticação com `codex mcp login trello`. Copie a URL emitida pelo comando e execute `open '<URL>'` no macOS para abri-la no navegador padrão do usuário; não use um navegador de automação ou perfil isolado. Informe ao usuário que deve concluir a autorização na página aberta. Mantenha o comando de login em execução até receber `Successfully logged in to MCP server 'trello'` e então repita a operação que falhou. Use sempre a URL gerada pela tentativa atual de login.
- Use o [quadro da game jam](https://trello.com/b/I0FkvVtc/gamejam-visual-novel) para gerenciar execução, ordem, responsáveis, dependências e prazos; mantenha decisões de design no GDD canônico.
- Separe o backlog por `Narrativa`, `UI/UX`, `Technical Art` e `Programação`; mantenha cards executáveis acima dos cards `[ÉPICO]`.
- Quebre cards grandes em cards executáveis de meio dia a dois dias e registre responsável, início, fim, dependências, paralelismo e entrega mínima.
- Trate a data de entrega como prazo da primeira versão utilizável; mova-a para `Done — Refinamento Conhecido` quando houver ajustes conhecidos ou para `Done` quando não houver.
- Teste continuamente durante o desenvolvimento e registre problemas como cards `[BUG]` no backlog da disciplina responsável, sem criar cards separados de QA.
- Planeje com seis horas por pessoa por dia, use fins de semana como folga e buffer e reserve os últimos seis dias apenas para bugs e refinamento, sem novas features.
- Use placeholders somente durante o desenvolvimento; substitua todos por assets finais antes da entrega.

# Equipe da Coreto

- Direcione a programação em RPG Maker prioritariamente ao Edney; ele é generalista e também pode apoiar Narrativa.
- Direcione Technical Art e ilustração final ao Lucas, único ilustrador da equipe; use seu apoio em programação somente como contingência.
- Direcione UI/UX e trabalho no Figma à Pati, única pessoa da equipe que usa a ferramenta; ela também mentora João e Maria.
- Direcione João e Maria a Narrativa e testes manuais; eles são menores aprendizes e não assumem tarefas das outras disciplinas.

# Entregas

- Siga `.gitmessage` ao preparar mensagens de commit, inclusive com `git commit -m`.
- Siga `.github/pull_request_template.md` ao preparar pull requests.
- Registre somente validações executadas e identifique explicitamente o que não foi verificado.
- Preserve, quando aplicável, o momento demonstrável e a captura sugerida para o devlog.
