# QA dirigido — prólogo de Rheed

Plano da task 02, 2026-09-17. **Execução concluída no escopo aceito; ver resultado final abaixo.** [Spec](../../../planos/tasks/prologo-rheed/spec.md), [roteiro](../../../planos/tasks/prologo-rheed/prologo-rheed.narrativa.md) e [verificação](../../../planos/tasks/prologo-rheed/verification.md) são a autoridade independente. Este recorte substitui somente as instruções antigas de entrada/prólogo; não usa expeditionQA, setSeed, revisão de conteúdo ou saves fabricados.

## Entrada, ambiente e banco

- Ler [execução local](../../_memory/local-game-run.md); iniciar `npm start` na raiz. Origem padrão `http://127.0.0.1:18726/`. Confirmar conteúdo antes de reutilizar porta ocupada. Usar perfil de QA isolado, uma aba e arquivos novos; nunca sobrescrever saves pessoais. Outra porta implica outro armazenamento.
- Registrar HEAD, diff, hashes de Map002, Map003, CommonEvents, plugins.js, CampaignRules, Presentation, EventBridge, plugins VisuMZ usados e dos três PNGs. Registrar SO, Chrome, área efetiva do jogo, DPR, escala padrão, movimento, entrada e áudio. HEAD observado no planejamento: `3b5730495302e8676785e994421b3adfb4b82078`, com alterações locais; HEAD sozinho não identifica o candidato.
- Disponibilidade no planejamento: Windows/Chrome usados na task 01; mouse/teclado e viewports serão confirmados ao abrir a sessão. Audição/captura de saída e revisor humano ainda não confirmados. Registrar disponibilidade real antes de executar; ausência de sensor não é PASS.
- Variantes de apresentação A1–A4: 1280×720 normal, 1280×720 reduzido, 1920×1080 normal, 1920×1080 reduzido. Escala padrão, sem testes de zoom, conforme ADR-G003. Alternar mouse e teclado entre variantes; controles B1 devem usar ambos em cada estado de fala.
- Map002 evento 1 contém a abertura; Map003 é a preparação; Map037–044 são os heróis. Bustos: `Reed final` sozinho no slot 60; no diálogo final, `Reed-novo` no slot 60 à esquerda e `Dryland_ivai` no slot 61 à direita, com ligação explícita à mensagem. AttachedPictures ativo, lista automática vazia; VNPictureBusts ativo. Não modificar parâmetros, atores, switches ou variáveis durante inspeção.

| Fixture/entrada | Disponibilidade e obtenção | Uso |
| --- | --- | --- |
| PR-N novo | Criar pelo título, Jogar e arquivo vazio; checkpoint natural `new_campaign` antes da leitura | A/B/C; preservar origem, perfil, arquivo e metadados observados |
| PR-D partida | Após a abertura, selecionar três heróis elegíveis, destino e Partir pela UI; esperar gravação natural | B2/B3; Continue e retorno legal |
| PR-F formação atual | Estado alcançado pela leitura, **sem checkpoint próprio** ao terminar prólogo | Não chamar isso de save de formação; reload retoma o último checkpoint gravado |
| PR-OLD formação anterior | **Indisponível**: task 01 não capturou save anterior genuíno em formação | B4 excluído pelo usuário desta entrega, sem promessa de compatibilidade |

Se um acervo local contiver PR-OLD, aceitar somente cópia com origem, versão e ações de produção demonstráveis; usar perfil isolado compatível e preservar bytes. Não sintetizar offsets nem gerar um save num checkout antigo como se fosse evidência histórica. Saves antigos no meio do prólogo não têm migração prometida.

## Lotes retomáveis

Todos os lotes usam modo **directed-browser**, skill `rpg-maker-mz-qa-execution`; observação de objetos nativos é somente leitura. Evidência em `docs/qa/evidence/prologo-rheed/task-03/<lote>/`: manifesto do candidato/ambiente, ações ordenadas, observações, capturas, erros e veredito por variante. Cada lote termina com um registro do estado e checkpoint efetivamente disponível; em interrupção, retomar desse checkpoint ou refazer a entrada pública, nunca injetar estado.

### A — abertura e composição (S01; V-002/V-004)

Entrada PR-N nova por variante A1–A4. Ler N01–N06 à mão: N01 tem três caixas, N02 uma, N03 duas, N04–N06 uma cada. Comparar com o roteiro aprovado; a divisão em nove caixas é evidência da implementação, não autorização para alterar o texto.

Capturar N01, N02, N04, N05, N06 e primeira preparação. Esperado: caixa inferior legível; Rheed velho sozinho e fundo preto em N01–03; Rheed jovem à esquerda e Ivaí à direita sobre a taverna em N04–06, com o falante 10% maior. N05 usa nome Rheed. Sem ilustrações, nomes de destinos antecipados, explicação da maldição, falas dos oito ou reação final. Após reconhecer N06, uma transferência para a preparação, sem coda. Oito heróis disponíveis, Rheed fora do elenco selecionável.

Conclusão: todas as quatro variantes registradas, PR-F observado e imagens revisadas; parecer humano do enquadramento continua em C. Invalidação: texto/eventos, arte, geometria, plugins, engine, janela e configuração de apresentação.

### B — controles, persistência e retorno (S02, S03, S04; V-003)

