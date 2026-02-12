import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  model, 
  ViewEncapsulation, 
  TemplateRef 
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-switch-wrapper',
    '[class.disabled]': 'disabled()',
    '(click)': 'toggle()'
  }
})
export class PrismSwitchComponent {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly size = input<'default' | 'small'>('default');
  
  // Inputs can be string OR template
  readonly checkedChildren = input<string | TemplateRef<void> | null>(null);
  readonly unCheckedChildren = input<string | TemplateRef<void> | null>(null);

  toggle() {
    if (!this.disabled() && !this.loading()) {
      this.checked.update(v => !v);
    }
  }

  isTemplate(val: any): val is TemplateRef<any> {
    return val instanceof TemplateRef;
  }
}
