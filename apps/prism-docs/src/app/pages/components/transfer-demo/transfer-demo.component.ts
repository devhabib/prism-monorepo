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
  PrismTabComponent
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
    PrismTabComponent
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
}
