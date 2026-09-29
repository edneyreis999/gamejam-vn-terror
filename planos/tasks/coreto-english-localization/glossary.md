---
status: in_progress
---

# Glossary — PT-BR / EN-US

The translation tasks fill in this list. Each term is used the same way in
every key. Change a term here first, then update every key that uses it.

## Rules

- Character names and folklore creature names stay as they are, with their
  accents (Ivaí, Andirá, Floraí, Boitatá). No translation, no transliteration.
- The approved title pair stays: “Afogados em Terra Seca” / “The Dryland
  Drowned”.
- Descriptive words around a name are translated consistently (for example a
  place type or a role).
- Domain identifiers (route/encounter IDs, symbols) are never translated.

## Terms

| PT-BR | EN-US | Kind | Notes | First key |
| --- | --- | --- | --- | --- |
| Geral | General | UI | Options category | ui.options.category.general |
| Idioma | Language | UI | Options row | ui.options.language |
| Efeitos de texto | Text Effects | UI | Options row for animated text | ui.options.text_effects |
| Áudio | Audio | UI | Options category | ui.options.category.audio |
| Música | Music | UI | Volume row | ui.options.audio.bgm |
| Ambiente | Ambience | UI | Volume row | ui.options.audio.bgs |
| Temas | Jingles | UI | Volume row for MZ “ME” stingers | ui.options.audio.me |
| Efeitos | Sound Effects | UI | Volume row | ui.options.audio.se |
| Configurações | Options | UI | Title entry and message-console button; the screen is the native Options scene | choice.title.options |
| Arquivo | File | UI | Save slot title | sys.file |
| Continuar | Continue | UI | Title entry | choice.title.continue |
| Novo jogo | New Game | UI | Title entry | choice.title.new_game |
| Jogar | Play | UI | Title entry with no save | choice.title.play |
| campanha | campaign | UI/narrative | One playthrough in one save file | ui.save.locked_slot |
| Selecionar / Voltar | Select / Back | UI | Button-assist hints | ui.assist.ok |
| morte permanente | permanent death | UI | Content warning; plain words preferred over “permadeath” | title.warning |
| Rheed, Ivaí, Irati | Rheed, Ivaí, Irati | Name | Preserved, with accents | prologue.tavern.rheed.1 |
| Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith, Draska | same | Name | The eight heroes; never keyed | — |
| Saci, Cuca, Mapinguari, Mula-sem-Cabeça, Corpo-Seco, Homem do Saco, Pisadeira, Matinta, Boitatá, Comadre Fulozinha, Loira do Banheiro, Iara, Rasga-Mortalha, Cabra-Cabriola | same | Folklore | Preserved; English uses “the” before the creature name, as Portuguese uses “o/a” (“The Mortar of the Cuca”); Comadre Fulozinha takes no article | enc.a1.name |
| Caminho da Igreja | The Church Path | Route | Route name | route.physical.name |
| Parque das Águas Assombradas | Haunted Waters Park | Route | Route name | route.supernatural.name |
| Vilarejo Partido | The Broken Village | Route | Route name; also inside prose | route.final.name |
| expedição | expedition | Narrative | The journey Ivaí organizes | prologue.tavern.rheed.1 |
| taverna | tavern | Narrative | The preparation hub | prologue.tavern.rheed.3 |
| peça (do mapa) | piece (of the map) | Narrative | The two map halves | campaign.irati_02_01.narrator |
| medalhão | medallion | Narrative | The family heirloom split in two | campaign.irati_02_01.narrator |
| os oito | the eight | Narrative | The hired heroes as a group | prologue.tavern.rheed.3 |
| mestre | master | Narrative | Rheed's form of address for Ivaí | prologue.tavern.rheed.7 |
| Destinos | Destinations | UI | Tavern menu entry and panel heading | choice.tavern.destinations |
| Elenco | Cast | UI | Tavern menu entry and list heading | choice.tavern.cast |
| Partir | Depart | UI | Starts the expedition | choice.tavern.depart |
| Grupo | Party | UI | The selected heroes | ui.tavern.party |
| Encontro | Encounter | UI | One trap scene on a route | ui.encounter.label |
| Recuar | Retreat | UI | Leave the route and return to the tavern | choice.encounter.retreat |
| Disponível / Selecionado / Bloqueado / Concluído | Available / Selected / Locked / Completed | UI | Destination status | dest.status.available |
| Presente / Morto / No grupo | Present / Dead / In party | UI | Cast status | cast.status.present |
| Pérola, Floraí, Andirá | same | Name | Pérola (dwarf, she), Floraí (elf, he), Andirá (she) | lover.physical.narrator |
| armadilha | trap | Narrative | Each encounter is a trap | enc.a1.intro.3 |
| abordagem | approach | UI/narrative | One of the three ways to face an encounter | choice.a1.approach_1 |
| grupo | group | Narrative | The party inside encounters (UI label is “Party”) | enc.a1.intro.2 |
| heróis | heroes | Narrative | The eight mercenaries | death.a1.context |
| presença | presence | Narrative | Unseen supernatural entity | enc.b1.intro.2 |
| encantamento / feitiço | spell | Narrative | Both render as “spell” | choice.b4.approach_2 |
| cobrança | demand / debt | Narrative | B4: the false promise being collected | enc.b4.intro.2 |
| presságio | omen | Narrative | B7: the death foretold on the shroud | death.b7.context |
| mortalha | shroud | Narrative | B7 (Rasga-Mortalha stays a name) | death.b7.context |
| pilão / socador | mortar / pestle | Narrative | A3 | enc.a3.intro.1 |
| peça anã / élfica | dwarven / elven piece | Narrative | The two map halves | reward.physical.narrator |
| Sacrificar | Sacrifice | UI | Sacrifice button | choice.sacrifice |
| Rever descrição | Reread description | UI | Encounter button | choice.encounter.reread |
| Continuar expedição | Continue the expedition | UI | Cancels a retreat | choice.retreat.continue |
| medalhão (reunir / destruir) | medallion (restore / destroy) | Narrative | The final choice; “Reunir” renders as “Restore” everywhere | council.choice.restore |
| juramento | oath | Narrative | The lovers' bond | council.seraphina.2 |
| maldição da linhagem | your bloodline's curse | Narrative | Ivaí's family curse | council.griznik.2 |
| amantes | the lovers | Narrative | Pérola and Floraí | council.rheed.2 |
| bardo | bard | Narrative | Ivaí | council.rheed.2 |
| Casa do Conselho | the Council House | Place | Final location | threshold.final.ivai |
| Palotina | Palotina | Name | Record's origin; preserved | council.rheed.1 |
| casa de cura | house of healing | Narrative | Seraphina's goal | conv.seraphina.why |
| Selecionar / Retirar do grupo | Select / Remove from party | UI | Conversation choice held in `V153` | conv.select |
| Conversar / Voltar à taverna | Talk / Back to the tavern | UI | Conversation menu | choice.conv.talk |
| Pular créditos | Skip credits | UI | Credits hint | ui.credits.skip |
| lock of hair (B6) | strand of hair | Narrative | Avoids the mechanical “lock” reading (L15 F04) | enc.b6.intro.2 |
| anotações / trecho de Irati | Irati's note | Narrative | Written note; “passage” is reserved for paths (L15 F15) | council.irati.narrator |
