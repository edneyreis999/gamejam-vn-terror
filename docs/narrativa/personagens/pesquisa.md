# Pesquisa de personagens — fontes, arte e repertório de voz

Pacote S1 / V-01 de `character-voice-recreation`, consultado em **14/11/2026**. Pesquisa independente da autoria das fichas; não constitui revisão das fichas nem aceite editorial. Base consultada: `d8806e7aa8d7b9b01ac30a7482ea278bce508462`. Os caminhos abaixo partem da raiz do repositório, salvo links Markdown relativos a este documento. Os hashes ao final permitem reconhecer as fontes mesmo depois da retirada das fichas antigas.

## Como usar este registro

- **Evidência:** texto, ação, imagem ou regra efetivamente consultados, com localização. Uma fala de outro personagem, um pensamento e a prosa do narrador não viram fala de Rheed.
- **Inferência:** leitura proposta a partir da evidência; não estabelece biografia, intenção oculta ou frequência estatística.
- **Criação:** escolha ainda a cargo do autor da ficha. As referências externas oferecem possibilidades de escrita, sem transferir personagens, frases famosas, mundo ou acontecimentos para o jogo.

O [GDD canônico](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md) governa trama e regras. A direção aceita em 14/11/2026 descarta a caracterização antiga dos heróis e preserva apenas seus nomes e competências, a identidade visual existente e a plausibilidade das competências. Os estados **Confirmado**, **Baseline de protótipo**, **Pendente** e **Fora do escopo** continuam distintos. O jogo e seus diálogos implementados não foram alterados por esta pesquisa.

**Esclarecimento do dono em 14/11/2026:** Rheed velho também conta a história do jogo na praça de Daratrine; as memórias do jogo são dele; lacunas específicas de Rheed admitem invenção apoiada em pesquisa. Isso substitui somente a indeterminação da cidade no GDD-base §§4.1/27.2. A atribuição da decisão está no [GDDR-008](../../gddrs/gddr-008-recriacao-das-vozes-e-continuidade-de-rheed.md), incorporada ao GDD §§4.1/19.2/27.2; não autoriza arte, mecânica de memória ou diálogo novo no jogo.

## Inventário e restrições de criação

Há **17 fichas para 16 personagens**. No inventário da base consultada, o diretório antigo `planos/005-refactor-narracao/ficha-personagens/` continha os 17 nomes de arquivo abaixo, `README.md` e `comparacao-vozes.md`: 19 documentos, não 19 personagens. Esses documentos e as oito fichas paralelas `docs/narrativa/herois/Ficha_H*.md` foram retirados na consolidação de autoridade. O [índice corrente](README.md) registra a migração e os estados editoriais; os hashes abaixo continuam identificando as fontes históricas. Suas falas, idade, profissão, personalidade, passado e interpretação das relações não são insumos obrigatórios.

| ID | Nome exato | Arquivo de ficha | Competências preservadas / função de trama |
| --- | --- | --- | --- |
| H1 | Gorvak | `gorvak.md` | Força + Vontade |
| H2 | Elowen | `elowen.md` | Destreza + Atletismo |
| H3 | Griznik | `griznik.md` | Percepção + Sobrevivência |
| H4 | Seraphina | `seraphina.md` | Conhecimento + Ocultismo |
| H5 | Bimbren | `bimbren.md` | Força + Conhecimento |
| H6 | Liora | `liora.md` | Destreza + Percepção |
| H7 | Vaelith | `vaelith.md` | Ocultismo + Atletismo |
| H8 | Draska | `draska.md` | Vontade + Sobrevivência |
| P1 | Ivaí | `ivai.md` | Anão, 30 anos; bardo, filho de Irati; reúne o grupo e omite a maldição para salvar-se. Zero competências; não ocupa vaga nem é vítima selecionável. |
| P2 | Andirá | `andira.md` | Entidade aquática não mortal, pronomes masculinos; possessividade, manipulação e limites sobrenaturais de §4.5. |
| P3 | Floraí | `florai.md` | Elfo da Casa Araucária; amante de Pérola, preso na figueira, entrega a peça élfica do mapa. |
| P4 | Pérola | `perola.md` | Anã da Casa Basalto; aceita livremente o medalhão, presa na pedra, entrega a peça anã do mapa. |
| P5 | Irati | `irati.md` | Anã, mãe de Ivaí, guardiã de genealogias; morreu aos 58 anos, dois anos antes, afogada em cômodo seco; rejeitou a coerção. |
| P6 | Palotina | `palotina.md` | Gnoma, artesã ritual e mediadora; criou o medalhão, recusou desfazer o juramento, registrou as regras; morreu na enchente buscando os cadernos confiscados. |
| P7 | Tibagi | `tibagi.md` | Anão, irmão de Pérola; manipulado pela promessa de reinar, tentou arrancar o medalhão, provocando sua divisão, e escondeu uma metade no Conselho. |
| R1 | Rheed jovem | `rheed-jovem.md` | Mesmo indivíduo de R2 em fase anterior da vida; ajudante de Ivaí, distribui anúncios, conhece a maldição e testemunha a expedição; sem vaga, competência ou sacrifício. |
| R2 | Rheed velho | `rheed-velho.md` | Theodor Rheed do livro do dono; anão, contador da Noite da História; narra no presente acontecimentos de sua juventude no jogo. |

Fontes: oito arquivos `Ficha_H*.md` somente para a matriz; GDD §§4–6, 8.3 e 27 para as funções; livro 01:13–19 para nome/identidade de R2. A raça dos heróis deve ser compatível com o desenho e com um mundo sem humanos; proporção corporal ou ferramenta não basta para impor uma taxonomia, idade ou profissão descartada.

### Pares, competências e consequências

