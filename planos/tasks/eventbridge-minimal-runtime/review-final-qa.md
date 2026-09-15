---
review: independent-rpg-maker-mz-deep-review
base: 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb
head: working-tree
scope: rpg-maker/qa and docs/qa/guides/eventbridge-minimal-runtime.md
verdict: FIX_BEFORE_SHIP
reviewed: 2026-09-13
---

# Revisão independente da QA dirigida

Esta revisão cobre todos os nove caminhos alterados ou novos sob rpg-maker/qa/ e o guia corrente de docs/qa/guides/eventbridge-minimal-runtime.md. Comparei os arquivos inteiros com spec.md, verification.md e task-16.md de planos/tasks/eventbridge-minimal-runtime, além dos contratos e referências da execução nativa dirigida. O review é estático: não abriu navegador, não iniciou servidor, não executou teste gráfico ou áudio e não alterou implementação, campanha, save ou evidência. A única escrita desta rodada é este arquivo.

O veredito da camada revisada é FIX_BEFORE_SHIP. Há quatro lacunas de cobertura que deixam variantes já exigidas sem sensor suficiente e um defeito de integridade no validador de checkpoint. Isso não autoriza mudar o estado da entrega: verification.md continua com runtime_verified=false, human_accepted=false e release_ready=false; os casos dirigidos atuais permanecem executed-awaiting-review quando essa é a conclusão registrada pelo runner.

## Fingerprint e escopo congelado

O fingerprint é SHA-256 do manifesto formado por linhas path<TAB>sha256, ordenadas com LC_ALL=C, sobre os nove arquivos abaixo. O fingerprint inicial foi calculado imediatamente antes da escrita deste review; o final foi conferido depois. O manifesto por arquivo é:

| Arquivo | SHA-256 no início e no fim |
| --- | --- |
| docs/qa/guides/eventbridge-minimal-runtime.md | e7fa44cfcacbceab5cd7441d461ada24e3626e84af96c23a04d736107015fc35 |
| rpg-maker/qa/directed-adapter.mjs | f00ad6f3bfb2559727ed55ff90bb697a29ff96b63b10c69bef66e0488573086e |
| rpg-maker/qa/native-audio.test.mjs | 8af47c63ee45becca4e4037438a08681ea7baa8ed8b88541cca4ce8d4a82619b |
| rpg-maker/qa/native-bust-observation.mjs | ee13353cada6860c39026a64a873caca3a4ba30a092490c54266d87eb583eb19 |
| rpg-maker/qa/native-continuity.test.mjs | 88b20095697deea792d55280d59cf53a857a0f40fbbe6dafaf65618fc629bbd3 |
| rpg-maker/qa/native-journeys.test.mjs | 96fe65a7ea66594a60d1056350dad1e26a04e773c1b14a7a77a6efb8b4bdacd9 |
| rpg-maker/qa/native-player.mjs | e3d9bf984d37a021ab93adda39a99416859131d9ae98721d82ce6b087fa733b2 |
| rpg-maker/qa/native-save-archive.mjs | 4e2edb73544694cf44fab208c4154c34a2b57d1e963848e52fd2e537982db377 |
| rpg-maker/qa/native-surfaces.test.mjs | 343ca771c88c5b829dd0e6ca2e7b8e873bb4eda357296878a9f3a894e73ee362 |

Fingerprint do conjunto no início: 9cafac4393b05752254a6ecf4d12262b06f2aaeedff6591f7c5f34ca68b2d9b9.

Fingerprint do conjunto no fim: 9cafac4393b05752254a6ecf4d12262b06f2aaeedff6591f7c5f34ca68b2d9b9.

O conjunto todo tem dono nesta revisão. O adapter e o salvamento são avaliados por isolamento, origem, serialização e ciclo de vida; player e superfícies por navegação, input, janela, resolução e estado; jornadas, continuidade, bust e áudio por seus oráculos e sensores; o guia por paridade com a spec, verification.md e task-16.md.

## Achados

### F-001 — branch-only de abordagem pode capturar depois da vítima

**Severidade:** alta para V-001/V-007/V-011 e S09/S10. **Confiança:** alta.

Em native-journeys.test.mjs:44-47, o modo branch-only encerra somente quando branchChosen é verdadeiro e a superfície atual não é sacrifice. Em native-journeys.test.mjs:78-90, branchChosen é marcado logo após qualquer abordagem; em native-journeys.test.mjs:91-93, uma superfície sacrifice é então capturada e a vítima é escolhida. Portanto, quando DRYLAND_QA_APPROACH seleciona uma abordagem inviável, a primeira consequência observável é justamente sacrifice: o guard não captura o resultado da abordagem e o fluxo altera a campanha ao escolher a vítima antes de produzir branch-result.