1. **B1:** em PR-N, testar HIDE/restaurar e abrir/fechar Settings na narração, promessa de Ivaí e pergunta de Rheed jovem. Usar mouse e teclado; anotar ações reais do provider. Esperado: mesma caixa, nome e composição restaurados, sem avançar leitura. Tentar FAST em conteúdo ainda não lido: não deve pular as novas passagens. Observar conclusão semântica apenas após a última caixa de cada bloco; N01 não pode completar nas duas primeiras caixas. Repetir B1 em 1280 normal e 1920 reduzido; A cobre as outras combinações visuais.
2. **B2:** fechar e reabrir na mesma origem/perfil após início da leitura e, em outra tentativa, após alcançar PR-F. Usar Continuar no arquivo de QA. Esperado: retomar `new_campaign`, último checkpoint realmente gravado, não a caixa interrompida nem um save fictício da preparação. Completar o prólogo sem duplicar BEGIN, elenco ou transferência. Comparar metadados/payload apenas por leitura. Registrar separadamente texto já visto e posição restaurada.
3. **B3:** em PR-F, visitar um herói, conversar, voltar à taverna, selecionar grupo de três e um destino disponível, partir até PR-D. Reabrir e Continuar; prosseguir até uma oportunidade legal de recuo e escolhê-la. Esperado: preparação normal, sem prólogo repetido, bustos 60/61 residuais ou ligação à mensagem vazando para heróis; seleção e roster seguem as regras existentes. Se não houver recuo na tela atual, prosseguir por ações legais e registrar a rota, sem chamar transferência via console.
4. **B4 — fora do escopo:** saves anteriores foram excluídos pelo usuário. A comparação originalmente planejada não foi executada; uma entrega futura precisará de PR-OLD genuíno e rastreável.

Conclusão: ledger B1–4 individual, arquivo/origem/checkpoint de PR-D identificados e retorno observado. Invalidação: eventos Map002/003/heróis/encontros percorridos, leitura, regras, saves, provider de controles, plugins de mensagem/ligação. IT-004/014/025 são apoio técnico, não substituem essas entradas dirigidas.

### C — áudio e avaliação editorial (S05; V-004/V-005/V-006)

Entrada PR-N, título com áudio audível e volumes não nulos registrados. Ouvir/capturar título → nove caixas → preparação; repetir no Continue disponível de B2. Esperado: silêncio no prólogo, sem BGM/BGS/ME/SE autorados, e ambiência normal na preparação sem mudar volumes globais. Inspecionar estado de áudio apenas como complemento. Se não houver saída/captura audível, deixar V-005 pendente, mesmo que IT-029 passe.

Apresentar a abertura completa ao usuário em ritmo natural, sem FAST: solicitar avaliação de brevidade, tom coloquial e liberdade de interpretar a omissão. Solicitar também identidade/enquadramento de Rheed e Ivaí e confirmação auditiva. Fazer uma pergunta por vez, registrar resposta literal, data e candidato. Sem prazo rígido de duração; aprovação prévia do roteiro não é aceite da versão jogada.

Conclusão: gravação/observação auditiva e decisões humanas individuais, ou lacunas explícitas. Invalidação: áudio, texto, arte, composição e ritmo; alterações puramente documentais não invalidam gameplay.

## Retenção, bugs e encerramento

A task 01 registrou 64 casos técnicos aprovados em execução ampla mais reteste focal, não a suíte completa. `task-01/static.json`, `retained-results.json` e capturas são apoio local; revalidar hashes antes de reter. Não promover esses resultados para audição, parecer humano ou variantes ausentes. Relatórios antigos mantêm seu escopo.

Deduplicar sintomas em `docs/qa/bugs/`, especialmente retratos fora da tela e indicador de avanço cortado, antes de abrir registro. Encaminhamento por disciplina: texto → Narrativa; leitura/controles → UI/UX com Programação; imagem/enquadramento → Technical Art com Programação; save/transição → Programação. Este planejamento não cria cards de QA nem publica no Trello; não há defeito novo observado.

Ao terminar cada sessão, salvar evidências antes de fechar apenas processos/abas do executor; preservar perfil e saves de QA para retomada e não encerrar servidor de terceiros. Atualizar [relatório](../reports/2026-09-17-prologo-rheed.md), cenários e V-002–006 com sensores efetivamente usados. A task 03 aplica final-verify; não declarar entrega pronta com audição/aceites pendentes. Devlog sugerido: pergunta de Rheed jovem → resposta de Ivaí → preparação; preservar seleção final de capturas após aceite.


## Approved background refinement — historical intermediate state

Expected after the user’s Chrome/MZ review: black for the six older-Rheed boxes (N01–N03), existing `Dryland_Taverna` behind Ivaí and the young Rheed question (last three boxes, N04–N06). Portrait identity, text, silence and preparation transfer are unchanged. At that intermediate revision young Rheed still had no bust; the paired portrait refinement below supersedes this detail. Recheck the affected presentation and controls using the maintained directed case; prior captures are historical for this refinement.


## Paired portrait refinement

N01–N03: older Rheed alone, black. N04–N06: `Reed-novo` left and `Dryland_ivai` right, both visible over the tavern. Ivaí is 10% larger on N04/N06, young Rheed on N05. Neither portrait should overlap the text or the other portrait; bases remain aligned. HIDE and Settings restore both; preparation removes both and their attachments. Text/audio/reading identities remain unchanged. Earlier text-only expectations are historical.


## Final scope and result

Task 03 completed. The user explicitly excluded earlier-save compatibility and the two visual refinements (portrait fitting and older narrator backdrop), and confirmed prologue silence plus returning preparation ambience. Current-game/save scenarios passed. Earlier plan rows requiring old-save fixtures are superseded by this scope decision, not reported as tested. See the active verification contract for the consolidated acceptance and selected evidence.
