# Revisão independente — integração narrativa e encenação

Data: 2026-09-18. Revisão somente leitura por `/root/staging_review`, solicitada pelo executor segundo `rpg-maker-mz-deep-review`. Base: `82aad84dd5df2376e18d53720747fae8d8c0e9ac`; candidato: working tree, sem commit. Não houve navegador, teste pesado, mutação do jogo, staging ou publicação nesta revisão.

## Veredito atual — fechamento independente final

**FIX_BEFORE_SHIP para a entrega completa**, pelos bloqueios conhecidos de visibilidade das prisões, audição indisponível na ferramenta e edição nativa não demonstrada. Esses limites não reabrem design/conteúdo nem pedem nova aprovação. **F-01 a F-05 estão resolvidos no recorte revisado**: correções inspecionadas, renders relevantes conferidos e sensores canônicos afetados revalidados. Nenhum novo defeito de implementação foi encontrado no fechamento.

Os13 casos canônicos afetados estão validados pelo lote final de12 aprovados mais o reteste isolado IT-058 aprovado; o timeout histórico continua preservado. Os11 lotes dirigidos finais encerraram sem errors e com cleanup completo; quatro mantêm status de execução `executed-awaiting-review` e sete Continues têm `pass`. A inspeção visual deste revisor limita-se ao ledger explícito abaixo; não certifica audição, prisões ou editor.

Fingerprint final exato: `c947986e39abdc80e24a80ec1d8961d283065848768ad9c2f1266f059bd9772a` (76 arquivos; único delta desde a rodada estática anterior é o orçamento de IT-058 de240s para300s). As rodadas antigas permanecem históricas e são superadas pelos estados explícitos nos adendos. Este parecer não concede SHIP ou aceite humano integral.

## Veredito — rodada inicial (histórico)

**FIX_BEFORE_SHIP para a entrega completa.** Um defeito de integração foi confirmado por rastreamento estático: F-01, os retratos anexados à janela são ocultados junto com a interface no HIDE. A manifestação foi confirmada nas capturas dirigidas indicadas no adendo abaixo. O bloqueio visual já registrado em [BUG-20260911-lovers-prison-not-visible](../../../docs/qa/bugs/BUG-20260911-lovers-prison-not-visible.md) continua pertinente ao contrato aprovado de Pérola/Floraí. Sua correção ou uma decisão explícita de escopo ainda é necessária. Os sensores dirigidos, de movimento, visuais e de escuta em andamento permanecem na [verificação](verification.md); sua ausência não foi classificada como bug de runtime.

O parecer sobre o código/dados exige corrigir **F-01** e fechar os sensores já previstos. Este documento não concede aceite visual/humano nem substitui os resultados do executor. Revalidar o fingerprint após qualquer mudança dos caminhos revisados.

## Autoridade e limite

Lidos: AGENTS.md; GDD canônico (trechos aplicáveis de direção, Conselho, epílogos e prólogo); índice ADR G004–G006; spec aprovada, contratos de Programação/Narrativa/Technical Art/UI/UX/Áudio e verification.md, incluindo S-01–S-11; scripts materializados e notas relevantes de execução. A ordem fonte PR15–19 e as decisões D-008/017/018 foram respeitadas: não pedir variação solo, completar B3–B8, reescrever inconsistências aceitas, migrar saves antigos ou criar artes de final.

Alterações preexistentes do usuário em AGENTS, GDD, memórias, índice ADR, README QA, spec e retomada são autoridade/contexto, não produção atribuída ao executor. A revisão de implementação cobre todos os caminhos runtime/data/plugins/assets/provenance/tests/qa modificados/adicionados e as oito fichas narrativas. O caso task-10-directed.mjs foi lido como preparação de QA ainda em execução; não recebeu certificação de execução.

## Cobertura por arquivo e lente

Todos os nomes individuais estão no manifesto abaixo. Os grupos abreviados são intervalos inclusivos, não amostragem.

| Caminhos / proprietário | Lentes e rastreamento | Resultado |
| --- | --- | --- |
| `js/plugins.js`; Programação | Cinco valores alterados: anchor Y, duas escalas, ativação AttachedPictures, lista automática vazia; ordem e demais parâmetros preservados. | Sem achado. |
| `js/plugins/Dryland_CampaignRules.js`; domínio | Seis identidades do prólogo; fechamento derivado de peças; `dungeon_complete`; entrada/validação pelo mesmo councilPlan; medalhão; opiniões H1–H8; Irati ao final; final/epílogo elegível. | Sem achado. |
| `data/Map002.json`; eventos | Nove caixas/seis conclusões; fonte PR19; fala Ivaí/Rheed jovem; anexação explícita; retirada antes da taverna; áudio e preferência de movimento. | F-01: HIDE herda a escala zero da janela; movimento depende do sensor. |
| `data/Map007.json`–`Map016.json`; eventos | Cada uma das 30 abordagens, somente sucesso; gramática de escolha e ReadingComplete; mesma imagem; caixas intermediárias. | Sem achado; comparação estrutural integral. |
| `data/Map023.json`; eventos | Atualização de consultas, cortes presente/passado, limpeza de attachments, atores efetivos, Andirá, opiniões, Irati, escolha e checkpoints. | F-01 nas unidades de Rheed. |
| `data/Map025.json`–`Map027.json`; eventos | Nove parágrafos em seis unidades, rotas exclusivas, arte existente, limpeza de bustos, prioridades BGM/BGS/ME. | Sem achado. |
| `data/Map029.json`–`Map036.json`; eventos/arte | Oito associações, 17 páginas, uma conclusão por herói, HIDE, imagem centralizada proporcional, nenhum busto. | Sem achado estático; inspeção visual é independente. |
| `data/Map037.json`–`Map044.json`; eventos | Entrada, foco por personagem, menu, seleção/retirada, grupo cheio, saída de Ivaí e retorno; IDs 82–113 e todas as ações/falas preservados. | Sem achado. |
| `data/CommonEvents.json`; eventos/áudio | CE067; CE068–071/073/074/079; CE263–265; CE282–289; CE293/295/297/299; CE302/303; novas CE352/353. Os demais records permanecem iguais. | F-01 em CE352/353; prisão das amantes é bloqueio conhecido. |
| Onze arquivos de imagem e dois manifests de provenance; Technical Art | Hashes diretamente contra blobs fixados, tamanhos, nomes, pixels da conversão BMP, escala whole-image. | Correspondência estática confirmada. |
| `docs/narrativa/herois/Ficha_H1_Gorvak.md`–`Ficha_H8_Draska.md`; Narrativa | Somente campo de epílogo ampliado e referência de fonte; 17 páginas e citação Draska preservadas. | Sem achado. |
| `tests/fixtures/approved-closing-source.json`, `approved-trap-successes.json`; testes | Oráculo extraído exclusivamente das fontes fixadas, separado dos mapas; contagem e associação. | Sem achado. |
| `tests/fixtures/boundary-recipes.json`; testes | Todas as decisões históricas mantidas; acréscimo de avanços semânticos e renumeração de sequência; anotação de origem. | Sem achado. |
| `tests/helpers/formation.mjs`, `native-reading.mjs`, `native-bust-fixture.mjs`; testes | Nove marcadores; extração do corpo até ReadingEnd; sprite real anexado versus normal, bitmap e postrender; limite da geometria. | Sem achado; geometria não prova prisão/reflexo ou qualidade visual. |
| `tests/suites/content.mjs`, `native-boot.mjs`, `native-inventory.mjs`; testes | Consumidores do prólogo atualizados; autoria local ainda editável; inventário e finalização semântica. | Sem achado. |
| `tests/suites/encounters.mjs`; testes | Oráculo fonte por resultado; avanço de cada caixa; estado inalterado no corpo e consequência única. | Sem achado. |
| `tests/suites/discovery.mjs`; testes | Ambas as ordens, ambas as closures, checkpoints antes da narração, Continue e concessão única. | Sem achado. |
| `tests/suites/endings.mjs`; testes | Plano independente, texto de fonte, cast por passagem, ambas as preferências, slots e heróis, whole-image, término único. | Sem achado. |
| `tests/suites/native-audio.mjs`; testes | BGM/BGS presente/passado, aplauso original uma vez, mute e precedência dos temas. | Sem achado; descritores/buffers não equivalem à escuta. |
| `tests/suites/native-checkpoints.mjs`, `persistence.mjs`; testes | Payload e índice reais, dois arquivos, recompensa/medalhão, próximo input, múltiplas caixas e história de leitura. | Sem achado; fixtures corretamente separadas de campanha dirigida. |
| `qa/native-journeys.test.mjs`; QA | Único delta é exportar finishCredits para reutilização pelo caso dirigido. | Sem achado. |

## Rastreamentos críticos

1. A última passagem lover mantém a concessão idempotente da peça; seleciona `closure.first/second` pela contagem já comprometida. CE044 conserva o checkpoint de recompensa. CE303 chama diretamente CE352/353; cada helper captura seu próprio contexto, encerra uma unidade após todo o texto e não concede recompensa. A conclusão volta para Irati ou revelação, sem nova fase/contador/checkpoint. A validação exige uma ou duas peças para a closure correspondente. O guard inicial de validateState já rejeita mapPieceIds não-array; a nova leitura de length não introduz exceção nesse caminho.
2. `councilPlan` é compartilhado por entrada e validação. `council.01` preserva o medalhão e seu checkpoint; `.02` restaura o elenco elegível; `.03` e challenge/solo conservam Rheed sozinho. Confissão retorna ao passado, Andirá e opiniões seguem suas rotinas existentes, Irati limpa elenco e permanece documento. O laço consulta novamente o estado antes da próxima unidade. Prosa coletiva no solo é limite aceito, não personagem adicional.
3. O bridge/presentation/engine/providers não mudaram. Não foi adicionado estado duplicado, migration/version gate, dispatcher de texto ou restauração por replay. Saves serializam as listas nativas correntes; o escopo de compatibilidade continua sendo arquivos produzidos nesta versão.
4. O inventário recursivo encontrou 105 comandos Basic_EnterBust em dados nativos, todos nos owners revisados. Upper Left do prólogo/Rheed não herda o anchor Bust. Os demais consumidores têm escala/posição explícitas calibradas. As sete rotinas do Conselho só alteram Y e retiram alvos da vaga 64 sem produtor. A escala/palco restante não foi confundida com coordenadas CSS.
5. CE067 deriva a época da passagem e substitui BGM/BGS. Applause1 está apenas no caminho original do prólogo, não na restauração/contexto recorrente. O fim desliga BGM/BGS antes de ME, conservando o guard existente da variável64. Nenhum código de volumes foi alterado.

## Verificações independentes realizadas

Inspeção do diff e leituras estruturadas em Python, sem executar transformações de autoria. Os 31 mapas alteram somente event001/page0/list; demais campos, páginas e eventos são iguais à base. Nos dez mapas de encontros, remover apenas os spans 101/401 dos sucessos deixa listas exatamente iguais à base. Maps017–022 são byte-idênticos. Nos oito mapas de heróis, falas, escolhas, ações, consultas e identidades de leitura são iguais à base.

As nove caixas do prólogo são comandos 101/401 exatamente iguais ao PR19. Os 30 itens do fixture de sucessos conferem com o hash do blob e a posição 1/2/3 da respectiva fonte PR18. As receitas mantêm todas as decisões após excluir somente ADVANCE_TEXT e expectedSequence; a diferença restante é a anotação documental prologueRevision. Os IDs da array CommonEvents preservam sentinel null e records nativos com id igual ao índice.

Onze imagens foram confrontadas diretamente com os blobs fixados: as três da abertura e sete PNGs dos epílogos são byte-idênticas; Liora BMP→PNG tem mesmos pixels RGBA e dimensões. Os dois hashes dos textos PR15 do manifest conferem. As oito escalas equivalem a min(1280/largura,720/altura), com origem central. JS alterado se limita a plugins.js e CampaignRules; nenhum engine/provider, áudio binário ou dependência mudou.

Uma asserção exploratória de comparação integral das receitas inicialmente falhou por incluir a nova anotação documental prologueRevision; o diff estruturado mostrou apenas essa chave. Repetida excluindo a chave de proveniência, a verificação das decisões passou. Isso não é falha do produto.