Os oito vínculos mecânicos são **H1–H5, H1–H8, H2–H6, H2–H7, H3–H8, H3–H6, H4–H5 e H4–H7**. O significado afetivo pode mudar. Não mudar elegibilidade, presença, ordem, participação opcional ou consumo das reações de perda por direção sobrevivente → morto (GDD §28). No Conselho, H1/H4/H5/H7 aconselham reunir; H2/H3/H6/H8, destruir. Só os vivos presentes falam, em ordem H1–H8; não votam nem retiram a decisão do jogador.

O vínculo competência–ação é material de criação, sem exigir a profissão antiga. Exemplos de fronteiras já fixadas no GDD §§8.2/12.2:

| Competência | Ação existente que a nova história de vida precisa tornar plausível |
| --- | --- |
| Força | A1: conter a pressão do vento pela comporta. Não equivale a saltar ou correr. |
| Destreza | A1: fechar presilhas entre vidro e metal. Não equivale a potência física. |
| Percepção | A1: ler fuligem e cacos para reconhecer o padrão do redemoinho. |
| Sobrevivência | A2: orientar-se por vento, inclinação e vegetação. |
| Conhecimento | A2: aplicar repertório à lógica dos rastros invertidos. |
| Atletismo | A3: atravessar pelo ritmo dos impactos; movimento corporal. |
| Ocultismo | A3: desfazer a ligação sobrenatural entre cantiga e máquina. |
| Vontade | A4: resistir à paralisia induzida pelo rugido; não ausência de medo. |

Cada competência continua binária, em exatamente dois heróis; cada par é único. Uma pessoa moralmente repulsiva pode executar sua competência; medo, covardia, afeto ou teimosia não podem desabilitar regras nem introduzir temas excluídos. Equipamento visível não concede uma terceira competência.

### Trama que a caracterização deve respeitar

- Mundo sem humanos, de inspiração ribeirinha brasileira; terror psicológico 16+. Profundidade humana significa complexidade, não espécie humana. Preservar a exclusão de gore explícito, violência sexual e temas de drogas. O conteúdo adulto das obras pesquisadas não amplia esse escopo.
- O medalhão protege um compromisso consentido: não produz amor ou obediência. As sete regras e os dois resultados do registro de Palotina ficam intactos. Reunir liberta os amantes e custa a vida de Ivaí; destruir salva Ivaí e entrega os amantes e suas memórias a Andirá (§§4.3–4.4).
- Andirá pode omitir e manipular, mas fala literalmente a verdade; não toma/destrói o medalhão, não força magicamente a escolha e não comanda todas as criaturas. Mortais e casas não recebem culpa coletiva por espécie (§§4.2/4.5).
- Ivaí conhece a oferta de Andirá, mas sua investigação é incompleta; os registros de Irati não provam o resultado final. Sua confissão não pode ser antecipada por uma ficha que transforme segredo em conhecimento público (§§4.7–4.8/5.3).
- As rotas iniciais podem vir em qualquer ordem. Floraí e Pérola têm memórias fragmentadas, entregam partes do mapa e não aparecem no Conselho. Peças do mapa abrem caminho; metades do medalhão determinam o final (§5.3).
- Ponte: 100 anos antes; romance/tragédia: 80; igreja na década seguinte; parque 40 anos após a tragédia; abandono do parque 20 anos antes; Irati morreu dois anos antes (§4.6). O passado inventado não altera essas datas.
- Rheed jovem sabe da maldição, não resolve armadilhas nem altera o resultado da campanha. Seu questionamento público no fim do prólogo e a resposta evasiva de Ivaí continuam nos limites de §27.1. Aparência envelhecida não prova a causa da cicatriz ou da sobrevivência.

## Arte efetivamente aberta e referências de carregamento

Inspeção visual dos PNGs originais, sem regenerar ou editar imagens. Prefixos: **P** = `rpg-maker/The Dryland Drowned/img/pictures/`; **D** = `rpg-maker/The Dryland Drowned/data/`. As posições `list`/`page` são índices iniciados em zero; CE é o ID do Common Event. `Basic_EnterBust` aparece nos eventos sob o namespace serializado `VisuMZ_2_VNPictureBusts`, mas é atendido pelo provedor ativo `Coreto_2_VNPictureBusts`; código 231 é Show Picture. São provas de autoria/carregamento nos dados, não um teste de exibição da cena em execução.

Cadeia conferida em `rpg-maker/The Dryland Drowned/js/`: `plugins.js:318–319` desativa Visu e `plugins.js:377–378` ativa Coreto. No bundle `plugins/Coreto_2_VNPictureBusts.js`, o ID legado Visu vem de `catalog.reference.pluginId` (`:1267`, `:9329`); `PluginManager.registerCommand` registra os comandos sob os dois IDs (`:10002–10007`). `Basic_EnterBust` aponta para `enterBust` (`:9976`), que encaminha `args.PictureName` a `$gameScreen.showPicture` (`:9960`). A referência serializada ao plugin desligado, isoladamente, não provaria esse caminho.

