import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { PrismColumn, SortConfig } from './datatable.types';
import { PrismPaginationComponent } from '../pagination/pagination.component';
import { PageEvent } from '../pagination/pagination.types';
import { PrismCheckboxComponent } from '../checkbox/checkbox.component';
import { PrismEmptyComponent } from '../empty/empty.component';

@Component({
  selector: 'prism-table',
  imports: [CommonModule, NgTemplateOutlet, PrismPaginationComponent, PrismCheckboxComponent, PrismEmptyComponent],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.width]': 'width()'
  }
})
export class PrismTableComponent<T> {
  // Inputs
  data = input.required<T[]>();
  columns = input.required<PrismColumn<T>[]>();
  striped = input(false);
  gridlines = input(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  width = input<string>('100%');
  
  // New Inputs
  globalFilter = input<string>('');
  paginator = input(false);
  rows = model(10);
  pageIndex = model(0);
  
  // Selection Inputs
  selectionMode = input<'single' | 'multiple' | null>(null);
  dataKey = input<string>('id');

  // State
  readonly sortConfig = signal<SortConfig<T> | null>(null);
  readonly first = computed(() => this.pageIndex() * this.rows());
  
  // Selection Model
  selection = model<T[] | T | null>(null);
  
  // Outputs
  readonly page = output<PageEvent>();

  // Computed
  filteredData = computed(() => {
    const rawData = this.data();
    const filter = this.globalFilter().toLowerCase();

    // 1. Filter
    let processed = rawData;
    if (filter) {
      processed = rawData.filter((row) => {
        // Simple check: does any column value contain the filter string?
        return Object.values(row as Record<string, unknown>).some((val) =>
          String(val).toLowerCase().includes(filter)
        );
      });
    }

    // 2. Sort
    const sort = this.sortConfig();
    if (sort) {
       processed = [...processed].sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[sort.key as string];
        const bValue = (b as Record<string, unknown>)[sort.key as string];

        if (aValue === bValue) return 0;

        const comparison = String(aValue) > String(bValue) ? 1 : -1;
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }
    
    return processed;
  });

  // Final data to display (pagination applied)
  processedData = computed(() => {
    const data = this.filteredData();
    
    if (this.paginator()) {
      const first = this.first();
      const rows = this.rows();
      return data.slice(first, first + rows);
    }
    
    return data;
  });

  // Methods
  toggleSort(key: keyof T): void {
    const currentSort = this.sortConfig();

    if (currentSort?.key === key) {
      if (currentSort.direction === 'asc') {
        this.sortConfig.set({ key, direction: 'desc' });
      } else {
        this.sortConfig.set(null);
      }
    } else {
      this.sortConfig.set({ key, direction: 'asc' });
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.page);
    this.rows.set(event.pageSize);
    this.page.emit(event);
  }

  // Selection Methods
  isSelected(row: T): boolean {
    const mode = this.selectionMode();
    const key = this.dataKey() as keyof T;
    const current = this.selection();
    
    if (!mode || !current) return false;
    
    if (mode === 'single') {
      return (current as T)[key] === row[key];
    } else {
      return Array.isArray(current) && (current as T[]).some((item: T) => item[key] === row[key]);
    }
  }

  toggleRowSelection(row: T): void {
    const mode = this.selectionMode();
    if (!mode) return;
    
    const key = this.dataKey() as keyof T;
    
    if (mode === 'single') {
      this.selection.set(row);
    } else {
      const current = Array.isArray(this.selection()) ? [...(this.selection() as T[])] : [];
      const index = current.findIndex((item: T) => item[key] === row[key]);
      
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(row);
      }
      
      this.selection.set(current as T[]);
    }
  }

  toggleSelectAll(): void {
    if (this.selectionMode() !== 'multiple') return;
    
    const allData = this.filteredData();
    const current = Array.isArray(this.selection()) ? (this.selection() as T[]) : [];
    
    if (current && current.length === allData.length) {
      this.selection.set([] as T[]);
    } else {
      this.selection.set([...allData] as T[]);
    }
  }

  isAllSelected(): boolean {
    if (this.selectionMode() !== 'multiple') return false;
    
    const allData = this.filteredData();
    const current = Array.isArray(this.selection()) ? (this.selection() as T[]) : [];
    
    return allData.length > 0 && current && current.length === allData.length;
  }
}
