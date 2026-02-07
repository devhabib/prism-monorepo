import { TemplateRef } from '@angular/core';

export interface PrismColumn<T> {
  key: keyof T;           // Strict type safety
  header: string;         // Display text
  sortable?: boolean;     // Optional feature flag
  cellTemplate?: TemplateRef<any>; // Custom render injection
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}
