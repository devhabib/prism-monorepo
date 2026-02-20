import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTransferComponent, 
  TransferItem,
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
  selector: 'app-transfer-demo',
  imports: [
    CommonModule, 
    PrismTransferComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './transfer-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferDemoComponent {
  
  readonly basicData = signal<TransferItem[]>(
    Array.from({ length: 20 }).map((_, i) => ({
      key: i.toString(),
      label: `Content ${i + 1}`,
      disabled: i % 4 === 0
    }))
  );
  readonly basicKeys = signal<string[]>(['1', '3']);

  readonly searchData = signal<TransferItem[]>(
    Array.from({ length: 20 }).map((_, i) => ({
      key: i.toString(),
      label: `Searchable Item ${i + 1}`,
    }))
  );
  readonly searchKeys = signal<string[]>(['2', '5']);

  readonly snippets = {
    basic: `<prism-transfer \n  [dataSource]="basicData()"\n  [(targetKeys)]="basicKeys"\n/>`,
    search: `<prism-transfer \n  [dataSource]="searchData()"\n  [(targetKeys)]="searchKeys"\n  [showSearch]="true"\n/>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'dataSource', type: 'input<TransferItem[]>', default: '[]', description: 'Data options for the transfer component.' },
    { name: 'titles', type: 'input<[string, string]>', default: "['Source', 'Target']", description: 'Titles for the left and right lists.' },
    { name: 'showSearch', type: 'input<boolean>', default: 'false', description: 'Whether to show the search inputs.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the component is disabled.' },
    { name: 'targetKeys', type: 'model<string[]>', default: '[]', description: 'The keys of items in the right list.' }
  ];
}
