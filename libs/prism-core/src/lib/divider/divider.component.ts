import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="classes()" 
      role="separator"
    >
      <span class="prism-divider-inner-text" #text>
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styleUrl: './divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismDividerComponent {
  readonly type = input<'horizontal' | 'vertical'>('horizontal');
  readonly orientation = input<'left' | 'right' | 'center'>('center');
  readonly dashed = input<boolean>(false);

  readonly classes = computed(() => ({
    'prism-divider': true,
    'prism-divider-horizontal': this.type() === 'horizontal',
    'prism-divider-vertical': this.type() === 'vertical',
    'prism-divider-dashed': this.dashed(),
    'prism-divider-with-text': this.type() === 'horizontal', // We'll simplify this check
    [`prism-divider-with-text-${this.orientation()}`]: this.type() === 'horizontal',
  }));
}
