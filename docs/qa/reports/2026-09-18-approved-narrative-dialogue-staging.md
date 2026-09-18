# QA — narrativa aprovada e encenação de diálogos — 2026-09-18

**Estado atual: PASS; tarefas01–10 concluídas e resultado visual aceito pelo usuário.** Artes rústicas de confinamento implementadas e verificadas em IT-052/053; audição e captura do editor dispensadas expressamente pelo usuário. O usuário respondeu “Perfeito” às artes entregues; human_accepted e release_ready agora true no escopo da spec. Os resultados/bloqueios anteriores abaixo são históricos; o fechamento no fim registra a retomada atual.

## Escopo, fontes e ambiente

Base Git `82aad84dd5df2376e18d53720747fae8d8c0e9ac`, candidato local sem commit. Fontes conferidas antes da integração: PR15 `537b7e825d695799033223810c7429d190f30172`, PR16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c`, PR17 `85fc7b03f932337d2daaa100dc830c9b6e0c307d`, PR18 `2f91f94610ea27671d2bfeb9b5e4bf16abe718de`, PR19 `daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8`. Engine, vendor, ordem de plugins e dependências preservados; parâmetros/ativação compõem as mudanças aprovadas.

Plano: [guia do ciclo](../guides/approved-narrative-dialogue-staging.md). Execução pelo adapter instalado, Chrome, cópias e perfis temporários, origem18727; testes canônicos em18726. Campanhas dirigidas usam somente teclado/mouse e inspeção somente leitura. Fixtures técnicas não são campanhas jogadas. Sem gamepad, conforme ADR-G005.

Raiz local: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/`; evidência canônica conserva `docs/qa/evidence/init-rpg-maker-mz/`. Reports registram versões, hashes, inputs, saves, áudio/vídeo e teardown. O aviso `incomplete-dependencies` do lookup levou à coleta ordinária; nenhum cache é alegado. Evidências brutas são locais/ignoradas, não prometidas por um clone novo.

## Resultado técnico

- Agregado: `node --test rpg-maker/tests/*.test.mjs`,3388.591s,exit1. Dos134 casos canônicos,125 passaram e9 falharam. O TAP inclui dois filhos falhos de IT-078:136 testes,125 PASS/11 FAIL. Snapshot dos134 registros em `task-08/aggregate-before-final-fixes/`, log `task-04/canonical-aggregate-corrected.log`. O `execution.json` parental de IT-078 dizia PASS apesar dos filhos; esse registro não foi aceito, e o TAP prevalece.
- Reteste de13 donos:980.071s,12 canônicos PASS e IT-058 cancelado pelo limite240s;16 PASS incluindo os quatro filhos. Log `task-04/final-affected-canonical.log`, registros em `task-08/affected-before-credit-budget/`. IT-005 passou nos dois perfis; IT-081 verificou indicador/estado em112 caixas das visitas; IT-054 executou de fato HIDE no Conselho normal/reduzido/solo.
- IT-058 percorreu os oito epílogos e seis modos de crédito, chegando ao último, `long`,11s antes de esgotar240s. A espera pelo segundo bloco ainda estava em progresso. Orçamento total ampliado para300s, mantendo velocidade nativa,80linhas, todas as assertivas e limites locais. Reteste isolado PASS em216.002s (total216.408s), exit0, sem falha/cancelamento: `task-04/final-credit-budget.log`. O timeout anterior continua registrado. Ledger final por caso/log/hash em `task-08/final-composite.json`.
- O delta de runtime posterior ao agregado é exatamente uma mudança de formatação em Map044 e três Erase Picture63 em CE263–265. A inversão reproduz os hashes anteriores byte a byte (`task-08/final-repair-delta.json`). Rules, providers, imagens, áudio e outros eventos não mudaram. Resultados retidos conservam seu alcance; os sensores afetados foram repetidos, conforme ADR-G006.

Comando focado: `node --test --test-name-pattern='^(IT-(001|005|007|025|049|051|054|058|069|078|081)|UT-(041|055)) —' rpg-maker/tests/campaign.test.mjs`. Reteste final: `node --test --test-name-pattern='^IT-058 —' rpg-maker/tests/campaign.test.mjs`.

