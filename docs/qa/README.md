# QA viva — Expedição e Sacrifício

Esta é a única árvore durável de QA do jogo em `rpg-maker/The Dryland Drowned/`. Cenários guardam o último veredito; jornadas e charters permanecem entre ciclos; cada execução cria um relatório datado. O planejamento atual não transforma evidência automatizada, visual ou histórica em observação de uma pessoa.

## Evidências brutas e material de entrega

`docs/qa/evidence/` e `docs/qa/runs/` têm a mesma responsabilidade: saídas locais de QA, ignoradas pelo Git. Não são entradas do jogo nem o lugar permanente do material necessário para compor devlogs. Os runners podem recriar seus diretórios; não precisam de resultados históricos para testar o código atual. Neste projeto, runs é uma localização reservada; os runners MZ atuais escrevem em evidence.

Após o aceite, preservar os registros brutos em arquivo local com manifesto e hashes, consolidar resultados nos relatórios e copiar as capturas selecionadas para `docs/qa/deliveries/<incremento>/`. Esses materiais de entrega devem funcionar em um clone sem evidence/runs. Links históricos para evidências continuam servindo como proveniência local, não como dependência do material de entrega.

O [incremento MZ aceito](deliveries/init-rpg-maker-mz/README.md) tem resumo, aceite, manifesto do runtime e cinco capturas independentes, incluindo o desaparecimento de Gorvak e a visita posterior. Não exige os milhares de arquivos brutos para compor seu devlog. Os181 arquivos de ciclos anteriores em evidence foram retirados do versionamento no commit e888338, por orientação do usuário, com cópias locais e hashes preservados. Links desses ciclos continuam como referência ao acervo local.

## Migração MZ em execução — 2026-09-09

A spec `init-rpg-maker-mz` tem [evidência incremental](reports/2026-09-09-native-mz-implementation.md) da campanha nativa, save, finais, controles e áudio. O [plano MZ](guides/native-mz-cycle.md) mapeia as 23 jornadas E2E e os sensores visual, auditivo, humano e de exportação; planejamento não indica execução.

Use o [servidor e runner Node documentados](../../rpg-maker/README.md), em `http://127.0.0.1:18726/`. **Continuar** exige a mesma origem e perfil; mantenha uma única aba ativa. Não há trava entre abas. A inspeção usa somente `expeditionQA.setSeed`, `snapshot` e `validate`, com seed apenas antes de Jogar. O pacote Web deve incluir todos os assets dinâmicos e ser aberto por servidor local, sem publicação.

As jornadas MZ são [campanha completa](journeys/J-mz-complete-campaign.md), [recuperação e exportação](journeys/J-mz-recovery-export.md), [teclado e diagnóstico](journeys/J-mz-qa-accessibility.md) e [revisão audiovisual e humana](journeys/J-mz-creative-review.md). Seus cenários `*-mz-*` mantêm vereditos próprios. A audição e a aprovação final de arte, texto, sensibilidade cultural e atribuições permanecem explícitas.

A execução foi pausada pelo usuário após quatro campanhas observadas; o [relatório de playtest](reports/2026-09-09-native-mz-playtest.md) registra resultados parciais, limitações de evidência e próximos passos. Nenhum cenário foi promovido a aceite integral.

As seções abaixo são registros históricos da etapa HTML encerrada. Seus procedimentos não são executáveis nem evidência do MZ atual. Para novos testes, use exclusivamente o plano MZ e os sensores aprovados na spec do incremento.

## Áreas

- `LOC`: abertura local, offline e sessão em memória.
- `FOR`: formação, elenco e foco.
- `ENC`: encontros, consequências, recuo e sacrifício.
- `CAM`: progressão, Conselho, desfechos e campanha nova.
- `ART`: conteúdo, sensibilidade cultural e imagens.
- `ACC`: teclado, zoom dentro do desktop suportado, movimento reduzido e diagnósticos.

## Entradas e execução históricas

A etapa HTML tinha uma página de jogo, um runner local e a API de inspeção `window.expeditionQA`, com `setSeed`, `snapshot` e `validate`. A execução era direta, offline, sem servidor, persistência ou áudio. Essas entradas e seus comandos foram retirados; este registro não orienta sua recuperação.