| Personagem | PNG aberto em P | Referência em D | Observação visual; limite de inferência |
| --- | --- | --- | --- |
| Gorvak | `Dryland_H1.png` | `CommonEvents.json`, CE73/list5 e 7 | Corpo largo, barba com amarrações/tranças, martelo no ombro, avental, luvas e botas. Não prova temperamento severo nem uma história de forja. |
| Elowen | `Dryland_H2.png` | CE73/list12 e 14 | Orelhas pontudas, arco e aljava nas costas; gira **uma flecha** entre as mãos, pernas longas, botas altas. Não são dois arcos. |
| Griznik | `Dryland_H3.png` | CE73/list19 e 21; `Mirror` | Nariz longo, óculos na testa, utensílios, serra e caixa de ferramentas; corpo estreito. Ferramentas não obrigam humor covarde ou avarento. |
| Seraphina | `Dryland_H4.png` | CE73/list26 e 28 | Alta, orelhas pontudas, **presas ao lado da boca**, cabelo preso, gola alta, livro e instrumentos à cintura. Não são chifres na testa. |
| Bimbren | `Dryland_H5.png` | CE73/list33 e 35; `Mirror` | Baixo e largo, mochila volumosa com rolo, cajado, bigode curvado, barba e casaco. A mochila não prova ingenuidade ou sabedoria. |
| Liora | `Dryland_H6.png` | CE73/list40 e 42; `Mirror` | Pequena, duas tranças, chapéu com âncora, ombreiras, casaco e luvas; mão na cintura. A insígnia não obriga a biografia antiga. |
| Vaelith | `Dryland_H7.png` | CE73/list47 e 49; `Mirror` | Orelhas pontudas, cabelo preso, pena e papel, bolsa, proteção nos joelhos, pé sobre pedra. Sorriso não determina moralidade. |
| Draska | `Dryland_H8.png` | CE73/list54 e 56 | Capacete com lâmpada frontal, picareta no ombro, corda e cantil, pingente geométrico, botas. Não impor personalidade ranzinza. |
| Ivaí | `Dryland_ivai.png` | `CommonEvents.json`, CE302/list11; `Map002.json`, ev1/page0/list117 | Barba/bigode, casaco e calças remendados, instrumento arredondado de cordas dedilhadas; nenhum arco de rabeca visível. |
| Ivaí, expressões | `Dryland_ivai_Apreensivo.png`; `Dryland_ivai_Alarmado.png` | CE263/list4; `Map007.json`, ev1/page0/list392 | Mesmo corpo/objetos; sobrancelhas e boca variam. Nome do arquivo não é prova de personalidade permanente. |
| Andirá | `Dryland_andira.png` | `CommonEvents.json`, CE74/list15 e 17 | Silhueta longa, contornos orgânicos/fluidos, rosto pouco definido; nenhuma asa aberta visível neste PNG. Humanoide não significa humano. |
| Floraí preso | `Dryland_florai_confined.png` | CE297/list12 e 14 | Face integrada ao tronco, orelhas pontudas, galhos, folhas e raízes; não inventar locomoção livre. |
| Pérola presa | `Dryland_perola_confined.png` | CE293/list12 e 14 | Massa de pedra facetada com sugestão de figura/rosto; detalhes finos do corpo não são legíveis. |
| Floraí / Pérola livres | `Dryland_florai.png`; `Dryland_perola.png` | Nenhum Show Picture/EnterBust encontrado nos dados nativos consultados para esses dois nomes | Floraí: cabelo longo, orelhas pontudas, papel/mapa nos braços. Pérola: figura robusta, cabelo trançado, capa, medalhão. Imagens existentes consultadas como referência secundária, sem alegar uso atual no jogo. |
| Rheed velho | `Reed final.png` | `CommonEvents.json`, CE352/list29, código 231, escala X positiva | Cores, barba/cabelo brancos, adornos dourados, casaco vermelho, frasco azul, tapa-olho à direita de quem olha a imagem. O nome técnico `Reed` não muda o nome Rheed. |
| Rheed jovem | `Reed-novo.png` | CE360/list7, `HorzMirror=None` | Ambos os olhos visíveis, barba mais curta, casaco, caneca, outra mão aberta; tons do passado. Sem inferir uma idade numérica. |
| Rheed jovem, expressões | `Dryland_rheed_Assustado.png`; `Dryland_rheed_Inquieto.png` | `Map007.json`, ev1/page0/list373; `Map008.json`, ev1/page0/list372 | Preservam corpo e caneca; olhos/sobrancelhas/boca variam. Nenhum ferimento aparece como origem do tapa-olho. |
| Irati / Palotina / Tibagi | Nenhum retrato individual associado encontrado | Busca nominal em `img/` e em comandos de imagens/bustos; páginas de eventos sem `characterName` preenchido | Não criar aparência canônica por nome de arquivo inexistente. Descrever somente fatos do GDD ou marcar criação compatível; nenhuma encomenda de arte decorre desta lacuna. |

O inventário preliminar do autor Grok foi usado como pista e conferido nos PNGs/dados; as correções da flecha de Elowen e das presas de Seraphina acima prevalecem sobre aquela descrição preliminar. `Actors.json` contém nomes RTP como Reid/Priscilla e arquivos `Actor1`, não a correspondência H1–H8; não os usar como retratos deste elenco. Nenhuma página dos mapas consultados tem sprite de evento `characterName` preenchido.

Há outras variantes carregadas, preservadas sem auditoria visual quadro a quadro nesta pesquisa: `Dryland_Tavern_H1`–`H8` (CE38), `Dryland_Camp_H1`–`H8` (`Map045`), grupo/memorial, epílogos (`Map029`–`Map036`), expressões e sacrifícios. As imagens-base foram abertas; isso não afirma inspeção de todas as variantes nem aprovação visual do jogo.

### Divergências documentadas, sem consertos de arte

1. **Rheed:** livro 01:13 localiza a cicatriz no olho direito. O PNG não espelhado mostra tapa-olho no lado direito da imagem, correspondente ao esquerdo do personagem; CE352/list29 usa escala X positiva. Não resolver por uma história inventada de ferimento nem alterar o livro/PNG. A ficha pode conservar cicatriz e tapa-olho sem afirmar lateralidade; a discrepância continua registrada.
2. **Ivaí:** GDD §4.8 chama o instrumento de rabeca; o PNG mostra caixa arredondada dedilhada, sem arco visível. Preservar os dois insumos; não criar mudança de profissão ou equipamento para explicar a diferença. A identificação organológica exata não foi comprovada.
3. **Andirá:** a silhueta com asas descrita no GDD §4.5 não está integralmente representada no busto aberto. Não declarar a descrição revogada nem inventar uma nova imagem; o retrato existente e a regra narrativa permanecem.
4. **Daratrine:** a antiga indeterminação do GDD-base foi resolvida pelo esclarecimento do dono registrado acima. Não reapresentar essa questão como bloqueio criativo.

## Rheed: evidência própria e limites da amostra

