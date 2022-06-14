ARG NODE_IMAGE

FROM ${NODE_IMAGE}

WORKDIR /app

RUN npm add -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY src/prisma/schema.prisma src/prisma/schema.prisma

RUN pnpm i

COPY . .

RUN pnpm build

CMD pnpm prisma:migrations:run && pnpm start
