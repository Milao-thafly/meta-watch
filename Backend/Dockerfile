FROM php:8.5-fpm-alpine

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

    COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

    RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony5/bin/symfony /usr/bin/symfony

    WORKDIR /var/www/html

    EXPOSE 8000

    CMD ["symfony", "server:start", "--port=8000", "--no-tls", "--allow-http", "--allow-all-ip"]