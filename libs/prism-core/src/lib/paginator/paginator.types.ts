export type PaginatorState = {
  page: number;      // Current page (0-indexed)
  rows: number;      // Rows per page
  totalRecords: number;
  pageCount: number; // Calculated total pages
}

export type PageEvent = {
  page: number;
  rows: number;
  first: number; // Index of first record
}