A consolidação fonte/nativo cobre seis unidades/nove caixas do prólogo,30 sucessos, dois fechamentos, sequência do Conselho, três finais e oito epílogos/17páginas/oito artes. B3–B8 e prosa não fornecida permanecem preservados. Os testes nativos cobrem48 abordagens/96resultados, limites solo/coletivo, elegibilidade e20 limites de save em dois arquivos. Buffers e volumes passam tecnicamente; isso não é audição.

## Campanhas e Continue do candidato final

Todos os11 lotes terminaram com exit0, zero errors e todos os recursos registrados fechados. As quatro campanhas conservam `executed-awaiting-review` no report bruto; a inspeção abaixo qualifica seu resultado sem editar o coletor para inventar aceite. Os sete lotes Continue são PASS. Ledger em `task-10/final-lots.json`.

| Percurso/limite | Run | Resultado |
| --- | --- | --- |
| Normal, Igreja→Parque, reunir, créditos naturais, Continue | `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df` | Percurso executado; julgamento separado abaixo |
| Reduzido, Parque→Igreja, destruir, arquivo2 preservando1, créditos por mouse | `b4ad6187-11b6-4351-a514-86cf61472a71` | Percurso executado; julgamento separado abaixo |
| Reduzido, oito sacrifícios, perda total, memorial e Continue | `6202e7c0-ec52-4fa8-996f-01beda746e11` | Percurso executado; julgamento separado abaixo |
| Destruir por teclado a partir do mesmo pai de reunir | `eee3c777-0d45-41a9-9eea-4a48f29e39ef` | Percurso executado; julgamento separado abaixo |
| Continue: abertura | `50146209-f680-41cf-8edd-124e95aa43e8` | PASS de continuidade |
| Continue: resultado e próximo sorteio comparado ao pai ininterrupto | `0fed6c95-716d-40dc-8873-5907cd4e0f76` | PASS de continuidade |
| Continue: recompensa anterior ao primeiro fechamento | `905917df-79e1-4d3e-aa23-fe32cad2c336` | PASS de continuidade |
| Continue: recompensa anterior ao segundo fechamento | `418233f8-5f4e-4ee4-b09b-a1fe30f96a34` | PASS de continuidade |
| Continue: recompensa do medalhão | `6d8e1512-3ad5-404b-bdc5-14b3e4b061ef` | PASS de continuidade |
| Continue: encerramento | `f7287a9e-ec96-4db9-a47f-9e29b6563eaa` | PASS de continuidade |
| Continue: isolamento dos dois arquivos | `d8693985-8e5f-46f7-ad36-446c4e1d0869` | PASS de continuidade |

A campanha normal durou355.882s; a inversa reduzida367.458s; perda reduzida151.040s; filho destruir31.982s. Houve uma cadeia fresca completa da abertura aos créditos naturais. Arquivo1 foi comparado byte a byte antes/depois do arquivo2. O pai `final-choice.archive.json` é o checkpoint real `council.02`, na recompensa do medalhão: Continue repete legitimamente a leitura restante antes da escolha. Não foi criado save artificial na decisão.

Continue usa payload/index efetivamente concluídos, importados sem edição antes do boot. Abertura, resultados, recompensas, encerramento e isolamento dos arquivos foram comparados após o próximo input. No resultado de uma caixa, COMPLETE_PASSAGE seguido de ENTER_DUNGEON deve reproduzir todo o próximo estado observado no pai ininterrupto, incluindo RNG/sorteio; nenhum CHOOSE_APPROACH é repetido. As campanhas dirigidas finais usam saves novos após os reparos de runtime, sem reutilizar pais invalidados.

## Correções e primeiras falhas

