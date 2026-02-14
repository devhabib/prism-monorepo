import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { PrismTabGroupComponent } from '../tabs/tab-group.component';
import { PrismTabComponent } from '../tabs/tab.component';

@Component({
  selector: 'prism-demo-card',
  standalone: true,
  imports: [PrismTabGroupComponent, PrismTabComponent],
  template: `
    <div class="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden bg-surface-0 dark:bg-surface-900">
      <div class="border-b border-surface-200 dark:border-surface-700 px-4 py-3 bg-surface-50 dark:bg-surface-800/50">
        <prism-tab-group variant="pill">
          <prism-tab label="Preview">
            <div class="p-6 bg-surface-0 dark:bg-surface-900 overflow-x-auto">
              <ng-content select="[preview]" />
            </div>
          </prism-tab>
          <prism-tab label="Source Code">
            <div class="bg-[#1e1e1e]">
              <ng-content />
            </div>
          </prism-tab>
        </prism-tab-group>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismDemoCardComponent {
  readonly componentType = 'demo-card';
}
