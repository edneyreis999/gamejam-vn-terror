# Revisão runtime final — prototype-feedback-refinement

- Data da revisão: 2026-09-25
- Base Git: `c47c6fcbc847158d0f96c9ec3eab912f6de127e2`
- Escopo: implementação incremental das tarefas 01–11 no jogo `rpg-maker/The Dryland Drowned/`, comparada com `spec.md`, `verification.md` e os cinco contratos aprovados.
- Veredito técnico: **FIX_BEFORE_SHIP** por uma lacuna de registro de preload (F-001). A revisão estática não encontrou outro defeito concreto nos caminhos cobertos.
- Esta revisão não abriu o jogo, não executou browser, teste, Editor ou captura. Nenhum recibo técnico abaixo substitui aceitação LIVE/humana.

## F-001 — placas de título e aviso etário não estão no preload escopado

- **Severidade:** média / P2; contrato violado, falha visual em primeira entrada ainda não reproduzida neste passe.
- **Evidência do contrato:** `prototype-feedback-refinement.technical-art.md:17` exige registrar cada nova imagem final no owner de preload CE351.
- **Evidência de autoria:** `apply-task-01.mjs:3–9` cria `Dryland_Black`, `Dryland_TitleText`, `Dryland_AgeWarning`, `Dryland_MenuButton`, `Dryland_AgeCheckbox` e `Dryland_AgeMark`.
- **Evidência de consumo:** CE2 usa `Dryland_TitleText`, `Dryland_AgeMark` e `Dryland_MenuButton` em `data/CommonEvents.json:172,210,248,300,352`; CE354 usa `Dryland_Black`, `Dryland_AgeWarning`, `Dryland_MenuButton` e `Dryland_AgeCheckbox` em `data/CommonEvents.json:69824,69840,69878,69930,69990,70162`.
- **Evidência do owner atual:** o `SystemLoadImages` de CE351 em `data/CommonEvents.json:69182–69192` lista os plates de tarefas 02–10, mas não contém nenhum dos seis nomes acima. CE2 é chamado pelo evento de título de Map001 antes de qualquer chamada a CE351 (`data/Map001.json`, evento 1), portanto o primeiro título não pode contar com uma passagem anterior pelo owner.
- **Asset check:** os seis PNGs existem no working tree e foram lidos como RGBA válidos: `Dryland_Black` 1280×720, `Dryland_TitleText` 800×144, `Dryland_AgeWarning` 896×176, `Dryland_MenuButton` 384×64, `Dryland_AgeCheckbox` 704×56 e `Dryland_AgeMark` 64×48. O contrato permite desenho nativo/plates finais; não há evidência de placeholder.
- **Impacto:** o MZ pode carregar uma imagem sob demanda, então a ausência não prova sozinha uma tela quebrada. Ela descumpre o preload explícito e deixa a primeira entrada sujeita a carregamento tardio/flicker, especialmente no caminho título → aviso. Registrar os seis nomes em CE351 e repetir a verificação de entrada/preload antes da entrega.

## Cobertura e rastreabilidade

Foram lidos: `spec.md`, `verification.md`, `tasks.md`, `task-01.md`–`task-11.md`, `apply-task-01.mjs`–`apply-task-11.mjs`, `native-authoring.mjs` e os contratos `prototype-feedback-refinement.programacao.md`, `.uiux.md`, `.narrativa.md`, `.technical-art.md` e `.audio.md`. Os `apply-task-*.mjs` e contratos deste incremento estão não rastreados no HEAD; são tratados como a proposta incremental corrente, não como histórico da base.

Os caminhos de jogo cobertos foram:

- `data/CommonEvents.json`: CE2/3/38/39/40/43/44/45/51/52/58–61/67/117/263–281/291/302/304/337–355, incluindo leitura, escolha, cleanup, attached pictures, retorno, memorial e áudio.
- `data/Map002.json`, `Map007.json`–`Map023.json`, `Map029.json`–`Map044.json`: prologue, oito encontros, Council, oito epilogues e oito visitas de heróis.
- `data/System.json`: rótulos/variáveis alterados e `versionId`; mudança do identificador é compatível com o comportamento nativo de reload de mapa e não foi tratada como migração de save.
- `js/plugins/Dryland_CampaignRules.js`, `Dryland_EventBridge.js`, `Dryland_Presentation.js`: ordem de carregamento, metadados, regras, query/action, persistência, save atual, callbacks tardios, input, observação, pictures e efeitos.
- `js/plugins.js`: os plugins ativos permanecem na ordem VisuMZ (Core/Message/Options/Save/Picture/Attached/EventTitle/MessageVisibility) seguida por `Dryland_CampaignRules`, `Dryland_EventBridge` e `Dryland_Presentation` (`:6`, `:83`, `:360`, `:366`, `:374`). Não há engine, vendor ou Coreto alterado no escopo.
- `img/pictures/Dryland_*.png`: todos os vinte novos plates existem, são PNG/RGBA válidos e foram comparados com os consumidores; o único desvio de contrato é o subconjunto de seis placas de F-001 ausente em CE351.

