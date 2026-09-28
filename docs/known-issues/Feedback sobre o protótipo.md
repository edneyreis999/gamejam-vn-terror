# Feedback sobre o protótipo

## Abertura do Jogo

### 1. Disclaimer de classificação etária

*Problema:* 
- Não há uma introdução ao jogo (parece que o jogador "cai de paraquedas dentro do jogo), o disclaimer já é a tela inicial
- A informação de classificação etária está pouco destacada

*Sugestão:*
- Adicionar uma tela inicial em que contenha o título do jogo e os botões iniciais de menu (i.e., "jogar", "continuar", "opções"). Nessa tela, também poderá haver o símbolo de 16+, mas o disclaimer virá na próxima tela.
- Disclaimer mostrado em uma tela exclusiva. Exemplo: fundo preto e liso, disclaimer escrito em brando no meio da tela seguindo a frase padrão "Este jogo não é recomendado para menores de 16 anos. Contém conteúdos relacionados a horror psicológico, morte e coerção", abaixo da frase padrão apresentar uma checkbox "Tenho 16 anos de idade ou mais" e abaixo da checkbox o botão "Jogar" que será habilitado somente após a checkbox estar com valor "true"

## Menu Inicial

### 1. Escolha do destino
   
*Problema:* 
- Está pouco intuitiva
- Só dá para selecionar o destino se passar o mouse em cima da imagem

*Sugestão:*
- Tornar as escolhas encadeadas
- Quando os três herois forem selecionados, o botão de "seguir" fica habilitado e o jogador é direcionado para a tela de escolha do destino (estética de mapa)
- Pode haver um diálogo com o Ivaí, em que ele falará algo como "bem, agora que nossa equipe está completa, vamos traçar nossa rota!"
- label "Destino não escolhido" pode ser removido
- Colocar um container em volta dos quadrados de seleção de destino

### 2. Introdução do Reed

*Problema:* 
- Introdução muito direta, pouco amistosa

*Sugestão:*
- Implementar mais autoclíticos na fala do Reed para ele se apresentar de forma mais amistosa para o jogador antes de começar a contar a história
- Alterar a fala de forma que ele se direcione ao espectador como se estivesse falando diretamente com o jogador.
- Contextualizar melhor quem é Irati, quem é Ivaí, qual a relação entre os personagens (i.e., Irati, Ivaí e Reed)

### 3. Bustos do Reed e Ivaí

*Problema:* 
- Bustos desalinhados em relação à caixa de diálogo
- Imagem do Reed jovem ainda é de IA

*Sugestão:*
- Ajustar tamanhos dos bustos para ficar proporcional ao restante dos elementos
- Desenhar o Reed jovem e substituir nos lugares em que o busto dele aparece conversando no jogo

### 4. Botão "Elenco"

*Problema:* 
- Botão descontextualizado, não fica evidente a função de listar o elenco no contexto da taverna

*Sugestão:*
- Ambientar o botão para contextualizar melhor. Exemplo: acrescentar um mural na parede da taverna, que poderá ser clicado e exibirá um "memorial" de herois perdidos em missão (como se fosse a seção de falecidos do jornal impresso)

### 5. Display dos herois

*Problema:* 
- Nomes dos herois estão desalinhados em relação às imagens deles
- só é possivel selecionar o heroi se passar o mouse no nome dele
  
*Sugestão:*
- Ajustar a posição dos botões para ficarem mais próximas do respectivo heroi.
- Colocar um container em volta do heroi e do nome para poder ser selecionado ao clicar em qualquer parte

### 6. Apresentação dos herois

*Problema:* 
- Textos desatualizados
  
*Sugestão:*
- Atualizar textos de apresentação, opinião e despedida de cada heroi conforme o documento "docs/narrativa/herois/Falas-de-cada-herói.md"
- Ao selecionar um heroi para campanha, voltar direto para taverna ao invés de continuar na fala do heroi.

### 7. Imagens das armadilhas

*Problema:* 
- Ainda permanecem imagens de IA
  
*Sugestão:*
- Substituir pelas ilustrações do Lucas

### 8. Texto das armadilhas

*Problema:* 
- Textos estão com muitos trejeitos de IA ainda
  
*Sugestão:*
- Atualizar os textos das armadilhas para a versão mais humanizada

### 9. UI de diálogo

*Problema:* 
- Contorno da caixa de diálogo em azul, destoando da estética do restante do jogo
  
*Sugestão:*
- Alterar o arquivo "gamejam-vn-terror\rpg-maker\The Dryland Drowned\img\system\Window.png"

### 10. Texto de falha das armadilhas

*Problema:* 
- Texto genérico
  
*Sugestão:*
- Atualizar os textos das falhas das armadilhas de forma que a informação "um dos herois" seja substituída pelo nome do(a) heroi(na) escolhido(a) pelo jogador

### 11. UI de diálogo

*Problema:* 
- Estética dos botões de opção destoando da estética usada nas opções das armadilhas
  
*Sugestão:*
- Alterar o arquivo "gamejam-vn-terror\rpg-maker\The Dryland Drowned\img\system\Window.png"

### 12. Epílogos

*Problema:* 
- Epílogos ainda estão com imagens de IA e textos desatualizados
  
*Sugestão:*
- Substituir o textos e imagens dos epílogos pela narração do Reed com background em preto

### 13. Final do caminho

*Problema:* 
- Depois da fala do Rheed, o jogador já é jogado de volta na taverna

*Sugestão:*
- Colocar uma transição melhor depois que pega o mapa, antes de voltar para a taverna

### 14. Seleção do heroi para sacrifício

*Problema:* 
- só é possivel selecionar o heroi se passar o mouse no nome dele
  
*Sugestão:*
- Colocar um container em volta do heroi e do nome para poder ser selecionado ao clicar em qualquer parte

### 15. Morte do heroi

*Problema:* 
- O efeito do heroi "morrer" está muito acelerado e passa imperceptível para o jogador
  
*Sugestão:*
- Deixar um pouco mais "lento" o efeito do heroi desaparacer quando ele morre e o jogador volta à taverna. 
- Colocar para todos os mortos "sumirem" sempre que voltar para taverna, mesmo os que não morreram naquela run.

### 16. Escolha final (reunir x destruir)

*Problema:* 
- Escolha final entre destruir ou reunir o medalhão está pouco destacada no jogo
  
*Sugestão:*
- Melhorar um pouco a escolha de reunir o medalhão ou destruir. colocar no meio da tela, maior e mais enfeitado.

### 17. Cena dos mortos

*Problema:* 
- Os textos na cena dos tumulos estão cortados.
  
*Sugestão:*
-  ou diminuir a fonte ou diminuir o espaçamento ou escrever menos coisa.

### 18. Menu inicial

*Problema:* 
- Falta botão de configurações na cena da taverna
  
*Sugestão:*
- Colocar acesso ao menu "configuração" e botão de save na taverna
