import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismSelectComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-select-demo',
  imports: [
    CommonModule, 
    FormsModule,
    PrismSelectComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './select-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoComponent {
  singleValue = signal('apple');
  multiValue = signal(['apple', 'banana']);

  options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Dragonfruit', value: 'dragonfruit' },
    { label: 'Elderberry', value: 'elderberry' }
  ];

  readonly snippets = {
    usage: `<prism-select [options]="options" [(value)]="singleValue" label="Fruit" />`,
    multiple: `<prism-select [options]="options" [multiple]="true" [(value)]="multiValue" label="Fruits" />`,
    searchable: `<prism-select [options]="options" [searchable]="true" label="Search Fruit" />`
  };
}
