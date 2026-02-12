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
    <div class="prism-tooltip-content" [class]="position()">
      {{ text() }}
    </div>
  `,
  styles: [`
    :host { position: fixed; z-index: 2000; pointer-events: none; }
    .prism-tooltip-content {
      background: rgba(0,0,0,0.85);
      color: #fff;
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 12px;
      max-width: 250px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PrismTooltipComponent {
  readonly text = input<string>('');
  readonly position = input<string>('top'); // Ensure this is a signal
}