O livro fornecido pelo dono está em `planos/005-refactor-narracao/livro-ghork/`, sem rastreamento Git. O manifesto abaixo registra **27 arquivos**, não 27 leituras integrais por S1. S2 é responsável por ler todos os capítulos; esta pesquisa conferiu diretamente o capítulo 01 e passagens contextualizadas dos capítulos 02, 06, 18 e 27, além de busca nominal no conjunto. O relatório do autor S2 não é revisão independente nem substituto dessas verificações.

| Localização no livro | Evidência conferida | Inferência útil / limite |
| --- | --- | --- |
| `01-noite-da-historia.md`:13–19 | Anão de barba branca, cicatriz, poção; apresenta-se como Theodor Rheed. | Identidade e presença cênica; não prova profissão anterior, causa da cicatriz ou idade. |
| 01:15, 75 | Abre com “Sejam bem-vindos à Noite da História de Daratrine” e depois pergunta “E aí, galera, divertindo-se?”. | Alterna cerimônia e proximidade no mesmo encontro; formalidade constante empobreceria a amostra. |
| 01:23–47 | Pede voluntários, escuta sonhos das crianças; pensa sobre a preferência militar dos orcs. | Conduz escutando; o comentário em itálico é pensamento, não fala dita à plateia. |
| 01:79–85 | Acalma o susto, explica a ilusão, chama Slug de “pequenino” e retoma a história. | Explicação concreta e comando cordial coexistem; não demonstra como trata inimigos ou recusa um íntimo. |
| `06-questao-de-honra.md`:43–53 | Depois da experiência de Ghork, Rheed interrompe e fala da luta cotidiana, buscando concordância com “não é mesmo?!”. | A máxima pertence à fala de Rheed; os pensamentos de Ghork em 43–45 não. Não deduzir que toda resposta de Rheed é uma máxima. |
| `27-vinculos-eternos.md`:177–191 | Retorna à plateia, apresenta o encerramento como origem da estátua, provoca perguntas e gargalha. | Prazer em controlar o momento da revelação; não prova crueldade, mentira factual habitual ou cinismo. |
| 01:79; esclarecimento do dono | No livro ele exibe lembranças do orc da estátua; no jogo narra suas próprias memórias. | São histórias diferentes contadas pelo mesmo homem. Não atribuir a Rheed todos os feitos do protagonista do livro. |

**Correção de atribuição necessária ao uso do material:** “Droga!” em `02-pena-lilas.md`:87 é de **Ghork**; “Ferrou!” em `18-a-caverna-escura.md`:99 é de **Adran e Peren**. Esses trechos, citados no levantamento de S2 como referência de intensidade do livro, não provam vocabulário de Rheed. Tampouco estabelecem um teto canônico de palavrão. Escolhas de frequência para Rheed jovem são **Criação**; ausência de palavrões na amostra de falas do velho não é proibição universal documentada.

Não há, nesta amostra, fala de Rheed pedindo ajuda, admitindo dano a outra pessoa ou dirigindo-se a um adversário íntimo. O jovem não é uma versão observada no livro. Os exercícios e a ligação entre as duas idades precisam conservar essas lacunas como criação. A ternura com crianças não obriga santidade; a intenção de personagens falhos não autoriza transformar o narrador do livro num vilão genérico.

## Pesquisa externa: cenas humanas consultadas

Todos os acessos abaixo ocorreram em **14/11/2026**. As cenas foram lidas em roteiro ou transcrição humana; não houve sessão de exibição dos filmes, verificação de áudio ou autenticação de que cada linha do roteiro permaneceu no corte final. Os poucos fragmentos entre aspas são literais da versão indicada, nunca lembrados de memória. As aplicações são sugestões, não falas novas das fichas.

### E1 — Cidade de Deus

