# BUG-20260924-choice-hit-areas: áreas de interação não correspondem ao conteúdo visual

- **Status:** reported — aguardando reprodução dirigida.
- **Fonte:** feedback do usuário em 2026-09-24, itens Menu 1, 5 e 14.
- **Impacto:** dificuldade para escolher destino, abrir a interação de heróis e escolher sacrifício.
- **Disciplina:** UI/UX com apoio de Programação; sem atribuição de execução ou publicação no Trello.
- **Dono do trabalho:** [prototype-feedback-refinement](../../../planos/tasks/prototype-feedback-refinement/spec.md), RQ-002/006/012; [verificação](../../../planos/tasks/prototype-feedback-refinement/verification.md), V-002/006/012.

## Relato e esperado

O usuário relata que destinos respondem apenas sobre a imagem e heróis apenas sobre o nome, tanto na taverna quanto no sacrifício. Solicita um container que una os elementos de cada opção e responda em toda a área definida. O estado elegível e a ação correspondente devem permanecer corretos; ampliar o alvo de sacrifício não pode criar confirmação acidental.

## Reprodução pendente

Em uma nova campanha, atingir cada superfície por entradas normais. Comparar clique na imagem, no nome, nos espaços internos do container e navegação/confirmação por teclado. No sacrifício, preparar a campanha própria até uma falha, preservando a irreversibilidade. Registrar coordenadas, foco, opção acionada, viewport e hash do candidato.

## Evidência e hipótese

Nenhuma captura ou execução foi realizada nesta autoria. A inspeção encontra CE003/038 para taverna, CE039 para destinos e pictures distintas para retratos/rótulos; isso não prova a área efetiva nem a causa do problema. A reprodução e o rastreio dos consumidores de sacrifício continuam pendentes. Não classificar como corrigido nem reaproveitar PASS de outra versão.
