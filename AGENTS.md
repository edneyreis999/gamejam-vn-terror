# Restrições do projeto

- Preserve engine e plugins MZ; novas dependências, serviços remotos ou mudanças nesses contratos exigem design aprovado.
- Mantenha a inspeção de QA somente leitura e restrinja mutações da campanha a ações validadas do jogador.
- Use placeholders somente durante o desenvolvimento; substitua todos por assets finais antes da entrega.

# Fonte de verdade

- Consulte `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` antes de propor ou implementar decisões de design.
- Trate versões numeradas do GDD como histórico; em conflitos, prevalece o GDD canônico sem sufixo de versão.
- Preserve a distinção entre `Confirmado`, `Baseline de protótipo`, `Pendente` e `Fora do escopo`; não transforme pendências em decisões implícitas.
- Trate specs Compozy concluídas como baselines históricas; descreva mudanças posteriores de comportamento em uma spec incremental.
- Leia `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md` e `docs/_memory/glossary.md` antes de criar specs Compozy.

# Implementação e execução

- Trabalhe no jogo em `rpg-maker/The Dryland Drowned/`; use seus dados, plugins e assets como fonte da implementação, sem build nem serviços remotos.
- Mantenha conteúdo nos eventos nativos, regras nos plugins de domínio e testes em `rpg-maker/tests/`, conforme os contratos MZ aprovados.
- Para abrir o jogo no Windows ou macOS com Node 22+ e Chrome, execute `npm start` na raiz; leia `docs/_memory/local-game-run.md` antes de iniciar ou reutilizar o servidor.

# Planejamento e entregas

- Antes de planejar trabalho, distribuir responsáveis, registrar bugs ou operar o Trello, leia `docs/_memory/trello-workflow.md` para o quadro, as regras de execução, a equipe e a autenticação.
- Siga `.gitmessage` ao preparar mensagens de commit, inclusive com `git commit -m`.
- Siga `.github/pull_request_template.md` ao preparar pull requests.
- Preserve, quando aplicável, o momento demonstrável e a captura sugerida para o devlog.