[Roteiro de Bráulio Mantovani, baseado em Paulo Lins](https://gabycastro.com.br/wp-content/uploads/2022/03/cidadededeus-roteiro.pdf), **12º tratamento, dezembro de 2001**, português, 119 páginas PDF. Localização por página impressa/cena.

| Evidência de cena | Inferência de escrita | Aplicação possível, sem importar a situação |
| --- | --- | --- |
| Cena 35, pp.21–22: Marreco reage à partida dos policiais; Alicate muda para perguntas existenciais, que recebem respostas materiais. | A descarga verbal marca alívio; interlocutores podem viver a mesma fuga em registros incompatíveis. | Variar depois do perigo: respirar, explicar, calcular ou perguntar. Não distribuir a mesma tirada amarga. |
| Cena 104, p.75: Barbantinho responde “Pra caralho!” ao gosto por música. | Intensificador de entusiasmo e aproximação, sem ataque. | Um personagem pode xingar ao gostar de algo; outro pode demonstrar alegria sem palavrão. |
| Cena 106, pp.77–78: Bené brinca enquanto Angélica tenta conversar; quando ela insiste, ele pede desculpas e pergunta o que deseja. | Humor íntimo pode falhar; reparar a escuta muda a resposta sem apagar a voz. | Desenvolver afeto imperfeito e capacidade de recuar. Não transportar sexo, drogas, bordões ou biografia da cena. |

### E2 — Tropa de Elite

[Veridiana Caetano, *O palavrão em filmes brasileiros contemporâneos: um enfoque Bakhtiniano*](https://repositorio.pucrs.br/dspace/handle/10923/8051), PUCRS, 2015; [texto integral](https://repositorio.pucrs.br/dspace/bitstream/10923/8051/4/000478129-Texto%2BCompleto-0.pdf), português, 148 páginas PDF. Fonte humana secundária que **transcreve diálogos de cenas** de *Tropa de Elite* (José Padilha, 2007). As páginas abaixo são as impressas, uma abaixo do número de página do leitor PDF.

| Evidência de cena | Inferência de escrita | Aplicação possível, sem copiar Nascimento |
| --- | --- | --- |
| Cena B, Quadro 4, p.113: conversa com a esposa sobre o substituto; “porra pilhadão” integra elogio e comparação consigo. Contexto doméstico descrito e ilustrado em pp.113–115. | A mesma marca verbal pode expressar admiração e intimidade. | Defeito de autoimportância pode coexistir com cuidado familiar; não atribuir ao herói as instituições ou ideologia do filme. |
| Cena C, Quadro 5, pp.116–117: pergunta repetida sobre quantos fugiram; Zero 06 avança, e Nascimento encadeia interrupção e ordem de retorno. | Repetição passa de conferir informação a tentar recuperar controle sob perigo. | Distinguir comando urgente, medo por alguém e agressão. O comportamento não se resume a elevar a quantidade de palavrões. |

### E3 — O Agente Secreto

[Trecho do roteiro de Kleber Mendonça Filho publicado por Bravo!](https://bravo.abril.com.br/literatura/roteiro-de-o-agente-secreto-e-lancado-em-livro-leia-um-trecho/), 22/12/2025, edição **Amarcord/Vitrine Filmes, 2025**, português. Consultadas visualmente as cinco imagens `agente-secreto-pg1.png` a `pg5.png`; não mostram paginação impressa. Âncora: sequência inicial do posto, da pergunta do frentista à revista de Marcelo.

| Evidência de cena | Inferência de escrita | Aplicação possível |
| --- | --- | --- |
| Imagens 1–2: o frentista relata a morte enquanto trabalha; Marcelo reage “Puta merda...” ao cheiro e pergunta pela polícia. | Banalidade profissional e choque convivem; o palavrão é reação sensorial, não insulto. | Horror pode aparecer na diferença entre quem se habituou e quem acaba de perceber. Não importar descrição gráfica. |
| Imagens 3–5: a polícia chega, mas o interesse recai no carro; pedidos corteses conduzem a revista. | Autoridade e ameaça podem usar formalidade sem xingamento. A expectativa do frentista não governa a ação dos policiais. | Experimentar controle por perguntas, tratamento respeitoso ou exigências pequenas; não tornar toda presença ameaçadora vociferante. |

### Aproveitamento e lacunas externas

O dono indicou inspiração sobretudo em vilões e, entre anti-heróis, Punisher, Peacemaker, Rorschach e Iron Man mais velho. Essa preferência está preservada como **direção criativa**, não como alegação de pesquisa de uma cena específica de cada um. Não há correspondência obrigatória “herói X = personagem externo Y”. Os autores podem ampliar referências, mantendo obra, versão, interlocutores, situação e aplicação verificáveis fora das fichas.

S2 também reuniu referências de *Auto da Compadecida*, *The Grand Budapest Hotel*, *Moby-Dick*, *The Great Gatsby* e *The Rime of the Ancient Mariner* em seu registro de continuidade. Elas não foram promovidas a pesquisa independente de S1: citações, versões e aplicações daquele conjunto permanecem sob responsabilidade do autor e da revisão de fontes. O pacote acima já fornece cenas em português dos três filmes pedidos.

Leads sem conteúdo adotado: o repositório UFMA (`https://tede2.ufma.br/jspui/handle/tede/3400`) não respondeu na tentativa inicial; o lead PUC-SP (`https://tede2.pucsp.br/handle/handle/4730`) retornou erro de acesso; a entrevista Gazeta (`https://www.gaz.com.br/entrevista-roberio-diogenes-fala-sobre-o-filme-o-agente-secreto/`) retornou 403. A cópia inglesa de 164 páginas de *O Agente Secreto*, localizada por Filmdraft/Carole Kirschner e hospedada em ThinkMovies, teve falhas de leitura/download; não foi usada para atribuir fala brasileira. A página FYC da NEON não forneceu texto de cena na leitura efetuada. Entrevistas, press notes e resumos não substituem as cenas acima.

## Cobertura das 29 perguntas da ficha

**H** = cada um dos oito heróis; **P** = cada uma das sete figuras P1–P7; **R** = Rheed nas duas idades. “Criação” abaixo é uma lacuna deliberadamente entregue ao autor, não pedido de nova entrevista. Não existem falas antigas obrigatórias para H. Para P, os fatos do GDD limitam a nova caracterização; uma regra narrativa não demonstra por si só vocabulário ou sintaxe. O modelo do dono em `planos/005-refactor-narracao/modelo-ficha-personagem.md` e o contrato `ficha-de-personagem` exigem sete seções, 48 campos, passado e relações. O insumo é a edição modificada no workspace original, identificada pelo hash abaixo; a cópia do commit-base tem outro hash e não substitui essa edição.

| Pergunta / campos | Resposta disponível e encaminhamento |
| --- | --- |
| Q01 — Papel e descrição pelos outros | Inventário acima / GDD. H: recrutáveis competentes; P: função individual fixada; R: ajudante/testemunha → narrador. Frase de outro que os resuma: Criação, sem transformar descrição antiga em citação válida. |
| Q02 — Raça, idade, aparência | GDD para P/R e imagens abertas. H: espécie/idade não se herdam das fichas descartadas. Dados ausentes: Criação compatível, sem usar figura humanoide como humano. R velho: livro 01:13. |
| Q03 — Desejo e medo | P: Ivaí busca salvar-se; Andirá possuir; amantes preservam vínculo consentido; Irati rejeita coerção; Palotina sustenta juramento; Tibagi foi seduzido pelo domínio. H e desejos privados de R: Criação. Não confundir comportamento público de R com acesso à sua intenção. |
| Q04 — Qualidade, defeito e dano | Fatos de P limitam consequências; nenhum elenco precisa compartilhar uma moral. H: Criação integral. R: escuta e condução observadas; defeito privado requer marca de Criação. E1–E3 oferecem repertório, não diagnósticos. |
| Q05 — Contradição fala/ação | Ivaí promete tesouro e prepara outro desfecho (§4.8). Para os demais, criar contradição concreta compatível; não exigir mentira literal de Andirá. O riso final de R não prova que ele mentiu. |
| Q06 — Mostrar e esconder | Ivaí oculta maldição/medalhão/plano. H/P restantes: Criação vinculada ao desejo/medo. R: pensamento em 01:47 separado do que diz; demais segredos são Criação. |
| Q07 — Frustração, afeto, autoridade, confronto | Não foram localizadas amostras aprovadas dos quatro casos para cada ficha. R tem condução cordial em 01:79–85; casos restantes são Criação. E1/E2/E3 ajudam a variar relações e respostas. |
| Q08 — Atitude e duas falas | R velho: par literal 01:15/75 na tabela acima. Jovem/H/P: produzir exemplos como Criação, sem citar antigo placeholder como prova. |
| Q09 — Vocabulário | R mistura cerimônia e coloquialidade (01:15/75/85). H/P/jovem: Criação; escolher domínios de palavras por experiência, não pela competência como bordão. |
| Q10 — Formalidade | R: abertura formal e pergunta informal na mesma noite. Outros: Criação por interlocutor/contexto. E3 mostra uma possibilidade de poder formal; não é regra para Andirá. |
| Q11 — Tratamento de si/outros | R: nome completo, “galera”, “pequenino”, plural inclusivo. Outros: Criação; Andirá mantém pronomes masculinos; nomes canônicos não mudam. |
| Q12 — Comprimento | R: saudação, pergunta curta, explicação desenvolvida em 01:79. Não medir frequência por impressão. Outros: Criação com situação de mudança, sem cotas de palavras. |
| Q13 — Construção da resposta | R: pergunta, explica e redireciona em 01; provoca perguntas ao concluir em 27. Outros: Criação; escolher operação verbal identificável, não só adjetivo de personalidade. |
| Q14 — Pausas, repetição, hesitação | Livro 06:53 descreve uma pausa corporal; não prova reticências recorrentes na escrita de R. Padrões escritos H/P/jovem: Criação contextual; repertório E2. |
| Q15 — Humor e reação | R: provocação à plateia e gargalhada em 27. Outros: Criação, podendo não fazer graça. Repertório E1; evitar dezessete ironistas. |
| Q16 — Comparações e referências | R: história partilhada, alquimia e exemplo cotidiano (01/06). H/P: Criação; não fixar martelo=metáfora de forja ou livro=sermão acadêmico. |
| Q17 — Inícios, finais e frequência | Amostra de R admite retomada do relato e convite à concordância, não percentuais. Outros: Criação com frequência qualitativa e ocasião. Expressão característica pode estar ausente. |
| Q18 — O que destoaria | Violações certas: humanos, competências extras, mentira literal de Andirá, onisciência dos amantes, Rheed jovem resolvendo armadilhas. Proibições de palavras/tons individuais além disso são escolhas autorais, não fatos de fonte. |
| Q19 — Pedir, recusar, discordar, evitar | R pede voluntários (01:25) e encerra interrupção (01:85); não há amostra suficiente dos quatro atos. H/P/jovem e lacunas do velho: Criação, cada ato com exemplo próprio. |
| Q20 — Íntimo, estranho, adversário | R velho está diante de plateia e crianças, não demonstra os três registros. GDD fixa relações P, sem fornecer três amostras. Completar H/P/R como Criação; recorrer ao contraste relacional de E1/E2. |
| Q21 — Medo, raiva, vergonha, vulnerabilidade | R acalma medo alheio; isso não mostra seu próprio medo. Lacunas de H/P/R: Criação diferenciada; poder, alívio e afeto também admitem variação de palavrão. |
| Q22 — Marcas invariantes | R: hipótese de condução atenta ao público, sem uniformizar contextos. H/P/jovem: autor deve demonstrar continuidade com escolhas de construção e resposta; revisão compara exemplos. |
| Q23 — Antes/depois de acontecimento | GDD fixa confissão/decisão de Ivaí; livro não documenta juventude de R. Continuidade jovem/velho é Criação coerente; não inventar redenção, morte, poder ou arco jogável obrigatório. |
| Q24 — Seis situações comuns | R velho tem apresentação (01:19); demais situações carecem de fala adequada. Todos os seis exercícios devem ser preenchidos; exemplos novos de qualquer personagem marcados Criação. |
| Q25 — Mensagem neutra | Não há frase-fonte equivalente suficiente para o elenco. Cada autor cria sua versão preservando saída, perigo e pedido de ajuda; não adicionar rubrica ou identificação do falante à amostra. |
| Q26 — Passado conhecido/evitado | P: cronologia e causalidade §§4.2–4.8; R jovem §27.1, velho livro + dono. H: biografia antiga descartada. Completar lacunas como Criação, sem datar a cicatriz nem confundir memórias de Ghork com vida de R. |
| Q27 — Relações, tensão e fala dirigida | Oito pares mecânicos acima; P: parentesco, amantes, coerção, mediação; R/Ivaí: ajudante e testemunha. Interpretação e exemplos novos são Criação; uma ficha não pode impor relação contraditória à outra. |
| Q28 — Literal ou memória | Fragmentos aqui transcritos foram conferidos nos originais indicados; nenhum é de memória. Atenção às falas de Ghork/Adran/Peren identificadas acima. Exercícios autorais nunca recebem etiqueta de citação. |
| Q29 — O que faltou | Uso de palavrão por função e interlocutor, diferença entre espécie/complexidade, arte versus personalidade, fonte versus invenção e limites de conhecimento. A comparação final precisa distinguir estratégias também em gratidão/ajuda/erro, não só em confronto. |

As seis situações são: apresentação; pedir ajuda numa tarefa que não consegue concluir sozinho; discordar de plano arriscado; agradecer ajuda; esconder medo antes de perigo; admitir erro que prejudicou outra pessoa. Mensagem comum: “Precisamos sair daqui. Há perigo, e eu preciso da sua ajuda.” Cada ficha deve ter exemplos sem nome do falante ou rubrica e indicar a voz mais próxima e diferenças concretas. Este pacote não redige os exercícios nem antecipa o parecer do revisor.

## Manifesto das fontes locais

SHA-256 calculado sobre bytes originais. Arquivos de narrativa antiga são localizáveis no commit-base mesmo depois de retirados; não devem continuar como autoridade paralela. Livro e modelo modificado são insumos do dono, lidos no workspace original e não copiados para o commit. Hash não comprova leitura integral.

| Fonte | SHA-256 |
| --- | --- |
| `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` | `ed2ab9992dc5feea6f19c28a8c7ec5d54e084d76a5aeecf7abf5b4f98fe9313a` |
| `docs/narrativa/herois/Ficha_H1_Gorvak.md` | `6b4f9a4921057561b42ea80d577f8faf10937f147e54b92bd5b40685fefe0798` |
| `docs/narrativa/herois/Ficha_H2_Elowen.md` | `5a1c5edabd8a60bdf127e94ba14dc025932bfaa618f90239c990589275a35cc1` |
| `docs/narrativa/herois/Ficha_H3_Griznik.md` | `ea9e3a6e223d7eada717bc3fa777f5be95429bf839b269bf0abc535fba687358` |
| `docs/narrativa/herois/Ficha_H4_Seraphina.md` | `17325373004337f4947f12ec04ad3e0404e0dce258895ad565df319440e6e25f` |
| `docs/narrativa/herois/Ficha_H5_Bimbren.md` | `22dc77bd45050c24f01c513e8b2d368f7d7f9d89569ae528691b9f5e8208054e` |
| `docs/narrativa/herois/Ficha_H6_Liora.md` | `d7246e378dd0b13fb4bfb47889ce7041ce04c267c3b81eab62fed1c42f181d82` |
| `docs/narrativa/herois/Ficha_H7_Vaelith.md` | `bc7d754f6e6e6b69ebcf1711de6f001a31b1975a6fc7359cbfe6d7bf58db5eae` |
| `docs/narrativa/herois/Ficha_H8_Draska.md` | `831a1590a661b70e58259940afea96fbba677a2291cbf839ec4322105d16214a` |
| `planos/005-refactor-narracao/modelo-ficha-personagem.md` (modificado pelo dono) | `07ef360401e57afd59ae83471b63bb733954c769afdeafaab6fa579c3ab873a8` |

### Livro do dono — 27 capítulos

Prefixo `planos/005-refactor-narracao/livro-ghork/`; conteúdos permanecem fora do Git. S1 conferiu presença 01–27 e hashes; a obrigação de leitura integral está com S2.

| Capítulo | SHA-256 |
| --- | --- |
| `01-noite-da-historia.md` | `f8f840a394ae38757e09102ce13b6ca9f40be5a34eb8d410783a255c00a77b0e` |
| `02-pena-lilas.md` | `7cc51073a804170941433979218eb86131f60f2aa89fe571d7c9fbed37060ce5` |
| `03-ultimo-dia.md` | `c95973f7b5cfb2ca5ad5ba4fe5f1f7855a8f1baca307379937ec496e26324a86` |
| `04-plano-infalivel.md` | `deef77afdc8f4d5373221396ae0859856b79ad6fd208207ac9135edbae3c0687` |
| `05-quebracranios.md` | `efcece7799fac8b221dd9474cb80a8eeca69926b723db4e772392076b78d7149` |
| `06-questao-de-honra.md` | `e20079b25939194e2b6a0ebd314239270dfdbe2f454d4af2b04446362e684921` |
| `07-enrascada-elfica.md` | `45efb458f613d56f4d10894315d67b6c87cda08d6368ecaab0ea7000f5cbbaa3` |
| `08-inspetor-dam.md` | `53c49a46f19c77d2d4b94ba6fe58928e508c430675d8d100d959043f04609c3b` |
| `09-plano-da-lala.md` | `2cc5c4a013668bbe8407e14d4bee44dac100158b003cf45dbcc92eb1a5f8423b` |
| `10-aventura-no-complexo.md` | `441c0c448e3a5ce82e98f69cc8a1e8715da6af13ac81682c5f648ce02f69d8bb` |
| `11-dia-de-prova.md` | `ef5333d47dc330a88b37cce091468b93c37ff53e67d448eb3c3997f7adf4f0f0` |
| `12-preparativos.md` | `1a45c1b9095283d2ad1980bef8e4a6e06039d2a4f440bc78199377283b34abab` |
| `13-a-promessa-de-mudanca.md` | `41c33b65e7f7fcd7febc124890d0970952fbc439b57db053734c1ad6db936d72` |
| `14-resenha.md` | `d946c385da4137cd9649642396fa2fd88f32ab500a503bfb80914797a6606926` |
| `15-o-hino.md` | `f5b093be15a2315492de9d76bf731e62d310df8e79412a7184e93b4a8b013a53` |
| `16-escolhas.md` | `0b28910999386ff7bd01395c5b646a7bb3543a37e79ea5e2fc2db1890818627e` |
| `17-lacos-inesperados.md` | `21f9733c21336c0ec7d60180f19ea3d9be725f4efd33f9ed2707dab7327cbff9` |
| `18-a-caverna-escura.md` | `179ddccea5f1e42b58753d73909a2ed4701a1660c046ca5dcc0f1fee96e6698d` |
| `19-momento-critico.md` | `8ae10eb1a95818e1e5930164e72d9c520750778c8cb655e24de22da210b7e03f` |
| `20-julgamento.md` | `27e680842cb4da7adbf34e31bccc97cdbcd9e32de4d82303b5116a4d6f13509b` |
| `21-encontro-na-saida.md` | `fc353298bb50d5e32b99b9809433538015ce5b92c144f8559e218f718098299c` |
| `22-caminhos-e-anseios.md` | `9bb284b07dacaf4363b4817b863af03e898c7bf2281e1c1adc34cf084df05570` |
| `23-o-jantar-tumultuado.md` | `aee2ebf56d3ac3383698f8861a421e5da96a19a029f8c573d3cab58726032b39` |
| `24-verdades-cruas.md` | `32d8adfbbab435a20097d4504e5d37dad857d12936a814cc89bf82db3e39106e` |
| `25-oferta-de-abrigo.md` | `0fc94e82137186f0ebdc9470fc8e83d1aa7559591d8aef3a4e3d9cc3b68d1890` |
| `26-promessa.md` | `c02f456e4978381988bebb6227a5d353f347dab1b4606220b9a9f17eadf3a4b8` |
| `27-vinculos-eternos.md` | `522f2207ea8fff9193c89f55104606d1760be260361acbe3202b99861e1c0a2e` |

### Imagens abertas e dados que as referenciam

Prefixos P/D definidos na seção de arte. O manifesto inclui as duas imagens livres sem carregamento localizado, explicitamente distinguidas acima.

| Arquivo | SHA-256 |
| --- | --- |
| P / `Dryland_H1.png` | `4d9e351c77b0cf7f89f4e734e228c987aa4941f8baf6c12178e32a6a1c03a494` |
| P / `Dryland_H2.png` | `88048ce73325d06137bf6340ff5c2e5dee250e07135048b0841999f55bb4aaa8` |
| P / `Dryland_H3.png` | `62d61eeaccb677600e6ccdf57f26d225e18d4aa7ee283807380b3acf85365ee9` |
| P / `Dryland_H4.png` | `5962b17c69251c35180ae26b083739d9bd18032ec69c37845a1de44d4f2049ce` |
| P / `Dryland_H5.png` | `599d99ef2dd52262a85843eb24d791c8135b4248a1f82492997949f7af37776a` |
| P / `Dryland_H6.png` | `34239d043271f855c7d09249416055b711d5678e5159d67424020e2d4fd6ef10` |
| P / `Dryland_H7.png` | `9cbfc785db7e21c4f8bf92430e6bc00b6773de10d319ba8a8c925b30c46bd7a5` |
| P / `Dryland_H8.png` | `99259d24cbb9be0ab4df87ca93929faa91afa25e38016ed0c59fa7de943313d0` |
| P / `Dryland_ivai.png` | `b34b4a365bbc8ef58be290174b87a9216c4943fa603e026ca11d6010165d3b36` |
| P / `Dryland_ivai_Apreensivo.png` | `307769c405cd9f6e6088308585b77c26483fa8dbcdd5526719d1cb42296ba152` |
| P / `Dryland_ivai_Alarmado.png` | `e3784ea11e3bcaaf4ababae88f3f31ef943abb61723babc46c7399e88e90c2f0` |
| P / `Dryland_andira.png` | `6bc20e2cdaeca34d97eb07a7cef58d9e996bb653ae2a9c81dc7850298d3f2ddb` |
| P / `Dryland_florai_confined.png` | `6494a9a893fc1e2c4e5d4e4cbc6d03f6de3f52db5c5a1d497e7ec84f87c004c9` |
| P / `Dryland_perola_confined.png` | `d5930b0d8f228f632b0585b6c8c2a8bed56a834acb239da81bb2cf12c606899c` |
| P / `Dryland_florai.png` | `62b2ca65c6e4d77bb661a9f670715b22cdaed6971de175d471e35a10539edd49` |
| P / `Dryland_perola.png` | `509a8b0de22ff0b3104c7048026f879c9d21f0d89319540fabfc40d3ca86098d` |
| P / `Reed final.png` | `5f0cf1331d19d1ef5822372412387622d49bb1d96040799ad71e2f3db2c49d58` |
| P / `Reed-novo.png` | `4bd6c6734167a0f719e230f9dbd50d97387b73cf17d5546a4bfa00e45ad5d90e` |
| P / `Dryland_rheed_Assustado.png` | `231118fe581f79dbaf706a171b0d67066c9fa64cd2117750c9ac2d55643e6100` |
| P / `Dryland_rheed_Inquieto.png` | `ca54776f70d4151a35b1d0a6f669fea354e731cd63a44e9f7705aede7855ea65` |
| D / `CommonEvents.json` | `5357f0ae1450dd69dfb9a27a28aac1fb197c9e27f27fabc1fec4a227c6c74688` |
| D / `Map002.json` | `cefbaeb1501006ee63c80ba7b55b7383b2c0d696939f3720aacb7ee81929573a` |
| D / `Map007.json` | `77b27563f3daa1488e5be678d73be720b120622e26ee01d1e5055791a3bf50b6` |
| D / `Map008.json` | `aa2b1c21bc8b838b0f78588eef9c6c1fca13244ce9a6e7df3a89307fb40c9f23` |
| D / `Actors.json` | `4552d079db9072fac10980446ef75e8934330b1a7d5c3789f52d10f8b280dd77` |

## Resultado de S1 e passagem aos autores

V-01: inventário de 17 fichas/16 pessoas, oito vínculos e matriz de competências dos oito heróis conferidos; imagens abertas e referências nativas rastreadas; três filmes cobertos por cenas humanas localizadas; 29 perguntas classificadas; fontes originais identificadas por hash. As lacunas de caracterização são material autorizado de Criação, não bloqueios de pesquisa. Divergências de arte/fonte estão explicitadas sem alteração de insumos.

Leitura integral do livro, continuidade e comparação final são responsabilidades da autoria; a revisão fresca é independente. A autoridade documental foi consolidada, e os estados correntes das fichas constam no [índice](README.md). Nenhuma ficha foi escrita ou revisada por este pesquisador. As referências adicionais de S2, a eficácia das vozes e o aceite do dono não são certificados por V-01.

Verificação documental: contagens e matriz; conferência de fontes e citações; links locais; ausência de caminhos absolutos temporários; revisão do diff e de whitespace. Não existe comando de lint Markdown no `package.json` consultado. Nenhum teste de runtime, jogo, navegador interativo ou servidor foi iniciado. Apenas este registro pertence ao commit de S1; PDFs/imagens externos de apoio ficam em evidência ignorada, sem reproduções integrais na entrega versionada.
