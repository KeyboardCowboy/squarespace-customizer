"use strict";
(() => {
  // js/projects/date-formatter.ts
  function parseDateFromElement(element) {
    const datetime = element.getAttribute("datetime");
    if (datetime) {
      const d = new Date(datetime);
      if (!Number.isNaN(d.getTime())) return d;
    }
    const text = element.textContent?.trim() ?? "";
    if (text) {
      const d = new Date(text);
      if (!Number.isNaN(d.getTime())) return d;
    }
    return null;
  }
  function addDateAttributes(container, date) {
    const isoDate = date.toISOString().split("T")[0];
    container.setAttribute("data-date", isoDate);
    container.setAttribute("data-year", String(date.getFullYear()));
    container.setAttribute("data-month", String(date.getMonth() + 1));
    container.setAttribute("data-day", String(date.getDate()));
  }
  function formatDateElement(element, date, format, wrapperClass) {
    const tokens = {
      YYYY: { value: date.getFullYear(), className: "year-full" },
      YY: { value: String(date.getFullYear()).slice(-2), className: "year-short" },
      MMMM: {
        value: date.toLocaleDateString("en-US", { month: "long" }),
        className: "month-long"
      },
      MMM: {
        value: date.toLocaleDateString("en-US", { month: "short" }),
        className: "month-short"
      },
      MM: {
        value: String(date.getMonth() + 1).padStart(2, "0"),
        className: "month-numeric"
      },
      M: { value: date.getMonth() + 1, className: "month-numeric" },
      dddd: {
        value: date.toLocaleDateString("en-US", { weekday: "long" }),
        className: "weekday-long"
      },
      ddd: {
        value: date.toLocaleDateString("en-US", { weekday: "short" }),
        className: "weekday-short"
      },
      DD: {
        value: String(date.getDate()).padStart(2, "0"),
        className: "day-numeric"
      },
      D: { value: date.getDate(), className: "day-numeric" }
    };
    let formatted = format;
    const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);
    for (const token of sortedTokens) {
      const { value, className } = tokens[token];
      const wrapped = `<span class="${className}">${value}</span>`;
      const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      formatted = formatted.replace(new RegExp(`\\b${escapedToken}\\b`, "g"), wrapped);
    }
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
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processDates);
  } else {
    processDates();
  }
  window.addEventListener("mercury:load", processDates);
  window.processDates = processDates;
})();
