FROM node:24-slim AS builder

WORKDIR /app

COPY package.json tsconfig.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY src ./src

RUN pnpm builder

FROM node:24-slim AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

CMD [ "pnpm", "start" ]