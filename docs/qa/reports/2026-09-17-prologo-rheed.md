# QA Run Report — 2026-09-17 — prólogo de Rheed

- **Scope:** novo prólogo e continuidade da preparação; [plano executável](../guides/prologo-rheed.md).
- **Cadence tier:** targeted.
- **Build:** HEAD `3b5730495302e8676785e994421b3adfb4b82078` com alterações locais; manifestos e hashes registrados na execução e em verification.md.
- **Environment:** Windows/Chrome local; origem prevista `http://127.0.0.1:18726/`, perfil isolado.
- **Started:** planejamento e execução em 2026-09-17; sessões dirigidas registradas abaixo. **Status:** completed within revised scope.

## Personas

Lia (primeira expedicionária) orienta abertura e continuidade; Joana orienta teclado/leitura; Rui orienta revisão de conteúdo. São perspectivas de teste, não participantes humanos já consultados. Desktop, pt-BR, servidor local; sensores reais serão registrados por sessão.

## Flows in Scope

[Campanha nativa](../journeys/J-mz-complete-campaign.md): título → prólogo → preparação → visita/partida/recuo. [Recuperação](../journeys/J-mz-recovery-export.md): Continue do último checkpoint genuíno. [Revisão criativa](../journeys/J-mz-creative-review.md): imagem, áudio e parecer humano.

## Session Matrix & Results

| # | Charter | Journey / Scenario | Persona | Tour | Status | Issue | Fix commit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A1–4 | CH-prologo-rheed | J-mz-complete-campaign / FOR, ART visual; S01 | Lia | Feature Tour | Pass técnico; inspeção corrigida | BUG-20260917-prologo-busto-e-nome-intermitentes | |
| B1 | CH-prologo-rheed | J-mz-qa-accessibility / ACC; S02 | Joana | Feature Tour | Pass técnico; input de QA corrigido | BUG-20260917-prologo-busto-e-nome-intermitentes | |
| B2–3 | CH-prologo-rheed | J-mz-recovery-export, J-mz-complete-campaign / LOC, FOR; S03–04 | Lia | Feature Tour | Pass no candidato atual | | |
| B4 | CH-prologo-rheed | J-mz-recovery-export / LOC; save anterior | Rui | Feature Tour | Excluded by user | Compatibilidade anterior fora do escopo | |
| C | CH-prologo-rheed | J-mz-creative-review / ART visual e humano; S05 | Rui | Feature Tour | Pass within reviewed scope | Áudio confirmado pelo usuário; refinamentos visuais adiados | |

IDs completos, passos, variantes e critérios estão no guia. V-001 passa tecnicamente na task 01; V-002 teve um falso positivo visual, refutado na investigação abaixo; V-003 passa para jogos e saves desta versão, com saves antigos excluídos pelo usuário; V-004–006 têm aceite no escopo revisado, com refinamentos visuais adiados. Resultados de integração e capturas anteriores são apoio com alcance delimitado em verification.md, sem promoção para este ciclo.

## Session Debriefs

Na task 02 não houve sessão. Os debriefs da task 03 estão na seção de execução abaixo.

## What Was Fixed / Paper Cuts / Runtime Errors Observed

O diagnóstico visual foi encerrado como falso positivo. As correções de infraestrutura e sensores de QA estão registradas abaixo; não se conclui ausência de bugs fora dos percursos executados.

## Human Verifications — accepted scope

- [x] Revisão humana da abertura aceita no escopo registrado em verification.md (V-006).
- [x] Apresentação com Rheed jovem e Ivaí revisada; encaixe dos bustos e fundo do narrador adiados pelo usuário (V-004).
- [x] Usuário confirmou silêncio no prólogo e retorno da ambiência na preparação (V-005). O título não possui BGM configurado.

Os aceites são da versão jogada e têm os limites registrados no fechamento; não apenas do texto/spec.

## Decisions for a Human

No planejamento, nenhuma nova decisão de design era necessária para executar A/B1–3. PR-OLD não existe no acervo documentado; registrar lacuna de compatibilidade, sem fabricar fixture ou pedir autorização para os lotes independentes.

## Learnings

O fim do prólogo não grava checkpoint novo; formação não pode ser tratada como fixture automaticamente salva. A jornada local HTML é histórica e não foi reutilizada. Zoom nativo permanece excluído.

## Final Status