O manifesto histórico continha 168 IDs únicos (158 V2 e 10 BASE). Os totais anteriores de 231 ou 351 pertencem aos relatórios de seus respectivos ciclos. `docs/qa/state.csv` é uma visualização histórica gerada, não uma fonte de planejamento atual.

O desktop suportado exige área efetiva mínima de 1280×720 CSS px, já descontado o zoom do navegador. 1920×1080 é a captura de referência. Larguras estreitas, 320 px efetivos e touch/mobile não pertencem a este incremento. VoiceOver com uma pessoa, aprovação editorial e cultural e aceitação da arte final continuam verificações humanas distintas; resultados automatizados ou observados por agente não as encerram.

## Registro de bugs

Não há arquivo de bug aberto em `docs/qa/bugs/` no início deste ciclo. Um sintoma encontrado deve ser deduplicado no registro vivo, ligado a pelo menos um dos seis cenários e encaminhado ao backlog da disciplina dona (`Narrativa`, `UI/UX`, `Technical Art` ou `Programação`). Não existe backlog separado de QA e este plano não publica cards externos.

## Taxonomia do ciclo atual

- Jornada e funcional: as quatro jornadas públicas e os seis cenários cobrem S01–S12, ambas as ordens iniciais e os três desfechos.
- Experiência: preparação, perda irreversível, leitura, foco, texto PT-BR, arte provisória e estados terminais são observados dentro das jornadas.
- Erro e abandono: recuo, morte, estado rejeitado, imagem ausente, fechamento/reload e reinício explícito têm ramificações planejadas.
- Cross-cutting: offline, teclado, zoom com área efetiva ≥1280×720, movimento reduzido, seed repetida, informação pública/privada e o canário `tests.html`.
- Continuidade entre dispositivos foi conscientemente omitida porque a campanha é somente em memória; reload inicia uma sessão nova.
- Autenticação, permissões, serviço, HTTP/UDS, configuração, extensão, áudio e armazenamento são não aplicáveis ao runtime local.

## Ciclo Prototype V2 — 2026-09-05

Cadência combinada: `full` para a campanha P0/P1 e `targeted` para as entradas adjacentes local e do runner. A ordem abaixo prioriza impacto e raio de regressão. Cada missão usa exatamente uma tour e inclui o estado terminal ou a condição de abandono/reinício que encerra a sessão.

1. [CH-v3-campaign-terminal-matrix](charters/CH-v3-campaign-terminal-matrix.md) — Caio percorre ambas as ordens, os três desfechos e as precedências de morte até **Campanha concluída** e a abertura limpa.
2. [CH-v3-first-return-loss](charters/CH-v3-first-return-loss.md) — Lia investiga sacrifício imediato, ausência no primeiro retorno, retorno posterior e abandono por reload.
3. [CH-v3-keyboard-desktop](charters/CH-v3-keyboard-desktop.md) — Joana percorre S01–S12 por teclado, com zoom dentro do mínimo efetivo e movimento reduzido.
4. [CH-v3-human-voiceover](charters/CH-v3-human-voiceover.md) — Joana e uma pessoa operadora avaliam nomes, ordem, anúncios e mudanças dinâmicas com VoiceOver real.
5. [CH-v3-human-editorial-art](charters/CH-v3-human-editorial-art.md) — Rui conduz a revisão humana PT-BR, editorial, cultural e de arte final sem importar vereditos de automação.
6. [CH-v3-seeded-public-contract](charters/CH-v3-seeded-public-contract.md) — Caio reproduz seeds, fronteiras de texto visto e separação entre projeção pública e diagnóstico V3 somente leitura.
7. [CH-v3-offline-local-canary](charters/CH-v3-offline-local-canary.md) — Rui abre a cópia local sem rede, bloqueia imagens e confirma que reload abandona a campanha.
8. [CH-v3-browser-manifest-canary](charters/CH-v3-browser-manifest-canary.md) — Caio verifica o manifesto atual, o relatório estruturado e a retomada por nova abertura após interrupção.

Os charters anteriores continuam imutáveis como registros de suas missões de 231, 351 e 320 px. Eles não integram a matriz atual e seus debriefs e evidências permanecem nos relatórios históricos.