## Achados e riscos residuais

### F-01 — HIDE remove os retratos da própria cena (P2, confiança alta)

**Gatilho e impacto:** usar HIDE/Tab com Rheed velho nas closures, no Conselho ou no prólogo, ou durante o diálogo jovem/Ivaí. A cena presente fica totalmente preta; no passado os dois participantes desaparecem, embora o fundo fique. O jogador perde a possibilidade de contemplar a composição que o recurso deveria revelar. Não há perda de estado nem falha na restauração; é um defeito visual de integração.

**Evidência estática:** Map002/event001/page0/list comandos23 e117 anexam picture60 ou60/61; Map023 faz MessageAddPicture60 nas unidades `.01/.03/challenge/solo`; CE352/353 também anexam60. [AttachedPictures](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_AttachedPictures.js), linhas154–155, documenta que imagens anexadas somem quando a janela está invisível. Linhas959–980 criam o container de Sprite_MessagePicture como filho da Window_Message. [MessageVisibility](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_MessageVisibility.js), linha307 minificada, aplica scale.x/scale.y = 0 à própria janela e sub-janelas. O transform do filho herda essa escala; o sprite normal não exibe a imagem enquanto anexada. Assim, preservar Game_Picture no save ou mostrar novamente após HIDE não preserva sua visibilidade durante HIDE.

**Regra proprietária:** GDD canônico linha1218: HIDE oculta a interface para contemplar a cena. Contrato incremental de Programação preserva pictures/interpreter em HIDE; UI/UX mantém os controles nativos e a composição, sem autorização para HIDE apagar atores. A exigência de AttachedPictures habilitado/lista automática vazia não implica que retratos de cena devam desaparecer com UI.

**Correção necessária:** manter os retratos da composição visíveis durante HIDE e restaurar a interface sem deslocamento, avanço, nova entrada ou efeito sonoro, preservando código vendor. Cobrir ambas as eras do prólogo e os narradores adicionados; acrescentar uma asserção sobre o sprite efetivamente renderizado e inspecionar screenshot HIDE, além da prova existente de estado/restauração. Não executado por este revisor: confirmação visual no navegador, atribuída ao executor que já prepara S-01/05/07.

O problema de prisão das amantes é conhecido, com confiança alta e impacto visual no requisito aprovado; não duplicar o bug. Esta revisão não oferece uma solução artística nem autoriza novo asset.

A retirada dos alvos sem produtor do slot64 deixa condicionais nativas vazias em alguns helpers; são ruído de autoria sem efeito de runtime, não um bloqueio de correção. Os scripts de transformação são recursos materializados de execução, não instalador idempotente; não devem ser reexecutados cegamente sobre este candidato. Task02 ainda serializa todos os mapas em indent4, enquanto a execução posterior restaurou a formatação original por mapa; é limite de reprodução do script, não delta de dados do candidato.

Os resultados canônicos são produzidos pelo executor, não por este revisor. A rodada agregada, QA por ações públicas, inspeção de cada composição/transição, restauração de controles, arquivos ganhos e escuta precisam fechar seus próprios registros. Também atualizar as afirmações históricas de “implementação não iniciada” ao concluir o grafo, sem reescrever evidências anteriores. Nenhum PASS de desenho, fixture ou fonte foi tratado como aceite da versão entregue.

## Fingerprint do escopo implementado

Método: SHA-256 de JSON com chaves ordenadas, mapeando cada caminho modificado/adicionado em rpg-maker/ ou docs/narrativa/herois/ ao SHA-256 de seus bytes; JSON no formato padrão de json.dumps(sort_keys=True). O manifesto inclui todos esses arquivos no instante da revisão. Scripts/notas task-local podem avançar independentemente e não integram o fingerprint de runtime/testes.

Fingerprint: `34335db2bf598a6f1dbf71662c4589078c9d2d4e4e9219dcfa7e2acf627b3f2c`.

| Caminho | SHA-256 |
| --- | --- |
| `docs/narrativa/herois/Ficha_H1_Gorvak.md` | `6b4f9a4921057561b42ea80d577f8faf10937f147e54b92bd5b40685fefe0798` |
| `docs/narrativa/herois/Ficha_H2_Elowen.md` | `5a1c5edabd8a60bdf127e94ba14dc025932bfaa618f90239c990589275a35cc1` |
| `docs/narrativa/herois/Ficha_H3_Griznik.md` | `ea9e3a6e223d7eada717bc3fa777f5be95429bf839b269bf0abc535fba687358` |
| `docs/narrativa/herois/Ficha_H4_Seraphina.md` | `17325373004337f4947f12ec04ad3e0404e0dce258895ad565df319440e6e25f` |
| `docs/narrativa/herois/Ficha_H5_Bimbren.md` | `22dc77bd45050c24f01c513e8b2d368f7d7f9d89569ae528691b9f5e8208054e` |
| `docs/narrativa/herois/Ficha_H6_Liora.md` | `d7246e378dd0b13fb4bfb47889ce7041ce04c267c3b81eab62fed1c42f181d82` |
| `docs/narrativa/herois/Ficha_H7_Vaelith.md` | `bc7d754f6e6e6b69ebcf1711de6f001a31b1975a6fc7359cbfe6d7bf58db5eae` |
| `docs/narrativa/herois/Ficha_H8_Draska.md` | `831a1590a661b70e58259940afea96fbba677a2291cbf839ec4322105d16214a` |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `d458975f8ac86558c4f2c1e178958f5a0dea367d917903a62832ac13fadcd6ee` |
| `rpg-maker/The Dryland Drowned/data/Map002.json` | `72d18e92907ff2ad9493e06839d89cc7025c44fa931c865bce5a6091a13e57dd` |
| `rpg-maker/The Dryland Drowned/data/Map007.json` | `ba4c01f292048f22b8ea1c99d069bfb26c9417e87de57c5a96925f69026e1415` |
| `rpg-maker/The Dryland Drowned/data/Map008.json` | `b103b46d114e19639fabeb9faa882cb36142e87db2443a5ef0b032696094f732` |
| `rpg-maker/The Dryland Drowned/data/Map009.json` | `a800966f05b5ff5aa51fcaa5d75c299fc9a47d8af2a365eb8d8d1cba2bc540ac` |
| `rpg-maker/The Dryland Drowned/data/Map010.json` | `287839e06ed875650cabbb4ca57b7f9311cf20abe6ecde2b2443257fa4af9469` |
| `rpg-maker/The Dryland Drowned/data/Map011.json` | `e59954c432f72238fa96cecf67252625e52c6d5dadd7088452fc1f923e21b134` |
| `rpg-maker/The Dryland Drowned/data/Map012.json` | `2607fb919ef0ac296ae43e6bb911176f07c25c9f840d19ccf5bd03869dc183d6` |
| `rpg-maker/The Dryland Drowned/data/Map013.json` | `f9063dc8628287a3f4cd6fa6e647cccd9090e30505082f84c324d29451399aa7` |
| `rpg-maker/The Dryland Drowned/data/Map014.json` | `912716295ea757cfabb056f12880f938717dc7e2f80d15a7279b23bdd501020d` |
| `rpg-maker/The Dryland Drowned/data/Map015.json` | `58dd7699c098b0635faf7045324fc62b00b5eb41fd8f8f17ee0c910f29d564a8` |
| `rpg-maker/The Dryland Drowned/data/Map016.json` | `8bec2f5c7ca064fe914bc5414c23af846089e3afab11cf7bc0485b12ecdb2503` |
| `rpg-maker/The Dryland Drowned/data/Map023.json` | `050cbdce4cc0f88a87e76496ed3e54dec746e6fb7f05d0d3338208caa6c8f646` |
| `rpg-maker/The Dryland Drowned/data/Map025.json` | `558569014a9f497c61ea4bb4c0e32868cc20fb80663adfe745557441bb06e10f` |
| `rpg-maker/The Dryland Drowned/data/Map026.json` | `d7954179aec105fba71bc7600b1d0a3314c94f70915d6f4e3c931a70083d70e8` |
| `rpg-maker/The Dryland Drowned/data/Map027.json` | `6e44665c9c38698511b55900d6adffbc81b5b4935a71c7dabe4175f4fb32ddaf` |
| `rpg-maker/The Dryland Drowned/data/Map029.json` | `f2916011fb6b645f203721ed2c38211e1ceeb68e32ff0e1994d03c82a1209277` |
| `rpg-maker/The Dryland Drowned/data/Map030.json` | `1f487161d8bec3259e081606a60afa3ca6693bef5a6aaf4b07c5c9738edddee4` |
| `rpg-maker/The Dryland Drowned/data/Map031.json` | `37515fd45ed2ec9d8041e2e57f57a8a0b5174f17b2dbb7bdfad760a26e281fa2` |
| `rpg-maker/The Dryland Drowned/data/Map032.json` | `443ddd04287df230fc70270636a714df787a6cc28df514e14dcaea2794ab16fb` |
| `rpg-maker/The Dryland Drowned/data/Map033.json` | `13a3dd57ea398664435a80241b89f7ef23e9a257e30c0157e063fcf1f389b9ab` |
| `rpg-maker/The Dryland Drowned/data/Map034.json` | `7e24561f729840f20a07bf2078112d35f808ae825fe484da80b21939d0d5d84b` |
| `rpg-maker/The Dryland Drowned/data/Map035.json` | `37bcb8c2c479f400ba73e6b82acd413d2597753d29fa61885643276d2e3339f4` |
| `rpg-maker/The Dryland Drowned/data/Map036.json` | `9a039d2ab6bc2ea5356d14134969d8e15e45f695f5784844de31542f778faf88` |
| `rpg-maker/The Dryland Drowned/data/Map037.json` | `629e4303ea6ffd0dc00cf4ab15a9ffb92a324a0bb492c7010df16c8601051ea8` |
| `rpg-maker/The Dryland Drowned/data/Map038.json` | `8f9da1de0b0489c6597e9539becd82d4bba75c8150b570a169b469cd70a19b7a` |
| `rpg-maker/The Dryland Drowned/data/Map039.json` | `36322ed10263a1423889f58e0224fda053b543996c57e6f86321807ff8ac10e1` |
| `rpg-maker/The Dryland Drowned/data/Map040.json` | `eab26f8ffdde934467101abb6dc08ce48dfad68d9da0b0bcb833700c64eadbf8` |
| `rpg-maker/The Dryland Drowned/data/Map041.json` | `89cf38cf615f9644c0debb1f2b91e0c4fd059cb24ac8ef772c2746d0e83408ef` |
| `rpg-maker/The Dryland Drowned/data/Map042.json` | `b4c8cb20fe3636a83d72d25ea8be299695f85d85dac25e4df7cc6a376c90feb6` |
| `rpg-maker/The Dryland Drowned/data/Map043.json` | `2d4c2250d63257f009345f6a8fa0ce39ad11e93a9569e83dac135798972391e2` |
| `rpg-maker/The Dryland Drowned/data/Map044.json` | `ab209cbddda906933c021952727623156149abe2b1bde36022ccf764a81b35ce` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH1.png` | `d8cf29a0150a4ade2626d2d7eefa2fbc45b0d0166d0a4e635d468fdaa8e4d5d6` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH2.png` | `b680f6fe9e7a6a1f87c2bf86221aed89262577a8fc6b846706f6ecf436214a8b` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH3.png` | `70d749da52a26d447d8cd12e30e8dcf8590dc77782dd2e2ec037f05367244731` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH4.png` | `ffe7704d64276fdd53a4ed2018eec5fa0efe0a039b4fae9e8d32b1c9648ebf9f` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH5.png` | `b9c86d02651b9e14026d8fd7b0c568804986d60a766ac80f594eb461dd8c671e` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH6.png` | `37d20b345028df34a295fbfb11a3fe45d72145db7ef4756bfca3eb9d06f0a262` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH7.png` | `2da484c9af8c78ed8dc45673604730e9a6101439ff3bc3444322c856e9079d4b` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_EpilogueH8.png` | `bca737425838f9cd4f4a224ac22c60ecc778629b44e2faeef07392a23986565e` |
| `rpg-maker/The Dryland Drowned/img/pictures/Dryland_Taverna.png` | `ea12aaa698e1dea63483d591aaaf494eadef597c6ebf227b9567dde0e68181e1` |
| `rpg-maker/The Dryland Drowned/img/pictures/Reed final.png` | `ef2845c560e42eaa3c15827c110286ee714232f64cf2e713c9644071be207e18` |
| `rpg-maker/The Dryland Drowned/img/pictures/Reed-novo.png` | `2de99a77d540ff6fde5fcf95f14a19e07bcc7e309ada90d62f5b42e578b2ca24` |
| `rpg-maker/The Dryland Drowned/js/plugins.js` | `67794d5c5dc8754632e5c8a84a4f47ded485edc2ff3e7309ed376867f259d862` |
| `rpg-maker/The Dryland Drowned/js/plugins/Dryland_CampaignRules.js` | `914aab4c8b3315d990a4d44769fbaec1a54d75db7c0e02e9852427330d3d1ab5` |
| `rpg-maker/asset-provenance/approved-narrative-epilogues.json` | `09f6b7ad1af399b2e0ce969d79b1c22a73611ae34a5b575bc557c79f4d369453` |
| `rpg-maker/asset-provenance/approved-narrative-opening.json` | `38682bfb77d266c324181902ebda1b4f845cca77db6262184e18f7bc92975ccb` |
| `rpg-maker/qa/native-journeys.test.mjs` | `e61744c64deeca887304a3ed1bd758d08d0f6bf4568a9c60e2ef95cc266f7087` |
| `rpg-maker/tests/fixtures/approved-closing-source.json` | `34fcaacc040e4b139c98518273a7f7925ef68aa8a8f0d728e9b89fcaa93a7c3a` |
| `rpg-maker/tests/fixtures/approved-trap-successes.json` | `3b309e8c248bda56c0e96a03f9c7b57aec3b21c92d9b8b12918edb661b4cb260` |
| `rpg-maker/tests/fixtures/boundary-recipes.json` | `ff8b7bc4af20ef3c82473ee0e24b5732b2d12a659acfb59e523300807e9b791f` |
| `rpg-maker/tests/helpers/formation.mjs` | `d1232ce9c6192f19797ecf45106563f37d7a05cf32f39908b000525054db4972` |
| `rpg-maker/tests/helpers/native-bust-fixture.mjs` | `611294da89becad33d0e513861f4ea4ec479cc2f95280821af67c0e69284c0f2` |
| `rpg-maker/tests/helpers/native-reading.mjs` | `4977b9ea00fc40f02d9b8bf7af4adb7c878ee521bb740627b5aaaa861c47f26c` |
| `rpg-maker/tests/suites/content.mjs` | `e890e2c65babb9cd3e7bc3ce6925cf54e008ed62c9982c4dbf4d881677a93cba` |
| `rpg-maker/tests/suites/discovery.mjs` | `b6c1b392f298e423413962ba5de39ec67d84aa177de376c129a1b11095cdbfd6` |
| `rpg-maker/tests/suites/encounters.mjs` | `c49699ab5764f9ae8f9bb581030d157a582c4a6aa3ce4a9429c3997f35cc15b4` |
| `rpg-maker/tests/suites/endings.mjs` | `e723c65b5725367c2586f5cf9d520b85abd72f8e0eebec5379a4c2d34188c3fc` |
| `rpg-maker/tests/suites/native-audio.mjs` | `f6403fd6b4c778ad03879e3c469803cb6b073db9531bc03a940f9f4034449386` |
| `rpg-maker/tests/suites/native-boot.mjs` | `bd5de43f77ad6d5f56d5881637d7d4bf7a517889b6136d1f9379fd36d8eca291` |
| `rpg-maker/tests/suites/native-checkpoints.mjs` | `b06529f44e0f0907d6531512da536112153cf6cf95b386c4f2b43cf81f2ed151` |
| `rpg-maker/tests/suites/native-inventory.mjs` | `4325dcb15c899309ea39e1cd4db4a7d1b05f51dbc495c992db8149b0e662ed66` |
| `rpg-maker/tests/suites/persistence.mjs` | `983ec3bf949be68ee6c30804abca1be50045bb6e09a006811d613c7536de161a` |

