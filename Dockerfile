# Stage 1: Construção
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Construir a aplicação
RUN npm run build

# Stage 2: Produção
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copiar os artefatos construídos da etapa anterior
COPY --from=builder /app/dist ./dist

# Definir a variável de ambiente para produção
ENV NODE_ENV=production

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
