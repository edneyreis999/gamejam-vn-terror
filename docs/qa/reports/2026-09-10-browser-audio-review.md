# Revisão da ferramenta de captura de áudio — 2026-09-10

## Primeira revisão: falhas de início

A revisão das alterações locais identificou uma falha no início da captura: se `MediaRecorder.start()` lançasse um erro, a conexão de observação e o stream ficavam abertos, mas o controlador não registrava uma captura ativa para a limpeza. A reprodução isolada observou uma conexão remanescente e nenhum track encerrado após `cleanup()`.

O início agora libera a conexão e os tracks em caso de falha na construção do gravador, na conexão ou em `start()`, propagando o erro original. O registro da captura na página acontece somente após o início bem-sucedido. A verificação de suporte ao formato ocorre antes de alocar o destino.

Foi usado o módulo real e seu callback de página, com APIs de alocação do navegador simuladas em um contexto VM. Os três casos de falha passaram após a correção: liberam os recursos da captura, preservam a conexão de saída audível e permitem uma nova tentativa explícita. O script de diagnóstico e a saída estão em `docs/qa/evidence/qa-browser-audio/20260910-01/`, ignorados pelo Git. Execução com Node v26.7.0, exit 0. Não foi criada uma suíte do jogo para uma responsabilidade da ferramenta de QA.

`node --check` passou para `browser-audio.mjs` e `browser-runtime.mjs`. A leitura do diff também conferiu a integração da captura no executor, o registro do arquivo-fonte nas evidências, a mensagem com dimensões da captura e a operação declarada de restauração de falhas de fronteira. Essas partes receberam revisão estática; não foram exercitadas no navegador.

Gravação real, codificação Opus, análise de canais, parada da captura, restauração de falhas no navegador e saída física de som ficaram sem validação nessa primeira revisão. O diagnóstico de alocação não equivale ao aceite funcional da ferramenta completa. Nenhuma campanha, asset, save ou processo do jogo foi alterado.

## Fechamento técnico: parada, recuperação e integração

A auditoria posterior encontrou outro defeito: uma falha de `decodeAudioData` ou de escrita liberava o tap na página, mas mantinha o controlador Node ativo. `cleanup()` tentava parar uma captura inexistente e a próxima `start()` era bloqueada. A suíte abaixo reproduziu ambos os defeitos no Chrome real antes da correção: um caso passou e os dois casos de recuperação falharam na limpeza com `Cannot destructure property 'node' of 'capture' as it is undefined`.

O controlador agora libera seu estado no `finally` da parada, inclusive quando análise ou persistência falham. Os erros continuam sendo propagados, arquivos existentes não são sobrescritos e nenhuma captura malsucedida vira checkpoint. O executor encerra a captura antes de `reload()` e `reopen()`; um erro de parada impede a navegação. A restauração de falhas continua restrita à função declarada pelo cenário.

Validação executada com Node v26.7.0, Playwright 1.63.0 e Chrome 153.0.8010.36 no macOS: **7 testes passaram, exit 0**. A suíte usa o módulo e executor reais, MediaRecorder/Opus/WebAudio reais e escrita no filesystem. Somente as falhas de alocação/decodificação são injetadas na fronteira do navegador; a colisão de escrita é um `EEXIST` real.

| Verificação | Resultado observado |
| --- | --- |
| Início → parada → arquivo | WebM com cabeçalho EBML, hash correspondente, duração positiva e energia de canal não nula |
| Falhas de construtor, conexão e início do gravador | Tracks encerrados e nova tentativa concluída; saída original do grafo continua com sinal |
| Falha de decodificação | Erro propagado, nenhum checkpoint falso, limpeza e nova gravação concluídas |
| Colisão de escrita | Arquivo anterior preservado, erro propagado, limpeza e nova gravação concluídas |
| Executor com falha declarada | Aplicação e restauração registradas; gravação seguinte concluída |
| Reload e reopen | Gravações encerradas antes da troca de documento; três WebMs válidos ao final; recursos do executor fechados |

`node --check` passou nos três módulos alterados/adicionados e `git diff --check` passou. A revisão do conjunto preserva o módulo, sua integração e instruções como uma capacidade atômica; a suíte adjacente torna a validação reproduzível sem o diagnóstico local histórico. Este relatório é o registro mantido de resultados e limites. Não há alteração de engine, plugin, campanha, asset ou save.

Para reproduzir em um clone novo, com Node 22+ e Chrome instalados:

```sh
npm ci --prefix .agents/skills/rpg-maker-mz-qa-execution/scripts
node --test .agents/skills/rpg-maker-mz-qa-execution/scripts/browser-audio.test.mjs
```

A suíte cria fixtures, servidor em porta livre e perfis temporários próprios; remove os arquivos temporários e fecha os processos ao terminar. Não requer microfone e mantém a saída física silenciada. Os diagnósticos ignorados citados na primeira revisão são acervo histórico local, não pré-requisitos desses comandos.

Veredito: **PASS para a ferramenta de coleta e recuperação no escopo exercitado**. Não foram verificados o grafo de áudio do jogo, Windows, outros navegadores, dispositivos de saída, conforto, qualidade artística ou aceite humano. O sinal medido no grafo não prova som nos alto-falantes; os testes não encerram critérios de audição humana de uma entrega do jogo.
