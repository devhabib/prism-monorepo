import {
  Component,
  computed,
  input,
  model,
  signal,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismButtonComponent } from '../button/button.component';
import { PrismIconComponent } from '../icon/icon.component';
import { PrismSelectComponent } from '../select/select.component';
import { PageEvent, PaginationRangeItem } from './pagination.types';

@Component({
  selector: 'prism-pagination',
  imports: [CommonModule, FormsModule, PrismButtonComponent, PrismIconComponent, PrismSelectComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismPaginationComponent {
  /** Total number of data items */
  total = input<number>(0);

  /** Current page index (0-indexed) */
  pageIndex = model<number>(0);

  /** Number of items per page */
  pageSize = model<number>(10);

  /** Whether to show the size changer */
  showSizeChanger = input<boolean>(false);

  /** Options for the size changer */
  pageSizeOptions = input<number[]>([10, 20, 50, 100]);

  /** Whether to show the quick jumper */
  showQuickJumper = input<boolean>(false);

  /** Whether to use simple mode */
  simple = input<boolean>(false);

  /** Size of buttons ('sm' | 'md') */
  size = input<'sm' | 'md'>('sm');

  /** Event emitted when page index or page size changes */
  pageChange = output<PageEvent>();

  /** Calculated total pages */
  totalPages = computed(() => {
    const total = this.total();
    const pageSize = this.pageSize();
    if (total === 0) return 1;
    return Math.max(1, Math.ceil(total / pageSize));
  });

  /** Current items per page options for the select component */
  sizeOptions = computed(() => 
    this.pageSizeOptions().map(size => ({ label: `${size} / page`, value: size }))
  );

  /** Internal jump page index for the quick jumper */
  jumpPageIndex = signal('');

  /** Calculation for the pagination range (numbers and ellipses) */
  range = computed<PaginationRangeItem[]>(() => {
    const total = this.totalPages();
    const current = this.pageIndex() + 1; // 1-indexed for logic
    const delta = 2; // Pages to show before and after current
    
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range: PaginationRangeItem[] = [];
    const left = current - delta;
    const right = current + delta;
    const showLeftEllipsis = left > 2;
    const showRightEllipsis = right < total - 1;

    range.push(1);

    if (showLeftEllipsis) {
      range.push('...');
      for (let i = left; i <= Math.min(right, total - 1); i++) {
        range.push(i);
      }
    } else {
      for (let i = 2; i <= Math.min(right, total - 1); i++) {
        range.push(i);
      }
    }

    if (showRightEllipsis) {
      range.push('...');
      range.push(total);
    } else if (range[range.length - 1] !== total) {
      for (let i = (range[range.length - 1] as number) + 1; i <= total; i++) {
        range.push(i);
      }
    }

    return range;
  });

  castToNumber(val: PaginationRangeItem): number {
    return val as number;
  }

  handlePageChange(newIndex: number): void {
    if (newIndex < 0 || newIndex >= this.totalPages() || newIndex === this.pageIndex()) {
      return;
    }

    this.pageIndex.set(newIndex);
    this.emitChange();
  }

  handleSizeChange(newSize: number): void {
    if (newSize === this.pageSize()) return;

    this.pageSize.set(newSize);
    
    // Reset to first page if current index is out of bounds with new size
    if (this.pageIndex() >= this.totalPages()) {
      this.pageIndex.set(this.totalPages() - 1);
    }
    
    this.emitChange();
  }

  handleJump(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const pageNum = parseInt(value, 10);
    
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= this.totalPages()) {
      this.handlePageChange(pageNum - 1);
    }
    this.jumpPageIndex.set('');
  }

  onJumpInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.jumpPageIndex.set(target.value);
  }

  private emitChange(): void {
    this.pageChange.emit({
      page: this.pageIndex(),
      pageSize: this.pageSize(),
      total: this.total(),
    });
  }
}
