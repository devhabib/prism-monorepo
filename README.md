# Prism Design System

A comprehensive Angular UI component library published under the `@devynelogic` scope.

[![NPM Core](https://img.shields.io/npm/v/@devynelogic/prism-core?label=%40devynelogic%2Fprism-core)](https://www.npmjs.com/package/@devynelogic/prism-core)
[![NPM Theme](https://img.shields.io/npm/v/@devynelogic/prism-theme?label=%40devynelogic%2Fprism-theme)](https://www.npmjs.com/package/@devynelogic/prism-theme)
[![NPM Icons](https://img.shields.io/npm/v/@devynelogic/prism-icons?label=%40devynelogic%2Fprism-icons)](https://www.npmjs.com/package/@devynelogic/prism-icons)
[![CI — Lint, Build & Test](https://github.com/devhabib/prism-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/devhabib/prism-monorepo/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/devhabib/prism-monorepo)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/devhabib/prism-monorepo/pulls)

---

## 📖 Table of Contents

- [Packages](#-packages)
- [Live Demo](#-live-demo)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#-project-structure)
- [Branch Strategy](#-branch-strategy)
- [Contributing](#-contributing)
- [License](#-license)
- [Code of Conduct](#-code-of-conduct)

---

## 📦 Packages

| Package | Version | Description |
| :--- | :--- | :--- |
| [`@devynelogic/prism-core`](https://www.npmjs.com/package/@devynelogic/prism-core) | ![NPM](https://img.shields.io/npm/v/@devynelogic/prism-core) | Core UI components & services. |
| [`@devynelogic/prism-theme`](https://www.npmjs.com/package/@devynelogic/prism-theme) | ![NPM](https://img.shields.io/npm/v/@devynelogic/prism-theme) | Global styles & design tokens. |
| [`@devynelogic/prism-icons`](https://www.npmjs.com/package/@devynelogic/prism-icons) | ![NPM](https://img.shields.io/npm/v/@devynelogic/prism-icons) | Optimized SVG icon library. |

---

## 🚀 Live Demo

You can view the documentation and live examples here:
**[Prism Docs Site](https://prism-docs.netlify.app)** <!-- MAINTAINER: replace with your Netlify URL -->

---

## 🛠️ Installation

```bash
npm install @devynelogic/prism-core @devynelogic/prism-theme @devynelogic/prism-icons
```

> **Note on compatibility:** This library is built for **Angular 17+**. Please ensure your project meets this requirement.

---

## ⚡ Quick Start

### 1. Include Styles

Add the Prism theme styles to your `angular.json` or `styles.scss`:

```scss
@use '@devynelogic/prism-theme' as prism;

// Include core styles
@include prism.core();
```

### 2. Import Module / Component

In your Angular module or standalone component:

```typescript
import { Component } from '@angular/core';
import { PrismButtonComponent } from '@devynelogic/prism-core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PrismButtonComponent],
  template: `
    <button prism-button type="primary">Hello Prism</button>
  `
})
export class AppComponent {}
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v22+
- **npm**: v10+

### Step-by-Step

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devhabib/prism-monorepo.git
   cd prism-monorepo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the documentation site locally:**
   ```bash
   npx nx serve prism-docs
   ```
   *Access it at `http://localhost:4200`*

4. **Additional Commands:**
   - `npx nx build prism-core` — Build a specific library
   - `npx nx lint` — Lint all projects
   - `npx nx test` — Run unit tests

---

## 📂 Project Structure

```text
prism-monorepo/
├── apps/
│   └── prism-docs/          # Documentation app (demo site)
├── libs/
│   ├── prism-core/          # Core Components & Directives
│   ├── prism-theme/         # Design Tokens & Global Styles
│   └── prism-icons/         # SVG Icon Component & Assets
├── tools/
│   └── scripts/             # Internal helper scripts
└── .github/
    └── workflows/          # CI/CD Workflows
```

---

## 🌿 Branch Strategy

The repository operates on two main branches:

* **`development`**: Active development and integration. PRs should target this branch. Pushes trigger Netlify verification/deployment for docs.
* **`main`**: Production stable branch. PRs from `development` go here. Pushes trigger automated npm deployment for published libraries.

---

## 🤝 Contributing

We welcome any and all contributions! From bug reports and feature requests to code PRs and documentation improvements.

Please read our [**Contributing Guide**](CONTRIBUTING.md) to get started on how to fork, branch, and commit changes following our conventions.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Code of Conduct

Everyone participating in this project is expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
