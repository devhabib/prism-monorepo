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
    '(click)': 'toggle()'
  }
})
export class PrismSwitchComponent {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  
  readonly checkedChildren = input<string | TemplateRef<any> | null>(null);
  readonly unCheckedChildren = input<string | TemplateRef<any> | null>(null);

  toggle() {
    if (!this.disabled() && !this.loading()) {
      this.checked.update(v => !v);
    }
  }

  isTemplate(val: any): val is TemplateRef<any> {
    return val instanceof TemplateRef;
  }
}
