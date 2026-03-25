# Contributing to Prism Design System

First off, thank you for considering contributing to Prism! It's people like you that make Prism a great tool for the Angular community.

## 🤝 Contribution Policy

To maintain a stable and high-quality codebase, **direct pushes to the `development` or `main` branches are strictly prohibited.**

All contributions must follow our strict Pull Request (PR) workflow:

1.  **Fork the repository** to your own GitHub account.
2.  **Create a branch** off the `development` branch (e.g., `feature/your-feature-name`, `fix/issue-description`).
3.  **Make your changes** locally adhering to our Angular 21 zoneless standards.
4.  **Submit a Pull Request** targeting the `development` branch.
5.  **Review & Approval**: All PRs require review and approval from the repository owner (Habib) before merging.

---

## 💻 Local Development Setup

### 1. Fork & Clone

```bash
git clone https://github.com/devhabib/prism-monorepo.git
cd prism-monorepo
```

### 2. Branching

Always branch off `development`:

```bash
git checkout development
git checkout -b feature/amazing-feature
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Verify Changes

Run lint and build commands to ensure everything passes before submitting your PR:

```bash
npx nx lint
npx nx build prism-core
```

---

## 📝 Commit Message Convention

We follow the **Conventional Commits** format for clear git history. Your commit message should look like this:

`<type>(<scope>): <short description>`

### Examples:

- `feat(core): add tooltip component`
- `fix(theme): correct CSS variable for primary color`
- `docs(readme): add quick start section`
- `chore(ci): update Node.js version to 22`

---

## 🛠️ Adding a New Component

If you are adding a new component, please ensure you complete this checklist:

1.  Create the component inside `libs/prism-core/src/lib/`.
2.  Export the component in the library's `index.ts` file so it's consumable.
3.  Add a documentation page or example in `apps/prism-docs/src/app/pages/`.
4.  Update the `CHANGELOG.md` under the `[Unreleased]` section with your addition.

---

## 🏷️ Versioning

**Contributors should NOT bump versions in PRs.**

Version bumps are handled exclusively by the maintainers right before merging to the `main` branch for publishing.

---

## 🎨 Code style

To maintain a clean codebase, we enforce formatting and linting rules:

- **Prettier** fixes formatting automatically on save or via `npx prettier --write .`
- **ESLint** lints your code. Run `npm run lint` or `npx nx lint` before committing.
- **The CI pipeline** will fail if there are any lint errors.

---

## ❓ Getting Help

If you have questions about using the library, getting stuck on a bug, or wanting to discuss architecture designs, please head over to our [**GitHub Discussions**](https://github.com/devhabib/prism-monorepo/discussions) board. We're happy to help!