| Achado | Correção e evidência atual |
| --- | --- |
| F-01: HIDE apagava retratos anexados | Autoria remove anexação no prólogo/fechamentos/Conselho e converte Y local para global(+512), mantendo enquadramento; vendor intacto. Sensores e imagens confirmam cena preservada durante HIDE. |
| F-02: guard de IT-054 não alcançava o sufixo de perfil | `startsWith('IT-054/')`; reteste PASS e nove capturas HIDE realmente geradas. O PASS antigo não foi usado como prova desse sensor. |
| F-03: indicador cortado na descrição de Draska | `<br>` no próprio401, sem palavra/caixa nova. IT-081 PASS e staged72 final aberto nos dois perfis por executor/revisor. [Bug do indicador](../bugs/BUG-20260911-pause-indicator-clipped.md) resolvido nos conteúdos atuais; epílogos também receberam quebras nativas e foram verificados. |
| F-04: IT-078 esperava concluir uma unidade na primeira caixa | Mantém o estado da unidade e exige o segundo marcador após uma confirmação mantida. Dois perfis PASS. IT-025 recebeu a mesma correção de contrato. |
| F-05: Ivaí persistia nos encontros reduzidos | Erase Picture63 depois da saída/espera opcional em CE263–265. IT-005 e percursos finais demonstram limpeza nos três limiares e oito despedidas. [Bug](../bugs/BUG-20260918-reduced-motion-portrait-leak.md) resolvido. Mapas037–044 já tinham seu cleanup; não receberam duplicação. |
| Outros sensores antigos | IT-001 inclui AttachedPictures aprovado; IT-058 exige ilustração/ausência de bustos e todas as caixas; UT-041/055 usam IDs válidos atuais. `returnToTavern` espera menu ativo antes de agir; IT-007/049/051/069 passaram, sem sleeps ou avanço de texto especulativo. |

Primeiras falhas preservadas: HIDE no run `41684d79-84a1-43eb-86c9-21a86c6ef5ba` (`first-failures/hide-1.png`, `hide-7.png`); Draska em `df0e5eb0-40ca-4e21-be4f-82b713285308/staged-72.png`; vazamento reduzido em `cb15050f-ef51-464c-bd6d-8bee3ff62cbd`, inclusive `visual/farewell-motion-reduced/`. As campanhas intermediárias `df0e5eb0…`, `4c27fc9c…` e filho `0b7867fb…` são históricas, substituídas pelos pais finais. A perda normal `64e9e072-a353-4e78-bdce-8f7d358fee9c` conserva validade para a apresentação normal das oito despedidas, cujos comandos/assets não mudaram.

Os ensaios antigos de Continue `bbbc1877…` e `7429f2ce…` falharam por premissas incorretas do sensor; `39c3bd6c…` validou a correção usando o pai original. Agora os sete limites foram recolhidos com pais finais. A coleta de formação `6fe022a7…` falhou por faltar `limits` no retorno do verificador; suas imagens foram identificadas como imagens observadas, sem relabelar o run. As campanhas finais repetem todos os ramos com capturas estáveis.

## Inspeção visual e controles

Revisão independente: [deep-review.md](../../../planos/tasks/approved-narrative-dialogue-staging/deep-review.md), com hashes e alcance. O executor abriu fontes/quadros reais; não inferiu qualidade apenas da existência de screenshots.

