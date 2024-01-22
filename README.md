
Este projeto é uma aplicação Express que utiliza MySQL como banco de dados. Aqui estão as instruções para configurar e iniciar a aplicação.

O Projeto se baseia em uma aplicação para salvar perfil de vendedores/consumidores sendo pessoa fisica ou juridica.

## Iniciando o Banco de Dados

Para iniciar o banco de dados, é necessário ter o Docker e o Docker Compose instalados em sua máquina. Execute o seguinte comando para iniciar o banco de dados:

docker-compose up -d

* lembre-se de alterar o arquivo .env.example para apenas .env com as credenciais corretas de conexao

Este comando irá criar um container Docker com uma instância do MySQL. Você pode acessar o banco de dados no `localhost:4568`:

Após configurar o arquivo .env, é necessário criar as tabelas do banco de dados. Execute o seguinte comando:

npm run knex:migrate

Este comando irá aplicar as migrações necessárias para configurar a estrutura do banco de dados.

## Iniciando o Servidor Express

Para iniciar o servidor Express, execute um dos seguintes comandos na raiz do projeto:

Usando npm:
npm install,
npm start


Ou, usando Yarn:

yarn,
yarn start

##

## Rotas da Aplicação

A aplicação inclui as seguintes rotas:

- **GET `/profile`**: Esta rota retorna os valores que estão armazenados no banco de dados para facilitar eventuais testes.
- **Swagger UI**: A documentação das rotas da API está disponível em `localhost:4568/api-docs` através do Swagger UI.
