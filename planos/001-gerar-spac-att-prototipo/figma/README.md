# Como acessar os layouts do Figma

Guia para agentes e desenvolvedores consultarem as referências visuais do protótipo. Acesso visual verificado em **5 de setembro de 2026**, pelo navegador controlado com Playwright. A disponibilidade depende das permissões do arquivo e da sessão utilizada.

## Links e conteúdo observado

Os três links pertencem ao arquivo `game-jam-vn-terror`, cuja chave é `9wIDhV1yDkoQMNYZHbY9r7`.

| Link | ID para ferramentas do Figma | Resultado observado no navegador |
| --- | --- | --- |
| [Página — 0-1](https://www.figma.com/design/9wIDhV1yDkoQMNYZHbY9r7/game-jam-vn-terror?node-id=0-1&p=f) | `0:1` | Abriu exibindo a composição identificada como `menu-inicial`: ilustração em tons de cinza com personagens em uma sala ao redor de uma mesa. |
| [Diálogo e escolhas — 34-186](https://www.figma.com/design/9wIDhV1yDkoQMNYZHbY9r7/game-jam-vn-terror?node-id=34-186) | `34:186` | Fundo de fantasia sombria, três personagens à esquerda, três opções à direita com bordas de pergaminho e caixa de texto clara na faixa inferior. |
| [Quadro de personagens — 12-64](https://www.figma.com/design/9wIDhV1yDkoQMNYZHbY9r7/game-jam-vn-terror?node-id=12-64&p=f) | `12:64` | Quadro identificado como `Desktop - 1`, com várias composições de personagens e balões de conversa levemente estilizados, conforme esclarecimento do autor durante a entrevista. Abriu com zoom de 7%, insuficiente para ler os textos internos. |

As descrições registram o que apareceu na sessão. O link de página `0:1` não deve ser tratado como um endereço exclusivo do frame `menu-inicial`.

## Caminho que funcionou: navegador com Playwright

1. Descubra as ferramentas de navegador disponíveis na sessão. Neste ambiente, elas aparecem como `mcp__playwright__browser_*`.
2. Abra um dos links com `browser_navigate`.
3. Consulte `browser_snapshot` para identificar a interface carregada e os controles disponíveis. Se o canvas ainda estiver carregando, obtenha um novo snapshot antes da captura.
4. Capture a tela com `browser_take_screenshot` e examine a imagem retornada. O snapshot textual mostra os controles do Figma, mas não substitui a imagem do layout desenhado no canvas.
5. Se necessário, use os controles de zoom e navegação identificados em um snapshot atualizado. Em `12:64`, amplie cada composição antes de tentar ler suas fichas. Não deduza texto a partir da visão geral em 7%.
6. Quando banners ou painéis cobrirem a referência, identifique seus controles no snapshot e feche-os antes de produzir uma captura de comparação. As referências de elementos mudam entre navegações: não reutilize IDs de uma sessão anterior.

Exemplo executável pelo orquestrador `functions.exec` deste ambiente:

```js
text(await tools.mcp__playwright__browser_navigate({
  url: "https://www.figma.com/design/9wIDhV1yDkoQMNYZHbY9r7/game-jam-vn-terror?node-id=34-186"
}));
```

Após a navegação, consulte os controles:

```js
text(await tools.mcp__playwright__browser_snapshot({}));
```

Capture e encaminhe a imagem para inspeção visual:

```js
const result = await tools.mcp__playwright__browser_take_screenshot({
  scale: "css"
});
for (const item of result.content ?? []) {
  if (item.type === "image") image(item);
  else if (item.type === "text") text(item.text);
}
```

As chamadas devem seguir essa ordem, pois usam a mesma página do navegador. Os helpers `text` e `image` pertencem a `functions.exec`; este exemplo não é um script independente de Node.js.

Na verificação, o navegador exibiu o arquivo junto de um convite para cadastro. Foi possível visualizar o canvas sem concluir login. Isso não comprova acesso para editar, inspecionar propriedades ou exportar assets.

## Integração oficial do Figma: tentativa e limite observado

A chamada abaixo foi executada para o nó `34:186`:

```js
text(await tools.mcp__figma__get_screenshot({
  fileKey: "9wIDhV1yDkoQMNYZHbY9r7",
  nodeId: "34:186"
}));
```

A integração retornou erro informando falta de acesso de edição ao arquivo e sugerindo que o proprietário compartilhasse o arquivo com a conta conectada como editor. Portanto, **o navegador permitiu a visualização, mas a integração não forneceu a captura solicitada**. Essa resposta descreve a tentativa realizada; não estabelece uma regra geral sobre todas as formas de acesso ao Figma.

Se as permissões da conta conectada forem ajustadas, repita a leitura. Para extrair contexto com `get_design_context`, carregue antes a skill `figma-design-to-code`, conforme exigido pela ferramenta, usando a skill instalada ou o recurso `skill://figma/figma-design-to-code/SKILL.md`. Converta os IDs da URL de hífen para dois-pontos, como `34-186` → `34:186`.

Não é necessário aguardar acesso de edição para continuar uma inspeção visual pelo navegador quando ele já consegue abrir o arquivo. Se esse caminho também ficar indisponível, solicite uma captura do frame ou os assets exportados à pessoa responsável pelo Figma.

A tentativa de abrir o link `34-186` com `web.run` falhou com erro da ferramenta de navegação. Essa falha não provou que o arquivo estivesse inacessível: Playwright conseguiu abri-lo na mesma sessão.

## O que essa consulta permite reproduzir

A captura permite observar distribuição dos elementos, aparência geral, cores aparentes, proporções e hierarquia visual. Serve como referência para reproduzir a composição e compará-la depois com uma implementação.

Não foram validados por esse acesso: fontes exatas, valores de cores, dimensões nativas dos frames, espaçamentos, constraints, regras responsivas, interações do protótipo ou exportação dos assets originais. Medidas na captura dependem do zoom e da janela; não devem ser registradas como medidas nativas do design.

Para reproduzir ilustrações e tipografia com fidelidade, obtenha os arquivos originais ou exports e os dados de estilo. Capturas com barras do editor, seleção ou banners servem para inspeção, mas não equivalem a um export limpo do frame.

Este guia documenta acesso às referências, sem aprovar mudanças de produto. Antes de derivar decisões de design, consulte o [GDD canônico](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) e preserve a distinção entre decisões confirmadas, baseline de protótipo, pendências e itens fora do escopo. A consulta externa ao Figma não autoriza adicionar dependências de rede ao runtime offline do protótipo.

## Verificação registrada

- Os três endereços foram abertos e suas capturas examinadas nesta conversa.
- `34:186` foi inspecionado no pedido anterior; `0:1` e `12:64`, durante a elaboração deste guia.
- A chamada oficial `get_screenshot` foi testada somente para `34:186` e falhou por permissão.
- Não foram executados `get_design_context`, exportação de assets, edição do Figma ou implementação do layout.
- As capturas retornadas pelo Playwright ficaram nos artefatos temporários da sessão; não foram incluídas neste diretório.