PASS para esta atualização: execução dirigida e aceite humano concluídos, falso positivo encerrado. Saves antigos estão fora do escopo e os dois refinamentos visuais ficam para uma entrega futura. As rodadas abaixo preservam seus vereditos históricos; o fechamento ao fim deste relatório é o resultado vigente.


## Execução dirigida inicial — 2026-09-17

Registro histórico: as conclusões de ausência visual nesta seção foram refutadas na revisão abaixo. As falhas e arquivos originais foram preservados.

Operador: Codex. Windows 10.0.26200, Chrome 152.0.7977.83, Node 22.21.0, porta isolada 18729, DPR 1 e escala padrão. Sem saves pessoais ou navegação omitida. Todas as entradas passaram por Jogar/arquivo/Continuar e ações públicas; observações de estado somente leitura. Os processos dos runners encerraram com registros de cleanup; nenhum servidor de terceiros foi encerrado.

### Lotes A/B1 — composição e controles

Foram coletadas as quatro variantes 1280 normal/reduzido e 1920 normal/reduzido. Sequência das nove caixas, falantes internos, limpeza de picture 60, chegada à preparação e oito heróis passaram nas asserções. HIDE/restauração por teclado e mouse, Configurações/voltar e rejeição de FAST em texto inédito foram exercitados em A1/A4. O retorno de Configurações foi por Escape; não se afirma cobertura de acesso às Configurações inteiramente por teclado.

**FAIL visual:** a inspeção encontrou busto e nome ausentes em algumas caixas, apesar de dados internos corretos. Ver [bug registrado](../bugs/BUG-20260917-prologo-busto-e-nome-intermitentes.md). Uma coleta diagnóstica de 60 quadros e a espera explícita pela janela totalmente aberta não eliminaram o sintoma; uma execução por software também o reproduziu. Não promover `executed-awaiting-review` do runner a PASS por exit code zero. Não foi necessário inspecionar todas as imagens restantes para reprovar o critério já contradito.

### Lote B2/B3 — checkpoints atuais e retorno

`B-recheck/report.json` concluiu o percurso: checkpoint inicial PR-N → interrupção/recriação completa do contexto → Continue → prólogo → preparação → nova recriação/Continue do checkpoint inicial → prólogo → conversa de Gorvak → grupo Gorvak/Elowen/Griznik → destino → partida/encontro → recriação/Continue → recuo confirmado → taverna. Os saves PR-N, PR-F-still-new-campaign, PR-D e PR-return foram capturados com payload, índice, origem e histórico de inputs genuínos.

A captura chamada PR-D corresponde ao checkpoint de revelação do primeiro encontro alcançado após Partir, não a um save na tela de seleção. PR-F confirmou que o último save continuava sendo o início da campanha. Comparação do estado restaurado foi feita antes de ler novamente o encontro. A primeira versão do caso comparava depois dessa leitura e falhou por uma conclusão de passagem adicional legítima; o caso foi corrigido, a falha preservada e B reexecutado. Nenhuma mudança de jogo foi necessária.

Capturas `hero-conversation.png` e `returned-after-retreat.png` foram inspecionadas: herói presente, taverna restaurada e sem Rheed/Ivaí residual. Não houve replay do prólogo no recuo. B4 permanece bloqueado por ausência de save antigo genuíno em formação; não há promessa de compatibilidade estrutural com saves antigos.

### Lote C — áudio coletado e limites humanos

A3 registrou WAV estéreo 48 kHz do prólogo (2,928 s, pico/RMS zero em ambos os canais) e preparação (3,019 s, pico aproximadamente 0,1074). B registrou o prólogo retomado (2,32 s, zero) e a preparação após retorno (3,021 s, sinal não nulo). São amostras de percurso técnico rápido, não leitura humana em ritmo natural. Volumes ficaram em 40/40/40/40. O título instalado tem nome de BGM vazio: a premissa do plano de ouvir música no título não é exercitável neste candidato. Não foi acrescentada música para satisfazer o teste.

Nenhuma audição humana ou aceitação de ritmo/enquadramento foi realizada. V-005 possui evidência de saída renderizada, mas continua pendente quanto ao sensor perceptivo. V-006 permanece pendente. Não solicitar aceite final de apresentação enquanto a falha visual estiver aberta.

### Infraestrutura, evidência e retomada

