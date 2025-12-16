### Changelog

All notable changes to this repository are recorded here.

### Unreleased

- (placeholder)

### 2025-12-16

- Added `docs/project-context.md` (project overview for future agents).
- Added Sass build tooling via `package.json` (Dart Sass) with per-site entrypoints compiled from `css/projects/` to `css/dist/`.
- Added `css/projects/example.scss` as a starter per-site entrypoint.
- Added `docs/build.md` with install/build/watch instructions.
- Added `.gitignore` (ignores `node_modules/`, keeps compiled CSS tracked).
- Added TypeScript build tooling via `package.json` (TypeScript + esbuild) with per-site entrypoints compiled from `js/projects/` to `js/dist/`.
- Added `tsconfig.json` and `npm run typecheck`.
- Added `js/projects/date-formatter.ts` (TypeScript version) and compiled output `js/dist/date-formatter.js` (kept original `js/date-formatter.js`).

