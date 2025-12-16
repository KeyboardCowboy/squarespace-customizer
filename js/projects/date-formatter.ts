/**
 * ============================================================================
 * SQUARESPACE DATE MANAGER
 * ============================================================================
 * Unified date handling for Squarespace items with multiple date displays.
 *
 * HOW IT WORKS:
 * 1. Finds container elements (e.g., .summary-item)
 * 2. Locates the most reliable date source within (<time> element preferred)
 * 3. Stores parsed date as data attributes on the container
 * 4. Formats all date displays within that container using stored data
 *
 * This solves the problem of having multiple date displays per item where
 * only one has parseable date information (like thumbnail overlays that show
 * "Dec 9" without the year).
 *
 * Last updated: December 2025
 * ============================================================================
 */

type DateFormatConfig = {
  selector: string;
  name: string;
  format: string;
};

type DateConfigItem = {
  itemSelector: string;
  dateSourceSelector: string;
  formats: DateFormatConfig[];
};

declare global {
  interface Window {
    dateConfig?: DateConfigItem[];
    processDates?: () => void;
  }
}

function parseDateFromElement(element: Element): Date | null {
  // Try datetime attribute (most reliable)
  const datetime = element.getAttribute("datetime");
  if (datetime) {
    const d = new Date(datetime);
    if (!Number.isNaN(d.getTime())) return d;
  }

  // Try parsing text content
  const text = element.textContent?.trim() ?? "";
  if (text) {
    const d = new Date(text);
    if (!Number.isNaN(d.getTime())) return d;
  }

  return null;
}

function addDateAttributes(container: Element, date: Date) {
  const isoDate = date.toISOString().split("T")[0];
  container.setAttribute("data-date", isoDate);
  container.setAttribute("data-year", String(date.getFullYear()));
  container.setAttribute("data-month", String(date.getMonth() + 1));
  container.setAttribute("data-day", String(date.getDate()));
}

function formatDateElement(
  element: Element,
  date: Date,
  format: string,
  wrapperClass: string,
) {
  const tokens: Record<string, { value: string | number; className: string }> = {
    YYYY: { value: date.getFullYear(), className: "year-full" },
    YY: { value: String(date.getFullYear()).slice(-2), className: "year-short" },
    MMMM: {
      value: date.toLocaleDateString("en-US", { month: "long" }),
      className: "month-long",
    },
    MMM: {
      value: date.toLocaleDateString("en-US", { month: "short" }),
      className: "month-short",
    },
    MM: {
      value: String(date.getMonth() + 1).padStart(2, "0"),
      className: "month-numeric",
    },
    M: { value: date.getMonth() + 1, className: "month-numeric" },
    dddd: {
      value: date.toLocaleDateString("en-US", { weekday: "long" }),
      className: "weekday-long",
    },
    ddd: {
      value: date.toLocaleDateString("en-US", { weekday: "short" }),
      className: "weekday-short",
    },
    DD: {
      value: String(date.getDate()).padStart(2, "0"),
      className: "day-numeric",
    },
    D: { value: date.getDate(), className: "day-numeric" },
  };

  let formatted = format;
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    const { value, className } = tokens[token];
    const wrapped = `<span class="${className}">${value}</span>`;
    const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    formatted = formatted.replace(new RegExp(`\\b${escapedToken}\\b`, "g"), wrapped);
  }

  // Add datetime attribute if element is <time>
  if (element instanceof HTMLTimeElement) {
    element.setAttribute("datetime", date.toISOString().split("T")[0]);
  }

  element.innerHTML = `<span class="${wrapperClass}">${formatted}</span>`;
}

function processDates() {
  const config = window.dateConfig;
  if (!Array.isArray(config)) return;

  for (const cfg of config) {
    const { itemSelector, dateSourceSelector, formats } = cfg;

    const items = document.querySelectorAll(itemSelector);

    items.forEach((item) => {
      const dateSource = item.querySelector(dateSourceSelector);
      if (!dateSource) return;

      const date = parseDateFromElement(dateSource);
      if (!date) return;

      addDateAttributes(item, date);

      formats.forEach((formatConfig) => {
        const { selector, name, format } = formatConfig;
        const elements = item.querySelectorAll(selector);

        elements.forEach((el) => {
          formatDateElement(el, date, format, name);
        });
      });
    });
  }
}

// Auto-execution
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", processDates);
} else {
  processDates();
}

window.addEventListener("mercury:load", processDates);

// Expose for manual calls
window.processDates = processDates;

export {};

