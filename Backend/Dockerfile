FROM php:8.5-fpm-alpine

ARG USER_ID=1000
ARG GROUP_ID=1000
 

RUN apk add --no-cache \
    bash \
    icu-dev \
    libpq-dev \
    libzip-dev\
    zlib-dev \
    git \  
    unzip \
    && docker-php-ext-install \
    intl \
    pdo \ 
    pdo_mysql \
    zip 

RUN deluser www-data || true && \
    delgroup www-data || true && \
    addgroup -g ${GROUP_ID} metawatch &&\
    adduser -u ${USER_ID} -G metawatch -D metawatch

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/bin/symfony

WORKDIR /var/www/html

COPY --chown=metawatch:metawatch . .
RUN chown -R 1001:1001 /var/www/html

EXPOSE 8000 

USER metawatch

CMD ["symfony", "server:start", "--port=8000", "--no-tls", "--allow-http", "--allow-all-ip"]