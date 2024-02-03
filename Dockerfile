# Use a imagem oficial do Node.js como base
FROM node

# Crie o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "./dist/app.js"]