- Prólogo/fechamentos/Conselho: Rheed velho colorido e isolado sobre preto; retorno ao elenco passado; HIDE mantém retratos e restaurar não avança texto. Entrada, destaque, escurecimento, saída e mudança de época foram vistos em sequências do vídeo real, amostradas a10fps, separadamente dos quadros estáticos. Proveniências em `visual/motion-normal/` e `motion-reduced/`. A amostragem não certifica conforto subjetivo nem som.
- Heróis: menu/conversa/despedida dos oito personagens, normal/reduzido, e ramos de seleção/remoção/recusa com grupo cheio. As novas capturas aguardam duração/tom/opacity e namebox; a tolerância1e-6 trata o valor real254.99999999999997, não encobre retrato apagado. Draska e todas as seleções/recusas finais foram abertas. Nomes, rostos, texto e controles ficam legíveis; estaturas e silhuetas preservadas.
- Conselho:58 quadros do IT-061 abertos pelo executor —21 opiniões e8 confissões por perfil nas oito receitas legais de1/2/3 participantes. `visual/council-recipes/` contém folhas/ledger. Não há rostos cortados ou sobrepostos; foco e nomes correspondem ao falante. Map023, CEs pertinentes, imagens e parâmetros são byte-equivalentes ao candidato final. Andirá aparece no reflexo à esquerda, e Irati vem depois das opiniões. Fixtures são evidência nativa, não percursos jogados.
- F-05: `visual/final-threshold-reduced/three-routes.png` mostra os três limiares e seus encontros sem Ivaí; `contact.png` mostra sua remoção antes da transferência, em vídeo. `visual/final-farewells-reduced/all-eight.png` mostra somente cada falante; `motion.png` mostra saída instantânea antes do contexto de morte. Todos foram abertos. A variante normal gradual já foi vista em `visual/farewell-motion-normal/`, sem alteração posterior dos comandos de despedida.
- Epílogos:16 artes com HIDE abertas e comparadas às bordas das fontes; imagem inteira, proporcional, centralizada e sem bustos. Todas as páginas dos oito heróis foram reinspecionadas nos dois perfis após `<br>`, com indicador dentro da janela. Folhas `visual/corrected-H*-text.png`; para H1 somente a entrada29 pertence ao caso atual, entradas4/30 são históricas e excluídas.
- Controles: teclado/mouse, HIDE, Settings, seen FAST, confirmação mantida e limites de escolha foram exercitados nativamente e em campanhas. Os mesmos estados/textos retornam; não há confirmação dupla, checkpoint de visita ou marca de leitura parcial indevida.

## Bloqueios externos anteriores — resolvidos ou dispensados na retomada

1. **Prisão das amantes — V-004.** [Bug conhecido](../bugs/BUG-20260911-lovers-prison-not-visible.md): enquadramento44% foi corrigido, mas Pérola/Floraí continuam figuras livres sobre igreja/figueira. Não há pedra/raízes de oclusão nos assets preservados. O contrato exige confinamento visível e proíbe nova arte/gramática de máscara neste incremento. É necessária decisão explícita de escopo/composição; nenhuma dispensa foi inferida. Refinamentos solo e incoerências de armadilhas expressamente adiados não são bloqueios novos.
2. **Audição real — V-006.** WAVs capturam o som emitido. Buffers/volumes, mute e restauração têm prova técnica; no percurso intermediário reduzido, welcome2.06s tem peak0 e o trecho seguinte recupera sinal após restaurar40. Isso não avalia a mixagem. Uma tentativa concreta de enviar2s de WAV real pelo helper retornou `audio content omitted because you do not support audio input`. Não houve listener nem julgamento auditivo. Os WAVs dos runs finais permitem a escuta pendente, sem reabrir a escolha de cues já delegada.
3. **Evento real no editor — captura de devlog.** CUA iniciou o MZ, recebeu timeout e depois `cgWindowNotFound`. Processo próprio36314 encerrado; Steam/janelas pessoais preservados, nenhum save pelo editor. IT-067 comprova edição estrutural/reexecução nativa e passou; metadados de comandos não foram alterados. Isso atende o sensor técnico condicional de autoria, mas não substitui a imagem real exigida para o devlog.

## Candidato, recursos e Git

Auditoria proposta em `task-08/candidate-audit-final.json`: cada caminho tem dono/disposição, links resolvem a arquivos rastreados/selecionados, alterações preexistentes são identificadas e não recebem aceite de produto por associação. ADRs G004–G006 são pré-requisitos locais do usuário; precisam acompanhar qualquer seleção que os referencie. Diagnóstico temporário fica diferido. Sem arquivo ausente, mudança de engine/vendor ou nova dependência nos checks realizados.

Sem stage, commit, push, merge, Trello, mensagem remota ou publicação. Índice preservado. Organização definitiva e mídia selecionada de entrega aguardam aceitação compatível; não se arquivou ou excluiu material. Os11 reports finais registram teardown completo; o reteste isolado de IT-058 também encerrou seus recursos. Portas18726/18727 sem listeners; `git diff --check` PASS. Fingerprint final76 arquivos `c947986e39abdc80e24a80ec1d8961d283065848768ad9c2f1266f059bd9772a`. A conclusão da revisão de código não dispensa os três bloqueios acima.

