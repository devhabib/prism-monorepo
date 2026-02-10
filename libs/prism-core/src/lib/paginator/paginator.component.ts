import {
  Component,
  computed,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from './paginator.types';
import { PrismButtonComponent } from '../button/button.component';

@Component({
  selector: 'prism-paginator',
  standalone: true,
  imports: [CommonModule, PrismButtonComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PrismPaginatorComponent {
  // Inputs
  totalRecords = input.required<number>();
  rows = input.required<number>();
  first = input<number>(0);
  size = input<'sm' | 'md'>('sm');

  // Outputs
  onPageChange = output<PageEvent>();

  // State
  // We track 'first' internally if we want to support controlled/uncontrolled, 
  // but usually it's better to rely on inputs. However, for a simple paginator,
  // we might want internal state or rely on the input updates. 
  // Let's assume the parent updates 'first' or we emit the event.
  // Actually, standard pattern: user clicks next -> emit event -> parent updates 'first' -> input changes.
  
  // Computed
  currentPage = computed(() => {
    return Math.floor(this.first() / this.rows());
  });

  totalPages = computed(() => {
    return Math.ceil(this.totalRecords() / this.rows());
  });

  isFirst = computed(() => this.currentPage() === 0);
  isLast = computed(() => this.currentPage() === this.totalPages() - 1);

  // Methods
  changePage(newPage: number) {
    if (newPage < 0 || newPage >= this.totalPages()) {
      return;
    }

    const newFirst = newPage * this.rows();
    
    this.onPageChange.emit({
      page: newPage,
      first: newFirst,
      rows: this.rows(),
    });
  }

  next() {
    this.changePage(this.currentPage() + 1);
  }

  prev() {
    this.changePage(this.currentPage() - 1);
  }
  
  toFirst() {
    this.changePage(0);
  }
  
  toLast() {
    this.changePage(this.totalPages() - 1);
  }
}