## Adendo F-01 — confirmação e avaliação da correção proposta

O executor informou a reprodução dirigida no run `41684d79-84a1-43eb-86c9-21a86c6ef5ba`. Este revisor abriu e inspecionou os arquivos originais em 2026-09-18: `hide-1.png` mostra preto sem Rheed (somente aviso nativo de autosave no rodapé); `hide-7.png` mostra a taverna sem Rheed jovem e Ivaí. Isso confirma a consequência prevista pelo rastreamento estático. Não houve operação de navegador por este revisor.

A correção proposta — retirar apenas MessageAddPicture dos retratos de Map002/Map023/CE352/353, converter seus TargetY negativos de coordenadas relativas para absolutas somando512 e conservar MessageRemovePicture de limpeza — **não apresenta objeção contratual**. Usa o picture layer nativo já preservado por HIDE, mantém Upper Left, escala, X, cor, foco e preferência de movimento, sem alterar vendor ou introduzir reparenting/adaptador/snapshot. A ativação do plugin e sua lista automática vazia continuam conforme o design aprovado. A descrição da técnica de attachment na análise da origem é evidência de PR19, não requisito de esconder arte junto à interface.

A constante512 é a coordenada GLOBAL da origem da janela inferior neste palco1280×720, não messageWindow.y isolado. `task-04/council-diagnostic.json` registra messageWindow.y508 e bounds global de Rheed.y32 para TargetY-480; a margem do window layer soma4. Portanto -480→32 e -436.3636363636363→75.6363636363637 preservam o enquadramento global. Converter todas as sete posições negativas de Map002, inclusive os pares de foco; Map023 possui quatro ocorrências narradas e CE352/353 uma cada. Não transformar posições de outros participantes.

As dependências de encerramento são: manter limpeza de attachment antes de compor; verificar HIDE e restauração nas duas eras; verificar troca de foco sem salto e saída normal/reduzida; verificar Continue em saves produzidos pelo candidato corrigido; conferir que as imagens não persistem depois do proprietário sair. A correção altera os hashes de dados e invalida reuse dos archives/receipts de fonte anteriores para claims do candidato novo. Os arquivos prévios continuam evidência do defeito, sem promessa de migração.

**Estado deste adendo:** proposta avaliada, ainda não foi inspecionado diff corrigido nem execução pós-correção. F-01 permanece aberto. O fingerprint acima continua identificando o candidato anterior à correção.

Capturas inspecionadas (sob `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/41684d79-84a1-43eb-86c9-21a86c6ef5ba/`):

- `hide-1.png`: SHA-256 `1d37cdc4fcf72f011fdbdb13aab87f6cbf951f92d263814b751822075216aaf0`.
- `hide-7.png`: SHA-256 `81b37f1d907e51a2edf4efc4bee6a1db18fc8363ba07f5b202f4dd6bbb97a497`.

## Rodada corretiva — F-01 e quebras nativas

Esta rodada substitui o estado dos achados da rodada inicial; o relato anterior permanece como histórico.

**Veredito atualizado: FIX_BEFORE_SHIP.** F-01 está corrigido no código/dados e confirmado visualmente no prólogo e na primeira closure. A cobertura HIDE do Conselho ainda não está demonstrada pelo teste indicado, devido a F-02 abaixo. O bloqueio conhecido das prisões e os demais sensores finais mantêm seus próprios estados; não surgiram novos defeitos de runtime nesta rodada.

Inspecionados `task-01-hide-scene-pictures.py`, Map002/Map023 e CE352/353: oito MessageAddPicture removidos, treze posições relativas convertidas por +512; nenhuma escala, X, palavras, unidade, entrada/foco/saída ou ação de domínio foi acrescentada. A limpeza MessageRemovePicture permanece. `hide-and-checkpoint-repair.log` registra cinco casos PASS, zero falha, 339799 ms (IT004/052/054/059/014). O revisor não executou essa rodada.

Inspeção visual dos arquivos corrigidos: `task-01/older-rheed-hide.png` mostra Rheed velho em cores sobre preto; `task-01/young-rheed-hide.png` mantém Rheed jovem à esquerda e Ivaí à direita na taverna; `init-rpg-maker-mz/task-08/IT-052/closure-first-hide.png` mantém Rheed sobre preto sem interface. Confirmam que o retrato agora pertence à cena durante HIDE. Capturas de Conselho com sufixo-hide não estavam disponíveis e não foram presumidas a partir do PASS.

### Quebras `<br>`: parecer de fidelidade e ciclo

`task-07-native-line-breaks.py` acrescenta `<br>` somente ao fim de uma linha401 selecionada que já tem outra401 na mesma caixa. MessageCore documenta esse escape nas linhas370–373 e esclarece nas linhas1650–1651 que WordWrap troca newlines comuns por espaços. Logo a correção faz a segmentação já autorada produzir a quebra pretendida; não adiciona passagem, caixa, ação ou espera. A normalização de fonte passou a retirar somente esse markup antes de colapsar espaços; não mascara mudança de palavras/pontuação ou de identidade.

A revisão independente removeu somente `<br>` em memória dos Maps007–016/025–027/029–036 e recuperou exatamente os hashes de bytes dos 21 mapas da primeira rodada: 60 tags nos sucessos, cinco nos finais e28 nos epílogos. Council/closures seguem o mesmo algoritmo delimitado por Query passageRead e ReadingEnd; nenhum texto fora do escopo selecionado é transformado. Sem objeção ao uso do escape nativo.

O sensor novo de indicador foi inicialmente escrito contra window.getBounds(), que inclui o próprio filho _pauseSignSprite (Pixi Container.calculateBounds, linhas8176–8195). Esse limite podia se expandir para acomodar o erro que pretendia detectar. O executor corrigiu antes do agregado corrente: os limites agora vêm de worldTransform aplicado a (0,0)/(width,height), recortados ao viewport, independentes do sprite. A versão atual está adequada para a janela sem rotação/skew usada aqui. Seu resultado agregado ainda estava em execução nesta revisão; o PASS anterior com o sensor mais fraco não fecha essa nova asserção.

### F-02 — guarda impede a cobertura HIDE do Conselho (P2 de teste, confiança alta)

Em `tests/suites/endings.mjs`, readCouncil condiciona assertHidePreservesPortraits a `testId === 'IT-054'`. O caller de IT054 passa sempre `IT-054/normal` ou `IT-054/reduced`; portanto o ramo não executa. Isso explica a ausência de capturas Council-hide apesar do PASS. Não demonstra falha do runtime corrigido, mas impede atribuir a esse teste a prova anunciada de HIDE do Conselho.

Corrigir o reconhecimento do grupo de casos depois de terminar a execução congelada e verificar que o ramo realmente produziu suas evidências, ou fornecer a prova equivalente no cenário dirigido correspondente. Nenhuma mutação de testes foi feita pelo revisor; o executor foi avisado durante a rodada. O fechamento completo de F-01 deve usar essa prova, sem exigir repetição de prefixos de campanha desnecessários.

### Fingerprint da rodada corretiva

O fingerprint histórico acima permanece preservado. O seguinte fingerprint identifica os bytes atuais do mesmo recorte runtime/testes/fichas, inclusive os novos sensores. Não atribui o resultado de runs anteriores a esses hashes.

SHA-256: `9f69d8184819f527d32837879ecf01ce0c9da8363e3565d9e9cae2bf2508739b`.

