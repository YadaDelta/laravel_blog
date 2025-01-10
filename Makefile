install:
	composer install
	npm i
	cp .env.example .env
	php artisan key:generate

up:
	./vendor/bin/sail up

start:
	./vendor/bin/sail php artisan migrate
	npm run dev

down:
	./vendor/bin/sail down -v

lint:
	./vendor/bin/phpcs --standard=PSR12 app/Http/Controllers app/Models database routes/web.php
	./vendor/bin/phpstan analyse app/Http/Controllers app/Models database routes/web.php tests

lint-fix:
	./vendor/bin/phpcbf --standard=PSR12 app/Http/Controllers app/Models database routes/web.php
	./vendor/bin/pint

lint-js:
	npx eslint resources/

test:
	php artisan test