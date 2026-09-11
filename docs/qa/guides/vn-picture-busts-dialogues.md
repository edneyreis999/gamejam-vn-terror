# QA incremental — bustos nativos de diálogo

Este guia executa a [spec aprovada](../../../planos/tasks/vn-picture-busts-dialogues/spec.md), com critérios em [verification.md](../../../planos/tasks/vn-picture-busts-dialogues/verification.md). Complementa o [ciclo nativo](native-mz-cycle.md); não reaproveita aceite histórico como prova da nova composição. A tarefa09 registra resultados; este documento define a cobertura. O [charter](../charters/CH-vn-picture-busts-dialogues.md) usa as personas existentes.

## Ambiente e fronteiras

- Jogo: `rpg-maker/The Dryland Drowned/`, revisão `mz-20260911-busts-native-01`; Node22.23.2, Chrome instalado, vendors e12PNG originais. O manifesto de cada cópia registra os hashes realmente executados. Sem build ou serviço remoto.
- Área normal1280×720; maior1920×1080 com reduced motion. DPR1/zoom100%. Mouse e teclado reais via executor dirigido instalado. Touch/mobile e nova audição/arte final não são sensores deste incremento.
- Origem isolada `http://127.0.0.1:18727/`:18726 tem processo desconhecido preservado. Um servidor/perfil por vez. Saves de18726 não aparecem em18727. O adapter faz cópia integral, sem mutações da campanha na inspeção; encerra apenas seu servidor e apaga apenas sua cópia.
- Seeds somente antes de Jogar por `expeditionQA.setSeed`. `snapshot`/`validate` são somente leitura. Abordagens usam rótulos visíveis do GDD. Ações de fixtures de domínio não são ações E2E.
- Mapas: título1, prólogo2, taverna3, palco de história4, pastas de rotas5/6, encontros7–22, Conselho23, fechamento24–28, epílogos29–36. CE3/5–12 taverna;40/41 fluxo;42–44 perda;46–52 descoberta;53/54 Conselho;59–63 fechamento. Nenhum ator/HP nativo controla a campanha. Variáveis144–146 são projeções derivadas; não editá-las no E2E. Ordem/parâmetros globais dos plugins permanecem originais.
- Esperar prontidão nativa, não um atraso arbitrário. Capturas de transição são amostras temporais; assertions de leitura só ocorrem quando mensagem/efeitos estão prontos. `executed-awaiting-review` exige inspeção posterior.

## Lotes e retomada

