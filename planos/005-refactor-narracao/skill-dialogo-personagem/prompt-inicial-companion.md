Agora preste atenção. nosso primeiro passo é fazer uma skill baseada em [Skill base] que vai guiar um agente a criar um diálogo entre dois personagens no mesmo nivel de detalhe do livro Ghork e a Prova de Fogo (ou até maior).

como vamos fazer isso:
você vai escrever uma skill de criar dialogos entre personagens. a mais simples possível, com a menor quantidade de instrução possível e colocar dentro da skill as perguntas que o modelo deve se fazer em memoria para criar esse diálogo.

a skill vai ficar em planos/005-refactor-narracao/skill-criacao-ficha-persoangem

só depois dela pronta e validada que eu vou promover ela para .agents

Como vamos validar ela:

Você vai orquestrar um sub agente somente com o contexto da skill e das fichas dos personagens. e ele vai recriar alguns dialogos do livro SEM O CONTEXTO DO LIVRO.

Ele vai receber informações sobre o diálogo através de perguntas que ele vai fazer para você, e você, com acesso ao livro vai responder a ele.

essas perguntas que ele fizer, vão precisar serrespondidas. e depois Sanetizadas, porque ela deve funcionar para qualquer dialogo.

você vai anotar essas perguntas sanetizadas na skill.

depois que o agente disser que o dialogo está pronto, em memoria, você vai comparar o dialog que ele fez com o original do livro.

Você vai julgar se o dialogo ficou melhor ou igual ao do livro, caso sim, a ficha está aprovada e passamos para proxima fase. Caso não você vai instanciar um segundo agente, com o contexto da skill e das fichas dos personagens + as perguntas sanetizadas que você anotou na skill já respondida + as diretrizes de como escrever um bom dialogo (que também devem estar anotado na skill).

As vezes o problema não é as perguntas e respostas, mas sim como o agente está trabalhando com essa informação.

ai você vai refinando esse loop de adicionar/modificar as perguntas, adicionar/modificar as diretrizes até que o dialogo SEM ACESSO ao livro esteja melhor ou igual ao dialogo do livro em si.

Com isso pronto, terminamos a fase 1.

Na fase 2 você vai invocar um segundo agente somente com o contexto da skill e das fichas dos personagens para criar um segundo dialogo, ele vai te fazer as perguntas da skill e você vai buscar no livro as informações para responder.

Se for preciso, você ainda vai adicionar/modificar as perguntas, diretrizes e template. Se caso o agente sem contexto do livro conseguir criar um dialogo do nivel do livro, a skill ficou pronta.

Se não, você vai repetir o mesmo processo com outros dialogos do livro, escolha dialogos que envolvam personagens que você já tem a ficha.


Você está em modo companion e agora é a hora de me dizer o que acha do plano.


[Skill Base]

## Passo 1: Preencher o brief em memória

TRANSFORMAR EM PERGUNTAS PARA RESPONDER

Antes de escrever, responda no raciocínio, sem imprimir, para cada personagem presente. Use substantivos e verbos concretos; um campo respondido com adjetivo ("tensão", "tristeza") continua vazio.

1. **Momento anterior**: o acontecimento concreto que precede a cena. A primeira fala reage a ele.
2. **Quer / impede**: o que quer do outro *nesta cena* e o que bloqueia isso.
3. **Tática → plano B**: um verbo dirigido ao outro (cobrar, acuar, seduzir, desconversar) e o verbo para o qual muda quando o primeiro falha.
4. **Status**: quem começa por cima e a fala ou o evento que inverte isso, ou "não vira".
5. **Conhecimento**: o que cada um esconde do outro, e o que o espectador sabe que alguém em cena ignora.
6. **Indizível**: a palavra ou o fato que nenhuma fala nomeia.
7. **Estado reconhecido**: escolhas, perdas ou acontecimentos anteriores que a cena precisa acusar, ou "nenhum".
8. **Saída**: quem agora sabe, tem ou deve o quê. "Nada muda na superfície" é resposta válida.

## Passo 2: Escrever

Escreva cada fala como alguém a diria em voz alta: uma frase com verbo, que nomeia aquilo de que fala ou retoma o que a fala anterior nomeou.

## Passo 3: Checar

Leia cada fala em voz alta tendo à frente só a fala anterior: dá para saber do que ela fala. Reescreva a que falhar e leia de novo, até todas passarem.