Lentes aplicadas: source-to-event mapping e IDs de leitura; gramática/indentação de comandos nativos; owner e ordem de plugins; estado mínimo e normalização de saves; cursor/request/result de save manual; rejeição de callback tardio; HIDE/ChoiceFocus/ConsumeInput; bind e remoção de attachments; cleanup em retorno/load/title; barreira de 180 frames e motion reduced; passagem de ausência; framing declarado; preload; contexto BGM/BGS, parada em CE61 e exclusão de Applause dos epilogues.

Validações estáticas auxiliares, sem iniciar o jogo: 559 chamadas nativas de Common Event apontam para IDs existentes; 4.097 comandos de plugin encontrados usam owners ativos; nomes de picture consumidos têm arquivo correspondente. Essas contagens são checks de integridade, não testes de runtime.

## Conclusões por lifecycle

- `CampaignRules` mantém `preparationIntroductionCompleted` como único novo fato, reinicia-o na transição genuína de formação, só aceita `COMPLETE_PREPARATION_INTRODUCTION` em formação incompleta e normaliza ausência para `false` (`Dryland_CampaignRules.js:82–92,252–261,474–484,610–640,710`). Não foi observado coercion de valor inválido.
- `EventBridge` expõe a query/action correspondentes e atrela `SaveCurrentCampaign` a cena, `Game_System`, arquivo corrente e promise; o callback manual usa `WeakMap`, elimina request em load/new game/title e não mostra sucesso depois de uma cena/sistema obsoleto (`Dryland_EventBridge.js:334–376,384–476,526–570`). Não foi encontrado segundo write concorrente ou slot chooser introduzido.
- CE3/38/39 e CE355 preservam formação antes de destino; a introdução Ivaí usa observação 355 e completa o fato somente depois da caixa final (`CommonEvents.json:70398–70478`). CE117 separa o quadro de mortos do memorial e mantém a mensagem vazia aprovada (`CommonEvents.json:50846` e bloco CE117). CE43/266–281 mantém seleção de vítima antes da consequência nomeada.
- CE348 só arma ausência quando a fase consultada é `formation`; Map007–022 e CE44/51/52 são os callers auditados. CE45 inicia os movimentos de todos os mortos, usa `WaitForReturnPresentation` uma única vez e CE349 remove os vínculos (`CommonEvents.json:16770,68557–68558,69100–69155`). Não foi encontrado timer paralelo ativo de CE350.
- CE337 e as rotinas CE338–345/CE347 preservam ordem e completion sem apagar o texto-fonte por regra estática; a medição/legibilidade máxima continua dependente de captura LIVE. CE59 usa o modo de coordenadas por variáveis já existente, não posições literais.
- CE67 seleciona Town1/People2 para os contextos presentes, incluindo epilogues; CE061 para BGM/BGS antes dos créditos, enquanto Applause1 permanece apenas na entrada original do prólogo. Não há reivindicação de escuta humana.

## Receipts e riscos residuais

Os `task-*.md` registram checks técnicos e os diretórios `docs/qa/evidence/prototype-feedback-refinement/` contêm receipts de lotes anteriores. Eles foram auditados como recibos, sem promover seus PASS a aceitação visual, sonora ou de interação. A execução LIVE de task13 continua necessária para:

- T-001/T-007: abrir/salvar/reabrir no Editor e capturar 1280×720 e 1920×1080, incluindo título/aviso, retornos, oito mortos e texto memorial completo. A falha de crop do monitor no Editor relatada durante a rodada não é evidência de authoring.
- V-001/V-004/V-005/V-006/V-009/V-010/V-011/V-012/V-013/V-014/V-015: framing, input/hold-release, timing, leitura humana, áudio e legibilidade.
- T-006/V-010: escuta real de Town1/People2, continuidade entre epilogues e silêncio na entrada dos créditos.

