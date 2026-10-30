# Consultar recursos para uma oferta

Use a CLI e a seleção de jogo definidas nas instruções deste projeto para encontrar recursos adequados à cena.

## Da intenção ao recurso

Escolha o namespace pela experiência desejada. Consulte também um vizinho quando procurar uma combinação menos óbvia.

| Experiência | Comece por | Explore também |
| --- | --- | --- |
| Peso e leitura do combate | `battle`, `skills-states` | `element-status` |
| Expressão dos personagens | `message`, `vn`, `ani-message` | `attached-pictures` |
| Ritmo e conforto de leitura | `ext-message`, `message-visibility` | `options` |
| Resposta às escolhas | `picture-choices`, `choice-common-events` | `vn`, `core` |
| Movimento e reação do mundo | `events-move`, `core` | `event-title-scene` |
| Identidade e progressão visível | `main-menu`, `element-status`, `items-equips` | `save` |
| Conforto e consistência visual | `options`, `save`, `design-system` | Provedor da tela afetada |

Exemplo de descoberta, **somente leitura**, a partir da raiz do projeto:

```sh
node coreto/tools/coreto/cli.mjs battle --help
node coreto/tools/coreto/cli.mjs battle api list
node coreto/tools/coreto/cli.mjs battle api describe BATTLE-P-54 --json
```

Use `--help` para conhecer as operações do namespace, `api list` textual para encontrar candidatos e `api describe` para entender cada um. A ajuda principal revela outros namespaces disponíveis. Se o índice exceder a saída, filtre suas linhas por tema; leia depois os descritores completos dos candidatos. Evite o índice JSON expandido de todo o catálogo.

Os exemplos de [inspirações](inspiracoes.md) são pontos de partida. Pesquise outras capacidades conforme o contexto, em vez de limitar a conversa às sementes da referência.

## Confirmar o que a ideia promete

Leia `description`, `context`, `dependencies`, `availability`, `plugin` e `authoring` quando presentes. Siga os descritores indicados por esses campos. Verifique:

- **Efeito:** o resultado percebido corresponde ao que a funcionalidade faz?
- **Contexto:** funciona naquela cena, alvo e momento? Há condições de entrada, persistência ou encerramento?
- **Composição:** cada parte da ideia funciona junto das demais, inclusive com os eventos nativos usados?
- **Provedor:** a Coreto fornece o efeito inteiro ou a entrada apenas integra outro plugin?

`supported`, `implemented` e `in-scope` não significam “pronto neste jogo”. Uma menção a VisuMZ pode ser compatibilidade histórica ou um provedor alternativo; confira se a capacidade pode ser atendida integralmente pelos plugins Coreto disponíveis. Um método de runtime documentado também não implica uma operação de CLI com o mesmo nome.

## Conferir somente o que afeta a proposta

Consulte os parâmetros, eventos e assets necessários para avaliar a proposta. Confira a ativação do plugin em `js/plugins.js` quando essa informação ainda não estiver no contexto.

Leituras úteis, com `<jogo>` substituído pela seleção já conhecida:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle parameters get --path /Damage/CriticalColor --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" options lists list --path /Categories --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" ani-message effects list --family AngleEffects --json
```

Use também `commands list`, `tags list` ou `text get` quando publicados pelo namespace, com alvos encontrados na cena em questão. O default do catálogo não comprova o valor efetivo; se houver dúvida sobre qual configuração está em uso, consulte o guia de autoria deste projeto.

Confira a existência dos assets necessários. Uma picture decorativa não vira automaticamente um elemento clicável; uma imagem de retrato não garante todas as expressões propostas. Se faltar conteúdo ou ativação de um plugin opcional, explique esse requisito na oferta. As consultas não aplicam a ideia.

## Armadilhas ao escolher o recurso

Estes exemplos merecem atenção na leitura das dependências:

| Consulta | O que verificar |
| --- | --- |
| `battle api describe BATTLE-C-46` | Câmera depende de ActSeqCamera externo |
| `battle api describe BATTLE-C-108` | Time Stop depende de ActSeqImpact externo; ter filtros não fornece o efeito |
| `battle api describe BATTLE-C-204` | Projéteis dependem de ActSeqProjectiles e suas dependências |
| `message api describe LOG-M-001` | Integração com MessageLog externo |
| `message api describe SND-M-001` | Sons por letra dependem de MsgLetterSounds externo |
| `ext-message api describe EXT-M-026` | Espera de voz depende de VoiceActControl externo |

Da mesma forma, uma opção de pegadas, poeira ou clima pode controlar outro plugin. A presença do controle não comprova que a Coreto produza o efeito. Reconfirme essas condições na CLI atual antes de classificar um candidato.

## Quando a consulta não responde

Leia o diagnóstico, volte à ajuda ou ao índice e ajuste a consulta. Um ID ausente pode ter mudado; procure a capacidade antes de abandonar a ideia. Um erro como `ANI_NOT_CONFIGURED` impede conhecer a configuração atual, mas não elimina a capacidade documentada do plugin opcional.

Se faltar parte de um descritor por truncamento, recupere-a antes de concluir. Se a CLI continuar inacessível, reconheça a lacuna e continue entendendo a cena, sem assegurar suporte por memória ou pelos exemplos desta referência.
