# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

This is a single-page React app (Vite + React 19) with no routing or external state management.

`App.jsx` is the root and owns only the `transactions` array state — an array of `{ id, description, amount, type, category, date }` objects where `amount` is a number. It passes data down to three child components:

- `Summary.jsx` — receives `transactions`, derives `totalIncome`, `totalExpenses`, and `balance` internally
- `TransactionForm.jsx` — owns its own form state (`description`, `amount`, `type`, `category`); calls `onAdd(transaction)` on submit
- `TransactionList.jsx` — owns its own filter state (`filterType`, `filterCategory`); applies filtering internally before rendering the table

Categories are defined as a hardcoded array in both `TransactionForm` and `TransactionList`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

There is no persistence layer — state resets on page refresh.