As falhas de ambiente/fixture relatadas durante a rodada (separador de caminho do browser runtime, ffmpeg, readiness de janela e fixture de `$gameMessage`) permanecem fora do veredito do runtime deste documento. Não alterei nem reavaliei QA/helper/testes concorrentes.

## Hash manifest

SHA-256 atual dos documentos de autoridade não presentes no commit base (o `HEAD` continua sendo o commit acima):

```text
spec.md                                      7d579e8dd1f5658a5c2004cc87fc8413f21fe943df9eb336e5c6a36078aae058
verification.md                              e873671441fb91e756c72e520d93a00769ced2343d8f67dd32ee311b7aef1af0
tasks.md                                     fc1bbe1d1e667b76297754c925de0a0d94f29a3b49efa65b5a05132d7367712a
programacao.md                               565a076a845180be890049429b6c067d266d23d133b1b4a4bc3ac53d68a4d67d
uiux.md                                      4d1a92c7c2e6d53830df8cbd5e6e38fcdd5b37a0471db17af1e500b60147b55e
narrativa.md                                 3b0510cc0448307338e0007bbeb376d4158ac7caa239cad56be0be7615aa9c8b
technical-art.md                             52dea1f3331557abee50339ce940f40de0d47989c5e8481584c1cf12b2ba35b1
audio.md                                     03a83c1d5eefa87d6938b6df1562227835da2e55cd1d05cca07818c7a015550f
```

Tracked runtime files are shown as `HEAD blob → working-tree SHA-256`:

```text
data/CommonEvents.json             eadf14388dd63b45f66a5d1ae6ffcd7091282135 → 648d1f587679564da098f3d7649b5920ce27d2bf1123f14a5d53f3572b08d214
data/System.json                   1029bb43bf356ee226a3293c3ca6e8aaf1aff31c → 6b9fa69f43c91d4db262d4fad6efe002c52ec81d4317f79a18348994781e8fac
js/plugins.js                      c7258a38610c7f5bbf107192093cfd54888d77bf → 99c2afe123ac9f597d956fa20660632f2d35f55cb3e85a2ec9f9ff8eb27c4e6a
js/plugins/Dryland_CampaignRules.js ce48e69f5a444ce5056964c9daa2b41e9b057748 → 48f953cf06a381c20932cab6703019563738f45348234d99038e156ecdcdb70e
js/plugins/Dryland_EventBridge.js  e16da0cf2b109735a3c66187b1fdce86fe25f920 → 76608c8346012947f0e32a36cc80b5437e669aa9ea9d5c65da00112f293b2bc3
js/plugins/Dryland_Presentation.js 3b36d7029dab1894c4d8d6bc6697c595d525c904 → 0de514bd0912ddaa62d189bd30b4c5c38ad3b81865831e3066a6a4b4e89bb173
```

Map blob/current hashes, in the same order as the reviewed families:

