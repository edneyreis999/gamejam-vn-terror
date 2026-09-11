# Executar o jogo local

- Acesse `http://127.0.0.1:18726/`, endereço aberto automaticamente pelo servidor no Chrome; mantenha o processo em execução durante a sessão.

# Porta ocupada

- Se houver `EADDRINUSE` ou aviso de porta ocupada, identifique o processo com `lsof -nP -iTCP:18726 -sTCP:LISTEN` no macOS ou `netstat -ano | findstr :18726` no Windows e confirme o conteúdo servido antes de reutilizar o endereço; não encerre processos desconhecidos. Para outra porta livre, execute `npm start -- --port 18727` e informe que saves da porta anterior não aparecem no novo endereço.
