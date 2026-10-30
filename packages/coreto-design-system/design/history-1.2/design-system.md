# Revisão visual aprovada — Coreto primeiro

A referência ativa é `coreto-approved-2026-10-17-r2`, anterior ao segundo refinamento rejeitado, com a exceção aprovada do mapa fechado. [Revisão no Figma](https://www.figma.com/design/mST7JediMzHTA4IkE2skw8/design-system-coreto?node-id=148-197). O snapshot de 56 tokens conserva IDs e aliases; não determina automaticamente os defaults de uma instalação posterior.

## Destinos de configuração

| Propriedade | Responsável efetivo |
|---|---|
| Tela, fonte básica, tamanho e opacidade | Sistema MZ |
| Tinta, fundo dos itens, espaçamentos e altura global | CoreEngine: Color e Window; ItemHeight 48 soma à entrelinha 28 e resulta em 76 px |
| Fundo dos itens e receita compartilhada | CoreEngine: DrawItemBackgroundJS, callback completo e autossuficiente |
| Fontes, escapes, mensagem e escolhas | MessageCore: CustomFonts, General e comandos nativos nos eventos |
| Console e continuação | ExtMessageFunc: imagens, fontes, cores e cursor; DS não redesenha o console |
| Categorias, idioma, alternância e volume | OptionsCore: Categories/Icon e callbacks DrawJS completos |
| Slots e metadados | SaveCore: BoxContentsJS e BoxFileDataJS completos |
| Botões em pictures e cartões estáticos | Assets, Show Picture, PictureTextChange; interação e tons no PictureChoices |
| Destino desconhecido | Ramo nativo do switch 33 em CE39, asset e Languages.tsv |
| Título, menu, posições e visibilidade | Eventos/pictures e provedores; sem placa, halo ou novo bloqueio de menu |

[ownership-audit.json](ownership-audit.json) cobre as 101 propriedades anteriores e seis novas medidas de Opções: 83 migradas, cinco retiradas e 19 mantidas/criadas como composição residual, incluindo ativação. Não há segundo parâmetro editável de cor, fonte, ícone, card, botão ou console no DS. `api describe /Surfaces/panel` redireciona ao CoreEngine; `parameters set` recusa esse caminho.

## Intervenções residuais do runtime

| Intervenção | Lacuna e comportamento |
|---|---|
| Painéis, fundo de Help e campo de nome | Skin nativa não diferencia superfícies por classe nem compõe borda dupla proporcional; desenho preserva ciclo de vida e descarte |
| Geometria de Opções | OptionsCore fixa retângulos da cena; CoreEngine fornece métricas globais. Wrappers aplicam somente composição específica |
| Hover + seleção + pressão | Callback recebe retângulo; extensão coleta estado transitório e redesenha, substituindo o cursor apenas onde representa estados combinados |
| Crescimento de escolhas | Mede texto localizado, preserva escapes e mantém desenho e hit-test alinhados; cache limitado a 100 entradas |
| Nome no diálogo e cursor no canto | Composição adicional; offsets, gráfico, parsing, HIDE e callbacks continuam nos provedores |
| Papéis estáveis das pictures | Lista tipada PictureRoles associa asset a receita; dimensões vêm do PNG. Não duplica posição, escala ou interação dos provedores. Botão/card permanece explícito após limpeza dos vínculos |
| Contraste contextual | Representa texto sobre papel/cena e texto inverso; consulta cores no provedor/receita persistida |
| Voltar com hover e setas | Complemento de estados; ButtonSet e skin garantem base sem DS |

Essas intervenções são wrappers de métodos, não callbacks públicos disfarçados. O DS funciona em MZ puro. Os callbacks Coreto não precisam dele para desenhar a base. Desativado, permanecem fontes, cores, cartões, título transparente, console, controles e destino protegido. As diferenças esperadas são estados combinados, composição de nome/cursor, quebra automática e geometria específica de Opções.

## Decisões arquivadas

Placa roxa e filete, nomes como cards, halo, card ameixa, memorial pedra, faixa de 8 px, substituição/ocultação adicional do hambúrguer e desfoque estão superados. O Figma mantém cópias históricas fora da referência ativa. Aliases antigos continuam identificáveis sem voltar a ser defaults.

## Assets e atualização

O preset grava valores antes do playtest. Reinstalar preserva parâmetros e campos desconhecidos; `--reapply` é reset explícito dos valores do preset. Os três configuradores legados encaminham ao novo fluxo.

Na versão 1.2.0, o perfil Dryland substitui o adaptador de runtime por configuração de pictures. O único novo parâmetro residual é a associação imagem/receita, ausente no catálogo PictureChoices: esse provedor configura interação, posição, escala, opacidade e tons, mas não receitas de superfície e estados combinados. Não foram acrescentados parâmetros de dimensões, fontes ou cores.

O ícone de conversa é configurado em `Dryland_2_ConversationIndicators/IndicatorImage`; a reserva de espaço pertence ao seu método `choiceAdornmentWidth()`. `Dryland_2_CreditsScroll` informa `Window_ScrollText.textSurface()` e `Dryland_Presentation` informa `Sprite_Picture.uiActionActive()`. A biblioteca consulta esses contratos opcionais sem conhecer o jogo. Não há chamadas a CoretoDesignSystem nesses plugins nem alterações de regras, condições ou save. O adaptador legado deixa de ser instalado e é removido transacionalmente.

O mapa fechado foi gerado com imagegen, em modo de imagem nova, e exportado para `assets/Coreto_ConcealedMap.png`, 330×188. O Figma usa a mesma ilustração. Prompt: “One fully CLOSED folded old parchment map viewed at a gentle angle, centered on a quiet pale warm parchment backdrop #F9EACF. Pen and sepia ink, fine crosshatching, subtle paper texture. No exposed map markings, landscape, geographic shapes, writing, symbols, ribbons, glow or purple. No interface or text included.”

O pacote inclui as fontes OFL, Outfit Medium estático, ícones, console, skin, ButtonSet e atlas do perfil Dryland. Preserve esses arquivos no deploy com poda de assets. As artes narrativas existentes não são substituídas.
