import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismInputNumberComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-input-number-demo',
  imports: [
    CommonModule, 
    FormsModule,
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
    usage: `<prism-input-number [(value)]="quantity" [min]="1" [max]="10" />`,
    precision: `<prism-input-number [precision]="2" [step]="0.1" [value]="10.55" />`,
    sizes: `
<prism-input-number size="sm" [value]="1" />
<prism-input-number size="md" [value]="1" />
<prism-input-number size="lg" [value]="1" />`
  };
}
