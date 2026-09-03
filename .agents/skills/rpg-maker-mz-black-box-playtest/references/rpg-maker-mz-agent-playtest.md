# Como testar um jogo RPG Maker MZ como jogador no navegador

Use este guia como jogador-autor ou replayer de um cenário local de RPG Maker MZ no navegador. O jogador-autor entra no estado inicial, descobre um caminho com observação pública e coaching narrativo registrado, escreve o cartão por checkpoint e o reproduz após reinício. O replayer recebe somente o cartão aprovado e comprova sua reprodução sem coaching ao vivo.

O procedimento serve para visual novels, RPGs com exploração e jogos híbridos. Encerramento, créditos, retorno ao título e nova partida são um módulo condicional, não um ciclo universal do RPG Maker MZ. Dados, rotas e limites de um projeto específico pertencem à ficha e ao cartão local daquele build, não a este procedimento genérico. O contrato entre invocador, jogador e especialista está em `assisted-checkpoint-protocol.md`; o jogador continua caixa-preta mesmo quando recebe uma dica traduzida pelo invocador.

## Resultado esperado

Ao terminar, você deve ter:

- executado o cenário contratado em um navegador real;
- produzido uma cadeia cronológica de evidências para os checkpoints relevantes;
- criado um cartão de rota local, específico para o build e o trecho percorrido, usando observações públicas e registrando separadamente qualquer coaching narrativo;
- reiniciado o trecho e comprovado em dois passes sem ajuda: um de desempenho sem screenshots e outro de evidência com captura por checkpoint;
- separado expectativa, observação e inferência;
- atribuído `PASS`, `FAIL` ou `BLOCKED` ao jogo sem confundir defeitos do jogo com falhas do ambiente, da ficha ou do sensor;
- quando contratado, detectado e reparado um cartão vencido ou adulterado e repetido o percurso a partir de outro reinício limpo;
- encerrado apenas os processos criados pela rodada.

Este guia não verifica implementação interna, regras ocultas, áudio sem sensor de áudio nem comportamento de NW.js por equivalência presumida. Testes unitários, inspeção de saves e diagnósticos internos usam outros sensores e não substituem o playtest.

Siga o núcleo nesta ordem: valide a ficha e a SLA local, prepare a sessão, execute cada checkpoint com orientação auditada e orçamento ativo próprio, escreva-o imediatamente, reinicie e faça os dois replays limpos. Leia e aplique fingerprint, automação, encerramento ou adulteração apenas quando a ficha local ativar a extensão correspondente.

## 1. Receba um contrato executável

O preparador entrega ao executor uma ficha preenchida e autocontida. A entrada pública já deve estar resolvida como URL, arquivo ou comando autorizado.

Um diretório de desenvolvimento pode ser reconhecido por `game.rmmzproject`, mas um deployment web ou pacote publicado pode não conter esse arquivo. Não exija arquivos de autoria do RPG Maker para testar um build executável.

### Núcleo obrigatório da ficha

| Campo | O que o preparador registra |
|---|---|
| Autor e data | quem preparou a ficha e quando |
| Build | revisão, pacote ou identificador do conteúdo servido |
| Validade | build, entrada e intervalo para os quais a ficha vale; condições que a invalidam |
| Entrada pública | URL, arquivo ou comando autorizado |
| Inicialização | raiz estritamente necessária, processo a iniciar e responsável pelo teardown |
| Estado inicial | nova sessão, save autorizado ou outro ponto de partida |
| Missão do jogador | objetivo em linguagem de jogador e sinal público que permite reconhecer sua conclusão |
| Reinício após conclusão | ação pública autorizada para retornar ao começo do mapa, cena ou segmento depois de alcançar o destino; sinal visível do estado restaurado |
| Reinício após abortagem | ação pública autorizada para retornar do meio do trecho ao estado inicial depois de uma divergência; sinal visível do estado restaurado; ou `não disponível` |
| Orçamento por checkpoint | método de estimativa, quatro parcelas de orientação, relógio ativo, renovação e condição `PRESO` |
| Gate de replay | SLA rígida ou provisória, origem, início, fim, tolerância, exclusões e procedimento de dois passes |
| Sensores | captura, vídeo, áudio e logs permitidos |
| Destinos duráveis | diretórios do cartão de rota, das evidências e do relatório |
| Restrições | offline, sem save, somente teclado, acessibilidade ou outras |

O executor precisa de uma forma pública de voltar ao estado inicial para validar o próprio cartão. Quando o reinício após abortagem ou conclusão estiver `não disponível`, a ficha deve dizer qual parte do ensaio ficará `BLOCKED`; o executor não inventa um reset interno.

### Extensões condicionais da ficha

Inclua somente quando o cenário ou o veredito depender do campo:

| Extensão | Quando registrar |
|---|---|
| Fingerprint | quando for necessário vincular ficha, build, cartão ou ensaio de adulteração a conteúdo exato |
| Navegador e geometria | quando versão, viewport CSS, resolução, escala, zoom ou DPR afetarem a verificação |
| Idioma | quando locale do jogo, locale do navegador ou idioma observado fizerem parte do contrato |
| Storage | quando saves preexistentes, persistência ou isolamento alterarem o estado inicial |
| Persona | quando o comportamento representado mudar decisões ou critérios |
| Módulo de encerramento | quando o objetivo incluir ending, créditos, saída, retorno ao título ou nova partida; descreva os sinais de cada etapa |
| Resiliência da rota | quando houver reutilização entre builds ou adulteração cega; defina escopo e orçamento de reparo |
| Automação pública | quando o replay usar batch, guardas instrumentadas, proxies, trace ou vídeo |

Use termos consistentes:

- `não fornecido`: o preparador não entregou o valor;
- `não configurado`: a configuração foi explicitamente deixada no padrão;
- `não verificado`: a rodada não mediu o campo.

Não combine medições diferentes sob um único rótulo. O locale do jogo não prova o locale do navegador nem o idioma de todo texto observado. Viewport CSS, resolução do Canvas, escala, zoom e DPR também não são sinônimos.

Respeite o estado das decisões do projeto. Um item `Pendente` não é comportamento esperado; uma `Baseline de protótipo` não deve ser relatada como decisão definitiva.

O invocador e o especialista podem consultar documentação, arquivos de autoria e configuração dentro de seus contratos. O jogador-autor começa sem rota histórica e recebe somente ficha, este guia, seu cartão, seus próprios artefatos e coaching narrativo mediado pelo invocador; continua sem procurar respostas em mapas, eventos, switches, variáveis, plugins ou código. O replayer recebe a rota completa, mas nenhum log de aprendizagem, causa interna ou dica ao vivo.

### Protocolo de validade e divergência

Antes de confiar em uma rota recebida ou em um cartão criado numa rodada anterior:

