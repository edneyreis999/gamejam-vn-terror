# Gestão no Trello

- Use o [quadro da game jam](https://trello.com/b/I0FkvVtc/gamejam-visual-novel) para gerenciar execução, ordem, responsáveis, dependências e prazos; mantenha decisões de design no GDD canônico.
- Separe o backlog por `Narrativa`, `UI/UX`, `Technical Art` e `Programação`; mantenha cards executáveis acima dos cards `[ÉPICO]`.
- Quebre cards grandes em cards executáveis de meio dia a dois dias e registre responsável, início, fim, dependências, paralelismo e entrega mínima.
- Trate a data de entrega como prazo da primeira versão utilizável; mova-a para `Done — Refinamento Conhecido` quando houver ajustes conhecidos ou para `Done` quando não houver.
- Teste continuamente durante o desenvolvimento e registre problemas como cards `[BUG]` no backlog da disciplina responsável, sem criar cards separados de QA.
- Planeje com seis horas por pessoa por dia, use fins de semana como folga e buffer e reserve os últimos seis dias apenas para bugs e refinamento, sem novas features.

# Equipe da Coreto

- Direcione a programação em RPG Maker prioritariamente ao Edney; ele é generalista e também pode apoiar Narrativa.
- Direcione Technical Art e ilustração final ao Lucas, único ilustrador da equipe; use seu apoio em programação somente como contingência.
- Direcione UI/UX e trabalho no Figma à Pati, única pessoa da equipe que usa a ferramenta; ela também mentora João e Maria.
- Direcione João e Maria a Narrativa e testes manuais; eles são menores aprendizes e não assumem tarefas das outras disciplinas.

# Renovar autenticação

- Se o MCP do Trello retornar `unauthorized_client: refresh_token is invalid`, renove a autenticação com `codex mcp login trello`. Copie a URL emitida pelo comando e execute `open '<URL>'` no macOS para abri-la no navegador padrão do usuário; não use um navegador de automação ou perfil isolado. Informe ao usuário que deve concluir a autorização na página aberta. Mantenha o comando de login em execução até receber `Successfully logged in to MCP server 'trello'` e então repita a operação que falhou. Use sempre a URL gerada pela tentativa atual de login.
