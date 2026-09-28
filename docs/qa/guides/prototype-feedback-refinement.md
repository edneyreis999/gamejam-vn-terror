# Refinamento do feedback — QA do candidato

Autoridade: [spec](../../../planos/tasks/prototype-feedback-refinement/spec.md), [sensores e cenários](../../../planos/tasks/prototype-feedback-refinement/verification.md), [task 13](../../../planos/tasks/prototype-feedback-refinement/task-13.md). Operador: Codex. As personas orientam a exploração; nenhum parecer humano é atribuído a uma pessoa sem sua manifestação.

Estado do preparo: tarefas 01–11 técnicas concluídas, recibos reconciliados nas tasks. Execução dirigida começa pelo inventário congelado. Este documento não registra campanha jogada nem aceite.

## Ambiente e proveniência

Usar somente `rpg-maker/The Dryland Drowned/`, sem build, engine/VisuMZ/Coreto congelados. Node 22+, Python e Chrome instalados; executor em `.agents/skills/rpg-maker-mz-qa-execution/scripts/`. Ler `docs/_memory/local-game-run.md`. Abertura manual: `npm start`; execução isolada: `rpg-maker/qa/directed-adapter.mjs`, conforme [integração](../../../rpg-maker/qa/skill-integration.md). Antes de servir, identificar o ocupante de 18726 com `netstat -ano`; nunca encerrar processo desconhecido. Manter a origem registrada, uma aba ativa e um contexto próprio. Não usar perfil pessoal.

Perfis: 1280×720, DPR 1, movimento normal; 1920×1080, DPR 1, movimento reduzido. O canvas lógico permanece 1280×720. Não testar zoom nativo, gamepad ou mobile. Registrar Chrome, viewport, locale pt-BR, preferência, hashes de dados/plugins/fontes/imagens/áudio e revisão Git, incluindo arquivos não versionados. Os novos PNGs são assets finais autorais; não são placeholders.

Novo jogo e todas as decisões passam por teclas ou ponteiro. Inspeção de `$gameSystem`, pictures, janelas, áudio e armazenamento é somente leitura. Não atribuir seed, mortos, destino, fase, evento ou save. Capturar checkpoints próprios com `captureNativeSave`; conservar arquivo, payload, índice, origem, produtor, comandos e hashes. O archive de escolha final contém o último checkpoint real do Conselho; reler texto não salvo ao continuar é esperado. Ramificações importam bytes imutáveis antes do boot e entram por Continuar. Nunca editar o payload.

Receita de retomada: **Continuar → aviso desmarcado → Tenho 16 anos de idade ou mais → Jogar → arquivo próprio → confirmar**. Antes de retomar, testar Voltar ao título e Escape em entradas separadas, conferir bytes inalterados e repetir a entrada com a caixa desmarcada. `Jogar` é o controle interno do aviso; o título mostra `Novo jogo`. `Seguir` é o controle público da preparação; `destinations` continua apenas a identidade interna do foco do mapa.

Materializar request v1 por lote/variante antes do preparo, com `spec`, `consumer: task-13`, caso, adapter, cenário e claims apontando ao contrato abaixo ou aos headings únicos da verificação. Invocar `request-evidence.mjs --project . --request <request.json>`. A ausência de receita de reuso no adapter segue o caminho ordinário, preservando relatório e limitação. Coleta não significa inspeção nem aceite humano.

## Cenários dirigidos e expectativas

