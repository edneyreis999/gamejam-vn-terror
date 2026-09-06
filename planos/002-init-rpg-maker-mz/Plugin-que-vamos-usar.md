# Plugins para VN Expedição e Sacrifício

## 🟢 Essenciais — núcleo obrigatório

- **VisuMZ_0_CoreEngine** — base de toda a pilha VisuStella. Sem ele nada do restante roda. Mantém resolução, input, pictures e text codes. É o alicerce.
- **VisuMZ_1_MessageCore** — o coração de uma VN. Diálogo + localização PT/EN (o GDD pede repertório brasileiro e inferência por texto; a opção de idioma e o TSV de termos são fundamentais). Também controla fonte e velocidade de texto.
- **VisuMZ_2_VNPictureBusts** — **o mais crítico para este jogo.** O GDD gira em torno dos 8 heróis + bardo com retratos, expressões e reações. Este plugin controla entrada/saída, troca de gráfico, posição, escala e destaque por tom — exatamente o que sustenta a comunicação das competências por ilustração (seção 14.1).
- **VisuMZ_1_SaveCore** — essencial pela **morte permanente e persistência de campanha** (seções 5.1, 13.2). Slots, autosave e confirmação são a espinha dorsal do save/load de uma campanha com progresso persistente.
- **VisuMZ_1_OptionsCore** — menu de opções agregando idioma, velocidade de texto e volume. O GDD não define interface, mas uma VN com localização exige isso.

- **VisuMZ_3_MessageLog** — histórico de diálogo. Numa VN de horror com pistas textuais (seção 14.3), o jogador precisa reler falas para inferir competências. Quase obrigatório.
- **VisuMZ_4_MessageVisibility** — ocultar a janela de mensagem para contemplar ilustrações/cenas. Padrão de VN para revelar CGs e momentos de impacto.
- **VisuMZ_3_MsgLetterSounds** — som de digitação por letra. Barato e agrega muito à atmosfera de horror.
- **VisuMZ_3_VisualCutinEffect** — cut-ins para os momentos dramáticos: revelação de armadilha, sacrifício e morte. O GDD pede "morte apresentada de forma coerente com a armadilha" (13.2) — cut-ins são a ferramenta certa.
- **VisuMZ_2_ExtMessageFunc** — console com AUTO/FAST/LOG/HIDE/SAVE/LOAD/CONFIG/TITLE. Conforto de leitura numa VN longa.
- **VisuMZ_3_ChoiceCmnEvts** — disparar Common Events quando uma choice recebe foco. Perfeito para as **reações dos heróis** ao percorrer as 3 abordagens (o Jhonny usa para expressões de Jhonny; aqui seria para os heróis presentes reagirem).
- **VisuMZ_2_PictureChoices** — choices ligadas a pictures. Ideal para a **UI das 3 abordagens** como elementos visuais, sem rótulos de competência (exigência do GDD 10.3/14.3).
- **ButtonPicture** — botões clicáveis. Útil para a seleção de abordagem e para a **seleção de sacrifício** (13.2), que precisa de uma tela interativa com os heróis presentes.
- **VisuMZ_4_EventTitleScene** — tela de título customizada. Está desativada no Jhonny, mas aqui faz sentido **ativar** para a tela de título temática.
- **Jhonny_CreditsSkip** — pular créditos. Qualquer jogo com créditos se beneficia.