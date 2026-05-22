FROM php:8.4-cli

RUN apt-get update \
    && apt-get install -y --no-install-recommends sqlite3 libsqlite3-dev git unzip \
    && docker-php-ext-install pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "[ -f .env ] || cp .env.example .env; grep -q '^APP_KEY=base64:' .env || php artisan key:generate --force; touch database/database.sqlite; php artisan migrate --force; php artisan serve --host=0.0.0.0 --port=8000"]
