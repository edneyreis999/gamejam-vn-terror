Agora preste atenção. nosso primeiro passo é fazer uma skill que vai guiar um agente a criar um ficha dessa de personagem no mesmo nivel de detalhe do ghork (ou até maior).

como vamos fazer isso:
você vai escrever uma skill de criar ficha de personagem. a mais simples possível, com a menor quantidade de instrução possível e colocar dentro da skill o template do modelo da ficha de personagem que acabamos de editar.

a skill vai ficar em planos/005-refactor-narracao/skill-criacao-ficha-persoangem

só depois dela pronta e validada que eu vou promover ela para .agents

Como vamos validar ela:

Você vai orquestrar um sub agente somente com o contexto da skill. e ele vai criar a ficha do Ghork novamente SEM O CONTEXTO DO LIVRO.

Ele vai receber informações do personagem através de perguntas que ele vai fazer para você, e você, com acesso ao livro vai responder a ele.

essas perguntas que ele fizer, vão precisar ser sanetizadas e respondidas. Sanetizadas, porque ela deve funcionar para qualquer personagem, não só para o Ghork.

você vai anotar essas perguntas sanetizadas na skill.

depois que o agente disser que está pronta a ficha, em memoria, você vai comparar com a ficha que você acabou de criar (planos/005-refactor-narracao/reverse-eng-livro/ghork.md) com a ficha do agente.

Você vai julgar se a ficha do agente está igual ou melhor que sua, caso sim, a ficha está aprovada e passamos para proxima fase. Caso não você vai instanciar um segundo agente, com o contexto da skill + as perguntas sanetizadas que você anotou na skill já respondida + as diretrizes de como preencher o template (que também devem estar na skill).

ai você vai refinando esse loop de adicionar/modificar as perguntas, adicionar/modificar as diretrizes adicionar/modificar o template até que a ficha do agente SEM ACESSO ao livro esteja melhor ou igual a sua.

Com isso pronto, terminamos a fase 1.

Na fase 2 você vai invocar um segundo agente somente com o contexto da skill para criar a ficha da Lala, ele vai te fazer as perguntas da skill e você vai buscar no livro as informações para responder.

Se for preciso, você ainda vai adicionar/modificar as perguntas, diretrizes e template. Se caso o agente sem contexto do livro conseguir criar a ficha da Lala sem contexto do livro, a skill ficou pronta.

Se não, você vai repetir o mesmo processo com Dam, Drull, Orquius e os demais personagens do livro. até que ele consiga criar uma ficha usando a skill sem que você precisa alterar ela.


Você está em modo companion e agora é a hora de me dizer o que acha do plano.