| Lote / cenário | Entrada pública e percurso | Resultado esperado / variantes |
| --- | --- | --- |
| A / S-001 | Título novo; Novo jogo → aviso → voltar pelo botão; repetir e cancelar com Escape; entrar, marcar ciência e Jogar, arquivo próprio vazio; ler prólogo completo; visitar heróis, Conversar, Selecionar, retirar e rejeitar grupo cheio; Quadro vazio; Configurações; salvar formação incompleta; completar grupo; Seguir → mapa → selecionar → voltar → Seguir → Partir | Título/16+ legíveis; ciência sempre desmarcada e nenhum save ao cancelar. Seleção bem-sucedida retorna após a fala; outros fluxos preservados. Retrato/nome/base são o mesmo alvo. Introdução exata aparece uma vez; Vilarejo bloqueado visível, informação lateral acompanha seleção; somente Partir inicia expedição. Quadro vazio: “Ninguém ficou pelo caminho”. |
| B / S-002 | Na campanha própria, escolher abordagem sem competência disponível; escolher vítima não primeira; ler despedida e consequência; recuar com sobreviventes; repetir para várias perdas; retornar outra vez sem morte nova; visitar herói/mapa/Quadro/Opções | Uma morte e checkpoint no ato da escolha; nome correto apenas depois da despedida. Todos os mortos somem juntos por 180 frames antes de habilitar preparação. Retorno sem morte nova inclui mortos antigos; consultas não repetem efeito. Repetir um retorno com vários mortos no perfil reduzido, sem espera/animação. Voluntário e automático têm entradas distintas. |
| C / S-003 | Completar primeira e segunda rotas iniciais; ler recompensa, Rheed/Irati/mapa até o fim; observar preto, pausa, entrada e ausência. Na preparação salvar antes da introdução, lê-la e sair sem salvar; Continue e Seguir. Depois ler, salvar e repetir Continue | Peça e checkpoint únicos. Transição só depois do texto completo: fade 30 frames, preto 24, entrada 30; ausência posterior distinta. Save anterior restaura introdução incompleta; save posterior suprime repetição. Salvar escreve o arquivo atual mesmo sem novo sequence; aviso só depois do sucesso, sem roubar foco. |
| D / S-004 | Completar rotas e Vilarejo, ler opiniões elegíveis e Conselho; capturar pai real; Reunir; repetir do mesmo pai por Continue e escolher Destruir. Campanha de perdas alcança cemitério máximo e ramo sem epílogos. Ler todas as inscrições e epílogos antes dos créditos | Dois painéis iguais com consequências completas; gesto anterior não escolhe. Apenas desfecho escolhido é salvo. Nomes/rotas/encontros e inscrições completos; ordem H1–H8, oito mortos possíveis somente no final. Epílogos só dos participantes vivos do clímax, prosa intacta, Rheed velho/preto. Town1/People2 contínuos, sem aplauso; Configurações/HIDE/FAST/mute preservam contexto. BGM/BGS encerram antes dos créditos, inclusive sem epílogo. |
| E / T-001 e T-007 | Cópia isolada do candidato no editor MZ; abrir/editar argumentos de comandos novos, salvar e reabrir; comparar JSON. Inspecionar capturas e texto nativo de A–D e fixtures técnicas identificadas | Campos autoráveis, IDs/args preservados no round-trip; estática não substitui Editor. Conferir fontes, bordas dos retratos, caixas/indicador, campos longos e sete nomes da taverna/oito túmulos, em ambos os tamanhos. Julgamentos humanos ficam separados. |

## Mapa de critérios

| Verificação | Dono técnico / recibo | Cenário e dono vivo |
| --- | --- | --- |
| V-001 | 01; IT-085/001/047/028 | A, S-001; título e ambos os avisos |
| V-002 | 04; UT-078, IT-087/008/041/047 | A/C, S-001/003; preparação e saves |
| V-003/004 | 02; UT-076/IT-004; enquadramentos em 03/11 | A/C/D/E; narrativa e famílias distintas de Rheed/Ivaí |
| V-005/006/007 | 03/05; UT-077, IT-081/086/072 | A/B/E; heróis, sete nomes, teclado/ponteiro |
| V-008/012 | 06; UT-079 e IT-012/015/016/026/057 | B, S-002; vítima não primeira, despedida/consequência |
| V-009/014 | 03/09; IT-054/065, UT-034 e controles | A/B/D/E; escolhas comuns e painéis finais |
| V-010 | 11; IT-073/090/048, UT-035 | D/E; epílogos, áudio e revisão humana |
| V-011/013 | 07; IT-009/010/011/013/052/053 | B/C; retornos e duas sequências de fechamento |
| V-015 | 10; IT-055/056/057/074/087 | D/E; cemitério e todas as palavras |
| V-016 | 08; IT-088/089/017/018 | A/C; gravação deliberada, Continue e feedback |
| T-001–007 | Fontes e recibos nas tarefas 01–11 | Task 13 reconcilia; Editor e fit final em E |

