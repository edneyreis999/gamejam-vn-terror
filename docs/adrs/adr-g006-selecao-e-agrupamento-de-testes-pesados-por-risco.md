# ADR-G006 — Seleção e agrupamento de testes pesados por risco

- **Estado:** Aceita em 2026-09-18, por determinação explícita do usuário.
- **Escopo:** planejamento, execução e retomada de testes pesados nas campanhas atuais e futuras; Editor RPG Maker MZ, Chrome desktop local e NW.js quando explicitamente incluído na entrega.
- **Origem:** adaptação da ADR-012 do Pixi-Rework, identificada em Rastreabilidade.
- **Relação:** limita a proibição geral de retirar variantes da [ADR-G004](adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md). Preserva as exclusões de [zoom nativo](adr-g003-excluir-testes-de-zoom-nativo.md) e [gamepad](adr-g005-exclusao-de-testes-de-gamepad.md).

## Contexto e decisão

Testes pela interface e pelo runtime completo custam preparação, navegação, observação e recuperação. Uma sessão por parâmetro ou combinação pode repetir provas sem revelar novos defeitos. O usuário adotou neste projeto a política do Pixi-Rework de concentrar esse esforço nos riscos e na informação adicional.

**Agrupar verificações relacionadas, reutilizar provas válidas e omitir repetições de baixo risco sustentadas por evidência, preservando jornadas end-to-end das capacidades entregues.** Não exigir uma jornada pesada por folha, enum ou combinação apenas porque existe no inventário. Quantidade de cenários não basta para medir qualidade.

## Seleção por risco

Para cada comportamento ou família, registrar brevemente:

1. Qual defeito o teste pode encontrar que as provas existentes não encontram.
2. Quais implementações, dados, caminhos e fronteiras compartilha com um caso comprovado e o que muda.
3. Qual o impacto da falha e a incerteza restante.
4. Qual a menor execução real capaz de observar esse risco, incluindo a jornada E2E necessária.

Priorizar mudanças, defeitos conhecidos, ramos distintos, perda/corrupção de saves, recuperação e integrações incertas. Probabilidade aparentemente baixa não basta se o impacto for alto ou a evidência fraca. Usar justificativas concretas, sem inventar percentuais de risco.

## Agrupamento e representantes

Compartilhar projeto, fixture, boot, navegação, salvar/reabrir e coleta quando o fluxo permitir observações claras. Cada campo, destino ou resultado material conserva seu esperado e sua conclusão. Planejar os pontos de observação antes de executar.

Usar representantes de classes com comportamento equivalente, demonstrando caminho e formato compartilhados. Aparência semelhante não prova equivalência. Mapa, Common Event e tropa podem compartilhar uma sessão, mas um destino não comprova os outros. O mesmo vale para cenas com diferentes regras de persistência, participantes ou apresentação.

Evitar grupos em que uma falha inicial esconda resultados seguintes ou impeça localizar o defeito. Controlar o estado inicial ou separar verificações dependentes de estado. No jogo, preparação e avanço da campanha continuam por ações validadas do jogador; inspeção de objetos, saves e storage permanece somente leitura. Agrupar não autoriza injetar estado, seed ou atalhos de QA.

## Omissão de execução pesada

Uma variante ou repetição pode deixar de ser obrigatória na campanha quando houver evidência válida e baixo valor adicional demonstrado. Registrar:

- A prova existente, seu representante e o runtime relevante.
- A equivalência concreta de caminho, formato, dependências ou classe de entradas, com as diferenças que não abrem risco material novo.
- O risco residual e por que não justifica repetir a execução pesada.
- A mudança ou descoberta que exigirá reincluir o caso.

Provas unitárias, de integração ou CLI podem sustentar omissões de lógica repetida. Não substituem o primeiro percurso real de integração nem observações exclusivas de UI, áudio, filesystem ou ambiente. Um parser aprovado não demonstra que a autoria chega ao jogo e produz o efeito correto.

Registrar **omitido por redundância/risco coberto**, com referência à prova, sem marcar execução `pass`. Adiamento, bloqueio de ferramenta ou evidência insuficiente continuam pendentes. Falha observada não pode ser reclassificada como redundância para facilitar o fechamento. Dispensa de escopo, como gamepad, tem motivo próprio e não requer fabricar equivalência.

## End-to-end e ambientes

Cada mudança funcional conserva jornadas representativas da entrada pública ao resultado observável, atravessando integrações relevantes. Incluir falha e recuperação quando houver risco material. Boot ou presença de arquivos não bastam. Jornadas podem reunir capacidades sem executar o produto cartesiano das opções.

