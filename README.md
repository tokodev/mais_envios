# API de Gerenciamento de Etiquetas

Esta é uma API simples para gerenciamento de tags. Permite a criação, leitura, atualização e exclusão (CRUD) de tags, além de fornecer a funcionalidade de upload de dados a partir de arquivos Excel.

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/tokodev/mais_envios.git
   cd mais_envios
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**

   - A aplicação utiliza SQLite por padrão, mas você pode configurar outras opções no arquivo `config/default.json`.

   Optei aqui por utilizar o SQLite ao invés de ficar manipulando um arquivo JSON.

4. **Executar a aplicação:**

   ```bash
   npm run dev
   ```

   A API estará disponível em [http://localhost:3000/api](http://localhost:3000/api).

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Multer](https://github.com/expressjs/multer)
- [Xlsx](https://github.com/exceljs/exceljs)
- [Nodemon](https://nodemon.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [SQLite3](https://www.sqlite.org/index.html)

## Rodando com Docker

1. **Build da Imagem Docker:**

   ```bash
   docker build -t api_tags .
   ```

2. **Executar o Container Docker:**

   ```bash
   docker run -p 3000:3000 -d api_tags
   ```

## Importar a Collection no Postman

- Importe o arquivo `TagAPI.postman_collection.json` no [Postman](https://www.postman.com/) para ter acesso às rotas da API.

## CRUD de Tags

### 1. Criação de Nova Tag

- **URL:** `/api/tags`
- **Método:** `POST`
- **Body:**

  ```json
  {
    "tag": "AA123456789BR",
    "name": "Fulano da Silva 1",
    "status": 1,
    "source": "39645000",
    "price": 10
  }
  ```

### 2. Leitura de Todas as Tags

- **URL:** `/api/tags`
- **Método:** `GET`

### 3. Leitura de Tag por ID

- **URL:** `/api/tags/:id`
- **Método:** `GET`

### 4. Leitura de Tag por tag

- **URL:** `/api/tags/tag/:tag`
- **Método:** `GET`

### 5. Atualização de Tag por tag

- **URL:** `/api/tags/:tag`
- **Método:** `PUT`
- **Body:**

  ```json
  {
    "name": "Tag Atualizada",
    "price": 29.99
  }
  ```

### 6. Exclusão de Tag por tag

- **URL:** `/api/tags/:tag`
- **Método:** `DELETE`

### 7. Upload de Dados a partir de Arquivo Excel

- **URL:** `/api/upload`
- **Método:** `POST`
- **Form Data:**
  - Chave: `file`
  - Valor: Seu arquivo Excel

### 8. Console.log

Os logs de console foram mantidos para facilitar a análise do raciocínio e do progresso no desenvolvimento. Embora o uso de bibliotecas como pino e winston seja uma prática comum para logs em produção, para esta situação mais voltada ao desenvolvimento, a simplicidade do console foi preferida.

Espero que estas instruções sejam úteis! Se precisar de mais alguma ajuda, não hesite em perguntar.
