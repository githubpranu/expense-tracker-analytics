# expense-tracker-analytics

Built a responsive personal finance management application using Angular and TypeScript featuring expense tracking, category-wise analysis, budgeting, interactive charts, monthly reports, and data export functionality.

The UI is built with the free, open-source [Brightlayer UI](https://brightlayer-ui.github.io/) design system (Eaton) on top of Angular Material.

## Tech stack

- Angular 16 (NgModule-based, lazy-loaded feature modules)
- Angular Material 16
- Brightlayer UI (`@brightlayer-ui/angular-components`, `@brightlayer-ui/angular-themes`, `@brightlayer-ui/colors`, `@brightlayer-ui/icons-mui`)

## Features

- **Dashboard** – summary score cards, spending-by-category breakdown, recent transactions
- **Expenses** – add and delete expenses with a reactive form
- **Categories** – per-category totals, counts, and share of spend
- **Reports** – 6-month spending trend and CSV export

Data is persisted in the browser via `localStorage` and seeded with sample expenses on first run.

## Development server

Run `npm start` and open `http://localhost:4200/`. The app reloads on source changes.

## Build

Run `npm run build` to build the project. Artifacts are written to `dist/`.
