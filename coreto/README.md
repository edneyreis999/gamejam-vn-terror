# Coreto neste projeto

O jogo está em <code>rpg-maker/The Dryland Drowned</code>, relativo à raiz que contém `coreto/`.
Neste guia, `<jogo>` significa esse caminho.

A Coreto instalada está em **code freeze**. `coreto/` contém os fontes completos dos plugins, catálogos e ferramentas para consulta e execução; os bundles ficam em `<jogo>/js/plugins/Coreto_*.js`. A IA não deve editar, regenerar ou recompilar nenhum deles. Desenvolva código exclusivo do jogo conforme [extensões](docs/extensoes.md).

## Começar

Use Node 22.23.2 ou posterior e execute os comandos na raiz deste projeto.
Abra `<jogo>/game.rmmzproject` no editor MZ. Os exemplos abaixo usam shell POSIX
(sh, bash ou zsh):

```sh
node coreto/tools/coreto/cli.mjs --help
node coreto/tools/dev/server.mjs --project 'rpg-maker/The Dryland Drowned'
```

O servidor imprime a URL do playtest. Encerre-o com Ctrl+C. A base suportada é MZ 1.10.0; o editor e o Node são instalações externas.

## Escolher a ferramenta

| Necessidade | Entrada |
| --- | --- |
| Descobrir recursos, ativar plugins, editar parâmetros, comandos, tags, textos e idiomas | [Autoria e CLI](docs/autoria.md) |
| Implementar comportamento exclusivo do jogo | [Plugins especialistas e tiers](docs/extensoes.md) |
| Percorrer o jogo, reproduzir bugs e capturar evidências | [QA dirigido](docs/qa.md) |

Leia somente o guia pertinente. Consulte a API por namespace e descritor; carregar todos os catálogos ou fontes no contexto da IA não é necessário.

## Ativar os plugins

Em jogo existente, a instalação preserva dados, assets, saves e `js/plugins.js`; copiar um bundle não o ativa. Uma base nova registra Core e Message desativados. Os demais bundles ficam disponíveis para instalação explícita pela CLI, que ativa apenas o plugin solicitado.

A configuração do jogo é editável: parâmetros, ativação, ordem do registry, eventos e assets. Toda extensão de código fica fora de `coreto/`. Preparar as dependências do runner pelo lock entregue é permitido conforme o guia de QA, sem editar fontes ou manifests.

## Atualizar a Coreto

Reinstalações pela distribuição oficial podem atualizar `coreto/` e os bundles. Conteúdo local de `AGENTS.md`, `CLAUDE.md` e `.gitignore` é preservado fora do bloco Coreto. `README.md`, testes, planos, ADRs e ferramentas próprias do projeto permanecem seus. Arquivos de distribuições antigas fora de `coreto/` não são removidos automaticamente.
