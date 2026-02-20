import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prism-demo-section',
  template: `
    <div class="demo-section">
      <h2 class="section-title">{{ title() }}</h2>
      @if (description()) {
        <p class="section-description" [innerHTML]="description()"></p>
      }
      <ng-content />
    </div>
  `,
  styles: [`
    .demo-section {
      margin-bottom: 4rem;

      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-main);
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border);
      }

      .section-description {
        margin-bottom: 1.5rem;
        color: var(--text-muted);
        line-height: 1.6;
        
        code {
          background: var(--surface-100);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoSectionComponent {
  title = input.required<string>();
  description = input<string | null>(null);
}
