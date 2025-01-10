# Описание

Ссылка на рабочий проект: http://130.193.53.10/

Этот проект представляет из себя небольшой блог со следующими возможностями:

-   Авторизация.
-   Просмотр всех опубликованных постов.
-   Просмотр своих опубликованных постов и черновиков.
-   Создание своих постов с названием, текстом, изображением и тегами.
-   Изменение и удаление своих постов.

Проект сделан на стеке Laravel-Inertia-React и основан на [предыдущем](https://github.com/YadaDelta/test_laravel_crud) проекте.

# Установка

## Требования

-   Linux, Macos, WSL
-   Git
-   PHP
-   Make
-   Node

## Установка через Make + Docker

```
git clone https://github.com/YadaDelta/laravel_blog.git
cd laravel_blog
make install
make up
make start
```

После установки сайт будет доступен по адресу http://0.0.0.0:80

## Установка через Docker

```
git clone https://github.com/YadaDelta/laravel_blog.git
cd laravel_blog
composer install
npm i
cp .env.example .env
php artisan key:generate
./vendor/bin/sail up
./vendor/bin/sail php artisan migrate
./vendor/bin/sail npm run dev
```

После установки сайт будет доступен по адресу http://0.0.0.0:80

## Ручная установка

```
git clone https://github.com/YadaDelta/laravel_blog.git
cd laravel_blog
composer install
npm i
cp .env.sqlite.example .env
php artisan key:generate
php artisan migrate
php artisan serve
npm run dev
```

После установки сайт будет доступен по адресу http://127.0.0.1:8000