Isso viola o limite do pai descrito em verification.md:79-82 e 88-90 e em task-16.md:36-37: o ramo de abordagem precisa ser jogado depois de Continue e parar antes da decisão de vítima; o ramo de vítima usa outro filho do checkpoint antes da vítima. A execução atual approach-a-01 (docs/qa/evidence/eventbridge-minimal-runtime/task-16/approach-a-01/report.json) usa A3-1 com success=true, então não cobre essa falha.

A correção deve distinguir o tipo de alternativa solicitado. Para DRYLAND_QA_APPROACH, registrar o branch-result na primeira superfície após a abordagem, inclusive se ela for sacrifice, antes de qualquer escolha de vítima. Para DRYLAND_QA_VICTIM, manter o fluxo até a escolha da vítima e registrar o resultado posterior. Os nomes e o parent/hash devem deixar essa fronteira explícita; não é necessário replayar a campanha inteira.

### F-002 — nenhum cenário declara o zoom nativo de 110%

**Severidade:** alta para V-010 e S08. **Confiança:** alta.

Nenhum dos arquivos QA declara nativeZoom. Os cenários de native-surfaces.test.mjs:5-6, native-journeys.test.mjs:5-8, native-continuity.test.mjs:5-7 e native-audio.test.mjs:3-5 usam viewport emulado, DPR 1 e escala de dispositivo forçada. O runner só registra o sensor de Chrome real quando scenario.browser.nativeZoom está definido; o contrato desse campo e a preparação da janela estão em browser-runtime.mjs:26 e 110-117. O guia promete 1920x1080 em 100–110% em docs/qa/guides/eventbridge-minimal-runtime.md:11 e 37, e task-16.md:56 exige a mesma variante. As imagens com nome focus-110.png são apenas o serial focus-110 gerado por native-player.mjs:78; não trazem medição de zoom.

Assim, surfaces-large-reduced-06 demonstra a janela CSS grande, HIDE, leitura, Options e A/B, mas o report.json não tem nativeZoom e não comprova o controle real de 110%. A correção é adicionar uma variante dedicada com nativeZoom:1.1, manter o mínimo CSS exigido e registrar report.nativeZoom; a janela real do Chrome deve aplicar o percentual. Esta é a variante S08 já aprovada, não um novo gate.

### F-003 — áudio dirigido cobre ME/BGS, mas não resposta ao vivo de BGM/SE

**Severidade:** alta para V-012 e S11. **Confiança:** alta.

native-audio.test.mjs:4-5 oferece somente cue=me ou cue=bgs. Em native-audio.test.mjs:20-30, o teste aguarda e lê o buffer ativo somente para o cue escolhido, verificando playing, volume e start antes/depois do mudo. O loop native-audio.test.mjs:32-35 altera os quatro ConfigManager volumes, mas só confirma a preferência numérica; não há buffer BGM ou SE ativo nem transição que demonstre a resposta dessas categorias. O guia restringe as execuções a me e bgs em docs/qa/guides/eventbridge-minimal-runtime.md:84, apesar de G exigir BGM/BGS/ME/SE, transições e FAST em :41; task-16.md:60 repete a exigência.

Os reports audio-me-01 e audio-bgs-01 registram Organ e People1 com start preservado, volume 0 durante mute e retorno ao volume anterior, além das quatro preferências em 30. Eles permanecem honestamente executed-awaiting-review e aguardam audição humana, mas não preenchem BGM/SE. IT028/IT029 podem ser citados para o que realmente medem; não substituem um sensor dirigido de buffer ao vivo sem uma equivalência registrada.

A correção mínima é executar uma cena com BGM ativo e outra com SE ativo, ou mapear explicitamente uma execução canônica que observe esses buffers durante a mesma resposta exigida. Em ambos os casos, guardar start/playing/volume antes, durante e depois da mudança, e manter a audição perceptível pendente até haver ouvinte/data. Transições e FAST também precisam ser marcados como cobertos ou pendentes; escrever ConfigManager não prova essa parte.

### F-004 — o validador aceita metadados coordenadamente adulterados

**Severidade:** alta para a proveniência de V-011 e do banco de checkpoints. **Confiança:** alta.

captureNativeSave captura os objetos nativos e os registros brutos em native-save-archive.mjs:16-30. Porém validateNativeArchive, em native-save-archive.mjs:36-44, somente verifica o schema/origem/chave, a identidade calculada a partir de archive.campaign/archive.index/archive.keys, igualdade de sourceFiles e os hashes dos registros payload/index armazenados. Ele não compara archive.index com o objeto decodificado de indexPayload e tampouco compara archive.campaign ou archive.nativeState com o conteúdo decodificado de payload.

A consequência é concreta: uma cópia em memória do archive pode receber mudança em archive.index.title e uma nova identitySha256; a validação aceita a cópia, embora o indexPayload armazenado continue contendo o índice original. O probe somente de leitura executado durante este review produziu coordinated-index-mutation=accepted. Um consumidor pode usar o storage original para Continue e o metadata adulterado para descrever pai, fase ou resultado, quebrando a trilha de proveniência sem alterar os arquivos do jogo. O teste existente que altera apenas um campo sem recomputar a identidade não cobre este caso coordenado.

