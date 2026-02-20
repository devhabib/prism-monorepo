import { Component, ChangeDetectionStrategy, input, forwardRef, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'prism-radio-group',
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
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly name = input<string>(`prism-radio-group-${Math.random().toString(36).substring(2, 9)}`);

  readonly value = model<unknown>(null);
  readonly disabled = model<boolean>(false);

  private onChange: (value: unknown) => void = () => {
    // Registered by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Registered by ControlValueAccessor
  };

  constructor() {
    effect(() => {
      this.onChange(this.value());
    });
  }

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
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
    this.onTouched();
  }
}