```text
Map002  96fe5618d0bd4509ab862ca56d0ab5b1aa753163 → a27baf8ba506f9dc088c6f9990d32f8975dc951094f7085133ad835e2d54584b
Map007  101364e65b6a00de5f8bffb94e52c9788a125179 → f3d388207f38558dde069ef21463772f2d4db98b09dd4cb33ca607fb65bc8425
Map008  1ed530a572c6d79dd9f77ff18faae342f287a3f3 → fa295fb2c29b235735e724a6adbc76ad311b4288ea9768e410c207d6fb6f6951
Map009  cbea756132cc98d53e74e15c426b4422029c9085 → 93dd47b2ace687cd0b35e8678e344312725d2134f82940411013b0aa8f1deeea
Map010  f626e34543192ed6caed65b32cf116a405fee5c4 → b044174a49a6114c5291480fe284c6634dbc181cd50f8c63e3d0d79dab6f1928
Map011  f80280baa6d52d9d596f58075f4db40a48ce6ea9 → 6fa905e997f37305dcb7cfa626c21ae9423bc2bc55e913926d39c36d8768664a
Map012  ba9d62f8f8cac6cb0eda9b5a4b29a1566cec9c0c → 4cf10e0f20b6b58a47c4f664a9ded7b5b19322a99d108276e52d6d346d14c0f2
Map013  a85e463e6d33069d78975c1b24cf6af0f21b9f02 → 1819dd9716bf033f22afb7b81505da07d6c80c005b9772027a0685a9bfad1cfd
Map014  5ae2be8e4aede511090fee28d526b11cc970b705 → 01b7578304682c48965bbda3e5597d6cf0ff1f938eb713cde70a8f7d81c8db7e
Map015  b544450af9d7172fe790483dac24d44ad788eadc → e8aec55d1e434d14dfbb4425b60810f32789165a0d8a6f01747a58957ed4ee1d
Map016  478995a2182b2f40b4990fd5ff07b8ba470561f8 → ddbe3e42ff7a14e56996b47852a5eea61d7ee3c8baacc65690d571cecd4a34e4
Map017  f12d6026e46ef926dc824e33667c1a4a9ffeeca5 → 71ea6152e73e388b4908336d3c7c6eaa6efdd4f501251a9a01d6d607b6e6d200
Map018  c2340d5fad8529970066bcf9e2410a3c6e0c7455 → 15bf229ac114e8d018a845f5aae1b1c852cf9027830e5c2c10a4b902af068983
Map019  912c9e957ff8c4839fc76d1fe4510a374aaf7e88 → 41ce7fa892a28b6e928f36d9aa445d69db765e2f9961eb5bda30f1bd07481104
Map020  28e4a0c47664905ab6930ffa6324bccfaf26033a → 72bb29b9c1abde2c02c929958a8761064175cb760bfe8f62504639b76b8d49d6
Map021  c0cfaf175b8c953e943e8819d4f1ca5a4b37de36 → 444d9f9cb0432fd5b9bc3b6fef45e907ac11d96fc0d0a29f987e1e966c3d9acc
Map022  39cde25cca70feb7eba55d40a581f3597a990d79 → 8c57660af689340861ef3bd2c075424d64b693f3b80cdb64f7fccef117b7ab76
Map023  09f621c0ee81f689c5573b201600edd37e738b0c → 4b34e7083ff9e66c4dba766e8554f238356c0e4832419e9577010148ce7afa80
Map029  de5b778ae97e69c5bec68aa9ca433d7504173c4b → 12b948acd640df2456f812b4dd134d8bb97818569490844133677157d9f8f0b0
Map030  aed5d716c8abafc2d7912c43003adb08cb4a2c01 → 5233e89791c55856a1160b2f673cf57c453ecb8a28b5ec59dfc9e1a22d9f3db2
Map031  452a858f898bb28113b3b153e52097df8310a5b7 → 50b96e8aabbeb64efea7556412f64cd7786549298b45c31bc7660698d68c0a54
Map032  aa55e34ba40b67e6aff4a7097bf08bda81f952b3 → d0e9ec7a72bb6d9bf5fbd29716d690bbefdbc2dba528df59723bcde54c6a58f8
Map033  ef88615c4cbfeff739ccbb22a12cf9d1e71bb09d → b1ecc809c5821f9c639933f08b6755b509f0dead9d9960b5eb29eabf5c944936
Map034  e864c9bdbe0619fcb70df5ae53f54cf3092d6e9 → 4fb7d37241123930eb8ae9af6b08a18e14eea41247c4a98e8917a4cbbbfc4315
Map035  651ae56fe719376faaef3ff065b17e277a4380bf → 4bf501d66093a19951f36f80f97b871724ca8c06d81a87bf45298045d7f67ca7
Map036  40f8fcfdb587b17b343f6c6316a14e64fb772061 → 155fb8621d8dcd568ba4b02321b15af70623908f8fc078767bf4ee9b1892b61a
Map037  8ef74faecac4b74e8faadf4783a32e8294834534 → 7bd90171db1561cd314f1b3b963e026fdc4f98b519b74cdfc0e05d2902b7a188
Map038  da02cd1a7afccddc1c2622e5db60d0dc667fa66d → 66565024f9699852cf032a811270e79e45324560eca31d2b6855685619ae9bd7
Map039  8d49feb26e28e85d3e8758478fd89f13b02e86fb → dbd265ed770dd5dddb61f7fe73fca45247e584ce49c9dd055bf3e512de393036
Map040  70f04120f271dcc3e607a2fa198b99f604789241 → 122fe02243e03535f18a16c0425420aeb6db749885fef554cad526628f3ad0b3
Map041  daa88dacef30fdd1a22af66878a6af9cab42b4eb → bc3fdefcfafb6b0e25e4a143c779f9d0c4808ff6eff42a498d02468d83f61b94
Map042  4be790803c2ddd9c1b15c09885571a62f3276c66 → 1f1dde339269161218814448b486f6d55ac8389690ad02575e7f2a03a145ac74
Map043  915f05d23f25b062da74155f41939a92ea0f37e4 → 9518860d28af8904a1c1299d77d4f636970c66cbd72ed14161efdfee2fa12305
Map044  7e1f0eeb2796d888c89a6ecb4d8b418d039cd658 → 34bc9405f76a40c9a614eebe258eb07b5c9d9703d0691f25a82e081a0edb8e08
```

