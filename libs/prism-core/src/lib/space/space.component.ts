import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PrismSpaceDirection = 'horizontal' | 'vertical';
export type PrismSpaceAlign = 'start' | 'end' | 'center' | 'baseline';

@Component({
  selector: 'prism-space',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-space" 
      [class]="'space-' + direction()"
      [style]="spaceStyles()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpaceComponent {
  direction = input<PrismSpaceDirection>('horizontal');
  gap = input<string | number>('8px');
  align = input<PrismSpaceAlign>();

  spaceStyles = computed(() => {
    const g = this.gap();
    const gapValue = typeof g === 'number' ? `${g}px` : g;
    
    return {
      gap: gapValue,
      'align-items': this.align() || (this.direction() === 'horizontal' ? 'center' : 'stretch')
    };
  });
}
