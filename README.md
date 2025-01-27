# Amanat Table

Amanat Table – это проект-конструктор таблиц, похожий на Airtable. 

## Структура монорепы

- **apps/**  
  Хранятся конечные приложения: React-фронтенд, NestJS-бэкенд и т.д.
- **packages/**  
  Общие библиотеки и модули (core, i18n, ui-lib, prisma).
- **plugins/**  
  Кастомные плагины (extensions), которые могут расширять систему.

## Запуск

```bash
cd amanat_table
pnpm install
pnpm run dev:react
pnpm run dev:nest