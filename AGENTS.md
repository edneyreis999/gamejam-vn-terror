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

- Mantenha o protótipo jogável sem etapa de build, offline e diretamente executável no Chrome, salvo mudança aprovada em spec.
- Mantenha conteúdo de catálogo, regras do jogo, renderização no navegador e testes em suas camadas atuais de responsabilidade.

# Segurança

- Não adicione rede, armazenamento, markup executável, assets remotos ou código de runtime de terceiros ao protótipo sem uma mudança de design aprovada.
- Mantenha a inspeção de QA somente leitura e restrinja mutações da campanha a ações validadas do jogador.

# Gestão no Trello

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
