ARG NODE_IMAGE

FROM ${NODE_IMAGE}

ARG VITE_TITLE

WORKDIR /app

RUN npm add -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build

CMD pnpm start
