# Fogueira, vínculos e memória das perdas

Ciclo incremental de `campfire-hero-bonds`, branch `feat/campfire-hero-bonds`, base `e920095`. Autoridade: [contrato e cenários S-01–06](../../../planos/tasks/campfire-hero-bonds/verification.md). Os resultados anteriores do projeto permanecem históricos.

## Percursos e sensores

| Lote | Jornada / dono existente | Entradas e ações | Observáveis e variantes |
| --- | --- | --- | --- |
| A | J-mz-complete-campaign / ENC, CAM | Novo jogo, arquivo próprio, trio, Igreja/Parque, Vilarejo | Pausas em 2/4, avanço sem revelar próximo encontro, retorno com 1–3 presentes; fim da rota e perda total têm prioridade |
| B | J-mz-complete-campaign / FOR, ENC | Sacrificar Gorvak com Bimbren/Draska; retornar; substituir grupo; sacrificar Draska com Griznik na cidade | Duas reações em ordem; testemunhas preservadas; assuntos witness/away e first/after; camp fade repete por chegada, taverna só por primeira volta |
| C | J-mz-recovery-export / LOC | Reabrir página e Continuar usando exclusivamente o arquivo criado no lote | Entrada, reação concluída com outra pendente, conversa interrompida/concluída, saídas; nenhum consumo duplicado |
| D | J-mz-qa-accessibility, J-mz-creative-review / ACC, ART | Teclado/mouse, HIDE, Options, idioma/mute, movimento reduzido | PT/EN 1280×720 e 1920×1080; descoberta/NEW separados; Fire1 sozinho e restauração de contexto; julgamento humano separado |

As combinações de IDs de pares, validação, morte, ordem e persistência pertencem às suítes canônicas formation/retreat/encounters/persistence/native-checkpoints. Não duplicar aparência em testes. Sob G006, repetir o navegador somente para fases ou sensores não equivalentes. F-001 mantém a leitura do Talk antigo sujeita ao próximo save normal. Gamepad, zoom e mobile fora do escopo.

## Preparação e execução

Usar `request-evidence.mjs` da skill instalada com os requests em `planos/tasks/campfire-hero-bonds/`. O adapter prepara uma cópia isolada do candidato podado, origem/perfil novos e Chrome próprio. Não usar saves do usuário, injetar estado ou forçar seed. `directed-campfire.mjs` cobre progressão/conversa; `directed-losses.mjs` cobre perdas, testemunhas e retomada. As asserções leem estado; todas as decisões usam teclas/pointer públicos.

Superfícies: Map045 (fogueira), Maps037–044 (heróis), CE357–359 (chegadas), CE360–375 (reações), CE040/044/067 (despacho/save/áudio). Variáveis216–220 guardam contexto/tópico/unidade/reação/tom; switches49/50,52,61–70 são consultas/presentação, nunca atalhos de QA. O domínio persiste as fontes de verdade. Plugin de indicadores depois de MessageCore, Presentation e EventBridge.

Cada request conserva fontes, hashes, entradas, origem, navegador, imagens, storage próprio e teardown em `docs/qa/runs/campfire-hero-bonds/`. Inspecionar os PNGs após coleta; exit0 não significa aceite visual ou humano. Ler erros e cleanup de todos os runs, inclusive falhas. Fechar apenas os recursos criados pelo executor.

## Revisão e retomada

O [relatório](../reports/2026-10-16-campfire-hero-bonds.md) mantém cada lote e lacuna. Alterações em lista nativa invalidam cursores/saves afetados; texto invalida revisão editorial e apresentação; regras invalidam transições; indicadores invalidam inspeção de controles. Evidência funcional de caminhos não afetados pode ser retida com justificativa, nunca ampliada.

Momento demonstrável para devlog: ausência e reação na fogueira → assunto Sobre o companheiro na taverna, com NEW independente. Capturas candidatas ficam nos runs; promoção/organização final segue o aceite. Edney decide vozes/PT/EN/revelações/interesse e fadiga; Pati/usuário decide descoberta/legibilidade; Lucas/usuário decide composição; usuário decide mix/transições.

## Presentation refinement (2026-10-16)

Registered `CAMPFIRE-DIR-PRESENTATION-FIRST`, `CAMPFIRE-DIR-PRESENTATION-LOSSES`, and `CAMPFIRE-DIR-PRESENTATION-REDUCED` reuse the existing public-input journeys with a read-only temporal observer. Requests and cases are under the spec directory. FIRST covers camp + guest continuity at EN1280; LOSSES covers grief/About and 180-frame camp absences at EN1920; REDUCED selects Portuguese through the native tavern Menu/Options and repeats the camp path with reduced motion. The observer records composition before input and continuous presence across reading segments. Its evidence is local/ignored and final visual/editorial judgment remains human.
