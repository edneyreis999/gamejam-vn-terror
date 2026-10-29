# Roteiros pós-armadilha

Status: todos os textos e traduções aprovados pelo dono do jogo em 2026-10-29. Integração implementada em `feat/002-juicy-morte-heroi`; aceite de mixagem separado. A3 deriva do roteiro aprovado, com adaptação sonora. Fonte mecânica: GDD canônico §12.1 e redações atuais de `Languages.tsv`, `death.a1.context` a `death.b8.context`. Não substituir despedidas.

## Contrato de autoria e implementação

Aplicar boas práticas de romances de suspense e terror de grande alcance: show, don’t tell, detalhes sensoriais seletivos, causalidade clara, subtexto, escalada e variação de ritmo. Medo aparece nos gestos; bravura, na ação apesar deles. Não imitar autores nem tratar best-sellers como fórmula. Evitar explicações emocionais, clichês e prosa ornamental. Cada cena preserva seu mecanismo de salvamento e sua consequência.

`{NOME}` / `{NAME}` são marcadores editoriais, não escapes implementados. Obter o nome canônico da vítima mediante a consulta `heroName` do EventBridge; reservar uma variável livre após conferir o projeto, e usar `\V[ID]` no texto localizado. Não imprimir H1–H8 nem assumir que o ID da vítima é o nome ou um actor ID. O contexto `pendingOutcome.victimId` identifica a vítima; preservar sua disponibilidade durante a leitura. Textos finais em PT/EN em Languages.tsv; eventos apenas com `$[chave]`. As caixas abaixo são batidas editoriais: medir o encaixe na janela real; eventuais subdivisões mantêm cada cue somente na primeira parte pertinente.

Entrada após a despedida canônica: busto escolhido em bravura, mesma posição, escala e enquadramento da seleção; outros bustos presentes ainda em medo. Não recriar o palco abruptamente. Sem placa de nome, câmera, flash ou troca automática para terror. Moldura permanece; áudio ambiente `05-opressivo` sem música. Não presumir três candidatos nem sobreviventes além de Ivaí.

Antes da caixa 3 de cada cena, retirar somente os demais bustos presentes: VN `Fade_OpacityTo` (`VN-C12`), PictureID = IDs efetivamente presentes exceto vítima, TargetOpacity = 0, Duration = 48; Wait nativo 48 frames. Pular se nenhum. Em A3 isso ocorre antes de sua caixa 3, como na referência aprovada. Não usar listas fixas que incluam ausentes ou a vítima.

Antes da última caixa de cada cena (em A3, antes da caixa 9), após avanço manual da anterior: Fade_OpacityTo da vítima, TargetOpacity = 0, Duration = 60; Wait 60. Então disparar o SE indicado e abrir a caixa. Demais caixas mantêm o estado anterior. Ao terminar, todos os bustos de candidatos estão invisíveis; limpar somente suas pictures na saída, depois da leitura. Não apagar o cenário durante os fades. As sombras e movimentos narrados não exigem animação.

Não executar opacidade e escala simultâneas na mesma picture: compartilham temporização. `Basic_GraphicChange` (`VN-C03`) troca o bitmap, não oferece crossfade e não espera o carregamento. Não é necessário nestes roteiros. Em movimento reduzido manter somente fades de opacidade, sem zoom, tremor ou movimento. Respeitar HIDE e retomada sem repetir cues.

Cada entrada sonora é evento nativo Reproduzir SE (250), imediatamente antes de Mostrar Texto; ele não espera o áudio terminar. A caixa anterior deve estar encerrada. Na retirada final, a ordem é avanço → fade → Wait → SE → texto. Não há disparos durante a digitação, nem tempo estimado de leitura. Sem novo som significa nenhum disparo, não desligar a ambientação. Sons descritos no texto que não têm cue permanecem literários.

As caixas pertencem à passagem existente `death.<id>.context`; não criar confirmações, consumo de passagem por caixa, morte adicional ou checkpoint intermediário. O domínio espera despedida e contexto da morte na ordem existente. Somente encerrar a leitura do contexto após sua última caixa; não copiar cegamente o ReadingEnd para cada caixa. Novas chaves de texto, se necessárias, não são novos IDs de passagem da campanha. Preservar morte já registrada e retomada de saves.

