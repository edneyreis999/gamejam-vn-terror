(function () {
  "use strict";

  const root = document.getElementById("artboard");
  const surface = document.body.dataset.surface;
  const state = new URLSearchParams(location.search).get("state") || "default";
  const A = "../../../../rpg-maker/The Dryland Drowned/img/pictures/";
  const assets = {
    "heroes/gorvak.png": "Dryland_H1.png",
    "heroes/elowen.png": "Dryland_H2.png",
    "heroes/griznik.png": "Dryland_H3.png",
    "heroes/seraphina.png": "Dryland_H4.png",
    "heroes/bimbren.png": "Dryland_H5.png",
    "heroes/liora.png": "Dryland_H6.png",
    "heroes/vaelith.png": "Dryland_H7.png",
    "heroes/draska.png": "Dryland_H8.png",
    "characters/ivai.png": "Dryland_ivai.png",
    "characters/florai.png": "Dryland_florai.png",
    "characters/perola.png": "Dryland_perola.png",
    "characters/andira.png": "Dryland_andira.png",
    "destinations/caminho-da-igreja.png": "Dryland_Destination_physical.png",
    "destinations/parque-das-aguas-assombradas.png": "Dryland_Destination_supernatural.png",
    "destinations/vilarejo-partido.png": "Dryland_Destination_final.png",
    "scenes/taverna.png": "Dryland_Taverna.png",
    "scenes/igreja-interior.png": "Dryland_Church.png",
    "scenes/parque-figueira.png": "Dryland_Figtree.png",
    "scenes/casa-do-conselho.png": "Dryland_Council.png",
    "encounters/a1.jpg": "Dryland_Encounter_A1.png",
    "encounters/a2.jpg": "Dryland_Encounter_A2.png",
    "encounters/a3.jpg": "Dryland_Encounter_A3.png",
    "encounters/a4.jpg": "Dryland_Encounter_A4.png",
    "encounters/a5.jpg": "Dryland_Encounter_A5.png",
    "encounters/a6.jpg": "Dryland_Encounter_A6.png",
    "encounters/a7.jpg": "Dryland_Encounter_A7.png",
    "encounters/a8.jpg": "Dryland_Encounter_A8.png",
    "encounters/b1.jpg": "Dryland_Encounter_B1.png",
    "encounters/b2.jpg": "Dryland_Encounter_B2.png",
    "encounters/b3.jpg": "Dryland_Encounter_B3.png",
    "encounters/b4.jpg": "Dryland_Encounter_B4.png",
    "encounters/b5.jpg": "Dryland_Encounter_B5.png",
    "encounters/b6.jpg": "Dryland_Encounter_B6.png",
    "encounters/b7.jpg": "Dryland_Encounter_B7.png",
    "encounters/b8.jpg": "Dryland_Encounter_B8.png"
  };
  const heroes = ["gorvak", "elowen", "griznik", "seraphina", "bimbren", "liora", "vaelith", "draska"];
  const names = ["Gorvak", "Elowen", "Griznik", "Seraphina", "Bimbren", "Liora", "Vaelith", "Draska"];
  const pronouns = ["Ele/dele", "Ela/dela", "Ele/dele", "Ela/dela", "Ele/dele", "Ela/dela", "Ele/dele", "Ela/dela"];
  const peoples = ["Anão", "Elfa", "Goblin", "Troll", "Gnomo", "Gnoma", "Elfo", "Goblin"];
  const occupations = ["Ferreiro", "Caçadora", "Carpinteiro", "Curandeira", "Mensageiro", "Navegadora", "Escriba", "Mineradora"];
  const summaries = [
    "Gorvak é um ferreiro de arquétipo protetor que suporta pesos e horrores para manter os outros de pé, mas se recusa a admitir quando ele próprio precisa de ajuda.",
    "Elowen é uma caçadora de arquétipo batedora que abre caminhos com precisão e rapidez, mas sua confiança no próprio corpo faz com que assuma riscos antes de ouvir o restante do grupo.",
    "Griznik é um carpinteiro de arquétipo construtor que enxerga saídas onde os outros veem apenas ruínas, mas tenta consertar todos os problemas para não encarar aqueles que não pode resolver.",
    "Seraphina é uma curandeira troll de arquétipo sábia que estuda tanto o corpo quanto as forças que o assombram, mas sua certeza de saber o que é melhor pode fazê-la decidir pelos outros.",
    "Bimbren é um mensageiro gnomo de arquétipo portador do dever que conhece caminhos e carrega pesos que derrubariam outros viajantes, mas sua obsessão em concluir uma entrega pode fazê-lo ignorar o custo da missão.",
    "Liora é uma navegadora de arquétipo cartógrafa que transforma sinais mínimos em caminhos seguros, mas sua necessidade de estar certa a impede de admitir quando perdeu o rumo.",
    "Vaelith é um escriba de arquétipo pesquisador que escala ruínas para registrar conhecimentos proibidos antes que desapareçam, mas sua curiosidade o faz avançar quando deveria deixar certas palavras esquecidas.",
    "Draska é uma mineradora goblin de arquétipo sobrevivente que mantém a cabeça no lugar quando tudo desaba, mas sua necessidade de prever cada risco dificulta confiar nas decisões dos outros."
  ];
  const speeches = [
    "Lugar velho avisa antes de cair. Prestem atenção aos estalos.",
    "Se existe uma entrada, existe uma saída. Vamos encontrá-la antes que precise de nós.",
    "Nada fica de pé por acaso. Descobrimos o que sustenta isto e descobrimos o que pode cair.",
    "Observem antes de nomear o perigo. Um diagnóstico apressado também mata.",
    "Destino confirmado. Agora precisamos garantir que todos cheguem até ele.",
    "Marquem a entrada. Um caminho só existe quando sabemos percorrê-lo nos dois sentidos.",
    "Se as paredes quiserem nos ameaçar, ao menos que tenham a cortesia de escrever com clareza.",
    "Antes de avançar: chão, teto, ar e saída. Nessa ordem."
  ];
  const anchors = [
    ["14%", "74%", "left"], ["25%", "84%", "left"], ["37%", "72%", "left"],
    ["47%", "86%", "center"], ["57%", "73%", "center"], ["68%", "85%", "right"],
    ["79%", "72%", "right"], ["90%", "84%", "right"]
  ];
  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[ch]);
  const stateLabels = {
    narration: "Narração", "ivai-speaking": "Ivaí fala", "unseen-passage": "Trecho inédito",
    "seen-passage": "Trecho já lido", "last-before-choice": "Antes da escolha", "long-passage": "Trecho longo",
    threshold: "Limiar do encontro", "party-three-presentation": "Três heróis no encontro",
    "party-two-presentation": "Dois heróis no encontro", "party-one-presentation": "Um herói no encontro",
    "three-approaches": "Três abordagens", success: "Sucesso", "lethal-failure": "Falha letal",
    "revisited-presentation": "Encontro revisitado", "last-route-position": "Último encontro da rota",
    "three-victims-warning": "Três vítimas possíveis", "two-victims-warning": "Duas vítimas possíveis",
    "one-victim-warning": "Uma vítima possível", "focused-victim": "Vítima em foco", farewell: "Despedida",
    "death-context": "Consequência da morte", "total-roster-loss": "Todos os heróis morreram",
    "party-empty-with-reserves": "Expedição vazia", "eligible-request": "Recuo disponível",
    confirmation: "Confirmação", "cancelled-to-passage": "Retorno ao trecho", "ineligible-request": "Recuo indisponível",
    "committed-consequence": "Consequência confirmada", "automatic-one-reserve": "Uma reserva na cidade",
    "automatic-two-reserves": "Duas reservas na cidade", "automatic-many-reserves": "Reservas na cidade",
    "last-position-conclusion": "Conclusão da rota", "perola-first": "Primeiro encontro com Pérola",
    "perola-second": "Reencontro com Pérola", "florai-first": "Primeiro encontro com Floraí",
    "florai-second": "Reencontro com Floraí", "one-map-piece": "Uma peça do mapa",
    "two-pieces-overlay": "Duas peças do mapa", "empty-party-route-conclusion": "Rota concluída sem heróis",
    "total-loss-priority": "Todos os heróis morreram", "party-three-revelation": "Revelação diante de três heróis",
    "party-two-revelation": "Revelação diante de dois heróis", "party-one-revelation": "Revelação diante de um herói",
    "ivai-alone": "Ivaí chega sozinho", opinion: "Opinião do herói", "final-choice": "Escolha final",
    "reunite-committed": "Medalhão reunido", "destroy-committed": "Medalhão destruído",
    reunite: "As duas margens", destroy: "O medalhão destruído", bad: "Afogados em terra seca",
    "memorial-one": "Uma morte lembrada", "memorial-multiple": "Mortes lembradas", "memorial-eight": "Oito mortes lembradas",
    "no-deaths-epilogue": "Todos sobreviveram", "no-eligible-epilogue": "Ivaí chegou sozinho",
    "epilogue-one": "Um sobrevivente do clímax", "epilogue-two": "Dois sobreviventes do clímax",
    "epilogue-three": "Três sobreviventes do clímax", "campaign-complete": "Campanha concluída"
  };
  const title = stateLabels[state] || "Variação de referência";
  const top = (label, progress = "Referência de composição") => `<header class="topbar"><strong>Afogados em Terra Seca</strong><span>${esc(label)}</span><span>${esc(progress)}</span></header>`;
  const screen = (label, body, cls = "") => `<section class="screen" data-state="${esc(state)}">${top(label)}<div class="stage ${cls}">${body}</div></section>`;
  const img = (path, alt, cls = "") => `<img class="${cls}" src="${A}${assets[path]}" alt="${esc(alt)}">`;
  const fallback = (text) => `<div class="image-fallback" role="img" aria-label="${esc(text)}">${esc(text)}<br><span class="small">O texto e as ações continuam disponíveis.</span></div>`;
  const paper = (body, cls = "", style = "") => `<article class="paper ${cls}"${style ? ` style="${style}"` : ""}>${body}</article>`;
  const button = (text, cls = "") => `<button class="btn ${cls}" type="button">${esc(text)}</button>`;
  const longText = "A água ondula num recipiente seco enquanto o eco devolve palavras que Ivaí não disse. Ninguém vê uma saída segura, mas cada sinal observado ainda pode mudar a forma de atravessar o perigo.";

  function entry() {
    const missing = state === "missing-entry-art";
    const notices = state === "long-notices"
      ? "Esta história contém morte permanente, sacrifício, afogamento, perseguição, manipulação, preconceito entre povos fantásticos e horror psicológico. Não contém gore explícito. Leia no seu ritmo; nenhuma escolha possui limite de tempo."
      : "Conteúdo: morte permanente, sacrifício, afogamento, perseguição, manipulação e horror psicológico.";
    return screen("Entrada", `<div class="entry-stage">${paper(`<div class="entry-seal">16</div><p class="kicker brass-text">Visual novel de horror</p><h1 class="entry-title">Afogados em Terra Seca</h1>${missing ? fallback("Ilustração de entrada indisponível") : ""}<p class="notices">${notices}</p>${state === "fresh-after-restart" ? '<p class="small muted">Nova campanha: oito heróis vivos, sem progresso anterior.</p>' : ""}<div class="actions">${button("Jogar", "primary focused")}</div>`, "entry-panel")}</div>`, "");
  }

  function reading() {
    const missing = state === "missing-portrait";
    const seen = state === "seen-passage";
    const choice = state === "last-before-choice";
    const text = state === "long-passage" ? `${longText} ${longText}` : state === "narration"
      ? "O caminho para as duas margens começava numa taverna sem música. Do lado de fora, o rio parecia respirar sob a terra."
      : "Procuro um tesouro que pertence à minha família. Preciso de pessoas capazes de atravessar lugares que os mapas decidiram esquecer.";
    return screen("Leitura", `<div class="reading-layout"><div class="portrait-zone">${missing ? fallback("Retrato de Ivaí indisponível") : img("characters/ivai.png", "Ivaí", "portrait")}</div>${paper(`<p class="speaker">${state === "narration" ? "Narração" : "Ivaí"}</p><h2>${choice ? "Antes da escolha" : title}</h2><p>${text}</p>${choice ? '<p class="small brass-text">As três abordagens serão apresentadas após este trecho.</p>' : ""}`, "story-panel")}<div class="reading-controls">${seen ? button("Pular texto já lido", "ghost") : ""}${button("Avançar", "primary focused")}</div></div>`, "tavern-stage");
  }

  function tavern() {
    const inspect = /^inspect-h([1-8])-(available|selected)$/.exec(state);
    const inspected = inspect ? Number(inspect[1]) - 1 : ["selected-and-focused", "long-sheet-speech"].includes(state) ? 0 : -1;
    const selectedCount = state === "manual-one" ? 1 : state === "manual-two" ? 2 : state === "manual-three" || state === "automatic-three" ? 3 : state === "automatic-two" ? 2 : state === "automatic-one" ? 1 : state === "selected-and-focused" ? 1 : inspect && inspect[2] === "selected" ? 1 : 0;
    const firstReturnMany = /first-return-many|preparing-during-fade|destination-open-during-fade/.test(state);
    const firstReturnOne = /first-return-one/.test(state);
    const emptyMany = /later-return-empty|empty-after-fade|reduced-motion-empty/.test(state);
    const auto = state.startsWith("automatic-");
    const nodes = heroes.map((slug, i) => {
      const [left, topPos, side] = anchors[i];
      const affected = ((emptyMany || firstReturnMany) && i < 3) || (firstReturnOne && i === 2);
      const selected = auto ? i < selectedCount : inspect && inspect[2] === "selected" ? i === inspected : i < selectedCount;
      const fading = affected && (/midpoint/.test(state) || /during-fade/.test(state));
      if ((auto && i >= selectedCount) || (emptyMany && i < 3)) return `<div class="hero-anchor empty" style="left:${left};top:${topPos}" data-anchor="h${i + 1}" data-zone="${side}" aria-label="Lugar vazio de ${names[i]}"></div>`;
      return `<div class="hero-anchor ${selected ? "selected" : ""} ${i === inspected ? "focused" : ""} ${fading ? "fading" : ""}" style="left:${left};top:${topPos}" data-anchor="h${i + 1}" data-zone="${side}">${state === "missing-portrait" && i === 2 ? fallback(`Retrato de ${names[i]} indisponível`) : img(`heroes/${slug}.png`, names[i])}</div>`;
    }).join("");
    const inspectedSelected = inspect && inspect[2] === "selected";
    const longInspection = state === "long-sheet-speech";
    const speechPosition = longInspection ? "left:52%;top:84%" : `left:${anchors[inspected]?.[0]};top:calc(${anchors[inspected]?.[1]} - 18vh)`;
    const inspection = inspected < 0 ? "" : `${paper(`<h3>${names[inspected]}</h3><dl><dt>Pronomes</dt><dd>${pronouns[inspected]}</dd><dt>Raça</dt><dd>${peoples[inspected]}</dd><dt>Ocupação</dt><dd>${occupations[inspected]}</dd><dt>Estado</dt><dd>${inspectedSelected || (!inspect && inspected < selectedCount) ? "Selecionado" : "Disponível"}</dd></dl><p class="small">${longInspection ? `${summaries[inspected]} ${longText}` : summaries[inspected]}</p>`, `hero-sheet zone-${anchors[inspected][2]}`, `left:${anchors[inspected][0]};top:calc(${anchors[inspected][1]} - 30vh)`) }<aside class="speech ${longInspection ? "long" : anchors[inspected][2] === "right" ? "left" : "right"}" style="${speechPosition}">“${longInspection ? `${speeches[inspected]} ${longText}` : speeches[inspected]}”</aside>`;
    return screen("Preparação na taverna", `<div class="tavern-controls">${button("Consultar elenco", "ghost")}${button("Escolher destino", /destination-open/.test(state) ? "focused" : "")}${button("Partir", "primary")}</div>${nodes}${inspection}<div class="party-readout"><strong>${auto ? "Formação automática" : "Expedição"}</strong><br><span class="small">${selectedCount ? `${selectedCount} de ${auto ? selectedCount : 3} presentes` : "Nenhum herói escolhido"}</span>${/preparing-during-fade/.test(state) ? '<br><span class="small">Preparação disponível durante a despedida visual.</span>' : ""}</div></div>`, "tavern-stage");
  }

  function destinations() {
    if (state === "dismissed-preserved") {
      const tavernHeroes = heroes.map((slug, i) => `<div class="hero-anchor ${i < 3 ? "selected" : ""}" style="left:${anchors[i][0]};top:${anchors[i][1]}" data-anchor="h${i + 1}" data-zone="${anchors[i][2]}">${img(`heroes/${slug}.png`, names[i])}</div>`).join("");
      return screen("Preparação na taverna", `<div class="tavern-controls">${button("Consultar elenco", "ghost")}${button("Escolher destino", "focused")}${button("Partir", "primary")}</div>${tavernHeroes}<div class="party-readout"><strong>Caminho da Igreja preservado</strong><br><span class="small">A janela foi fechada sem perder o destino nem os três heróis escolhidos.</span></div>`, "tavern-stage");
    }
    const missing = state === "missing-preview";
    const routes = [
      ["caminho-da-igreja", "Caminho da Igreja", "available", "Uma igreja construída sobre pedra que não deveria respirar."],
      ["parque-das-aguas-assombradas", "Parque das Águas Assombradas", state === "one-available" ? "completed" : "available", "A figueira central conserva vozes na água entre as raízes."],
      ["vilarejo-partido", "Vilarejo Partido", state === "unlocked-final" || state === "selected-route" ? "available" : "locked", "As duas peças do mapa revelam a passagem entre as margens."]
    ];
    return screen("Destinos", `<div class="modal-shade">${paper(`<div class="modal-header"><div><p class="kicker brass-text">Preparação</p><h2>Escolher destino</h2></div>${button("Fechar", "ghost focused")}</div><div class="destination-grid">${routes.map((r, i) => `<section class="destination-card ${r[2]} ${(state === "selected-route" && i === 2) || (state === "dismissed-preserved" && i === 0) ? "selected" : ""}">${missing && i === 0 ? fallback("Prévia do destino indisponível") : img(`destinations/${r[0]}.png`, r[1])}<span class="status">${r[2] === "locked" ? "Bloqueado" : r[2] === "completed" || state === "completed-church" && i === 0 ? "Concluído" : "Disponível"}</span><h3>${r[1]}</h3><p class="small">${r[3]}</p><p class="small muted">Progresso conhecido: ${i === 0 && state === "completed-church" ? "5/5" : "0/" + (i === 2 ? 6 : 5)}</p></section>`).join("")}</div>`, "modal")}</div>`, "tavern-stage");
  }

  function encounter() {
    const count = state.includes("party-one") ? 1 : state.includes("party-two") ? 2 : 3;
    const catalog = {
  "A1": {
    "title": "O Redemoinho do Saci Engarrafado",
    "description": "Uma oficina abandonada está cercada por garrafas escuras, todas fechadas com pequenas presilhas de latão. Quando a primeira se quebra, um redemoinho atravessa o cômodo, arranca lascas das paredes e incorpora os cacos ao próprio giro.",
    "approaches": [
      "Travar a comporta de ventilação e obrigar o vento a mudar de direção",
      "Fechar as presilhas das garrafas antes que libertem novos turbilhões",
      "Seguir a fuligem e os cacos para localizar o olho imóvel do redemoinho"
    ]
  },
  "A2": {
    "title": "A Trilha de Pés Virados",
    "description": "Uma trilha de terra atravessa uma mata que cresceu para dentro da construção. Pegadas com os calcanhares voltados para a frente indicam caminhos diferentes, enquanto cipós tensionados e estacas escondidas convertem cada direção errada em uma armadilha física.",
    "approaches": [
      "Soltar os nós invertidos sem liberar a tensão das estacas",
      "Abandonar as pegadas e orientar-se pelo vento, pela inclinação e pela vegetação",
      "Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente"
    ]
  }
};
    const encounterId = state === "long-approach" ? "A2" : "A1";
    const content = catalog[encounterId];
    const threshold = state === "threshold";
    const consequence = state === "success" || state === "lethal-failure";
    const choicesVisible = ["three-approaches", "last-route-position", "missing-encounter-image", "long-approach"].includes(state);
    const missing = state === "missing-encounter-image";
    const result = threshold ? "A igreja se inclina sobre raízes antigas. O caminho segue sob o altar, onde a pedra parece respirar."
      : state === "success" ? "A comporta presa desvia o vendaval para o teto. Sem o giro que os sustentava, os cacos caem longe da porta e deixam o grupo atravessar."
      : state === "lethal-failure" ? "A pressão arranca a comporta de seu encaixe. Novas garrafas se quebram, e os turbilhões se unem numa muralha de cacos diante da saída."
      : content.description;
    const imagePath = threshold ? "destinations/caminho-da-igreja.png" : `encounters/${encounterId.toLowerCase()}.jpg`;
    const controls = threshold ? button("Entrar no encontro", "primary focused") + button("Recuar", "ghost")
      : choicesVisible ? content.approaches.map((text) => `<button class="choice">${esc(text)}</button>`).join("")
      : (state === "revisited-presentation" ? button("Pular texto já lido", "ghost") : "") + button("Avançar", "primary focused") + (consequence ? "" : button("Recuar", "ghost"));
    return screen("Expedição", `<div class="encounter-layout"><div class="party-column">${heroes.slice(0, count).map((h, i) => img(`heroes/${h}.png`, names[i])).join("")}</div><div class="encounter-art"${missing ? "" : ` style="background-image:url('${A}${assets[imagePath]}')"`}>${missing ? fallback("Imagem do encontro indisponível") : ""}</div><div class="choice-column">${controls}</div>${paper(`<div class="meta"><span>Caminho da Igreja</span><span>${state === "last-route-position" ? "Encontro 5 de 5" : "Encontro 1 de 5"}</span></div><h3>${threshold ? "À entrada do caminho" : esc(content.title)}</h3><p>${esc(result)}</p>`, "passage")}</div>`);
  }

  function sacrifice() {
    const count = state.startsWith("one-") ? 1 : state.startsWith("two-") ? 2 : 3;
    const after = ["farewell", "death-context", "total-roster-loss", "party-empty-with-reserves"].includes(state);
    const text = state === "total-roster-loss" ? "Nenhum dos oito heróis permanece vivo. A água surge no chão seco e alcança Ivaí antes da escolha final." : state === "party-empty-with-reserves" ? "A expedição ficou vazia. Ivaí recua; os sobreviventes na cidade não entram nesta tentativa." : state === "farewell" ? "“Levem as páginas. Façam minha última linha valer.”" : "A passagem fecha sobre Vaelith enquanto os demais alcançam o outro lado.";
    return screen("Sacrifício", `<div class="center-dialog">${paper(`<p class="kicker brass-text">Consequência irreversível</p><h2>${after ? title : "Escolha quem ficará"}</h2>${after ? `<p>${text}</p>${button("Avançar", "primary focused")}` : `<div class="warning"><strong>O primeiro acionamento confirma uma morte permanente.</strong><br>Não existe segunda confirmação, cancelamento ou desfazer.</div><div class="victim-grid">${heroes.slice(0, count).map((h, i) => `<button class="victim ${state === "focused-victim" && i === 0 ? "focused" : ""}">${img(`heroes/${h}.png`, names[i])}<strong>${names[i]}</strong></button>`).join("")}</div>`}`, "dialog-card")}</div>`);
  }

  function retreat() {
    if (state === "cancelled-to-passage") {
      return screen("Expedição", `<div class="encounter-layout"><div class="party-column">${heroes.slice(0, 3).map((h, i) => img(`heroes/${h}.png`, names[i])).join("")}</div><div class="encounter-art" style="background-image:url('${A}${assets["encounters/a1.jpg"]}')"></div><div class="choice-column"><div class="reading-prompt">O recuo foi cancelado. O trecho continua na mesma posição.</div></div>${paper(`<div class="meta"><span>Caminho da Igreja</span><span>Encontro 1 de 5</span></div><h3>Travessia interrompida</h3><p>${longText}</p><div class="actions">${button("Avançar", "primary focused")}${button("Recuar", "ghost")}</div>`, "passage")}</div>`);
    }
    const automatic = state.startsWith("automatic-");
    const blocked = state === "ineligible-request" || state === "committed-consequence";
    const last = state === "last-position-conclusion";
    const heading = last ? "Rota concluída" : automatic ? "Retorno obrigatório" : state === "confirmation" ? "Confirmar recuo" : "Recuar para a taverna";
    const body = last ? "O último encontro foi resolvido. A recompensa da rota vem antes de qualquer retorno à cidade." : automatic ? "A expedição não possui heróis vivos. Ivaí volta sozinho; as reservas permanecem na cidade." : blocked ? "O recuo não está disponível neste momento." : "Recuar preserva encontros revelados e progresso conhecido, mas uma nova tentativa começa na primeira posição.";
    return screen("Recuo", `<div class="center-dialog">${paper(`<p class="kicker brass-text">${title}</p><h2>${heading}</h2><p>${body}</p><div class="actions">${state === "confirmation" ? button("Cancelar", "ghost") : ""}${button(last ? "Encontrar o amante" : automatic ? "Voltar à taverna" : "Recuar", blocked ? "ghost" : "danger focused")}</div>`, "dialog-card")}</div>`);
  }

  function lovers() {
    if (state === "total-loss-priority") {
      return screen("Desfecho", `<div class="ending-stage">${paper(`<p class="kicker brass-text">Todos os heróis morreram</p><h1 class="entry-title">Afogados em terra seca</h1><p>Sem os oito heróis, a água alcança Ivaí no chão seco. A recompensa e o encontro com os amantes não são apresentados.</p>${button("Avançar", "primary focused")}`, "ending-card")}</div>`);
    }
    const perola = state.startsWith("perola") || state === "missing-lover-portrait";
    const missingBg = state === "missing-background";
    const missingPortrait = state === "missing-lover-portrait";
    const two = state === "two-pieces-overlay";
    const bg = perola ? "igreja-interior.png" : "parque-figueira.png";
    const prison = perola ? "Pedra da prisão sob o altar" : "Raízes da figueira-prisão";
    return screen("Amantes e mapa", `<div class="lover-layout" style="background:${missingBg ? "#15110d" : `linear-gradient(rgba(8,6,4,.18),rgba(8,6,4,.55)),url('${A}${assets[`scenes/${bg}`]}') center/cover`}">${missingBg ? fallback("Cenário narrativo indisponível") : ""}${missingPortrait ? fallback("Retrato do amante indisponível") : `${img(`characters/${perola ? "perola" : "florai"}.png`, perola ? "Pérola incorporada à pedra" : "Floraí incorporado às raízes", `lover-portrait ${perola ? "stone-bound" : "root-bound"}`)}<div class="prison-boundary ${perola ? "stone" : "roots"}">${prison}</div>`}${paper(`<p class="kicker brass-text">${perola ? "Sob o altar" : "Entre as raízes"}</p><h2>${perola ? "Pérola" : "Floraí"}</h2><p>${state.endsWith("second") ? "Ivaí conhece mais desta história do que admite. Não confundam as peças do mapa com as metades do medalhão." : "Uma metade não revela a entrada. Procurem a outra margem, mas desconfiem de quem já decidiu o fim."}</p><div><span class="map-piece">Peça ${perola ? "anã" : "élfica"}</span>${two ? '<span class="map-piece second">Segunda peça</span>' : ""}</div>`, "lover-text")}</div>`, "");
  }

  function council() {
    const count = state === "ivai-alone" ? 0 : state.includes("party-one") ? 1 : state.includes("party-two") ? 2 : 3;
    const missing = state === "missing-art";
    const choice = state === "final-choice";
    const committed = state === "reunite-committed" ? "Ivaí une as duas metades. O juramento volta a existir e a escolha já não pode ser alterada." : state === "destroy-committed" ? "Ivaí parte as duas metades. Andirá se move no reflexo e a escolha já não pode ser alterada." : "";
    return screen("Conselho", `<div class="council-layout" style="background:${missing ? "#15110d" : `linear-gradient(rgba(8,6,4,.18),rgba(8,6,4,.58)),url('${A}${assets["scenes/casa-do-conselho.png"]}') center/cover`}">${missing ? fallback("Arte do Conselho indisponível") : `<div class="reflection-pool">${img("characters/andira.png", "Andirá somente no reflexo")}</div>`}<div class="council-party">${heroes.slice(0, count).map((h, i) => img(`heroes/${h}.png`, names[i])).join("")}</div>${paper(`<p class="kicker brass-text">Casa do Conselho</p><h2>${title}</h2><p>${committed || (state === "opinion" ? "reunir o medalhão e libertar Floraí e Pérola. Ivaí deve aceitar pessoalmente o custo da história que impôs aos outros." : "O registro de Palotina confirma os dois custos. Ivaí confessa que planejava destruir o medalhão antes de reunir o grupo.")}</p>${choice ? `<div class="actions">${button("Reunir o medalhão")}${button("Destruir o medalhão", "danger")}</div>` : committed ? button("Avançar", "primary focused") : ""}`, "council-text")}</div>`);
  }

  function endings() {
    const complete = state === "campaign-complete";
    const memorial = state.startsWith("memorial-");
    const bad = state === "bad";
    const epilogue = state.startsWith("epilogue-");
    const epilogues = [
      "reconstrói a forja, mas grava nela os nomes dos companheiros mortos. Passa a ensinar aos aprendizes que força não é suportar tudo sozinho.",
      "usa sua parte da recompensa para proteger o território de caça e passa a treinar novos batedores. Pela primeira vez, ensina que velocidade também significa saber quando esperar pelo grupo.",
      "abre uma oficina dedicada a construções seguras e passa a recusar trabalhos que economizem à custa de vidas. Guarda as lascas recolhidas na expedição em uma parede, junto aos nomes de quem não voltou."
    ];
    const epilogueCount = state === "epilogue-one" ? 1 : state === "epilogue-two" ? 2 : state === "epilogue-three" ? 3 : state === "no-deaths-epilogue" ? 3 : 0;
    const heading = complete ? "Campanha concluída" : bad ? "Afogados em terra seca" : memorial ? "Memorial" : epilogue || state === "no-deaths-epilogue" ? "Depois da expedição" : state === "destroy" ? "O medalhão destruído" : state === "reunite" ? "As duas margens" : title;
    const body = complete ? "A história desta campanha terminou. Uma nova campanha apaga mortes, progresso e trechos vistos." : bad ? "Sem os oito heróis, a água alcança Ivaí no chão seco antes que o medalhão possa ser escolhido." : state === "destroy" ? "Ivaí sobrevive e a maldição da linhagem termina. Andirá toma Floraí, Pérola e as memórias que preservavam." : state === "reunite" ? "O juramento é restaurado. Floraí e Pérola são libertados; a maldição cobra a vida de Ivaí." : memorial ? "Os mortos são lembrados por seus nomes, seus ofícios e pelo que deixaram nos sobreviventes." : "";
    const memorialNames = state === "memorial-one" ? names.slice(0, 1) : state === "memorial-eight" ? names : names.slice(0, 3);
    const epilogueMarkup = epilogueCount ? `<div class="epilogue-list">${epilogues.slice(0, epilogueCount).map((text, i) => `<section><h3>${names[i]}</h3><p>${text}</p></section>`).join("")}</div>` : "";
    return screen("Desfechos", `<div class="ending-stage">${paper(`<p class="kicker brass-text">${title}</p><h1 class="entry-title">${heading}</h1>${body ? `<p>${body}</p>` : ""}${memorial ? `<div class="memorial-list">${memorialNames.map((name) => `<span>${name}</span>`).join("")}</div>` : ""}${epilogueMarkup}${complete ? button("Jogar novamente", "primary focused") : button("Avançar", "primary focused")}`, "ending-card")}</div>`, state === "reunite" ? "tavern-stage" : "");
  }

  function roster() {
    const dead = state === "mixed-living-dead" ? [1, 4, 6] : state === "reduced-roster" ? [0, 1, 3, 4, 6] : [];
    return screen("Consulta do elenco", `<div class="modal-shade">${paper(`<div class="modal-header"><div><p class="kicker brass-text">Elenco completo</p><h2>Heróis</h2></div>${button("Fechar", "ghost focused")}</div><div class="roster-grid">${heroes.map((h, i) => `<section class="roster-card ${dead.includes(i) ? "dead" : ""}">${img(`heroes/${h}.png`, names[i])}<div><span class="state">${dead.includes(i) ? "Morto" : "Vivo"}</span><h3>${names[i]}</h3><p class="small">${state === "long-summary" && i === 0 ? longText : ["Ferreiro anão","Caçadora elfa","Carpinteiro goblin","Curandeira troll","Mensageiro gnomo","Navegadora gnoma","Escriba elfo","Mineradora goblin"][i]}</p></div></section>`).join("")}</div>`, "modal")}</div>`, "tavern-stage");
  }

  function fallbacks() {
    const fatal = state === "invalid-campaign";
    const messages = {
      "rejected-stale-action": "Esta ação pertence a uma tela anterior.",
      "fourth-selection-error": "Escolha exatamente três heróis sobreviventes.",
      "unavailable-destination-error": "Este caminho não está disponível para expedição.",
      "invalid-campaign": "O protótipo encontrou um estado inválido."
    };
    return screen("Recuperação", `<div class="center-dialog">${paper(`<div class="fallback-panel">${fallback(state.startsWith("missing-") ? title : "Recurso visual opcional") }<div><p class="kicker brass-text">Estado legível</p><h2>${messages[state] || title}</h2><div class="error-box"><p>${messages[state] || (state === "long-error" ? longText + " " + longText : "A imagem não carregou. O conteúdo necessário permanece disponível em texto.")}</p></div>${button(fatal ? "Recarregar a página" : "Voltar", "primary focused")}</div></div>`, "dialog-card")}</div>`);
  }

  const renderers = {S01: entry, S02: reading, S03: tavern, S04: destinations, S05: encounter, S06: sacrifice, S07: retreat, S08: lovers, S09: council, S10: endings, S11: roster, S12: fallbacks};
  root.innerHTML = (renderers[surface] || (() => screen("Referência", `<div class="center-dialog">${paper(`<h2>Superfície desconhecida</h2><p>${esc(surface)}</p>`, "dialog-card")}</div>`)))();
  document.title = `${document.title} — ${state}`;
  document.documentElement.dataset.referenceReady = "true";
})();
