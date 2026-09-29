---
id: CH-coreto-english-localization
area: ART
title: Avaliar localização integral e clareza do horror em inglês
persona: Jogador de língua inglesa, representado por agente sem participação no desenvolvimento
journey: J-mz-creative-review
expected: Experiência integral localizada, funcionamento nativo e parecer específico sobre compreensão e atmosfera
entry_points: npm start -- --port 18737 no worktree; entrada nativa do jogo
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: LOC-mz-session-recovery-export; FOR-mz-formation-roster; ENC-mz-encounter-sacrifice-retreat; CAM-mz-discovery-closing; ART-mz-human-approval
---

Plano aprovado em 2026-09-29 (D-015). Autoridade: [spec](../../../planos/tasks/coreto-english-localization/spec.md),
[verificação L10–L15](../../../planos/tasks/coreto-english-localization/verification.md)
e decisões D-001–022 (D-017–022 vêm das revisões par 01 e 02). Nenhum teste foi
executado para este incremento.

## Missão e preparação

Percorrer o jogo sobre a base Coreto já migrada (D-013), com inglês inicial e
opção nativa PT/EN. A validação da migração é de outra frente (D-014); defeitos
dela encontrados aqui vão para essa frente, sem correção neste incremento. Confirmar idioma lembrado, continuidade da campanha e legibilidade
dos diálogos, escolhas gráficas, nomes dinâmicos, Options, Save/Load e créditos.
Observar também: linha Text Effects na categoria Geral (desligada, a animação
para), rótulos de abordagem com quebra automática, janela de escolha oculta
nos encontros, falas em itálico, cartões de destino com nome separado da
descrição, créditos com layout por linha e aba/janela com o título “The Dryland
Drowned”. Text Effects começa ligado. Usar Chrome desktop, teclado/mouse e tabelas/assets
locais, sempre com o candidato servido do worktree em `127.0.0.1:18737` (D-020).
Nunca usar nem limpar a origem 18726 do usuário. Fazer a descoberta das
ferramentas existentes antes da execução; não escrever plugin, runner, adapter,
gerador ou teste novo para contornar suas limitações.

Executar os lotes L10–L13 conforme sua matriz, agrupando configurações e provas
compatíveis. O jogo começa do estado inicial real: cada executor cria sua própria
campanha e saves com ações públicas. L14 foi retirado antes da execução por
D-011: não retestar funcionamento interno, loader ou matriz genérica dos plugins.
Verificar o jogo e os dados/configurações alterados. Proibidos save externo, seed injetada,
teleporte e mutação por inspeção. Não depender de campanha do tradutor para o
agente avaliador. Registrar proveniência quando retomar a própria campanha.

## Avaliação por outro agente — L15

Delegar somente após existir candidato traduzido: agente novo, sem participação
na tradução ou implementação. Fornecer jogo, controles e esta missão; não repassar
autoavaliação do tradutor como conclusão esperada. Primeiro jogar por inputs
públicos. Em momentos de escolha, registrar o que compreendeu da situação e das
ações disponíveis sem recorrer ao código. Registrar passagens difíceis, termos
incomuns sem contexto, referentes ambíguos por redação e frases desnecessariamente
complexas. Distinguir esses problemas do mistério intencional da narrativa.

Depois da jornada, ler o restante do corpus traduzido com identificação de cena
e falante, para que ramos não sorteados também sejam avaliados. Separar claramente
texto visto no jogo de revisão documental. Para cada achado: chave/local, trecho,
problema de compreensão, efeito no horror, recomendação e prioridade. Não mudar
os arquivos durante essa avaliação; encaminhar achados ao agente implementador.

Relatório deve incluir cobertura, limitações, achados e reavaliação dos trechos
alterados. Um resultado sem achados também exige exemplos e raciocínio de leitura.
Não apresentar a persona de agente como um jogador humano ou ensaio cego validado.
Edney decide o aceite editorial, separado de parecer do agente e provas técnicas.

## Registro e término

Usar as jornadas/cenários existentes para observações funcionais, sem sobrescrever
seus resultados históricos. Bugs são deduplicados pelo sintoma e associados à
disciplina dona. Não publicar cards, mensagens ou relatórios externos.

Fechar abas, processos e servidores criados pelo executor; preservar recursos do
usuário. Registrar encerramento confirmado ou pendência. Capturas de devlog vêm
de jogo real: opção de idioma, cena nos dois idiomas e uma escolha legível.
