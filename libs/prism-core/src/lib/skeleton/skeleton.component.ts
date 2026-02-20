import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismSkeletonVariant = 'text' | 'circle' | 'rect';

@Component({
  selector: 'prism-skeleton',
  imports: [CommonModule],
  template: `
    <div 
      class="prism-skeleton" 
      [class]="'skeleton-' + variant()"
      [class.skeleton-active]="active()"
      [style]="skeletonStyles()">
    </div>
  `,
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSkeletonComponent {
  width = input<string | number>();
  height = input<string | number>();
  variant = input<PrismSkeletonVariant>('text');
  active = input<boolean>(true);

  skeletonStyles = computed(() => {
    const w = this.width();
    const h = this.height();
    return {
      width: typeof w === 'number' ? `${w}px` : w,
      height: typeof h === 'number' ? `${h}px` : h
    };
  });
}