Ver [direção sonora](direcao-sonora-pos-armadilha.md), [handoff](handoff-implementacao.md) e [template](template-cena-vn.md).


## A1 — Janela e redemoinho

Passagem existente: `death.a1.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a1_garrafas.ogg` na entrada.

**PT:** As garrafas estouram. O vidro risca a parede onde estava a cabeça de {NOME}. A janela bate e desaparece atrás de uma cortina de cacos.

**EN:** The bottles burst. Glass scores the wall where {NAME}’s head was. The window slams and disappears behind a curtain of shards.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} alcança a janela. A primeira tentativa termina com os dedos prensados. Na segunda, o corpo inteiro empurra a folha contra o vento. Uma fresta se abre.

**EN:** {NAME} reaches the window. The first attempt ends with trapped fingers. On the second, their whole body drives the shutter against the wind. A gap opens.


### Caixa 03

**Áudio:** `sfx_a1_janela.ogg` na entrada.

**PT:** A madeira range sob as mãos de {NOME}. Ivaí passa pela abertura. Do lado de fora, procura onde apoiar os pés; do lado de dentro, os calcanhares já não tocam o chão.

**EN:** Wood groans beneath {NAME}’s hands. Ivaí slips through the opening. Outside, he searches for a foothold; inside, the heels have already left the floor.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} prende os dedos na moldura. Um deles se solta. Depois outro. A janela continua aberta o bastante para Ivaí alcançar o chão.

**EN:** {NAME} hooks their fingers around the frame. One slips free. Then another. The window stays open long enough for Ivaí to reach the ground.


### Caixa 05

**Áudio:** `sfx_a1_fecho.ogg` na entrada.

**PT:** A janela bate. Ivaí olha para cima. Entre o vidro e a poeira, não há mais ninguém segurando a moldura. O vento levou {NOME}.

**EN:** The window slams. Ivaí looks up. Among the glass and dust, no one is holding the frame anymore. The wind has taken {NAME}.


## A2 — Tronco e estacas

Passagem existente: `death.a2.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a2_queda.ogg` na entrada.

**PT:** Os cipós se esticam. Árvores tombam sobre os caminhos, uma atrás da outra. {NOME} recua até sentir uma ponta de madeira nas costas.

**EN:** The vines pull taut. Trees fall across the paths, one after another. {NAME} steps back until a wooden point presses against their back.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** Só resta a passagem entre as estacas. O último tronco desce sobre ela. {NOME} entra debaixo da madeira antes que a abertura desapareça.

**EN:** Only the passage between the stakes remains. The last trunk sinks toward it. {NAME} steps beneath the wood before the opening disappears.


### Caixa 03

**Áudio:** `sfx_a2_pressao.ogg` na entrada.

**PT:** A casca se parte sob as mãos de {NOME}. Os joelhos dobram. Ivaí passa de lado; uma estaca rasga sua roupa e o faz parar. A abertura diminui.

**EN:** Bark splits beneath {NAME}’s hands. Their knees bend. Ivaí turns sideways to pass; a stake catches his clothes and stops him. The opening narrows.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} empurra mais uma vez. Ivaí arranca o tecido preso e cai do outro lado. Sob o tronco, os braços começam a ceder.

**EN:** {NAME} pushes once more. Ivaí tears the trapped cloth free and falls through. Beneath the trunk, the arms begin to give way.


### Caixa 05

**Áudio:** `sfx_a2_impacto.ogg` na entrada.

**PT:** O tronco atinge as estacas. Uma ponta se quebra junto ao rosto de Ivaí. Ele se afasta de joelhos. {NOME} permanece sob a madeira.

**EN:** The trunk strikes the stakes. A point snaps beside Ivaí’s face. He crawls away on his knees. {NAME} remains beneath the wood.


## A3 — Socador e pilão

Passagem existente: `death.a3.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a3_parafuso_trilho.ogg` na entrada.

