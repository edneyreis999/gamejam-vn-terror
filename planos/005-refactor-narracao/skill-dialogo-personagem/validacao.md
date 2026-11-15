# Validação de criar-dialogo

**Concluída em 2026-11-13.** Versão final v4: [skill](criar-dialogo/SKILL.md), 33 linhas, 310 palavras, oito perguntas e dois passos. O pacote promovível contém somente `criar-dialogo/SKILL.md`. A promoção a `.agents` fica com o usuário.

Oito agentes novos produziram oito tentativas na validação inicial. A v4 passou na Cidade Alta, na despedida e na transferência junto à Fonte, sem mudança entre essas três execuções. As comparações são julgamentos editoriais contra os recortes originais, nos cinco critérios abaixo. As duas cenas extensas e a cena breve usam Ghork e Lala.

Extensões solicitadas depois: [Ghork e Grukag na taverna](validacao-taverna.md), aprovada na primeira tentativa, e [Lala e Dam — plano da Horda](validacao-plano-horda.md), aprovada na segunda. Ambas usam a mesma v4. São cinco cenas aprovadas com três pares de personagens; o histórico das oito tentativas iniciais permanece abaixo, e as três tentativas adicionais estão nos registros próprios.

O usuário iniciou depois a [parte 2 — cenas inéditas](validacao-cenas-ineditas.md), começando por Lala e Dam comprando tecido. Essa etapa testa criação livre a partir de uma situação nova, sem um diálogo original para comparação.

## Contrato e critério fixados antes da primeira geração

Criar uma skill breve e reutilizável para diálogos entre dois personagens. Perguntas internas orientam a composição; lacunas factuais são perguntadas. Regras podem ser removidas ou flexibilizadas. A pasta solicitada foi preservada literalmente; `criar-dialogo/` é o pacote promovível, e este registro e `rodadas/` ficam fora dele. A promoção a `.agents` pertence ao usuário.

O autor de cada tentativa será um agente novo, com `fork_turns=none`, restrito ao pacote de entrada explicitamente indicado. Não receberá o livro, críticas de rodadas anteriores ou a conversa do usuário. Receberá skill, duas fichas preparadas para teste e um pedido de criar diálogo. O coordenador responderá suas perguntas com informações do livro, em paráfrase factual, sem falas ou roteiro de réplicas. Nas repetições da mesma cena, o pacote incluirá as respostas já coletadas. Isolamento de contexto e leituras autorizadas; não se afirma isolamento do sistema de arquivos compartilhado.

Comparação editorial pelo coordenador, após o autor declarar o diálogo pronto, contra o recorte original. Cinco critérios: (1) vozes reconhecíveis sem virar caricatura; (2) naturalidade e clareza no contexto; (3) progressão e função dramática preservadas; (4) subtexto e relação sustentados por falas e ações; (5) detalhes concretos relevantes, com riqueza pelo menos equivalente à cena de referência. Extensão por si só não melhora o resultado. Uma perda material em qualquer critério exige nova tentativa; preferências pequenas de redação serão registradas sem exigir imitação.

Cada reprovação distinguirá falta de informação, falta/problema de diretriz e uso inadequado de informação já fornecida. Perguntas sanitizadas serão consolidadas na skill. O fechamento exige duas cenas diferentes aprovadas com agentes novos usando a mesma versão final; se a segunda exigir mudança, ela vira desenvolvimento e uma terceira cena ainda não usada nas mudanças testa a transferência. As cenas anteriores afetadas serão rechecadas.

## Fontes e separação

Livro local: `../livro-ghork/`, transcrição existente de *Ghork e a Prova de Fogo*. Fichas aprovadas: `../skill-criacao-ficha-personagem/rodadas/{ghork,lala,drull}-v6-ficha.md`; aprovação registrada em `revalidacao-v6.md` nessa pasta. Os originais serão preservados.

Primeira cena: capítulo 22, desde a chegada de Ghork e Lala à rua de casas luxuosas até Lala embarcar na plataforma. A preparação das fichas exclui todas as citações e o encadeamento desse recorte e da despedida do capítulo 27, reservada para transferência. Amostras de fala vêm de outras cenas. A ficha de teste é um recorte para este experimento, não uma substituição das fichas aprovadas.

## Rodadas

