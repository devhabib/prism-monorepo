import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  TemplateRef, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'prism-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-container" [class]="position()">
      <div class="tooltip-content">
        @if (isTemplate(content())) {
          <ng-container *ngTemplateOutlet="$any(content())" />
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
  readonly content = input<string | TemplateRef<any>>('');
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  isTemplate(val: any): val is TemplateRef<any> {
    return val instanceof TemplateRef;
  }
}