**PT:** Um parafuso cai entre os pés de {NOME}. Ainda está rolando quando o trilho se desprende do teto.

**EN:** A bolt falls between {NAME}’s feet. It is still rolling when the rail tears loose from the ceiling.


### Caixa 02

**Áudio:** `sfx_a3_chao.ogg` na entrada.

**PT:** O socador atinge o chão. As lascas atravessam a poeira. {NOME} ergue o braço diante do rosto. Atrás, a passagem continua aberta — estreita, mas aberta.

**EN:** The pestle hits the floor. Splinters cut through the dust. {NAME} raises an arm across their face. Behind them, the passage remains open—narrow, but open.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} olha para a passagem. Um pé desliza naquela direção. O socador gira, arrastando a ponta quebrada do trilho atrás de quem tenta alcançar a porta.

**EN:** {NAME} looks toward the passage. One foot slides that way. The pestle turns, dragging the broken rail after whoever tries to reach the door.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} para. A mão encontra a borda do pilão central. Bate na madeira.

**EN:** {NAME} stops. One hand finds the rim of the central mortar. It strikes the wood.


### Caixa 05

**Áudio:** Sem novo efeito.

**PT:** O ferro para de arrastar. O socador se volta para {NOME}.

**EN:** The iron stops dragging. The pestle turns toward {NAME}.


### Caixa 06

**Áudio:** Sem novo efeito.

**PT:** {NOME} sobe pela borda do pilão. O pé escorrega na madeira lisa. As unhas raspam a borda, procuram apoio. Por um instante, só os dedos sustentam o peso.

**EN:** {NAME} climbs over the mortar’s rim. A foot slips on the smooth wood. Nails scrape the edge, searching for purchase. For an instant, only the fingers bear the weight.


### Caixa 07

**Áudio:** Sem novo efeito.

**PT:** {NOME} puxa o corpo para dentro. A respiração sai curta. Os dedos continuam apertados contra a madeira. O socador se ergue.

**EN:** {NAME} pulls their body inside. Breath comes in short bursts. Their fingers stay clenched against the wood. The pestle rises.


### Caixa 08

**Áudio:** Sem novo efeito.

**PT:** A sombra alcança suas mãos. Depois, seu rosto. {NOME} ergue os olhos. Não solta a borda.

**EN:** The shadow reaches their hands. Then their face. {NAME} looks up. Their grip does not loosen.


### Caixa 09

**Áudio:** `sfx_a3_golpe_pilao.ogg` na entrada.

**PT:** O golpe levanta uma linha de pó junto à porta. O socador tenta subir. A madeira estala. Ele tenta outra vez.

**EN:** The blow raises a line of dust beside the door. The pestle tries to rise. Wood cracks. It tries again.


### Caixa 10

**Áudio:** Sem novo efeito.

**PT:** O pilão segura. Ivaí atravessa a passagem antes que o mecanismo consiga se desprender.

**EN:** The mortar holds. Ivaí crosses the passage before the mechanism can pull itself free.


### Caixa 11

**Áudio:** Sem novo efeito.

**PT:** Atrás, nenhuma mão reaparece sobre a borda. {NOME} ficou do outro lado.

**EN:** Behind him, no hand reappears above the rim. {NAME} stayed on the other side.


## A4 — Barras da jaula

Passagem existente: `death.a4.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a4_barras.ogg` na entrada.

**PT:** As barras avançam. {NOME} vira o rosto; o ferro passa onde estava sua boca. A última abertura se estreita diante de Ivaí.

**EN:** The bars close in. {NAME} turns away; iron passes where their mouth was. The last opening narrows before Ivaí.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} entra no centro da jaula. Uma mão encontra a barra da frente; as costas encontram a de trás. O ferro continua empurrando.

**EN:** {NAME} steps into the center of the cage. One hand finds the bar ahead; their back finds the one behind. The iron keeps pushing.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** Ivaí prende o ar para passar. {NOME} tenta firmar os pés. A sola desliza, deixa um risco no chão. A passagem perde mais um dedo de largura.

