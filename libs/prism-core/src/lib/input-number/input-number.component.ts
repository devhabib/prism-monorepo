import { Component, ChangeDetectionStrategy, input, forwardRef, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismIconComponent } from '../icon/icon.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'prism-input-number',
  standalone: true,
  imports: [CommonModule, PrismIconComponent],
  template: `
    <div class="prism-input-number" [class.is-disabled]="disabled()">
      <div class="prism-input-number-input-wrap">
        <input 
          #inputRef
          type="number"
          class="prism-input-number-input"
          [value]="value()"
          [attr.min]="min() ?? null"
          [attr.max]="max() ?? null"
          [attr.step]="step()"
          [disabled]="disabled()"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
      </div>
      <div class="prism-input-number-controls">
        <button type="button" class="control-up" (click)="stepUp()" [disabled]="disabled()">
          <prism-icon name="arrow-up-s-line" />
        </button>
        <button type="button" class="control-down" (click)="stepDown()" [disabled]="disabled()">
          <prism-icon name="arrow-down-s-line" />
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismInputNumberComponent),
      multi: true
    }
  ]
})
export class PrismInputNumberComponent implements ControlValueAccessor {
  min = input<number>();
  max = input<number>();
  step = input<number>(1);
  disabled = model<boolean>(false);
  value = model<number>(0);
  
  // ControlValueAccessor methods
  private onChange: (_value: number) => void = () => {
    // Placeholder defined by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Placeholder defined by ControlValueAccessor
  };

  writeValue(value: number): void {
    this.value.set(value);
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

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let val = parseFloat(inputElement.value);

    if (isNaN(val)) {
      val = 0; // Or handle as per desired behavior for invalid input
    }

    let next = val;
    const minVal = this.min();
    const maxVal = this.max();

    if (minVal !== undefined && val < minVal) next = minVal;
    if (maxVal !== undefined && val > maxVal) next = maxVal;
    
    this.value.set(next);
    this.onChange(next);
  }

  stepUp(): void {
    if (this.disabled()) return;
    const val = this.value();
    const next = val + this.step();
    const maxVal = this.max();
    if (maxVal === undefined || next <= maxVal) {
      this.value.set(next);
    }
  }

  stepDown(): void {
    if (this.disabled()) return;
    const val = this.value();
    const next = val - this.step();
    const minVal = this.min();
    if (minVal === undefined || next >= minVal) {
      this.value.set(next);
    }
  }

  onModelChange(val: number): void {
    if (this.disabled()) return;
    let next = val;
    const minVal = this.min();
    const maxVal = this.max();
    if (minVal !== undefined && val < minVal) next = minVal;
    if (maxVal !== undefined && val > maxVal) next = maxVal;
    this.value.set(next);
  }
}