1. confira se entrada e build estão dentro da validade declarada; quando houver fingerprint, confira-o também;
2. abra o jogo e compare apenas os sinais iniciais observáveis previstos na ficha;
3. registre qualquer diferença de cenário, elenco, objetivo, menu ou controle;
4. classifique a diferença antes de agir:
   - **cosmética e não bloqueante:** continue pelo comportamento público observado e registre o desvio;
   - **rota vencida, mas objetivo ainda identificável:** marque o cartão como `VENCIDO`, descarte o passo divergente e explore dentro do orçamento;
   - **pista ou objetivo da ficha vencido:** marque a ficha como `FAIL` e não use o cartão para compensar a entrada errada;
   - **entrada, build ou objetivo não confiável:** pare com `BLOCKED` para a execução; não adivinhe nem inspecione dados internos;
5. invalide os passos divergentes; regenere a ficha de entrada quando ela estiver errada ou repare o cartão local quando a divergência pertencer à rota aprendida.

Um jogo pode receber `PASS` mesmo quando a ficha ou o guia recebe `FAIL`. Não atribua ao jogo uma ineficiência causada por instrução vencida.

## 2. Prepare uma sessão reproduzível

1. Anote os processos que a rodada criará.
2. Feche apenas instâncias de teste criadas por rodadas anteriores e identificadas com segurança.
3. Prefira um perfil ou contexto efêmero. Se isso não for possível, declare os saves visíveis, entre explicitamente no estado contratado e não apague dados do usuário.
4. Ajuste o viewport contratado e registre os campos de geometria que o sensor realmente expõe.
5. Inicie o jogo pela entrada pública fornecida.
6. Aguarde carregamento e transições terminarem; capture a primeira superfície estável antes de interagir.
7. Registre mensagens visíveis e, quando autorizado, console separadamente.

Não instale dependências, adicione rede ou troque a superfície de execução durante a rodada. Se a ficha autorizar HTTP local, sirva somente a raiz necessária, em uma porta livre ligada ao loopback:

```sh
cd /caminho/fornecido/para/o-build-web
python3 -m http.server <porta-livre> --bind 127.0.0.1
```

Anote raiz, porta e PID ou identificador equivalente. `file://`, HTTP, NW.js e pacote publicado são superfícies distintas; passar em uma não prova as demais.

### Faça o preflight do checkpoint

Antes da primeira ação de cada checkpoint material, receba do invocador:

- o objetivo e a guarda pública estável esperada;
- a orientação mínima imediata;
- o orçamento ativo estimado pelo especialista;
- quatro parcelas: tentativa mínima e até três orientações operacionais progressivas;
- a última guarda aprovada e a recuperação pública disponível.

O relógio monotônico conta somente enquanto você possui o browser e uma instrução acionável: observação, decisão, inputs, exploração e mudança executável do cartão. Ele pausa durante análise do especialista, roteamento do invocador, captura passiva, reset controlado e handoff.

Depois da primeira divergência documentada, aguarde a orientação operacional 1 em vez de repetir a mesma abordagem. As orientações 2 e 3 devem responder às divergências seguintes. Uma hipótese nova permite outra tentativa dentro do saldo, mas não renova tempo. Somente a confirmação do especialista de que o motivo anterior de `REJEITADO` ou `INCONCLUSIVO` foi resolvido concede novo orçamento completo.

Ao esgotar o orçamento sem essa confirmação, solte entradas, estabilize a tela, preserve o estado e marque o checkpoint `PRESO`. Não encerre por duração total enquanto checkpoints materiais continuam sendo aprovados.

Mantenha um **ledger de fronteiras** durante a descoberta. Uma fronteira é qualquer ramo público ainda não testado: corredor, porta, NPC, objeto, opção de diálogo, comando de menu ou transição equivalente.

```text
F03 | marco: salão com duas saídas | ramo: porta com nome legível | relevância: alta para o objetivo | status: NÃO TENTADO | gasto: 0
F04 | marco: mesmo salão | ramo: corredor sem pista | relevância: baixa | status: ADIADO | gasto: 0
```

Use os estados `NÃO TENTADO`, `ATIVO`, `ADIADO`, `ESGOTADO` ou `BLOQUEADO`. Em cada junção, enumere as fronteiras visíveis antes de escolher uma. Priorize a orientação vigente e depois NPCs, rótulos, objetos, diálogos e saídas publicamente compatíveis com a missão; trate aparência visual apenas como hipótese, nunca como prova de identidade ou função.

Explore de forma sistemática:

1. escolha a fronteira não tentada de maior relevância observável;
2. registre o início do ramo e o saldo ativo do checkpoint;
3. pare na divergência, em beco, bloqueio ou falso destino confirmado e solicite a próxima orientação operacional;
4. volte ao último checkpoint conhecido e atualize o ledger;
5. reordene as fronteiras restantes depois de cada nova pista;
6. não repita um ramo `ESGOTADO` sem uma observação nova que justifique reabri-lo.

O orçamento ativo de autoria e a SLA de replay são contratos diferentes. A SLA rígida muda somente por nova autoridade humana; a provisória pode ser revisada por evidência estrutural antes da validação. Nenhum valor é copiado de outra quest.

## 3. Use o ciclo de interação controlada

RPG Maker MZ normalmente desenha o jogo em um Canvas. A árvore de acessibilidade pode conter pouco texto útil; nesse caso, a tela é o sensor principal.

Para cada ação, repita:

1. **Observe:** registre o estado estável, o foco, a orientação e o que mudou desde a ação anterior.
2. **Decida:** escolha uma única intenção pública, como mover uma célula, avançar uma fala ou confirmar uma opção.
3. **Aja:** envie uma única entrada curta.
4. **Estabilize:** solte a tecla, espere animação, fade, movimento e revelação de texto terminarem.
5. **Compare:** determine se houve deslocamento, mudança apenas de orientação, seleção, transição, colisão ou nenhuma reação.

Não automatize o percurso como uma sequência cega.

### Controles são hipóteses

Confirme os controles locais. Como ponto de partida, sem tratá-los como universais:

| Intenção | Entradas comuns |
|---|---|
| mover ou selecionar | setas |
| confirmar ou interagir | `Enter`, `Z`, `Space` ou clique |
| cancelar ou abrir menu | `Escape`, `X` ou gesto local |
| correr | `Shift` |
| navegar por páginas | `PageUp` e `PageDown` |

Se uma entrada instantânea não responder, espere e recapture antes de testar uma sustentação curta. Comece por aproximadamente 80–150 ms, ajuste em passos pequenos e registre o valor efetivo. A faixa é uma heurística, não uma constante do MZ.

Toda tecla sustentada deve ser liberada mesmo quando uma espera ou captura falha. Em Playwright, ou ferramenta equivalente, proteja o `keyup`:

```js
async function pressHeld(page, key, holdMs = 120) {
  await page.keyboard.down(key);
  try {
    await page.waitForTimeout(holdMs);
  } finally {
    await page.keyboard.up(key);
  }
  await page.waitForTimeout(250);
}
```