**EN:** Ivaí holds his breath to squeeze through. {NAME} tries to brace their feet. A sole slips, leaving a mark on the floor. The gap loses another finger’s width.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} recoloca o pé no mesmo risco. O ferro para por um instante. É o bastante para Ivaí puxar o último braço para fora.

**EN:** {NAME} plants their foot on the same mark. The iron stops for an instant. It is enough for Ivaí to pull his last arm free.


### Caixa 05

**Áudio:** `sfx_a4_fecho.ogg` na entrada.

**PT:** As barras se encontram. O som atravessa a passagem vazia. Ivaí continua andando; atrás dele, {NOME} já não pode abrir espaço.

**EN:** The bars meet. The sound travels through the empty passage. Ivaí keeps walking; behind him, {NAME} can no longer make room.


## A5 — Registro e fogo

Passagem existente: `death.a5.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a5_fogo.ogg` na entrada.

**PT:** A mula dispara pelo corredor. O fogo fecha a volta atrás dela. {NOME} protege os olhos; o calor faz a saída oscilar.

**EN:** The mule charges down the corridor. Fire closes the circle behind it. {NAME} shields their eyes; heat makes the exit shimmer.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} força o registro. A água cai sobre as chamas. Basta afrouxar os dedos para o jato diminuir e o fogo voltar a crescer.

**EN:** {NAME} forces the tap open. Water falls over the flames. The slightest loosening of their fingers weakens the stream and lets the fire rise again.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** Ivaí entra na faixa molhada. A manga de {NOME} começa a escurecer junto ao registro. A mão não muda de lugar.

**EN:** Ivaí steps onto the wet strip. {NAME}’s sleeve begins to darken beside the tap. Their hand stays where it is.


### Caixa 04

**Áudio:** `sfx_a5_cano.ogg` na entrada.

**PT:** O cano engasga. {NOME} gira o registro até o fim. Sai um fio de água. Ivaí alcança a porta.

**EN:** The pipe sputters. {NAME} turns the tap as far as it will go. A thread of water emerges. Ivaí reaches the door.


### Caixa 05

**Áudio:** `sfx_a5_chamas.ogg` na entrada.

**PT:** O fogo ocupa o caminho que a água deixava livre. Do outro lado, Ivaí ainda vê a mão de {NOME} no registro. Depois, só as chamas.

**EN:** Fire fills the path the water had kept clear. From the other side, Ivaí can still see {NAME}’s hand on the tap. Then only flames remain.


## A6 — Tronco e raízes

Passagem existente: `death.a6.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a6_raizes.ogg` na entrada.

**PT:** As raízes apertam. Ivaí tenta levantar o pé e perde o equilíbrio. {NOME} acompanha com os olhos o nó que sobe pelas pernas até o tronco.

**EN:** The roots tighten. Ivaí tries to lift a foot and loses his balance. {NAME} follows the knot with their eyes, from the legs up to the trunk.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} encosta a palma na árvore. A casca se abre em torno dos dedos. A mão tenta recuar; a raiz ao redor do tornozelo de Ivaí aperta de novo.

**EN:** {NAME} places a palm against the tree. Bark opens around the fingers. The hand starts to pull back; the root around Ivaí’s ankle tightens again.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} devolve a mão à abertura. Depois a outra. A madeira chega aos pulsos. Aos pés de Ivaí, o nó começa a se desfazer.

**EN:** {NAME} returns the hand to the opening. Then the other. Wood reaches the wrists. At Ivaí’s feet, the knot begins to unravel.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** A casca sobe pelo peito de {NOME}. Ainda há espaço para virar o rosto na direção da saída. Ivaí se solta da última raiz.

**EN:** Bark climbs over {NAME}’s chest. There is still room to turn toward the exit. Ivaí pulls free of the last root.


### Caixa 05

**Áudio:** `sfx_a6_madeira.ogg` na entrada.

**PT:** A madeira se fecha. Uma saliência marca onde estava a boca. Ivaí passa a mão pelo tronco, mas a casca não cede. {NOME} faz parte da árvore.

**EN:** The wood closes. A ridge marks where the mouth was. Ivaí runs a hand over the trunk, but the bark will not yield. {NAME} is part of the tree.


