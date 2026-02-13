import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismCardComponent, PrismCodeBlockComponent } from '@devynelogic/prism-core';

@Component({
  selector: 'prism-installation',
  standalone: true,
  imports: [CommonModule, PrismCardComponent, PrismCodeBlockComponent],
  template: `
    <h1>Installation</h1>
    <p class="text-xl text-muted mb-8">Get started with Prism Design System in your Angular application.</p>

    <prism-card header="1. Install Packages">
      <p class="mb-4">Run the following command to install the core library, themes, and icons:</p>
      <prism-code-block code="npm install @devynelogic/prism-core @devynelogic/prism-theme @devynelogic/prism-icons" language="bash"></prism-code-block>
    </prism-card>

    <div class="h-8"></div>

    <prism-card header="2. Configure Styles">
      <p class="mb-4">Import the core theme and your preferred mode (Light/Dark) in your global <code>styles.scss</code>:</p>
      <prism-code-block [code]="styleSnippet" language="scss"></prism-code-block>
    </prism-card>

    <div class="h-8"></div>

    <prism-card header="3. Setup Core & Icons">
      <p class="mb-4">Prism components require Angular Animations and icon registration. Configure them in your <code>app.config.ts</code>:</p>
      <prism-code-block [code]="animSnippet" language="typescript"></prism-code-block>
    </prism-card>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 800px;
    }
    
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-muted { color: var(--text-secondary); }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .h-8 { height: 2rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationComponent {
  styleSnippet = `@use '@devynelogic/prism-theme/core' as prism;
@include prism.theme-init(
  $mode: 'light', // or 'dark'
  $primary: #2563EB
);`;

  animSnippet = `import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PrismIconRegistry } from '@devynelogic/prism-core';
import * as PrismIcons from '@devynelogic/prism-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (registry: PrismIconRegistry) => () => {
        registry.addIcons(Object.values(PrismIcons));
      },
      deps: [PrismIconRegistry],
      multi: true
    }
  ]
};`;
}
