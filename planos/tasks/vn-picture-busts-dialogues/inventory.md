# Inventário de diálogos com bustos

**Observação estática em 2026-09-11.** Base e hashes em [source-evidence.json](source-evidence.json). Não houve playtest nesta investigação. A classificação abaixo deriva dos eventos e das condições de execução do código; não certifica carregamento, enquadramento ou ausência de falhas no navegador.

**Uso após a entrevista:** este arquivo preserva a implementação anterior à migração. O alvo atual está em [spec.md](spec.md) e [ADR-002](adrs/adr-002.md): composição com vários bustos, continuidade da taverna e entrada coletiva em `council.challenge`. As descrições de um busto por vez, picture 18 e escala atual abaixo são fatos do baseline, não decisões do novo layout. O GDD evoluiu com as decisões aceitas; seu hash em source-evidence.json identifica o documento consultado na investigação original.

## Resultado

O `VisuMZ_2_VNPictureBusts` 1.03 já está ativo, na posição 7 da lista (índice 6), depois do CoreEngine exigido. Não há comandos desse plugin gravados nos Common Events, mapas ou páginas de tropas. Os bustos de diálogo são criados por chamadas a três comandos públicos do plugin dentro de `Dryland_EventBridge.js:997–1028`.

Há **63 seções e 103 comandos Mostrar texto** cobertos por esse caminho. São unidades de autoria: não representam 63 conversas completas nem 103 falas alcançáveis numa única campanha. O catálogo inteiro tem 258 seções e 282 comandos Mostrar texto dentro delas. Foram inspecionados 67 Common Events, 36 mapas e cinco páginas de tropas; estas contêm somente o terminador vazio.

## Como são construídos hoje

1. Os textos PT-BR ficam em `CommonEvents.json`, entre `@dryland-section` e `@dryland-end`, em comandos 101/401. O campo de nome do comando 101 identifica o falante de cada caixa. `@speaker` identifica a seção e pode diferir do falante: `speech.H1`, por exemplo, inclui Ivaí e Gorvak.
2. `Dryland_EventBridge:Present` resolve o trecho pelo cursor da campanha ou pelas variáveis 21/22 da taverna, clona somente essa faixa e cria um intérprete filho com `_drylandPresentation`.
3. O alias de `Game_Interpreter.command101` reconhece apresentações observacionais, despedidas, descobertas (exceto `map.reveal`), Conselho e epílogos. Resolve o nome exibido para H1–H8, ivai, perola, florai ou andira. Um nome não reconhecido nesse caminho limpa o picture 18 e não cria outro.
4. `speakerBust` apaga o picture 18, carrega `Dryland_<id>`, aguarda `Bitmap.addLoadListener`, chama `Basic_EnterBust`, `Scale_ScaleTo` e `Move_MoveToCoordinates`. A entrada é imediata, sem espelhamento; um busto ocupa o centro por vez. Mesmo duas caixas consecutivas do mesmo personagem repetem essa montagem.
5. A escala resulta da altura do PNG. Os personagens normais usam altura projetada de 1000 px, x=640/y=1070; Andirá usa 480 px, x=640/y=500. A composição visível depende da transparência e da janela inferior; não inferir um novo enquadramento a partir desses números.
6. `Observe:formation`, `Observe:encounter` e `Observe:closing` limpam imagens em seus limites. `terminate` conclui a leitura não observacional; `skipPresentation` pode encerrar o intérprete antes dos comandos finais. HIDE conserva a arte e oculta a interface.

## Cobertura por família

