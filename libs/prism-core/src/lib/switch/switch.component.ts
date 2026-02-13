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
  
  readonly checkedChildren = input<string | TemplateRef<unknown> | null>(null);
  readonly unCheckedChildren = input<string | TemplateRef<unknown> | null>(null);

  toggle(): void {
    if (!this.disabled() && !this.loading()) {
      this.checked.update(v => !v);
    }
  }

  isTemplate(val: string | TemplateRef<unknown> | null): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }

  asTemplate(val: string | TemplateRef<unknown> | null): TemplateRef<unknown> {
    return val as TemplateRef<unknown>;
  }
}
