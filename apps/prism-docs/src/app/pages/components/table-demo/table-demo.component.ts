import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTableComponent, PrismColumn, PrismPaginatorComponent, PageEvent, PrismAvatarComponent, PrismCodeBlockComponent } from '@prism-monorepo/prism-core';

interface DemoRow {
  id?: number;
  name?: string;
  role?: string;
  status: string;
  lastLogin?: string;
  // Finance
  txId?: string;
  date?: string;
  recipient?: string;
  amount?: number;
  // Inventory
  sku?: string;
  product?: string;
  category?: string;
  stock?: number;
  price?: string;
}

@Component({
  selector: 'prism-table-demo',
  standalone: true,
  imports: [CommonModule, PrismTableComponent, PrismAvatarComponent, PrismCodeBlockComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent implements OnInit, AfterViewInit {


  activeTab = signal<'examples' | 'api'>('examples');
  striped = signal(false);
  gridlines = signal(false);
  size = signal<'sm' | 'md' | 'lg'>('md');

  // Data Sources
  financeData = [
    { id: 'TX1001', date: '2023-11-01', merchant: 'AWS Service', amount: -150.00, status: 'Completed' },
    { id: 'TX1002', date: '2023-11-02', merchant: 'Client Payment', amount: 5000.00, status: 'Completed' },
    { id: 'TX1003', date: '2023-11-03', merchant: 'Office Supplies', amount: -45.50, status: 'Pending' },
    { id: 'TX1004', date: '2023-11-04', merchant: 'Consulting Fee', amount: 1200.00, status: 'Completed' },
    { id: 'TX1005', date: '2023-11-05', merchant: 'Software License', amount: -299.00, status: 'Completed' },
  ];

  employeeData = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?u=1', name: 'Alice Johnson', role: 'Admin', status: 'Active', lastLogin: '2023-10-25' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?u=2', name: 'Bob Smith', role: 'User', status: 'Inactive', lastLogin: '2023-09-15' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?u=3', name: 'Charlie Brown', role: 'Editor', status: 'Active', lastLogin: '2023-10-20' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?u=4', name: 'Diana Prince', role: 'User', status: 'Pending', lastLogin: '2023-10-26' },
    { id: 5, avatar: 'https://i.pravatar.cc/150?u=5', name: 'Evan Wright', role: 'Admin', status: 'Active', lastLogin: '2023-10-24' },
  ];

  inventoryData = Array.from({ length: 15 }, (_, i) => ({
    sku: `SKU-${1000 + i}`,
    image: `https://placehold.co/50x50?text=Product+${String.fromCharCode(65 + i)}`,
    product: `Product ${String.fromCharCode(65 + i)}`,
    category: i % 2 === 0 ? 'Electronics' : 'Home',
    stock: Math.floor(Math.random() * 100),
    price: (Math.random() * 1000).toFixed(2),
  }));

  // API Documentation Data
  apiData = [
    { name: 'data', type: 'T[]', default: '[]', description: 'Array of data to display.' },
    { name: 'columns', type: 'PrismColumn[]', default: '[]', description: 'Configuration for columns.' },
    { name: 'globalFilter', type: 'string', default: "''", description: 'Keyword to filter all columns.' },
    { name: 'paginator', type: 'boolean', default: 'false', description: 'Whether to show pagination controls.' },
    { name: 'rows', type: 'number', default: '10', description: 'Number of rows per page.' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Enables zebra-striping for rows.' },
    { name: 'gridlines', type: 'boolean', default: 'false', description: 'Displays vertical borders.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls cell padding and density.' },
  ];

  // Column Configurations (Signals for reactivity)
  financeCols = signal<PrismColumn<any>[]>([
    { key: 'id', header: 'ID' },
    { key: 'merchant', header: 'Merchant' },
    { key: 'amount', header: 'Amount', sortable: true },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status' },
  ]);

  employeeCols = signal<PrismColumn<any>[]>([
    { key: 'name', header: 'Name', sortable: true, cellTemplate: undefined },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'status', header: 'Status' },
    { key: 'lastLogin', header: 'Last Login' },
  ]);

  inventoryCols = signal<PrismColumn<any>[]>([
    { key: 'product', header: 'Product', cellTemplate: undefined },
    { key: 'sku', header: 'SKU' },
    { key: 'category', header: 'Category' },
    { key: 'stock', header: 'Stock', sortable: true },
    { key: 'price', header: 'Price' },
  ]);

  apiCols: PrismColumn<any>[] = [
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'default', header: 'Default' },
    { key: 'description', header: 'Description' },
  ];

  @ViewChild('amountCell') amountTemplate!: TemplateRef<any>;
  @ViewChild('statusCell') statusTemplate!: TemplateRef<any>;
  @ViewChild('nameCell') nameTemplate!: TemplateRef<any>;
  @ViewChild('productCell') productTemplate!: TemplateRef<any>;

  ngOnInit() {}

  ngAfterViewInit() {
     // Small delay to ensure ViewChild templates are captured
     setTimeout(() => {
       // Bind Finance Templates
       if (this.amountTemplate) {
         this.financeCols.update(cols => cols.map(c => c.key === 'amount' ? { ...c, cellTemplate: this.amountTemplate } : c));
       }
       
       // Bind Employee Templates
       if (this.nameTemplate) {
         this.employeeCols.update(cols => cols.map(c => c.key === 'name' ? { ...c, cellTemplate: this.nameTemplate } : c));
       }
       if (this.statusTemplate) {
          this.employeeCols.update(cols => cols.map(c => c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c));
          this.financeCols.update(cols => cols.map(c => c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c));
       }

       // Bind Inventory Templates
       if (this.productTemplate) {
         this.inventoryCols.update(cols => cols.map(c => c.key === 'product' ? { ...c, cellTemplate: this.productTemplate } : c));
       }
     }, 0);
  }

  onPageChange(event: PageEvent) {
    console.log('Page Changed:', event);
  }
  // Code Snippets (Synced with actual implementation)
  financeHTML = `<prism-table 
  [data]="financeData" 
  [columns]="financeCols()" 
  [striped]="striped()" 
  [gridlines]="gridlines()" 
  [size]="size()">
</prism-table>

<ng-template #amountCell let-row="row">
  <span [class]="row.amount >= 0 ? 'text-success' : 'text-danger'">
    {{ row.amount | currency }}
  </span>
</ng-template>

<ng-template #statusCell let-row="row">
  <span class="badge" [class]="row.status.toLowerCase()">
    {{ row.status }}
  </span>
</ng-template>`;

  financeTS = `financeCols = signal<PrismColumn<any>[]>([
  { key: 'id', header: 'ID' },
  { key: 'merchant', header: 'Merchant' },
  { key: 'amount', header: 'Amount', sortable: true },
  { key: 'date', header: 'Date' },
  { key: 'status', header: 'Status' },
]);

@ViewChild('amountCell') amountTemplate!: TemplateRef<any>;
@ViewChild('statusCell') statusTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  setTimeout(() => {
    if (this.amountTemplate) {
      this.financeCols.update(cols => cols.map(c => 
        c.key === 'amount' ? { ...c, cellTemplate: this.amountTemplate } : c
      ));
    }
    if (this.statusTemplate) {
      this.financeCols.update(cols => cols.map(c => 
        c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c
      ));
    }
  }, 0);
}`;

  teamHTML = `<prism-table 
  [data]="employeeData" 
  [columns]="employeeCols()" 
  [striped]="true" 
  size="lg">
</prism-table>

<ng-template #nameCell let-row="row">
  <div class="user-cell">
    <prism-avatar 
      [image]="row.avatar" 
      [label]="row.name.charAt(0)" 
      shape="circle" 
      size="md">
    </prism-avatar>
    <div class="user-info">
      <span class="font-bold block">{{ row.name }}</span>
      <span class="text-sm text-muted">{{ row.role }}</span>
    </div>
  </div>
</ng-template>

<ng-template #statusCell let-row="row">
  <span class="badge" [class]="row.status.toLowerCase()">
    {{ row.status }}
  </span>
</ng-template>`;

  teamTS = `employeeCols = signal<PrismColumn<any>[]>([
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status' },
  { key: 'lastLogin', header: 'Last Login' },
]);

@ViewChild('nameCell') nameTemplate!: TemplateRef<any>;
@ViewChild('statusCell') statusTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  setTimeout(() => {
    if (this.nameTemplate) {
      this.employeeCols.update(cols => cols.map(c => 
        c.key === 'name' ? { ...c, cellTemplate: this.nameTemplate } : c
      ));
    }
    if (this.statusTemplate) {
      this.employeeCols.update(cols => cols.map(c => 
        c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c
      ));
    }
  }, 0);
}`;

  inventoryHTML = `<prism-table 
  [data]="inventoryData" 
  [columns]="inventoryCols()" 
  [paginator]="true" 
  [rows]="5"
  (page)="onPageChange($event)">
</prism-table>

<ng-template #productCell let-row="row">
  <div class="product-info-cell">
    <img [src]="row.image" class="product-image" alt="Product Image" />
    <span class="product-name">{{ row.product }}</span>
  </div>
</ng-template>`;

  inventoryTS = `interface Product {
  sku: string;
  image: string;
  product: string;
  category: string;
  stock: number;
  price: string;
}

inventoryCols = signal<PrismColumn<any>[]>([
  { key: 'product', header: 'Product', cellTemplate: undefined },
  { key: 'sku', header: 'SKU' },
  { key: 'category', header: 'Category' },
  { key: 'stock', header: 'Stock', sortable: true },
  { key: 'price', header: 'Price' },
]);

@ViewChild('productCell') productTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  setTimeout(() => {
    if (this.productTemplate) {
      this.inventoryCols.update(cols => cols.map(c => 
        c.key === 'product' ? { ...c, cellTemplate: this.productTemplate } : c
      ));
    }
  }, 0);
}`;
}
