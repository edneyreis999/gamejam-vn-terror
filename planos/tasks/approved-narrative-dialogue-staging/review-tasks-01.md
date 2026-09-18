---
status: completed
date: 2026-09-18
scope: task-graph-review
verdict: SHIP
graph_approval: pending
---

# Revisão das tasks — integração narrativa e encenação

**SHIP para a coerência e a prontidão documental do grafo para aprovação.** Não foram encontrados defeitos acionáveis nas dez tasks. Este parecer não aprova o grafo em nome do usuário, não inicia implementação e não verifica o jogo integrado.

## Escopo e revisão fixada

- [Grafo](tasks.md) e task-01 a task-10, confrontados com [spec](spec.md), [verification](verification.md), cinco contratos de disciplina e trechos aplicáveis do [GDD canônico](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md).
- Baseline local: `82aad84dd5df2376e18d53720747fae8d8c0e9ac`; os documentos incluem alterações ainda não commitadas.
- Inspeção estática dos donos nativos citados: CampaignRules, configuração dos plugins, eventos comuns de descoberta/checkpoints/áudio e registro/definições dos testes canônicos.
- Consulta aos cinco commits de origem já disponíveis no Git local. Não houve consulta remota; a atualização das cabeças dos PRs continua atribuída à entrada da task 01.
- Segunda leitura independente, somente leitura, do grafo e de sua aderência aos contratos. Nenhum achado adicional.

Fingerprint SHA-256 dos onze arquivos de tasks: `792675721e9696f4d1f972d3b08c9dc125a2a4710cec36ff479ea9134dbed55e`. Cálculo: `tasks.md`, seguido de `task-*.md` em ordem, concatenando nome do arquivo, NUL, bytes e NUL. O resultado coincidiu entre as duas leituras. Os hashes dos documentos consultados permaneceram estáveis na conferência final.

| Autoridade | SHA-256 consultado |
| --- | --- |
| spec.md | `7aca890d74cc74fe4ec35a78fc1e9ab1d6edf16c6b2569ed2f89758a7b2a6f96` |
| verification.md | `b58d7793cb38b7f925915701bf991ad0c0dc15f3a81d3233dd25747c25cbe411` |
| GDD canônico | `fdbf3e039d064de0f52c4eb2fa3dad1a4b47366bb0393b0ad60397c3bb1bd5f5` |

## Achados

Nenhum achado acionável confirmado. Não há correção documental obrigatória identificada nesta revisão.

## Cobertura e parecer por task

| Task | Lente principal | Parecer documental |
| --- | --- | --- |
| [01](task-01.md) | Prólogo, composição dos plugins, áudio temporal e importação | Conforme. Preserva seis identidades/nove caixas de origem, compõe os dois deltas e exige inventário de consumidores e movimento reduzido. |
| [02](task-02.md) | Oito heróis, ramos alternativos, limiares e despedidas | Conforme. Preserva visitas de vivos não selecionados, menus, formação, identidades e o escopo além das conversas principais. |
| [03](task-03.md) | Associação das 30 substituições e conclusão de leitura | Conforme. Mantém escolhas, falhas, B3–B8 e mecânica; a matriz nativa tem dono e oráculo de origem. |
| [04](task-04.md) | Fechamentos, recompensa e continuidade | Conforme. Cobre ambas as ordens, solo, validação do plano, checkpoint anterior ao fechamento e continuação Irati/mapa. |
| [05](task-05.md) | Plano do Conselho, participantes e composição | Conforme. Alinha construção/validação, move Irati para depois das opiniões e cobre participantes e slots alcançáveis. |
| [06](task-06.md) | Finais, prioridade de derrota e áudio | Conforme. Preserva desfechos exclusivos, arte existente, duas unidades semânticas, controles e continuidade terminal. |
| [07](task-07.md) | Oito epílogos, fontes, enquadramento e elegibilidade | Conforme. Prevê obtenção das fontes ausentes no checkout, conversão sem perda, imagem inteira, páginas completas e sincronização das fichas. |
| [08](task-08.md) | Integração, saves e cobertura técnica | Conforme. Reúne todas as folhas anteriores, verifica dois arquivos e consolida V-001/002/003/008 sem substituir QA dirigido. |
| [09](task-09.md) | Planejamento do ciclo de QA | Conforme. Depende da integração, reaproveita evidência válida e transporta cenários, variantes, modos e limites aprovados. |
| [10](task-10.md) | Execução dirigida, visual, audição e Continue | Conforme. Assume V-004/005/006/007, preserva proveniência de campanhas e exige reparo/reexecução e julgamentos efetivamente observados. |

As 12 RQs e os 11 cenários têm cobertura no grafo. Os oito sensores têm um único responsável primário: task 08 para V-001/002/003/008 e task 10 para V-004/005/006/007. As contribuições das tasks 01–07 não duplicam essa responsabilidade.

## Conferências executadas

- Dez IDs consecutivos, dependências acíclicas e correspondência entre o grafo e os arquivos individuais.
- Todas as tasks 01–08 são ancestrais da task 09; o par final 09 → 10 está preservado.
- Links Markdown relativos das dez tasks resolvem para arquivos existentes.
- IDs de testes citados localizados nas suítes e no manifesto; eventos comuns citados presentes no banco nativo.
- Deltas locais das fontes confirmados: PR #17 altera anchor Y para .6 e escalas para 50; PR #19 ativa AttachedPictures com lista automática vazia. O prólogo de origem contém seis conclusões semânticas e nove caixas.
- Fontes locais de PR #15/#16 disponíveis nos commits fixados; catálogo do PR #18 contém dez arquivos preenchidos e seis vazios, coerente com o recorte das tasks.
- `git diff --check` passou. A inspeção foi somente leitura; este relatório é o único arquivo produzido pela revisão.

## Riscos residuais e limites

Continuam dependentes da implementação e dos sensores já previstos: enquadramento após os defaults globais, visibilidade das prisões e do reflexo, leitura das caixas longas, audição do mix e Continue após mudanças nos eventos serializados. Eles já têm donos no plano; não são novos bloqueios de design identificados nesta revisão.

Não foram executados testes do jogo, playtest, capturas integradas, audição ou carregamento de saves. Não se infere PASS de runtime das inspeções estáticas ou da evidência dos PRs de origem. Os estados de aprovação das tasks e os cinco indicadores de entrega permanecem inalterados.
