# ADR-G007 — Ferramentas de Debug para QA, desligadas por padrão e restritas a ações válidas

- **Estado:** Aceita em 2026-10-31, por decisão explícita do usuário. O texto desta ADR ainda aguarda leitura do usuário (ver Histórico).
- **Escopo:** o plugin `Dryland_7_QADebug` e qualquer ferramenta de QA futura que escolha seed, salte para um ponto da campanha ou revele resultados; seu uso por QA humano e por agentes de QA; o portão de build que decide se elas seguem na versão publicada.
- **Origem:** pedido do usuário em 2026-10-31 e a spec [qa-debug-tools](../../planos/tasks/qa-debug-tools/_spec.md) (D-1, D-2, D-5).
- **Natureza:** decisão de arquitetura e processo (ADR, não GDDR): a jogabilidade não muda.

## Contexto

O QA não tem como chegar rápido a uma armadilha, rota ou final: testar o mapa do Saci (A1) exige jogar até o sorteio entregá-lo. As regras vigentes proíbem o atalho:

- O [playbook](../_memory/spec-authoring-playbook.md#project-baseline) diz que não há "shipped QA console or seed setter" nem controles de QA na interface normal.
- A [SD-015](../_memory/standing_directives.md#sd-015--self-produced-test-saves) não autoriza edição de save, estado ou seed na preparação de testes.
- A [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) diz que agrupar "não autoriza injetar estado, seed ou atalhos de QA".

A validação da campanha rejeita estados que o jogo normal não produz: sucesso sem a competência necessária e morte sem contexto de rota, encontro e abordagem (`Dryland_CampaignRules.js`, `validateState`). O sorteio ocorre só em `ENTER_DUNGEON`, a partir da seed escolhida em `BEGIN` (hoje `Date.now()`), então a ordem das armadilhas depende apenas da seed e das ações.

## Decisão

**Permitir um plugin de Debug para QA, `Dryland_7_QADebug`, usado por QA humano e por agentes de QA, dentro destes limites.**

### Somente ações válidas
O Debug nunca grava o estado da campanha. Ele envia as mesmas ações validadas que os eventos enviam, na ordem, pelo caminho único `apply` do EventBridge. Todo estado resultante passa pela validação da campanha. Não existe sucesso forçado, morte avulsa nem edição de save.

### Seed
Salto e cenário escolhem a seed inicial da campanha. O mesmo pedido gera sempre a mesma seed. Os sorteios seguintes seguem dela como em qualquer campanha. O QA vê a seed no painel para relatar bugs.

### Desligado por padrão e removível
O plugin vem desligado no projeto-fonte. O QA o liga no Plugin Manager quando precisa. Desligado, o jogo é o jogo padrão e saves feitos após um salto carregam sem ele. O único estado próprio persistido é a dica de abordagem, nas configurações do jogo e nunca no save da campanha.

### Portão de build
`rpg-maker/tools/prune-build.mjs` detecta o plugin ativo no build exportado e pergunta se ele deve seguir. A resposta "não" e a execução sem terminal interativo o desligam apenas na cópia do build (a flag `--allow-debug` o mantém). O projeto-fonte nunca é alterado. `verify-build` informa o estado e aceita somente essa diferença.

### Uso por agentes
Agentes podem usar saltos e cenários para chegar ao ponto de teste. O plugin só é ligado na cópia de runtime preparada pelo agente, nunca no `js/plugins.js` do jogo. A evidência registra o salto ou cenário e a seed. O que depende do próprio salto (save, morte, progresso) é identificado como vindo dele, nunca como jogatina completa.

### Emendas
- **SD-015** e o **Project Baseline do playbook** passam a citar esta ADR como exceção limitada a este plugin, preservando as demais regras.
- **ADR-G006:** a frase "não autoriza injetar estado, seed ou atalhos de QA" continua valendo para o agrupamento de testes. Esta ADR cria a única exceção: ações válidas enviadas pelo Debug, nos limites acima.

## Alternativas consideradas

- **Editar o estado direto ("god mode", matar herói):** rejeitada; a validação recusa os estados e o AGENTS.md restringe a campanha a ações validadas.
- **Só QA humano:** rejeitada pelo usuário; o ganho de tempo vale também para agentes.
- **Duas versões do jogo (teste e publicada):** rejeitada; o plugin desligável evita um segundo build.
- **Teste automático do plugin em cópia descartável:** não adotada por decisão do usuário (D-5). O risco residual é que regressões nos saltos só aparecem quando alguém usa o Debug.

## Consequências

- O QA chega a qualquer armadilha, rota ou final em segundos e relata a seed.
- O projeto passa a ter um plugin de QA que não faz parte do jogo, protegido só pelo portão do build e pela convenção de ficar desligado.
- O EventBridge ganha duas entradas públicas (aplicar ação validada; começar com seed). Sem o Debug, `BEGIN` continua com a seed do relógio.
- Cenários dependem de caminhos legais de replay; mudanças na campanha podem quebrá-los sem teste automático que avise.
- A linha "mutações da campanha exclusivamente por ações validadas do jogador" do AGENTS.md é lida como satisfeita, pois o Debug despacha as mesmas ações validadas. O texto do AGENTS.md não foi alterado por esta ADR; uma redação mais explícita fica a critério do usuário.

## Relações e substituições

| Registro | Relação | Escopo substituído | Escopo que permanece |
| --- | --- | --- | --- |
| [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) | Complementa, com exceção | Somente a vedação a injetar seed/atalhos de QA, para o plugin Debug | Seleção por risco, E2E, encerramento de recursos e inspeção somente leitura |
| [ADR-G004](adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md) | Complementa | Nenhum | Tudo |
| [SD-015](../_memory/standing_directives.md#sd-015--self-produced-test-saves) | Exceção limitada | Proibição de seed/estado nesse plugin | Saves próprios; sem saves externos |
| [Playbook](../_memory/spec-authoring-playbook.md#project-baseline) | Exceção limitada | "No shipped QA console or seed setter" para esse plugin | Demais linhas do baseline |

## Fontes e evidência

- Spec [qa-debug-tools](../../planos/tasks/qa-debug-tools/_spec.md) e [user stories](../../planos/tasks/qa-debug-tools/_user_stories.md): decisões de 2026-10-31 (somente estados legais, QA humano e agentes, fonte com plugin desligado, só o portão com teste automático).
- `Dryland_CampaignRules.js` (`validateState`, `dispatch`, sorteio em `ENTER_DUNGEON`) e `Dryland_EventBridge.js` (`apply`, `BEGIN`): lidos em 2026-10-31. A implementação ainda não existe; esta ADR registra a decisão, não a entrega.

## Histórico

| Data | Mudança | Fonte |
| --- | --- | --- |
| 2026-10-31 | Registrada como Aceita. Decisão do usuário na sessão de spec; leitura do texto pendente | Respostas do usuário na sessão de spec e aprovação da spec |
