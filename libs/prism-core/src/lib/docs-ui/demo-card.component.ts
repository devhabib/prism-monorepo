import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTabGroupComponent } from '../tabs/tab-group.component';
import { PrismTabComponent } from '../tabs/tab.component';

@Component({
  selector: 'prism-demo-card',
  standalone: true,
  imports: [CommonModule, PrismTabGroupComponent, PrismTabComponent],
  template: `
    <div class="border border-surface-200 dark:border-surface-700 rounded-xl bg-surface-0 dark:bg-surface-800">
      <div class="border-b border-surface-200 dark:border-surface-700 p-4 bg-surface-50 dark:bg-surface-900/50">
        <prism-tab-group variant="pill">
          <prism-tab label="Preview">
            <!-- Preview Container -->
             <div class="p-8 bg-surface-50 dark:bg-surface-900/30 rounded-lg border border-dashed border-surface-200 dark:border-surface-700 mt-4">
               <ng-content select="[preview]" />
             </div>
          </prism-tab>
          <prism-tab label="Code">
             <div class="mt-4">
               <ng-content select="[code]" />
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