| Caminho corrigido ou novo | SHA-256 atual |
| --- | --- |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `b31882db55f147488fd424fb6ab472ad44ddd678c3d9b0e947e7db84e1fea4d8` |
| `rpg-maker/The Dryland Drowned/data/Map002.json` | `00782ff4fce9e3f7720e8c9fd0d21a1cf1245266e61ad73232137c97370cc896` |
| `rpg-maker/The Dryland Drowned/data/Map007.json` | `ee6cae7677b7bfe633dc7053496036496840fd2f5e341b212bed84616d72bf64` |
| `rpg-maker/The Dryland Drowned/data/Map008.json` | `4ecf426d0feb940f9345a0b565d6f673559c46ea411024b98479968355882405` |
| `rpg-maker/The Dryland Drowned/data/Map009.json` | `d0be1751abb51ec3a531f74123baa735bc041a9dbbb2594ca1d235d111daa048` |
| `rpg-maker/The Dryland Drowned/data/Map010.json` | `bbfc73ed281b826d601e00063d3ac75abac57eefebafffdf410ce65a5c4ad662` |
| `rpg-maker/The Dryland Drowned/data/Map011.json` | `40804ed286caa33d01074a36dd36bb91bf6b01d92fcbbb3a39a5b7a53492d0f4` |
| `rpg-maker/The Dryland Drowned/data/Map012.json` | `e2add7700100113fd725ece2cd1582c6ba5214aa974af6b8cc07107b6c6ce2fc` |
| `rpg-maker/The Dryland Drowned/data/Map013.json` | `a75d4e73739d8eadf09bb16f79cdb4e86cd4a27d28fc151171eca512e54edb1e` |
| `rpg-maker/The Dryland Drowned/data/Map014.json` | `dd9eaa73bef0dd0d5f250b73b0d0bec68082a3651f4065c2b4977f03dc483e33` |
| `rpg-maker/The Dryland Drowned/data/Map015.json` | `e7f83850cda31ef954fd4541256a061f5f2bef2154d6c384553cb12653e16427` |
| `rpg-maker/The Dryland Drowned/data/Map016.json` | `5a2154f8e4249a05fe69f2251a06d742ea2e92b2e11161bd7dcd9b7789cb878d` |
| `rpg-maker/The Dryland Drowned/data/Map023.json` | `87f9aab1f5783adc9f25b9320b842c915ad6791be81e83c7fa36a6f8257c871d` |
| `rpg-maker/The Dryland Drowned/data/Map025.json` | `4e322328379c039e8a0b84062d6592b7b5405214a9107bd45ed37505b6e72a63` |
| `rpg-maker/The Dryland Drowned/data/Map026.json` | `c3e78bb919d2ba271b35fcd9a5a3db4a618a6d8552e7a3247b1a8131d91d7731` |
| `rpg-maker/The Dryland Drowned/data/Map027.json` | `3679be3537b2de586297f6a30b119050a50df2544078fd8068da7035148c77aa` |
| `rpg-maker/The Dryland Drowned/data/Map029.json` | `d6e533dac8ea4adbeeb7d60eef5dd8bb7b23f4cb47c613e0f0e5b44b00f7f1cb` |
| `rpg-maker/The Dryland Drowned/data/Map030.json` | `b3faccc31d99d7a31c398a96cba2a6c88996386725d16aa627f360a824ca9170` |
| `rpg-maker/The Dryland Drowned/data/Map031.json` | `649e6db179d81a5d54dec2007f3cbeea4625876810af27c3ca02cbf5eb1cb092` |
| `rpg-maker/The Dryland Drowned/data/Map032.json` | `8edb375473be6fa022ecc9b407ac8006a9a2662325bd6e61c84bb859a82855c9` |
| `rpg-maker/The Dryland Drowned/data/Map033.json` | `a7a53fa76563728c6efd1958b7a2c3ecfd9f7d2c6fda5a8f1dc550e053df1a1d` |
| `rpg-maker/The Dryland Drowned/data/Map034.json` | `455e2f37c0ec46c0df5700b682423981ecc39e51de75fb76286afe5070a879da` |
| `rpg-maker/The Dryland Drowned/data/Map035.json` | `1b7748d19af45fae808feda2818ec8ca8a2884d36c6f13963dd3b942b7b6c609` |
| `rpg-maker/The Dryland Drowned/data/Map036.json` | `d45e2966b5d3c62df5149beb83cbd2a7f9c0bea094db80b096bd4cf893e82ad3` |
| `rpg-maker/tests/helpers/native-bust-fixture.mjs` | `5649231341cc89d91e0abaaae82fcbefb1459bc4e88ee79245b63f83e4491d06` |
| `rpg-maker/tests/helpers/native-reading.mjs` | `cc13c9ac7ff1a2de62e738cd6858c3b3f0e4551713bd7b85d65976050f3c50aa` |
| `rpg-maker/tests/suites/content.mjs` | `f5785c666415c4a65515eb8df0e210b2dd0ff6ace07718f1088e4e1b2f063d72` |
| `rpg-maker/tests/suites/discovery.mjs` | `532d1311d72323b6a3e41064448144d68667767ba2a7f3600de365cf92687df5` |
| `rpg-maker/tests/suites/endings.mjs` | `6dcfa0cce4fdd3b4edf92c2f5c6f5ddf5ebe90b7f1eab6905aa778ac40cfca25` |
| `rpg-maker/tests/suites/persistence.mjs` | `ae460384566f4aadd239b7450affdf3c3cb45c697222baa654d04db5c37734f9` |

O executor confirmou o plano de corrigir F-02 com reconhecimento de `IT-054/` após encerrar o agregado e repetir somente IT054; o dirigido corrigido também testa HIDE no primeiro narrador do Conselho, mas estava em execução. Nenhum desses resultados pendentes foi contabilizado nesta revisão.


## Sub-revisão visual independente — oito heróis e oito despedidas

Em 2026-09-18, este revisor abriu individualmente os **48 PNGs abaixo via view_image**, incluindo os dois perfis de cada herói: normal em 1280×720 e reduced em 1920×1080. Não abriu navegador, não executou testes e não modificou dados nem a árvore de evidências. São capturas dos owners IT081/IT012; o reaproveitamento visual é restrito às superfícies cujos dados e assets não foram alterados pelas correções de attachment de Rheed e `<br>`.

**Resultado do recorte: nenhuma nova falha visual bloqueante observada.** Nos 16 menus, o herói corresponde ao nome (Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith e Draska); rosto, opções Conversar/Selecionar/Voltar à taverna e contador Grupo: 0/3 são legíveis. Nos 16 quadros de conversa, Ivaí aparece à direita com nome correto, o herói permanece à esquerda, e a pergunta/fala inicial específica cabe inteira na caixa. Rostos não se sobrepõem entre si nem ficam encobertos pela caixa. Nos 16 quadros de despedida, somente o herói sacrificado compõe a cena, nome e frase individual estão completos e legíveis; o fundo do encontro continua visível. Texto, nomes, botões e indicador de avanço não ultrapassam a janela nos instantes inspecionados. A variação de largura do indicador entre quadros é compatível com sua animação, não constitui evidência de corte pela borda.

As diferenças de estatura/enquadramento permanecem reconhecíveis: Bimbren ocupa uma posição mais baixa sem perder rosto, Gorvak mantém o corpo largo e os demais conservam seus acessórios e silhuetas. A base dos corpos se prolonga sob a janela e em alguns casos além do limite inferior, sem cortar cabeça/rosto; não foi tratada como exigência de mostrar corpo inteiro. Halos claros do recorte dos retratos são visíveis especialmente sobre os cenários escuros de despedida; pertencem aos assets preservados e não demonstram regressão do reposicionamento avaliado. Esta inspeção não declara aprovação artística humana.

### Limites exatos da cobertura visual

`tests/suites/formation.mjs:247` captura apenas menu inicial e a caixa de índice2 (primeira fala da conversa, depois de HIDE/restauração/retorno de Configurações). As outras seis caixas não têm PNG nesse conjunto. As oito seleções, remoções, recusas com grupo cheio e seleções automáticas são exercitadas no laço subsequente ao laço dos perfis: portanto com o último perfil, reduced, e **sem screenshot**. A inspeção das imagens não comprova o layout desses ramos nem o foco durante todas as falas. O teste de estado/texto não foi promovido a inspeção visual. O executor recebeu essa lacuna; preencher a evidência exigida pertence à QA dirigida/ao owner da execução, sem inferir que há um bug de runtime.

`tests/suites/sacrifice.mjs` gera também warning/candidates/context por herói. Eles não foram abertos nesta sub-revisão: a conclusão de despedida se limita aos 16 arquivos farewell efetivamente vistos, não à lista de candidatos, ao contexto posterior ou à animação de entrada/saída. Capturas genéricas antigas warning-1/2/3 etc. não foram reutilizadas. Stills não comprovam movimento reduzido em si, tempo de leitura, áudio, continuidade da campanha, ou ações de jogador; esses claims conservam seus sensores próprios.

### Ledger dos arquivos efetivamente abertos

Todos os caminhos abaixo são relativos à raiz do repositório. Hashes calculados depois da abertura para identificar o artefato revisado; nenhuma imagem foi criada ou transformada.

| Arquivo inspecionado | SHA-256 |
| --- | --- |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H1-normal-menu.png` | `118e89101afe1fcbfa6ec58ee9be67287b5fd2b7b755f1fea9689cd0b07a457a` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H1-normal-conversation.png` | `7bfff119029f4cc39627bce957b1784493c47e406f2a00c2b2fa07d48a90c9ad` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H1-normal.png` | `9554029532372702a9730a8b8a46ab003d03e5a206481130ea9b949fdd7ccf6c` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H1-reduced-menu.png` | `32352b9d39d98e0d283d5bda9cfc53da76c1f3b7cc4eeae299e4704cf8c484aa` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H1-reduced-conversation.png` | `49fe279d83079cfcc860ddd000abf46366e3aae57b3406bb19da28f29f770f80` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H1-reduced.png` | `8d1afe027b9ad526fa3dbd8834a2844d5b1963d8e7c1a19e4eb2a7d000d11c6a` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H2-normal-menu.png` | `1bef4af8d18a82345cf1c98d34a7eca4c3c4614a1080a9a2f73ecd0135e5eac9` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H2-normal-conversation.png` | `297981b3508595ef4efc6de36830c3ae3b113f10fdb67a13aa5f643d59c3da87` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H2-normal.png` | `8e4e57647f6fa9bbf39623f6b7fe5509601ee0aa04189aff538fafef483f96c3` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H2-reduced-menu.png` | `53aa1f34f4c6977ba338864f61853d193c2546b340a1bf7a660f113e5c3428ff` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H2-reduced-conversation.png` | `37657c30095a3d9e4d8e6d92c478209f7afe247e5280458830b0d5e09f958c24` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H2-reduced.png` | `44e734029e04ae5e1fa2487fb3e03c7e349bc11c90fac086d3f38b4253248c9e` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H3-normal-menu.png` | `c57f9d0df48a7873dc6c0e1a771cb6c2649d466d62151d38def191ac90bf6a46` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H3-normal-conversation.png` | `cdce0842d28baf173a669f20ce2e440b8da7a65e25e7ab17091b1d91136e7fae` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H3-normal.png` | `166ed32bbbbc37c99b8d79fbb7a8bffedc89431e15da9c518f043a30fa6fca77` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H3-reduced-menu.png` | `9f8bf2aae597e292652e6c8660a1452c35f58dedac5ef7e3fccee242721a776e` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H3-reduced-conversation.png` | `3c844d40fd320f575e38e4b3cb8cf94aa44829466d49ee9719bc36e32b86dd05` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H3-reduced.png` | `d9c360eb3fb34605ab04d51fbbdb136fa7b93be5e5732d8002fc2a6097af1336` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H4-normal-menu.png` | `83fa918b4f1984870d803b0cc68c8cb6b14f7c06fb55ff577801d75d38324bd5` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H4-normal-conversation.png` | `0af12834a9509c5709a87c5217b0332516d703f35b3eede13ddd1886f9182674` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H4-normal.png` | `ae81057d5e8ecc193b98e2cc29327858f0c1df6a70c138ea29633d675ef36563` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H4-reduced-menu.png` | `2885317d2b7cc13b31ef98159961648cab101af0512be51c29111df06dd0b7f9` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H4-reduced-conversation.png` | `bc366dd5d6a872a7df5694942af947c6e491db74d517f69766ff8470caea3457` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H4-reduced.png` | `375da0ef45062f1a43ed8946339bc2b73f6102ce798c78f8e1428d8349fea633` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H5-normal-menu.png` | `8eaa84bda6d2844cf28ea549c227824ee9804a3451424b84d0938b8e953f29a1` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H5-normal-conversation.png` | `c4aa6ddaf02f8e3b354f2f968d5c32a32341d6dce0e477db670ec1c42a2f0b43` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H5-normal.png` | `7b6df49d71fe293c51e9c25fbf8a809e9fe13f55fe0b4146113eb4b25b6d6193` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H5-reduced-menu.png` | `50979d73f979084adb3d67d32b996d1986b6b7f5a7f436ce6baf674bf50d7f9a` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H5-reduced-conversation.png` | `6f267a2e228ac4e667e716ba5164601400bfc45ca9ca5967d8b064ea903d64bd` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H5-reduced.png` | `09735cb1f22425d4c8bae200ac93cf0bcf942e09d0ec39fd71bf3d9defbd4558` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H6-normal-menu.png` | `34503c527774df7d50b40252171f3ccdcbd47ca397d73557fd235d26ec27fa8f` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H6-normal-conversation.png` | `84cd1e920b1f4f186de6ada06450c2871fd49ef9982831fb000c4c30a63b48fa` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H6-normal.png` | `1bedd1d65042d44aa7503c15232b5c84c7fff4b3d213865024eea06e27d48bbc` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H6-reduced-menu.png` | `18e9bea76378dad4405c3aa3d1d437f66657b7e58e49781ae2ca6b0ded656c16` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H6-reduced-conversation.png` | `77be5695a625249f5de64fc61a21a220a914288a2975f3534b23bee393eaa8fe` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H6-reduced.png` | `ff5fcce1047686f4c5f6bf1250f1a6c63cb231eb17cef8fcc7579bb2c7442aa3` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H7-normal-menu.png` | `e3be860e76b4f0cb278c3157b38d822471e282aa040c16de08315fad496182e5` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H7-normal-conversation.png` | `c3d57b57b4a6c7311dde0dff9fca983cd233bcdb4f0bd779888ca31866b009e8` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H7-normal.png` | `9a7ff6c32b5e995b9da7fe4435e83dfb189447240883cfd5a012d80f1771d969` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H7-reduced-menu.png` | `384697159e180d3a44050dad6bba927cd29b3340a8ad235f5b30909c6433a3c5` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H7-reduced-conversation.png` | `b30c7dbe9b807f93e43cb8e8d1113536f9d62ce110b79ba9527c133e70d946e8` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H7-reduced.png` | `2c15e3dc5ee741d5a488ce6b47de752c6ca63e7606848fd4b2400c30fc5a4cec` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H8-normal-menu.png` | `6d12df9625e2d1b36a747d94b0a1d1af9f9f82caf367c47a156ed3dfa4cd2a56` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H8-normal-conversation.png` | `1fcaa0080e41b55a7c3c83f26178660b5d91d6ed14b3c5e6ff7c2093acb607e6` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H8-normal.png` | `a7c85b523a80a46b4ca1d846fcef9ea6483c737bf9c2b8505606085dd2f84625` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H8-reduced-menu.png` | `3f6b9a643b260f321ce0450fa5970784558f51eaa3ed7e9514a296444e811809` |
| `docs/qa/evidence/init-rpg-maker-mz/task-03/IT-081/H8-reduced-conversation.png` | `0bab85202193641c6856b9144b9826ffd6300c5d1be9539976c725a641dbadb8` |
| `docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012/farewell-H8-reduced.png` | `4dedb5c8c7bd79ca0d4986ff514107cd2303646818fac90b5a7ce854305a1c56` |

