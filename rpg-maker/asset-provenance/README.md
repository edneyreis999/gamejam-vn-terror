# Assets da apresentação nativa

## Aceite do incremento — 2026-09-10

O usuário aprovou os testes humanos do estado atual. Este aceite supera as pendências históricas de revisão abaixo para o incremento init-rpg-maker-mz, incluindo a seleção de áudio e a apresentação dos assets existentes. Proveniência, arquivos e referências de baseline permanecem inalterados; não houve substituição de assets nesta aprovação. Registro: [aceite humano](../../docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json). A audição foi informada pelo usuário, não realizada pelo agente.

## Histórico da seleção

## Mapa — task 08

As três imagens são propostas provisórias geradas com `image_gen.imagegen` no modo **builtin**. O mapa completo serviu como referência das duas peças. A versão importada de cada arquivo conserva o PNG gerado, sem edição posterior dos pixels. A escala e o posicionamento são comandos nativos do RPG Maker.

| Imagem no projeto | Papel |
|---|---|
| `The Dryland Drowned/img/pictures/Dryland_MapComplete.png` | Resultado da sobreposição; revela a entrada |
| `The Dryland Drowned/img/pictures/Dryland_MapDwarven.png` | Fragmento anão; sozinho não mostra a entrada |
| `The Dryland Drowned/img/pictures/Dryland_MapElven.png` | Fragmento élfico; sozinho não mostra a entrada |

Todas usam canvas de 1254 × 1254 e transparência RGBA. O eixo da igreja, da figueira e das bordas permanece registrado no mesmo canvas. A apresentação centraliza o conteúdo visível de cada peça no recebimento e usa a origem comum durante a sobreposição. O desenho é um objeto narrativo provisório; seus detalhes não acrescentam geografia confirmada ao GDD.

Os prompts completos e a seleção dos resultados estão em [map-prompts.json](map-prompts.json). Dimensões, limites opacos e SHA-256 estão em [map-inspection.json](map-inspection.json). Três tentativas da peça anã foram rejeitadas por conter quadriculado opaco; o quarto resultado foi aceito para integração após verificar seu alfa. Os rascunhos permanecem em `.compozy/tasks/init-rpg-maker-mz/assets/map-generation/`.

Pérola e Floraí foram importados byte por byte de `prototype/assets/characters/perola.png` e `florai.png`, que já eram derivados transparentes documentados no inventário do protótipo. Continuam sujeitos à revisão artística final da equipe.

Existência e alfa dos arquivos não constituem aprovação visual. As capturas e verificações da composição nativa pertencem aos casos IT-052/IT-053 em `docs/qa/evidence/init-rpg-maker-mz/task-08/`.

## Memorial e finais

As artes v2 dos finais e o fundo do memorial foram importados sem alteração de pixels; veja closing-imports.json. A moldura com centro transparente foi preparada pelo gerador de imagens, com a tentativa rejeitada e a aceita preservadas. Prompts e inspeção estão em memorial-prompts.json e memorial-inspection.json. Os recortes em memorial-source-crops.json são retângulos de apresentação nativa, não arquivos de imagem editados. Os PNGs dos heróis permanecem intactos. A composição nativa ainda está sendo verificada; a aprovação artística final segue pendente.