| Família | Seções | Mostrar texto | Autoria e entrada no fluxo |
| --- | ---: | ---: | --- |
| Perfil público | 8 | 16 | CE 5–12; CE 3 Conversar → profile.Hn |
| Conversa Ivaí/herói | 8 | 40 | CE 5–12; CE 3 Conversar → speech.Hn |
| Seleção aceita | 8 | 8 | CE 5–12; CE 3 após TOGGLE_HERO aceito |
| Grupo cheio | 8 | 8 | CE 5–12; CE 3 após invalid_party_size |
| Despedidas | 8 | 8 | CE 41; CE 42/43 validam sacrifício; CE 40 apresenta leitura |
| Pérola/Floraí | 4 | 4 | CE 49/50; CE 40 → CE 46 apresenta descoberta |
| Conselho, Ivaí e Andirá | 3 | 3 | CE 54; CE 40, mapa 23 |
| Opiniões de heróis | 8 | 8 | CE 41; CE 40, mapa 23, somente participantes elegíveis |
| Epílogos | 8 | 8 | CE 41; CE 40, mapas 29–36, somente participantes elegíveis |

## Localizadores exatos

Todos os índices abaixo são base zero em `data/CommonEvents.json → [CE].list`. O fim aponta para `@dryland-end`, que fica fora da faixa clonada por Present. Atualizar os localizadores após editar os eventos; o identificador estável da seção continua sendo a referência principal.

