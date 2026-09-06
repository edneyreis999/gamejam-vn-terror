# Verificação dos assets selecionados

Data: 5 de setembro de 2026.

Escopo: os sete PNGs selecionados para a geração narrativa e seus prompts. Não inclui integração no protótipo, testes de gameplay, aprovação editorial ou aprovação artística final.

Foi executado `python3 -` com leitura dos arquivos indicados em `manifest.json`, comparação byte a byte com os originais e inspeção do cabeçalho PNG. Resultado: código de saída 0.

```text
OK personagens/ivai.png: 1024x1536, RGB, cópia idêntica
OK personagens/florai.png: 1024x1536, RGB, cópia idêntica
OK personagens/perola.png: 1024x1536, RGB, cópia idêntica
OK personagens/andira.png: 1024x1536, RGB, cópia idêntica
OK cenarios/igreja-interior.png: 1536x1024, RGB, cópia idêntica
OK cenarios/parque-figueira.png: 1536x1024, RGB, cópia idêntica
OK cenarios/casa-do-conselho.png: 1536x1024, RGB, cópia idêntica
```

O mesmo comando conferiu sete prompts iniciais e uma revisão. Os hashes de cada cópia e os resultados estão em [verification.json](verification.json). Todos os originais permanecem disponíveis nos caminhos do [manifesto](manifest.json).

A inspeção visual abriu individualmente cada imagem selecionada. A primeira versão de Andirá foi rejeitada por barba e nariz saliente; a revisão selecionada corrige esses elementos. Os retratos têm exterior branco opaco, sem transparência. Aparência provisória, recorte e composição ainda precisam de avaliação no layout.