Este recorte não muda o veredito global FIX_BEFORE_SHIP nem fecha F-02 ou o bloqueio conhecido das prisões. Ele fornece leitura visual independente apenas dos quadros enumerados.


## Complemento visual dirigido normal — respostas e ramos dos heróis

Este revisor leu o transcript de `report.json`, observation `kind=staging-result`, do run `df0e5eb0-40ca-4e21-be4f-82b713285308` e abriu via view_image os 48 quadros enumerados abaixo. Perfil normal, 1280×720. Escopo: oito descrições longas, 24 falas dos heróis em conversa, oito respostas de seleção e oito respostas de grupo cheio. O run continua pertencendo à QA dirigida do executor; este revisor não operou o jogo.

Os textos completos desses 48 quadros estão legíveis, sem ocultação de palavras. Retratos presentes preservam rostos e separação entre interlocutores; as oito descrições e as oito falas finais da conversa mostram o nome correspondente. Entretanto, foi detectado F-03 abaixo. Logo este complemento não pode ser registrado como PASS visual integral.

### F-03 — indicador cortado na descrição de Draska (P2 visual, confiança alta)

`staged-72.png` mostra a descrição de Draska em duas linhas, terminando em “outros.” perto do limite direito. O indicador verde de avanço começa aproximadamente em x1274 e continua além da tela de1280px: somente uma fatia aparece. A imagem demonstra corte pelo viewport, diferente dos indicadores estreitos por animação que permanecem dentro da janela. O texto propriamente dito está completo. A condição vem da caixa101/401 em `data/Map044.json`, event001/page0/list[91–92]: a descrição longa usa uma única401 sem quebra explícita. A composição/ficha foi preservada, portanto não se atribui este defeito a uma alteração de prosa nesta spec; ele impede fechar a leitura visual da superfície que a entrega exige verificar.

Correção esperada: fazer o texto/indicador caberem usando os mecanismos nativos de formatação, sem alterar palavras, unidades de leitura nem regras de domínio, e registrar a imagem estabilizada nos dois perfis. Não alterar provider para resolver este caso. O executor foi avisado antes do fechamento do review. `staged-32.png` (descrição de Griznik) aproxima o indicador da borda, mas ele permanece inteiro nesse instante: não foi aberto um segundo achado por proximidade.

### Quadros transitórios e limite da afirmação visual

As capturas dirigidas foram tiradas antes de todas as transições se estabilizarem. Nos seriais22/38/46/54/62/70/78, a seleção mostra texto mas nenhum retrato ou namebox, embora o transcript registre picture60 e speaker;30 mostra o retrato de Elowen sem namebox. Diversas primeiras/segundas respostas de conversa também não mostram namebox, enquanto a fala seguinte do mesmo herói mostra. Nas respostas de grupo cheio,83 mostra nome de Gorvak completo, mas85/87/89/90/91/92/93 não mostram namebox. Isso foi comunicado como **limite de captura**, não promovido a bug de runtime. Não se certifica composição final ou identificação visual do falante a partir desses quadros. O executor informou que obterá capturas dedicadas com duração/opacity dos retratos e abertura do namebox estabilizadas, a partir de save real.

O transcript permite mapear as respostas, mas não tem nova caixa401 de remoção; a ação remover não é comprovada visualmente por staged-N apenas. Os menus posteriores/estados de grupo exigem seus próprios quadros ou observação dirigida. A campanha reduzida estava em execução e não foi pressuposta equivalente. F-03 mantém o veredito global FIX_BEFORE_SHIP; pendências de evidência permanecem separadas dos defeitos confirmados.

### Ledger normal dirigido efetivamente inspecionado

