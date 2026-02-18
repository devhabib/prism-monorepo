**Role:** Lead Angular Architect & Prompt Engineer
**Context:** This project is a high-traffic NPM ecosystem (`@devynelogic/prism-core`, `prism-icons`, `prism-theme`) built on an Nx Monorepo.
**Goal:** v0.0.5 Major Update — 100% Type Safety, 100% Test Coverage, 0 Lint Errors.

---

## **1. Strict Project Architecture**

You **MUST** respect the library boundaries and import paths defined in `tsconfig.base.json`:

- **`@devynelogic/prism-core`**: Main component logic. Located in `libs/prism-core`.
- **`@devynelogic/prism-icons`**: SVG/Icon registry logic. Located in `libs/prism-icons`.
- **`@devynelogic/prism-theme`**: SASS variables, tokens, and global styles. Located in `libs/prism-theme`.
- **Documentation App**: Located in `apps/prism-docs`.

---

## **2. Component Standards (Angular 21)**

Every component created or refactored must adhere to these "No Mistakes" rules:

- **Standalone Everything:** No `NgModules`. and never use `standalone: true`. Angular 21 default support standalone
- **Signals Only:** Use `signal()`, `computed()`, and `effect()` for state. Avoid `BehaviorSubject` unless necessary for internal service events.
- **Inputs/Outputs:** Use `input()`, `input.required()`, and `output()`.
- **Control Flow:** Use `@if`, `@for`, `@switch`. Never use `*ngIf` or `*ngFor`.
- **Animations Workaround:** Do **NOT** use `@angular/animations`. Use CSS Grid height transitions (the `0fr` to `1fr` trick) or the Web Animations API directly to maintain a lightweight bundle.

---

## **3. Build & Test Ecosystem**

- **Vitest:** Tests must run via `npx nx test prism-core`.
- **Sass Resolution:** Always configure `loadPaths` in `vite.config.ts` or `project.json` to include `libs/prism-theme/src/lib` so `@use '@devynelogic/prism-theme'` works.
- **Linting:** Use `eslint` with Angular-recommended rules. No `any` types. Strictly typed events.

---

## **4. SASS & Theming Protocol**

- **Variables:** Always import via `@use '@devynelogic/prism-theme' as *;`.
- **Prefixing:** All CSS classes must start with `.prism-` to avoid conflicts.
- **Theming:** Components must support both `.prism-theme-light` and `.prism-theme-dark`.

---

## **5. Export Strategy**

- Any new component **MUST** be exported in `libs/prism-core/src/index.ts`.
- Public API for styles must be updated in `libs/prism-theme/src/lib/_index.scss` using `@forward`.

---

## **Prompting Instructions for Antigravity**

> "When generating code, verify the file path against `nx.json`. Use Angular Signal-based architecture. If styling, check `libs/prism-theme` for existing variables. Before finishing, generate a Vitest `.spec.ts` file ensuring 100% branch coverage."

---

### **Next Step**

I am now synced with this master configuration. Would you like me to start by **reviewing the Table component** on your current codebase to align it with these v0.0.5 standards?
