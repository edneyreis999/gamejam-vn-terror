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

# Entregas

- Siga `.gitmessage` ao preparar mensagens de commit, inclusive com `git commit -m`.
- Siga `.github/pull_request_template.md` ao preparar pull requests.
- Registre somente validações executadas e identifique explicitamente o que não foi verificado.
- Preserve, quando aplicável, o momento demonstrável e a captura sugerida para o devlog.