| Rodada | Agente | Entrada | Resultado |
| --- | --- | --- | --- |
| 01 — Cidade Alta, v1 | `/root/dialogo_cidade_v1` | Skill, fichas, entrevista com 4 perguntas | Reprovada: repetição e compromisso futuro acrescido. Ver `rodadas/01-cidade-v1/comparacao.md`. |
| 02 — Cidade Alta, v2 | `/root/dialogo_cidade_v2` | Skill revisada, mesmas fichas e respostas, margem criativa explicitada | Aprovada nos cinco critérios. Ver `rodadas/02-cidade-v2/comparacao.md`. |
| 03 — Despedida, v2 | `/root/dialogo_despedida_v2` | Mesma skill v2, fichas e entrevista nova | Reprovada: amostra de fala mal aplicada e obstáculo removido. Ver `rodadas/03-despedida-v2/comparacao.md`. |
| 04 — Cidade Alta, v3 | `/root/autor04` | Skill v3, ficha de teste reequilibrada e mesmo brief da rodada 02 | Aprovada. Ver `rodadas/04-cidade-v3/comparacao.md`. |
| 05 — Despedida, v3 | `/root/autor05` | Skill v3, ficha de teste reequilibrada e brief com obstáculo financeiro explícito | Reprovada: estado atual de Ghork ainda mal capturado. Ver `rodadas/05-despedida-v3/comparacao.md`. |
| 06 — Cidade Alta, v4 | `/root/autor06` | Skill v4, mesma ficha de teste v2, respostas e estado atual explícito | Aprovada. Ver `rodadas/06-cidade-v4/comparacao.md`. |
| 07 — Despedida, v4 | `/root/autor07` | Skill v4, mesma ficha de teste v2, respostas e estado atual explícito | Aprovada. Ver `rodadas/07-despedida-v4/comparacao.md`. |
| 08 — Fonte, v4 | `/root/autor08` | Skill v4, mesma ficha de teste v2 e entrevista nova, sem acesso a rodadas anteriores | Aprovada. Ver `rodadas/08-transferencia-v4/comparacao.md`. |

Na v2, uma pergunta sobre margem criativa e duas diretrizes sobre extensão das falas, continuidade e repetição substituíram uma revisão genérica. Essa versão tinha 293 palavras, incluindo metadados e títulos. Não ganhou template de falas: isso imporia forma sem necessidade observada.

Na v3, a escrita passa a orientar o uso das fichas conforme interlocutor/momento e a preservação dos obstáculos combinados. 304 palavras; mesmo número de linhas. A cópia de ficha `fichas-ghork-lala-v2.md` restaura duas amostras de confiança exagerada do Ghork, dos capítulos 02 e 03, já presentes na ficha aprovada. O arquivo de teste anterior continua preservado. As rodadas 04 e 05 são independentes, por isso executadas em paralelo; cada uma tem autor novo e arquivos de entrada próprios. Nenhum agente revisa ou escreve o texto do outro.

Na v4, seis palavras na pergunta de continuidade tornam explícito o estado de chegada: “Como cada um chega à conversa?”. O questionário continua com oito itens; skill com 310 palavras. A correção responde à insuficiência do briefing: fatos do passado e exemplos gerais não determinam sozinhos a voz no presente. As respostas das duas cenas detalham esse instante com comportamentos observáveis. Repetições 06 e 07 também independentes e em paralelo. Durante esses ajustes, a Fonte permaneceu reservada, sem geração ou ajuste específico.

Primeira transferência tentada: capítulo 27, despedida de Ghork e Lala. A inspeção do recorte inicialmente reservado (só a entrega do colar) revelou apenas quatro falas e 138 palavras. Antes de iniciar o teste, o recorte foi ampliado: da chegada de Lala à saída de Ghork na carroça. A referência é uma cena coletiva; o teste adapta a conversa dos dois, preservando os demais como presenças e ações narradas, sem lhes escrever falas. Abrange tentativa de impedir a viagem, ferimento e desigualdade de recursos, despedida e explicação do colar. Nessa primeira execução foi usada a v2 sem ajuste prévio dirigido a essa cena.

Após a reprovação da rodada 03, a despedida deixou de ser transferência e passou a desenvolvimento. A nova transferência reservada para depois das repetições é a conversa junto à Fonte no capítulo 22, desde a observação da limpeza até seguirem caminho. É uma cena curta, deliberadamente sem disputa entre os amigos: verifica se o questionário permite um encontro simples sem fabricar confronto, segredo ou mudança de poder. A Fonte não entrou nos briefs anteriores, nas fichas preparadas nem nas diretrizes. A cena completa da Cidade Alta e a despedida precisam passar também na versão final; a cena curta não as substitui.

