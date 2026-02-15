import { Component, ChangeDetectionStrategy, input, forwardRef, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'prism-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismRadioGroupComponent),
      multi: true
    }
  ],
  template: `
    <div class="prism-radio-group" [class.is-vertical]="direction() === 'vertical'">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismRadioGroupComponent implements ControlValueAccessor {
  direction = input<'horizontal' | 'vertical'>('horizontal');
  name = input<string>(`prism-radio-group-${Math.random().toString(36).substring(2, 9)}`);

  value = model<unknown>(null);
  disabled = signal<boolean>(false);

  private onChange: (_value: unknown) => void = () => {
    // Placeholder for ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Placeholder for ControlValueAccessor
  };

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: (_value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  selectValue(value: unknown): void {
    if (this.disabled()) return;
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
