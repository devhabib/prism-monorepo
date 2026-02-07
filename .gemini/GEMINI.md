I am ready to implement the "Prism Core" Design System. You are the Senior Angular Architect.

**Current State:**
The monorepo structure is set. We have a `libs/prism-theme` library waiting for code.

**Your Task:**
Populate the Design Token System in `libs/prism-theme/src/lib/core/`. You must write production-ready SCSS code for the following files.

**1. \_variables.scss** (The DNA)

- Define a semantic color palette:
  - `$primary`: A professional tech blue (e.g., #2563EB).
  - `$surface`: A clean slate scale (for cards/modals).
  - `$semantic`: Success, Warning, Danger.
- Define a spacing scale (`$space-xs` to `$space-xxl`) using `rem`.
- Define z-indices as a map (`$z-layers`) to prevent stacking context wars.

**2. \_functions.scss** (The Tools)

- Write a `rem($pixels)` function that converts px to rem (assume 16px base).
- Write a `contrast-color($color)` function that automatically returns black or white text based on the background brightness (WCAG compliance).

**3. \_mixins.scss** (The Logic)

- `flex-center`: Quickly center items.
- `glassmorphism`: A mixin for that modern, frosted-glass UI effect (backdrop-filter).
- `focus-ring`: A standard, accessible focus outline for interactive elements.

**4. \_reset.scss** (The Foundation)

- Apply a modern box-sizing reset.
- Remove default margins from `body`, `h1-h6`, `p`.

**Execution Rule:**
Write the code for each file clearly. Do not explain "what is a variable"; just provide the robust, senior-level code.
