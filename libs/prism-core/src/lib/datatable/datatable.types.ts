import { TemplateRef } from '@angular/core';

export type PrismColumn<T> = {
  key: keyof T;           // Strict type safety
  header: string;         // Display text
  sortable?: boolean;     // Optional feature flag
  cellTemplate?: TemplateRef<unknown>; // Custom render injection
}

export type SortDirection = 'asc' | 'desc' | null;

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
}
