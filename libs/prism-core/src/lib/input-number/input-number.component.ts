import { Component, ChangeDetectionStrategy, input, model, forwardRef, viewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-input-number',
  imports: [CommonModule, PrismIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismInputNumberComponent),
      multi: true
    }
  ],
  template: `
    <div class="prism-input-number" 
         [class.prism-input-number--disabled]="disabled()"
         [class.prism-input-number--readonly]="readonly()"
         [class.prism-input-number--focused]="isFocused"
         [class]="'prism-input-number--' + size()">
      <div class="prism-input-number-input-wrap">
        <input
          #inputElement
          [type]="inputType"
          inputmode="decimal"
          class="prism-input-number-input"
          [value]="displayValue"
          [disabled]="disabled()"
          [readOnly]="readonly()"
          [placeholder]="placeholder()"
          [attr.step]="step()"
          [attr.min]="min()"
          [attr.max]="max()"
          (input)="onInput($event)"
          (keydown)="onKeyDown($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />
      </div>
      <div class="prism-input-number-handlers">
        <span 
          class="prism-input-number-handler prism-input-number-handler-up" 
          [class.prism-input-number-handler-disabled]="disabled() || readonly() || ((value() ?? 0) >= max())"
          (mousedown)="onHandlerMouseDown($event, 'up')"
          role="button"
          aria-label="Increase Value"
        >
          <prism-icon name="arrow-up-s-line" [size]="12" />
        </span>
        <span 
          class="prism-input-number-handler prism-input-number-handler-down" 
          [class.prism-input-number-handler-disabled]="disabled() || readonly() || ((value() ?? 0) <= min())"
          (mousedown)="onHandlerMouseDown($event, 'down')"
          role="button"
          aria-label="Decrease Value"
        >
          <prism-icon name="arrow-down-s-line" [size]="12" />
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismInputNumberComponent implements ControlValueAccessor {
  readonly min = input<number>(-Infinity);
  readonly max = input<number>(Infinity);
  readonly step = input<number>(1);
  readonly precision = input<number | null>(null);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly readonly = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly decimalMode = input<boolean>(false);
  
  readonly formatter = input<(value: number | string) => string>((val) => val.toString());
  readonly parser = input<(value: string) => number | string>((val) => val.replace(/[^\d.-]/g, ''));

  readonly value = model<number | null>(null);
  readonly disabled = model<boolean>(false);

  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');
  protected isFocused = false;

  private onChange: (value: number | null) => void = () => {
    // Initial placeholder
  };
  onTouched: () => void = () => {
    // Initial placeholder
  };

  constructor() {
    // Sync input element whenever displayValue changes
    effect(() => {
      const input = this.inputElement()?.nativeElement;
      if (input && !this.isFocused) {
        input.value = this.displayValue;
      }
    });
  }

  get displayValue(): string {
    const val = this.value();
    if (val === null || val === undefined) return '';
    
    // If we have precision, ensure the value is formatted with decimals before formatter
    let num = val;
    const precision = this.precision();
    if (precision !== null) {
      num = parseFloat(val.toFixed(precision));
    }
    
    return this.formatter()(num);
  }

  get inputType(): string {
    if (this.decimalMode() || this.isCustomFormatter()) {
      return 'text';
    }
    return 'number';
  }

  private isCustomFormatter(): boolean {
    const formatterFn = this.formatter();
    return formatterFn(100).toString() !== '100';
  }

  writeValue(value: number | null): void {
    const nextValue = value !== null ? this.clampValue(value) : null;
    this.value.set(nextValue);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.stepUp();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.stepDown();
    }

    // If type="text" or decimal mode, strictly block non-numeric keys (except control keys)
    if (this.inputType === 'text') {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
      // Only allow decimal/minus if NOT in decimalMode (which shifts decimals automatically)
      if (!this.decimalMode()) {
        allowedKeys.push('.', '-', 'Subtract');
      }
      
      const isNumber = /^[0-9]$/.test(event.key);
      const isControl = event.ctrlKey || event.metaKey || allowedKeys.includes(event.key);
      
      if (!isNumber && !isControl) {
        event.preventDefault();
      }
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;

    if (this.decimalMode()) {
      const digitsOnly = rawValue.replace(/\D/g, '');
      if (digitsOnly === '') {
        this.updateValue(null);
        input.value = ''; // Ensure field is empty if no digits found
        return;
      }
      
      const precision = this.precision() ?? 2;
      const num = parseInt(digitsOnly, 10) / Math.pow(10, precision);
      
      if (num > this.max()) {
        input.value = this.displayValue;
        return;
      }
      
      this.updateValue(num);
      input.value = this.displayValue;
      return;
    }

    const parsedValue = this.parser()(rawValue);
    const numValue = typeof parsedValue === 'number' ? parsedValue : parseFloat(parsedValue);

    if (!isNaN(numValue)) {
      if (numValue > this.max()) {
        input.value = this.displayValue;
        return;
      }
      this.updateValue(numValue);
    } else if (rawValue === '' || rawValue === '-') {
      this.updateValue(null);
    } else {
      input.value = this.displayValue;
    }
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    if (this.value() !== null) {
      this.updateValue(this.value());
    }
    // Force format on blur
    const inputChild = this.inputElement();
    if (inputChild) {
      inputChild.nativeElement.value = this.displayValue;
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onHandlerMouseDown(event: MouseEvent, type: 'up' | 'down'): void {
    event.preventDefault(); // Prevent focus loss
    if (this.disabled() || this.readonly()) return;
    
    if (type === 'up') {
      this.stepUp();
    } else {
      this.stepDown();
    }
  }

  stepUp(): void {
    if (this.disabled() || this.readonly()) return;
    const current = this.value() ?? 0;
    this.updateValue(current + this.step());
  }

  stepDown(): void {
    if (this.disabled() || this.readonly()) return;
    const current = this.value() ?? 0;
    this.updateValue(current - this.step());
  }

  private updateValue(val: number | null): void {
    const nextValue = val !== null ? this.clampValue(val) : null;
    this.value.set(nextValue);
    this.onChange(nextValue);
    
    // Sync input element value immediately for formatting
    const input = this.inputElement()?.nativeElement;
    if (input && !this.isFocused) {
      input.value = this.displayValue;
    }
  }

  private clampValue(val: number): number {
    let clamped = Math.min(this.max(), Math.max(this.min(), val));
    
    const precision = this.precision();
    if (precision !== null) {
      clamped = parseFloat(clamped.toFixed(precision));
    }
    
    return clamped;
  }
}
