import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismPaginationComponent,
  PrismDemoPageHeaderComponent, 
  PrismDemoSectionComponent, 
  PrismDemoCardComponent,
  PrismCodeBlockComponent,
  ApiTableComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismSwitchComponent,
  PageEvent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismPaginationComponent,
    PrismDemoPageHeaderComponent, 
    PrismDemoSectionComponent, 
    PrismDemoCardComponent,
    PrismCodeBlockComponent,
    ApiTableComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismSwitchComponent,
  ],
  templateUrl: './pagination-demo.component.html',
  styleUrl: './pagination-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDemoComponent {
  // Demo State
  basicPageIndex = signal(0);
  changerPageIndex = signal(0);
  changerPageSize = signal(20);
  jumpPageIndex = signal(0);
  simplePageIndex = signal(0);
  isDarkMode = signal(false);

  // API Data
  apiInputs = [
    { name: 'total', type: 'number', default: '-', description: 'Total number of data items (Required)' },
    { name: 'pageIndex', type: 'model<number>', default: '0', description: 'Current page index (0-indexed)' },
    { name: 'pageSize', type: 'model<number>', default: '10', description: 'Number of items per page' },
    { name: 'showSizeChanger', type: 'boolean', default: 'false', description: 'Whether to show the size changer' },
    { name: 'pageSizeOptions', type: 'number[]', default: '[10, 20, 50, 100]', description: 'Options for the size changer' },
    { name: 'showQuickJumper', type: 'boolean', default: 'false', description: 'Whether to show the quick jumper' },
    { name: 'simple', type: 'boolean', default: 'false', description: 'Whether to use simple mode' },
    { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Size of pagination buttons' },
  ];

  apiOutputs = [
    { name: 'pageChange', type: 'PageEvent', default: '-', description: 'Emitted when page index or page size changes' },
  ];

  // Code Examples
  basicCode = `<prism-pagination [total]="50" [(pageIndex)]="pageIndex" />`;
  changerCode = `<prism-pagination 
  [total]="500" 
  [(pageIndex)]="pageIndex" 
  [(pageSize)]="pageSize"
  [showSizeChanger]="true" 
/>`;
  jumpCode = `<prism-pagination 
  [total]="500" 
  [(pageIndex)]="pageIndex" 
  [showQuickJumper]="true" 
/>`;
  simpleCode = `<prism-pagination 
  [total]="50" 
  [(pageIndex)]="pageIndex" 
  [simple]="true" 
/>`;

  onPageChange(event: PageEvent, type: string): void {
    console.warn(`Page change for ${type}:`, event);
  }
}