O validador deve decodificar os dois registros com a mesma representação nativa usada pelo runtime e fazer comparação profunda, ou registrar hashes canônicos dos objetos decodificados e compará-los a campaign/nativeState/index. Acrescentar um caso estreito que mude cada metadado, recompute identitySha256 e exija rejeição. A correção pertence ao consumidor de archive; não exige mutação de campanha.

### F-005 — o sensor temporal de bust não tem call site e não mede avanço

**Severidade:** média para o ciclo de vida visual de V-006. **Confiança:** alta.

native-bust-observation.mjs:47-56 exporta observeBustTransition, que deveria registrar três amostras durante transições. Uma busca de todos os call sites mostra apenas native-continuity.test.mjs importando observeBustPassage; observeBustTransition nunca é chamado por nenhum módulo QA ou suíte. Portanto o artefato temporal descrito pelo helper não aparece nas execuções atuais. Mesmo se fosse chamado, as três iterações fazem read/shot sem espera, input ou avanço de frame explícito, podendo observar o mesmo estado settled.

observeBustPassage ainda fornece um oráculo útil: calcula participantes por IDs públicos em native-bust-observation.mjs:10-18, espera durações/tone em :19-22, compara slots/names em :23-31, verifica tone/opacity em :32-39 e confirma campanha inalterada em :40. Isso prova composição estabilizada e ausência de mutação; não prova a sequência temporal ou o cancelamento da transição. Ligar o sensor a um callback de avanço nas famílias usadas, com amostras separadas por um frame/intervalo conhecido, ou declarar explicitamente o sensor temporal como pendente. Não transformar a ausência em um novo gate fora de S04/V-006.

### F-006 — a execução de créditos não tem oráculo de velocidade/última linha

**Severidade:** média para V-014/S12. **Confiança:** alta.

finishCredits em native-journeys.test.mjs:10-28 confirma que o scroll existe, espera um ponto do texto em natural, mantém Shift em accelerated e aciona Escape ou o botão nativo nos modos de skip. O teste não registra scroll/frame/tempo antes e durante a tecla mantida, não verifica a velocidade nativa 2, não identifica a última linha e não conta uma única transição para o título. Os reports só podem terminar como executed-awaiting-review até a inspeção visual; task-16.md:61 e verification.md:33 exigem natural, acelerado, pulo cedo/tarde e exatamente um retorno ao título.

O próximo sensor estreito deve registrar pelo menos uma amostra de posição/tempo antes e durante cada modo e a chegada da última linha/título, mantendo a inspeção humana para a legibilidade. Enquanto isso, não promover V-014 com base apenas em exit 0 e capturas.

## Navegação, oráculos e ciclo de vida verificados

directed-adapter.mjs:11-24 cria uma cópia completa descartável do jogo e, quando há archivePath, valida origem/identidade/fontes e grava archive/storage na cópia antes da primeira página. directed-adapter.mjs:31-48 enumera e hasheia os arquivos da fixture, declara mutablePaths vazio, expõe apenas native-mz/public-input e mantém o fileId real no descriptor. Não há restauração de storage depois do boot. O runner também materializa os módulos e helpers usados em source-N e faz hash de cada arquivo antes de iniciar a página. Essa é proveniência de arquivos reais suficiente para a preparação, sujeita à correção F-004.

DirectedNativePlayer concentra a navegação em sinais nativos: ready aguarda mensagem/pausa/choice e rejeita o error printer em native-player.mjs:21-30; choicesContaining avança texto por Enter e escolhe somente label visível em :33-44; choose verifica unicidade, enabled, geometria ou foco e usa mouse/teclado real em :46-82; file confirma o ID do seletor Scene_File em :104-113; until respeita a superfície credits/choice em :115-125. As ações de campanha em native-journeys.test.mjs, native-surfaces.test.mjs e os demais módulos passam por esses inputs públicos. Não há publicCommand, dispatch de domínio, seed injetada, escrita em $gameSystem ou edição de switch/variável para produzir uma decisão. Reads de MZ, StorageManager.loadObject/loadZip, snapshots, captura de storage e o tap de áudio são observação/instrumentação; as mudanças intencionais de campanha ocorrem apenas pelas escolhas nativas do jogador.

Os oráculos principais estão bem separados. native-surfaces.test.mjs:12-22 confirma labels da taverna, HIDE, posição, ausência de menu e campanha preservada; :23-53 verifica leitura inédita, reset de AUTO/FAST e oito heróis; :61-77 exercita arquivos A/B e bytes preservados. native-continuity.test.mjs:18-40 confirma payload do pai, composição antes/depois de Options, HIDE, Continue e releitura sem campanha duplicada. native-journeys.test.mjs:101-114 confirma endingId, bytes do terminal antes/depois de créditos e Continue. native-audio.test.mjs:21-40 confirma buffer ativo e preferências persistidas, dentro do limite F-003. native-save-archive.mjs:10-34 espera status saved, sequência persistida, índice nativo e ausência de rmmzsave.test antes de capturar o payload completo.

