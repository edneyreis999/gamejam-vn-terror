# Afogados em Terra Seca — protótipo V3

Abra `index.html` diretamente no Chrome desktop. O protótipo não exige servidor, instalação, build ou conexão e mantém a campanha apenas na memória da aba. O viewport efetivo suportado neste incremento começa em 1280 × 720 CSS pixels.

Antes de jogar, a tela apresenta a classificação indicativa e os avisos de conteúdo. **Jogar** inicia o prólogo. Durante leituras, clique no texto, use **Avançar** ou pressione Enter. **Pular texto já lido** aparece somente para trechos concluídos nesta campanha.

Na taverna, passe o ponteiro sobre um herói ou leve o foco até ele para consultar sua ficha pública e sua fala. As setas movem o foco para o herói visualmente mais próximo naquela direção; Escape fecha a inspeção. Inspecionar não muda a equipe. Enter, Espaço ou clique alterna a formação manual; com até três sobreviventes, todos entram automaticamente. **Escolher destino** abre as três rotas em um diálogo nativo, **Consultar elenco** mostra vivos e mortos sem alterar a campanha e **Partir** confirma a expedição. Escape ou **Fechar** encerra esses diálogos e devolve o foco ao controle que os abriu.

As abordagens nunca revelam competências ou viabilidade. Depois de uma falha, a primeira ativação de um nome na tela de sacrifício mata imediatamente aquele integrante. No primeiro retorno à taverna, todos os mortos ainda não apresentados desaparecem juntos durante um segundo e deixam seus lugares vazios permanentemente. A preferência do sistema por movimento reduzido remove esse efeito sem atraso e sem esconder informação.

A campanha inclui as duas rotas iniciais em qualquer ordem, o Vilarejo Partido, o Conselho, os dois destinos do medalhão, o desfecho por perda total, memorial, epílogos elegíveis e reinício explícito. Áudio, salvamento e layouts estreitos permanecem fora deste incremento.

## Inspeção de QA

Antes de **Jogar**, uma semente uint32 pode ser configurada com:

```js
window.expeditionQA.setSeed(20260831)
```

`window.expeditionQA.snapshot()` retorna uma observação V3 congelada e destacada do estado interno. `window.expeditionQA.validate()` observa catálogo e campanha sem avançar ou reparar nada. Esses são os únicos métodos públicos de QA; todas as decisões da campanha continuam pertencendo aos controles do jogador.

Abra `tests.html` diretamente para executar o manifesto browser-native deste checkpoint. O arquivo `tests/visual-fixtures.html?state=<ID>` é exclusivo de captura automatizada e usa apenas estados allowlisted do renderer de produção; ele não é carregado por `index.html`.

## Reprodução local e pacote offline

Copie a pasta `prototype/` inteira para outro diretório e abra o `index.html` da cópia com o Chrome sem servidor. Preserve a estrutura relativa de `assets/`, os quatro scripts do runtime e os arquivos HTML. A campanha deve iniciar, chegar à taverna, abrir os dois diálogos e entrar em um encontro mesmo com a rede do navegador desativada. Nenhuma requisição HTTP é necessária ou esperada.

Para reproduzir a captura do devlog, use viewport de 1280 × 720, escala do dispositivo em 1 e movimento normal. Antes de **Jogar**, execute `window.expeditionQA.setSeed(20260831)`. Use somente os controles visíveis para percorrer prólogo, preparação, escolha de três heróis, destino, encontro, falha, sacrifício e retorno. Registre duas imagens do primeiro retorno: uma durante o desaparecimento e outra após os lugares ficarem vazios. Anote junto às imagens a semente, a identidade de fonte registrada na evidência visual, a sequência de ações, o viewport e a preferência de movimento. Uma captura opcional em 1920 × 1080 confirma o segundo tamanho efetivo. Evidência com movimento reduzido deve ser identificada separadamente, pois nesse modo não existe quadro intermediário da animação.

Os assets em `assets/` são locais. Retratos e cenários narrativos deste checkpoint são baselines provisórias; a procedência está em `assets/README.md` e a aprovação final de arte e texto continua humana.
