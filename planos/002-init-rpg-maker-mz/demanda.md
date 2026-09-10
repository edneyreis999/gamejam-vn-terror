Você é um engenheiro de jogos sênior especializado em RPG Maker MZ, arquitetura de plugins JavaScript, Visual Novels e migração de protótipos para implementações de produção.

Sua tarefa é realizar uma análise técnica e de produto profunda para planejar a migração — ou "eject" — do protótipo HTML atual para RPG Maker MZ, aproveitando ao máximo os plugins que já estão disponíveis no projeto.

## Contexto do projeto

Existe uma lista inicial dos plugins que pretendemos utilizar em:

`/Users/edney/projects/coreto/gamejam-vn-terror/planos/002-init-rpg-maker-mz/Plugin-que-vamos-usar.md` (mas ela não contem todos os plugins instaldos)

Os plugins já estão instalados em:

`/Users/edney/projects/coreto/gamejam-vn-terror/rpg-maker/The Dryland Drowned/js/plugins`

E sua configuração/ativação atual está em:

`/Users/edney/projects/coreto/gamejam-vn-terror/rpg-maker/The Dryland Drowned/js/plugins.js`

O protótipo funcional atual está em:

`/Users/edney/projects/coreto/gamejam-vn-terror/prototype/index.html`

O GDD está em:

`/Users/edney/projects/coreto/gamejam-vn-terror/docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md`

## Objetivo principal

Descobrir como reproduzir no RPG Maker MZ as mecânicas, sistemas, interações, apresentação, UX e fluxo narrativo presentes no protótipo e no GDD utilizando, sempre que possível, os plugins que já estão instalados.

A diretriz central é:

> Aproveitar o máximo possível as funcionalidades existentes dos plugins antes de criar código novo.

Não quero apenas descobrir se existe um plugin que implementa exatamente uma determinada feature.

Quero descobrir também como podemos **compor, adaptar e estender** as funcionalidades dos plugins existentes para chegar ao comportamento desejado.

Uma correspondência de 70%, 80% ou 90% pode ser perfeitamente aceitável caso o restante possa ser resolvido com configuração, eventos, script calls ou uma pequena extensão.

Salve a analise no diretorio /Users/edney/projects/coreto/gamejam-vn-terror/planos/002-init-rpg-maker-mz e só depois dela salva, inicie o grill me

## Filosofia de implementação

Considere esta ordem de preferência para implementar cada funcionalidade:

1. Configuração nativa do RPG Maker MZ.
2. Plugin existente usado diretamente.
3. Combinação de dois ou mais plugins existentes.
4. Plugin existente + eventos do RPG Maker.
5. Plugin existente + Script Calls / JavaScript simples.
6. Pequena extensão/complemento de um plugin existente.
7. Novo plugin específico.
8. Sistema totalmente customizado, apenas como último recurso.

Não recomende um plugin novo quando a mesma necessidade puder ser atendida de maneira razoável pelos plugins existentes.

Ao mesmo tempo, não force artificialmente uma solução ruim apenas para evitar código novo.

## Investigação obrigatória

Antes de propor qualquer arquitetura:

### 1. Entenda o jogo atual

Leia cuidadosamente:

* o GDD;
* o protótipo HTML;
* JavaScript, CSS e outros arquivos utilizados pelo protótipo;
* os fluxos de interação presentes no protótipo.

Identifique todas as funcionalidades observáveis.

Não analise apenas a narrativa.

Mapeie também:

* apresentação de diálogos;
* bustos e portraits;
* background;
* transições;
* escolhas;
* estados;
* variáveis;
* inventário;
* flags;
* recursos;
* progressão;
* feedback visual;
* menus;
* message log;
* configurações;
* input;
* telas especiais;
* UI;
* efeitos;
* overlays;
* animações;
* qualquer sistema particular existente no protótipo ou descrito no GDD.

Diferencie claramente:

* funcionalidades que já existem no protótipo;
* funcionalidades previstas apenas no GDD;
* funcionalidades que parecem ter sido prototipadas de maneira simplificada;
* funcionalidades implícitas necessárias para suportar outras mecânicas.

### 2. Investigue os plugins existentes

Leia:

