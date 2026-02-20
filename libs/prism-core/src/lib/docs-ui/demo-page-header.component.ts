import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prism-demo-page-header',
  template: `
    <header class="demo-header">
      <h1 class="demo-title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="demo-subtitle">{{ subtitle() }}</p>
      }
    </header>
  `,
  styles: [`
    .demo-header {
      margin-bottom: 2rem;
      @media (min-width: 768px) {
        margin-bottom: 3rem;
      }
      
      .demo-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-main);
        margin: 0 0 0.5rem 0;
        @media (min-width: 768px) {
          font-size: 2.5rem;
        }
      }

      .demo-subtitle {
        font-size: 1rem;
        color: var(--text-muted);
        margin: 0;
        @media (min-width: 768px) {
          font-size: 1.125rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoPageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
