import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismCascaderComponent, 
  CascaderOption,
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
  selector: 'app-cascader-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismCascaderComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './cascader-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascaderDemoComponent {
  basicValue = signal<string[]>([]);
  defaultValue = signal<string[]>(['north_america', 'usa', 'new_york']);
  hoverValue = signal<string[]>([]);

  options: CascaderOption[] = [
    {
      label: 'North America',
      value: 'north_america',
      children: [
        {
          label: 'United States',
          value: 'usa',
          children: [
            { label: 'New York', value: 'new_york' },
            { label: 'Los Angeles', value: 'la' }
          ]
        },
        {
          label: 'Canada',
          value: 'canada',
          children: [{ label: 'Toronto', value: 'toronto' }]
        }
      ]
    },
    {
      label: 'Europe',
      value: 'europe',
      disabled: true,
      children: [
        {
          label: 'Germany',
          value: 'germany',
          children: [{ label: 'Berlin', value: 'berlin' }]
        }
      ]
    }
  ];

  readonly snippets = {
    basic: `<prism-cascader [(value)]="basicValue" [options]="options" />`,
    default: `<prism-cascader [(value)]="defaultValue" [options]="options" />`,
    hover: `<prism-cascader 
  [(value)]="hoverValue" 
  [options]="options" 
  expandTrigger="hover" />`,
    disabled: `<prism-cascader [options]="options" [disabled]="true" />`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'options', type: 'input<CascaderOption[]>', default: '[]', description: 'The data options.' },
    { name: 'value', type: 'model<string[]>', default: '[]', description: 'Selected value array.' },
    { name: 'placeholder', type: 'input<string>', default: "'Please select'", description: 'Trigger placeholder.' },
    { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Whether the component is disabled.' },
    { name: 'expandTrigger', type: "'click' | 'hover'", default: "'click'", description: 'How sub-menus expand.' },
    { name: 'changeOnSelect', type: 'input<boolean>', default: 'false', description: 'Whether to select parent nodes.' },
    { name: 'selectionChange', type: 'output<CascaderOption[]>', default: '-', description: 'Emitted when selection changes.' }
  ];
}
