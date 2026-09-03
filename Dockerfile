FROM node:24-slim

WORKDIR /app

COPY package.json tsconfig.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY src ./app

RUN pnpm build

CMD [ "pnpm", "start" ]