## A7 — Saco e prensa

Passagem existente: `death.a7.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a7_ganchos.ogg` na entrada.

**PT:** Os ganchos puxam os sacos para o centro. A saída some atrás do tecido. {NOME} acompanha a corrente até o saco vazio suspenso junto à prensa.

**EN:** The hooks draw the sacks inward. Fabric hides the exit. {NAME} follows the chain to the empty sack hanging beside the press.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} segura a boca do saco. O pé entra, sai, procura o chão outra vez. Atrás do tecido, Ivaí força uma passagem que não abre.

**EN:** {NAME} grips the sack’s mouth. One foot goes in, comes out, searches for the floor again. Behind the fabric, Ivaí pushes at a passage that will not open.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} coloca os dois pés dentro. O peso baixa a corrente; os sacos que bloqueiam a saída começam a subir. Ivaí se abaixa para passar.

**EN:** {NAME} puts both feet inside. The weight lowers the chain; the sacks blocking the exit begin to rise. Ivaí ducks beneath them.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** O saco deixa o chão. {NOME} segura a borda por dentro. A corrente segue para a prensa. Ivaí passa pelo último gancho.

**EN:** The sack leaves the floor. {NAME} holds the edge from within. The chain moves toward the press. Ivaí passes the last hook.


### Caixa 05

**Áudio:** `sfx_a7_prensa.ogg` na entrada.

**PT:** A prensa fecha. O tecido se estica entre as placas e fica imóvel. A saída continua aberta. {NOME} não atravessa.

**EN:** The press closes. Fabric stretches between the plates and goes still. The exit stays open. {NAME} does not cross it.


## A8 — Viga e telhado

Passagem existente: `death.a8.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_a8_telhas.ogg` na entrada.

**PT:** A viga estala sob dois passos. Uma telha cai diante de {NOME}. Outra atravessa a passagem e se parte onde Ivaí ia pisar.

**EN:** The beam cracks beneath two footsteps. A tile falls in front of {NAME}. Another crosses the passage and shatters where Ivaí was about to step.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} entra sob a viga principal. O peso chega antes que os pés encontrem apoio. Um joelho bate no chão.

**EN:** {NAME} steps beneath the main beam. Its weight arrives before their feet find purchase. One knee strikes the floor.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** Pó escorre pelo rosto de {NOME}. A boca se abre para respirar e se fecha contra a poeira. Ivaí atravessa por baixo da madeira inclinada.

**EN:** Dust streams over {NAME}’s face. Their mouth opens to breathe, then closes against the dust. Ivaí crosses beneath the sloping wood.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} levanta o joelho. A viga sobe só o necessário. Ivaí alcança a borda da passagem; atrás dele, a madeira começa a partir.

**EN:** {NAME} lifts their knee. The beam rises just enough. Ivaí reaches the edge of the passage; behind him, the wood begins to split.


### Caixa 05

**Áudio:** `sfx_a8_desabamento.ogg` na entrada.

**PT:** O teto desaba. A poeira atravessa a saída e cobre as mãos de Ivaí. Quando ele consegue olhar para trás, as telhas já esconderam {NOME}.

**EN:** The roof collapses. Dust surges through the exit and coats Ivaí’s hands. When he can look back, the tiles have already hidden {NAME}.


## B1 — Voz do casarão

Passagem existente: `death.b1.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b1_assobio.ogg` na entrada.

**PT:** O assobio atravessa o cômodo. Ivaí chama por {NOME}, mas o fim do nome não sai. A boca continua aberta depois que o som desaparece.

**EN:** The whistle crosses the room. Ivaí calls to {NAME}, but the end of the name will not come out. His mouth stays open after the sound disappears.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} leva os dedos à garganta. Engole. O primeiro som sai baixo, quase sem ar. As paredes parecem se aproximar para ouvir.

**EN:** {NAME} touches their throat. Swallows. The first sound comes out low, almost breathless. The walls seem to lean closer to listen.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** “{NOME}.” O próprio nome atravessa o cômodo antes que a voz se apague. Ivaí inspira e consegue ouvir a própria respiração.

