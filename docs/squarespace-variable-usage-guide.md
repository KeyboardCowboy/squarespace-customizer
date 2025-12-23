# Squarespace CSS Variables Architecture Guide

## Purpose
This guide helps AI agents understand how Squarespace organizes CSS variables to create scalable, maintainable custom styling solutions. Always prioritize using these variables over hardcoded CSS overrides.

---

## Core Principle: The Variable Hierarchy

Squarespace uses a **cascading reference system** where variables inherit from base values, creating a scalable architecture. Think of it like Excel formulasâ€”change the source cell, and everything updates automatically.

**The 4-Level Hierarchy:**
1. **Foundation** - Base HSL colors and font sizes
2. **Semantic** - Accent colors and font families
3. **Component** - Block-specific variables (prefixed with `--tweak-`)
4. **Element** - Specific UI elements within components

**Reference:** See `/mnt/project/CSS_Variables` for all variable definitions

---

## COLOR SYSTEM

### Architecture Overview
Colors use HSL values stored as comma-separated numbers (no `hsla()` wrapper), then applied with opacity control.

**Storage Format:**
```css
--black-hsl: 20.28,62.83%,44.31%;  /* Stored as HSL values */
```

**Application Format:**
```css
--siteTitleColor: hsla(var(--black-hsl), 1);  /* Applied with opacity */
```

### Base Color Variables (Lines 4-15)
```css
--white-hsl
--black-hsl
--accent-hsl
--lightAccent-hsl
--darkAccent-hsl
--safeLightAccent-hsl
--safeDarkAccent-hsl
--safeInverseAccent-hsl
--safeInverseLightAccent-hsl
--safeInverseDarkAccent-hsl
```

**Why HSL format?** Allows reusing the same color with different opacities:
```css
--headerBorderColor: hsla(var(--black-hsl), 1);     /* Solid */
--course-item-nav-border-color: hsla(var(--black-hsl), .25);  /* 25% opacity */
```

### Theme Scoping (Lines 17-3295)
Colors cascade based on section theme using `[data-section-theme="white"]` selectors. Each theme defines component colors that reference base HSL values.

**Example Theme Structure:**
```css
[data-section-theme="white"] {
  --siteTitleColor: hsla(var(--black-hsl), 1);
  --siteBackgroundColor: hsla(var(--white-hsl), 1);
  --paragraphLinkColor: hsla(var(--lightAccent-hsl), 1);
}
```

### Component Color Variables
Follow naming pattern: `--[prefix]-[component]-[element]-[property]`

**Prefixes:**
- `tweak-` - Block-specific elements
- No prefix - Global elements (headings, paragraphs, buttons)

**Examples:**
```css
--tweak-blog-item-title-color
--tweak-summary-block-background-color
--headingMediumColor
--primaryButtonBackgroundColor
```

### Scaling Strategy for Colors

**Level 1 - Change Foundation Colors** (Affects everything):
```css
:root {
  --black-hsl: 0,0%,10%;  /* Change base black */
  --accent-hsl: 210,100%,50%;  /* Change accent color */
}
```

**Level 2 - Adjust Theme Colors** (Affects specific section themes):
```css
[data-section-theme="white"] {
  --siteTitleColor: hsla(var(--darkAccent-hsl), 1);
}
```

**Level 3 - Target Specific Components** (Surgical precision):
```css
.blog-item-title {
  color: var(--tweak-blog-item-title-color);
}
```

---

## TYPOGRAPHY SYSTEM

### Base Font Configuration (Lines 3297-3332)

**Foundation Variable:**
```css
--base-font-size: 16px;  /* Everything scales from this */
```

### Three Font Families
Each has complete styling specifications (family, style, weight, transform, spacing, line-height):

**1. Heading Font** (`--heading-font-*`)
```css
--heading-font-font-family: "Nunito Sans"
--heading-font-font-style: normal
--heading-font-font-weight: 400
--heading-font-text-transform: none
--heading-font-letter-spacing: .02em
--heading-font-line-height: 1.3em
```

**2. Body Font** (`--body-font-*`)
```css
--body-font-font-family: "Nunito Sans"
--body-font-font-style: normal
--body-font-font-weight: 400
--body-font-text-transform: none
--body-font-letter-spacing: 0em
--body-font-line-height: 1.5em
```

**3. Meta Font** (`--meta-font-*`) - Used for smaller, secondary text
```css
--meta-font-font-family: "Nunito Sans"
--meta-font-font-style: normal
--meta-font-font-weight: 300
--meta-font-text-transform: none
--meta-font-letter-spacing: -.04em
--meta-font-line-height: 1.3em
```