V/TECH não encerra V/LIVE. Recibos técnicos ficam em `docs/qa/evidence/prototype-feedback-refinement/task-NN/`; os arquivos `task-NN.md` identificam comando, caso, resultado, falhas e equivalência. Hash global diferente exige análise das dependências, sem repetir automaticamente matrizes caras. Mudança de arte/fontes invalida render; event lists/saves invalidam retomada afetada; áudio invalida observação/escuta. O inventário final registra os hashes dos PNGs também.

## Seleção por risco e retomada

Preservar uma jornada ininterrupta título→primeira expedição, uma perda→taverna real, os dois fechamentos iniciais, ambos os finais voluntários e perda total. Um percurso com sobreviventes pode cobrir A/C/D; um percurso de perdas cobre B e cemitério. Compartilhar apenas archives próprios compatíveis. A ordem inversa é necessária para os fechamentos distintos, sem repetir oito visitas ou oito epílogos dirigidos: IT-081/073 já cobrem essas matrizes técnicas, com revisão visual dos consumidores afetados. Não herdar PASS de specs históricas.

Escolher e registrar mortes conforme as abordagens públicas e competências do grupo; sete mortes na taverna e oito no cemitério devem resultar dessas ações. Se a história aleatória não alcançar uma variante, conservar checkpoint e prefixo, registrar a lacuna e produzir outra campanha; não fabricar mortos. Um archive próprio anterior ao retorno permite comparar normal/reduzido sem repetir o começo. Uma consulta com mortos prova ausência de replay; não exige todas as combinações de heróis.

Lotes técnicos de falha de save IT-089 sustentam rejeição síncrona/assíncrona e conclusão obsoleta; a jornada viva observa save real bem-sucedido e Continue. Não simular falhas escrevendo estado durante QA dirigido. Reuso deve citar implementação comum, representante real, risco residual e condição de invalidação.

## Inspeção e aceite

Capturar estados decisivos e vídeos para o retorno de três segundos, fade/pausa e escolha deliberada. Gravar saída do master WebAudio nos epílogos, incluindo sucessão, HIDE/Opções/mute e saída para créditos. Samples e buffers não provam escuta ou conforto. Registrar quem ouviu/viu, material, data e decisão; aprovação D-025 é de design, não desse candidato.

Revisão humana selecionada: UI/UX (título, hierarquia/alvos/leitura), arte (enquadramento e assets finais), narrativa (transcrição/apresentação e prosa preservada), ritmo dos retornos e áudio. Os nomes do contrato são donos propostos, sem envio ou atribuição remota. Preparar material concreto antes de solicitar parecer.

Reusar os bugs [alvos](../bugs/BUG-20260924-choice-hit-areas.md), [enquadramento](../bugs/BUG-20260924-rheed-ivai-framing.md) e [memorial](../bugs/BUG-20260924-memorial-text-clipping.md). Relacionar reprodução e reteste, sem converter diagnóstico técnico em campanha jogada. Preservar falha original; corrigir no dono real e repetir sensores afetados. Duas tentativas sem informação nova exigem hipótese refutável e continuação dos lotes independentes.

## Saídas e encerramento

Relatório: `docs/qa/reports/2026-09-25-prototype-feedback-refinement.md`. Cada execução usa diretório novo sob `docs/qa/evidence/prototype-feedback-refinement/`, com requests, report, input, console, manifest, PNG/vídeo/áudio e archives. Copiar somente material selecionado para `docs/qa/deliveries/prototype-feedback-refinement/`, com hashes e origem, para funcionar sem a árvore ignorada.

Devlog demonstrável: título→aviso; seleção por retrato/nome→mapa; vítima não primeira→consequência nomeada→ausência e Quadro; dois painéis finais; túmulos completos; Rheed narrando epílogos com som contínuo. Captura sugerida do editor mostra os comandos nativos novos na cópia autoral. Nenhuma publicação é autorizada.

O executor fecha seus próprios Chrome/contextos/servidores no `finally`; verificar porta e processos. Fechar a cópia do editor aberta pelo agente, preservar sessões e saves anteriores, manter evidência e registrar qualquer falha de limpeza. Commits/PRs permanecem manuais. A tarefa 13 só conclui com os sensores selecionados ou disposição explícita do usuário.