Há três limites de interpretação que devem permanecer visíveis:

* observeBustPassage captura text e speaker, mas seu expected é somente a composição de pictures. A inspeção de texto, enquadramento, memorial e leitura continua humana; um ID de passagem fora das famílias reconhecidas pode gerar expected vazio e precisa ser evitado pelo caller.
* native-continuity.test.mjs:34 captura context-checkpoint depois de uma observação de fala que pode não ter alterado a sequência persistida. Isso pode ser o save anterior do pai, e o próprio guia alerta em docs/qa/guides/eventbridge-minimal-runtime.md:36 e 48 para não prometer save de fala não gravada. O report deve expor a sequência persistida e nomear o arquivo como observação sobre o pai quando não houver novo autosave.
* captureNativeSave grava *.archive.json e o coloca em uma observação, enquanto os artifacts que o runner verifica são report.checkpoints. Os reports atuais listam storage JSON registrado como evidência, e o guia aponta para os arquivos auxiliares em :86, mas a integridade do archive auxiliar não recebe a mesma verificação automática de checkpoint. Registrar o archive como artifact ou comparar seu SHA no fechamento deixaria essa trilha explícita; isso complementa F-004 e não cria um gate adicional.

O método também usa IDs de cenário genéricos — campaign, controls, continuity e audio — e um expectedRef amplo para runtime-scenarios, por exemplo native-journeys.test.mjs:8 e native-surfaces.test.mjs:6. O runner consegue declarar executed-awaiting-review, mas não deriva sozinho a cobertura de V-001–V-014 nem distingue cada variante S01–S12. A tabela final do relatório deve continuar fazendo esse mapeamento; um status do runner isolado não é PASS de todos os V-IDs.

## Ledger dos caminhos revisados

| Caminho | Lentes e conclusão |
| --- | --- |
| docs/qa/guides/eventbridge-minimal-runtime.md | Guia coerente com isolamento, checkpoints nativos e pendências humanas; deriva de código em F-001, F-002, F-003 e F-005/F-006. |
| rpg-maker/qa/directed-adapter.mjs | Isolamento, origem e cópia pré-boot corretos; consumidor depende da integridade incompleta de F-004 e descriptor não substitui um inventário Git dirty. |
| rpg-maker/qa/native-audio.test.mjs | Navegação/input e resposta live ME/BGS corretos; variantes BGM/SE/transição/FAST ausentes em F-003; audição humana permanece pendente. |
| rpg-maker/qa/native-bust-observation.mjs | Oráculo settled de slots, tone, opacity e campanha é correto para famílias chamadas; sensor temporal morto e sem intervalo em F-005; texto/enquadramento dependem de inspeção. |
| rpg-maker/qa/native-continuity.test.mjs | Continue, Options, HIDE, composição e bytes do pai são comparados por reads e inputs reais; checkpoint de fala pode ser save anterior, conforme limite acima. |
| rpg-maker/qa/native-journeys.test.mjs | Caminho completo e terminal preservam bytes e endingId; branch-only cruza a fronteira de vítima em F-001 e créditos deixam o oráculo incompleto em F-006. |
| rpg-maker/qa/native-player.mjs | Lifecycle de espera, choice, Scene_File, HIDE e input público bem centralizado; não substitui expectativa humana de texto, foco e conforto. |
| rpg-maker/qa/native-save-archive.mjs | Captura arquivos reais e estado nativo antes do boot, com hashes e origem; comparação metadata/storage incompleta em F-004 e archive auxiliar não é checkpoint do runner. |
| rpg-maker/qa/native-surfaces.test.mjs | Taverna, oito heróis, HIDE, AUTO/FAST, Options e A/B têm oráculos úteis; viewport grande existe, zoom nativo 110% requerido por S08 falta em F-002. |

## Próximas correções delimitadas

1. Separar a fronteira de branch-only de abordagem e de vítima e rerodar uma abordagem inviável a partir de um filho imutável antes da escolha de vítima.
2. Acrescentar a variante real nativeZoom 1.1 e registrar o sensor de Chrome em 1920x1080 com o mínimo CSS exigido.
3. Observar BGM e SE ativos, além de marcar transições/FAST, e manter a avaliação perceptível com ouvinte/data.
4. Fazer o validador comparar metadados com os objetos decodificados e adicionar apenas a regressão de adulteração coordenada.
5. Ligar o sensor temporal de bust a um avanço real e reforçar o oráculo de créditos com amostras de tempo/scroll; manter imagens, áudio, editor e conforto como decisões humanas separadas.
6. Fechar o relatório com a correspondência de cada execução a V-ID/variante e distinguir checkpoint persistido de observação no save do pai.