Se houver suspeita de tecla presa, pare e libere as teclas usadas antes de continuar. Descarte a tentativa se uma entrada atravessou várias opções, células ou cenas sem observação intermediária.

### Entre no estado inicial explicitamente

Execute o procedimento público definido pela ficha e prove o resultado pelo primeiro estado jogável, não pelo realce de um menu. Quando esse procedimento passar pelo título:

1. espere o título estabilizar;
2. identifique visualmente `Nova partida`, `Novo Jogo`, `Continuar` ou o comando contratado;
3. mova a seleção até o rótulo correto; se ele já parecer realçado, navegue para outro item e retorne;
4. confirme uma vez;
5. compare o estado jogável com os sinais iniciais da ficha.

Hover, realce visual e seleção operacional são hipóteses diferentes. Se a confirmação abrir saves ou outro menu, solte as teclas, use Cancel uma vez e refaça a seleção. Reinicie em sessão limpa se o estado tiver sido alterado de modo incompatível com o cenário.

## 4. Derive checkpoints do cenário

| ID | Ação | Sinal observável obrigatório |
|---|---|---|
| `C0` | abrir a entrada pública | primeira superfície esperada está estável, legível e sem erro bloqueante |
| `C1` | entrar no estado inicial | primeiro mapa, cena, menu ou fala contratado apareceu |
| `C2...Cn` | atravessar marcos necessários | cada ação relevante produz o sinal público esperado |
| `CF` | concluir a missão | o destino definido pela ficha foi reconhecido por seu sinal público |
| `CR` | reiniciar e reentrar | o estado inicial reapareceu com os sinais de restauração definidos antes da rodada |

Em cada checkpoint:

1. registre a expectativa em linguagem de jogador;
2. realize a menor ação pública necessária;
3. estabilize e observe a tela inteira;
4. registre a observação sem explicação causal;
5. só então escreva uma inferência separada;
6. quando uma imagem ajudar a diagnosticar ou escrever a guarda, marque-a como temporária; a evidência canônica será produzida no segundo replay.

Crie somente checkpoints intermediários que representem uma transição material e terminem numa guarda pública estável: entrega concluída, área necessária alcançada, item obrigatório obtido, escolha materializada ou sinal final contratado. Página isolada, sala atravessada, movimento sem consequência e estado interno invisível não são checkpoints por si só. Não transforme a evidência em uma captura por entrada.

Prefixe os IDs com a tentativa quando houver descoberta, replay e reparo na mesma rodada, por exemplo `D-CF`, `R1-CR` e `R2-CF`. Assim, um mesmo checkpoint não parece provado por um estado de outra passagem.

### Módulo condicional de encerramento e nova partida

Quando a ficha exigir um ciclo de ending, créditos, título e nova partida, acrescente checkpoints específicos para: início do encerramento, conteúdo principal dos créditos legível, saída pública reconhecida, título funcional e estado jogável restaurado. Créditos podem ser estáticos, rolantes, paginados ou compostos por várias cenas; podem exigir confirmação, oferecer um botão, aceitar Cancel ou retornar automaticamente. Observe o comportamento real e não marque o checkpoint durante fade ou quadro preto.

No checkpoint de reentrada, compare com `C1` usando os sinais públicos definidos antes da execução: cena introdutória reapresentada, posição inicial, ausência de membros coletados, inventário visível, variáveis narradas ou outro estado legítimo. Não presuma que nova partida apaga opções, conquistas ou dados globais. Sem um sinal público distinguível, registre a limitação em vez de alegar reset interno.

## 5. Adapte o percurso ao formato do jogo

### Visual novel

- espere a página terminar de revelar e o indicador público de continuação estabilizar antes de confirmar;
- depois de cada confirmação, diferencie publicamente três resultados: a página apenas terminou de revelar, a próxima página apareceu ou a janela fechou;
- avance texto com uma confirmação por vez e registre qual desses sinais encerrou a ação;
- observe falante, retrato, fundo, janela, indicador de continuação e histórico quando disponível;
- capture todas as opções antes de escolher;
- desative auto e skip, salvo quando forem objeto do cenário;
- após cada escolha ou mudança de cena, volte ao ciclo Observe–Decida–Aja–Estabilize–Compare.

### RPG com exploração

- mova em passos curtos perto de paredes, transferências, eventos e junções;
- diferencie deslocamento, mudança de orientação e ausência de resposta;
- use cenário, placas, mapa, diário e menu visíveis; não abra dados do mapa;
- trate o sprite controlado como líder e confirme quem realmente responde à entrada;
- não confunda seguidores que se reorganizam, surgem na câmera ou repetem o trajeto com movimento adicional do líder;
- antes de capturar evidência, espere o líder parar, os seguidores terminarem de se reorganizar e a câmera estabilizar;
- não infira perda, ganho ou ausência de membros por um quadro transitório; confirme o elenco em outro estado estável ou sinal público adequado;
- considere que a câmera pode recentralizar, rolar ou ocultar coordenadas absolutas; descreva relações com marcos visíveis;
- em uma junção, registre os ramos tentados; em um beco sem saída, volte ao último ponto conhecido.

Divida uma perna espacial sempre que ela atravessar além da área imediatamente visível, provocar rolagem da câmera ou depender de colisão para parar. Cada trecho deve terminar em uma **âncora pública** que o jogador consiga reconhecer — parede, porta, corredor, objeto, NPC ou composição visual distintiva — e o trecho seguinte começa somente depois dessa âncora ser observada. Contagem de células ou duração sustentada pode materializar a entrada entre duas âncoras, mas não substitui a confirmação da âncora de chegada.

Quando a ferramenta não consegue reconhecer a âncora durante uma entrada contínua, use grupos curtos com o ciclo Observe–Decida–Aja–Estabilize–Compare. Uma sustentação até colisão só é reproduzível quando a tela confirma tanto a parada quanto a relação espacial esperada; tempo decorrido, câmera estabilizada ou ausência de erro não bastam.

Mantenha um log textual compacto, sem criar uma captura por célula:

```text
J03 | marco: estátua | entrada: sul | ramos: leste não tentado; oeste tentado
A17 | oeste | líder virou e não deslocou | provável colisão | voltei a J03
A18 | leste | líder deslocou; câmera rolou | novo corredor | progresso
```

Por padrão, capture somente checkpoints, junções que orientam a rota, anomalias e mudanças relevantes de estado. Não capture cada passo nem cada célula. O log reconstrói as ações intermediárias; screenshots repetitivas aumentam custo sem provar melhor o percurso. Quando o contrato exigir continuidade, prefira vídeo ou trace autorizado e acrescente imagens apenas nos marcos que precisam de prova estática.

Eventos podem usar gatilhos diferentes:

