# Personagens — fichas de voz

Este diretório reúne **17 fichas para 16 personagens**, com Rheed jovem e velho como duas fases da mesma pessoa. É a fonte corrente de caracterização para escrever e revisar novas falas. O [GDD](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md) continua sendo a autoridade sobre mundo, trama e mecânicas; o livro do dono ancora a identidade de Rheed velho. A decisão de recriar as vozes está registrada no [GDDR-008](../../gddrs/gddr-008-recriacao-das-vozes-e-continuidade-de-rheed.md).

## Estado da entrega

Estado em 14/11/2026:

| Dimensão | Estado e limite |
| --- | --- |
| Direção criativa e mudança de autoridade | **Confirmado** pelo dono; não aprova automaticamente cada criação da ficha. |
| Autoria | **Concluída:** 17 fichas e comparação, com os reparos solicitados na revisão. |
| Revisão independente do conteúdo | **Reviewed** em 14/11/2026; sem achados substantivos ou verificações de fonte necessárias em aberto. |
| Aceite editorial humano | **Pendente**, com Edney. Não há aceite de efeito emocional por playtest. |
| Integração das novas vozes no jogo | **Não realizada**. `Languages.tsv`, eventos, arte e mecânicas permanecem inalterados por esta entrega documental. |

A revisão documental independente avaliou fidelidade, aplicabilidade, variação/identidade, naturalidade e economia no conteúdo do commit `9c8fe7a4ba774e376f5e6930d350ce0d056a0775`. Esse parecer não abrange os metadados de status acrescentados depois daquela revisão, não comprova reconhecimento cego ou efeito emocional em playtest e não qualifica o runtime. A conferência desses metadados e a verificação final da entrega permanecem separadas.

### Revisão de naturalidade — 16/11/2026

Correção delimitada das 17 fichas, sem recriar biografias: os exemplos e as direções de fala passam a explicitar referentes, situação e relação com o interlocutor. A [comparação](comparacao-vozes.md) acompanha os exercícios atuais. A revisão preserva citações, competências, vínculos, conselhos fixos e distinções entre as fases de Rheed. Gorvak incorpora os refinamentos autorais já autorizados no piloto `241680ac71ba2061ac7b477586cad29f5579d570`, com origem **Criação**.

- **Pesquisa independente:** concluída, sessão `sess-012f11e2341cb943`.
- **Revisão independente desta correção:** **Reviewed** em 16/11/2026, sessão `sess-f33050a5a9442ab0`, após resolução dos três achados. O parecer cobre as 17 fichas e a comparação correntes; seu objeto completo tem agregado SHA-256 `f25b24099b84aeca68d269ffc07355d8ed885804ffca189d4de0b40a09a27129`. Esta anotação de fechamento é posterior ao parecer e não integra o objeto revisado. O estado histórico de 14/11 conserva seu próprio escopo.
- **Aceite editorial humano:** **Aceito** por Edney em 16/11/2026, por confirmação explícita na sessão `sess-f33050a5a9442ab0`, para as 17 fichas desta revisão. O aceite foi registrado depois do parecer independente. Não houve experimento de cena, playtest ou integração no runtime nesta revisão; esses resultados mantêm validação própria.

As falas atualmente jogáveis conservam os estados de implementação e aceite de seus incrementos. São a baseline de runtime a adaptar em trabalho posterior, não restrições criativas sobre a nova caracterização. Exemplos das fichas são exercícios: não criam cenas, encontros entre épocas, ressurreições, poderes ou consequências mecânicas.

## Heróis recrutáveis

**Competências internas, somente para autoria:** não mostrar seus nomes nos diálogos ou na interface do jogador. Preservar a relação plausível entre competência e ação, sem transformar competência em personalidade ou bordão.

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

1. Leia a ficha e diferencie fatos do GDD/livro, observações da arte e **Criação**. A criação compatível é proposta autoral, não citação da fonte. Use a reserva, o humor e os hábitos de fala conforme a pergunta recebida; não transforme uma tendência em molde obrigatório de cada frase.
2. Consulte a [comparação de vozes](comparacao-vozes.md): seis situações comuns e uma mensagem neutra permitem comparar construção, ritmo e modo de responder. A comparação do autor não equivale a reconhecimento cego nem revisão independente.
3. Consulte a [pesquisa](pesquisa.md) para rastrear livro, arte e cenas externas, com fontes, hashes e limitações. Referências externas permanecem fora das fichas.
4. Volte às [regras de personagens e participação](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#18-heróis-e-conteúdo-de-personagem) antes de escrever uma cena. Os oito pares, os lados aconselhados no Conselho, a ordem dos vivos presentes e as regras de perda permanecem fixos; as interpretações interpessoais podem ser recriadas.

O público pretendido é 18+, conforme a direção vigente no [GDD canônico, §3.5](../../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#35-público-idioma-e-duração). Terror psicológico, mundo sem humanos e arte existente são limites preservados. Personalidade pode contrastar com aparência. Nem todos precisam xingar, falar de trauma ou soar cínicos; o uso ou a ausência de palavrões depende de personagem, interlocutor e situação.

## Migração das fontes antigas

A consolidação local retirou 27 documentos: os 19 de `planos/005-refactor-narracao/ficha-personagens/` (17 fichas, índice e comparação) e as oito fichas `docs/narrativa/herois/Ficha_H*.md`. Na publicação, somente as oito fichas H1–H8 são retiradas; os outros 19 documentos não fazem parte do histórico público. As fichas do primeiro conjunto correspondem aos mesmos nomes de arquivo neste diretório; as antigas H1–H8 correspondem à tabela de heróis acima. Não manter cópias de compatibilidade como autoridades paralelas.

As oito fichas H1–H8 podem ser consultadas no histórico público. Por exemplo: `git show a49bb999f8c2905112ab536169b0f60c0adf4510:docs/narrativa/herois/Ficha_H1_Gorvak.md`. Para outra ficha, substitua o nome do arquivo pelo correspondente H1–H8. Os 19 documentos da coleção anterior permanecem apenas no arquivo local privado; sua consulta exige acesso a esse arquivo, não disponível no histórico publicado.

Specs concluídas, QA e referências visuais históricas conservam suas citações daquela época; uma referência histórica não manda restaurar a ficha retirada. A antiga antologia `# Falas de cada herói.md`, já removida antes deste incremento, tampouco deve ser recriada como fonte atual.

O modelo modificado e o livro fornecidos pelo dono permanecem insumos pessoais preservados, identificados na pesquisa. Sua preservação não mantém a antiga pasta de fichas como destino de autoria. Esta migração documental não altera os diálogos implementados nem encerra os aceites pendentes.
