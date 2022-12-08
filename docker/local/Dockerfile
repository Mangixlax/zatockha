FROM php:8.0.10-fpm-alpine3.14

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

#Composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN addgroup --gid "${GID}" "${USER}" \
    && adduser \
            --disabled-password \
            --gecos "" \
            --home "$(pwd)" \
            --ingroup "${USER}" \
            --no-create-home \
            --uid "${UID}" \
            "${USER}"

RUN mkdir -p /var/www/html/backend

COPY ./config/www.conf /usr/local/etc/php-fpm.d/
COPY ./config/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN chown -R ${UID}:${GID} /var/www/html/backend \
  && chmod -R 775 /run \
  && chmod -R 775 /var/www/html/backend

USER ${UID}:${GID}

WORKDIR /var/www/html/backend

EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
