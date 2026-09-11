# Aviso inválido ao encerrar o Conselho

Estado: corrigido e verificado na spec `vn-slot-authorship`. Responsável: Programação / Edney.

Na passagem normal ou por skip das opiniões para a escolha do medalhão, o aviso “O alvo de apresentação é inválido.” aparece apesar de as duas escolhas funcionarem. Captura original: `docs/qa/evidence/vn-slot-authorship/task-03/directed-council-triple-H1-H2-H3-seed0-2026-09-11T14-30-49-555Z/bank-final-choice.png`. O relatório da mesma execução registra `lastRejectedAction.action=PresentationHelper` na observação598.

Causa: CE40 chama `Observe closing` em `final_choice`, encerrando a propriedade da conversa. CE53 chamava depois o auxiliar de saída77 (100 na baseline anterior), que corretamente exige uma conversa ativa. A combinação deixava um aviso indevido. A asserção anterior cobrava apenas pictures apagadas e permitia esse erro.

Correção: retirar a chamada redundante do CE53, mantendo a limpeza existente e `Conversation end`. Preservar a proteção contra auxiliares sem dono. Regressões pertencem a IT-054/IT-061 (rota do Conselho), IT-065 (skip) e à verificação dirigida da escolha final, que agora exigem ausência de ação rejeitada.

Evidência final e reexecuções: ver [verification.md](../../../planos/tasks/vn-slot-authorship/verification.md). Nada altera textos, decisões, PNGs ou regras da campanha.
