# Patterns Layer

Use this folder for reusable CSS blocks that are typically included once per project (or once per scoped block), without Sass parameters.

## When To Use A Pattern

- The code is a reusable CSS patch block.
- It does not need configuration arguments.
- You want explicit control over output order.

## How To Load A Pattern

In a project entrypoint, use `meta.load-css()` at the exact position where the CSS should be emitted:

```scss
@use "sass:meta";

@include meta.load-css("../_scss/patterns/hidden-markdown");
```

## When To Use A Mixin Instead

Keep code in `css/_scss/mixins/` when at least one is true:

- It needs parameters.
- It is used in multiple contexts that require dynamic selector scoping.
- It behaves like a low-level utility rather than a full patch block.
