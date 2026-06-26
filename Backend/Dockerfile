FROM php:8.5-fpm-alpine

ARG USER_ID=1001
ARG GROUP_ID=1001
 

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


COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R metawatch:metawatch /var/www/html

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

EXPOSE 8000 

USER metawatch

CMD ["symfony", "server:start", "--port=8000", "--no-tls", "--allow-http", "--allow-all-ip"]