O executor rejeitava caminhos válidos no Windows porque verificava `../` contra resultados que usam separador Windows. Corrigido no próprio `browser-runtime.mjs` com `path.sep`; comparação Windows/POSIX de irmão/filho/raiz passou e os runners passaram a coletar. Não foi removida a proteção contra saída dentro da fixture. A otimização de recibos não possui probe Windows; todos os pedidos seguiram coleta ordinária. Não há recibo elegível para `inspect-evidence`; as inspeções ficam neste relatório e no ledger local com hashes.

Raiz local: `docs/qa/evidence/prologo-rheed/task-03/`. A1: `A1-run`, `A1-settled`, `A1-render-diagnostic`; A2: `runs/79172240-0af5-46af-a744-d43e20fef711`; A3: `runs/91a4e7d5-02c4-46b3-9150-e36c6d12a070`; A4: `runs/bdf08745-4612-42f8-b622-ec4ab9285040`; B inicial: `runs/6d20b080-8a4b-4c61-871b-16332e0594fd`; B corrigido: `B-recheck`. Diagnósticos por software: `A1-software-diagnostic` (timeout preservado) e `A2-software-diagnostic` (fluxo concluído, falha visual reproduzida).

**Veredito desta rodada: FAIL para apresentação; entrega NOT_READY.** Manter task 03 em andamento para diagnóstico/correção visual e posterior reteste. Continuidade atual foi verificada; compatibilidade antiga, audição e aceites humanos não foram aprovados. Não há commit, publicação ou card externo.


## Revisão do diagnóstico — 2026-09-17

**O desaparecimento de bustos/nome era um falso positivo da inspeção das prévias, não um defeito demonstrado no jogo.** A leitura direta dos PNGs encontrou igualdade exata em 78 regiões comparadas (retratos, nomes e restauração de HIDE), inclusive nas imagens citadas como falhas. A área 1280 × 512 acima do diálogo é idêntica entre as caixas 1 e 4 de A1-run. A investigação canvas/compositor, com e sem escala forçada, também preservou o retrato. O [registro do bug](../bugs/BUG-20260917-prologo-busto-e-nome-intermitentes.md) foi encerrado como falso positivo, mantendo o relato original e a retificação. Não se atribui uma causa específica ao mecanismo de prévias sem evidência.

Correções efetivas do fluxo de QA:

- A proteção de caminhos do executor usa o separador da plataforma; oito casos de raiz/filho/pai/irmão em Windows/POSIX passaram.
- A comparação de save fica antes de uma nova leitura do encontro (B-recheck, execução anterior retida).
- O retorno de Configurações agora mantém Escape até observar a saída da cena e libera a tecla em `finally`. Dois diagnósticos por software haviam expirado com o pulso fixo de 70 ms; a versão corrigida completou os três falantes, com transições observadas em cerca de 105–124 ms. A sincronização é pela transição, sem acrescentar espera fixa, repetição automática ou mudança no runtime.

A instrumentação temporária de 60 quadros/postrender foi retirada do caso mantido, pois não havia defeito de renderização que a justificasse. Os diagnósticos e as falhas de codificação do script durante a investigação ficam no acervo, sem serem atribuídos ao jogo. As fontes finais permanecem UTF-8.

A1 por software e A1 padrão completaram o percurso com input corrigido; o reteste A4 e a inspeção final ficam registrados no complemento abaixo. A2/A3 e B conservam seu alcance anterior: a correção só afeta a saída das Configurações. Os arquivos de produção são os mesmos da task 01. V-004–006 continuam sem aceite humano e B4 sem fixture genuína; não há afirmação de release pronta nem de suíte completa executada.


### Retestes e veredito da correção

A1 padrão (1280 × 720), A4 reduzido (1920 × 1080) e A1 diagnóstico por software completaram nove caixas, transição e controles nos três estados de falante. Evidência local: `A1-input-ack`, `A4-input-ack`, `A1-software-input-ack`. Os runners registraram cleanup completo. A auditoria final de pixels totalizou **114/114 regiões iguais** às respectivas referências; `pixel-audit.json` conserva as regiões e hashes. Os três relatórios continuam com o status de coleta `executed-awaiting-review`; esta seção registra a inspeção técnica, não altera esse status histórico nem equivale a aceite humano.

Veredito: **PASS para a correção do QA e retirada fundamentada do falso positivo visual; BLOCKED para a entrega completa**, pelos sensores humanos e save antigo pendentes. Revisão deslop e sintaxe do caso/executor concluídas; validação de caminhos passou oito casos. Nenhuma suíte completa foi executada nesta correção. A equivalência entre fixture e arquivos atuais de runtime está em `runtime-equivalence.json`; o candidato delimitado e seus hashes estão em `correction-candidate.json`.


