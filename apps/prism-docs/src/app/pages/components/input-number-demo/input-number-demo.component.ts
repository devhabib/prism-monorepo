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
  PrismTabComponent,
  PrismSpaceComponent,
  ApiTableComponent,
  ApiDoc
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
    PrismTabComponent,
    PrismSpaceComponent,
    ApiTableComponent
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

  readonly apiData: ApiDoc[] = [
    { name: 'value', type: 'model<number | null>', default: 'null', description: 'Two-way bound numeric value.' },
    { name: 'min', type: 'input<number>', default: '-Infinity', description: 'Minimum allowed value.' },
    { name: 'max', type: 'input<number>', default: 'Infinity', description: 'Maximum allowed value.' },
    { name: 'step', type: 'input<number>', default: '1', description: 'Step size for increment/decrement.' },
    { name: 'precision', type: 'input<number | null>', default: 'null', description: 'Number of decimal places.' },
    { name: 'placeholder', type: 'input<string>', default: "''", description: 'Placeholder text.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the input is disabled.' },
    { name: 'readonly', type: 'input<boolean>', default: 'false', description: 'Whether the input is read-only.' },
    { name: 'size', type: "input<'sm' | 'md' | 'lg'>", default: "'md'", description: 'Size of the input.' }
  ];
}