## Retomada concluída — confinamento rústico, 2026-09-18

**Execução técnica da task10: completed.** D-019 autoriza os dois PNGs e a direção refinada pelo usuário: Pérola é pedra rústica erodida que apenas sugere uma anã; Floraí é figueira antiga cuja madeira sugere um elfo genérico. Sem rosto detalhado, roupas ou aparência viva. A primeira versão com corpos reconhecíveis foi substituída, e suas evidências são históricas em `pre-art-direction/`.

D-020 aceita o áudio como pronto para esta entrega, com eventuais ajustes pelo usuário: audição **dispensada**, sem alegação de escuta. D-021 aceita a captura do editor como pronta para a entrega, com produção manual posterior pelo usuário: captura **dispensada**, sem imagem de editor fabricada. São decisões do usuário, não PASS de sensores ausentes.

Runtime alterado nesta retomada: somente oito argumentos `PictureName:str` nos CEs293/295/297/299 e dois PNGs transparentes de1024×1536. Originais intactos; escala44%, posição960/454.664, timing, foco, texto, áudio, regras, plugins e saves preservados. A inversão das oito referências reproduz byte a byte CommonEvents anterior: SHA256 `92bdfabfa6134c4efb6327b7978c28b0708ca457e523282d67296429211c2970`. Isso conserva o alcance dos percursos dirigidos anteriores e dos132 casos não afetados; não os transforma em capturas da arte nova.

Validação final: `node --test --test-name-pattern='^IT-05[23] —' rpg-maker/tests/campaign.test.mjs` — **2/2 PASS**,197.376s. IT-052/053 cobrem as duas ordens, diálogos warning/second, recompensa única, saída e Continue. A cobertura existente foi estendida para HIDE com preservação de retrato/texto/estado e capturas1280×720 normal/1920×1080 reduzido. Não há novo caso nem mock. Imagens reais foram abertas e inspecionadas: material integrado, sugestão do rosto acima da janela, transparência, bordas, leitura e HIDE. São fixtures de engine real, não novas campanhas dirigidas. Evidência local: `docs/qa/evidence/approved-narrative-dialogue-staging/confinement-20260918/`; capturas selecionadas em `docs/qa/deliveries/approved-narrative-dialogue-staging/confinement/`; prompts, origem e hashes em `rpg-maker/asset-provenance/approved-narrative-confinement.json`.

V-004 passa no escopo visual delegado; V-005/007 preservados e fronteiras afetadas revalidadas; V-006 conserva PASS técnico com audição dispensada. Nenhum bloqueio de implementação ou sensor obrigatório permanece sob D-019–021. A revisão criativa final do novo resultado pelo usuário ainda não foi registrada: não se infere aceite humano das novas imagens a partir da autorização de geração. `implemented`, `static_verified` e `runtime_verified` ficam true; `human_accepted` e `release_ready` permanecem false até esse aceite. Isso é distinto do encerramento da execução das dez tarefas.

Auditoria final/deslop: manter os dois assets usados, script de mutação local, teste canônico, proveniência, decisões atualizadas e quatro capturas selecionadas com manifesto. Originais e históricos preservados; nenhum arquivo alheio removido ou organizado por associação. Nenhuma dependência ou mudança de engine/vendor. Sem stage, commit ou publicação. Recursos dos testes encerrados.

## Aceite final — 2026-09-18

O usuário respondeu “Perfeito” após receber as artes rústicas integradas. Candidato e inputs dos dois testes nativos continuam equivalentes aos verificados; aceite registrado em [verification.md](../../../planos/tasks/approved-narrative-dialogue-staging/verification.md#release-verdict). As cinco flags são true para esta spec. Audição e captura do editor permanecem dispensadas, para trabalho posterior do usuário. Capturas selecionadas e proveniência mantidas, históricos preservados, nenhum commit/publicação realizado. Esta seção supersede a pendência de aceite registrada no fechamento anterior.
