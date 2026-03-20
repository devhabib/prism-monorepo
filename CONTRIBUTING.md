# Contributing to Prism Design System

First off, thank you for considering contributing to Prism! It's people like you that make Prism a great tool for the Angular community.

## 🤝 Ways to Contribute

You can contribute in many ways:
- **Reporting Bugs:** Create an issue describing a reproducible bug.
- **Suggesting Features:** Propose new components or APIs.
- **Code Contributions:** Submit Pull Requests with fixes or features.
- **Documentation:** Improve existing guides or fix typos.

---

## 💻 Development Workflow

To streamline the process, please follow these steps:

1. **Fork the repository** to your own GitHub account.
2. **Create a branch** from the `development` branch (not `main`).
   - *Branch naming convention:*
     - `feat/component-name` (e.g., `feat/tooltip`)
     - `fix/issue-description` (e.g., `fix/button-alignment`)
     - `docs/what-changed` (e.g., `docs/readme-typo`)
     - `chore/what-changed` (e.g., `chore/ci-update`)
3. **Make your changes** locally.
4. **Run lint and build** commands to ensure everything passes:
   ```bash
   npx nx lint
   npx nx build prism-core
   ```
5. **Open a Pull Request** targeting the `development` branch.

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

1. Create the component inside `libs/prism-core/src/lib/`.
2. Export the component in the library's `index.ts` file so it's consumable.
3. Add a documentation page or example in `apps/prism-docs/src/app/pages/`.
4. Update the `CHANGELOG.md` under the `[Unreleased]` section with your addition.

---

## 🏷️ Versioning

**Contributors should NOT bump versions in PRs.**

Version bumps are handled exclusively by the maintainers right before merging to the `main` branch for publishing.

---

## 🎨 Code Style

To maintain a clean codebase, we enforce formatting and linting rules:

- **Prettier** fixes formatting automatically on save or via `npx prettier --write .`
- **ESLint** lints your code. Run `npm run lint` or `npx nx lint` before committing.
- **The CI pipeline** will fail if there are any lint errors.

---

## ❓ Getting Help

If you have questions about using the library, getting stuck on a bug, or wanting to discuss architecture designs, please head over to our [**GitHub Discussions**](https://github.com/devhabib/prism-monorepo/discussions) board. We're happy to help!