Esses passos retomam sensores e fronteiras já exigidos pela spec, verification.md e task-16.md. Não introduzem nova aprovação criativa, novo serviço, novo comando QA, nova dependência ou gate amplo.

## Adendo de disposição final — 2026-09-13

Este adendo fecha a revisão estática depois das correções F-001–F-006 e dos retestes dirigidos disponíveis. O bloco anterior conserva o diagnóstico histórico; a conclusão atual da camada de código QA é **PASS-estático-com-limites**. A revisão continuou somente leitura: não abriu navegador, iniciou servidor, executou testes, alterou jogo/QA, campanha, save ou evidência. A única escrita desta rodada é este apêndice.

### Fingerprint da rodada final

O início abaixo foi registrado antes da correção final do sensor SE e do ajuste de zoom nativo. O manifesto é formado por `path<TAB>sha256`, em ordem lexicográfica, com uma quebra de linha final; o agregado é o SHA-256 desse manifesto. O fim foi calculado depois das fontes e do guia atuais.

| Caminho | Início | Fim |
| --- | --- | --- |
| docs/qa/guides/eventbridge-minimal-runtime.md | 5ac7aaf634556df73aa85fb0a20f08e997915c868d0380f95a1db4bdc00f4a99 | eb04928df300e889abe72601b1ea999d082dc62d65464f986e963cca928de71b |
| rpg-maker/qa/directed-adapter.mjs | f00ad6f3bfb2559727ed55ff90bb697a29ff96b63b10c69bef66e0488573086e | f00ad6f3bfb2559727ed55ff90bb697a29ff96b63b10c69bef66e0488573086e |
| rpg-maker/qa/native-audio.test.mjs | 76b97a8741178e5062365c657b88fb2042d79bdf3dcb8ae8709ac44fedba6fa7 | 88a2af364ef9510234dcb201fb08a668de9489f195261a5204105a7fab2c3063 |
| rpg-maker/qa/native-bust-observation.mjs | 026e8c28d470b613cfe075f44d138dd404f3e907752f1bf54a0beb4fc7c77e00 | 026e8c28d470b613cfe075f44d138dd404f3e907752f1bf54a0beb4fc7c77e00 |
| rpg-maker/qa/native-continuity.test.mjs | 05fb18c0a12f90d2fd88fa70007f439aad1c57aa4641877235b02653a2ac989a | 05fb18c0a12f90d2fd88fa70007f439aad1c57aa4641877235b02653a2ac989a |
| rpg-maker/qa/native-journeys.test.mjs | 966b673cf8bfad20fc3c2d3ac9e676ac42cb673c260ebc07df4e1505f72cefb4 | 966b673cf8bfad20fc3c2d3ac9e676ac42cb673c260ebc07df4e1505f72cefb4 |
| rpg-maker/qa/native-player.mjs | e3d9bf984d37a021ab93adda39a99416859131d9ae98721d82ce6b087fa733b2 | e3d9bf984d37a021ab93adda39a99416859131d9ae98721d82ce6b087fa733b2 |
| rpg-maker/qa/native-save-archive.mjs | 578a4000130bc21a328e2df390e98e746e11d9a37b56be81871457fcb52c9f75 | 578a4000130bc21a328e2df390e98e746e11d9a37b56be81871457fcb52c9f75 |
| rpg-maker/qa/native-surfaces.test.mjs | f36791a339f1ea8f2148889b8dc4d254fcbb9624e1467cf96ef5b39b0e95b824 | 9c26fe9e1e68dd9ac3e5c842ece42c178790dee18161a89e6b6cf8e0d06a34c6 |

Agregado inicial: `35da80779122087e8e3408ddc0c26462e6f9772f8c3d67ee51325d4a2112ac12`. Agregado final: `0216f6b662a8d5fcc27a7fa967ea4f0df2c0ff8bb604fa41c49e685c533f9c86`.

Os reports materializam os módulos pelos `originalPath` e SHA em `sources`; `directed-adapter.mjs:11-29` copia o jogo para uma fixture descartável e valida o archive antes da primeira página, enquanto `:31-48` enumera os arquivos reais e declara os capabilities públicos. A auditoria `task-16/bank-integrity.json` encontrou 71 mestres, 71/71 com `decodedFactsMatch` e `masterMatchesProducer`, sem divergências, sobre 1.445 arquivos. `task-14/20260913-final-review/archive-audio-results.json` registra UT-069, IT-029 e IT-079 como PASS, `changedInputs: []`; `dependency-equivalence.json` registra 1.445 arquivos `allEqual`.

### Disposição dos seis achados

