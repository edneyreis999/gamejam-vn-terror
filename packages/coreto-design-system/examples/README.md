# Consumidor independente

Em uma **cópia descartável** de um projeto MZ com provedores Coreto, instale o perfil `coreto-default`. Copie `Reference_6_Showcase.js` para `js/plugins/` e habilite-o no Plugin Manager depois do DesignSystem. Não carregue plugins Dryland. A engine e os provedores devem vir da instalação licenciada do consumidor, não deste pacote.

O exemplo substitui o título por uma galeria e usa somente conteúdo próprio de demonstração. Não instala ou modifica eventos. Setas movem foco; Enter seleciona o controle; a opção indisponível não ativa. F6 abre opções, F7 abre a lista de saves para leitura, F8 abre diálogo. O console requer uma cena nativa de mapa; não aparece na galeria. Escape retorna das telas nativas. O exemplo não grava saves.

Use `?locale=Portuguese` ou `?locale=English` na URL de playtest para selecionar o idioma inicial. A resolução continua pertencendo ao projeto. Inspecione em 1280×720 e 1600×900 a DPR 1; repita com `prefers-reduced-motion: reduce`. O conteúdo do exemplo não é um modelo de campanha: cada consumidor mantém seus textos e adaptadores.

`drawLabel`, `drawChoiceCard` e `layoutFooter` demonstram composições com estados fornecidos pelo consumidor. Os exemplos de papéis e slots para pictures estão em [integração](../docs/integration.md); eles não exigem copiar código do perfil Dryland.
