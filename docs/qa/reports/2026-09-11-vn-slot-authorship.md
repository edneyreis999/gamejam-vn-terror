# QA — autoria por posição

Escopo autorizado: spec `vn-slot-authorship`, foco e reconstrução com retratos presumidos padronizados. PNGs e enquadramento final fora desta alteração. A autoridade de conclusão é [verification.md](../../../planos/tasks/vn-slot-authorship/verification.md).

Plano dirigido: `bust-tavern` para os oito heróis (1280×720/normal e 1920×1080/reduced); `council-triple-H1-H2-H3-seed0` para entrada do trio, Ivaí, intervenção, opiniões e saída nos mesmos modos; `bust-council-continue` a partir dos autosaves genuínos produzidos nessas jornadas. Consumidores reusam somente arquivos compatíveis com origem, revisão e hashes do produtor. Teclado e ponteiro são ações do jogador no executor instalado; inspeção interna é somente leitura. Nenhuma atribuição de campanha em QA dirigido.

Esperado: participantes corretos, falante na base e ouvintes menores/escurecidos, limpeza ao sair e retomada sem repetir decisões. Capturas mostram funcionamento com as artes atuais; não comprovam enquadramento final, identidade visual aprovada ou conforto de leitura. Testes de integração complementam com ramos vazios, todos os heróis elegíveis, interrupções e edição nativa.

Portas isoladas: 18728 para integração, 18729–18730 para QA dirigido. A sessão do usuário em18727 permanece em execução. Evidências brutas locais em `docs/qa/evidence/vn-slot-authorship/`; cada execução retém fontes, argumentos, geometria, console, ações e hashes. O servidor/perfil de cada execução pertence ao executor e é encerrado por ele.

Resultados consolidados abaixo; aceite humano não inferido.

## Resultados dirigidos

Seis lotes concluíram a coleta: T normal/task01, T ampliado/task02, C normal/task08, C ampliado/task09, R normal/task08 e R ampliado/task09. Todos encerraram seus recursos e não apresentaram erros de execução. T inclui a rejeição esperada ao tentar selecionar o quarto herói. Não houve rejeição de apresentação nos quatro lotes C/R finais. Os caminhos completos e hashes estão em `docs/qa/evidence/vn-slot-authorship/directed-summary.json`.

A inspeção funcional abriu as imagens de alternância H1/Ivaí, HIDE, retorno à formação, Conselho com Ivaí, intervenção de Andirá, opinião H1 e escolha final nos dois tamanhos, incluindo a retomada ampliada. Confirmou troca visual, interface ocultável e saída limpa, com texto inferior visível. As artes atuais aparecem cortadas e sobrepostas devido à base futura; isso permanece explicitamente fora do aceite de enquadramento. Os hashes das1182 capturas dos seis lotes foram conferidos; isso não representa inspeção visual individual de todas as imagens nem validação subjetiva das transições.

Os primeiros quatro C/R de revisão02 revelaram, por inspeção, o aviso de auxiliar sem dono. Foram substituídos pelos lotes de revisão03 após remover a saída redundante do CE53. O registro do erro permanece no relatório original e na ficha [BUG-20260911-council-exit-owner-warning](../bugs/BUG-20260911-council-exit-owner-warning.md).

Após esses lotes, uma correção pura separou atualização de escala e de posição na base reconstruída. A comparação completa de targets/bases de41704 composições (104 caixas ×401 elencos ordenados) demonstrou equivalência para toda autoria publicada antes/depois. Por isso, os lotes dirigidos permanecem aplicáveis aos caminhos executados; seus archives conservam hashes históricos e não são alegados compatíveis com o código posterior. UT071 reproduziu o caso novo de edição intermediária; IT067 o verificou no Chrome por gravação nativa/Continuar. Evidências: `base-equivalence.json` e task09 do runner isolado.


A revisão final resolveu entradas incompletas e foco em posição vazia. O foco vazio preserva a composição, e a retomada usa a mesma regra. A rodada final passou 73/73 casos (72 unitários + edição/Continuar IT067); o teste de cancelamento corrigido passou separadamente. A suíte completa anterior registrou 139/140 antes da atualização de sua fixture antiga. Os 140 casos têm evidência aplicável após as reexecuções; não houve uma segunda execução integral. UT047 também confirmou compatibilidade sem Array.at/findLastIndex. Resultado técnico do incremento: PASS, com enquadramento final e aceite humano excluídos conforme a instrução do usuário.
