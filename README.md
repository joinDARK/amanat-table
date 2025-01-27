# Amanat Table

Amanat Table – это проект-конструктор таблиц, похожий на Airtable. 

## Структура монорепы

- **apps/**  
  Хранятся конечные приложения: React-фронтенд, NestJS-бэкенд и т.д.
- **packages/**  
  Общие библиотеки и модули (core, i18n, ui-lib, prisma).
- **plugins/**  
  Кастомные плагины (extensions), которые могут расширять систему.

## Скрипты

- `pnpm run dev` – запустить все сервисы в режиме разработки.
- `pnpm build` – собрать все проекты.
- `pnpm lint` – проверить код с помощью ESLint.
- `pnpm test` – запустить тесты.

## Установка

```bash
cd amanat_table
pnpm install