- **ação:** normalmente exige proximidade, orientação e uma entrada de confirmação configurada;
- **toque do jogador:** dispara quando o líder alcança a célula ou limite do evento;
- **toque do evento:** dispara quando um evento móvel alcança o jogador;
- **início automático ou processo paralelo:** inicia ou muda estado sem confirmação direta.

Use a ficha e a reação visível para inferir o tipo; não presuma que todo NPC exige ficar de frente e pressionar `Z`.

#### Registrador caixa-preta opcional

Um registrador pode enviar teclado e mouse públicos, manter uma posição **relativa** a partir do ponto inicial observado e registrar um grafo de deslocamentos, transições, colisões, junções e marcos. Atualize essa posição somente depois que o deslocamento do líder for confirmado visualmente. Mudança de orientação, animação, reorganização de seguidores e rolagem da câmera não contam como movimento. O grafo pode materializar o cartão de rota, mas cada aresta continua vinculada à ação pública e ao sinal que a confirmou.

Esse método não promete navegação universal. Visual novels podem não possuir células; plugins, eventos móveis, teletransportes, loops de mapa, veículos e regras locais podem romper a hipótese de uma grade estática. Nesses casos, modele apenas estados e transições que a superfície pública permite distinguir.

Scripts que leem `$gamePlayer`, `$gameMap`, tiles, passabilidade, eventos ou que executam pathfinding sobre dados internos são sensores white-box. Quando autorizados, pertencem a um harness separado: seus artefatos e vereditos ficam segregados e não criam o cartão de rota, não provam este playtest de jogador e não substituem descoberta, divergência ou reparo por superfícies públicas.

### Formato híbrido

Alterne as duas disciplinas: passos curtos na exploração e confirmações únicas em diálogo. Revalide foco e estado após cada troca de cena, pois a entrada que move o líder pode também avançar uma fala se atravessar a transição.

## 6. Produza e valide um cartão de rota local

O cartão de rota local é o segundo guia que o próprio executor escreve para si. Ele transforma o percurso descoberto em instruções reproduzíveis para um mapa, uma cena ou outro segmento observável de um build. Ele não substitui este guia genérico nem a ficha de laboratório.

### Separe descoberta de replay

Durante a passagem de autoria:

1. execute a orientação vigente dentro do orçamento ativo do checkpoint e mantenha o log de ações, junções, diálogos, escolhas e recuperações;
2. registre controles, marcos, relações espaciais, textos e reações que apareceram nas superfícies públicas; registre coaching narrativo em proveniência separada;
3. ao alcançar o destino, extraia do log o caminho bem-sucedido mais direto conhecido;
4. retire tentativas sem progresso da rota principal e preserve somente recuperações que um novo executor possa precisar;
5. escreva o cartão no destino durável indicado pela ficha;
6. marque-o como `RASCUNHO` até que os dois passes, iniciados do estado contratado e sob um único hash aprovado, confirmem todos os passos.

O jogador não consulta mapas JSON, eventos, IDs, switches, variáveis, plugins, código ou saves para completar o cartão. Células contadas visualmente e marcos vistos pelo jogador são observações públicas; coordenadas internas e nomes descobertos nos dados do projeto não são. Toda contribuição do especialista chega como ação/sinal público via invocador e muda a proveniência do cartão para assistida.

### Comece pelo cartão mínimo

```markdown
# Cartão de rota local — <build> — <trecho observável>

- Status: RASCUNHO | VALIDADO | VENCIDO | REPARADO
- Autor e data:
- Build e origem:
- Entrada pública:
- Derivado somente de observação pública: sim | não
- Revisão e SHA-256 candidato:
- Aprovação externa: <manifesto e hash | ainda não aprovado>
- Estado inicial e sinal visível:
- Destino e sinal visível de conclusão:
- Procedimento público de reinício após conclusão e sinal de restauração:
- Procedimento público de reinício após abortagem e sinal de restauração: <procedimento | não disponível>
- Controles e durações efetivamente observados:
- Validade e condições de expiração:
- Revisão anterior e motivo da mudança:

| Step ID | Pré-condição pública | Inputs realmente despachados | Reação visível | Guarda de conclusão | Guarda de retomada | Recuperação segura | Dependências |
|---|---|---|---|---|---|---|---|
| R01 | | | | | | | |
```

Preencha esse núcleo antes de acrescentar auditoria, automação ou medição. Cada passo deve dizer onde o jogador parece estar, quais inputs foram realmente enviados, qual reação apareceu, o que prova conclusão, o que prova que é seguro continuar e como recuperar. Quando as duas guardas forem iguais, registre isso explicitamente. Prefira marcos como portas, estátuas, bordas, falas ou rótulos de opção. Uma sequência de teclas sem pré-condição e sem sinal de parada não é uma rota validável. Mantenha o texto autossuficiente: uma imagem pode corroborar a guarda, mas nunca carregar a instrução necessária para executá-la.

Quando uma interação observada depender de orientação, materialize imediatamente antes da confirmação a entrada pública que produziu essa orientação na descoberta. Adjacência ou pose visual servem como marcos, mas não substituem a reprodução da sequência que acionou o evento.

Trate diálogo como uma sequência de transições observáveis, não como uma contagem de confirmações. Um passo `Confirmar × N` só é materializável quando o cartão nomeia, para cada confirmação, o sinal público de entrada e um dos sinais de saída: texto totalmente revelado, próxima página identificável ou janela fechada. Se esses sinais não forem distinguíveis pela ferramenta, mantenha confirmações unitárias na cadência controlada e inclua o custo das observações no preflight; uma espera fixa organiza a tentativa, mas não comprova prontidão.

Antes de congelar qualquer hash candidato, aplique o **gate de estabilidade da rota** a todos os passos:

1. cada perna espacial longa está dividida por âncoras públicas observadas;
2. cada interação direcional reproduz a orientação imediatamente antes da confirmação;
3. cada página de diálogo possui sinal público de prontidão e saída, sem contagem opaca;
4. cada transição, colisão e escolha começa de uma pré-condição observada e termina num sinal distinguível;
5. toda espera fixa permanece apenas como limite de estabilização, nunca como prova de que o próximo passo está pronto;
6. todo input despachado desde a última guarda aprovada está materializado e toda sustentação possui liberação;
7. a guarda de conclusão ocorre depois que o evento terminou, não numa página ou animação ainda aberta.

Qualquer item ausente mantém o candidato incompleto e impede o verdict do especialista. Registre a lacuna e calibre publicamente dentro do orçamento do checkpoint.

Toda correção que altere inputs, ordem, duração, reação, guarda ou recuperação deve ser retestada a partir da última guarda aprovada. Corrija sem browser apenas ortografia, formatação, links ou metadados que não mudem o comportamento executável.

### Complete o gate de replay e acrescente extensões contratadas

