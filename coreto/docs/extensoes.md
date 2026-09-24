# Estender a Coreto

`<jogo>` é o caminho informado no [índice](../README.md).

Primeiro consulte o namespace e o descritor da API no [guia de autoria](autoria.md). Use configuração, comandos e eventos quando já expressarem o comportamento desejado. Para código novo, crie um plugin especialista do jogo.

## Nome e posição

Use `<NomeDoJogo>_<tier+1>_<Recurso>.js`. O número é o **tier**: o plugin do jogo deve estar um tier acima do plugin Coreto estendido. Por exemplo, uma extensão de `Coreto_1_MessageCore.js` pode ser `Dryland_2_MessageExtensions.js`.

Coloque o arquivo em `<jogo>/js/plugins/` e registre-o depois do plugin estendido e das demais dependências em `js/plugins.js`. O tier no nome não determina sozinho a ordem de execução: confira a lista real. Se o especialista depender de vários plugins Coreto, use um tier acima do maior tier estendido e carregue-o depois de todos eles.

Declare `@target MZ`, parâmetros/comandos próprios e `@orderAfter` com os IDs exatos das dependências. Preserve entradas e parâmetros existentes ao editar o registry. Reabra o editor depois de qualquer escrita externa.

## Limite de alteração

`coreto/` e os bundles `Coreto_*.js` são somente leitura neste projeto, inclusive para correções, diagnósticos ou personalizações. Não copie um bundle inteiro para renomeá-lo, não modifique seus fontes e não gere versões locais dele. Código, configuração de desenvolvimento e testes do especialista pertencem ao projeto do jogo.

Use as APIs públicas e os pontos de extensão existentes. Quando precisar estender um método do engine MZ, preserve sua implementação anterior no especialista e respeite `this`, argumentos, retorno e ciclo de vida. Inspecione a função Coreto envolvida sem modificá-la; evite substituir um subsistema inteiro para mudar uma regra local.

Identifique o plugin pelo nome exato do especialista ao registrar comandos e ler parâmetros. Registre apenas o estado persistente necessário e mantenha compatibilidade com saves existentes. Teste o comportamento do especialista no jogo real, incluindo o retorno ao fluxo original.

Se a extensão não puder resolver um defeito da Coreto, registre reprodução, versão/configuração e evidências para a manutenção da engine. O bloqueio não autoriza a IA do projeto a editar a Coreto.
