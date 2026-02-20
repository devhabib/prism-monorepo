import { Component, ChangeDetectionStrategy, input, model, forwardRef, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-rate',
  imports: [CommonModule, PrismIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismRateComponent),
      multi: true
    }
  ],
  template: `
    <div 
      class="prism-rate" 
      [class.is-disabled]="disabled()"
      (mouseleave)="onMouseLeave()"
      role="radiogroup"
      [attr.aria-label]="'Rate ' + value()"
    >
      @for (item of stars(); track $index) {
        <div 
          class="prism-rate-star"
          [class.is-full]="isFull($index)"
          [class.is-half]="isHalf($index)"
          [class.is-active]="isActive($index)"
          (mousemove)="onMouseMove($any($event), $index)"
          (click)="onStarClick($any($event), $index)"
          (keydown.enter)="onStarKeyDown($any($event), $index)"
          (keydown.space)="onStarKeyDown($any($event), $index)"
          tabindex="0"
          role="radio"
          [attr.aria-checked]="value() > $index"
          [attr.aria-setsize]="count()"
          [attr.aria-posinset]="$index + 1"
        >
          <div class="prism-rate-star-first">
            <prism-icon [name]="icon()" />
          </div>
          <div class="prism-rate-star-second">
             <prism-icon [name]="icon()" />
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .prism-rate {
      display: inline-flex;
      gap: 4px;
      cursor: pointer;
    }
    .prism-rate-star {
      position: relative;
      display: inline-block;
      transition: all 0.2s;
      color: var(--surface-300);
      font-size: 20px;
      outline: none;
    }
    .prism-rate-star:focus-visible {
      transform: scale(1.1);
    }
    .prism-rate-star-first {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      opacity: 0;
      transition: all 0.2s;
    }
    .prism-rate-star-second {
      transition: all 0.2s;
    }
    
    .prism-rate-star.is-active, .prism-rate-star.is-full {
      color: var(--warning, #f59e0b);
    }

    .prism-rate-star.is-half .prism-rate-star-first {
      opacity: 1;
      color: var(--warning, #f59e0b);
    }

    .is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismRateComponent implements ControlValueAccessor {
  readonly count = input<number>(5);
  readonly icon = input<string>('star-fill');
  readonly allowHalf = input<boolean>(false);
  readonly disabled = model<boolean>(false);
  readonly value = model<number>(0);

  protected hoverValue = signal<number | null>(null);
  protected stars = computed(() => Array(this.count()).fill(0));

  private onChange: (value: number | null) => void = () => {
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
    this.value.set(value || 0);
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

  protected isActive(index: number): boolean {
    const current = this.hoverValue() ?? this.value();
    return current > index;
  }

  protected isFull(index: number): boolean {
    const current = this.hoverValue() ?? this.value();
    return current >= index + 1;
  }

  protected isHalf(index: number): boolean {
    const current = this.hoverValue() ?? this.value();
    return this.allowHalf() && current > index && current < index + 1;
  }

  onMouseMove(event: MouseEvent, index: number): void {
    if (this.disabled()) return;
    
    if (this.allowHalf()) {
      const target = event.currentTarget as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        const clientX = event.clientX;
        const isFirstHalf = clientX - rect.left < rect.width / 2;
        this.hoverValue.set(index + (isFirstHalf ? 0.5 : 1));
      }
    } else {
      this.hoverValue.set(index + 1);
    }
  }

  onMouseLeave(): void {
    this.hoverValue.set(null);
  }

  onStarClick(event: MouseEvent, index: number): void {
    if (this.disabled()) return;
    
    let nextValue = index + 1;
    if (this.allowHalf()) {
      const target = event.currentTarget as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        const clientX = event.clientX;
        const isFirstHalf = clientX - rect.left < rect.width / 2;
        nextValue = index + (isFirstHalf ? 0.5 : 1);
      }
    }
    
    this.value.set(nextValue);
    this.onTouched();
  }

  onStarKeyDown(event: KeyboardEvent, index: number): void {
    if (this.disabled()) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.value.set(index + 1);
      this.onTouched();
    }
  }
}
