# Prism Design System (Core)

[![NPM Version](https://img.shields.io/npm/v/@devynelogic/prism-core)](https://www.npmjs.com/package/@devynelogic/prism-core)
[![License](https://img.shields.io/npm/l/@devynelogic/prism-core)](https://opensource.org/licenses/MIT)

**Prism** is an enterprise-grade Angular UI Component Library built for performance, accessibility, and developer experience.

🔗 **[Live Demo & Documentation](https://prism-ds.netlify.app)**

## ✨ Features

- 🚀 **Modern Angular:** Built with Signals, Standalone Components, and Strict Typing.
- 🌗 **Theming:** First-class support for Dark Mode and Custom Themes.
- ♿ **Accessible:** WCAG 2.1 AA compliant.
- 📦 **Modular:** Import only what you need.

## 📦 Installation

```bash
npm install @devynelogic/prism-core @devynelogic/prism-theme @devynelogic/prism-icons
```

## 🔨 Setup

1. **Import Styles** (in `styles.scss`):

```scss
@import '@devynelogic/prism-theme/index';
@include prism-theme-init();
```

2. **Enable Animations** (in `app.config.ts`):

```typescript
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations()],
};
```

3. **Use a Component**:

```typescript
import { PrismButtonComponent } from '@devynelogic/prism-core';

@Component({
  imports: [PrismButtonComponent],
  template: `<prism-button>Click Me</prism-button>`,
})
export class App {}
```

---

Built with ❤️ by **DevyneLogic**.
