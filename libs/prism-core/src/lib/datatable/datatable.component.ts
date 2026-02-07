import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismColumn, SortConfig } from './datatable.types';

@Component({
  selector: 'prism-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTableComponent<T> {
  // Inputs
  data = input.required<T[]>();
  columns = input.required<PrismColumn<T>[]>();

  // State
  sortConfig = signal<SortConfig<T> | null>(null);

  // Computed
  sortedData = computed(() => {
    const rawData = this.data();
    const sort = this.sortConfig();

    if (!sort) {
      return rawData;
    }

    return [...rawData].sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
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
}
