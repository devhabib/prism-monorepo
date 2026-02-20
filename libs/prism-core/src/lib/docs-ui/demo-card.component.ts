import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, contentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTabGroupComponent } from '../tabs/tab-group.component';
import { PrismTabComponent } from '../tabs/tab.component';

@Component({
  selector: 'prism-demo-card',
  imports: [CommonModule, PrismTabGroupComponent, PrismTabComponent],
  template: `
    <div class="prism-card border border-surface-200 rounded-xl bg-surface-0">
      <div class="p-4">
        @if (hasManualTabs()) {
          <!-- Manual Tab Layout (used in most demo pages) -->
          <ng-content />
        } @else {
          <!-- Automated Tab Layout (used for slotted content) -->
          <prism-tab-group variant="pill">
            <prism-tab label="Preview">
              <div 
                class="p-8 bg-surface-50 dark:bg-surface-900/30 rounded-lg border border-dashed border-surface-200 dark:border-surface-700 mt-4"
                [ngStyle]="{ 'min-height': minHeight() }"
              >
                <ng-content select="[preview], [example]" />
              </div>
            </prism-tab>
            <prism-tab label="Code">
              <div class="mt-4">
                <ng-content select="[code]" />
              </div>
            </prism-tab>
          </prism-tab-group>
        }
      </div>
    </div>
  `,
  styles: [`
    .prism-card {
      display: block;
      width: 100%;
      /* Avoid overflow: hidden to prevent clipping Signal-based components with absolute popups */
      
      .p-4 {
        padding: 1rem;
        @media (min-width: 768px) {
          padding: 1.5rem;
        }
      }

      .p-8 {
        padding: 1rem;
        overflow-x: auto;
        @media (min-width: 768px) {
          padding: 2rem;
        }
      }

      prism-tab-group {
        width: 100%;
        overflow: visible;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoCardComponent {
  minHeight = input<string>('auto');
  readonly componentType = 'demo-card';

  // Detect if PrismTabGroupComponent is provided as a direct child
  readonly hasManualTabs = contentChild(PrismTabGroupComponent, { descendants: false });
}
