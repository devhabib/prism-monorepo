import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prism-demo-page-header',
  standalone: true,
  template: `
    <header class="demo-header">
      <h1 class="demo-title">{{ title() }}</h1>
      <p class="demo-subtitle">{{ subtitle() }}</p>
    </header>
  `,
  styles: [`
    .demo-header {
      margin-bottom: 3rem;
      
      .demo-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-main);
        margin: 0 0 0.5rem 0;
      }

      .demo-subtitle {
        font-size: 1.125rem;
        color: var(--text-muted);
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoPageHeaderComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
}
