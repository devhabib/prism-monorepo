import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  TemplateRef,
  Directive,
  contentChildren,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[prismSpaceItem]',
  standalone: true,
})
export class PrismSpaceItemDirective {
  public templateRef = inject(TemplateRef<unknown>);
}

export type PrismSpaceSize = 'small' | 'middle' | 'large' | number;
export type PrismSpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

@Component({
  selector: 'prism-space',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="prism-space"
      [class.prism-space-vertical]="direction() === 'vertical'"
      [class.prism-space-horizontal]="direction() === 'horizontal'"
      [class.prism-space-wrap]="wrap()"
      [style.gap]="gapValue()"
      [style.align-items]="mergedAlign()"
    >
      @if (items().length > 0) {
        @for (item of items(); track $index) {
          <div class="prism-space-item">
            <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
          </div>
          @if (split() && !$last) {
            <span class="prism-space-split">
              <ng-container [ngTemplateOutlet]="split()!"></ng-container>
            </span>
          }
        }
      } @else {
        <ng-content></ng-content>
      }
    </div>
  `,
  styleUrl: './space.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSpaceComponent {
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly size = input<PrismSpaceSize>('small');
  readonly wrap = input<boolean>(false);
  readonly align = input<PrismSpaceAlign>();
  readonly split = input<TemplateRef<unknown> | null>(null);

  readonly items = contentChildren(PrismSpaceItemDirective);

  readonly mergedAlign = computed(() => {
    const align = this.align();
    if (align) return align;
    if (this.direction() === 'horizontal') return 'center';
    return undefined;
  });

  readonly gapValue = computed(() => {
    const s = this.size();
    if (typeof s === 'number') {
      return `${s}px`;
    }
    switch (s) {
      case 'small':
        return '8px';
      case 'middle':
        return '16px';
      case 'large':
        return '24px';
      default:
        return '8px';
    }
  });
}