- **SLA local obrigatória:** registre tipo rígido ou provisório, origem, início, fim, tolerância, exclusões e preflight com limite inferior, soma nominal e margem. O gate usa dois passes: desempenho sem screenshots e evidência com captura por checkpoint.
- **Identidade exata:** registre fingerprint do build e do cartão, método e origem quando o ensaio depender de revisão exata, automação ou adulteração.
- **Automação pública:** para cada passo automatizado, acrescente custo nominal, guarda semântica e proxy público que a ferramenta realmente consiga interpretar.
- **Resiliência:** registre orçamento de recuperação e um histórico com revisão, divergência observada, passo descartado, correção confirmada e build do replay limpo.

Antes de tentar uma SLA curta ou execução em batch, materialize cada ação: entrada, ordem, contagem de repetições ou duração sustentada, momento da liberação e intervalo necessário. Registre checkpoints públicos entre grupos. Faça essa calibração na descoberta ou num replay sem veredito cronométrico; não improvise parâmetros dentro da medição oficial.

Uma ação como “mova até a porta” só é executável de forma contínua quando a ferramenta consegue reconhecer a porta e interromper a entrada naquele sinal. Caso contrário, substitua-a por ações determinísticas reproduzíveis e mantenha a porta como checkpoint de auditoria. Toda tecla sustentada deve ter liberação garantida.

Quando houver automação, distinga:

- **guarda semântica:** o significado que um agente confirma na superfície pública, como “líder parado diante da porta nomeada”;
- **proxy automatizável:** um sinal público específico que a ferramenta consegue medir e que distingue aquele marco dos estados vizinhos, como rótulo legível, composição estável de uma região nomeada ou relação visual previamente caracterizada.

“Algum pixel mudou”, animação de sprite, tempo decorrido e ausência de erro podem indicar atividade, mas nunca provam que o marco correto foi alcançado. Um proxy que reage a seguidores, partículas, cursor ou câmera sem distinguir o destino não implementa a guarda semântica.

Em uma superfície animada, igualdade ou hash do frame inteiro não prova prontidão nem estabilidade, salvo quando a calibração demonstrar que o sinal converge e distingue o marco. Não faça polling contínuo de um sensor que oscila ou nunca converge; interrompa a sondagem, registre a limitação e escolha um proxy semântico mais específico ou o modo determinístico auditado descrito abaixo.

### Vincule cada tentativa ao cartão vigente

Imediatamente antes de cada replay ou reparo:

1. reabra o cartão no destino durável; não use uma cópia retida apenas na conversa ou na memória da ferramenta;
2. leia a revisão, o build e as condições de validade; quando o fingerprint fizer parte do contrato, recalcule-o com o método registrado;
3. invalide funções, macros, listas de ações, caches e planos compilados de outra revisão, mesmo na mesma sessão;
4. releia em ordem a pré-condição, ação, sinal de saída e recuperação de cada Step ID;
5. faça um lint semântico: a ação pode conduzir da pré-condição ao sinal de saída descrito?;
6. refaça o gate de estabilidade da rota e rejeite pernas longas sem âncoras ou lotes de diálogo sem sinais intermediários;
7. durante a tentativa, registre por Step ID as ações realmente enviadas.

Materialize um manifesto durável separado para validação. Inclua caminho, hash e revisão do cartão, build ou fingerprint quando contratado, SLA local e seu tipo, aprovação integral do especialista, confirmação mecânica do invocador e os dois procedimentos de replay.

Por exemplo, mover à esquerda não pode prometer chegada a uma parede à direita sem um mecanismo observado que explique essa transição. Contradição, Step ID ausente, ação não materializada ou divergência entre manifesto e arquivo deixa o cartão `VENCIDO` e o replay `FAIL`; não inicie a medição oficial. Entre no fluxo de recuperação pública, repare o cartão, incremente a revisão e, quando contratado, calcule um novo fingerprint antes da tentativa seguinte.

No reparo, o manifesto preserva a identidade da revisão inválida e os passos sob diagnóstico. Registre ações exploratórias separadamente; elas só se tornam novos Step IDs depois de observadas, escritas no cartão reparado e relidas em outro manifesto.

Concluir o objetivo com macro, função, cache ou plano de outra revisão não prova o cartão vigente, ainda que a tela final correta apareça. Classifique essa tentativa pela matriz causal da seção 10.

### Prepare e faça os replays limpos

#### Faça o preflight do orçamento

Antes de qualquer replay oficial com SLA, some:

1. inventarie todas as ações públicas, liberações, intervalos, esperas, transições, animações, carregamentos, sensores, guardas e checkpoints incluídos no intervalo medido;
2. some o limite inferior conhecido de cada componente inventariado;
3. some a duração nominal observada dos mesmos componentes;
4. some também uma margem explícita para a variabilidade admitida pelo contrato e observada na superfície.

Registre separadamente o limite inferior, a soma nominal, a margem e o **orçamento previsto**, definido como soma nominal mais margem. O cartão só está pronto para o replay oficial quando o orçamento previsto é menor que a SLA e cada custo incluído pode ser medido ou justificado antes da execução.

Se a soma nominal já alcança a SLA, se o orçamento previsto a alcança ou supera, ou se não há margem defensável, não inicie uma rodada sabidamente condenada e não altere parâmetros durante a medição. Mantenha o cartão como `RASCUNHO` e faça calibrações públicas de eficiência sem veredito cronométrico.

Na calibração:

1. parta sempre do mesmo estado público confirmado;
2. varie uma única duração, intervalo, contagem ou tamanho de grupo por vez;
3. encontre o menor valor que ainda produza uma resposta única e reproduzível;
4. garanta a liberação de toda entrada sustentada;
5. confirme checkpoints públicos depois de cada grupo calibrado;
6. repita a tentativa a partir do estado inicial para separar coincidência de reprodução.

Depois de calibrar durações e agrupamentos, avalie também modos públicos legítimos oferecidos ao jogador e permitidos pela ficha, como correr ou usar dash durante exploração. Altere um modo por vez e documente seu impacto em duração, resposta única, colisões e checkpoints. Isso não autoriza debug, aceleração da engine, teleporte, atravessar paredes, skip narrativo nem qualquer alteração interna.

Não acelere nem pule animações, não remova esperas necessárias ao jogador e não exclua custos que o contrato inclui. Recalcule o preflight depois de cada ajuste até demonstrar viabilidade com margem ou concluir, com medições públicas, que a SLA é inviável naquela superfície. Nesse caso, reporte a inviabilidade em vez de fabricar uma aprovação.

Se o procedimento deste guia levar o executor a produzir um cartão sem preflight, sem margem ou a iniciar uma medição cujo orçamento previsto já não cabe na SLA, o guia principal permanece `FAIL`, mesmo que a rota esteja semanticamente correta.

#### Execute os dois replays limpos

