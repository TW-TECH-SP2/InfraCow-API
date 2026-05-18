FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --production

FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]
