# Kanban Board — React + TypeScript + Vite

A Kanban board app built with React, TypeScript, Vite, Tailwind CSS, Zustand, React Query, and dnd-kit.

## Tech Stack

- **React** + **TypeScript** — UI and type safety
- **Vite** — dev server and bundler
- **Tailwind CSS** — styling
- **Zustand** — client state management
- **React Query** — server state and mutations
- **dnd-kit** — drag and drop
- **json-server** — mock REST API backend
- **axios** — HTTP client

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the backend server (json-server)

```bash
npm run server
```

This starts the mock REST API at `http://localhost:4000`.

### 3. Start the frontend dev server

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:5173`.

### 4. Or run both together

```bash
npm run start
```

## Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server                    |
| `npm run server`  | Start json-server backend on port 3001   |
| `npm run start`   | Start both frontend and backend together |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build                 |

## Features

- Drag and drop tasks between columns
- Reorder tasks within the same column
- Persistent order and status saved to backend
- Create tasks per column (quick add or full modal)
- Edit task title, description, and priority
- Delete tasks
- Search by title and description with highlight
- Priority badges (Low, Medium, High, Urgent)
- Responsive layout

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```
