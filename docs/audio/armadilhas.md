# Áudio das armadilhas

Referência da apresentação sonora aprovada em 6 de novembro de 2026. As cenas continuam nos eventos nativos do RPG Maker MZ; o texto, as escolhas e as regras da campanha permanecem iguais. Os sons abaixo são arquivos locais. A seleção foi aprovada durante a revisão com o dono do jogo; o conforto da mixagem integrada ainda depende de escuta humana.

## Descrições e releituras

Cada ambiência começa no ponto indicado e acompanha a leitura, inclusive ao usar Rever descrição. Ao aparecerem as opções, ela termina e dá lugar ao coração. A música da rota continua durante a descrição.

| Armadilha | Som e início | Volume do evento | Cadência |
| --- | --- | --- | --- |
| A1 — Saci engarrafado | Garrafas com vento, após a primeira fala | 45 | Garrafas a cada 3 s; vento contínuo |
| A2 — Trilha de Pés Virados | Passos em folhas, na apresentação | 90 | Repetição do clipe de 10 s |
| A3 — Pilão da Cuca | Pancadas de madeira, na apresentação | 90 | Ciclo de 3 s |
| A4 — Jaula do Mapinguari | Rugido, na terceira fala | 90 | 6 s de som e 5 s de pausa |
| A5 — Mula-sem-Cabeça | Correntes arrastando, na segunda fala | 70 | 8 s de som e 5 s de pausa |
| A6 — Pomar do Corpo-Seco | Insetos noturnos, na primeira fala | 50 | Ambiência contínua |
| A7 — Homem do Saco | Saco mais grave, na segunda fala | 90 | Clipe de 4,8 s e 5 s de pausa |
| A8 — Telhado da Pisadeira | Passos suavizados, na primeira fala | 85 | Ritmo original do clipe |
| B1 — Matinta | Melodia distante com notas sustentadas | 70 | Repetição do clipe com eco discreto |
| B3 — Boitatá | Fogo suave, na segunda fala | 75 | Contínuo durante a descrição |
| B5 — Loira do Banheiro | Pingos, na primeira fala | 85 | Ciclo de 6 s |
| B6 — Iara | Cantarolar feminino com eco reforçado | 85 | Repetição do clipe |
| B7 — Rasga-Mortalha | Grito de ave mais baixo e menos agudo | 75 | Ciclo de 4 s |
| B8 — Cabra-Cabriola | Passos na madeira ao dobro do tempo original | 65 | Repetição sem alterar o tom |

A2 também toca um único uivo de lobo no início da segunda fala, volume 55. O uivo termina naturalmente e reaparece uma vez ao reler. B2 e B4 conservam a ambiência da rota durante a descrição.

## Opções, erro e sacrifício

Nas dezesseis armadilhas, a música baixa ao longo de dois segundos enquanto o coração entra, sem atrasar as opções. O coração usa volume de evento 100 e reforço de 4 dB no arquivo, respeitando o volume de ambiente configurado pelo jogador. Sua repetição evita o trecho ruidoso no final da gravação.

O coração continua durante a explicação da falha e a escolha da vítima. Ao acertar ou confirmar a vítima, o áudio da rota volta. Rever descrição restaura o som daquela armadilha e devolve o coração às opções ao terminar. Na B3, isso substitui a decisão anterior de manter o fogo durante a escolha da abordagem.

Os volumes de música anteriormente ajustados no PR foram preservados: 15 na Igreja e 17,5 no Parque e no Vilarejo. Nenhuma preferência pessoal de volume foi alterada.

## Fontes e implementação

- Fontes escolhidas pelo usuário: passos em folhas, pancadas de madeira, rugido, correntes, saco, passos no telhado e cantarolar feminino fornecidos via ElevenLabs.
- Prévias aprovadas: melodia de notas longas da Matinta, fogo com estalos reduzidos, água pingando e passos rápidos na madeira.
- Biblioteca existente do RPG Maker MZ: vento, Night, Wolf, Drips e Crow. Os efeitos originais de morte foram preservados.
- Eventos dos mapas controlam o começo e o fim das ambiências; o evento comum de contexto controla a transição para o coração. Engine, plugins Coreto e regras de campanha não foram alterados.
- O executor de testes no Windows passa a usar processos ocultos sem consoles destacados, preservando o encerramento dos descendentes. A configuração de limites permanece a do projeto.

## Verificação e escuta

Na cópia local anterior à publicação, o teste de áudio passou pelas dez descrições recuperadas e suas releituras. A jornada das três rotas passou pelas dezesseis armadilhas. As revisões pontuais também verificaram garrafas com vento, uivo, insetos noturnos, correntes e pilão. O reforço do coração foi medido em aproximadamente 4,03 dB, com pico decodificado 0,686 e pontos de loop preservados.

A cópia que integra o PR com a main passou no Chrome pelos testes IT-029 (áudio nativo, 34,9 s) e IT-087 (três rotas, 201,5 s), executados em paralelo. Os limites configurados foram três workers e três navegadores; o pico foi dois de cada, com encerramento dos recursos próprios confirmado. Recibos brutos e instrumentação temporária permanecem locais, fora do PR. Os validadores nativos têm achados preexistentes de CreditsPage ausente e comandos do evento comum 2; não são falhas introduzidas por esta edição. NW.js, editor e build publicado não são qualificados por esses testes no Chrome.

Para ouvir, abra o jogo pelo procedimento local documentado, entre na armadilha e compare a descrição, Rever descrição e as opções. O menu Debug já existente pode ajudar a alcançar os encontros no ambiente de desenvolvimento. Uma gravação útil para o devlog reúne a descrição de A1, uma passagem da A3 ou A5 com pausa, a transição de B3 e a continuidade do coração até confirmar a vítima. Ainda falta anexar um clipe de áudio e obter aceite humano da mixagem completa.
