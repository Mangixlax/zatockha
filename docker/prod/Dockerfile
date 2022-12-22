FROM php:8.0.10-fpm-alpine3.14

## Looked here: <https://github.com/prooph/docker-files>
ARG USER=docker
ARG UID=1000
ARG GID=1000

RUN apk add --update curl $PHPIZE_DEPS \
    git  \
    postgresql-dev \
    icu-libs  \
    icu-dev  \
    zlib-dev  \
    freetype \
    libjpeg-turbo \
    libpng \
    libwebp \
    libwebp-dev \
    libwebp-tools \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    supervisor \
    nodejs \
    npm

RUN npm install --global yarn

#Common php extension
RUN docker-php-ext-install pdo pdo_pgsql exif \
    && docker-php-ext-enable pdo \
    && docker-php-ext-install zip \
    && docker-php-ext-enable zip

#Install GD
RUN docker-php-ext-configure gd \
    --with-freetype=/usr/include/ \
    --with-jpeg=/usr/include/ \
    --with-webp=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd

RUN set -xe \
    && rm -rf /tmp/* \
    && rm -rf /var/www/html/backend \
    && mkdir /var/www/html/backend \
    && rm -f /usr/local/etc/php-fpm.d/*

#Composer install
RUN set -xe \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    # show php info
    && php -v \
    && php-fpm -v \
    && php -m

RUN addgroup --gid "${GID}" "${USER}" \
    && adduser \
            --disabled-password \
            --gecos "" \
            --home "$(pwd)" \
            --ingroup "${USER}" \
            --no-create-home \
            --uid "${UID}" \
            "${USER}"

RUN mkdir /var/log/php-fpm && cd /var/log/php-fpm && touch error.log && touch access.log

RUN mkdir -p /var/www/html/backend

COPY ./src/ /var/www/html/backend

COPY ./docker/prod/config/www.conf /usr/local/etc/php-fpm.d/
COPY ./docker/prod/config/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./docker/prod/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN chown -R ${UID}:${GID} /var/www/html/backend \
  && chmod -R 775 /run \
  && chmod -R 775 /var/www/html/backend

USER ${UID}:${GID}

WORKDIR /var/www/html/backend

RUN composer install --no-dev --no-progress --optimize-autoloader

EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