| Achado | Veredito estático e evidência atual | Limite honesto |
| --- | --- | --- |
| F-001 branch-only | **PASS.** `native-journeys.test.mjs:134-150` exige archive genuíno, exige fase pai compatível, separa `approach` de `victim` e para na primeira consequência. `approach-failure-final-01`, `approach-success-final-01` e `victim-final-01` têm `errors: []`; os dois primeiros conservam `deadHeroIds`, o último acrescenta somente H7. | Os três reports estão `executed-awaiting-review`; inspeção de jogo/capturas continua parte da revisão dirigida. |
| F-002 zoom nativo | **PASS no código; sensor bloqueado.** `native-surfaces.test.mjs:5-7` declara `nativeZoom: 1.1`, usa o mínimo 1280×720 no cenário nativo e não adiciona emulação de viewport/DPR; `docs/qa/guides/eventbridge-minimal-runtime.md:82` mantém 1920×1080 como variante grande separada. `native-zoom-cua.json` confirma o controle real do Chrome a 110% sem mutação de jogo. A preparação de `surfaces-native-zoom-02` observou dpr 1.1 e viewport CSS 1571×835, acima do mínimo. | O report `surfaces-native-zoom-02/report.json` falhou no sensor de captura (`PNG 1728×918`, esperado `1728×919`); `surfaces-native-zoom-01` é a tentativa histórica que expirou com o mínimo 1920×1080. Uma única rerun de `native-zoom-110` permanece necessária depois de reconciliar essa dimensão raster. S08 ainda requer o parecer humano de UI/leitura/conforto. |
| F-003 áudio | **PASS no código e nos sensores declarados.** `native-audio.test.mjs:4-12,36-71,73-130` cobre BGM/BGS/ME/SE, buffer novo de SE em 40/0/30, BGS com FAST e reset, opções persistidas e ausência honesta de BGM de campanha. `audio-bgm-final-01`, `audio-bgs-final-01`, `audio-me-final-01` e `audio-se-final-02` estão sem erros; o último observa `playing: true`, início novo e volume 0.36/0/0.27. | BGM de campanha não tem cue vivo e IT-029 é a equivalência isolada; audição, resposta perceptível e decisão humana permanecem pendentes. ME registra FAST bloqueado pela permissão da leitura, conforme o contrato, sem promovê-lo a aceleração indevida. |
| F-004 archive | **PASS.** `native-save-archive.mjs:37-57` decodifica os streams zlib nativos e compara `selected file`, campanha, índice e `nativeState` com os objetos decodificados, além de origem, fontes e hashes. A regressão coordenada deixa de ser aceita; os 71 mestres do banco passam a casar com seus produtores. | A validação prova consistência interna e a origem/produtor registrado; não transforma um archive auxiliar em evidência de interação nova. |
| F-005 bust/continuity | **PASS no sensor; revisão visual pendente.** `native-bust-observation.mjs:47-73` exige callback de avanço público, captura frames distintos e é chamado por `native-continuity.test.mjs:34-41`. Os quatro reports finais de farewell/Council/Council reduzido/epilogue têm três amostras temporais sem erro; movimento reduzido estabiliza conforme esperado. | Texto, enquadramento, composição editorial e conforto continuam humanos; a estabilidade no modo reduzido não é falha temporal. |
| F-006 créditos | **PASS no oráculo read-only.** `native-journeys.test.mjs:10-70,72-123` lê a janela local, velocidade configurada 2/efetiva 1 ou 3, progresso por frame, última linha antes do término via `requestAnimationFrame` e Title estável em três frames, sem hooks ou escritas. Os seis modos, em primeira e segunda execução, têm `errors: []`; natural/acelerado observam `Plugins: VisuStella`, fronteira atômica e próximo frame inativo; os quatro pulos retornam a Title com uma opção Continue. | O contador global de retorno permanece combinado com IT-058, como declarado no report, e não é inferido de três amostras. Inspeção visual de legibilidade e do retorno continua pendente. |

### Navegação, cobertura e encerramento

As ações dirigidas usam `DirectedNativePlayer` e controles nativos de Continue, Scene_File, escolhas, Tab, foco, mouse, `keyDown`/`keyUp`; `context.read`, storage, snapshots, geometria, buffer e frames são observações. A campanha só muda por escolhas públicas do jogador. Preferências de áudio são alteradas em fixture descartável por Options e relidas após reopen; isso não é mutação de campanha. Bust, créditos e zoom mantêm referências locais e não instalam hooks, comandos QA ou escritas em estado global.

Os resultados dirigidos finais permanecem `executed-awaiting-review` quando concluídos; o único bloqueio de execução desta rodada é o descompasso de PNG do zoom. Editor-authorship, UI/leitura/conforto, composição memorial e audição perceptível seguem decisões humanas separadas. Portanto `verification.md` corretamente conserva `runtime_verified: false`, `human_accepted: false` e `release_ready: false`; o PASS desta revisão é técnico e delimitado, não uma aprovação de entrega. Não há nova variante, dependência, serviço ou gate amplo recomendado.

## Adendo de encerramento dos retestes — 2026-09-13