### Tavern background refinement — validation

User review of the previous version in Chrome and RPG Maker MZ reported apparent conformity, with this sole requested background adjustment. Map002 now contains one additional native Show Picture command, copied from the existing preparation composition: picture 1, Dryland_Taverna, centered at (640, 360), 100% scale. The materialized authoring script proves all other map data unchanged and verifies black for the first six boxes, tavern for the last three. No plugin/engine/asset modification.

Fresh directed runs: A1 normal 1280×720 (`runs/a0d9b47c-1f15-4cf8-9bb8-75ef89ae6c2c`) and A4 reduced motion 1920×1080 (`tavern-A4`) under the local task-03 evidence root. Both passed their sequence/background/portrait/control assertions and reached preparation; all owned resources closed. Inspected older narration on black, Ivaí on the tavern and young Rheed’s text-only question on the tavern, including the large viewport. Collection statuses remain executed-awaiting-review; this record supplies technical inspection, not a new human judgment.

**PASS for the requested adjustment in A1/A4.** Other variant and resumed-save evidence predates the new Map002 and is not claimed fresh. A2/A3, affected recovery coverage, explicit audio listening and the full task’s remaining acceptance/old-save requirements retain their limits. Syntax and diff checks pass; no full-suite run claimed. Candidate review/deslop: retain the single native command, one-time guarded transformation, updated QA background assertion and active GDD/spec/presentation/QA records as their respective consumers; preserve previous changes separately and keep raw captures local/ignored. No commit or publication.


## Paired bust refinement — 2026-09-17

User supplied `Reed-novo.png` and explicitly requested both interlocutors on opposite sides, slightly enlarging the current speaker. Current contract: older Rheed alone/black in N01–N03; young Rheed left (picture 60) and Ivaí right (61), both attached above the dialogue on the tavern backdrop in N04–N06. Active height 480 and listening height 480/1.1, with instant scale/position updates and stable bases. Both slots and attachments are removed before preparation; no new checkpoint, prose, audio or vendor changes. This supersedes the former text-only young question and single-visible-portrait restriction.

The one-time `paired-busts.mjs` verifies that only portrait commands change, leaving all other map fields and command sequence intact. Existing IT-004 was updated because the owner-approved presentation changed; it still verifies the complete reading lifecycle and absence of both portraits on exit. First launch failed with EPIPE because the helper default points to macOS Chrome; setting DRYLAND_CHROME to the installed Windows executable resolved launch, and IT-004 passed (one selected test, not a full suite).

Fresh A1 normal 1280×720 and A4 reduced 1920×1080 directed cases passed background/identity/relative-scale/order, HIDE, Settings restoration, FAST rejection and exit checks. Reports: local task-03 `runs/f2c1a8e5-e4b8-4633-9ea1-9b27031900bf` and `pair-A4`; all owned resources closed. Inspected the alternating portraits on N04/N05, with no overlap of dialogue or each other. Collection remains executed-awaiting-review; this paragraph records technical inspection, not human framing approval.

**PASS for the paired-presentation adjustment in A1/A4 and IT-004.** New-pair approval in MZ/Chrome by the user remains pending; A2/A3 and recovery are not freshly replayed for this change. Historical audio/old-save limitations remain. Final verification/deslop: retain native Map002, supplied asset, guarded authoring script, existing canonical test and QA assertion updates, and active GDD/contracts/tracking. Preserve numbered GDD v5.0 and other working changes; keep raw captures local/ignored. No commit, publication or full-release claim.


## Fechamento do ciclo

Task 03 concluída: A1–A4 e retomada/recuo com saves atuais passaram; A2/A3/B foram reexecutados após os dois bustos. O usuário confirmou silêncio e retorno da ambiência, manteve os dois refinamentos visuais fora do escopo e excluiu explicitamente a compatibilidade com saves antigos. Os bloqueios históricos abaixo/anteriores não representam o veredito final. Fonte do resultado consolidado: [verification.md](../../../planos/tasks/prologo-rheed/verification.md#final-closure--2026-09-17). [Material selecionado](../deliveries/prologo-rheed/README.md) preserva imagens reais e amostras de áudio. Nenhum commit ou publicação.
