# Template em branco — cena VN com bustos, mensagens e som

Status: template de autoria, não evento executável. Duplique este arquivo e preencha os campos. Esta é a estrutura comum dos roteiros desta pasta, com campos adicionais para novas cenas. Campos em branco não autorizam decisões implícitas. Consulte os comandos na versão instalada antes de implementar.

## 1. Identidade, autoridade e resultado

- ID e título:
- Status (proposta / aprovado para implementação / implementado / verificado):
- Fonte canônica e decisão que autoriza a cena:
- Objetivo emocional:
- Acontecimento inicial:
- Mecânica e resultado obrigatório:
- O que não pode mudar:
- Passagem de campanha existente, se houver:
- Evento de entrada e evento de saída:
- Personagens presentes e condições de presença:
- Personagem variável e fonte de seu nome:
- Número mínimo/máximo de personagens:

## 2. Direção narrativa

- Ameaça concreta e detalhes que a tornam perceptível:
- Possibilidade de saída:
- Hesitação visível:
- Ação que demonstra a decisão:
- Consequência e imagem final:
- Informações que o jogador precisa compreender:
- Informações que devem permanecer implícitas:

Aplicar show, don’t tell: mostrar gestos, ações e sensações seletivas. Dar clareza espacial e causal. Variar ritmo sem fragmentar toda a prosa; evitar adjetivos emocionais redundantes, clichês e imitação de autores. Boas práticas de romances de grande alcance são referência de qualidade, não fórmula ou exigência de texto longo.

## 3. Estado inicial e recursos

| Recurso | Arquivo/ID real | Estado na entrada | Estado na saída | Dono/limpeza |
|---|---|---|---|---|
| Fundo | | | | |
| Busto principal | | | | |
| Outros bustos | | | | |
| Moldura | | | | |
| Caixa de mensagem | | | | |
| Ambiente BGS | | | | |
| SE pontuais | | | | |

- Expressão já exibida na cena anterior:
- Continuidade de posição, escala, origem e opacidade:
- Nome de falante na janela (conforme padrão local; não criar placa no busto):
- Conduta para personagem ausente:
- Conduta de HIDE/retomada:
- Movimento reduzido:

## 4. Caixa de diálogo — duplicar para cada batida

### Caixa [número]

- Função dramática:
- Chave de localização PT/EN:
- Passagem lógica à qual pertence:
- Falante ou narrador:
- **PT:**
- **EN:**
- Nome dinâmico: origem e variável reservada:
- Busto(s) e expressão durante a caixa:
- Posição/enquadramento/opacidade:
- Áudio: [sem novo efeito / arquivo exato]:
- Disparo: [entrada desta caixa / transição anterior]:
- Ordem exata: [avanço anterior → comando → espera, se necessária → som → mensagem]:
- Comando, plugin ativo e argumentos confirmados:
- Duração em frames e Wait explícito:
- Condição de presença/execução:
- Comportamento ao avançar rapidamente:
- Estado ao terminar a caixa:

O acontecimento sonoro deve aparecer no início do texto correspondente. Se ele ocorre depois da preparação, abrir outra caixa. Nunca depender de uma palavra, velocidade de digitação, tempo estimado de leitura ou disparo durante a caixa. Não exigir que a leitura espere o som terminar. Subdividir textos que não cabem sem repetir o cue nem concluir a passagem lógica prematuramente.

## 5. Ficha de som — duplicar para cada arquivo solicitado

- Nome final ASCII: `sfx_[cena]_[acao].ogg`
- Cena e caixa(s):
- Evento audível e intenção dramática:
- Descrição pronta para geração:
- Material/fonte:
- Distância, espaço e reverberação:
- Ataque/corpo/cauda:
- Duração desejada:
- Elementos proibidos:
- Execução única ou loop justificado:
- Volume proposto / pitch / pan:
- Relação com ambiente:
- Sobreposição permitida e interrupção:
- Proprietário e momento de encerramento:
- Reutilização prevista:
- Status do asset e avaliação audível:

## 6. Ferramentas e limites verificados

- Message Core: texto localizado pode expandir `\V[ID]`. Confirmar o ID livre e a atribuição do nome; não confundir ID de herói com nome. `{NOME}` é marcador editorial, não escape do motor.
- VN Picture Busts: `Fade_OpacityTo` (VN-C12) recebe PictureID, TargetOpacity 0–255 e Duration em frames; não espera nem apaga automaticamente. Usar Wait nativo quando a próxima ação depende do fade terminar.
- `Basic_GraphicChange` (VN-C03) troca bitmap após carga; não é crossfade. Não propor fusão de expressões sem uma receita verificada.
- `Scale_ScaleTo` (VN-C21) e opacidade compartilham temporização: não sobrepor transformações sem validar o comportamento.
- Reproduzir SE nativo (250) usa basename sem extensão e não aguarda término. Stop SE (251) é global: confirmar propriedade dos sons concorrentes. BGS ocupa canal próprio; planejar sua continuidade e encerramento.
- Se houver escolhas: Picture Choices vincula picture por `<Bind Picture: ID>`. Choice Common Events dispara no foco, inclusive inicial; foco não é confirmação e intérpretes podem se sobrepor. Definir apresentação e consequências separadamente.
- Escolhas, se aplicável: opções, elegibilidade, foco inicial, confirmação, cancelamento, consequências, limpeza de vínculos e pictures:

## 7. Integração e verificação

- Plugins ativos e ordem conferida:
- Recursos/IDs reservados sem colisões:
- Chaves de texto e passagem lógica:
- Ordem entre apresentação, ação validada e persistência:
- Eventos que devem executar uma única vez:
- Retomada após save/HIDE/Options:
- Encerramento de pictures e áudio:
- Revisão PT/EN e concordância de todos os nomes:
- Revisão de leitura lenta e rápida:
- Revisão de encaixe na janela real:
- Revisão de áudio em volume baixo/mudo:
- Regras/persistência que precisam de testes existentes:
- Captura ou vídeo demonstrável para devlog:
- Pendências, responsável e evidência:

Não criar testes para aparência. Não declarar integração, escuta ou aceite sem execução. Preservar engine/Coreto congelados, eventos nativos e textos em Languages.tsv conforme AGENTS.md. Para cenas novas, não copiar regras específicas de sacrifício se elas não se aplicarem.
