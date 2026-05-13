# ─── Build stage ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copia apenas os manifests para aproveitar o cache de camadas
COPY package.json package-lock.json ./

# Instala apenas dependências de produção
RUN npm ci --omit=dev

# ─── Runtime stage ───────────────────────────────────────────────────────────
FROM node:22-alpine

# Usuário não-root por segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copia node_modules já instalados do builder
COPY --from=builder /app/node_modules ./node_modules

# Copia o código-fonte
COPY . .

# Garante que o usuário appuser é dono dos arquivos
RUN chown -R appuser:appgroup /app

USER appuser

# Porta padrão exposta (pode ser sobrescrita pela variável PORT)
EXPOSE 3000

# Usa node diretamente em produção (sem nodemon)
CMD ["node", "index.js"]