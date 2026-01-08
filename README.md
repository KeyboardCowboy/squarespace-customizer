### Squarespace Snippets Library

Reusable **Sass (SCSS)** and **JavaScript/TypeScript** snippets for building Squarespace site customizations.

This repo is intended to:
- keep small, composable overrides (mixins/partials + JS snippets)
- assemble them into **per-site entrypoints**
- compile to **dist outputs** you can either paste into Squarespace or host remotely

### Structure

- `css/_scss/`: shared SCSS partials/mixins (library code)
- `css/projects/`: per-site SCSS entrypoints (`<site>.scss`)
- `css/dist/`: compiled CSS outputs (`<site>.css`) — tracked so you can host them

- `js/date-formatter.js`: original JS snippet (kept as-is)
- `js/_ts/`: shared TS helpers (optional; add as needed)
- `js/projects/`: per-site TS entrypoints (`<site>.ts`)
- `js/dist/`: compiled JS outputs (`<site>.js`) — tracked so you can host them

### Build

Install:

```bash
npm install
```

#### CSS (Sass)

```bash
npm run build:css
npm run build:css:min
npm run watch:css
```

#### JS (TypeScript + esbuild)

```bash
npm run typecheck
npm run build:js
npm run build:js:min
npm run watch:js
```

### Notes (Squarespace)

- Prefer Squarespace Site Styles and CSS variables when possible.
- Squarespace Custom CSS can strip certain syntax (notably some `calc(...)` patterns), so prefer variable-based overrides when you hit that edge case.

### Docs

- `docs/project-context.md`: repo overview for future agents
- `docs/build.md`: detailed build instructions
- `docs/CHANGELOG.md`: change history





