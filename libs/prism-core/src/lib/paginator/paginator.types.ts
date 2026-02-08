export interface PaginatorState {
  page: number;      // Current page (0-indexed)
  rows: number;      // Rows per page
  totalRecords: number;
  pageCount: number; // Calculated total pages
}

export interface PageEvent {
  page: number;
  rows: number;
  first: number; // Index of first record
}