**EN:** “{NAME}.” Their own name crosses the room before the voice dies. Ivaí breathes in and can hear himself breathing.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** A boca de {NOME} se move outra vez. O som vem da parede. Ivaí olha para a porta agora aberta.

**EN:** {NAME}’s mouth moves again. The sound comes from the wall. Ivaí looks toward the door, now open.


### Caixa 05

**Áudio:** Sem novo efeito.

**PT:** Ivaí cruza a soleira. Atrás dele, a voz de {NOME} percorre os cômodos. Já não encontra uma boca de onde sair.

**EN:** Ivaí crosses the threshold. Behind him, {NAME}’s voice travels through the rooms. It can no longer find a mouth to emerge from.


Restrição: nome pronunciado antes da perda da própria voz; urgência somente narrativa, sem cronômetro e sem limitar elegibilidade. Sem dublagem do nome variável.


## B2 — Procissão

Passagem existente: `death.b2.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b2_velas.ogg` na entrada.

**PT:** As velas se apagam juntas. Os mortos param de andar. Um espaço se abre na fila, bem diante de {NOME}.

**EN:** The candles go out together. The dead stop walking. A space opens in the line, right before {NAME}.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} tenta dar um passo para o lado. A fila acompanha. Ivaí recua e encontra o mesmo cerco de rostos imóveis.

**EN:** {NAME} tries to step aside. The line follows. Ivaí retreats and meets the same ring of motionless faces.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} alcança a vela da frente. A mão treme o bastante para inclinar o pavio. Ainda assim, fecha os dedos ao redor dela.

**EN:** {NAME} reaches for the leading candle. Their hand shakes enough to tilt the wick. Even so, their fingers close around it.


### Caixa 04

**Áudio:** `sfx_b2_passos.ogg` na entrada.

**PT:** Os mortos retomam o passo. {NOME} vai com eles. Ivaí encontra chão livre onde a fila o cercava.

**EN:** The dead resume walking. {NAME} goes with them. Ivaí finds open ground where the line had surrounded him.


### Caixa 05

**Áudio:** Sem novo efeito.

**PT:** Ivaí fica à margem do caminho. A vela de {NOME} desaparece entre as outras. Nenhum passo volta.

**EN:** Ivaí stays beside the path. {NAME}’s candle disappears among the others. No footsteps return.


## B3 — Lembrança

