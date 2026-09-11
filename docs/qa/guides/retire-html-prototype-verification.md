# Plano histórico de verificação da retirada HTML

Este plano foi executado e encerrado em 10/09/2026. O resultado, o aceite e a organização estão registrados em [verification.md](../../../planos/tasks/retire-html-prototype/verification.md), fonte do encerramento. Não é um procedimento para repetir a migração ou reconstruir a implementação retirada.

| Lote executado | Critérios e responsável | O que foi verificado |
| --- | --- | --- |
| A — preservação | V-001/V-003: task 02; V-004/V-005: task 03 | Ausência da árvore e ferramentas retiradas; comparação pré/pós dos assets e dos 50 JSON, permitindo somente a anotação autorizada; manifesto, validador e unidades selecionadas. |
| B — documentação | V-002: task 04 | Orientações, histórico, metadados e links; resultados anteriores preservados, navegação obsoleta removida. |
| C — aceite | V-006: usuário | Clareza do projeto único e tratamento do histórico, aprovados em 10/09/2026. |

A baseline pré-retirada e os resultados brutos permanecem no acervo local ignorado descrito na [entrega](../deliveries/retire-html-prototype/README.md#acervo-local). A cópia temporária de testes registrada na task 01 foi removida após a execução. Esses caminhos são proveniência histórica, indisponível num clone novo; a comparação pré/pós não é reconstruível apenas a partir da árvore final.

Para verificações atuais, use um checkout normal e as dependências declaradas no [README MZ](../../../rpg-maker/README.md#verificar). Na raiz, os sensores sem navegador deste incremento podem ser executados com Node 22+:

```sh
node rpg-maker/tools/validate-content.mjs --json
node --test --test-name-pattern='^UT-(?!059)[0-9]{3}' rpg-maker/tests/campaign.test.mjs
```

Antes de reutilizar a seleção em outra revisão, confira os corpos e imports dos casos: UT-059 e todos os ITs foram excluídos deste ciclo por usarem navegador. O comando geral do README inclui integrações e tem pré-requisitos próprios. Use um checkout descartável quando precisar preservar as saídas anteriores, pois os testes escrevem resultados locais por ID.

U-001 cobre identidades e estruturas nativas; U-002 demonstra rejeição de passagens, ordem e opções inválidas; U-003 verifica envelopes na fronteira pura. Chrome, gameplay, screenshots, áudio e armazenamento real não foram sensores desta retirada e não são demonstrados por esses resultados. O escopo de verificações de outros incrementos deve ser definido por seus próprios contratos.
