# Desafio Backend - Challeng by Coodesh

### Descrição

O projeto é uma API de Parser de Produtos.

A API se conecta na API da Open Food Facts para carregar os dados dos alimentos listados e armazenar na base de dados. Esse processo ocorre uma vez por dia à meia noite.

Após a base de dados populada, a API expõe alguns endpoints para consulta, alteração e deleção desses dados. Assim como um endpoint para checar o status da API, bem como a data da última atualização da base de dados.

A API foi criada utilizando os princípios `SOLID`.

#### Endpoints da API

- `GET /`: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
 - `PUT /products/:code`: Atualizar produto
 - `DELETE /products/:code`: Excluir produto (status é alterado para `trash`)
 - `GET /products/:code`: Obter a informação somente de um produto da base de dados
 - `GET /products?page=1&pageSize=50`: Listar todos os produtos da base de dados. Este endpoint possui uma paginação.

 ### Tecnologias utilizadas

 - NodeJS com Typescript
 - MongoDB como database
 - Prisma para conexão com o database e TypeORM para as queries
 - Node-Cron para schedule de tasks

### Como executar o projeto

 - Após clonar o projeto, rodar o comando `npm install` para instalar todas as dependências;
 - Configurar a variável `.env` com a string de conexão ao banco de dados MongoDB `` DATABASE_URL=minha_string_de_conexao ``;
 - Rodar o comando `npx prisma generate` para criar as `Collections` no MongoDB;
 - Rodar o comando `npm run start` para executar o projeto;
 - Obs.: para configurar o horário que a task de cadastrar os produtos irá rodar, configure o arquivo `src/cronScheduleConfig.ts` alterando o valor de `dateTimeValue`

#### Backend Challenge 20230105