Use uma identidade limpa para um cartão integral marcado `APROVADO` pelo especialista. Confirme mecanicamente caminho, hash, build e escopo no manifesto antes de abrir o browser.

**Replay 1 — desempenho**

1. Reinicie pelo procedimento público contratado e prove o estado inicial antes do relógio.
2. Execute somente o cartão, sem ajuda, exploração, correção ou screenshots durante o percurso.
3. Registre inputs e timestamps de checkpoint passivamente.
4. Meça um intervalo monotônico entre os eventos contratados de início e fim.
5. Exija a SLA rígida ou a versão vigente da SLA provisória.

**Replay 2 — evidência**

1. Inicie somente depois que o replay de desempenho passar.
2. Use a mesma identidade, cartão, hash e reset público.
3. Execute sem ajuda ou edição; não aplique SLA porque a captura acrescenta latência de sensor.
4. Após cada guarda material, capture e reabra um screenshot antes do próximo input.
5. Tente recaptura passiva até três vezes quando o arquivo estiver preto, corrompido, obsoleto ou incorreto. Se continuar inválido, registre `CAPTURA AUSENTE`, caminhos, hashes e defeitos observados, e prossiga.
6. Faça o último screenshot provar o sinal de conclusão específico da ficha, qualquer que seja seu formato.

Marque o cartão como `VALIDADO` somente quando os dois replays completarem o gameplay sob um hash imutável. Capturas ausentes produzem `PASS com evidência visual parcial`; não transformam sozinhas o gameplay em falha.

Se qualquer replay divergir, libere entradas, preserve o diagnóstico e devolva o checkpoint responsável ao jogador-autor. Toda correção executável exige novo teste e novo hash integral; a validação seguinte usa outra identidade limpa e recomeça pelos dois passes. Se o replay de desempenho concluir acima da SLA, retorne à autoria para otimização sem alterar uma SLA rígida.

Depois que os dois replays e a inspeção das capturas terminarem, limpe apenas artefatos temporários da rodada. Retenha contrato, cartão autossuficiente, aprovação, traces, relatório e uma captura válida do segundo replay por checkpoint evidenciado. Adie a limpeza quando houver falha de gameplay.

#### Instrumente uma SLA local sem perder observabilidade

Congele antes do replay a SLA, o estado inicial, os eventos observáveis de início e fim, a tolerância e as exclusões. Meça com relógio monotônico e registre instrumento, unidade e duração bruta. Associe a medição a trace ou vídeo autorizado e aos checkpoints necessários para provar que o percurso continuou válido.

Uma execução contínua por teclado ou mouse público com validação durante o percurso é permitida somente quando:

1. o cartão já contém ações materializadas, pré-condições, guardas semânticas e proxies válidos para os passos executados;
2. a ferramenta interpreta os proxies como as guardas correspondentes durante o replay;
3. qualquer divergência interrompe e libera imediatamente a entrada sustentada;
4. o registro permite reconstruir os eventos de início, fim e abortagem.

Se a ferramenta não consegue interpretar as guardas durante execução contínua, use a cadência controlada da seção 3. A única exceção é uma ficha que autorize explicitamente um **replay determinístico pós-descoberta**: o cartão deve conter ações materializadas, o percurso usa somente entradas públicas e trace, vídeo ou checkpoints auditáveis permitem verificar depois todos os marcos contratados.

Antes de enviar qualquer batch determinístico, conclua o lint semântico de todos os passos do manifesto. Uma contradição entre ação, pré-condição e guarda proíbe executar o batch como replay; marque o cartão `VENCIDO` e siga para recuperação e reparo públicos.

Nesse modo, calibre repetidamente uma espera pública fixa suficiente entre a ação materializada e o checkpoint seguinte. A espera organiza a execução; não prova que o marco chegou. No replay de desempenho, faça a ação, aguarde o valor congelado e registre o checkpoint passivamente, sem screenshot. Reserve as capturas para o replay de evidência. Se a auditoria encontrar qualquer divergência, invalide a rodada e use o reinício de abortagem; ausência de erro ou chegada eventual ao destino não recupera o replay.

Minimize sensores dentro da janela medida até o menor conjunto que ainda preserve trace e checkpoints auditáveis exigidos. Não retire prova necessária, não mova custo para fora da janela quando o contrato o inclui e contabilize ações, esperas e sensores conforme o preflight congelado.

Nunca transforme o replay em macro cega nem leia estado interno para criar um gate. Depois da execução, não redefina início ou fim, não crie exclusões e não subtraia latências retroativamente para produzir aprovação; preserve a medição original e reporte a causa observada ou a limitação do instrumento.

### Detecte e repare uma rota vencida ou adulterada

Execute este ensaio somente quando a ficha exigir resiliência da rota. Na adulteração cega, o responsável altera um ou mais passos sem revelar ao executor quantidade, posição ou conteúdo das mudanças e sem fornecer a revisão correta para comparação. O executor recebe apenas o cartão vigente, a ficha e este guia. Reutilizar o cartão em outro build também exige que a ficha identifique o build atual sem entregar a nova rota.

Ao primeiro conflito entre cartão e tela:

1. pare a entrada e estabilize a tela;
2. registre o passo, a pré-condição real, a ação tentada e o sinal esperado que não apareceu;
3. marque o passo como divergente e deixe de repeti-lo como verdade;
4. decida, por sinais públicos, se é seguro explorar a partir do estado atual ou se o trecho precisa ser reiniciado;
5. explore somente dentro do orçamento contratado, sem procurar a resposta em dados internos;
6. conclua o objetivo quando possível e corrija o cartão com os marcos e ações observados;
7. incremente a revisão, registre o reparo e associe o cartão ao build em que a correção foi aprendida.

Ao reparar um passo, invalide também todo passo posterior cuja pré-condição dependa da posição, orientação, página de diálogo, escolha ou estado produzido pelo trecho divergente. Reobserve esses passos na recuperação pública antes de incluí-los na nova revisão. Um passo posterior que funcionou numa passagem antiga não permanece calibrado por presunção quando o caminho que o alimenta mudou.

Instrução vencida não autoriza insistência cega. Ausência do marco esperado, mudança de layout, colisão onde antes havia passagem, opção renomeada ou ação que conduz a outro estado são sinais suficientes para suspender o passo. Uma diferença cosmética que preserva a mesma ação e o mesmo resultado pode ser registrada sem reescrever a rota.

Depois de reparar, encerre a passagem de recuperação e use o procedimento público de reinício. Confirme novamente o estado inicial por seus sinais visíveis; não reutilize posição, escolhas, diálogo ou outro estado intermediário. Só então reinicie os dois passes com uma identidade limpa. O cartão volta a `VALIDADO` apenas quando o replay de desempenho cumpre a SLA e o replay de evidência conclui o destino sem exploração improvisada.

## 7. Recupere-se sem mascarar defeitos