| Lote | Dono / sensores | Entrada e execução | Variantes / ponto de término | Evidência retida e invalidação |
| --- | --- | --- | --- | --- |
| T | FOR / D01, V003/V004/V007 | `bust-tavern` surface; Jogar seed0, oito conversas, seleção e grupo cheio | H1–H8×quatro famílias; normal e maior/reduzido; retorno à formação | task02 diretivas07-26-27/07-29-17; novo replay09 para fonte final. Invalida CE3/5–12, helpers, owner, foco, input |
| C1–C8 | CAM/ART / D03–05/07/08, V004/V007 | oito receitas `council-*` em `tests/fixtures/council-bust-recipes.json`, em journey; produtor legal normal até Council save e final reunite | seis trios consecutivos, H7/H8, H8; Andirá; todas opiniões/epílogos; cópia nativa no final de cada prefixo | Integração IT054/061 e receitas verificadas da03 são preparação, não campanha dirigida. Invalida receita/GDD/regras/composição/save/owner |
| R1–R8 | CAM/LOC/ART / D04/05/07/08 | `bust-council-continue` journey; archive do produtor correspondente restaurado antes do boot; Continuar | maior/reduzido, final destroy; mesmos roster/history do produtor, saída até título | Mestre imutável+produtor ligados; registrar tempo de restauração, leitura do Conselho e sufixo final. Fontes/revisão/origem devem coincidir |
| I | CAM/ART / D03/05/08 | `supernatural-first-destroy` journey com observador de bustos | ambas áreas; ordem inversa, ambos amantes/recibo/montagem, final ilustrado e epílogos | D03 ordem física já emC; fonte final e inspeção dos amantes ainda necessárias |
| Z | CAM/LOC/ART / D02/04/05/07/08 | `final-sixth-solo-council` journey, receita nativa existente | ambas áreas; zero testemunhas com reservas, Andirá/Ivaí, sem epílogos; Continue terminal | Integração não substitui este Conselho0; preserva ausência de reserva/morto nos slots |
| L | ENC/CAM/LOC/ART / D02/05/07/08 | `final-sixth-total-loss` journey, receita existente | ambas áreas; oito despedidas, candidatos1/2/3, oitava morte, sem escolha/epílogo, Continue em H1 e terminal | task05/06 percurso normal08-36-01 preservado com escopo; replay09 com ledger final e variante maior/reduzida |
| U | ACC / D06, V005 | `bust-controls-tavern` surface e `bust-controls-council` journey | mouse/Tab, 1x1/3x1, cold/warm, ambas áreas; revisita legal e S | task06 normal08-52-25/08-54-30 e reduzido08-53-11/09-06-42, controles inspecionados. Alteração07 só valida alocação opcional; novo full suite cobre caminho padrão |
| S | LOC / D07, V006 | IT062/063/066 e UT069; archives genuínos05; bancoC/R final | stack observacional rotulado, helper/nested/save, projeções stale, cold image, recusa antiga/New Game, bytes intactos | task05 18/18 e archives08-19/08-20/08-30/08-35; full suite09 renova dependências runtime. Recusa antiga repete apenas se regra de revisão/load mudar |
| F | ART/LOC / D09, V008/V009 | UT070/IT067/068 em cópia técnica | quatro falantes+repetição, normal/reduzido, cold/warm, HIDE e saída; X/escala editados | task07 09-12-45 edição nativa e09-17-04 composição/temporal. Editor MZ instalado mas CUA `cgWindowNotFound`: V008 bloqueado apenas nesse sensor; não criar nova matriz de editor |
| X | ACC/LOC / D10 | IT060/064/065/066, fixtures de interrupção explicitamente rotuladas | preparing/active/focus/exit/recovery; queued work, título/New Game/transferência, pictures independentes | task06 e suíte final; mutações deliberadas somente na integração. Não descrevê-las como navegação de jogador |

Depois de cada lote, conservar falha inicial/logs/capturas e atualizar o relatório. Reparos reabrem o dono e invalidam apenas sensores dependentes. Sem pausa de aprovação; feedback humano de Lucas/Pati/João/Maria é refinamento opcional. Não publicar no Trello nem criar cards separados de QA.

## Ledger obrigatório

| Herói | Taverna profile/speech/selection/party_full | Despedida | Opinião e epílogo | Slots de Conselho exigidos |
| --- | --- | --- | --- | --- |
| H1 | T normal/reduzido | L normal/reduzido | C1/R1 |60|
| H2 | T normal/reduzido | L normal/reduzido | C1–2/R1–2 |60,61|
| H3 | T normal/reduzido | L normal/reduzido | C1–3/R1–3 |60,61,62|
| H4 | T normal/reduzido | L normal/reduzido | C2–4/R2–4 |60,61,62|
| H5 | T normal/reduzido | L normal/reduzido | C3–5/R3–5 |60,61,62|
| H6 | T normal/reduzido | L normal/reduzido | C4–6/R4–6 |60,61,62|
| H7 | T normal/reduzido | L normal/reduzido | C5–7/R5–7 |60,61,62|
| H8 | T normal/reduzido | L normal/reduzido | C6–8/R6–8 |60,61,62|

T totaliza32seções/72caixas (profile16, speech40, selection8, party_full8); são as mesmas258identidades/282caixas do catálogo, não conteúdo novo. A sequência dos trios é H1H2H3, H2H3H4, H3H4H5, H4H5H6, H5H6H7, H6H7H8. Seed1 apenas emC3, seed0 nos demais. C7 remove H6 da última composição por sacrifício; C8 remove H6/H7. Z cobre0testemunhas; C8 cobre1, C7 cobre2, C1–6 cobrem3. Não exigir slots impossíveis para H1/H2 sem mudar a ordem canônica.