New picture files are untracked at this review point; their current hashes are recorded for the files introduced by tasks 01–10:

```text
AgeCheckbox ddbe93305cfff8ce4613b7cb2b6602b7fb385fca47f8a43271959a595625924d
AgeMark a8cd488649d8e012640a0575e32a2b83d7c8d52e53a92330eb2352bc716c1b57
AgeWarning 3d33303e91f56ed220659a22e1513ae7c02dc786d243d5343b13b1be844bb0c4
Black 2a15b82d7ea77d43dd1d1b502773a8b6586bb6fd749312b49a956c62ea054f63
FinalChoice bb26b3c1edf72cdf3dbd34c84ea043c5f859c9a46c81c4b0a6e8e9ca27017fcb
HeroContainer 4ebc524734b24bb0f8a85ca2f6f1d7ae0445d1a65d87d0280112050f6ffcf155
MemorialLabel 3e5aa527aae81c788336491eff7287ef7a797fa2d96cc2bb1cf0bc6d07ff1d48
MenuButton f74b363e1df54a46fdfca8185aa68f4d424fa2e0d6ff458b9e6c64c73f3ad9c8
NameRow 1dea9d8f2a1284d9df1fe84392179873a8519b8435e199bedcffb19f3442d70c
NamesReader d18c90edce1a27ace29e9a1efe7a3d05012b8d214b39d289aaa54c25ef6e0483
NarrativeChoice 71f074f209b6106e1cb4890792f1e484a3caeab05e9ddc3c078464512d4246a9
RouteFooter 6dbe119f8ad8b68166f5ae38f37454d6bebf377a55101558d21068cbd141d28
RouteInformation 13d5dad102caa7fc16adf0c8450077363f8eaf46fa49815749e67f54cb3a8bd5
RouteTarget df9a74d4d926af7dbfa482025b5cfd75256b3b4f2f2c0c8f5edc7cdab0c54544
SacrificeContainer 2f014d071d5636aad11bd1a2e8d919dfc16fbdb2a4c7ed472d777e4c76537971
SaveButton bc2f84210a0e11420da7018af8bdba864ec1bee52653aedcb7e5a43660829c42
SaveNotice dae5de3d471d7ab31fc8a9a47254f132f5a8ce7c9703783b7dc4578b8057951b
SettingsButton ea6c3ce511d0afebc92c38b2409be96e3243dd89ebae3d961fd1b19ee6127b76
TitleText 2f25f9d561ec2e11a76d3c7283db58b41a76f497cb9569cc191812b1319d487d
WallBoard 7af1d2e4744d76a759d69493fcda2fe6498509f1167a35c1edf26b330dee0aeb
```

## Rodada 2 — fechamento do preload

Esta rodada foi limitada ao F-001 e à integridade dos hashes registrados. A correção acrescentou somente os seis nomes requeridos à string `pictures:arraystr` do CE351. A lista corrente em `data/CommonEvents.json:69192` contém todos os seis: `Dryland_Black`, `Dryland_TitleText`, `Dryland_AgeWarning`, `Dryland_MenuButton`, `Dryland_AgeCheckbox` e `Dryland_AgeMark`; a leitura JSON encontrou `missing=[]` e 49 pictures no owner.

O hash atual de `data/CommonEvents.json` é `7e9d87075bdcf579354576ca74199d0abfbe14c082e5d73df00e9d978e8fb5e1`, substituindo o hash registrado antes da correção (`648d1f587679564da098f3d7649b5920ce27d2bf1123f14a5d53f3572b08d214`). Os outros 39 hashes runtime registrados — `System.json`, `plugins.js`, os três plugins Dryland e Map002/007–023/029–044 — permanecem idênticos aos valores do manifest acima.

