# CSS/Sass Architecture

This document describes the current pragmatic Sass structure for this repo.

## Layer Model

- `css/_scss/_variables.scss`
  - Design tokens and shared CSS variable helpers.
  - Example: `color-variables()`.

- `css/_scss/mixins/`
  - Parameterized Sass tools and utility mixins.
  - Use when logic/configuration is needed.
  - Examples: typography sizing helpers, link interaction helpers, announcement-bar style variants.

- `css/_scss/patterns/`
  - Reusable plain CSS patch blocks (no arguments).
  - Load at explicit locations with `meta.load-css()` to control output order.
  - Examples: `hidden-markdown`, `peek-pro-modal-fix`, summary/date presentation patches.

- `css/projects/`
  - One entrypoint per Squarespace site.
  - Compose shared base + selected patterns + site-specific overrides.

## Shared Base Contract

`css/projects/_base.scss` provides:

- `apply-color-variables()`
  - Emits project palette aliases into `:root`.
- `apply-base()`
  - Emits shared baseline interaction/spacing rules.

Project entrypoints should call these explicitly where output order should occur.

## Ordering Rule

Preferred order inside a project entrypoint:

1. `:root` declarations (site-specific variables + shared color vars)
2. shared baseline (`apply-base()`)
3. pattern blocks via `meta.load-css()` in desired order
4. site-specific custom rules

This keeps variable definitions predictable and avoids accidental module-level CSS hoisting.

## Pattern Loading Convention

Use:

```scss
@use "sass:meta";
@include meta.load-css("../_scss/patterns/<pattern-name>");
```

Use `meta.load-css()` at the exact point where emitted CSS should appear.

## Decision Rule: Mixin vs Pattern

Use a **mixin** when:

- parameters are required,
- logic/branching is needed,
- the same utility is applied in multiple contexts.

Use a **pattern** when:

- it is a reusable CSS patch block,
- no parameters are required,
- it is typically included once per project (or once per scoped block).
