export interface PageEvent {
  page: number;      // Current page (0-indexed)
  pageSize: number;  // Items per page
  total: number;     // Total number of items
}

export type PaginationRangeItem = number | '...';
