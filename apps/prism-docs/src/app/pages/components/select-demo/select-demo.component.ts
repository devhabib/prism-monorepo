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
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
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
    PrismTabComponent,
    ApiTableComponent
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

  readonly apiData: ApiDoc[] = [
    { name: 'options', type: 'input<SelectOption[]>', default: '[]', description: 'Array of data options.' },
    { name: 'placeholder', type: 'input<string>', default: "'Select...'", description: 'Placeholder for the select input.' },
    { name: 'searchable', type: 'input<boolean>', default: 'false', description: 'Whether the select is searchable.' },
    { name: 'multiple', type: 'input<boolean>', default: 'false', description: 'Allow multiple selection.' },
    { name: 'allowClear', type: 'input<boolean>', default: 'false', description: 'Show clear button icon.' },
    { name: 'size', type: "input<'sm' | 'md' | 'lg'>", default: "'md'", description: 'Size of the component.' },
    { name: 'maxHeight', type: 'input<string>', default: "'300px'", description: 'Maximum height of the dropdown.' },
    { name: 'value', type: 'model<unknown>', default: 'null', description: 'Two-way bound selected value(s).' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the select is disabled.' }
  ];
}
