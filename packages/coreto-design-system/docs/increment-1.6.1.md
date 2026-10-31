# 1.6.1 — pacote portátil completo

Este incremento preserva as APIs e a direção visual das versões 1.4–1.6.0. Corrige a fronteira de distribuição: receitas compartilhadas pertencem a `coreto-default`; identificadores de campanha continuam no perfil opcional `dryland`.

## Contrato

A instalação genérica inclui pergaminhos, pinceladas, lacres, foco semântico, tipografia, janelas, opções, saves, controles ilustrados e as receitas atuais do console. Não exige plugins, imagens ou traduções de um jogo específico. O consumidor fornece conteúdo e vincula controles às ações que já existem. `registerAdapter`, slots e projeção de texto são observacionais; eventos e objetos persistidos não são alterados.

`design/preset.json` contém valores compartilhados e as migrações dos valores antigos reconhecidos. Na atualização, um valor já atual é preservado, um valor antigo conhecido é migrado e outro valor em um campo migrado causa conflito. Os demais campos personalizados são preservados. Na primeira instalação, o usuário opta pelo preset visual completo. Callbacks de desenho reconhecidos são delegados; personalizações conflitantes são identificadas antes da escrita. Opções externas e handlers permanecem intactos. `design/compatibility.json` reúne os hashes de assets e callbacks reconhecidos, sem carregar uma integração de campanha.

A preparação autentica os arquivos gerenciados pelo manifesto SHA-256, faz preview, guarda hashes de preparação e usa recibos de restauração exata. Esses hashes verificam integridade, não constituem uma assinatura digital. Não há serviço remoto ou dependência nova.

## Verificação

Os contratos próprios cobrem instalação, atualização dos valores conhecidos, conflito, preservação de conteúdo e handlers, alteração concorrente, restauração e idempotência. O perfil Dryland conserva seus contratos de integração e proteção de narrativa oculta. Nenhum teste compara aparência.

Para inspeção, instale o ZIP extraído em projeto descartável com provedores Coreto e sem plugins Dryland. Use o exemplo independente em PT/EN, viewport 1280×720 e 1600×900, DPR 1; inspecione foco, seleção, indisponibilidade, ocultação e redução de movimento. Exercite opções, saves e leitura pelos controles do exemplo. Verifique o console em uma cena nativa de mapa do consumidor, onde o provedor o disponibiliza. Registre resultados e capturas fora do pacote. Chrome desktop é o ambiente técnico; aceite artístico humano é separado.

Devlog: mostrar o mesmo exemplo nos dois idiomas e resoluções, abrir opções e console, e reaplicar o pacote com zero alterações. Isso demonstra a reutilização sem campanha.

## Limites

A versão não transforma automaticamente telas próprias de outro jogo. Elas precisam de adaptadores que forneçam papéis, conteúdo e associações. O núcleo não infere mapas, personagens, progresso ou regras. O perfil `dryland` continua necessário para reproduzir a composição daquele jogo.

O console reduz a largura de cada botão quando a quantidade configurada excede a largura disponível. A reserva interna, os handlers e a elegibilidade continuam nativos; configurações que já cabem mantêm a largura anterior.