Passagem existente: `death.b3.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** Sem novo efeito.

**PT:** Todos os olhos se voltam para o mesmo ponto. {NOME} reconhece uma lembrança — mas não consegue separar o que viveu daquilo que Ivaí tenta recordar.

**EN:** Every eye turns toward the same point. {NAME} recognizes a memory—but cannot separate what they lived through from what Ivaí is trying to recall.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** Ivaí começa uma frase e esquece como terminá-la. {NOME} estende a mão. Por um instante, também esquece por quê.

**EN:** Ivaí starts a sentence and forgets how to finish it. {NAME} reaches out. For an instant, they too forget why.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** “É minha.” {NOME} fixa os olhos na lembrança. “Só minha.” Ivaí consegue terminar a frase. O passado volta a ter lugares separados.

**EN:** “It’s mine.” {NAME} fixes their eyes on the memory. “Mine alone.” Ivaí can finish his sentence. The past has separate places again.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} tenta olhar para Ivaí. O rosto começa a virar, mas retorna ao mesmo ponto. A lembrança já não deixa espaço para mais nada.

**EN:** {NAME} tries to look at Ivaí. Their face begins to turn, then returns to the same point. The memory leaves room for nothing else.


### Caixa 05

**Áudio:** Sem novo efeito.

**PT:** Ivaí se afasta e ainda lembra o caminho. Dentro da lembrança, {NOME} permanece no mesmo instante. Ele não consegue trazer esse instante consigo.

**EN:** Ivaí steps away and still remembers the way. Within the memory, {NAME} remains in the same instant. He cannot bring that instant with him.


Restrição: não definir qual é a lembrança compartilhada nem inventar passado comum específico. A ausência de SE novo é intencional.


## B4 — Promessa da floresta

Passagem existente: `death.b4.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b4_raizes.ogg` na entrada.

**PT:** As raízes atravessam o caminho. De cada tronco vem a mesma cobrança. {NOME} olha para trás: a abertura por onde entraram também fechou.

**EN:** Roots cross the path. The same demand comes from every trunk. {NAME} looks back: the opening they came through has closed too.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} procura uma brecha entre os troncos. Só há casca. A cobrança recomeça, palavra por palavra.

**EN:** {NAME} searches for a gap between the trunks. There is only bark. The demand begins again, word for word.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** “Eu assumo.” {NOME} precisa repetir, desta vez sem desviar os olhos. A voz chama do fundo da mata. As raízes soltam o caminho de Ivaí.

**EN:** “I’ll take it on.” {NAME} has to repeat it, this time without looking away. The voice calls from deep in the forest. The roots release Ivaí’s path.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} segue o chamado. Uma mão toca o último tronco antes da passagem. Os dedos ficam ali por um instante, depois se soltam.

**EN:** {NAME} follows the call. One hand touches the last trunk before the passage. The fingers linger for an instant, then let go.


### Caixa 05

**Áudio:** `sfx_b4_fecho.ogg` na entrada.

**PT:** Os troncos se aproximam. Ivaí já está do lado de fora quando a última fresta some. {NOME} não retorna por ela.

**EN:** The trunks draw together. Ivaí is already outside when the last gap disappears. {NAME} does not return through it.


## B5 — Espelho vazio

Passagem existente: `death.b5.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b5_vidro.ogg` na entrada.

**PT:** O reflexo de {NOME} se move primeiro. Uma mão atravessa o vidro. Nos outros espelhos, rostos se aproximam da superfície.

**EN:** {NAME}’s reflection moves first. A hand passes through the glass. In the other mirrors, faces approach the surface.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** Só um espelho está vazio. {NOME} encosta nele. O vidro cede até o pulso; a mão volta depressa, sem conseguir tirar o frio da pele.

**EN:** Only one mirror is empty. {NAME} touches it. The glass yields up to the wrist; the hand comes back quickly, unable to shake the cold from the skin.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} olha para Ivaí, depois para o espaço deixado pela figura loira. Dessa vez, passa o braço inteiro. Os reflexos começam a recuar.

**EN:** {NAME} looks at Ivaí, then at the space left by the blonde figure. This time, the whole arm goes through. The reflections begin to retreat.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** {NOME} atravessa. O último pé abandona o chão. Ivaí vê os outros reflexos voltarem a acompanhar cada movimento.

**EN:** {NAME} steps through. The last foot leaves the floor. Ivaí watches the other reflections begin matching every movement again.


### Caixa 05

**Áudio:** `sfx_b5_selo.ogg` na entrada.

**PT:** O vidro endurece. Do outro lado, {NOME} encosta a palma na superfície. Ivaí aproxima a sua. As mãos não se encontram.

**EN:** The glass hardens. On the other side, {NAME} places a palm against the surface. Ivaí raises his own. Their hands do not meet.


## B6 — Poço e canto

Passagem existente: `death.b6.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** Sem novo efeito.

**PT:** Ivaí tenta respirar e se dobra sobre a borda do poço. Não há água no chão. {NOME} abre a boca, mas o ar também não entra.

**EN:** Ivaí tries to breathe and doubles over the well’s edge. There is no water on the ground. {NAME} opens their mouth, but air will not enter either.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** A mecha de cabelo desce até o fundo seco. {NOME} segura os fios. A primeira tentativa de passar a perna pela borda termina numa tosse sem alívio.

**EN:** The lock of hair reaches the dry bottom. {NAME} grips the strands. The first attempt to swing a leg over the rim ends in a cough that brings no relief.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} passa a outra perna e começa a descer. Os dedos precisam se fechar de novo a cada palmo. O canto vem de baixo.

**EN:** {NAME} swings the other leg over and begins to descend. Their fingers must tighten again with every handspan. The song comes from below.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** Do fundo, {NOME} responde ao canto com o pouco ar que resta. Ivaí prende as mãos na borda. A resposta termina. A canção também.