| Sintoma | Resposta controlada |
|---|---|
| Entrada ignorada | estabilize, recapture, tente uma sustentação curta e depois uma alternativa documentada |
| Foco incerto | clique uma vez em alvo visível do Canvas, sem ignorar overlays, e revalide |
| Clique interceptado por camada visível ou transparente | não remova nem contorne a camada; tente teclado ou outro foco público documentado e registre a limitação do mouse |
| Colisão ou beco | compare orientação e posição; marque o ramo e volte à última junção |
| Caminho desconhecido | atualize o ledger, priorize a fronteira semanticamente mais compatível e respeite os limites do ramo e da rodada; depois classifique pela causa observada |
| Menu inesperado | solte teclas, capture, use Cancel uma vez e selecione pelo rótulo visível |
| Ação duplicada | pare, estabilize e retome apenas de um checkpoint ainda válido |
| Tela preta ao vivo | espere o tempo compatível com a transição, recapture e registre duração observada |
| Captura preta ou corrompida | reabra o arquivo; compare com a tela ao vivo e outro sensor, sem atribuir o defeito ao jogo automaticamente |
| Recarregamento ou queda | registre URL, última ação e estado perdido; só recarregue se o cenário permitir |
| Ficha ou cartão divergente | aplique o protocolo de validade, invalide o passo e não procure a resposta em dados internos |

Uma camada transparente pode interceptar o clique mesmo sem exibir erro ou mensagem. Não a oculte, não altere seu estilo e não force eventos por código. Prefira uma entrada pública alternativa, como teclado ou um alvo visível de foco. Se o percurso continuar, registre que o foco por clique não foi verificado ou ficou limitado; se nenhuma entrada pública alcançar o jogo, classifique o bloqueio pela origem observável sem desmontar a página.

Se a tela ao vivo está correta, mas o arquivo salvo está preto, vazio ou ilegível, houve falha do sensor de captura. No replay de evidência, tente até três capturas passivas e, se nenhuma funcionar, registre `CAPTURA AUSENTE` com caminhos, hashes e defeitos observados, e prossiga para o próximo checkpoint. O gameplay pode receber `PASS` com evidência visual parcial; o relatório não pode promover a captura ausente a prova documental.

Se o objetivo deveria ser encontrável pelas pistas do próprio jogo e não é, isso pode ser `FAIL` de usabilidade. Se o cenário depende de informação externa que a ficha omitiu, use `BLOCKED` e marque a ficha como falha. Pare quando atingir o orçamento declarado.

## 8. Preserve a perspectiva do jogador

Durante o percurso, não:

- execute código na página para mover o jogador, chamar cenas ou alterar estado;
- leia ou escreva objetos globais do jogo;
- modifique saves, switches, variáveis, inventário ou posição;
- consulte arquivos de mapa, evento ou plugin para encontrar o destino;
- use debug, atravessar paredes, teleporte ou velocidade de skip;
- escolha respostas a partir de dados internos;
- use um harness como prova de experiência visual ou controle real.

Automação pode enviar teclado e mouse, esperar, capturar tela e coletar logs. A ação deve continuar equivalente à de uma pessoa jogando.

Em cada checkpoint, pergunte se o próximo passo é compreensível, se a entrada teve resposta única, se texto e foco estão legíveis, se há cortes ou assets ausentes e se a transição comunica progresso. Screenshot não prova áudio, sensação de controle, tempo exato, causalidade interna nem persistência oculta.

## 9. Construa uma cadeia de evidência

Use um ID único de rodada e mantenha ordem verificável por timestamps ou por um log de ações numerado. Registre a ação imediatamente anterior a cada checkpoint.

Persista imagens e vídeos em:

```text
docs/qa/evidence/<data-cenario>/
```

Persista o relatório em:

```text
docs/qa/reports/<data-cenario-rNN>.md
```

Se o projeto já definir uma convenção mais específica dentro dessas árvores, siga-a. Evidência não é relatório: não guarde o único relato da rodada junto das imagens.

O conjunto mínimo costuma incluir `C0`, `C1`, `CF`, `CR` e os marcos sem os quais o objetivo não pode ser provado. Acrescente checkpoints do módulo de encerramento somente quando contratado. Checkpoints adjacentes podem compartilhar um artefato quando ele prova diretamente ambos; registre a relação. Screenshots isolados provam estados visuais, não a continuidade do cenário. Para provar ordem, associe-as ao log cronológico; quando a continuidade for crítica, use vídeo ou trace de interação autorizado.

Nome de arquivo, Step ID esperado ou posição na sequência expressam intenção, não conteúdo nem veredito. Durante um batch, use prefixo ou metadado como `attempt-<rodada>-expected-<checkpoint>` até auditar a captura. Só associe o artefato a um checkpoint `PASS` depois de reabri-lo e confirmar que o conteúdo prova o critério. Não é obrigatório renomear depois, desde que o relatório preserve a intenção original e descreva o conteúdo observado; nunca deduza o conteúdo pelo nome.

Depois de salvar cada artefato obrigatório:

1. confirme que o caminho é o destino durável correto;
2. reabra o arquivo persistido;
3. compare o conteúdo observado com o checkpoint esperado e verifique legibilidade e rodada;
4. registre hash ou tamanho somente se a convenção exigir;
5. marque como temporário qualquer artefato que exista apenas na sessão da ferramenta.

No caminho de sucesso, mantenha como imagens canônicas somente as capturas válidas do replay de evidência, uma por checkpoint evidenciado. Depois que ambos os replays e a reabertura terminarem, remova apenas screenshots de descoberta, capturas inválidas, perfis efêmeros e outros temporários pertencentes à rodada. Preserve tudo após falha de gameplay até concluir o diagnóstico.

O console é um sensor diagnóstico secundário. Registre erros e avisos, mas não use ausência de erros para provar experiência nem transforme um aviso sem impacto observável em falha automática do percurso.

## 10. Atribua veredito e relate

Avalie quatro artefatos separadamente:

- **jogo:** comportamento público comparado à missão e aos checkpoints;
- **ficha:** entrada, estado, objetivo, orçamento e reset estavam corretos e suficientes;
- **cartão:** os passos da revisão vigente reproduziram o objetivo a partir do estado inicial correto;
- **guia principal:** esta revisão ensinou o executor a descobrir, escrever, reler, executar e, quando contratado, reparar o cartão.

Use `PASS` para contrato cumprido, `FAIL` para comportamento do próprio artefato que contrariou o contrato e `BLOCKED` quando uma causa externa impediu o teste sem evidência suficiente de defeito naquele artefato.

### Matriz causal