Este adendo preserva os achados e fingerprints históricos acima e registra a disposição após o reteste final do editor e a execução nativa de zoom. A conclusão atual da camada técnica revisada é **PASS com limites humanos pendentes**. A revisão deste adendo foi read-only; não houve alteração no jogo, nos plugins, na campanha, nos saves ou nos helpers de QA. A única escrita é este apêndice.

### Fingerprint final da camada revisada

O manifesto usa `path<TAB>sha256`, ordenado lexicograficamente e terminado por uma quebra de linha. Os hashes de início e fim são iguais porque só este documento foi alterado depois da coleta inicial. O runner físico é registrado como harness de apoio ao escopo QA.

| Caminho | Início | Fim |
| --- | --- | --- |
| .agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs | 1351387c0c4d57950f21ffeccff64aa5d55e781d7a419a19d62abe2191b9bbe2 | 1351387c0c4d57950f21ffeccff64aa5d55e781d7a419a19d62abe2191b9bbe2 |
| docs/qa/guides/eventbridge-minimal-runtime.md | eb04928df300e889abe72601b1ea999d082dc62d65464f986e963cca928de71b | eb04928df300e889abe72601b1ea999d082dc62d65464f986e963cca928de71b |
| rpg-maker/qa/directed-adapter.mjs | f00ad6f3bfb2559727ed55ff90bb697a29ff96b63b10c69bef66e0488573086e | f00ad6f3bfb2559727ed55ff90bb697a29ff96b63b10c69bef66e0488573086e |
| rpg-maker/qa/native-audio.test.mjs | 88a2af364ef9510234dcb201fb08a668de9489f195261a5204105a7fab2c3063 | 88a2af364ef9510234dcb201fb08a668de9489f195261a5204105a7fab2c3063 |
| rpg-maker/qa/native-bust-observation.mjs | 026e8c28d470b613cfe075f44d138dd404f3e907752f1bf54a0beb4fc7c77e00 | 026e8c28d470b613cfe075f44d138dd404f3e907752f1bf54a0beb4fc7c77e00 |
| rpg-maker/qa/native-continuity.test.mjs | 05fb18c0a12f90d2fd88fa70007f439aad1c57aa4641877235b02653a2ac989a | 05fb18c0a12f90d2fd88fa70007f439aad1c57aa4641877235b02653a2ac989a |
| rpg-maker/qa/native-editor.test.mjs | 741895b9e8806b4e76cf6b7cfc60073db1abc0ef85b81c2f4353ec1484d7851b | 741895b9e8806b4e76cf6b7cfc60073db1abc0ef85b81c2f4353ec1484d7851b |
| rpg-maker/qa/native-journeys.test.mjs | 966b673cf8bfad20fc3c2d3ac9e676ac42cb673c260ebc07df4e1505f72cefb4 | 966b673cf8bfad20fc3c2d3ac9e676ac42cb673c260ebc07df4e1505f72cefb4 |
| rpg-maker/qa/native-player.mjs | 1e37b7b19177d2ad497bff7b44c8a47cbc6a02bd1718862aaf3e7bdf6a51a916 | 1e37b7b19177d2ad497bff7b44c8a47cbc6a02bd1718862aaf3e7bdf6a51a916 |
| rpg-maker/qa/native-save-archive.mjs | 578a4000130bc21a328e2df390e98e746e11d9a37b56be81871457fcb52c9f75 | 578a4000130bc21a328e2df390e98e746e11d9a37b56be81871457fcb52c9f75 |
| rpg-maker/qa/native-surfaces.test.mjs | 9c26fe9e1e68dd9ac3e5c842ece42c178790dee18161a89e6b6cf8e0d06a34c6 | 9c26fe9e1e68dd9ac3e5c842ece42c178790dee18161a89e6b6cf8e0d06a34c6 |

Agregado do manifesto: `b986db10139f6af138b11e788955a312484c49ce779f7e7e1f758e26aa8579fb` no início e no fim. `node --check` do caso/editor e do helper, além de `git diff --check`, passaram antes do fechamento.

### Evidência final do editor e da composição persistida

`editor-runtime-04` terminou PASS com 109 inputs, 43 capturas PNG e `errors: []`, usando a cópia after-v2 editada no MZ e um New Game fresco. O caminho passou por ConfigureHero H1, o perfil CE82, a conversa autoral CE352 inicialmente inédita, rejeição de FAST antes da leitura, Options, releitura com FAST permitido, seleção pública H1/H2/H3, departure físico, fechamento real e Continue. O descriptor continuou sem `storageFixture` e `nativeArchive`; a autoria e a proveniência permanecem distintas da execução.