**EN:** From the bottom, {NAME} answers the song with what little air remains. Ivaí grips the rim. The answer ends. So does the song.


### Caixa 05

**Áudio:** Sem novo efeito.

**PT:** Ivaí consegue respirar. Olha para o fundo e espera a mecha se mover. Ela continua estendida. {NOME} não sobe.

**EN:** Ivaí can breathe. He looks down and waits for the lock of hair to move. It stays stretched out. {NAME} does not climb back up.


Restrição: canto e resposta permanecem narrados. Não gerar canção contínua que teria de cessar no meio da caixa 4. A ausência de SE novo é intencional.


## B7 — Mortalha

Passagem existente: `death.b7.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b7_tecido.ogg` na entrada.

**PT:** A última marca completa a data de hoje. O tecido cai sobre o grupo. {NOME} empurra para cima; a mortalha devolve a pressão contra seu rosto.

**EN:** The last mark completes today’s date. Cloth falls over the group. {NAME} pushes upward; the shroud presses back against their face.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** {NOME} encontra a data com a ponta dos dedos. Ao lado dela, há espaço para um nome. A mão para antes da primeira letra.

**EN:** {NAME} finds the date with their fingertips. Beside it, there is room for a name. Their hand stops before the first letter.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} escreve o próprio nome no tecido. Uma letra. Depois outra. A mortalha afrouxa sobre Ivaí e aperta ao redor da mão que escreve.

**EN:** {NAME} writes their own name on the cloth. One letter. Then another. The shroud loosens over Ivaí and tightens around the writing hand.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** Falta o último traço. {NOME} o termina. Ivaí encontra uma abertura junto ao chão e se arrasta até ela.

**EN:** One last stroke remains. {NAME} completes it. Ivaí finds an opening near the ground and crawls toward it.


### Caixa 05

**Áudio:** `sfx_b7_rasgo.ogg` na entrada.

**PT:** O tecido se rasga. Ivaí cai para fora. A abertura se fecha em torno de {NOME}; por um instante, os dedos ainda marcam o pano por dentro.

**EN:** The cloth tears. Ivaí falls free. The opening closes around {NAME}; for an instant, the fingers still press their shape into the cloth from within.


## B8 — Boca da casa

Passagem existente: `death.b8.context`. Entrada e saída conforme contrato acima.


### Caixa 01

**Áudio:** `sfx_b8_portas.ogg` na entrada.

**PT:** As portas se abrem juntas. Onde havia várias passagens, uma boca ocupa a parede. {NOME} recua; a parede atrás também avança.

**EN:** The doors open together. Where there were several passages, a mouth fills the wall. {NAME} steps back; the wall behind advances too.


### Caixa 02

**Áudio:** Sem novo efeito.

**PT:** O chamado vem da abertura. {NOME} procura outra saída. Sob o telhado há uma fresta, mas as paredes não deixam Ivaí alcançá-la.

**EN:** The call comes from the opening. {NAME} searches for another way out. There is a gap beneath the roof, but the walls keep Ivaí from reaching it.


### Caixa 03

**Áudio:** Sem novo efeito.

**PT:** {NOME} responde. O primeiro passo leva só a ponta do pé até a boca. O segundo leva o corpo inteiro. As paredes param.

**EN:** {NAME} answers. The first step brings only the tip of a foot to the mouth. The second brings their whole body. The walls stop.


### Caixa 04

**Áudio:** Sem novo efeito.

**PT:** Ivaí alcança a fresta. Antes de passar, olha para baixo. {NOME} ainda está na abertura, com a mão apoiada onde deveria haver um batente.

**EN:** Ivaí reaches the gap. Before passing through, he looks down. {NAME} is still in the opening, one hand resting where a doorframe should be.


### Caixa 05

**Áudio:** `sfx_b8_boca.ogg` na entrada.

**PT:** A boca se fecha. Quando Ivaí olha de novo, só há parede. Não existe mais uma porta pela qual {NOME} possa voltar.

**EN:** The mouth closes. When Ivaí looks again, there is only wall. There is no longer a door through which {NAME} can return.
