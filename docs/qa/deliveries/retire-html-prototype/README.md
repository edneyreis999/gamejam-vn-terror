# Entrega — projeto único em RPG Maker MZ

Aceite final recebido em **10/09/2026**, com a resposta **“está aprovado”** para a documentação implementada. O [registro de aceite](human-acceptance.json) identifica os documentos apresentados e seus hashes; a [verificação](../../../../planos/tasks/retire-html-prototype/verification.md) encerra V-001–V-006 no escopo aprovado.

O único projeto de jogo é `rpg-maker/The Dryland Drowned/`. A implementação HTML foi retirada, os testes passaram a consultar conteúdo nativo e as orientações atuais apontam para MZ. Os documentos históricos conservam seus resultados e limitações. Todos os 1.326 assets nativos foram preservados; a comparação dos 50 JSON encontrou somente a anotação de proveniência autorizada.

Para jogar, execute na raiz:

```sh
npm start
```

As instruções completas estão no [README MZ](../../../../rpg-maker/README.md). O comando continua usando Node 22+, Chrome e servidor local, sem build. A revisão do manifesto segue a política existente: saves de layouts anteriores podem ser recusados sem serem apagados; não houve migração de saves.

## Validação e limites

Os 65 testes unitários selecionados passaram com Node v22.23.2 na execução anterior. A revisão seguinte confirmou os mesmos 42 inputs, permitindo conservar esses resultados sem repeti-los. O validador passou novamente com Node v26.7.0. A revisão final dos documentos apresentados conferiu 59 links locais, sem destinos ausentes após a correção de um link histórico já quebrado no GDD. Detalhes e evidências estão no [relatório](../../reports/2026-09-10-retire-html-prototype.md).

Chrome, gameplay, áudio, screenshots e armazenamento real foram excluídos deste ciclo pelo usuário. Esta entrega não valida essas superfícies nem aprova as alterações separadas da ferramenta de captura de áudio. A arte e os textos mantêm seus estados criativos anteriores.

## Material para devlog

Antes, duas implementações e referências cruzadas podiam desviar a manutenção para o código antigo. Agora, desenvolvimento e verificação têm um único projeto de jogo como referência. Não há alteração visual entregue nem nova captura necessária para demonstrar esta manutenção.

O momento demonstrável em uma futura gravação é abrir o projeto MZ e localizar o conteúdo nativo no editor. Essa gravação é apenas uma sugestão: não foi executada neste ciclo. As imagens de outras entregas permanecem evidências históricas e não demonstram esta retirada.

## Acervo local

O [registro de organização](organization.json) classifica os arquivos e identifica o acervo preservado em `.artifacts/archives/retire-html-prototype-accepted-20260910/`, ignorado pelo Git. Seu `manifest.json` mapeia caminhos de origem, destinos, tamanhos e hashes de 2.128 arquivos, totalizando 58.876.755 bytes conferidos após a cópia.

O acervo conserva os originais, as evidências brutas e dois artefatos sem uso atual: o rascunho de candidatos da revisão e o script de mutação usado uma única vez. A revisão final, suas baselines de hashes, a spec, o ADR e as tarefas continuam versionáveis. As evidências de execução também permanecem no diretório local ignorado de QA. O acervo completo está disponível nesta máquina, não em um clone novo.

Nenhum commit, push, PR ou publicação no Trello foi realizado como parte desta organização.
