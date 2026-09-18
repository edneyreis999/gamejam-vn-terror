# ADR-G005 — Exclusão de testes de gamepad

- **Estado:** Aceita em 2026-09-18, por determinação explícita do usuário.
- **Escopo:** planejamento, execução e critérios de aceite de testes nas campanhas atuais e futuras deste jogo, incluindo migrações e specs incrementais.
- **Origem:** adaptação da ADR-011 do Pixi-Rework, identificada em Rastreabilidade.
- **Relação:** exclusão de escopo aprovada, distinta da reorganização da [ADR-G004](adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md) e das omissões por evidência da [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md). Preserva a exclusão de zoom nativo da [ADR-G003](adr-g003-excluir-testes-de-zoom-nativo.md).

## Contexto e decisão

O usuário adotou neste projeto a decisão do Pixi-Rework de excluir testes de gamepad. É uma escolha durável de escopo, sem alegação de qualidade comprovada desse dispositivo.

**Não incluir testes de gamepad, manuais ou automatizados, nas campanhas de QA do projeto.** A exclusão abrange hardware físico, input sintetizado, mappers, remapeamento, reset, conexão/desconexão, identificação, mensagens e autoria de configurações específicas de gamepad. Não criar cenários, variantes, tarefas ou gates de aceite de gamepad, inclusive dentro de jornadas mistas.

Preservar verificações de teclado/mouse, áudio, autoria no Editor e aceites humanos aplicáveis que não sejam específicos de gamepad. Em jornadas mistas, conservar essas verificações e retirar somente a parcela de gamepad.

## Aplicação e histórico

Registrar gamepad como **fora do escopo de testes** antes de decompor futuras specs. Não solicitar novamente hardware, execução ou aceite do dispositivo. Reintroduzir esses testes exige nova decisão explícita do usuário.

Se uma campanha aberta contiver obrigações de gamepad, reconciliar a task, o roteiro e a matriz existentes com **dispensa explícita (`waived`)**, vinculada a esta ADR. A dispensa encerra a obrigação, mas não representa execução nem resultado `pass`. Não encerrar obrigações de outros inputs junto com ela.

A decisão preserva funcionalidades, campos e compatibilidade de gamepad do produto, assim como código, testes e evidências existentes. Resultados históricos não se tornam requisito de nova campanha. Inventariar campos existentes continua necessário para preservar contratos funcionais, sem derivar disso novos testes do dispositivo. Não apagar suítes existentes nem declarar falhas conhecidas corrigidas por dispensa.

Não foram encontradas exigências de gamepad nos arquivos Markdown de `docs/` e `planos/tasks/` na adoção. Portanto, este registro não declara sensores locais dispensados individualmente nem resultados de testes novos.

## Alternativas e consequências

- Exigir hardware e sessão manual foi rejeitado como obrigação recorrente do projeto.
- Substituir hardware por simulação foi rejeitado: ainda exigiria testes de gamepad.
- A exclusão remove esse custo e bloqueio de entrega, mas deixa a qualidade específica de gamepad sem garantia de verificação pela campanha. Não autoriza declarar ausência de defeitos.

## Rastreabilidade

Autorização: pedido explícito do usuário em 2026-09-18 para aplicar neste projeto as decisões das ADRs 010, 011 e 012 do Pixi-Rework.

Fonte: `rpg-maker-coreto-rework/Pixi-Rework/docs/adr/011-exclusao-de-testes-de-gamepad-nas-migracoes.md`, no repositório irmão, lida nesta adoção. A dispensa de `V-004/DEVICE` da spec011 pertence à origem e não é um sensor deste jogo. Aqui a política passa a reger os incrementos do jogo, sem depender dos artefatos da migração Options/Save.
