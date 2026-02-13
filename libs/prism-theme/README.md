# Prism Design System (Theme)

The styling foundation for the **Prism Design System**. Contains the SCSS mixins, variables, and utility classes required by `@devynelogic/prism-core`.

🔗 **[Documentation](https://prism-ds.netlify.app/getting-started/installation)**

## Installation

```bash
npm install @devynelogic/prism-core @devynelogic/prism-theme @devynelogic/prism-icons
```

## Usage

Import the core styles in your global `styles.scss`:

```scss
@use '@devynelogic/prism-theme' as prism;

// Initialize base styles and CSS variables
@include prism.init();

// (Optional) Use utility mixins
.my-card {
  @include prism.card-base;
}
```