`Plugin-que-vamos-usar.md`

Depois inspecione os plugins reais instalados em:

`/Users/edney/projects/coreto/gamejam-vn-terror/rpg-maker/The Dryland Drowned/js/plugins`

Não assuma a capacidade de um plugin apenas pelo nome.

Sempre que relevante, investigue:

* header/documentação do plugin;
* parâmetros;
* Plugin Commands;
* Script Calls;
* Notetags;
* hooks;
* aliases;
* APIs públicas;
* classes estendidas;
* integrações com outros plugins;
* dependências;
* limitações;
* requisitos de ordem de carregamento;
* incompatibilidades;
* funcionalidades que não estão habilitadas na configuração atual.

Para plugins grandes, procure especificamente as funcionalidades relacionadas às necessidades identificadas no protótipo e no GDD.

## Análise de cobertura

Crie um mapa completo:

`Feature do jogo → solução no RPG Maker MZ`

Para cada feature relevante, informe:

### Feature

O comportamento que precisamos reproduzir.

### Origem

Indique se ela aparece:

* no protótipo;
* no GDD;
* nos dois.

### Plugin(s) candidato(s)

Quais plugins existentes podem ajudar.

### Funcionalidades específicas do plugin

Não diga apenas:

> usar VisuMZ_X

Diga **qual recurso específico** do plugin pode ser aproveitado.

Exemplos:

* Plugin Command X;
* parâmetro Y;
* notetag Z;
* sistema de busts;
* message positioning;
* message visibility;
* message log;
* common event hooks;
* picture layers;
* etc.

### Estratégia de implementação

Explique como essa feature poderia ser construída no RPG Maker.

Sempre que possível, descreva o fluxo.

Por exemplo:

`Evento → Show Text → VN Bust → alteração de expressão → escolha → variável → Common Event → próxima cena`

### Cobertura estimada

Classifique aproximadamente:

* 100% — plugin resolve diretamente;
* 80–99% — plugin + configuração/eventos;
* 50–79% — plugin é uma boa base, mas precisa extensão;
* <50% — pouco aproveitamento;
* 0% — não há cobertura relevante.

Não trate esses percentuais como métricas matemáticas exatas. Eles são uma ferramenta para comparar alternativas.

### Gap

Explique o que ainda falta.

### Melhor forma de preencher o gap

Classifique como:

* configuração;
* evento;
* common event;
* script call;
* extensão pequena;
* plugin complementar;
* plugin novo.

### Complexidade

Classifique:

* baixa;
* média;
* alta.

Explique brevemente o motivo quando não for óbvio.

### Riscos / limitações

Considere:

* conflitos entre plugins;
* manutenção;
* dependência excessiva;
* limitações técnicas;
* UX;
* performance;
* dificuldade de authoring;
* dificuldade para designers criarem novas cenas.

---

## Pense em composição de plugins

Uma parte importante desta análise é descobrir **combinações interessantes entre plugins**.

Por exemplo, algo conceitualmente parecido com:

`VisuMZ_2_VNPictureBusts + sistema de mensagens + eventos`

para criar as conversas da Visual Novel.

Ou:

`SaveCore + ExtMessageFunc + variáveis do RPG Maker`

para preservar estados narrativos e oferecer save/load adequado.

Ou:

`MessageVisibility + Picture/Common Events`

para permitir ao jogador esconder a interface e observar uma cena de armadilha.

Esses são apenas exemplos.

Não os trate como decisões já tomadas.

Valide se realmente fazem sentido com base no código e na documentação dos plugins.

Procure ativamente por composições menos óbvias.

---

## Identifique oportunidades de simplificação

Não tente reproduzir literalmente a implementação HTML.

O protótipo representa uma experiência, não necessariamente a arquitetura final.

Sempre pergunte:

> Qual é a forma mais natural de implementar esta experiência usando o paradigma do RPG Maker MZ?

Por exemplo, algo implementado com dezenas de listeners no HTML talvez possa virar:

* um Common Event;
* uma variável;
* uma switch;
* um Plugin Command;
* uma sequência de eventos.

Prefira soluções idiomáticas para RPG Maker MZ.

---

## Identifique abstrações reutilizáveis

