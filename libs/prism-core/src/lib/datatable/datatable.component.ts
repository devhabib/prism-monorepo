import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismColumn, SortConfig } from './datatable.types';
import { PrismPaginatorComponent } from '../paginator/paginator.component';
import { PageEvent } from '../paginator/paginator.types';

@Component({
  selector: 'prism-table',
  standalone: true,
  imports: [CommonModule, PrismPaginatorComponent],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTableComponent<T> {
  // Inputs
  data = input.required<T[]>();
  columns = input.required<PrismColumn<T>[]>();
  striped = input(false);
  gridlines = input(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  
  // New Inputs
  globalFilter = input<string>('');
  paginator = input(false);
  rows = input(10);

  // State
  sortConfig = signal<SortConfig<T> | null>(null);
  first = signal(0); // Pagination state
  
  // Outputs
  @Output() page = new EventEmitter<PageEvent>();

  // Computed
  filteredData = computed(() => {
    const rawData = this.data();
    const filter = this.globalFilter().toLowerCase();

    // 1. Filter
    let processed = rawData;
    if (filter) {
      processed = rawData.filter((row) => {
        // Simple check: does any column value contain the filter string?
        return Object.values(row as any).some((val) =>
          String(val).toLowerCase().includes(filter)
        );
      });
    }

    // 2. Sort
    const sort = this.sortConfig();
    if (sort) {
       processed = [...processed].sort((a, b) => {
        const aValue = a[sort.key];
        const bValue = b[sort.key];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
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
  toggleSort(key: keyof T) {
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

  onPageChange(event: PageEvent) {
    this.first.set(event.first);
    this.page.emit(event);
  }
}