Base de todos os arquivos abaixo: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/df0e5eb0-40ca-4e21-be4f-82b713285308/`. O serial corresponde exatamente a value.transcript[].serial. Report SHA-256: `5ab73bc49cd1be56ee631fa6ac76ee401f03b954a97f6cc67db50165896b3da5`.

| PNG aberto | Herói / superfície | SHA-256 |
| --- | --- | --- |
| `staged-11.png` | Gorvak / descrição longa | `7bae67ea2d3cdd14d040ec0c3cc288124add477d0ffcc652ebe0919d51a733e6` |
| `staged-13.png` | Gorvak / resposta de conversa 1 | `f3e1885b20b3aea8dba03c2f9537624f3ed74fe63b5a0ef892fef639578c038c` |
| `staged-15.png` | Gorvak / resposta de conversa 2 | `1f891608cf2215d7b9eb2d2db86707315747642a34e2468efce23dd97f479f3a` |
| `staged-16.png` | Gorvak / fala final da conversa | `e886a57fa67edea71454720b83195672e55249d84e90367d720a471bc3ecc594` |
| `staged-22.png` | Gorvak / seleção | `aa31d7a81f1e43ec7a52c038b85f714717c3e92f9a27609ffd50b6eba2dc6d45` |
| `staged-83.png` | Gorvak / grupo cheio | `9c5f7e7a071489dc8e1fc4b644d04aff5653668ba164180fc45486c1b38077ef` |
| `staged-24.png` | Elowen / descrição longa | `664ed8f50f2618d1da5c9619a93d2d212bfaf46ec2e7c93561c7088648fef06a` |
| `staged-26.png` | Elowen / resposta de conversa 1 | `70a0016c7fbc848cdbb0ee5ef18e36d13913df9bdb1fdb4769b69e89c4923800` |
| `staged-28.png` | Elowen / resposta de conversa 2 | `209622def1cac4e0f562fa1216fc03d6b6e10a4a1886b6a8557df1e8cfad7162` |
| `staged-29.png` | Elowen / fala final da conversa | `6fb2cb29dfcf661313560d5df9537ef910d20d6a6757f94a11630e719fdb1ec7` |
| `staged-30.png` | Elowen / seleção | `47787d52d49cb6cbea663f1e2bcb112d0631443bbd9d0eed55383d7ee67b77e6` |
| `staged-85.png` | Elowen / grupo cheio | `8355fbfa91ddf353814609068b150dc9fea3252c44623cb89deafd108f59be55` |
| `staged-32.png` | Griznik / descrição longa | `ffcfa19f8964dbb874f7cf17d6ba911af07e94df0a26929e5b6e7bb14d91e871` |
| `staged-34.png` | Griznik / resposta de conversa 1 | `96e4a55eec578b014db9b30875fcaf51915036e95f3ac1732c393f77532c6008` |
| `staged-36.png` | Griznik / resposta de conversa 2 | `da5bc26b140fb92f0116163e06402d79d5f3b58f550b8b0a8dfca24c3b33b733` |
| `staged-37.png` | Griznik / fala final da conversa | `47fbd45ef1bf17fc18a31bc4c4439f282721209f251a40dc78e4c33d0dc02e84` |
| `staged-38.png` | Griznik / seleção | `69d26e633b77e60369e153f7ec99290d20f37cc1312c9d854b8e434c2273f2eb` |
| `staged-87.png` | Griznik / grupo cheio | `d2942a1b1d890b07c931fd03f7765809ed209028f37b3b78d8be0245dce67fab` |
| `staged-40.png` | Seraphina / descrição longa | `747b4bdd3c2541f7084677b89cd91aa43bbe3a3c427e72c69cad84fce0bcf34c` |
| `staged-42.png` | Seraphina / resposta de conversa 1 | `8c7b3b45065b95bc0ddaa65ffacf5a04c1536a222a05c20140d89bf6cb0a93fc` |
| `staged-44.png` | Seraphina / resposta de conversa 2 | `c2bbb2493710454b57c1e07f906e0510282a8b4d241fb74d223291af0e941378` |
| `staged-45.png` | Seraphina / fala final da conversa | `4b4ce3a2efa42a6aeacb8772de04da856b07642a7da2e6831d951b2a94c03b89` |
| `staged-46.png` | Seraphina / seleção | `ddcfd43bf8aaf034faf19d296237e4a75f86d8087ab502bfe12c63d233337623` |
| `staged-89.png` | Seraphina / grupo cheio | `2158f3748e59a1cab889e00a6c988111d2152d277dc3148bdb6bcf0b98a2e82a` |
| `staged-48.png` | Bimbren / descrição longa | `70d5fd5dd43576d9ca9ad7ead786e228a520f983a29d10016789e416f9f69cfb` |
| `staged-50.png` | Bimbren / resposta de conversa 1 | `2d4665f977ba4411b0c35100c0c860f34275a6f0b88f1a04f37956e00816d4c5` |
| `staged-52.png` | Bimbren / resposta de conversa 2 | `7e5c792039b9753dfb9e5f62182f8309a5140d3506f5f00b709f72849ed3714e` |
| `staged-53.png` | Bimbren / fala final da conversa | `964025b3fe225956548e065fb8615257051802921e8f8f41b571463041902022` |
| `staged-54.png` | Bimbren / seleção | `3f3c814917707450fd52edbc04056cb25163cc7f53cbe2a73da7b6944cc94967` |
| `staged-90.png` | Bimbren / grupo cheio | `d6eac9ab3d95dc6385d52098c1956220bee9f8742b10005cc3bb784cb41b2067` |
| `staged-56.png` | Liora / descrição longa | `f522f8a660df2a4b2372a73eea7b0dc8bd023840fb8797bcd4659043ced1c95f` |
| `staged-58.png` | Liora / resposta de conversa 1 | `f9a77448fa747ce106a33a3d21d9cec3f503312bf5f79e9c082d9887881b82bb` |
| `staged-60.png` | Liora / resposta de conversa 2 | `1aab5434e8ec27c27991839f8da58ff7ff997ccf97cbe56b6ded63298877fa21` |
| `staged-61.png` | Liora / fala final da conversa | `b0553119354e580b2825047d6c986d3d6962fb85d4d247d7a86f7e0d8fbbac65` |
| `staged-62.png` | Liora / seleção | `4846902d7ef926a7788dd62c6b8f3dbe20be4d00f5a9b179454a7d2ae8fcde9d` |
| `staged-91.png` | Liora / grupo cheio | `2b0fbd0e933e1b71afe888fce1dcc2dc3a66730abd50683abb92449581fa0b72` |
| `staged-64.png` | Vaelith / descrição longa | `ea1df32b23bf3052938bee2e71d0dcfab8c5e4612151c60ba62c6efbce8292a0` |
| `staged-66.png` | Vaelith / resposta de conversa 1 | `a5793bbfa144957be9110b1836a3b1a6066ad083d3b6f13f14af3c803b968b11` |
| `staged-68.png` | Vaelith / resposta de conversa 2 | `946edfcd9feb04c4836382b6b3371a3161a62480796fc630e59a3cf7a55f66be` |
| `staged-69.png` | Vaelith / fala final da conversa | `d19eb65bdca9a6a6e1c063fce7da7c2adab44f6f104d5ad358b2214d8a56a0c6` |
| `staged-70.png` | Vaelith / seleção | `7140fe684fb8d7eeb3d77c9538746e91099813316ca3d83da75b41c61f02c098` |
| `staged-92.png` | Vaelith / grupo cheio | `b40eb32674d4c2f42ba037961e54055ad04762260df4dfbf75e4a24fad70b016` |
| `staged-72.png` | Draska / descrição longa | `8e5f7852e9fb4959de219710b573c821df709b3c445b042055fb857e22981be9` |
| `staged-74.png` | Draska / resposta de conversa 1 | `f85dfe036c6eb4265b67c422987204f4104d64a2a18d3e2c9ee3c4425d80d0b0` |
| `staged-76.png` | Draska / resposta de conversa 2 | `5313ffbfec4022a6a614b86751dbc52c3dcb9d7d4361c3d54a6d82ae8d3ae482` |
| `staged-77.png` | Draska / fala final da conversa | `d35a102c43d19c6707ea330045e5e757527362dca669b6cd8932e20ebe8ecb38` |
| `staged-78.png` | Draska / seleção | `f3868db6a60a913d7aeb760eebac8435e90752956d3b21a1d826ebc60b90f6a0` |
| `staged-93.png` | Draska / grupo cheio | `bcbe751313b10a39495b4c6e0790990083d09989c42570363c90071632f885be` |


## Auditoria complementar de expectativas e saída reduzida

Inspeção estática durante o agregado congelado, sem executar testes ou modificar suas fontes. Foram rastreados os consumidores antigos de identidades do prólogo, avanço de sequência por caixa, comprimentos de planos, epílogos e bustos nas suites native-controls, shared-ui, diagnostics, memorial, native-audio, encounters, persistence, endings, retreat, content, native-inventory e discovery, além dos helpers de leitura/closing/discovery.

### F-04 — IT-078 ainda confunde caixa com unidade semântica (P2 testes, confiança alta)

`rpg-maker/tests/suites/native-controls.mjs:371–373` segura Enter na primeira caixa do prólogo e exige `sequence === before.sequence + 1`, com a descrição “Held confirmation completes only the current manual unit”. No incremento aprovado, a primeira unidade `prologue.rheed.01` contém três caixas. Um único avanço manual não deve concluir essa unidade nem incrementar a sequência. O caso precisa conservar a verificação de confirmação mantida e ausência de fast-forward, mas observar avanço de uma caixa e permanência da unidade/estado até sua última caixa. O achado foi enviado ao executor; não é alegação de falha de runtime e não foi reproduzido por este revisor. Aplica-se aos dois perfis de IT-078.

O executor já havia identificado, independentemente, outras expectativas antigas: IT-001 lista de plugins, IT-025 conclusão após uma caixa, IT-058 busto/caixa única de epílogo, UT-055 identidade inexistente e F-02. Não foram contadas como novas descobertas desta rodada. `diagnostics.mjs:29` também usa `prologue.01` no payload de UT-041, mas esse caso exclui estados com leitura e rejeita por fase antes da identidade; não constitui falha adicional demonstrada. Convém atualizar a literal para sustentar a expressão “otherwise valid” do teste, sem enfraquecer a rejeição.

Descartes explícitos: IT-056 avança caixas até a última passagem do final, cuja caixa final continua única; portanto sua espera final não herda a premissa incorreta do prólogo. `startsWith('prologue.')` em retreat continua incluindo as identidades novas. Os limites genéricos de avanço de closing acomodam a cadeia atual; os helpers consultam plano/estado em vez de inventar contagem fixa de epílogos. Os seis primeiros marcadores usados pelo sensor de áudio alcançam o trecho jovem pretendido; isso não exige que todo o prólogo tenha seis caixas.

### F-05 — Ivaí persiste após saída reduzida do threshold (P2 runtime/visual, confiança alta)

O executor relatou a manifestação no run reduzido `cb15050f-ef51-464c-bd6d-8bee3ff62cbd`. Este revisor abriu independentemente `staged-22.png`: na despedida de Vaelith, Ivaí permanece desenhado à direita, herdado da cena anterior. O PNG tem 1920×1080; texto e nome de Vaelith estão visíveis, portanto este não é o limite transitório de captura descrito na rodada anterior.

No candidato inspecionado, CE263/264/265/list[19] chamam `Basic_ExitBusts` para63 com `Duration:eval = $gameVariables.value(47) ? 0 : 20` e `AutoErase:eval = true`. Os comandos seguintes só esperam20 no perfil normal; não há erase63 explícito. `rmmz_objects.js:1214–1230` mostra que `Game_Picture.move` grava targets/duração; `:1251–1261` só transfere targets para posição/escala/opacity quando a duração é positiva. Isso sustenta o problema do fade de duração zero; o detalhe interno do autoerase do provider obfuscado não foi executado nem certificado por este revisor.

A composição viola UI/UX §normal/reduced: ambos devem alcançar o mesmo resultado, sem pictures herdadas; Programação exige cleanup de propriedade explícita e que o reduzido assente imediatamente. A proposta do executor de apagar nativamente a picture63 ao concluir a saída reduzida é coerente com os contratos de Programação/Technical Art e preserva engine/vendor. A mesma auditoria deve incluir as saídas geradas60/63 das visitas a heróis. O reparo e sua campanha de regressão permanecem sob responsabilidade do executor; esta leitura não certifica correção ainda não inspecionada.

Imagem efetivamente aberta: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/cb15050f-ef51-464c-bd6d-8bee3ff62cbd/staged-22.png`; SHA-256 `c4e5cbd60f83a7e9148fc849e16d435fea250372e3172aacfad32cf7f3291cc7`.

Veredito desta rodada: **FIX_BEFORE_SHIP**. F-04 é expectativa de teste a atualizar; F-05 é defeito visual/runtime confirmado; evidência ainda pendente não foi promovida a defeito. Nenhuma escrita foi realizada fora deste relatório.


## Coleta estável de formação — inspeção visual complementar normal

O revisor abriu individualmente os16 PNG abaixo com view_image, do run `6fe022a7-9e87-4f7b-aa41-99e5101de847`, e mapeou as falas pela observation `formation-result.value.transcript`. Perfil normal, 1280×720. As oito respostas de seleção e as oito recusas por grupo cheio agora mostram cada herói à esquerda, namebox completo e correspondente, texto integral e indicador dentro da área visível. Os controles inferiores permanecem legíveis; não há retrato de Ivaí residual nesses quadros. Não foi encontrado novo defeito nessas16 superfícies. A forma fina do indicador em alguns instantes é sua animação dentro da caixa, não o corte fora do viewport de F-03.

Esses quadros resolvem especificamente a falta de retrato/namebox nas respostas normais das capturas transitórias anteriores. Não constituem inspeção do movimento, do perfil reduzido ou da descrição longa de Draska. Os PNG selected-*, removed-* e refused-* são menus posteriores, não foram abertos nesta rodada e não recebem certificação visual aqui.

O run tem **status fail**, com `Invalid verification result: formation-render:normal` em browser-runtime.mjs:296. A observation de resultado contém o percurso e o executor informou que todas as assertivas de estado chegaram ao fim, mas faltava o array de limites no resultado final. O report registra todos os oito recursos de cleanup como closed. Esta revisão conserva o status fail e aproveita somente as imagens realmente renderizadas; não declara a campanha PASS nem presume que o rerun corrigido ocorreu.