**Veredito estático da rodada 2: SHIP.** F-001 permanece documentado como finding histórico e está fechado no estado corrente; não surgiu novo finding. Isso é um parecer técnico do runtime congelado, não uma declaração de conclusão da task13. O relato externo de IT074/IT085/IT022 3/3 após a correção é receipt de QA do parent; não foi rerodado nesta revisão. Capturas de Editor, framing, áudio, interação e aprovação humana continuam residuais conforme a seção anterior; a primeira cópia e55 com falha de transporte WAV permanece fora deste parecer.

## Rodada 3 — retorno de `Partir` e dono do intérprete

O directed run `7261ce4b-ac35-434f-9d52-d2f1a005f111` expôs um defeito histórico novo (alta/P1): depois do primeiro `Partir`, a campanha já estava em `dungeon_intro` físico e o jogador estava em Map004, mas a formação/board de Map003 continuava ativa. A falha é explicada estaticamente pela cadeia abaixo; não foi reproduzida de forma independente nesta revisão.

1. O autorun de Map003 chama CE3 (`data/Map003.json:1`). O ramo `Seguir` chama CE349 e CE39 (`data/CommonEvents.json:4061–4080`).
2. O ramo `Partir` de CE39 limpa as pictures, executa `Dryland_EventBridge.Action` `DEPART` (`data/CommonEvents.json:10528–10671`), grava o checkpoint e reserva `Transfer Player` para Map004 com `[0,4,10,7,2,0]` (`data/CommonEvents.json:10690–10698`). `CampaignRules` aceita `DEPART` somente em `formation` e produz `phase: 'dungeon_intro'` (`Dryland_CampaignRules.js:633–640`).
3. A fonte/fixture usada para a correção já tinha o `Exit Event Processing` (`code 115`) de CE39 imediatamente após o transfer; esse comando encerra somente o child. O registro de `task-13.md:85` e `record-departure-repair.mjs:4` identifica o defeito no retorno ao parent: CE3, ao retomar depois de CE39, continuava até seu `Jump Label tavern` (`data/CommonEvents.json:4192–4197` na revisão anterior) e relançava CE38/formation. Como `fix-departure-owner.mjs:5–10` altera somente CE3, esta revisão não atribui um loop de CE39 ao run 7261.
4. O motor mantém o intérprete antigo aguardando `isTransferring()` no comando 201 (`js/rmmz_objects.js:9604–9618,10491–10505`). `Game_Map.updateInterpreter` só procura o autorun do mapa seguinte depois que o intérprete corrente termina (`js/rmmz_objects.js:6799–6823`). Assim, o evento de Map004 que chama CE40 (`data/Map004.json:1`) não conseguia assumir o fluxo; o sintoma observado em Map004 era o owner antigo de formação.

A correção corrente é mínima e está alinhada ao ownership nativo:

- O `Exit Event Processing` (`code 115`) de CE39 após o transfer é preexistente no snapshot/fixture e permanece em `data/CommonEvents.json:10720–10722`; `fix-departure-owner.mjs` não alterou CE39.
- CE3 testa `$gameMap.mapId() !== 3` imediatamente após CE39 (`data/CommonEvents.json:4083–4093`) e sai apenas quando o transfer deixou Map003. Se a ação for rejeitada e ainda estiver em Map003, o loop `tavern` (`data/CommonEvents.json:4213–4217`) continua disponível.
- A única correção aplicada é o exit do parent CE3, inserido por `fix-departure-owner.mjs:5–10`; com esse exit e o exit child preexistente, o autorun de Map004 pode finalmente iniciar. CE40 mantém o branch `dungeon_intro` e o `ENTER_DUNGEON` para a próxima etapa (`data/CommonEvents.json:12174–12355`).

**Veredito estático da rodada 3: correção confirmada; SHIP técnico pendente apenas do receipt dirigido em execução.** O hash corrente de `data/CommonEvents.json` após essa correção é `408979e6d1c444ff8334bdcacab9fa97e567e5ec3e5ae0e5705b9f6e90ca6541`. Não foram alterados plugins ou mapas nesta rodada. Os testes canônicos IT008/041/087 estavam em execução quando este registro foi feito; não foram rerodados por esta revisão.