| Ambiente em escopo | Agrupamento possível | Prova real preservada quando afetada |
| --- | --- | --- |
| Editor MZ | Campos de formatos diferentes e comandos em vários destinos na mesma sessão, com conclusões separadas | Autoria pela UI, gravação e reabertura; executar o conteúdo no jogo para afirmar seu efeito funcional |
| Chrome desktop local | Configurar → jogar → autosave → reiniciar → Continuar | Inputs públicos, efeitos visíveis e storage real da mesma origem/perfil; acrescentar ramos e riscos não exercitados |
| Pacote NW.js, se aprovado no incremento | Reutilizar lógica comum e concentrar a jornada nas diferenças do pacote | Executar o artefato distribuído, assets, caminhos, filesystem e persistência após reinício conforme os riscos |

Chrome não qualifica automaticamente NW.js; CLI não qualifica automaticamente o Editor. Evidência comum pode ser reaproveitada, mas diferenças próprias exigem prova adequada. Esta ADR não amplia o suporte além do Chrome desktop aprovado, não inclui NW.js em entregas que o excluem e não autoriza build, dependências ou serviços remotos.

Quando uma migração aprovada exigir comparação entre baseline e resultado, preservar essa comparação nos cenários selecionados, com referência válida. Não importar automaticamente a política comparativa ou as demais ADRs do Pixi-Rework.

## Autonomia e fechamento

Aplicar agrupamentos, representantes e omissões elegíveis sem nova aprovação por caso, inclusive ao reconciliar planos anteriormente exaustivos. Atualizar roteiro, task, verificação e matriz existentes antes de declarar fechamento, ligando obrigações, representantes, provas retidas e omissões justificadas.

Esta autorização limita apenas a exigência de executar variantes/repetições redundantes. Preservar requisitos funcionais, esperados, riscos distintos, jornadas E2E e aceites humanos. Não remover ambientes ou sensores necessários para esconder lacunas. Decisões de produto e exclusões de escopo continuam distintas da seleção por evidência.

Mudanças nas dependências que sustentam uma equivalência reabrem os casos afetados. Ampliar a seleção se um defeito contradisser a hipótese de agrupamento ou omissão. O fechamento avalia cobertura reconciliada por risco e evidência, sem exigir a execução de todos os casos inicialmente enumerados. A adoção da política não encerra pendências ou promove aceites existentes por si só.

## Encerramento dos aplicativos de teste

**Ao terminar, inclusive por falha, bloqueio ou cancelamento, fechar os aplicativos e recursos abertos pelo agente para os testes.** Preservar evidências e salvar alterações de QA necessárias antes de fechar, sem modificar a campanha por inspeção.

Identificar no início os aplicativos já abertos pelo usuário. Neles, fechar somente abas, janelas ou instâncias criadas pelo agente, preservando sessões e alterações do usuário. Encerrar também servidores e processos auxiliares iniciados para a sessão. Servidor preexistente apenas reutilizado não pertence ao agente; seguir o [procedimento local](../_memory/local-game-run.md) para identificá-lo.

Confirmar o encerramento no resultado. Se falhar, identificar recurso e motivo; tentativa não equivale a encerramento confirmado.

## Registro proporcional

Usar tasks, matrizes, roteiros e recibos existentes, sem novo sistema de acompanhamento. O resultado registra testes realmente executados e resultados; casos reunidos e verificações preservadas; omissões, adiamentos e bloqueios separados; racional, evidências reaproveitadas, risco residual e condições de invalidação; encerramento dos recursos e eventuais pendências.

Uma justificativa pode cobrir uma família comprovadamente equivalente. Capturar estados materiais e evidência suficiente, sem repetir texto por centenas de folhas. Não exigir benchmark, instrumentação de tokens ou nova infraestrutura, nem prometer economia quantitativa sem medição. Preservar o momento demonstrável e a captura de devlog quando aplicáveis.

## Alternativas e consequências

- Repetir tudo em cada ambiente foi rejeitado como padrão: pode acrescentar pouca informação a custo alto.
- Substituir testes pesados apenas por unitários/CLI foi rejeitado: deixa jornadas e fronteiras reais sem prova.
- Omitir por intuição, cansaço ou custo isolado foi rejeitado: não demonstra risco coberto.
- Seleção por evidência com E2E preservado concentra esforço em riscos distintos, mas exige rever equivalências quando sua base mudar.

## Rastreabilidade

Autorização: pedido explícito do usuário em 2026-09-18 para aplicar neste projeto as decisões das ADRs 010, 011 e 012 do Pixi-Rework, incluindo a regra de encerramento dos aplicativos.

Fonte: `rpg-maker-coreto-rework/Pixi-Rework/docs/adr/012-selecao-e-agrupamento-de-testes-pesados-por-risco.md`, no repositório irmão, lida nesta adoção. O caso OS09 da migração Options/Save permanece evidência da origem, sem certificar este jogo. Esta ADR registra política, sem alegar novas execuções, qualificação de ferramentas ou aceite humano de entregas.
