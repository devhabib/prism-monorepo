import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTableComponent, PrismColumn, PrismPaginatorComponent, PageEvent } from '@prism-monorepo/prism-core';

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
  imports: [CommonModule, PrismTableComponent],
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

  // Column Configurations
  financeCols: PrismColumn<any>[] = [
    { key: 'id', header: 'ID' },
    { key: 'merchant', header: 'Merchant' },
    { key: 'amount', header: 'Amount', sortable: true }, // Template bound in AfterViewInit
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status' }, // Re-using status cell if appropriate or define new
  ];

  employeeCols: PrismColumn<any>[] = [
    { key: 'name', header: 'Name', sortable: true, cellTemplate: undefined }, // Bind avatar template
    { key: 'role', header: 'Role', sortable: true },
    { key: 'status', header: 'Status' }, // Bind status template
    { key: 'lastLogin', header: 'Last Login' },
  ];

  inventoryCols: PrismColumn<any>[] = [
    { key: 'sku', header: 'SKU' },
    { key: 'product', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'stock', header: 'Stock', sortable: true },
    { key: 'price', header: 'Price' },
  ];

  apiCols: PrismColumn<any>[] = [
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'default', header: 'Default' },
    { key: 'description', header: 'Description' },
  ];

  @ViewChild('amountCell', { static: true }) amountTemplate!: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('nameCell', { static: true }) nameTemplate!: TemplateRef<any>;

  ngOnInit() {}

  ngAfterViewInit() {
     setTimeout(() => {
       // Bind Finance Templates
       if (this.amountTemplate) {
         this.financeCols = this.financeCols.map(c => c.key === 'amount' ? { ...c, cellTemplate: this.amountTemplate } : c);
       }
       
       // Bind Employee Templates
       if (this.nameTemplate) {
         this.employeeCols = this.employeeCols.map(c => c.key === 'name' ? { ...c, cellTemplate: this.nameTemplate } : c);
       }
       if (this.statusTemplate) {
          this.employeeCols = this.employeeCols.map(c => c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c);
          this.financeCols = this.financeCols.map(c => c.key === 'status' ? { ...c, cellTemplate: this.statusTemplate } : c);
       }
     });
  }

  onPageChange(event: PageEvent) {
    console.log('Page Changed:', event);
  }
}