Base dos arquivos: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/6fe022a7-9e87-4f7b-aa41-99e5101de847/`. SHA-256 do report: `b0a531306001ba0a1bbfb83f440d2b2e3cfa688bbd4b7a05ea18367aed36ff40`.

| PNG aberto | Herói / ramo | SHA-256 |
| --- | --- | --- |
| `reading-17.png` | Gorvak / seleção | `f53e429c4bda72d10dc75ee31e2b586a91b658ee67f1230a60c2c4936f12eb61` |
| `reading-25.png` | Elowen / seleção | `33189cd72cd843d7326bd7d1328a3b502d0a6d4ab96d81e39438ac8e5d38f19f` |
| `reading-33.png` | Griznik / seleção | `a1afbbc77d3cf666236b6ef05fe3085b9a821ce68eb16020ce0f1a47a88d0fd1` |
| `reading-41.png` | Seraphina / seleção | `286608ffd0c53236cc62b4573c153ac1c65836d04cc59326344cb147064fe987` |
| `reading-49.png` | Bimbren / seleção | `26d94a251fd4143b165741d012b647ad383b349b373976e8e26ea7a2773ec581` |
| `reading-57.png` | Liora / seleção | `7ab813ca191ea2b75fc3f679e68f9cda518e11ad167460fb80420d26e274ef9d` |
| `reading-65.png` | Vaelith / seleção | `0a3f43ee765356769a5d45bb2d88dc7e2693e40a0321221281edca2aba800d7e` |
| `reading-73.png` | Draska / seleção | `eb5d02b3ea95fde90b363e4a17e70561c071af927a0e59ab8bb18dc7edf5f55d` |
| `reading-78.png` | Gorvak / grupo cheio | `d3b48638686cc09e7a82080fd36c01dc3342b0a698101698a9ca936a3fe3f5bb` |
| `reading-80.png` | Elowen / grupo cheio | `e46d80f7f058861677025c30b7f60cea71df3420f9cb8a7a5aa04d4763dc58b6` |
| `reading-82.png` | Griznik / grupo cheio | `40442123fc7a51fbc884ad934db7e7f0ee5457288648756b44f00725590215f9` |
| `reading-84.png` | Seraphina / grupo cheio | `bd0793d83f982ee38db855334149974e30196289bd296b3c305285b14d2dadea` |
| `reading-85.png` | Bimbren / grupo cheio | `e19fecf1e2a1bf80a43f519ef10c9db9fca9ea69695fae22a1784785c95d4953` |
| `reading-86.png` | Liora / grupo cheio | `eb9f8e4dffbcb2b8942fa333050d066a8d64ae8d2ae6e21114d8e8c993becaa0` |
| `reading-87.png` | Vaelith / grupo cheio | `6c05376ea0089e9f8b393fef42dc13b49b695f8f5c1cd96f644cb84d537d558e` |
| `reading-88.png` | Draska / grupo cheio | `9c7967ac4b57554481a8e0cbb3eb58c7e3f1471caae4890baeb425bea9b48f4a` |

### Precisão de escopo de F-05 e helper de retorno

O rastreamento adicional do executor foi conferido: todos os oito Maps037–044 possuem erase63 em list[22], logo após label hero, e erase60/erase63 em list[279–280] no caminho return. Portanto não é necessário duplicar cleanup nesses mapas. A exigência da rodada anterior de auditar esses consumidores está atendida; o reparo de F-05 deve ficar nos thresholds CE263–265 que não tinham limpeza subsequente. Isso não fecha a reprodução histórica nem certifica a correção sem novo render.

O executor também identificou IT-007 bloqueado no helper `tests/helpers/formation.mjs:90–92`: returnToTavern consulta a presença de Voltar à taverna antes que a saída animada termine, podendo escolher esperar formation enquanto o jogo ainda vai abrir hero. A leitura da fonte confirma essa janela de corrida. A proposta de esperar a choice window aberta/ativa de hero ou formation antes de decidir é apropriada; preserva a ação nativa e não exige sleeps arbitrários ou avanço de texto. Falha de sincronização do sensor é distinta de defeito de retorno no jogo. A reexecução permanece necessária.


## Rodada final estática — reparos e candidato em validação

O agregado congelado foi consultado diretamente em `task-04/canonical-aggregate-corrected.log`:134 casos canônicos,125 top-level aprovados e9 reprovados; TAP soma136 testes/125 pass/11 fail porque inclui dois filhos de IT-078. O execution.json de IT-078 que aponta PASS não supera o TAP: os filhos falharam. Esta rodada não aceita esse artefato como aprovação e não amplia o incremento para refatorar o runner.

Foram lidos os deltas finais de nove arquivos de testes/helper e dois de dados. A inversão em memória, independente e sem gravar fontes, restaurou exatamente os hashes já revisados de Map044 e CommonEvents: remover somente `<br>` e remover somente os três235[63] devolve os bytes anteriores. O resultado coincide com `task-08/final-repair-delta.json`. Os outros65 caminhos do recorte76 retêm os hashes anteriormente revisados; suas lentes e conclusões permanecem aplicáveis. Nenhum novo defeito estático foi encontrado nesta rodada.

| Achado / ajuste | Estado e fundamento da revisão |
| --- | --- |
| F-01 HIDE | Correção de propriedade já inspecionada; os arquivos de prólogo/Conselho permanecem com os bytes da rodada corretiva. Não reaberto. |
| F-02 guard Council HIDE | Corrigido na fonte: `testId.startsWith('IT-054/')` alcança os callers com perfil. Aguarda resultado da reexecução; não contar o agregado anterior como cobertura desse ramo. |
| F-03 Draska | Uma401 recebe apenas quebras nativas, sem palavras/caixas/unidades extras. Render normal novo inspecionado abaixo já cabe. Confirmação reduzida e sensor IT-081 final pendentes. |
| F-04 IT-078 | Corrigido na fonte: estado permanece igual e o segundo marcador prova avanço de exatamente uma caixa. Mantida verificação de ausência de fast-forward. Rerun pendente. |
| F-05 saída reduzida | CE263–265/list23 apagam63 depois da espera20 condicional, antes de ReadingEnd. Assim normal conserva animação e reduzido limpa imediatamente. Os mapas de heróis conservam seu cleanup existente. Rerender reduzido pendente. |
| returnToTavern | Espera foco hero/formation e janela ativa antes de escolher o retorno. Não avança prosa nem adiciona sleep. Reruns dependentes pendentes. |
| IT-001/UT-041/UT-055 | Lista de plugins reconhece AttachedPictures; identidades atualizadas para os IDs existentes. UT-055 conserva rejeição de passagem válida fora de ordem. |
| IT-025 | Mantém a restauração HIDE e prova segunda caixa com estado semântico inalterado. |
| IT-058 | Percorre todas as caixas autoradas de cada epílogo, impede caixa repetida/omitida antes dos créditos, exige picture1 ilustrada e ausência de60–70; não enfraquece o lifecycle para aceitar a mudança. |
| IT-081/IT-005 | Indicador é verificado em todas as sete caixas/all8/bothprofiles; IT-005 percorre os dois perfis e exige ausência de portraits após threshold. Continua cobrindo primeiro threshold físico; os demais dependem da campanha dirigida/matriz. |

As capturas task-local agora esperam duração/tone zerados e aceitam erro numérico de opacity menor que1e-6 em torno255; isso é compatível com o valor254.99999999999997 relatado e não permite visibilidade materialmente parcial. Namebox aberta e postrender continuam exigidos. A pequena tolerância não altera runtime.

A reexecução de13 casos em `task-04/final-affected-canonical.log` estava em andamento; nenhum resultado novo foi presumido. Pipeline dirigido final/Continues também em andamento. A ausência de audição utilizável e a falha do editor são limites comunicados pelo executor, não bugs de runtime inferidos. O bloqueio conhecido das prisões continua independente.

### Fingerprint final estático

Método idêntico ao manifesto inicial,76 arquivos modificados/adicionados em rpg-maker e fichas narrativas. SHA-256: `9758d2cbf705f5fe656a8bc04ea00903cd12196359093909c8878623f33eb7f9`. Base Git permanece `82aad84dd5df2376e18d53720747fae8d8c0e9ac`. A tabela registra todos os11 hashes que mudaram desde o manifesto corretivo; os demais são os mesmos já preservados acima.

| Caminho | SHA-256 |
| --- | --- |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `92bdfabfa6134c4efb6327b7978c28b0708ca457e523282d67296429211c2970` |
| `rpg-maker/The Dryland Drowned/data/Map044.json` | `42c0a2b61fe65fd7647e844513966de15a42fabdfdaaf14fd07c80eeb49f1cd9` |
| `rpg-maker/tests/helpers/formation.mjs` | `6a8f64c66bcdd35d4de482ad65d34fec561c54e14817e70ac6b7e87cff5f3d47` |
| `rpg-maker/tests/suites/diagnostics.mjs` | `8f72cdefe7f85c52bf2cabe0c21bd0abe184ab1d249e8b2e593f7d8a8d979035` |
| `rpg-maker/tests/suites/encounters.mjs` | `449f514a14c8430e6db5b319f658c69f83c9cc9634e49acc0a996c3a1d731938` |
| `rpg-maker/tests/suites/endings.mjs` | `4805e5d6383ae73875346fff75e75545f9e74d96039b9fdcb7601070f6b1ddde` |
| `rpg-maker/tests/suites/formation.mjs` | `ae2f4d701bc6b8820793342ce877a5e4bd4d1b7c2a17cd38f30136132bcb1851` |
| `rpg-maker/tests/suites/memorial.mjs` | `fe8eaefeb9136bfd6dcd45471656c7fdfb4e22a8c819a88327c81fed062ad5b8` |
| `rpg-maker/tests/suites/native-boot.mjs` | `ad2ac4e85933356be1cfca46eb973222929a88e22a0614937028cec757a57ae9` |
| `rpg-maker/tests/suites/native-controls.mjs` | `222608beb2013570e70456d7c659ca948184d0cacad7bc4b3aeed6c57c85d974` |
| `rpg-maker/tests/suites/shared-ui.mjs` | `0b0aaa9d2f27aea58caeb4f19ed9d21666f5e46595c08e3b082992aec438bef0` |

### Render normal final aberto durante a campanha

Nove PNG imutáveis foram abertos individualmente por view_image no run `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df`, ainda ativo. `staged-72.png` mostra a descrição de Draska em três linhas completas, com indicador dentro da janela ao fim da terceira linha; F-03 não se manifesta nesse quadro normal. Os oito quadros de seleção mostram portraits e nameboxes completos e correspondentes, resolvendo as lacunas transitórias dessa superfície; texto/indicador/controles cabem. Isso não declara PASS do run ainda em execução, nem representa o perfil reduzido.

Base: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/e18dc7a4-08dd-46a8-8ef2-8e5ba34854df/`.

| PNG aberto | Superfície | SHA-256 |
| --- | --- | --- |
| `staged-72.png` | Draska descrição | `a70ae02bd9429c71f569bba433295976ebde9c58886c1039680a5f59c8b57d72` |
| `staged-22.png` | Gorvak seleção | `9b5e45ada2daaf247ab99ccab27ac7ba7cc3b68637ee12476c9401fc3a21fbd1` |
| `staged-30.png` | Elowen seleção | `91023ea3e8f4dfa2690cd0dd2b44160ba13ee29538fc9eb49487cd4d7e9db218` |
| `staged-38.png` | Griznik seleção | `1608d9b36cae6e90a619af5e1e6f7300be80cc820143cb8cd84ba701305471e5` |
| `staged-46.png` | Seraphina seleção | `cbcceb4d441a9d176334fd36cc28e3f0627320e732a215fda90ba5ae97276595` |
| `staged-54.png` | Bimbren seleção | `1d1ee3e767e7e41cecbb138edb1100feeaa6fb6562115c758141ccc9a1596396` |
| `staged-62.png` | Liora seleção | `a5e694b811c2b1b106119a668c0548775c5017b10250c4a8bfa0b1fa994638dd` |
| `staged-70.png` | Vaelith seleção | `cda6a342673f7761103d759a4f191be8ed83fb798dbf5fc5df289f0eec8084c1` |
| `staged-78.png` | Draska seleção | `97cd79986788d3c91eaecf86b8324e187a6fd3af19af305f7b7bba00dd2ed3b5` |

Veredito global permanece **FIX_BEFORE_SHIP** pelos gates materiais/evidências ainda não fechados. Os reparos acima estão coerentes na fonte; este revisor não inventa aprovação dos reruns, de áudio ou de edição nativa. Somente este relatório foi escrito.


## Último lote visual delimitado — formação nos dois perfis

Foram abertos individualmente via view_image25 novos quadros: oito recusas por grupo cheio normal, a descrição corrigida de Draska reduzida, oito seleções reduzidas e oito recusas reduzidas. Em todos, retrato/falante correspondem, nomes completos e textos são legíveis, controles e indicador permanecem dentro da janela/tela. Nenhum novo defeito foi encontrado. O indicador da descrição de Draska aparece inteiro depois da terceira linha no perfil reduzido; junto à captura normal anterior, **F-03 fica resolvido visualmente nos dois perfis**. O resultado do sensor IT-081 reforçado continua separado e pendente nesta rodada.

O report normal `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df/report.json` foi lido após o término: status `executed-awaiting-review`, nove recursos closed. O transcript confirma as oito recusas nos seriais83/85/87/89/90/91/92/93 e as seleções/Draska da rodada anterior. SHA-256 do report: `d093ea4c9c38baba9facc296566a81c5ebb131f8afdb78e15822cb222c0b53a9`.

O run reduzido `b4ad6187-11b6-4351-a514-86cf61472a71` ainda não tinha report final ao encerrar esta inspeção. Os seriais foram identificados pelo texto e pelo nome efetivamente visíveis em cada PNG; não se inferiu o papel apenas pelo número. O executor consolidará seu transcript/status quando terminar. Os25 arquivos abaixo são evidência visual observada, não declaração de PASS da execução reduzida, da campanha completa, de audição, prisões ou editor.

A equivalência de fonte/arte já demonstrada no manifesto permanece pertinente: depois da revisão anterior os mapas/cast/assets dos heróis continuaram iguais, exceto as quebras de uma descrição de Draska. As mudanças de threshold não alteraram estas respostas. A inspeção anterior de menus/conversas/despedidas não foi recontada como nova coleta. O executor também comunicou inspeção própria de58 quadros de Conselho em `task-10/visual/council-recipes/`; este revisor não os abriu e não os adiciona ao seu ledger de visão direta.

### Ledger dos25 PNG abertos

Base normal: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/e18dc7a4-08dd-46a8-8ef2-8e5ba34854df/`. Base reduced: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/b4ad6187-11b6-4351-a514-86cf61472a71/`.

