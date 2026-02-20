import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  TemplateRef, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tooltip',
  imports: [CommonModule],
  template: `
    <div class="tooltip-container" [class]="position()">
      <div class="tooltip-content">
        @if (isTemplate(content())) {
          <ng-container *ngTemplateOutlet="asTemplate(content())" />
        } @else {
          {{ content() }}
        }
      </div>
      <div class="tooltip-arrow"></div>
    </div>
  `,
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismTooltipComponent {
  readonly content = input<string | TemplateRef<unknown>>('');
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  isTemplate(val: string | TemplateRef<unknown> | null): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }

  asTemplate(val: string | TemplateRef<unknown> | null): TemplateRef<unknown> {
    return val as TemplateRef<unknown>;
  }
}
