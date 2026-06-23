FROM node:25-alpine3.23

ARG USER_ID=1000
ARG GROUP_ID=1000

RUN deluser node || true && \
    delgroup node || true

RUN addgroup -g ${GROUP_ID} metawatch && \
    adduser -u ${USER_ID} -G metawatch -D metawatch

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY docker-entrypoint.sh /usr/local/bin

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]


EXPOSE 3000