Procure funcionalidades que deveriam virar estruturas reutilizáveis.

Exemplos:

* Common Events genéricos;
* macros de diálogo;
* sistema padronizado para portraits;
* sistema de escolhas;
* sistema de investigação;
* sistema de armadilhas;
* mudança de expressão;
* fade/transição;
* atualização de HUD;
* gerenciamento de recursos;
* controle de estados narrativos.

Avalie também quando vale criar um pequeno plugin de infraestrutura em vez de repetir Script Calls em dezenas de eventos.

---

## Arquitetura de novos plugins

Para toda feature que realmente necessitar código novo, evite imediatamente propor um plugin enorme.

Primeiro avalie se é possível criar um **plugin complementar** que aproveite APIs ou hooks de um plugin existente.

Para cada plugin novo sugerido, informe:

* responsabilidade;
* motivo pelo qual plugins existentes não são suficientes;
* plugins com os quais ele integraria;
* API mínima sugerida;
* possíveis Plugin Commands;
* estados/variáveis envolvidos;
* risco de acoplamento.

Mantenha plugins novos pequenos e focados sempre que possível.

---

# Entregável da pré-análise

Antes de tomar decisões definitivas, produza uma **pré-análise**.

Ela deve conter:

## 1. Resumo do jogo entendido

Explique em poucas seções:

* loop principal;
* estrutura narrativa;
* principais sistemas;
* principais interações;
* particularidades relevantes para a migração.

## 2. Inventário preliminar de features

Liste as features identificadas e a origem de cada uma.

## 3. Inventário dos plugins

Agrupe os plugins por responsabilidade, como:

* diálogo;
* Visual Novel;
* mensagens;
* UI;
* save;
* pictures;
* animação;
* áudio;
* input;
* eventos;
* mapas;
* battle, caso relevante;
* infraestrutura/core;
* outros.

## 4. Primeiros matches

Mostre as correspondências mais promissoras:

`Feature → Plugin(s) → estratégia`

## 5. Possíveis gaps

Identifique funcionalidades que provavelmente exigirão:

* extensão;
* integração customizada;
* plugin novo.

## 6. Dúvidas que realmente afetam a arquitetura

Identifique decisões de design ou produto que não podem ser deduzidas com segurança a partir dos arquivos.

Não faça perguntas triviais que possam ser respondidas examinando o projeto.

---

# Depois da pré-análise: use a skill "grill me"

Depois de concluir a pré-análise, **não produza imediatamente o plano final de implementação**.

Use a skill **grill me** para me entrevistar.

O objetivo da entrevista é eliminar ambiguidades importantes antes de definir a arquitetura da migração.

Use como contexto para a entrevista tudo que você descobriu durante a análise.

Priorize perguntas que possam mudar:

* arquitetura;
* escolha de plugins;
* UX;
* escopo;
* comportamento das mecânicas;
* modelo de dados;
* estrutura dos eventos;
* necessidade ou não de plugins customizados.

Evite perguntas cuja resposta já esteja claramente disponível no GDD, no protótipo ou nos plugins.

Também evite perguntas cosméticas que não impactem a implementação.

Se a skill permitir aprofundamento iterativo, confronte respostas vagas e investigue consequências.

Exemplo:

Se eu disser:

> Quero que o sistema de investigação seja parecido com o protótipo.

Não aceite automaticamente.

Tente descobrir:

* quais elementos são essenciais;
* quais podem mudar;
* como o jogador interage;
* o que precisa persistir;
* quais estados existem;
* quais feedbacks são importantes.

A entrevista deve funcionar como uma **design review técnica**.

---

# O que virá depois

O objetivo da pré-análise + entrevista é preparar material suficiente para posteriormente criar um plano detalhado contendo:

`Feature → Plugin → Configuração → Eventos → Extensões → Novo código`

Ainda não crie esse plano final antes da entrevista.

---

# Regra final

Investigue primeiro.

Não suponha capacidades.

Não invente funcionalidades dos plugins.

Não crie código novo antes de verificar alternativas existentes.

Faça a pré-análise completa.

Depois use a skill **grill me** para conduzir a entrevista antes de propor a arquitetura final.