Em V007 inspecionar todos os12retratos: T cobre H1–H8/Ivaí; C/R cobre distribuição de21combinações elegíveis e Andirá; I/C cobre Pérola/Floraí. Observar cada foco, faces livres, nomes/textos, orientação, camada fixa, entrada/restituição/saída e estabilidade da fala consecutiva. Máximo3x1 e fixture2x2 têm inspeção própria. Comparar amostras temporais com registros de frame/escala/tom/opacidade; foto final isolada não prova ausência de flash.

**Prisões e reflexão:** Andirá deve permanecer no reflexo de sua própria PNG e à esquerda. A ausência de deslocamento das amantes só prova que a animação não as transporta. Confirmar visualmente Pérola sobre Church e Floraí sobre Figtree: se a prisão não aparece nas artes existentes, registrar o limite de Technical Art e não marcar V007 integralmente PASS. Preservação obrigatória dos PNGs não autoriza inventar arte ou uma decisão de produto para preencher a lacuna.

## Executar e reutilizar saves

Na raiz, os wrappers materializados na spec chamam o executor instalado e preservam cada execução em diretório exclusivo:

```sh
DRYLAND_QA_PORT=18727 node planos/tasks/vn-picture-busts-dialogues/run-directed.mjs 09 bust-tavern surface
DRYLAND_QA_PORT=18727 node planos/tasks/vn-picture-busts-dialogues/run-directed.mjs 09 council-triple-H1-H2-H3-seed0 journey
DRYLAND_QA_PORT=18727 DRYLAND_QA_VIEWPORT=large-reduced DRYLAND_QA_SAVE_ARCHIVE=/caminho/real/council-checkpoint.archive.json node planos/tasks/vn-picture-busts-dialogues/run-directed.mjs 09 bust-council-continue journey
DRYLAND_QA_PORT=18727 DRYLAND_QA_BUST_COVERAGE=1 node planos/tasks/vn-picture-busts-dialogues/run-directed.mjs 09 final-sixth-total-loss journey
DRYLAND_QA_PORT=18727 node planos/tasks/vn-picture-busts-dialogues/run-isolated.mjs 09
```

O caminho de archive é substituído por um mestre realmente produzido. O produtor lê o autosave nativo de Conselho e seu índice persistido antes de escolher o final; não cria checkpoint de escolha. Arquivo inclui payload+índice, origem, revisão, hashes de fontes, roster/history e prefixo de inputs. O consumidor usa o storage original antes da primeira página e ativa **Continuar**. Nunca carregar mestre de outro roster/history ou editar o save para alcançar uma cena. Alteração relevante de fonte/revisão exige novo produtor; mudança só de driver conserva fontes do jogo, com provenance do novo driver na execução.

`terminal-checkpoint.archive.json` guarda o checkpoint nativo de ending, mesmo quando capturado depois dos créditos. Seu nome não afirma um novo checkpoint em campaign_complete. Medir separadamente prefixo/restore, Conselho/arquivo e sufixo do desfecho. A sequência final observada e a salva são registradas separadamente.

Os testes completos usam a única entrada `campaign.test.mjs`, equivalente ao glob documentado `tests/*.test.mjs`. Fixture manifests incluem arquivos não rastreados; saídas históricas dos testes são copiadas para a pasta exclusiva09. A suíte serial requer a porta livre. Não executar navegador dirigido em paralelo à suíte. Após implementação/testes, deep review sobre candidato congelado, deslop, auditoria de arquivos/evidência e preservação seletiva em `docs/qa/deliveries/vn-picture-busts-dialogues/` antecedem o veredito.

## Resultado da execução — 2026-09-11

O [relatório final](../reports/2026-09-11-vn-picture-busts-dialogues.md) registra138/138 testes e24 lotes anteriores mais quatro confirmações atuais. O [novo master e seus consumidores](../deliveries/vn-picture-busts-dialogues/post-review-lot-ledger.json) têm origem atual verificada; os oito masters anteriores continuam históricos e não devem ser importados burlando a verificação de fontes. A spec permanece bloqueada por prisões visíveis e acesso ao diálogo de comando no MZ.
