import { Component, ChangeDetectionStrategy, input, model, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'prism-checkbox',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <label class="prism-checkbox" [class.disabled]="disabled()">
      <input
        [type]="type()"
        class="prism-checkbox__input"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="onCheckChange($event)"
        (blur)="onTouched()"
      />
      <span class="prism-checkbox__box" [class.prism-checkbox__box--radio]="type() === 'radio'">
        @if (checked()) {
          @if (type() === 'checkbox') {
            <svg class="prism-checkbox__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          } @else {
            <span class="prism-checkbox__dot"></span>
          }
        }
      </span>
      @if (label()) {
        <span class="prism-checkbox__label">{{ label() }}</span>
      } @else {
        <span class="prism-checkbox__label">
          <ng-content></ng-content>
        </span>
      }
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismCheckboxComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly type = input<'checkbox' | 'radio'>('checkbox');
  readonly disabled = model<boolean>(false);
  readonly checked = model<boolean>(false);

  private onChange: (value: boolean) => void = () => {
    // Registered by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Registered by ControlValueAccessor
  };


  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onCheckChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
    this.onChange(target.checked);
    this.onTouched();
  }
}
