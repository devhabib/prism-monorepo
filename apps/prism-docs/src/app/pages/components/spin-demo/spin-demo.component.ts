import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSpinComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';

import { signal } from '@angular/core';

@Component({
  selector: 'app-spin-demo',
  imports: [
    CommonModule, 
    PrismSpinComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './spin-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinDemoComponent {
  isSpinning = signal(true);

  readonly snippets = {
    usage: `<prism-spin [spinning]="isSpinning()">
  <div style="padding: 30px; border: 1px solid #eee;">
    This content will be blurred when spinning is true.
  </div>
</prism-spin>`,
    sizes: `<prism-spin simple size="sm"></prism-spin>
<prism-spin simple size="md"></prism-spin>
<prism-spin simple size="lg"></prism-spin>`,
    custom: `<ng-template #customIndicator>
  <i class="ri-loader-4-line text-3xl animate-spin text-indigo-600"></i>
</ng-template>
<prism-spin [indicator]="customIndicator" [spinning]="true">
  <div class="p-8 border border-gray-100 rounded bg-white">
    Custom icon indicator.
  </div>
</prism-spin>`,
    delay: `<button (click)="isDelayedSpinning.set(!isDelayedSpinning())">Toggle Spinning (500ms Delay)</button>
<prism-spin [spinning]="isDelayedSpinning()" [delay]="500">
  <div class="p-8 border border-gray-100 rounded bg-white">
    Delayed spinner content (500ms). If the loading is fast enough, the spinner will not appear to prevent flashing.
  </div>
</prism-spin>`,
    tip: `<prism-spin tip="Loading user data..." [spinning]="true">
  <div class="p-8 border border-gray-100 rounded bg-white">
    Spinner with a custom loading message underneath.
  </div>
</prism-spin>`
  };

  isDelayedSpinning = signal(false);

  readonly apiData = [
    { name: 'spinning', description: 'Whether to show the spinner', type: 'boolean', default: 'true' },
    { name: 'simple', description: 'Whether the spin is standalone (no wrapper)', type: 'boolean', default: 'false' },
    { name: 'size', description: 'Size of the spinner', type: "'sm' | 'md' | 'lg'", default: "'md'" },
    { name: 'tip', description: 'Optional text to show below the spinner.', type: 'string', default: "''" },
    { name: 'delay', description: 'Delay in ms before showing spinner (prevents flickering for fast loads)', type: 'number', default: '0' },
    { name: 'indicator', description: 'Custom loading indicator template.', type: 'TemplateRef<any>', default: '-' }
  ];
}