| Seção | CE | Início–fim | Índices 101 | Falantes em ordem | Status do conteúdo |
| --- | ---: | --- | --- | --- | --- |
| `profile.H1` | 5 | 1–11 | 7, 9 | Gorvak → Gorvak | `confirmed` |
| `speech.H1` | 5 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Gorvak → Ivaí → Gorvak → Gorvak | `confirmed` |
| `selection.H1` | 5 | 29–37 | 35 | Gorvak | `provisional` |
| `party_full.H1` | 5 | 38–46 | 44 | Gorvak | `provisional` |
| `profile.H2` | 6 | 1–11 | 7, 9 | Elowen → Elowen | `confirmed` |
| `speech.H2` | 6 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Elowen → Ivaí → Elowen → Elowen | `confirmed` |
| `selection.H2` | 6 | 29–37 | 35 | Elowen | `provisional` |
| `party_full.H2` | 6 | 38–46 | 44 | Elowen | `provisional` |
| `profile.H3` | 7 | 1–11 | 7, 9 | Griznik → Griznik | `confirmed` |
| `speech.H3` | 7 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Griznik → Ivaí → Griznik → Griznik | `confirmed` |
| `selection.H3` | 7 | 29–37 | 35 | Griznik | `provisional` |
| `party_full.H3` | 7 | 38–46 | 44 | Griznik | `provisional` |
| `profile.H4` | 8 | 1–11 | 7, 9 | Seraphina → Seraphina | `confirmed` |
| `speech.H4` | 8 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Seraphina → Ivaí → Seraphina → Seraphina | `confirmed` |
| `selection.H4` | 8 | 29–37 | 35 | Seraphina | `provisional` |
| `party_full.H4` | 8 | 38–46 | 44 | Seraphina | `provisional` |
| `profile.H5` | 9 | 1–11 | 7, 9 | Bimbren → Bimbren | `confirmed` |
| `speech.H5` | 9 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Bimbren → Ivaí → Bimbren → Bimbren | `confirmed` |
| `selection.H5` | 9 | 29–37 | 35 | Bimbren | `provisional` |
| `party_full.H5` | 9 | 38–46 | 44 | Bimbren | `provisional` |
| `profile.H6` | 10 | 1–11 | 7, 9 | Liora → Liora | `confirmed` |
| `speech.H6` | 10 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Liora → Ivaí → Liora → Liora | `confirmed` |
| `selection.H6` | 10 | 29–37 | 35 | Liora | `provisional` |
| `party_full.H6` | 10 | 38–46 | 44 | Liora | `provisional` |
| `profile.H7` | 11 | 1–11 | 7, 9 | Vaelith → Vaelith | `confirmed` |
| `speech.H7` | 11 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Vaelith → Ivaí → Vaelith → Vaelith | `confirmed` |
| `selection.H7` | 11 | 29–37 | 35 | Vaelith | `provisional` |
| `party_full.H7` | 11 | 38–46 | 44 | Vaelith | `provisional` |
| `profile.H8` | 12 | 1–11 | 7, 9 | Draska → Draska | `confirmed` |
| `speech.H8` | 12 | 12–28 | 18, 20, 22, 24, 26 | Ivaí → Draska → Ivaí → Draska → Draska | `confirmed` |
| `selection.H8` | 12 | 29–37 | 35 | Draska | `provisional` |
| `party_full.H8` | 12 | 38–46 | 44 | Draska | `provisional` |
| `farewell.H1` | 41 | 190–197 | 195 | Gorvak | `confirmed` |
| `opinion.H1` | 41 | 199–206 | 204 | Gorvak | `confirmed` |
| `epilogue.H1` | 41 | 208–215 | 213 | Gorvak | `confirmed` |
| `farewell.H2` | 41 | 218–225 | 223 | Elowen | `confirmed` |
| `opinion.H2` | 41 | 227–234 | 232 | Elowen | `confirmed` |
| `epilogue.H2` | 41 | 236–243 | 241 | Elowen | `confirmed` |
| `farewell.H3` | 41 | 246–253 | 251 | Griznik | `confirmed` |
| `opinion.H3` | 41 | 255–262 | 260 | Griznik | `confirmed` |
| `epilogue.H3` | 41 | 264–271 | 269 | Griznik | `confirmed` |
| `farewell.H4` | 41 | 274–281 | 279 | Seraphina | `confirmed` |
| `opinion.H4` | 41 | 283–290 | 288 | Seraphina | `confirmed` |
| `epilogue.H4` | 41 | 292–299 | 297 | Seraphina | `confirmed` |
| `farewell.H5` | 41 | 302–309 | 307 | Bimbren | `confirmed` |
| `opinion.H5` | 41 | 311–318 | 316 | Bimbren | `confirmed` |
| `epilogue.H5` | 41 | 320–327 | 325 | Bimbren | `confirmed` |
| `farewell.H6` | 41 | 330–337 | 335 | Liora | `confirmed` |
| `opinion.H6` | 41 | 339–346 | 344 | Liora | `confirmed` |
| `epilogue.H6` | 41 | 348–355 | 353 | Liora | `confirmed` |
| `farewell.H7` | 41 | 358–365 | 363 | Vaelith | `confirmed` |
| `opinion.H7` | 41 | 367–374 | 372 | Vaelith | `confirmed` |
| `epilogue.H7` | 41 | 376–383 | 381 | Vaelith | `confirmed` |
| `farewell.H8` | 41 | 386–393 | 391 | Draska | `confirmed` |
| `opinion.H8` | 41 | 395–402 | 400 | Draska | `confirmed` |
| `epilogue.H8` | 41 | 404–411 | 409 | Draska | `confirmed` |
| `lover.physical.warning` | 49 | 8–15 | 13 | Pérola | `prototype_baseline` |
| `lover.physical.second` | 49 | 24–31 | 29 | Pérola | `prototype_baseline` |
| `lover.supernatural.warning` | 50 | 8–15 | 13 | Floraí | `prototype_baseline` |
| `lover.supernatural.second` | 50 | 24–31 | 29 | Floraí | `prototype_baseline` |
| `council.solo` | 54 | 32–39 | 37 | Ivaí | `prototype_baseline` |
| `council.confession` | 54 | 40–47 | 45 | Ivaí | `prototype_baseline` |
| `council.andira` | 54 | 48–55 | 53 | Andirá | `prototype_baseline` |

## Falas nomeadas que hoje não recebem busto

Ter nome no comando Mostrar texto não implica busto. Não expandir o escopo para estes trechos sem decisão explícita. Em especial, `ending.bad.02` integra o final de tela inteira; os limiares e o prólogo são cenas diferentes dos diálogos já cobertos.

| Seção | CE / índice 101 | Falante | Motivo no código |
| --- | --- | --- | --- |
| `prologue.02` | 1 / 14 | Ivaí | Fase fora da condição que chama speakerBust |
| `threshold.physical.01` | 29 / 7 | Ivaí | Fase fora da condição que chama speakerBust |
| `threshold.supernatural.01` | 29 / 17 | Ivaí | Fase fora da condição que chama speakerBust |
| `threshold.final.01` | 29 / 27 | Ivaí | Fase fora da condição que chama speakerBust |
| `map.reveal.02` | 52 / 13 | Ivaí | Cena map.reveal explicitamente excluída da condição de descoberta |
| `ending.bad.02` | 57 / 13 | Andirá | Fase fora da condição que chama speakerBust |

