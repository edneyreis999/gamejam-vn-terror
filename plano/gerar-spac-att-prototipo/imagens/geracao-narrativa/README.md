# Personagens e cenários provisórios

Gerados em 5 de setembro de 2026 com a ferramenta nativa `image_gen`, usando [Gorvak](../herois/Gorvak.png) como referência de traço, hachuras e preenchimento bege. São assets de avaliação autorizados no ADR-009 de `prototype-v2-gdd-layouts`.

| Asset | Arquivo | Dimensões |
| --- | --- | --- |
| Ivaí | [personagens/ivai.png](../personagens/ivai.png) | 1024 × 1536 px |
| Floraí | [personagens/florai.png](../personagens/florai.png) | 1024 × 1536 px |
| Pérola | [personagens/perola.png](../personagens/perola.png) | 1024 × 1536 px |
| Andirá — reflexo | [personagens/andira.png](../personagens/andira.png) | 1024 × 1536 px |
| Igreja — prisão sob o altar | [cenarios/igreja-interior.png](../cenarios/igreja-interior.png) | 1536 × 1024 px |
| Parque — raízes da figueira | [cenarios/parque-figueira.png](../cenarios/parque-figueira.png) | 1536 × 1024 px |
| Casa do Conselho | [cenarios/casa-do-conselho.png](../cenarios/casa-do-conselho.png) | 1536 × 1024 px |

Os [prompts integrais](prompts.md) registram uma geração por asset. Andirá recebeu uma [revisão facial](andira-revisao.md) para remover barba e reduzir o nariz, preservando o reflexo. O [manifesto](manifest.json) registra os caminhos dos originais selecionados e da variante descartada.

## Uso na avaliação

- Retratos e cenários são imagens separadas para composição. Os retratos têm fundo branco opaco, sem canal alfa; não são recortes transparentes.
- Os cenários não contêm personagens incorporados. Pérola permanece presa na pedra e Floraí na figueira na narrativa; seus retratos de diálogo não representam libertação antecipada.
- Andirá é representado somente dentro do reflexo na água. Não deve ser apresentado como um corpo físico no Conselho nem como revelação corporal antecipada.
- Os cenários narrativos são distintos das três [prévias de destino](../destinos/README.md), já geradas.
- Estes assets ainda não foram integrados ao runtime. Detalhes visuais além dos fatos do GDD são propostas provisórias, sujeitas à revisão da equipe.
- A versão de avaliação pode usar os placeholders. A entrega do jogo continua exigindo artes finais conforme a direção canônica.

## Conferência realizada

As sete imagens selecionadas foram abertas e inspecionadas visualmente. Foram conferidos personagem ou ambiente, traço, composição, ausência de texto de interface e restrições narrativas. Os PNGs selecionados foram copiados sem alteração para o projeto; os originais foram preservados. A conferência de dimensões e integridade compara cada cópia ao arquivo original, conforme [verificacao.md](verificacao.md).

Esta revisão não equivale a aprovação artística final, revisão cultural ou teste das imagens dentro do layout implementado.
