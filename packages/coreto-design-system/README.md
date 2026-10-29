# Coreto DesignSystem 1.6.1

Pacote portátil de apresentação para jogos RPG Maker MZ com provedores Coreto compatíveis. Inclui fontes de código, bundle gerado, tipografia e licenças, assets finais, catálogo público, presets, instalador, exemplo e contratos próprios. Não distribui a engine nem os binários dos provedores.

## Instalar

Requer Node 22+ e a CLI da distribuição Coreto do consumidor. Execute na pasta extraída do pacote:

```sh
node cli.mjs install --preset coreto-default --project "<projeto MZ>" --coreto-cli "<Coreto>/tools/coreto/cli.mjs" --dry-run
node cli.mjs install --preset coreto-default --project "<projeto MZ>" --coreto-cli "<Coreto>/tools/coreto/cli.mjs"
node cli.mjs validate --project "<projeto MZ>"
```

O preview identifica arquivos e hashes; personalizações conflitantes interrompem a preparação antes de qualquer escrita no projeto. Guarde o caminho `receipt` retornado. Repetir a instalação deve produzir `changed: 0`. Para restaurar os bytes anteriores:

```sh
node cli.mjs restore --project "<projeto MZ>" --input "<receipt.json>"
```

`coreto-default` entrega o tema completo, incluindo as receitas atuais do console, sem depender de plugins, imagens ou traduções Dryland. Cada jogo fornece conteúdo, elegibilidade e ações por adaptadores. Eventos nunca são criados ou migrados. O perfil opcional `--preset dryland` distribui as associações daquela aplicação específica; use esse perfil também nas atualizações dela.

## Compor e manter

- [Instalação, compatibilidade e API](docs/integration.md)
- [Decisões visuais](docs/design-decisions.md)
- [Contrato incremental 1.6.1](docs/increment-1.6.1.md)
- [Exemplo independente](examples/README.md)
- [Catálogo público](design/public-api.json)
- [Licenças e proveniência](docs/licenses.md)

Consulte `node cli.mjs --help`, `api list` e `api describe registerAdapter`. Edite `src/`, `design/` e os perfis; gere o bundle com `npm run build`. O consumidor não precisa de build.

```sh
node tools/build.mjs
node tools/manifest.mjs
npm test
npm run package
```

Os contratos com provedores usam `CORETO_TEST_PROJECT` (projeto Dryland descartável na baseline anterior) e `CORETO_TEST_CLI` (CLI Coreto instalada). Sem essas variáveis, esses contratos aparecem explicitamente como ignorados; os demais continuam executáveis. A fixture genérica remove todos os plugins de campanha. Não há dependências npm; a geração do ZIP usa Python 3 da máquina.

`dist/coreto-rpg-maker-theme-1.6.1.zip` e seu SHA-256 são reproduzíveis a partir das fontes versionadas. `manifest.json` cobre o conteúdo distribuído. Backups, staging, logs e capturas não entram no ZIP nem no Git. A distribuição oficial 1.6.0 permanece como histórico independente; este diretório é a fonte revisável da próxima versão.