## Imagens que não são diálogos com bustos

- CE 38 mostra os heróis da seleção por Show Picture (IDs 10–17); PictureChoices e ChoiceCmnEvts cuidam dos alvos/foco. CE 45 anima ausências. Não são falas.
- CE 43 mostra de um a três candidatos ao sacrifício (IDs 10–12). A despedida posterior é um diálogo coberto; a seleção anterior não é.
- CE 59/60 montam a animação do memorial e os retratos das lápides por imagens nativas, com recortes de EventBridge. O GDD exige essa apresentação nativa. Mantê-la.
- Sucesso, descrição/releitura de encontro, morte contextual após despedida, recebimento das peças, montagem do mapa, finais, narrações e créditos não ganham bustos por esta migração.
- CE 3 índices 21/24 apresenta “Vivo/Viva · No/Fora do grupo” fora de Present, depois de Observe:formation já limpar o busto. Preservar esse retorno atual.

## Assets já existentes

Todos ficam em `rpg-maker/The Dryland Drowned/img/pictures/Dryland_<id>.png`. Hashes em source-evidence.json. Escalas abaixo transcrevem o cálculo atual, sem aprovação de novo layout.

| ID | PNG (px) | Escala atual (%) |
| --- | --- | ---: |
| H1 | 1584 × 1986 | 50.3524672709 |
| H2 | 2160 × 3840 | 26.0416666667 |
| H3 | 1358 × 2147 | 46.5766185375 |
| H4 | 2160 × 3840 | 26.0416666667 |
| H5 | 1494 × 2354 | 42.4808836024 |
| H6 | 1552 × 2397 | 41.7188151856 |
| H7 | 2160 × 3840 | 26.0416666667 |
| H8 | 1264 × 2136 | 46.8164794007 |
| ivai | 1024 × 1536 | 65.1041666667 |
| perola | 1024 × 1536 | 65.1041666667 |
| florai | 1024 × 1536 | 65.1041666667 |
| andira | 1024 × 1536 | 31.2500000000 |

## Alterações necessárias se a autoria passar aos eventos

- Autorizar no parser somente o subconjunto de comandos VNPictureBusts contratado, com argumentos literais validados. Hoje códigos 357/657 são recusados dentro das faixas. Não basta inserir comandos no editor.
- Inserir entrada/escala/posição e troca nos 63 trechos inventariados, distinguindo as 103 caixas e os falantes reais; manter texto, metadados, escolhas e checkpoints.
- Remover a seleção automática de bustos pelo nome/fase no alias de command101 depois da migração completa; manter apenas infraestrutura necessária à execução, carga e limpeza. Não manter duas autoridades de apresentação concorrentes.
- Tratar conclusão normal, pulo de lidos, troca de mapa, retorno à formação, título e Continue. Uma saída escrita apenas no fim da seção não cobre o pulo de texto.
- Preservar imagens nativas que não são falas, atualizar revisão do manifesto após mudar dados, adaptar os testes nas suítes existentes e documentar a autoria no README.

## Limites e autoridade

O GDD canônico rege a apresentação; a solicitação atual confirma o uso do plugin para todos os diálogos com bustos. As specs concluídas em `.compozy/tasks/init-rpg-maker-mz/` foram consultadas apenas como histórico local ignorado pelo Git; este inventário transcreve os fatos necessários para não exigir esse acervo num clone novo.

Nenhuma falha visual foi reproduzida e nenhum bug novo foi registrado. Possíveis riscos do callback assíncrono e da limpeza devem ser testados na implementação; não são defeitos confirmados. A CLI de conteúdo atual passou; isso não verifica a futura migração nem o comportamento do plugin no Chrome.
