# Refinamento visual e consistência dos controles

## Menu hambúrguer — 2026-09-29

Em 2026-09-29, por solicitação do usuário, o menu hambúrguer passou a usar `Window_ChoiceList` nativo, windowskin opaca do projeto e fonte do sistema de janelas. Seus rótulos são Obtuário, Configurações, Salvar e Sair. Uma opção técnica invisível permanece vinculada ao mesmo picture do hambúrguer para fechar ao acioná-lo novamente.

A atualização preserva as ações existentes de Obtuário, Configurações e Salvar, a entrada do hambúrguer, a composição dos heróis e a posição de Seguir. Sair retorna à tela de título pela sequência padrão de encerramento de sessão do MZ; Sair na tela de título continua encerrando o jogo. O fechamento pelo hambúrguer e por Escape/cancelamento continua disponível; o foco percorre apenas as quatro ações visíveis.

### Momento demonstrável

Na taverna, abra o hambúrguer, percorra Obtuário, Configurações, Salvar e Sair, e feche acionando o mesmo hambúrguer; Escape também fecha. Captura sugerida: menu aberto mostrando as quatro ações e o foco do sistema de janelas.

### Validação

A verificação estática confirmou quatro ações, retorno por `SceneManager.goto(Scene_Title)`, fechamento pelo ícone e Escape, quatro linhas visíveis e navegação que salta o índice técnico. `node --check` e parse do JSON passaram; inspeção visual em runtime permanece pendente.

Não foi executado playtest nem inspeção visual em runtime para este complemento.

## Contraste e paridade entre telas — 2026-09-29

Aplicar texto branco e centralizado às escolhas nativas sobre windowskin escura, incluindo título e aviso etário. O botão FAST preserva sua função e perde apenas o contorno do texto. No título, manter o bitmap tipográfico sem renderer de janela e adicionar `Sair` às duas variantes da escolha inicial, chamando `SceneManager.exit()`.

Para os botões de heróis/Seguir, destinos, abordagens das armadilhas e containers de candidatos/título de sacrifício, usar o renderer `WindowPicture` existente em cada picture autorada, com dimensões herdadas do bitmap e a cor clara explicitada nos fundos escuros. PictureChoices continua sendo o único alvo de entrada. A opacidade de cada destino segue o estado habilitado da escolha vinculada; switch 33 e a regra de desbloqueio de duas peças permanecem a fonte de verdade. Nenhuma imagem ou alvo dos heróis teve posição, escala ou proporção editada.

A fala de apresentação após Seguir reutiliza os comandos oficiais de busto do projeto para mostrar e remover `Dryland_ivai`, sem tocar no texto, no avanço ou no registro da leitura.

### Momento demonstrável e captura sugerida

Percorrer título e aviso etário; abrir seleção de heróis; seguir para a fala de Ivaí; inspecionar os três destinos antes e depois do desbloqueio de Vilarejo Partido; abrir uma abordagem de armadilha e o palco de sacrifício. Capturas sugeridas em 1280×720: título, aviso, menu de heróis, fala de preparação, mapa bloqueado, mapa desbloqueado, abordagem e seleção de vítima.

### Validação

Validação estática executada: `node --check` passou para `Dryland_Presentation.js`; `CommonEvents.json` e `Map007.json`–`Map022.json` passaram pelo parse e pelas verificações estruturais. Os 16 mapas mantêm todos os comandos originais inalterados, recebendo cinco comandos de renderer por mapa; destinos e painéis de sacrifício têm estilo claro registrado nos controles existentes. As duas variantes do título incluem um ramo `Sair` válido, o título não recebe `WindowPicture`, e a fala existente de Ivaí fica entre comandos de entrada/saída do busto. `git diff --check` passou sem erros de whitespace (o Git reportou apenas conversão CRLF configurada para três arquivos Markdown/JS).

Não foi executado playtest, inspeção visual ou suíte de testes para este escopo. Contraste renderizado, estado de Vilarejo Partido no jogo real, posição do busto, FAST e regressões em runtime permanecem pendentes; este registro não declara aceite de apresentação.
