/**
 * Example per-site entrypoint.
 *
 * Copy this file to `js/projects/<site-slug>.ts` and compose your Squarespace scripts.
 * This file compiles to `js/dist/<site-slug>.js`.
 *
 * Shared helpers can live in `js/_ts/` (optional; add as needed).
 */

declare global {
  interface Window {
    // Add any site-specific globals you intentionally expose here.
  }
}

// Wrap in an IIFE so variables don’t leak into global scope.
(() => {
  // Your per-site logic here.

  // Tip: if you need to rerun on AJAX navigation:
  // window.addEventListener("mercury:load", () => {});
})();

export {};

