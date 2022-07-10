FROM ubuntu:latest

ENV BUN_INSTALL="/root/.bun"

RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl -fsSL https://bun.sh/install | bash
RUN ln -s $BUN_INSTALL/bin/bun /usr/local/bin/bun

WORKDIR /opt/bot
COPY . .
RUN bun install
RUN bun tsc

RUN mv .env.example .env

EXPOSE 3000
CMD ["bun", "bot.js"]