#!/usr/bin/env bash

echo "Configuration setup started"

cp ./docker/.env.example ./docker/.env
cp ./src/.env.example ./src/.env

echo "USER=$USER" >> ./docker/.env

docker-compose up -d

docker-compose exec backend composer install
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan october:migrate
docker-compose exec backend php artisan october:update

docker-compose down

echo "Configuration setup completed"
