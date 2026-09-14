# Áudio provisório do incremento MZ

## Aceite do incremento — 2026-09-10

O usuário aprovou os testes humanos do estado atual. Este aceite supera as pendências históricas de revisão abaixo para o incremento init-rpg-maker-mz, incluindo a seleção de áudio e a apresentação dos assets existentes. Proveniência, arquivos e referências de baseline permanecem inalterados; não houve substituição de assets nesta aprovação. Registro: [aceite humano](../../docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json). A audição foi informada pelo usuário, não realizada pelo agente.

## Histórico da seleção

As seleções abaixo reutilizam arquivos que já existiam no projeto. São baseline de protótipo, conforme ADR-004 da spec `init-rpg-maker-mz`. Nenhum arquivo de áudio foi baixado ou alterado.

| Uso | Arquivo nativo | Canal |
|---|---|---|
| Prólogo e preparação na taverna | `audio/bgs/People1.ogg` | Ambiente |
| Igreja | `audio/bgs/Drips.ogg` | Ambiente |
| Parque | `audio/bgs/Wind1.ogg` | Ambiente |
| Vilarejo e Conselho | `audio/bgs/Darkness.ogg` | Ambiente |
| Reunir o medalhão | `audio/me/Musical1.ogg` | Temas |
| Destruir o medalhão | `audio/me/Organ.ogg` | Temas |

Os dez efeitos reutilizáveis são `Cursor3`, `Decision2`, `Cancel2`, `Buzzer1`, `Save2`, `Load2`, `Item3`, `Door1`, `Collapse1` e `Water1`, todos em `audio/se/`. Os efeitos de batalha do banco original permanecem como arquivos de distribuição e não são acionados pela campanha.

As quatro categorias nativas — Música/BGM, Ambiente/BGS, Temas/ME e Efeitos/SE — começam em40%, aceitam0–100% e preservam preferências independentemente do Novo jogo. A campanha não programa BGM adicional: os quatro contextos ambientais usam BGS e os dois temas curtos usam ME. O título encerra os contextos anteriores; o ambiente inicial começa após Jogar. Não há voz, som por letra nem informação indispensável apresentada apenas pelo áudio.

Os testes nativos IT028/029 verificam os parâmetros, a decodificação no Chrome, a troca de buffers, a ausência de sobreposição, o silêncio e os controles. Isso não constitui audição. Esta sessão não recebe entrada de áudio, portanto adequação artística, balanço percebido e audição de todos os efeitos permanecem sem verificação. E2E020/V-AUDIO devem registrar a escuta efetiva antes da aceitação sonora; V-HUMAN deve registrar a aprovação final da equipe.

## Integração EventBridge mínimo — 2026-09-12

A seleção e o disparo de cues permanecem nos eventos nativos, com CE67 consultando a fase por campos escalares. `Dryland_Presentation` mantém somente o descritor do ME atual que o setter nativo de volume usa; delega reprodução/parada ao AudioManager e limpa o descritor ao parar, substituir ou terminar o som. Alterar Temas muda o ganho do mesmo buffer, sem reiniciar a faixa. Bridge não contém integração de áudio.

IT028/029 passaram com as quatro categorias, preferências preservadas após seleção de arquivo/Novo jogo, ME ativo, substituído, parado e terminado naturalmente, volume não zero→zero→não zero e HIDE sem replay. Evidência técnica: `docs/qa/evidence/eventbridge-minimal-runtime/task-12/20260912/`. Nenhum arquivo de áudio mudou. Este resultado não transfere o aceite humano histórico para o incremento atual.

Para a escuta da task16: confirmar silêncio no título; People1 no prólogo/taverna; Drips, Wind1 e Darkness nos respectivos contextos; Musical1/Organ nos finais; os dez efeitos da tabela histórica; independência das quatro categorias e Temas durante reprodução, incluindo mute e retorno de Options. Verificar HIDE, leitura AUTO/FAST elegível e Continue sem duplicação de cues fora das repetições nativas previstas do final. Balanço percebido e adequação artística permanecem pendentes de escuta e julgamento humano.
