# Contribuindo

Mensagens de commit e pull requests devem registrar primeiro a mudança do ponto de vista do jogador. Detalhes técnicos e de produção continuam importantes, mas entram como contexto para explicar como a experiência foi construída.

## Ativar o template de commit

Depois de clonar o repositório, execute uma vez, a partir de qualquer pasta do projeto:

```sh
git config --local commit.template "$(git rev-parse --show-toplevel)/.gitmessage"
```

O arquivo [`.gitmessage`](.gitmessage) será aberto pelo Git ao criar um commit sem a opção `-m`. Editores e clientes gráficos podem exigir que a criação do commit seja aberta no editor para exibir o template.

O arquivo [`.github/pull_request_template.md`](.github/pull_request_template.md) é carregado automaticamente ao abrir um pull request no GitHub.

## Princípio de escrita

Use esta ordem:

1. O que mudou para o jogador.
2. Por que isso altera a experiência.
3. Como a mudança foi validada.
4. Quais decisões técnicas ou de design precisam ficar registradas.
5. Que imagens e momentos ajudam a contar essa história em um devlog.

Evite mensagens como `ajustes`, `polimento` ou `implementa sistema` sem explicar o resultado observável. Uma boa descrição permite entender e demonstrar a entrega sem reconstruir sua intenção a partir do diff.

Quando uma alteração for apenas técnica, documental ou preparatória, declare que ela não muda diretamente a experiência atual e explique o que foi viabilizado. Não atribua ao jogador um benefício que não foi observado ou validado.

Organize cada commit em torno de um resultado coerente. Separe mudanças de design, narrativa, balanceamento, interface, áudio, implementação e validação quando elas puderem ser revisadas e revertidas independentemente.

## Exemplo de commit

```text
docs(gdd): consolida o catálogo brasileiro de armadilhas

Experiência do jogador:
- Antes: os encontros ainda misturavam conceitos provisórios e não tinham distribuição fechada de competências.
- Agora: as duas masmorras possuem identidades distintas e um catálogo de armadilhas com abordagens comparáveis.
- Por que importa: o protótipo pode testar leitura de risco e composição do grupo sobre uma baseline explícita.

Validação:
- [x] A matriz do catálogo foi conferida contra as competências e os estados de viabilidade descritos no GDD.
- [ ] O catálogo ainda não foi validado em playtest.

Bastidores:
- O GDD sem sufixo de versão permanece como fonte canônica; versões numeradas preservam somente o histórico.

Material para devlog:
- Momento demonstrável: comparação entre uma armadilha física e uma sobrenatural.
- Captura sugerida: quadro mostrando as três abordagens e as competências associadas.

Limitações:
- Ritmo, clareza das pistas e efeito bola de neve ainda dependem do protótipo e de playtests.
```