| Perfil / PNG | Herói / superfície | SHA-256 |
| --- | --- | --- |
| normal / `staged-83.png` | Gorvak / grupo cheio | `a6f01171b193c0774bb663ef8f943844532626985f9f26af2c34896cf6e03ce9` |
| normal / `staged-85.png` | Elowen / grupo cheio | `cdc1381d71a51115a63bd4258874e1a304b427bf82e7afd2605badbd2cc35063` |
| normal / `staged-87.png` | Griznik / grupo cheio | `7f47e8d8b256dafa9f0786cc3cc1f2e770f0ac11dfbe667c0200fbc35ccb5afa` |
| normal / `staged-89.png` | Seraphina / grupo cheio | `c6989dd74ab1eca234fea213de12194274efc0bace21819fd12e3753185c1ba2` |
| normal / `staged-90.png` | Bimbren / grupo cheio | `7ca9af9e8cdd6f9160b68d4bc056ea41c6d04eee45b59dc661016de01e76660d` |
| normal / `staged-91.png` | Liora / grupo cheio | `e0859a54faad8f9f21beb7f94a8b7e803cfa204b5be9d778ed33c1b8133044a7` |
| normal / `staged-92.png` | Vaelith / grupo cheio | `95d221b2c54a84edd75e936b750c4a06e3b44c679bd4356a89099e8340b55be5` |
| normal / `staged-93.png` | Draska / grupo cheio | `e3e390e8ed87b0c646c8f069461c5c5294aa2bdcf16f1d57f1b41a01560e7572` |
| reduced / `staged-72.png` | Draska / descrição | `539cd17c80d323f871fbee9de090479ea3a0dea402957975c1b404e01eb15f97` |
| reduced / `staged-22.png` | Gorvak / seleção | `4d98959dc34880cf6bdb0fe8cb691231a20114d3dcd747dc217e56e15b07ad77` |
| reduced / `staged-30.png` | Elowen / seleção | `2a5e8642d9dddaa42e10cc4c4aa5c7d95db90e8e3b7ae17c2fed2900c3b80490` |
| reduced / `staged-38.png` | Griznik / seleção | `00088701f679af42af01f4518418a3889a6d841bfc4d10b247b8d0a01bd06da1` |
| reduced / `staged-46.png` | Seraphina / seleção | `9e03a1f47911ea65a81b684218f2c8e3ceb2cc3e575c777a883de3ba3c012508` |
| reduced / `staged-54.png` | Bimbren / seleção | `868ab15b8674089d720cdcda602dbdcf806ddd4e56ce0cb3e73f71c9c4743f14` |
| reduced / `staged-62.png` | Liora / seleção | `27330eb6bbcb33060a69d6f6320007e5d516175cc5d3a780244b694a231813d1` |
| reduced / `staged-70.png` | Vaelith / seleção | `63ed5e380dc04f7b4dc5303d3d24aed53f5563469bc99c9ccb3bcf0ffa12dbe9` |
| reduced / `staged-78.png` | Draska / seleção | `04dded8fbb928b9488efb86f6ac62255eed8873ac8a727d367df5e015f340d75` |
| reduced / `staged-83.png` | Gorvak / grupo cheio | `5798c1b1caa692810c56f3e5ab7441fa67bb5e43ddf679454d967576b3b00935` |
| reduced / `staged-85.png` | Elowen / grupo cheio | `ea39a1f2c437426626eb0f46a46d90ce427c86f2601ac1b7da5ef6ff333465af` |
| reduced / `staged-87.png` | Griznik / grupo cheio | `48f3203d75278e45dc46143fd9b6fece9c074439666183e21ea747ae4393f5a1` |
| reduced / `staged-89.png` | Seraphina / grupo cheio | `fc51d30a3ebe6390c2d6962501dbcce258ecf36c0ef25af8da9b99389b7f0fc7` |
| reduced / `staged-90.png` | Bimbren / grupo cheio | `f131f5007030fd5dccc523cb008de6a8bee5c60edd1f3b060fe037c90a5c3d5a` |
| reduced / `staged-91.png` | Liora / grupo cheio | `0707aecc99dca46e4bfaaa5b00509ee1f54704afaa9db29bee9e5c701f248b91` |
| reduced / `staged-92.png` | Vaelith / grupo cheio | `58a1550bcbfc4c445c8767856e8e35f921c86acc1e0bc612afb45f44ca91d69e` |
| reduced / `staged-93.png` | Draska / grupo cheio | `e78ae7f223ab4ab512a56e00ad428fa613ef454332b5946bd1dd1caab5099870` |

### Resultado parcial canônico lido, sem antecipar o restante

O log `task-04/final-affected-canonical.log` já registra PASS de IT-001, UT-041, IT-025, IT-078 e IT-007. IT-078 agora passa no TAP, inclusive ambos os filhos; isso fornece a revalidação de F-04 sem usar o antigo execution.json enganoso. IT-058 consta FAIL por orçamento de240s; segundo o executor, chegou ao último modo de créditos após progredir nos anteriores. A proposta de ajustar somente o timeout para300s e rerodar isoladamente é proporcional ao workload adicional, desde que preservados assertivas e ritmo nativo; nesta rodada ela ainda não foi tratada como execução aprovada. O restante do lote estava ativo. Nenhum teste foi executado por este revisor.


## Fechamento independente — execução final, F-05 e orçamento de créditos

Os11 entries de `task-10/final-lots.json` foram cruzados com seus próprios report.json: todos têm errors vazio e todos os recursos de cleanup closed. Quatro campanhas registram `executed-awaiting-review`; sete Continues registram `pass`. A confirmação do transcript reduzido fecha o limite de mapeamento da rodada anterior: seus17 seriais de seleção/descrição/grupo cheio coincidem em nome e texto com o normal. O report reduzido declara arquivo2, `preservedImportedFile=true`, sete archives e367458ms de execução. Status de execução e aceitação visual permanecem distintos.

| Caso / variante | Run | Status conferido |
| --- | --- | --- |
| directed / physical-first | `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df` | `executed-awaiting-review`; errors0; cleanup completo |
| directed / supernatural-first | `b4ad6187-11b6-4351-a514-86cf61472a71` | `executed-awaiting-review`; errors0; cleanup completo |
| directed / bad | `6202e7c0-ec52-4fa8-996f-01beda746e11` | `executed-awaiting-review`; errors0; cleanup completo |
| directed / branch-destroy | `eee3c777-0d45-41a9-9eea-4a48f29e39ef` | `executed-awaiting-review`; errors0; cleanup completo |
| continue / opening | `50146209-f680-41cf-8edd-124e95aa43e8` | `pass`; errors0; cleanup completo |
| continue / result | `0fed6c95-716d-40dc-8873-5907cd4e0f76` | `pass`; errors0; cleanup completo |
| continue / closure-first-01 | `905917df-79e1-4d3e-aa23-fe32cad2c336` | `pass`; errors0; cleanup completo |
| continue / closure-second-01 | `418233f8-5f4e-4ee4-b09b-a1fe30f96a34` | `pass`; errors0; cleanup completo |
| continue / medallion | `6d8e1512-3ad5-404b-bdc5-14b3e4b061ef` | `pass`; errors0; cleanup completo |
| continue / ending | `f7287a9e-ec96-4db9-a47f-9e29b6563eaa` | `pass`; errors0; cleanup completo |
| continue / two-files | `d8693985-8e5f-46f7-ad36-446c4e1d0869` | `pass`; errors0; cleanup completo |

### F-05 fechado por evidência renderizada após reparo

Este revisor abriu os quatro contatos abaixo via view_image. `three-routes.png` combina as três falas de threshold com seus primeiros encontros: Ivaí aparece onde fala e está ausente nos três encontros seguintes. `contact.png`, extraído a10fps entre238.4–240.1s, mostra Ivaí presente até238.7s e ausente em238.8s antes da mudança de cenário; não existe retrato herdado na entrada do encontro. `all-eight.png` mostra as oito despedidas somente com o falante correto; a despedida de Vaelith que antes tinha Ivaí residual agora está limpa. `motion.png`, amostrado a10fps entre45.1–46.8s, mostra Seraphina desaparecer entre45.8–45.9s antes do contexto de morte, sem deslocamento de saída visível nesses quadros.

Os dois hashes de vídeo dos provenance.json foram recalculados e conferem. Todos os14 hashes de PNG-fonte nos dois stills.json (seis thresholds/encontros e oito despedidas) também conferem. Foram vistos os contatos, não reproduzido o vídeo por este revisor: a amostragem confirma a fronteira visual acima, sem pretender observação contínua quadro a quadro ou audição. Com o reparo nativo já revisado, a ausência residual após as três entradas e a regressão IT-005 aprovada, F-05 fica fechado neste recorte.

| Contato efetivamente aberto | SHA-256 |
| --- | --- |
| `task-10/visual/final-threshold-reduced/three-routes.png` | `8b9930fb169a23b49a752f7daa9b6d8499adab91ecf97dc70a680863cc58dc17` |
| `task-10/visual/final-threshold-reduced/contact.png` | `072f03d51040a384ce203abfb1d6a3ea87f9da344a88b70c3ad499762a4888b8` |
| `task-10/visual/final-farewells-reduced/all-eight.png` | `5d14dfc4d888ba8f71ffaea1582fdaca70004893b0c9e055a6690f7c05e1a6d8` |
| `task-10/visual/final-farewells-reduced/motion.png` | `d07a4d83fa49a65c909f2f0a6e3512a958d31bae0b372e7016df6f7ec83815f4` |

### Fechamento dos sensores e último fingerprint

O log final afetado registra17 testes incluindo filhos:16 pass, zero fail, um cancelled por orçamento de IT-058, duração980070.775417ms. São12 dos13 casos canônicos aprovados naquele lote, incluindo F-02/IT-054, F-04/IT-078, indicador de Draska/IT-081 e transferências/IT-005. O log isolado `task-04/final-credit-budget.log` foi lido depois de terminar: IT-058 PASS em216002.293167ms; total216408.4315ms,1 pass, zero fail/cancelled. Assim os13 casos afetados têm validação final, sem apagar ou reinterpretar as falhas históricas.

A única alteração desde o fingerprint9758d2cb é `{timeout:240000}` → `{timeout:300000}` em IT-058. Sua inversão em memória restaura exatamente o hash anterior do arquivo; assertivas, caixas e velocidade de créditos não mudaram. Hash final de `rpg-maker/tests/suites/memorial.mjs`: `8cc88bd5f8e6bc3d298811e5a1a2129c6c034460eb1f121df469543de3cd790d`. Método de fingerprint continua o mesmo manifesto de76 caminhos. Hash final do candidato: `c947986e39abdc80e24a80ec1d8961d283065848768ad9c2f1266f059bd9772a`.

F-01 (HIDE), F-02 (guard de cobertura), F-03 (indicador de Draska), F-04 (expectativa IT-078) e F-05 (cleanup reduzido) estão fechados. A regressão do helper de retorno e as expectativas antigas têm validação no lote afetado. Não existe nova pendência de código/teste apontada por este review. O veredito global **FIX_BEFORE_SHIP** permanece somente pelos bloqueios/gates externos ou visuais conhecidos registrados pelo executor: prisões, entrada de áudio não suportada e editor cgwWindowNotFound. Nenhuma aprovação de conteúdo adicional é inferida como necessária; nenhum desses gates foi convertido em PASS.

### Hashes dos registros finais consultados

| Registro | SHA-256 |
| --- | --- |
| `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/final-lots.json` | `924ddc70ca4dd73eccf2a85019e29ca923efa75b0ee13de2f210defc92e905e2` |
| `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/b4ad6187-11b6-4351-a514-86cf61472a71/report.json` | `2f4840b2bc2c60f345c621d31a52704819470f0387bcae7bccf710685d73c835` |
| `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/final-affected-canonical.log` | `0f381ef1247e417378ce9f21b5318db8dc25bd9ff11019a873eb7a869521accc` |
| `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/final-credit-budget.log` | `35b40f1a11c542addd86da46964168454aa90af8993d0703c7f4f48efe8dfa19` |

Este fechamento escreveu somente deep-review.md. Nenhum navegador, teste, runtime ou screenshot foi alterado pelo revisor.
