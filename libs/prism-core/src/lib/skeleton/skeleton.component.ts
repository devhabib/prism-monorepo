import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="prism-skeleton">Work in Progress: Skeleton</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSkeletonComponent {
  readonly placeholder = input<string>();
}
