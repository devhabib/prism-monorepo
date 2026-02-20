import {
  Component,
  ChangeDetectionStrategy,
  input,
  model,
  signal,
  computed,
  effect,
  inject,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-time-picker',
  imports: [CommonModule, PrismIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismTimePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class PrismTimePickerComponent implements ControlValueAccessor {
  readonly placeholder = input<string>('Select time');
  readonly format = input<'HH:mm' | 'HH:mm:ss' | 'hh:mm a'>('HH:mm');
  readonly disabled = model<boolean>(false);
  readonly use12Hour = input<boolean>(false);

  // Storing value as "HH:mm:ss" string internally
  readonly value = model<string | null>(null);

  readonly isOpen = signal(false);

  readonly selectedHour = signal<number | null>(null);
  readonly selectedMinute = signal<number | null>(null);
  readonly selectedSecond = signal<number | null>(null);
  readonly selectedAmPm = signal<'AM' | 'PM'>('AM');

  private elementRef = inject(ElementRef);
  private onChange: (value: string | null) => void = () => undefined;
  onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      const val = this.value();
      if (val) {
        const parts = val.split(':');
        if (parts.length >= 2) {
          let h = parseInt(parts[0], 10);
          this.selectedMinute.set(parseInt(parts[1], 10));
          if (parts.length === 3) {
            this.selectedSecond.set(parseInt(parts[2], 10));
          } else {
            this.selectedSecond.set(0);
          }
          if (this.use12Hour()) {
            this.selectedAmPm.set(h >= 12 ? 'PM' : 'AM');
            h = h % 12 || 12;
          }
          this.selectedHour.set(h);
        }
      } else {
        this.selectedHour.set(null);
        this.selectedMinute.set(null);
        this.selectedSecond.set(null);
      }
    });

    effect(() => {
      // Sync internal state to value whenever selections change
      const h = this.selectedHour();
      const m = this.selectedMinute();
      const s = this.selectedSecond();
      const ampm = this.selectedAmPm();

      if (h !== null && m !== null) {
        let hour24 = h;
        if (this.use12Hour()) {
          if (ampm === 'PM' && h < 12) hour24 += 12;
          if (ampm === 'AM' && h === 12) hour24 = 0;
        }

        const showSeconds = this.format() === 'HH:mm:ss';
        const formatted = `${this.pad(hour24)}:${this.pad(m)}${showSeconds ? ':' + this.pad(s || 0) : ''}`;

        // Only trigger update if different to avoid cycle
        if (this.value() !== formatted) {
          this.updateValue(formatted);
        }
      }
    });
  }

  readonly hours = computed(() => {
    return Array.from({ length: this.use12Hour() ? 12 : 24 }, (_, i) =>
      this.use12Hour() ? i + 1 : i,
    );
  });

  readonly minutes = computed(() => Array.from({ length: 60 }, (_, i) => i));
  readonly seconds = computed(() => Array.from({ length: 60 }, (_, i) => i));

  readonly formattedTime = computed(() => {
    const val = this.value();
    if (!val) return '';
    const parts = val.split(':');
    let h = parseInt(parts[0], 10);
    const m = parts[1];

    if (this.format() === 'hh:mm a') {
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${this.pad(h)}:${m} ${ampm}`;
    }

    if (this.format() === 'HH:mm:ss') {
      return val;
    }

    return `${this.pad(h)}:${m}`;
  });

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  protected updateValue(value: string | null): void {
    this.value.set(value);
    this.onChange(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
    this.onTouched();

    if (this.isOpen() && this.selectedHour() === null) {
      // Default selections if opening clean
      this.selectedHour.set(this.use12Hour() ? 12 : 0);
      this.selectedMinute.set(0);
      this.selectedSecond.set(0);
    }
  }

  onDocumentClick(event: Event): void {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isOpen()
    ) {
      this.isOpen.set(false);
    }
  }

  selectHour(h: number): void {
    this.selectedHour.set(h);
  }
  selectMinute(m: number): void {
    this.selectedMinute.set(m);
  }
  selectSecond(s: number): void {
    this.selectedSecond.set(s);
  }
  selectAmPm(ampm: 'AM' | 'PM'): void {
    this.selectedAmPm.set(ampm);
  }

  onKeydown(event: KeyboardEvent, type: 'hour' | 'minute' | 'second' | 'ampm'): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const dir = event.key === 'ArrowUp' ? -1 : 1;

      if (type === 'hour') {
        const val = this.selectedHour() ?? (this.use12Hour() ? 12 : 0);
        const max = this.use12Hour() ? 12 : 23;
        const min = this.use12Hour() ? 1 : 0;
        let next = val + dir;
        if (next > max) next = min;
        if (next < min) next = max;
        this.selectHour(next);
      } else if (type === 'minute') {
        const val = this.selectedMinute() ?? 0;
        let next = val + dir;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        this.selectMinute(next);
      } else if (type === 'second') {
        const val = this.selectedSecond() ?? 0;
        let next = val + dir;
        if (next > 59) next = 0;
        if (next < 0) next = 59;
        this.selectSecond(next);
      } else if (type === 'ampm') {
        this.selectAmPm(this.selectedAmPm() === 'AM' ? 'PM' : 'AM');
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.isOpen.set(false);
    }
  }
}
