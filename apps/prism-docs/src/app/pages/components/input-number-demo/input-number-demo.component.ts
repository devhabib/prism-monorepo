import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismInputNumberComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

import { signal } from '@angular/core';

@Component({
  selector: 'app-input-number-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismInputNumberComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './input-number-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberDemoComponent {
  quantity = signal(1);

  readonly snippets = {
    usage: `<prism-input-number [(value)]="quantity" [min]="1" [max]="10"></prism-input-number>
<p>Selected Quantity: {{ quantity() }}</p>`,
    disabled: `<prism-input-number [disabled]="true" [value]="5"></prism-input-number>`
  };
}
