import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTableComponent, PrismColumn, PrismPaginatorComponent, PageEvent } from '@prism-monorepo/prism-core';

interface DemoRow {
  id: number;
  name: string;
  role: string;
  status: string;
  lastLogin: string;
}

@Component({
  selector: 'prism-table-demo',
  standalone: true,
  imports: [CommonModule, PrismTableComponent, PrismPaginatorComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent implements OnInit {
  @ViewChild('statusCell', { static: true }) statusTemplate!: TemplateRef<any>;

  mockData: DemoRow[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-10-25',
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2023-09-15',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      role: 'Editor',
      status: 'Active',
      lastLogin: '2023-10-20',
    },
    {
      id: 4,
      name: 'Diana Prince',
      role: 'User',
      status: 'Pending',
      lastLogin: '2023-10-26',
    },
    {
      id: 5,
      name: 'Evan Wright',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-10-24',
    },
  ];

  cols: PrismColumn<DemoRow>[] = [];

  ngOnInit() {
    this.cols = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      { key: 'status', header: 'Status', cellTemplate: this.statusTemplate },
      { key: 'lastLogin', header: 'Last Login' },
    ];
  }

  onPageChange(event: PageEvent) {
    console.log('Page Changed:', event);
    // In a real app, we would slice the data here or fetch new data.
    // For demo purposes, we just log it.
  }
}
