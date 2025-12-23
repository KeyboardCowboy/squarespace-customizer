# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal library of reusable **Sass (SCSS)** and **TypeScript** snippets for building Squarespace site customizations. The workflow is based on composition: small, reusable library code is assembled into per-site entrypoints, compiled to distributable outputs, and either pasted into Squarespace Custom CSS/Code Injection or hosted remotely.

## Common Commands

### Setup
```bash
npm install
```

### CSS (Sass)
```bash
npm run build:css        # Compile all SCSS entrypoints (expanded)
npm run build:css:min    # Compile all SCSS entrypoints (minified)
npm run watch:css        # Watch and recompile on changes
```

### JavaScript (TypeScript)
```bash
npm run typecheck        # Type-check all TypeScript files
npm run build:js         # Compile all TS entrypoints (bundled)
npm run build:js:min     # Compile all TS entrypoints (bundled + minified)
npm run watch:js         # Watch and recompile on changes
```

## Architecture

### SCSS Architecture
- **Library code**: `css/_scss/` — reusable partials and mixins (prefixed with `_`)
  - `_links.scss` — link interaction styles (underline on hover/focus, active states)
  - `_navigation.scss` — navigation/submenu spacing utilities
  - `_typography.scss` — typography overrides
  - `_dates.scss` — date formatting styles
  - `_summary-blocks.scss` — summary block customizations
- **Per-site entrypoints**: `css/projects/<site-slug>.scss` — compose library partials + site-specific overrides
- **Compiled outputs**: `css/dist/<site-slug>.css` — tracked in git for remote hosting or copy/paste into Squarespace

**Build pipeline**: Dart Sass compiles all `css/projects/*.scss` → `css/dist/*.css` with load path set to `css/_scss/`

### TypeScript/JavaScript Architecture
- **Library code**: `js/_ts/` — optional shared helpers (add as needed)
- **Per-site entrypoints**: `js/projects/<site-slug>.ts` — compose helpers + site-specific scripts
- **Compiled outputs**: `js/dist/<site-slug>.js` — tracked in git for remote hosting or embedding in Squarespace
- **Legacy**: `js/date-formatter.js` — original JS snippet (kept as-is)

**Build pipeline**: esbuild bundles all `js/projects/*.ts` → `js/dist/*.js` as IIFE format for browser

### Creating a New Site Bundle

**CSS**:
1. Copy `css/projects/example.scss` to `css/projects/<site-slug>.scss`
2. Import library partials using `@use "../_scss/<partial>" as *;`
3. Compose overrides in the entrypoint file
4. Build with `npm run build:css`

**JS**:
1. Copy `js/projects/example.ts` to `js/projects/<site-slug>.ts`
2. Write site-specific logic inside the IIFE wrapper
3. Build with `npm run build:js`

## Squarespace-Specific Constraints

### Prefer Squarespace UI First
Always try to achieve desired results using Squarespace Site Styles and CSS variables before writing custom CSS.

### Custom CSS Limitations
- **`calc()` is stripped**: Squarespace's Custom CSS parser removes `calc()` expressions
  - ❌ `font-size: calc((var(--heading-1-size-value) - 1) * 1.2vw + 1rem);`
  - ✅ `font-size: var(--heading-1-size);`
- **Solution**: Use Squarespace CSS variables directly instead of trying to recreate their internal calculations

### Writing Scalable CSS
- Prefer Squarespace CSS variables over hard-coded values (e.g., `var(--siteBackgroundColor)`, `var(--tweak-blog-item-meta-color)`)
- Avoid brittle auto-generated classnames; target stable block/section identifiers when possible
- Keep selectors resilient and scoped as tightly as feasible

### TypeScript Conventions
- Wrap all per-site logic in an IIFE to avoid polluting global scope
- Declare intentional global interfaces in `declare global { interface Window { ... } }`
- For AJAX navigation compatibility, use `window.addEventListener("mercury:load", () => {})`

## Code Style

### SCSS
- All partials must start with `_` (e.g., `_links.scss`)
- Include a header comment describing purpose and when to use the mixin/partial
- Use clear variable/mixin names
- Keep selectors minimal and scoped
- Document any dependencies on specific Squarespace templates or engine behaviors

### TypeScript
- Always include basic-level code comments
- Always include code block comments before methods and functions
- Use TypeScript strict mode (already configured)
- Export `{}` at the end of entrypoint files to ensure they're treated as modules

## Documentation

- `docs/project-context.md` — detailed repo philosophy and design goals
- `docs/build.md` — detailed build instructions and workflow
- `docs/CHANGELOG.md` — change history
