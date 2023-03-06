# Проект zatochka (Backend)

<a href="https://gitlab.sabr.com.tr/sabr-ci/zatochka/backend/pipelines/latest"
target="_blank"><img
src="https://gitlab.sabr.com.tr/sabr-ci/zatochka/backend/badges/master/pipeline.svg"
alt="GitLab build status"></a>

***Разрабатывается с использованием October CMS v3 (Laravel 9)***

## Локальная настройка и запуск

1. Клонировать репозиторий;
2. Разместить файл `auth.json` в папке `/src`;
3. Запустить команду `sh pre-conf.sh` для предварительного создания .env файла для контейнера и установки всех нужных файлов;
4. Запустить команду `docker-compose up -d` в папке с проектом для запуска всех контейнеров;
5. Перейти по [ссылке](http://zatochka.local/admin/backend/auth/setup) и создать главного администратора;
6. В файле <a href="https://help.reg.ru/hc/ru/articles/4408047489169-%D0%A4%D0%B0%D0%B9%D0%BB-hosts-%D0%B3%D0%B4%D0%B5-%D0%BD%D0%B0%D1%85%D0%BE%D0%B4%D0%B8%D1%82%D1%81%D1%8F-%D0%B8-%D0%BA%D0%B0%D0%BA-%D0%B5%D0%B3%D0%BE-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C" target="_blank">hosts</a>, добавьте строку `127.0.0.1 zatochka.local`;
7. Перейти по [ссылке](http://zatochka.local/admin/cms/themes) и активировать тему zatochka.

## Документация
- [OctoberCMS Docs](https://docs.octobercms.com/3.x/setup/installation.html).
- [Laravel 9](https://laravel.com/docs/9.x)
