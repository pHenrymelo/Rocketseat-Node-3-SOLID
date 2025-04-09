# App

## RFs

- [ ] deve ser possivel se cadastrar;
- [ ] deve ser possivel se autenticar;
- [ ] deve ser possivel obter o perfil de um usuario logado;
- [ ] deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [ ] deve ser possivel o usuario obter seu historico de check-ins;
- [ ] deve ser possivel o usuario buscar academias proximas;
- [ ] deve ser possivel o usuario buscar academias pelo nome;
- [ ] deve ser possivel o usuario realizar check-in em uma academia;
- [ ] deve ser possivel validar o checkin de um usuario;
- [ ] deve ser possivel cadastrar uma academia;

## RNs

- [ ] o usuario não deve poder se cadastrar com email duplicado;
- [ ] o usuario não pode fazer 2 check-ins no mesmo dia;
- [ ] o usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in so pode ser validado até 20 minutos apos criado;
- [ ] o check-in so pode ser validado por administradores;
- [ ] a academia so pode ser cadastrada por administradores;

## RNFs

- [ ] a senha do usuario precisa ser criptografada;
- [ ] os dados da aplicação precisam estar persistidos em um db PostgreSQL;
- [ ] todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] o usuario deve ser autenticado por um JWT