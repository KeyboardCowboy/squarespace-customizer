### Sass build setup

This repo uses **Dart Sass** via npm scripts to compile per-site entrypoints.

### Install

```bash
npm install
```

### Create a new site bundle

- Copy `css/projects/example.scss` to `css/projects/<site-slug>.scss`
- Add/compose overrides in that file using library partials from `css/_scss/`

### Build

Compile all entrypoints in `css/projects/` into `css/dist/`:

```bash
npm run build:css
```

Minified build:

```bash
npm run build:css:min
```

Watch mode (rebuild on change):

```bash
npm run watch:css
```

### Output

Each `css/projects/<site>.scss` compiles to:

- `css/dist/<site>.css`

You can either:
- copy/paste the compiled CSS into Squarespace Custom CSS, or
- commit `css/dist/<site>.css` and reference it remotely from Squarespace.