| Situação observada | Jogo | Ficha | Cartão | Guia principal |
|---|---|---|---|---|
| objetivo e ambos os replays passam; extensões contratadas também passam | `PASS` | `PASS` | `PASS` | `PASS` |
| o executor seguiu esta revisão, mas o cartão que ele próprio produziu não pode ser executado do estado inicial correto | não recebe `FAIL` automático | conforme a evidência | `FAIL` | `FAIL` |
| um checkpoint esgota o orçamento ativo sem resolução confirmada ou sem escalada correta das orientações | não recebe `FAIL` automático | conforme a evidência | `BLOCKED` se não ficou completo | `FAIL` |
| cartão vencido ou adulterado é detectado, reparado e passa os dois replays | conforme os checkpoints | `PASS` se o contrato atual era válido | revisão antiga `VENCIDO`; reparada `PASS` | `PASS` |
| executor não detecta a divergência, insiste no passo ou não consegue reparar e validar | não recebe `FAIL` automático | conforme a evidência | `FAIL` | `FAIL` |
| entrada, build, objetivo ou reset fornecido está errado ou ausente e impede o ensaio | `BLOCKED`, salvo defeito público independente | `FAIL` | `BLOCKED` ou `VENCIDO` | `BLOCKED` |
| o jogo contraria um checkpoint e impede o percurso ou o reset público contratado | `FAIL` | `PASS` se descreveu corretamente o esperado | `BLOCKED` para o replay afetado | `BLOCKED`, salvo falha independente do procedimento |

Se o cartão produzido não cumprir uma SLA local que o preflight demonstrou viável, o cartão e o guia principal recebem `FAIL`; isso não reprova automaticamente o jogo. Se limites inferiores públicos demonstrarem antes do replay que a SLA é inviável, não execute uma tentativa condenada: mantenha o cartão como `RASCUNHO` e reporte a limitação do contrato.

Depois de `FAIL`, corrigir ou substituir somente o cartão não devolve `PASS` ao guia principal. É necessário revisar o próprio guia e executar uma nova iteração na qual o executor, seguindo essa revisão, produza ou repare o cartão e passe todos os ensaios contratados. O jogo pode continuar `PASS` quando a falha pertence ao guia.

### Modelo curto de relatório

```markdown
# Playtest RPG Maker MZ — <data> — <escopo>

- Rodada:
- Build e origem; fingerprint quando contratado:
- Entrada pública:
- Estado inicial:
- Missão e sinal de conclusão:
- Orçamentos ativos por checkpoint, parcelas de orientação e revisões:
- Relógio monotônico de posse ativa: <instrumento, transições e duração por checkpoint>
- Checkpoints `PRESO` e resumo do ledger de fronteiras:
- Cartão de rota, caminho, build, revisão e status; fingerprint quando contratado:
- Manifesto de aprovação e comparação com ações enviadas:
- Replay de desempenho: <SLA rígida ou provisória, preflight e duração medida>
- Replay de evidência: <checkpoints capturados, capturas ausentes e sem verdict de SLA>
- Extensões condicionais verificadas:
- Veredito do jogo: PASS | FAIL | BLOCKED
- Veredito da ficha de laboratório: PASS | FAIL | BLOCKED
- Veredito do cartão de rota: PASS | FAIL | BLOCKED
- Veredito do guia principal: PASS | FAIL | BLOCKED

| Checkpoint | Expectativa | Observação | Inferência | Evidência | Resultado |
|---|---|---|---|---|---|
| C0 | | | | | |
| C1 | | | | | |
| C2...Cn | | | | | |
| CF | | | | | |
| CR | | | | | |

- Cronologia de ações relevantes:
- Entradas que exigiram recuperação:
- Divergências da ficha:
- Divergências e reparos do cartão:
- Instrumento, início e fim da medição:
- Erros visíveis:
- Console secundário:
- Falhas de sensor:
- Evidência reaberta e inspecionada:
- Não verificado:
- Riscos restantes:
- Próxima ação:
```

Não converta `não verificado` em sucesso e não misture causa inferida com sintoma observado.

## 11. Faça teardown

1. Feche abas, janelas e contextos de navegador criados pela rodada.
2. Encerre o servidor local, gravador, watcher ou processo iniciado pela rodada usando o identificador anotado.
3. Não encerre processos preexistentes nem use comandos amplos para procurar e matar processos semelhantes.
4. Confirme que nenhum processo criado pela rodada permaneceu ativo.
5. Registre qualquer processo que não pôde ser encerrado.

## Critérios de êxito do guia

Com este guia, o protocolo assistido e uma ficha válida, os papéis isolados devem conseguir:

1. abrir a entrada pública sem modificar o jogo;
2. detectar uma ficha vencida antes de confiar em sua rota;
3. operar menus, diálogos, mapas e eventos somente por entradas públicas;
4. medir a posse ativa por checkpoint e pausar corretamente revisão, roteamento, reset, evidência e handoff;
5. explorar uma VN, um RPG tradicional ou um híbrido sistematicamente, com ledger, limite por ramo e prioridade semântica;
6. distinguir movimento, orientação, colisão, transição e falha de sensor;
7. produzir primeiro um cartão mínimo executável, específico do build, ancorado em observação pública e com coaching marcado por proveniência;
8. reler a revisão durável e usar fingerprint, manifesto e proxies somente quando contratados;
9. reiniciar o trecho e cumprir os replays de desempenho e evidência com um único hash aprovado;
10. aplicar a SLA rígida ou provisória da ficha ao replay de desempenho e demonstrar sua viabilidade antes da validação;
11. quando contratado, comprovar ending, créditos, retorno ao título e nova partida sem universalizar esse ciclo;
12. quando contratado, detectar uma adulteração cega, descartar os passos divergentes e reparar o cartão sem inspecionar o jogo por dentro;
13. fazer outro reinício limpo e passar novamente os dois replays usando o cartão reparado;
14. atribuir causas separadas ao jogo, ficha, cartão e guia principal;
15. produzir evidência durável, dizer o que não foi verificado e fazer teardown sem interferir em processos alheios.

## Separe a ficha de laboratório do cartão de rota

A ficha de laboratório é a entrada preparada antes da rodada: define build, superfície, objetivo, orçamento, sensores e contratos locais. O cartão de rota é a saída aprendida pelo executor durante a rodada: descreve como repetir um trecho observado naquele build.

Não mantenha uma rota específica nem uma SLA local como verdade permanente neste guia. Para cada build ou entrada servida, crie ou regenere a ficha usando a tabela da seção 1. O executor cria ou revalida o cartão correspondente depois de observar o jogo.

A ficha expira quando mudar qualquer um destes elementos:

- build, conteúdo servido ou fingerprint quando usado;
- entrada pública ou raiz do servidor;
- cenário inicial, objetivo ou sinais públicos;
- controles necessários;
- sinais de reinício ou qualquer extensão condicional contratada.

Cartões podem registrar marcos visíveis e decisões em junções, mas nunca coordenadas internas, IDs de evento ou conhecimento extraído dos dados do jogo. Um cartão é auxílio de eficiência para o build que o validou; exploração pública continua sendo o fallback dentro do orçamento.