### Size Scale System (Lines 3317-3332)

**Heading Sizes:**
```css
--heading-1-size: 6rem        (96px)
--heading-1-size-value: 6     (unitless for calculations)

--heading-2-size: 4.5rem      (72px)
--heading-2-size-value: 4.5

--heading-3-size: 3.2rem      (51.2px)
--heading-3-size-value: 3.2

--heading-4-size: 2.5rem      (40px)
--heading-4-size-value: 2.5
```

**Text Sizes:**
```css
--large-text-size: 1.2rem
--large-text-size-value: 1.2

--normal-text-size: 1rem
--normal-text-size-value: 1

--small-text-size: .8rem
--small-text-size-value: .8

--normal-meta-size: .9rem
--normal-meta-size-value: .9
```

**Why `-value` variants?** Unitless numbers for use in calculations (multiplying, calc functions, etc.)

### Component Font Variables (Lines 3333+)
Components inherit from base font systems and size scales:

```css
--blog-item-title-font-font-family: var(--heading-font-font-family);
--blog-item-title-font-font-size: var(--heading-1-size);
--blog-item-title-font-line-height: var(--heading-font-line-height);
```

**Naming Pattern:**
```
--[component]-font-[property]
```

**Examples:**
```css
--primary-button-font-font-size: 1.2rem
--site-title-font-font-family: var(--heading-font-font-family)
--quote-block-text-font-font-size: var(--large-text-size)
```

### Scaling Strategy for Typography

**Level 1 - Scale Everything Proportionally:**
```css
:root {
  --base-font-size: 18px;  /* All rem-based sizes scale automatically */
}
```

**Level 2 - Adjust Entire Size Tier:**
```css
:root {
  --heading-1-size: 5rem;  /* All H1s update */
  --normal-text-size: 1.1rem;  /* All body text updates */
}
```

**Level 3 - Change Font Family System:**
```css
:root {
  --heading-font-font-family: "Playfair Display";
  --body-font-font-family: "Inter";
}
```

**Level 4 - Target Specific Components:**
```css
:root {
  --blog-item-title-font-font-size: 4rem;
  --primary-button-font-font-weight: 700;
}
```

---

## SPACING & STRUCTURE SYSTEM

### Form Field Spacing (Lines 4255-4296)

**Field Properties:**
```css
--form-field-shape-border-top-left-radius: 5px
--form-field-border-thickness: 1px
--form-field-padding-vertical: 10px
--form-field-padding-horizontal: 10px
```

**Field Types (checkbox, radio, dropdown, survey):**
Each has dedicated variables following the pattern:
```css
--form-field-[type]-[property]
```

**Form Layout Spacing:**
```css
--form-label-spacing-bottom: 4px
--form-description-spacing-bottom: 4px
--form-caption-spacing-bottom: 2px
--form-field-spacing-bottom: 20px
--form-field-column-gap: 10px
```

### Button Structure (Lines 4298-4319)

**Each button type (primary, secondary, tertiary) has:**
```css
--[type]-button-rounded-border-top-left-radius: 6.8px
--[type]-button-padding-x: 2.004em
--[type]-button-padding-y: 1.2em
--[type]-button-stroke: 0px
```

**Example - Primary Button:**
```css
--primary-button-rounded-border-top-left-radius: 6.8px
--primary-button-padding-x: 2.004em
--primary-button-padding-y: 1.2em
--primary-button-stroke: 0px
```

### Animation Timing (Lines 4320-4321)
```css
--tweak-global-animations-animation-duration: .1s
--tweak-global-animations-animation-delay: .1s
```

### Scaling Strategy for Spacing

**Create consistent spacing scale:**
```css
:root {
  --spacing-unit: 8px;
  --form-field-padding-vertical: calc(var(--spacing-unit) * 1.25);
  --form-field-spacing-bottom: calc(var(--spacing-unit) * 2.5);
}
```

---

## BEST PRACTICES FOR AI AGENTS

### When User Asks About Colors:

1. **First check base HSL variables** (lines 4-15)
2. **Identify which theme scope applies** (white, black, accent themes)
3. **Find component-specific color variables** (search for `--tweak-[component]`)
4. **Recommend the appropriate level of customization**

### When User Asks About Font Sizes:

1. **Check if it affects all text** â†’ Adjust `--base-font-size`
2. **Check if it's a heading tier** â†’ Adjust `--heading-[1-4]-size`
3. **Check if it's body text tier** â†’ Adjust `--[size]-text-size`
4. **Check if it's component-specific** â†’ Adjust `--[component]-font-font-size`

### When User Asks About Spacing:

1. **Identify element type** (form, button, component)
2. **Search for relevant spacing variables** (padding, gap, margin patterns)
3. **Consider creating spacing scale** if none exists
4. **Maintain consistent spacing ratios**

### General Development Strategy:

**Priority Order:**
1. âœ… Try to achieve with Squarespace UI tools first
2. âœ… Override CSS variables at appropriate hierarchy level
3. âœ… Create new custom properties that reference existing variables
4. âš ï¸ Last resort: Override specific CSS classes

**Why this order?**
- UI changes persist through template updates
- Variable overrides scale automatically
- Class overrides can break with platform updates

---

## COMMON PATTERNS

### Pattern 1: Changing Accent Color Globally
```css
:root {
  --accent-hsl: 210,100%,50%;  /* New blue accent */
}
```
All buttons, links, and accent elements update automatically.

### Pattern 2: Increasing Base Font Size
```css
:root {
  --base-font-size: 18px;
}
```
All rem-based sizes scale proportionally (headings, text, meta).

### Pattern 3: Making All Headings Bolder
```css
:root {
  --heading-font-font-weight: 700;
}
```
All heading components inherit this change.

### Pattern 4: Component-Specific Color Override
```css
:root {
  --tweak-blog-item-title-color: hsla(var(--accent-hsl), 1);
}
```
Only blog post titles change, nothing else.

### Pattern 5: Creating Consistent Button Padding
```css
:root {
  --button-padding-unit: 1.5em;
  --primary-button-padding-x: calc(var(--button-padding-unit) * 1.5);
  --primary-button-padding-y: var(--button-padding-unit);
  --secondary-button-padding-x: calc(var(--button-padding-unit) * 1.5);
  --secondary-button-padding-y: var(--button-padding-unit);
}
```

---

## QUICK REFERENCE LOOKUP

### "How do I change..."

**"...the main site color?"**
â†’ `--accent-hsl` (line 12)

**"...heading sizes?"**
â†’ `--heading-[1-4]-size` (lines 3317-3324)

**"...body text size?"**
â†’ `--normal-text-size` (line 3327) or `--base-font-size` (line 3298)

**"...button colors?"**
â†’ `--primaryButtonBackgroundColor`, `--secondaryButtonBackgroundColor`, `--tertiaryButtonBackgroundColor`

**"...link colors?"**
â†’ `--paragraphLinkColor`, `--headingLinkColor`, `--navigationLinkColor`

**"...form field spacing?"**
â†’ `--form-field-padding-[vertical/horizontal]` (lines 4261-4262)

**"...button padding?"**
â†’ `--[type]-button-padding-[x/y]` (lines 4302-4318)

**"...background colors for specific sections?"**
â†’ Search for `[data-section-theme="[theme]"]` and find `--siteBackgroundColor`

---

## TROUBLESHOOTING

### Variable Not Changing Anything?

1. **Check specificity** - Theme scopes may override `:root`
2. **Check if variable is actually used** - Some elements use hardcoded values
3. **Clear cache** - Browser might be caching old styles
4. **Verify variable name** - Typos break the reference chain

### Colors Look Wrong?

1. **Check HSL format** - Must be comma-separated without `hsla()`
2. **Check opacity value** - Fourth parameter in `hsla()` controls transparency
3. **Check theme scope** - Different themes have different color mappings

### Sizes Not Scaling?

1. **Check if using `rem` or `px`** - Only `rem` scales with `--base-font-size`
2. **Check if referencing size variables** - Hardcoded values won't scale
3. **Check mobile breakpoints** - Some components have mobile-specific sizes

---

## FILE REFERENCE

All variables defined in: `/mnt/project/CSS_Variables`

**Key Line Ranges:**
- **Lines 4-15:** Base HSL color definitions
- **Lines 17-3295:** Theme-scoped color variables
- **Lines 3297-3332:** Base typography system
- **Lines 3333-4200:** Component-specific font definitions
- **Lines 4255-4321:** Spacing, structure, and animation variables

---

## FINAL NOTES

- Always read the CSS_Variables file before suggesting overrides
- Prefer variable inheritance over hardcoded values
- Test changes across multiple section themes
- Document any custom variables added
- Keep the inheritance chain logical and maintainable
