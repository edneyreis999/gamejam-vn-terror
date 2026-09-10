# Entrega aceita — init-rpg-maker-mz

Edney aprovou os testes humanos em2026-09-10: “está aprovado pelos testes humanos”. O aceite abrange o incremento atual após revisão de áudio, UI e arte/editorial/cultural/atribuição. [Registro](human-acceptance.json) e [manifesto dos1419 arquivos](runtime-manifest.json) vinculam o aceite ao runtime ainda sem commit. Tasks01–13 concluídas. Estado: **aceito com refinamento conhecido**, pronto no escopo desta spec; não constitui publicação nem entrega final da game jam.

## Comportamento entregue

Campanha nativa MZ com formação, rotas, encontros, sacrifícios, descobertas, Conselho, três finais, memorial, epílogos e créditos. Continue restaura checkpoints sem repetir decisões; Novo jogo substitui a campanha. HIDE restaura escolhas sem sobreposição, leitura concluída permanece registrada e opções exibem ajuda em PT-BR. Saves com campos inválidos no histórico são recusados antes de instalar objetos nativos.

## Validação preservada

A suíte histórica executou125 casos:124 passaram, seguidos da correção e reexecução bem-sucedida de UT-057; isso não foi uma execução única125/125. Na última correção de histórico,66 UT e IT-021/023 passaram. IT-028 verificou opções. O pacote atual passou entrada/escolha/Continue por ações dirigidas no Chrome, com igualdade integral do estado.23 E2E têm último veredito pass após o aceite humano de E2E-020. V-VISUAL/V-AUDIO/V-HUMAN/V-EXPORT passaram pelos respectivos sensores técnicos e humanos. Nenhuma nova execução integral foi feita ao registrar o aceite.

Os1419 hashes do runtime continuam iguais aos do pacote verificado. Conteúdo e grafo são revalidados na organização; evidência histórica não é apresentada como recém-executada. Testes diretamente no editor foram excluídos pelo usuário; a ADR futura permanece de autoria dele. O verificador histórico verify-spec.py depende de uma skill removida e não foi executado; seu resultado não é apresentado como PASS.

## Refinamento conhecido

[Memorial menciona sobreviventes após perda total](../../bugs/BUG-20260909-memorial-survivors-total-loss.md). O usuário aprovou o incremento após apresentação desse ponto; o texto permanece sem correção. Aceite não equivale a conserto. Alteração posterior de comportamento deve usar spec incremental. A origem gerada/provisória das seleções permanece documentada na proveniência, com aceite do estado atual.

## Material para compor o devlog

Momento demonstrável: fechar a aba após revelar um encontro, reabrir e usar Continue para voltar à mesma escolha; demonstrar também foco com zoom110% e ajuda PT-BR nas opções. As imagens abaixo são capturas reais, sem alteração dos pixels. A [proveniência](selected-images.json) registra os lotes e hashes. Não foi composto ou publicado um devlog.

- [Continue no encontro](images/continue.png): três abordagens e utilidades legíveis, depois de restaurar o checkpoint.
- [Ajuda das opções em PT-BR](images/options-pt-br.png): quatro categorias de volume em zero; a imagem prova apresentação, não audição.
- [Zoom real110%](images/zoom-110.png): texto e foco em área efetiva1555×874 CSS.

- [Gorvak desaparecendo](images/gorvak-disappearing-middle.png): quadro intermediário do fade após a morte, ao retornar à taverna.
- [Lugar vazio em visita posterior](images/gorvak-absent-later-visit.png): ausência mantida, com o grupo reorganizado. As duas imagens permitem mostrar a consequência persistente do sacrifício; são capturas estáticas, não um vídeo da animação.

## Evidência local e consumidores

Logs, screenshots extras e pacotes históricos ficam fora do conjunto candidato a versionamento. O arquivo local preservado está em `.artifacts/archives/init-rpg-maker-mz-accepted-20260910/`, com `manifest.json` contendo caminhos, tamanhos e hashes; não está disponível em um clone novo. `docs/qa/evidence/init-rpg-maker-mz/` permanece como saída ignorada dos testes, preservando os consumidores existentes. As provas de aceite, resumo, manifesto do runtime e imagens selecionadas nesta pasta são materiais versionáveis independentes da conversa e do arquivo local.

Fontes, testes, fixtures, manifesto de testes, catálogo nativo, plugins, assets consumidos e proveniência permanecem em suas camadas atuais em `rpg-maker/`. A spec aceita permanece na localização local ignorada `.compozy/tasks/init-rpg-maker-mz/`, conforme decisão anterior; resultados duráveis desta entrega estão neste documento e no relatório de QA.
