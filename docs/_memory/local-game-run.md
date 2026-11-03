# Executar o jogo local

- Acesse `http://127.0.0.1:18726/`, endereço aberto automaticamente pelo servidor no Chrome; mantenha o processo em execução durante a sessão.

# Porta ocupada

- Se houver `EADDRINUSE` ou aviso de porta ocupada, identifique o processo com `lsof -nP -iTCP:18726 -sTCP:LISTEN` no macOS ou `netstat -ano | findstr :18726` no Windows e confirme o conteúdo servido antes de reutilizar o endereço; não encerre processos desconhecidos. Para outra porta livre, execute `npm start -- --port 18727` e informe que saves da porta anterior não aparecem no novo endereço.

# Executar no NW.js

- Execute `npm run start:nw` na raiz; `npm run start:nw -- --test` abre em modo de teste, como o Playtest. O comando procura o NW da Steam; em outro local, defina `CORETO_NWJS` com o caminho do executável. O caminho padrão no Windows ainda não foi confirmado.
- No macOS, o plist do NW da Steam define `MallocNanoZone=0`, ligado a SIGABRT na abertura e ao encerrar. O comando executa o binário direto e sem a variável. O botão Teste do Jogo do Editor e `open` continuam aplicando o plist, então podem falhar. Registro: `docs/postmortems/002-instabilidade-nwjs-macos/` no repositório Pixi-Rework.
- Os saves do NW ficam em `<jogo>/save/` e são separados dos saves do Chrome.
