# Demanda histórica — migração para RPG Maker MZ

Este documento registra o pedido que iniciou a análise da migração. A análise e a implementação MZ já aconteceram; o prompt operacional de investigação foi aposentado. Ele não deve ser reexecutado nem usado para recuperar a implementação HTML retirada.

O pedido buscava reproduzir a campanha usando, em ordem de preferência, configuração nativa, plugins existentes, composição entre plugins e eventos, pequenas extensões e, somente para lacunas reais, código específico. A investigação abrangia narrativa, diálogos, bustos, imagens, escolhas, progressão, interface, input, áudio, persistência e organização dos eventos. A lista era escopo de investigação, não aprovação automática dessas funcionalidades.

O trabalho deveria distinguir funcionalidades existentes, previstas no GDD, simplificadas e implícitas; confrontar limitações dos plugins; registrar riscos, alternativas e pendências; e entrevistar o usuário sobre decisões de produto e trade-offs. A composição dos recursos existentes tinha prioridade, sem forçar uma solução inadequada para evitar código novo.

O resultado histórico está em [pré-análise](pre-analise-eject-rpg-maker-mz.md). As decisões aprovadas pertencem ao [GDD canônico](../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) e à spec de migração concluída e seus ADRs, consultados localmente em `.compozy/tasks/init-rpg-maker-mz/` (acervo histórico ignorado pelo Git, indisponível num clone novo). O texto integral original foi preservado no arquivo externo de proveniência desta retirada; não é uma fonte de instruções de desenvolvimento.

Para trabalho atual, a única implementação é `rpg-maker/The Dryland Drowned/`, com dados e eventos nativos, configuração em `js/plugins.js`, plugins em `js/plugins/` e testes em `rpg-maker/tests/`. O [README MZ](../../rpg-maker/README.md) descreve execução e autoria.
