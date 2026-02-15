import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismCardComponent } from '@devynelogic/prism-core';

@Component({
  selector: 'prism-accessibility',
  standalone: true,
  imports: [CommonModule, PrismCardComponent],
  template: `
    <h1>Accessibility</h1>
    <p class="text-xl text-muted mb-8">Prism is built with accessibility (a11y) as a core principle.</p>

    <prism-card header="Keyboard Navigation">
      <p class="mb-4">All interactive components support full keyboard control:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Tab:</strong> Navigate between focusable elements.</li>
        <li><strong>Enter / Space:</strong> Activate buttons, checkboxes, and switches.</li>
        <li><strong>Escape:</strong> Close Overlays (Modals, Drawers, Tooltips).</li>
        <li><strong>Arrow Keys:</strong> Navigate lists (Select, Menu) and Tabs.</li>
      </ul>
    </prism-card>

    <div class="h-8"></div>

    <prism-card header="WAI-ARIA Standards">
      <p>Components utilize ARIA attributes to ensure compatibility with screen readers:</p>
      <ul class="list-disc pl-6 space-y-2 mt-2">
        <li><code>role="dialog"</code> and <code>aria-modal="true"</code> on Dialogs.</li>
        <li><code>aria-expanded</code> and <code>aria-controls</code> on Accordions.</li>
        <li><code>aria-checked</code> on Switches and Checkboxes.</li>
      </ul>
    </prism-card>
  `,
  styles: [`
    :host {
      display: block;
      // max-width: 800px;
    }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-muted { color: var(--text-secondary); }
    .mb-8 { margin-bottom: 2rem; }
    .h-8 { height: 2rem; }
    .list-disc { list-style-type: disc; }
    .pl-6 { padding-left: 1.5rem; }
    .space-y-2 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.5rem * var(--tw-space-y-reverse)); }
    .mb-4 { margin-bottom: 1rem; }
    .mt-2 { margin-top: 0.5rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessibilityComponent {
  protected readonly title = 'Accessibility';
}
