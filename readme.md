# App

## RFs

- [x] deve ser possivel se cadastrar;
- [x] deve ser possivel se autenticar;
- [x] deve ser possivel obter o perfil de um usuario logado;
- [x] deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [x] deve ser possivel o usuario obter seu historico de check-ins;
- [x] deve ser possivel o usuario buscar academias proximas;
- [x] deve ser possivel o usuario buscar academias pelo nome;
- [x] deve ser possivel o usuario realizar check-in em uma academia;
- [x] deve ser possivel validar o checkin de um usuario;
- [x] deve ser possivel cadastrar uma academia;

## RNs

- [x] o usuario não deve poder se cadastrar com email duplicado;
- [x] o usuario não pode fazer 2 check-ins no mesmo dia;
- [x] o usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [x] o check-in so pode ser validado até 20 minutos apos criado;
- [x] o check-in so pode ser validado por administradores;
- [x] a academia so pode ser cadastrada por administradores;

## RNFs

- [x] a senha do usuario precisa ser criptografada;
- [x] os dados da aplicação precisam estar persistidos em um db PostgreSQL;
- [x] todas as listas de dados precisam estar paginadas com 20 itens por página;
- [x] o usuario deve ser autenticado por um JWT