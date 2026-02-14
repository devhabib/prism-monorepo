import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSpinComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

import { signal } from '@angular/core';

@Component({
  selector: 'app-spin-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismSpinComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
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
    sizes: `<prism-spin size="sm"></prism-spin>
<prism-spin size="md"></prism-spin>
<prism-spin size="lg"></prism-spin>`
  };
}