A observação renderizada do picture 92 fechou a dúvida levantada no editor03. Nos estados departure e reopened, a captura mostra a barra translúcida em `(31,37)` sobre `Dryland_Church`; `alpha` e `worldAlpha` são `0.7098039`, os bounds são `62.4 × 21.6`, e a ordem dos filhos ativos é picture 1 seguida de picture 92 em ambos os estados. O case `native-editor.test.mjs:36-166,417-439` agora exige bitmap pronto, `visible`, `worldVisible`, alpha positivo, bounds positivos, relação de camada e continuidade departure/Continue. Não há defeito de renderização ou persistência a corrigir; a inspeção de autoria/editor e a aceitação editorial continuam humanas.

### Disposição dos achados F-001–F-006

| Achado | Disposição atual | Evidência e limite |
| --- | --- | --- |
| F-001 branch-only | **PASS dirigido.** A fonte separa a abordagem da vítima, exige um parent genuíno antes da decisão e para na primeira consequência. Os reports finais de failure, success e victim terminaram sem erros. | Os reports continuam `executed-awaiting-review`; a leitura do jogo e das capturas não é substituída pelo status do runner. |
| F-002 zoom nativo | **PASS dirigido.** `native-surfaces.test.mjs` declara `nativeZoom: 1.1`; o zoom05 aplicou 110% pela UI real do Chrome, com CSS `1745×875`, DPR `1.1`, raster `1920×963`, 302 inputs e 125 capturas PNG. | A tentativa anterior com dimensões incompatíveis é histórica e não invalida o zoom05. UI, legibilidade e conforto em S08 ainda requerem decisão humana. |
| F-003 áudio | **PASS técnico/dirigido.** Os sensores atuais cobrem BGM/BGS/ME/SE, mute, retorno de volume, Options e FAST onde permitido; ME/SE e as execuções finais não têm erros. | Não há BGM autoral de campanha a observar; IT-029 fornece a equivalência isolada apropriada. Audição perceptível e julgamento de volume continuam humanos. |
| F-004 archive | **PASS.** O validador decodifica os streams zlib nativos e compara selected file, campanha, índice e `nativeState`; os 71 mestres têm `decodedFactsMatch` e `masterMatchesProducer`, sem inconsistências. | A consistência do archive não prova uma decisão nova nem substitui a proveniência do produtor. |
| F-005 bust/continuity | **PASS no sensor.** O callback público captura frames distintos e os reports finais de farewell/Council/epilogue não têm erros. | Texto, enquadramento, composição editorial e conforto ainda aguardam revisão humana. |
| F-006 créditos | **PASS no oráculo read-only.** As seis modalidades, em duas passagens cada, terminaram sem erros; o observador usa referência local, progresso por frame, velocidade natural/acelerada, última linha e Title estável, sem hooks ou escritas. | A unicidade global do retorno ao Title permanece evidência combinada com IT-058, conforme o report; a inspeção visual do meio e do fim dos créditos já ocorreu, enquanto o julgamento humano de UI/conforto permanece separado. |

### Revisão do lifecycle do helper e do runner

`native-player.mjs:21-76` mantém o watchdog em `requestAnimationFrame`: a janela de 30 segundos é reiniciada quando o texto muda ou quando o contador nativo de AUTO progride, e `ready` só retorna com superfície visível sem AUTO/FAST ativos. A amostra e o diagnóstico de timeout são read-only; escolhas, Continue, Scene_File, teclas mantidas e ponteiro continuam inputs públicos. Não encontrei um defeito concreto no helper `1e37b7b1…`.

`browser-runtime.mjs:47-70,128-142,174-185` mede layout físico por CDP, exige `visualViewport.scale === 1` e ausência de barras de rolagem, desativa viewport/DPR em `nativeZoom`, registra o fator real antes da execução e confere identidade de documento/geometria durante cada read/input/captura. O zoom05 passou esse caminho; o runner não introduz um atalho de campanha.

O adapter materializa a fixture descartável antes da primeira página, hasheia os arquivos reais do descriptor e mantém `mutablePaths` restrito. As leituras de MZ, StorageManager, frames, geometria, bitmap e áudio são observação; a campanha só muda por escolhas públicas validadas. Não há hook, comando QA, seed injetada ou escrita de estado para produzir os resultados.

### Limites de aceitação e veredito

O PASS técnico não fecha quatro decisões humanas que permanecem na tabela de Human Acceptance: (1) um autor não-JavaScript localizar e editar o evento pretendido no MZ, incluindo a trilha editorial; (2) clareza de UI, foco, modos de leitura, controle e conforto no zoom; (3) enquadramento/composição visual final, inclusive memorial e continuidade editorial; (4) audição e resposta perceptível de volume. Os casos dirigidos permanecem `executed-awaiting-review` quando essa é a classificação do report. A conclusão técnica permite `runtime_verified: true` mesmo com uma decisão exclusivamente humana pendente; `human_accepted: false` e `release_ready: false` permanecem até que os quatro responsáveis registrem seus aceites. O review não adiciona uma barreira humana ao fechamento técnico. Nenhuma nova variante, dependência, serviço, mutação de jogo ou gate amplo é recomendado.
