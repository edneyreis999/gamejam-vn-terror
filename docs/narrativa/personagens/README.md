# Personagens — fichas descritivas

Este diretório reúne **17 fichas para 16 personagens**, com Rheed jovem e velho como duas fases da mesma pessoa. É a fonte corrente de caracterização para escrever e revisar novas falas. O [GDD](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md) continua sendo a autoridade sobre mundo, trama e mecânicas; o livro do dono ancora a identidade de Rheed velho. A decisão de recriar as vozes está registrada no [GDDR-008](../../gddrs/gddr-008-recriacao-das-vozes-e-continuidade-de-rheed.md).

## Estado da entrega

### Contrato P1 e referências regionais — 17/11/2026

**Reviewed — revisão documental independente concluída; aceite humano das propostas regionais pendente.** O contrato de P1 está confirmado pelo dono no [GDD §14.1](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#141-comunicação-das-competências-e-contrato-de-p1). A referência de linguagem brasileira regional passa a integrar cada retrato, combinada com personalidade, relação e contexto. Não estabelece origem brasileira, estereótipo, vocabulário obrigatório ou roteiro de fala. Regiões podem se repetir; Rheed permanece a mesma pessoa nas duas idades.

Bimbren tem referência nordestina confirmada, sem estado ou cidade fixados, cortesia no primeiro contato e confiança ao falar do ofício. As outras 16 fichas contêm **Propostas editoriais**, até aceite humano: são 15 escolhas para pessoas distintas, pois Rheed tem duas fichas. O [racional regional e seus limites](pesquisa.md#referências-regionais--propostas-de-17112026) registra a pesquisa independente e a aplicação editorial. Esta rodada tem parecer próprio, sem herdar o Reviewed da síntese anterior. Redação de P1, P2/P3 e integração no jogo não fazem parte desta atualização de fontes.

A revisão de 17/11/2026, sessão `sess-ba83f0413b6fefd4`, concluiu **Reviewed**, sem achados materiais, para os 33 arquivos do snapshot SHA-256 `a6d4a98fcdb235e66e78e6bc508a6b93ac10fce4ce9ae94a63f1715d9f3d034f`. O parecer local está em `.artifacts/wl-20261117-02/revisor.md`, SHA-256 `2aa9cc85f261fd7abb76a652e3bba8e1c96c29d549b329d9140a9ab8d18b7e9d`. Esta anotação e o fechamento na comparação são posteriores ao snapshot e não integram o parecer. A revisão não aceita as regiões propostas em nome do dono, não comprova eficácia em cena e não ativa a skill candidata.

### Histórico — síntese descritiva de 17/11/2026

**Reviewed — revisão documental independente concluída; aceite editorial humano pendente.** A direção humana aprovada pede fichas enxutas, predominantemente em prosa, sobre quem é cada pessoa e o que a distingue. As 17 fichas preservam identidade, competências, acontecimentos relevantes e relações; retiram exemplos de fala, exercícios, vocabulário obrigatório e fórmulas de reação ou sintaxe. Aprovar essa direção e a síntese de referência de Bimbren não aprova antecipadamente estas 17 novas redações.

A revisão de 17/11/2026, sessão `sess-f2e1a72ec9f21305`, abrange os cinco arquivos da skill candidata, as 17 fichas e os três auxiliares, sem problema demonstrado em aberto. O snapshot revisado tem agregado SHA-256 `99aa58e795e3c54cf9c2ed2ed0451f1c7dd026181a930dcd45de83402210764b`; o parecer local está em `.artifacts/wl-20261117-01/revisor.md`, SHA-256 `fcd1fe0c4bc135a41df24af255169227883b602897e3310062c5833e3428b8a9`. Esta anotação e a atualização de estado na comparação foram acrescentadas depois do snapshot e não integram o parecer. A revisão não estabelece aceite humano das novas redações, eficácia em diálogo ou ativação da skill candidata pelo catálogo.

A base editorial desta síntese é `70028a1ed46ccb9502815de49d6bdf8fe00f2f91`, que inclui a revisão de 16/11 e os refinamentos atuais de Bimbren. **Criação** identifica caracterização autoral preservada dessa base; não a promove a fato do GDD, da arte ou do livro. As notas de origem de cada ficha distinguem essas fontes. Idades, encontros, aparência e outros dados não estabelecidos continuam abertos; não é necessário completá-los para usar o retrato.

A [comparação](comparacao-vozes.md) descreve diferenças entre pessoas. A [pesquisa](pesquisa.md) conserva fontes e proveniência histórica, inclusive o formato antigo que foi substituído. O GDDR-008 registra a decisão e o formato de sua época; suas exigências de campos e exercícios cedem à direção humana de 17/11 nesta revisão. O GDD continua governando mundo, trama e regras. Nenhuma fala, evento, asset ou regra do runtime foi alterada. Esta entrega não comprova eficácia em cena, playtest ou qualificação técnica do jogo.

### Histórico — 14/11/2026

Estado daquela entrega, sem extensão à síntese de 17/11:

| Dimensão | Estado e limite |
| --- | --- |
| Direção criativa e mudança de autoridade | **Confirmado** pelo dono; não aprova automaticamente cada criação da ficha. |
| Autoria | **Concluída:** 17 fichas e comparação, com os reparos solicitados na revisão. |
| Revisão independente do conteúdo | **Reviewed** em 14/11/2026; sem achados substantivos ou verificações de fonte necessárias em aberto. |
| Aceite editorial humano | **Pendente**, com Edney. Não há aceite de efeito emocional por playtest. |
| Integração das novas vozes no jogo | **Não realizada**. `Languages.tsv`, eventos, arte e mecânicas permanecem inalterados por esta entrega documental. |

A revisão documental independente avaliou fidelidade, aplicabilidade, variação/identidade, naturalidade e economia no conteúdo do commit `9c8fe7a4ba774e376f5e6930d350ce0d056a0775`. Esse parecer não abrange os metadados de status acrescentados depois daquela revisão, não comprova reconhecimento cego ou efeito emocional em playtest e não qualifica o runtime. A conferência desses metadados e a verificação final da entrega permanecem separadas.

### Histórico — revisão de naturalidade de 16/11/2026

Correção delimitada das 17 fichas, sem recriar biografias: os exemplos e as direções de fala passam a explicitar referentes, situação e relação com o interlocutor. A comparação daquela revisão acompanhava os exercícios então correntes; esse conjunto permanece no Git, conforme o histórico em [comparação](comparacao-vozes.md). A revisão preserva citações, competências, vínculos, conselhos fixos e distinções entre as fases de Rheed. Gorvak incorpora os refinamentos autorais já autorizados no piloto `241680ac71ba2061ac7b477586cad29f5579d570`, com origem **Criação**.

- **Pesquisa independente:** concluída, sessão `sess-012f11e2341cb943`.
- **Revisão independente desta correção:** **Reviewed** em 16/11/2026, sessão `sess-f33050a5a9442ab0`, após resolução dos três achados. O parecer cobre as 17 fichas e a comparação daquela revisão; seu objeto completo tem agregado SHA-256 `f25b24099b84aeca68d269ffc07355d8ed885804ffca189d4de0b40a09a27129`. Esta anotação de fechamento é posterior ao parecer e não integra o objeto revisado. O estado histórico de 14/11 conserva seu próprio escopo.
- **Aceite editorial humano:** **Aceito** por Edney em 16/11/2026, por confirmação explícita na sessão `sess-f33050a5a9442ab0`, para as 17 fichas desta revisão. O aceite foi registrado depois do parecer independente. Não houve experimento de cena, playtest ou integração no runtime nesta revisão; esses resultados mantêm validação própria.

As falas atualmente jogáveis conservam os estados de implementação e aceite de seus incrementos. São a baseline de runtime a adaptar em trabalho posterior, não restrições criativas sobre a nova caracterização. Os antigos exemplos eram exercícios e não estabeleceram cenas, encontros entre épocas, ressurreições, poderes ou consequências mecânicas.

## Heróis recrutáveis

**Matriz de competências para autoria:** cada P1 deve mostrar motivação e contribuição, nomear e destacar exatamente as duas competências canônicas do herói e demonstrá-las segundo o GDD §8.2. A exceção de exposição dos nomes vale somente para P1 (§14.1); opções das armadilhas e demais superfícies continuam sem nomes. Competência não se torna personalidade ou bordão.

| ID | Ficha | Competências preservadas |
| --- | --- | --- |
| H1 | [Gorvak](gorvak.md) | Força + Vontade |
| H2 | [Elowen](elowen.md) | Destreza + Atletismo |
| H3 | [Griznik](griznik.md) | Percepção + Sobrevivência |
| H4 | [Seraphina](seraphina.md) | Conhecimento + Ocultismo |
| H5 | [Bimbren](bimbren.md) | Força + Conhecimento |
| H6 | [Liora](liora.md) | Destreza + Percepção |
| H7 | [Vaelith](vaelith.md) | Ocultismo + Atletismo |
| H8 | [Draska](draska.md) | Vontade + Sobrevivência |

## Figuras da história e narrador

| Ficha | Função preservada |
| --- | --- |
| [Ivaí](ivai.md) | Reúne a expedição, omite a maldição e chega à confissão e à escolha do jogador. |
| [Andirá](andira.md) | Entidade aquática, limitada pelas regras do medalhão e pela verdade literal de suas falas. |
| [Floraí](florai.md) | Amante preso na figueira; entrega a peça élfica do mapa. |
| [Pérola](perola.md) | Amante presa na pedra; entrega a peça anã do mapa. |
| [Irati](irati.md) | Mãe de Ivaí, falecida; deixou registros e o aviso de não envolver outras pessoas. |
| [Palotina](palotina.md) | Criou o medalhão; seu registro esclarece os dois resultados. |
| [Tibagi](tibagi.md) | Irmão de Pérola; tentou tomar o medalhão e escondeu uma metade. |
| [Rheed jovem](rheed-jovem.md) | Ajudante e testemunha da expedição, fora das vagas e do sacrifício. |
| [Rheed velho](rheed-velho.md) | O mesmo Theodor Rheed do livro; conta suas próprias memórias na praça de Daratrine. |

## Escrever e comparar

1. Leia o retrato e suas notas de origem. A caracterização ajuda a compreender a pessoa; a situação, o interlocutor e a intenção imediata orientam uma nova cena. Um detalhe da ficha não precisa aparecer em toda conversa.
2. Use a [comparação](comparacao-vozes.md) para perceber diferenças de motivação e relação, sem procurar réplicas prontas.
3. Consulte a [pesquisa](pesquisa.md) para rastrear livro, arte e cenas externas. Seus exemplos e prescrições antigos são histórico, não material obrigatório para os escritores.
4. Volte às [regras de personagens e participação](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#18-heróis-e-conteúdo-de-personagem) antes de escrever uma cena. Os oito pares, as posições no Conselho, a ordem dos vivos presentes e as regras de perda permanecem fixos. Nos P1, aplicar a exceção de nomeação e destaque da seção 14.1, sem transformar competências em rótulos de personalidade; nas armadilhas, manter as ações sem nomes de competências.

Os heróis entram sob promessa de tesouro, desconhecem inicialmente a maldição e o plano de Ivaí e só deixam o elenco pela morte prevista. Motivações, equipamento e relações não acrescentam habilidades nem alteram essas regras. No Conselho, os vivos presentes aconselham em ordem H1–H8, sem votação; a decisão é do jogador. Rheed continua ajudante/testemunha, sem vaga nem sacrifício. As fichas não criam arcos para pares adicionais ou conhecimento de acontecimentos não presenciados.

O público pretendido é 18+, conforme a direção vigente no [GDD canônico, §3.5](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#35-público-idioma-e-duração). Terror psicológico, mundo sem humanos e arte existente são limites preservados. Personalidade pode contrastar com aparência. Nem todos precisam xingar, falar de trauma ou soar cínicos; o uso ou a ausência de palavrões depende de personagem, interlocutor e situação.

## Migração das fontes antigas

A consolidação local retirou 27 documentos: os 19 de `planos/005-refactor-narracao/ficha-personagens/` (17 fichas, índice e comparação) e as oito fichas `docs/narrativa/herois/Ficha_H*.md`. Na publicação, somente as oito fichas H1–H8 são retiradas; os outros 19 documentos não fazem parte do histórico público. As fichas do primeiro conjunto correspondem aos mesmos nomes de arquivo neste diretório; as antigas H1–H8 correspondem à tabela de heróis acima. Não manter cópias de compatibilidade como autoridades paralelas.

As oito fichas H1–H8 podem ser consultadas no histórico público. Por exemplo: `git show a49bb999f8c2905112ab536169b0f60c0adf4510:docs/narrativa/herois/Ficha_H1_Gorvak.md`. Para outra ficha, substitua o nome do arquivo pelo correspondente H1–H8. Os 19 documentos da coleção anterior permanecem apenas no arquivo local privado; sua consulta exige acesso a esse arquivo, não disponível no histórico publicado.

Specs concluídas, QA e referências visuais históricas conservam suas citações daquela época; uma referência histórica não manda restaurar a ficha retirada. A antiga antologia `# Falas de cada herói.md`, já removida antes deste incremento, tampouco deve ser recriada como fonte atual.

O modelo modificado e o livro fornecidos pelo dono permanecem insumos pessoais preservados, identificados na pesquisa. Sua preservação não mantém a antiga pasta de fichas como destino de autoria. Esta migração documental não altera os diálogos implementados nem encerra os aceites pendentes.
