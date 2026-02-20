import { Component, TemplateRef, signal, effect, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  PrismTableComponent, 
  PrismColumn, 
  PrismCodeBlockComponent, 
  PrismAvatarComponent, 
  ApiTableComponent, 
  ApiDoc,
  PrismTagComponent,
  PrismBadgeComponent,
  PrismButtonComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismDialogComponent,
  PrismCardComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@devynelogic/prism-core';

type Finance = { id: string; date: string; amount: number; status: string; }
type Employee = { id: string; name: string; role: string; status: string; avatar: string; }
type Product = { sku: string; name: string; category: string; stock: number; price: number; image: string; }

@Component({
  selector: 'prism-table-demo',
  imports: [
    CommonModule, 
    PrismTableComponent, 
    PrismCodeBlockComponent, 
    PrismAvatarComponent, 
    ReactiveFormsModule, 
    ApiTableComponent,
    PrismTagComponent,
    PrismBadgeComponent,
    PrismButtonComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismDialogComponent,
    PrismCardComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {
  // --- Templates (Using viewChild) ---
  readonly amountTemplate = viewChild<TemplateRef<Finance>>('amountCell');
  readonly nameTemplate = viewChild<TemplateRef<Employee>>('nameCell');
  readonly statusTemplate = viewChild<TemplateRef<Finance | Employee>>('statusCell');
  readonly imageTemplate = viewChild<TemplateRef<Product>>('imageCell');
  readonly actionsTemplate = viewChild<TemplateRef<Employee>>('actionsCell');

  // Dialog state
  showDetailsDialog = signal(false);
  selectedRow = signal<Employee | null>(null);

  // --- 1. Finance Data & Config ---
  financeData: Finance[] = [
    { id: 'TX-1001', date: '2023-01-15', amount: 1500.00, status: 'Completed' },
    { id: 'TX-1002', date: '2023-01-16', amount: -450.50, status: 'Refund' },
    { id: 'TX-1003', date: '2023-01-17', amount: 3200.00, status: 'Completed' },
  ];
  financeCols: PrismColumn<Finance>[] = [];

  // --- 2. Team Data & Config ---
  teamData: Employee[] = [
    { id: '1', name: 'Sarah Connor', role: 'Frontend Lead', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'John Doe', role: 'Product Designer', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Jane Smith', role: 'DevOps Engineer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=3' },
  ];
  teamCols: PrismColumn<Employee>[] = [];

  // --- 3. Inventory Data & Config ---
  inventoryData: Product[] = [
    { sku: 'LP-200', name: 'Gaming Laptop', category: 'Electronics', stock: 12, price: 1299, image: 'https://placehold.co/100x100/333/fff?text=Laptop' },
    { sku: 'KB-100', name: 'Mech Keyboard', category: 'Accessories', stock: 0, price: 149, image: 'https://placehold.co/100x100/333/fff?text=Keyboard' },
    { sku: 'MO-500', name: 'Wireless Mouse', category: 'Accessories', stock: 55, price: 89, image: 'https://placehold.co/100x100/333/fff?text=Mouse' },
    { sku: 'MN-400', name: '4K Monitor', category: 'Electronics', stock: 8, price: 499, image: 'https://placehold.co/100x100/333/fff?text=Monitor' },
    { sku: 'HP-300', name: 'Headset', category: 'Audio', stock: 20, price: 199, image: 'https://placehold.co/100x100/333/fff?text=Headset' },
  ];
  inventoryCols: PrismColumn<Product>[] = [];

  // --- 4. Selection Examples ---
  userSelectionData: Employee[] = [
    { id: '1', name: 'Alice Johnson', role: 'Engineer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { id: '2', name: 'Bob Williams', role: 'Designer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { id: '3', name: 'Charlie Brown', role: 'Manager', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=charlie' },
    { id: '4', name: 'David Smith', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=david' },
    { id: '5', name: 'Eve White', role: 'Product Owner', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=eve' },
  ];
  
  userCols: PrismColumn<Employee>[] = [];
  
  singleSelection = signal<Employee | null>(null);
  multipleSelection = signal<Employee[]>([]);

  // Empty state data
  emptyTableData = signal<Employee[]>([
    { id: '1', name: 'Temporary Data', role: 'Tester', status: 'Active', avatar: '' }
  ]);

  clearData(): void {
    this.emptyTableData.set([]);
  }

  resetData(): void {
    this.emptyTableData.set([
      { id: '1', name: 'Temporary Data', role: 'Tester', status: 'Active', avatar: '' }
    ]);
  }

  viewDetails(row: Employee): void {
    this.selectedRow.set(row);
    this.showDetailsDialog.set(true);
  }

  getStatusVariant(status: string): 'success' | 'warning' | 'error' | 'default' {
    switch (status) {
      case 'Active':
      case 'Completed':
        return 'success';
      case 'Refund':
        return 'warning';
      case 'Offline':
        return 'error';
      default:
        return 'default';
    }
  }

  constructor() {
    // Initialize columns after templates are available using effect
    effect(() => {
      const amountTpl = this.amountTemplate();
      const nameTpl = this.nameTemplate();
      const statusTpl = this.statusTemplate();
      const imageTpl = this.imageTemplate();
      const actionsTpl = this.actionsTemplate();

      if (amountTpl && statusTpl) {
        this.financeCols = [
          { key: 'id', header: 'Transaction ID' },
          { key: 'date', header: 'Date', sortable: true },
          { key: 'amount', header: 'Amount', sortable: true, cellTemplate: amountTpl },
          { key: 'status', header: 'Status', cellTemplate: statusTpl }
        ];
      }

      if (nameTpl && statusTpl && actionsTpl) {
        this.teamCols = [
          { key: 'name', header: 'Employee', cellTemplate: nameTpl },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status', cellTemplate: statusTpl },
          { key: 'actions' as keyof Employee, header: 'Actions', cellTemplate: actionsTpl }
        ];
        
        // Config for selection tables (simplified columns)
        this.userCols = [
          { key: 'name', header: 'Name' },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status', cellTemplate: statusTpl },
        ];
      }

      if (imageTpl) {
        this.inventoryCols = [
          { key: 'image', header: 'Preview', cellTemplate: imageTpl },
          { key: 'name', header: 'Product', sortable: true },
          { key: 'category', header: 'Category' },
          { key: 'stock', header: 'Stock', sortable: true },
          { key: 'price', header: 'Price', sortable: true }
        ];
      }
    });
  }

  // --- CODE SNIPPETS (For the Docs) ---
  readonly snippets = {
    financeHTML: `<prism-table [data]="financeData" [columns]="financeCols" size="sm" [gridlines]="true" [striped]="true">
</prism-table>

<ng-template #amountCell let-row="row">
  <span [class]="row.amount < 0 ? 'text-red-500' : 'text-green-600'">
    {{ row.amount | currency }}
  </span>
</ng-template>

<ng-template #statusCell let-row="row">
  <prism-badge [label]="row.status" [variant]="row.status === 'Refund' ? 'warning' : 'success'" />
</ng-template>`,

    financeTS: `// 1. Define Columns & Link Template
@ViewChild('amountCell') amountTemplate!: TemplateRef<any>;
@ViewChild('statusCell') statusTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  setTimeout(() => {
    this.financeCols = [
      { key: 'id', header: 'Transaction ID' },
      { key: 'amount', header: 'Amount', cellTemplate: this.amountTemplate },
      { key: 'status', header: 'Status', cellTemplate: this.statusTemplate }
    ];
  });
}`,

    teamHTML: `<prism-table [data]="teamData" [columns]="teamCols" size="lg">
</prism-table>

<ng-template #nameCell let-row="row">
  <div class="flex items-center gap-3">
    <prism-avatar 
      [image]="row.avatar" 
      [label]="row.name.charAt(0)" 
      shape="circle" 
      size="md">
    </prism-avatar>
    <div>
      <span class="font-bold block">{{ row.name }}</span>
    </div>
  </div>
</ng-template>`,

    teamTS: `@ViewChild('nameCell') nameTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  this.teamCols = [
    { key: 'name', header: 'Employee', cellTemplate: this.nameTemplate }
  ];
}`,

    inventoryHTML: `<prism-table [data]="inventoryData" [columns]="inventoryCols" [paginator]="true" [rows]="5">
</prism-table>

<ng-template #imageCell let-row="row">
  <img [src]="row.image" class="w-10 h-10 rounded" alt="Product" />
</ng-template>`,

    inventoryTS: `@ViewChild('imageCell') imageTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  this.inventoryCols = [
    { key: 'image', header: 'Preview', cellTemplate: this.imageTemplate },
    { key: 'name', header: 'Product', sortable: true },
    { key: 'stock', header: 'Stock', sortable: true }
  ];
}`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'data', type: 'T[]', default: '[]', description: 'Array of data to display in the table.' },
    { name: 'columns', type: 'PrismColumn<T>[]', default: '[]', description: 'Column definitions including keys, headers, and optional templates.' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Enable alternating row background colors.' },
    { name: 'gridlines', type: 'boolean', default: 'false', description: 'Show borders between cells.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the table rows and padding.' },
    { name: 'width', type: 'string', default: "'100%'", description: 'Width of the table container (e.g., "100%", "500px").' },
    { name: 'paginator', type: 'boolean', default: 'false', description: 'Enable pagination controls.' },
    { name: 'rows', type: 'number', default: '10', description: 'Number of rows per page when paginator is enabled.' },
    { name: 'selectionMode', type: "'single' | 'multiple'", default: 'null', description: 'Enable row selection.' },
    { name: 'selection', type: 'T | T[]', default: 'null', description: 'Two-way binding for selected row(s).' },
    { name: 'dataKey', type: 'string', default: 'null', description: 'Property to uniquely identify a row (required for selection).' },
  ];
}
