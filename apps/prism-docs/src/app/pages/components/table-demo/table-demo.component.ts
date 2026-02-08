import { Component, signal, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismColumn, PrismTableComponent } from '@prism-monorepo/prism-core';

interface Project {
  id: number;
  name: string;
  status: 'Active' | 'Pending' | 'Archived';
  revenue: number;
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, PrismTableComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent {
  // Access the template reference for the status cell
  statusTemplate = viewChild<TemplateRef<any>>('statusCell');
  revenueTemplate = viewChild<TemplateRef<any>>('revenueCell');

  // Signals
  projects = signal<Project[]>([
    { id: 1, name: 'CareConnect', status: 'Active', revenue: 50000 },
    { id: 2, name: 'Prism Design System', status: 'Pending', revenue: 12000 },
    { id: 3, name: 'Legacy Monolith', status: 'Archived', revenue: 0 },
    { id: 4, name: 'NextGen Dashboard', status: 'Active', revenue: 75000 },
    { id: 5, name: 'Mobile App v2', status: 'Pending', revenue: 25000 },
  ]);

  tableCols: PrismColumn<Project>[] = [
    { key: 'name', header: 'Project Name', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
    { key: 'revenue', header: 'Revenue', sortable: true },
  ];

  // --- Lifecycle ---
  ngAfterViewInit() {
    this.tableCols = [
        { key: 'name', header: 'Project Name', sortable: true },
        { key: 'status', header: 'Status', sortable: true, cellTemplate: this.statusTemplate() },
        { key: 'revenue', header: 'Revenue', sortable: true, cellTemplate: this.revenueTemplate() }
    ];
  }
}