## Perguntas e diretrizes consolidadas

As entrevistas originais estão nas rodadas 01, 03 e 08. Suas perguntas sanitizadas foram conferidas contra a lista geral da skill; itens equivalentes foram consolidados, sem instalar nomes de personagens, locais, objetos ou respostas do livro no pacote. As repetições receberam as respostas já reunidas, nos respectivos `respostas.md`.

As duas adições ao questionário vieram do diagnóstico editorial e estão identificadas como tal: margem de invenção (v2) e estado de chegada (v4). Não foram atribuídas retroativamente aos agentes. As diretrizes acrescentadas tratam de repetição sem efeito, variação de extensão conforme a voz, uso contextual das fichas e preservação dos obstáculos combinados. As restrições da base sobre verbo em cada fala e leitura isolada da réplica foram removidas desde a v1. Nenhum template foi necessário.

## Verificação de fechamento

| Requisito | Evidência e resultado |
| --- | --- |
| Skill breve na pasta solicitada | `criar-dialogo/SKILL.md`, 33 linhas/310 palavras; caminho solicitado preservado literalmente, inclusive `persoangem`. |
| Perguntas internas e entrevista de lacunas | Passo 1 da skill; entrevistas 01, 03 e 08 com perguntas efetivas e respostas completas. Planejamento interno não foi solicitado como saída. |
| Diretrizes reutilizáveis e liberdade de escrita | Passo 2; sem personagens ou trechos da referência no pacote, sem limites de palavras por fala, proibição de fragmentos ou roteiro de turnos. |
| Agentes novos sem contexto do livro | Oito invocações com `fork_turns=none`; entradas limitadas nos prompts a skill, fichas de teste e respostas da entrevista. Contexto não compartilhado; sistema de arquivos compartilhado, sem alegação de sandbox físico. |
| Fichas sem a cena avaliada | Cópias de teste retiram cenas da Fonte, Cidade Alta e despedida; os originais aprovados permanecem preservados. As duas amostras restauradas vêm dos capítulos 02 e 03. |
| Perguntas respondidas e sanitizadas | Mapeamentos nos três `entrevista.md`; nenhuma pergunta factual ficou pendente. |
| Comparação posterior à entrega | Oito `dialogo.md` e oito `comparacao.md`, cada avaliação feita depois de `DIÁLOGO PRONTO`; falhas mantidas no histórico. |
| Refinamento de informação e de uso da informação | Comparações 01, 03 e 05 distinguem continuidade, aplicação de amostra, recorte de ficha e estado atual. Quatro versões preservadas nas rodadas. |
| Fase 1 e repetições aprovadas na versão final | Rodadas 06 e 07, cinco critérios avaliados individualmente. |
| Transferência a outra cena sem novo ajuste | Rodada 08, Fonte, entrevista nova e aprovação; mesma v4 das rodadas 06 e 07. |
| Estrutura e metadados | Auditoria item a item em `auditoria-writing-skills.md`; validador exit 0. Pacote com um único arquivo. |
| Promoção reservada ao usuário | Nenhum arquivo instalado em `.agents`; entrega restrita ao laboratório solicitado. |

SHA-256 da v4: `fb7128b2c442f21b85fe21a53ce0e623afac0c1e59b71ea50e94a7679dc5b7e3`. Conferência final executada: o pacote e as cópias lidas nas rodadas 06, 07 e 08 correspondem byte a byte; oito diálogos, oito comparações e todas as entradas estão preservados; os 29 itens da auditoria estrutural têm Pass. Nenhum dado específico do livro está no pacote. Resultados literários não são teste automatizado de superioridade: o coordenador aprovou os recortes, e o usuário pode ler os textos e os motivos.

Textos finais para leitura: [Cidade Alta](rodadas/06-cidade-v4/dialogo.md), [despedida](rodadas/07-despedida-v4/dialogo.md) e [Fonte](rodadas/08-transferencia-v4/dialogo.md). Avaliações correspondentes: [Cidade Alta](rodadas/06-cidade-v4/comparacao.md), [despedida](rodadas/07-despedida-v4/comparacao.md) e [Fonte](rodadas/08-transferencia-v4/comparacao.md).

**Estado final: fases 1 e 2 concluídas; skill pronta para a promoção pelo usuário.**
