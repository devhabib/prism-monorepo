import { Component, ChangeDetectionStrategy, input, model, effect, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-input-number',
  imports: [CommonModule, FormsModule, PrismIconComponent],
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
         [class]="'prism-input-number--' + size()">
      <div class="prism-input-number-controls">
        <button 
          type="button" 
          class="prism-input-number-handler prism-input-number-handler-up" 
          (click)="stepUp()"
          [disabled]="disabled() || readonly() || (value() >= max())"
        >
          <prism-icon name="arrow-up-s-line" />
        </button>
        <button 
          type="button" 
          class="prism-input-number-handler prism-input-number-handler-down" 
          (click)="stepDown()"
          [disabled]="disabled() || readonly() || (value() <= min())"
        >
          <prism-icon name="arrow-down-s-line" />
        </button>
      </div>
      <div class="prism-input-number-input-wrap">
        <input
          #inputElement
          type="number"
          class="prism-input-number-input"
          [value]="value()"
          [disabled]="disabled()"
          [readOnly]="readonly()"
          [min]="min()"
          [max]="max()"
          [step]="step()"
          [placeholder]="placeholder()"
          (input)="onInput($event)"
          (blur)="onBlur()"
        />
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
  
  readonly value = model<number>(0);
  readonly disabled = model<boolean>(false);

  private onChange: (value: number) => void = () => {
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

  writeValue(value: number): void {
    const nextValue = this.clampValue(value ?? 0);
    this.value.set(nextValue);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  stepUp(): void {
    if (this.disabled() || this.readonly()) return;
    this.updateValue(this.value() + this.step());
  }

  stepDown(): void {
    if (this.disabled() || this.readonly()) return;
    this.updateValue(this.value() - this.step());
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = parseFloat(target.value);
    if (!isNaN(val)) {
      this.updateValue(val);
    }
  }

  onBlur(): void {
    this.onTouched();
    // Clamp on blur to ensure valid state
    this.updateValue(this.value());
  }

  private updateValue(val: number): void {
    const clamped = this.clampValue(val);
    this.value.set(clamped);
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
