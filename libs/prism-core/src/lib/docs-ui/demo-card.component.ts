import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prism-demo-card',
  standalone: true,
  template: `
    <div class="demo-card">
      <div class="demo-preview">
        <ng-content select="[preview]" />
      </div>
      <div class="demo-code">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .demo-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

      .demo-preview {
        padding: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        
        /* Premium Grid Pattern Background */
        background-color: var(--bg-app);
        background-image: 
          radial-gradient(circle at 1px 1px, var(--surface-200) 1px, transparent 0);
        background-size: 24px 24px;
      }

      /* If code-block is present, it's usually at the bottom */
      prism-code-block {
        border-top: 1px solid var(--border);
        display: block;
      }
    }
    
    [data-theme="dark"] .demo-preview {
      background-image: radial-gradient(circle at 1px 1px, var(--surface-700) 1px, transparent 0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoCardComponent {
  // lint fix: non-empty class
  readonly componentType = 'demo-card';
}
