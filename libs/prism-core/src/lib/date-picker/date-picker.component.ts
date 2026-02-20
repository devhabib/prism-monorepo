import { Component, ChangeDetectionStrategy, input, model, signal, computed, effect, inject, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-date-picker',
  imports: [CommonModule, PrismIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismDatePickerComponent),
      multi: true
    }
  ],
  template: `
    <div class="prism-date-picker" [class.is-open]="isOpen()" [class.is-disabled]="disabled()">
      <div 
        class="prism-date-picker__trigger" 
        (click)="toggleDropdown()"
        (keydown.enter)="toggleDropdown()"
        tabindex="0"
        role="button"
        aria-haspopup="grid"
        [attr.aria-expanded]="isOpen()"
      >
        <span class="prism-date-picker__value" [class.is-placeholder]="!value()">
          {{ formattedDate() || placeholder() }}
        </span>
        <prism-icon name="calendar-line" class="prism-date-picker__icon" />
      </div>

      <div class="prism-date-picker__dropdown-container" [class.is-open]="isOpen()">
        <div class="prism-date-picker__dropdown">
          <!-- Calendar Header -->
          <div class="prism-date-picker__header">
            <button type="button" (click)="prevMonth($event)" aria-label="Previous month">
              <prism-icon name="arrow-left-s-line" />
            </button>
            <span class="prism-date-picker__month-year">
              {{ viewMonthName() }} {{ viewYear() }}
            </span>
            <button type="button" (click)="nextMonth($event)" aria-label="Next month">
              <prism-icon name="arrow-right-s-line" />
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="prism-date-picker__calendar">
            <div class="prism-date-picker__weekdays">
              @for (day of weekdays; track day) {
                <span>{{ day }}</span>
              }
            </div>
            <div class="prism-date-picker__days" role="grid">
              @for (day of calendarDays(); track day.date.getTime()) {
                <div 
                  class="prism-date-picker__day"
                  [class.is-other-month]="!day.isCurrentMonth"
                  [class.is-today]="day.isToday"
                  [class.is-selected]="isSelected(day.date)"
                  (click)="selectDate(day.date); $event.stopPropagation()"
                  (keydown.enter)="selectDate(day.date); $event.stopPropagation()"
                  tabindex="0"
                  role="gridcell"
                  [attr.aria-selected]="isSelected(day.date)"
                >
                  {{ day.date.getDate() }}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismDatePickerComponent implements ControlValueAccessor {
  readonly placeholder = input<string>('Select date');
  readonly disabled = model<boolean>(false);
  readonly value = model<Date | null>(null);

  readonly isOpen = signal(false);
  readonly viewDate = signal(new Date());

  protected readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  private elementRef = inject(ElementRef);
  private onChange: (value: Date | null) => void = () => {
    // Registered by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Registered by ControlValueAccessor
  };


  constructor() {
    // Reset view date when value changes
    effect(() => {
      const val = this.value();
      if (val) {
        this.viewDate.set(new Date(val));
      }
    });
  }

  readonly viewYear = computed(() => this.viewDate().getFullYear());
  readonly viewMonth = computed(() => this.viewDate().getMonth());
  readonly viewMonthName = computed(() => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.viewDate());
  });

  readonly formattedDate = computed(() => {
    const val = this.value();
    if (!val) return '';
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(val);
  });

  readonly calendarDays = computed(() => {
    const days = [];
    const date = this.viewDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Prev month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
      days.push({
        date: d,
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString()
      });
    }

    // Next month days
    const totalSlots = 42;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  });

  writeValue(value: Date | string | null): void {
    if (!value) {
      this.value.set(null);
      return;
    }
    this.value.set(new Date(value));
  }

  protected updateValue(value: Date | null): void {
    const newVal = value ? new Date(value) : null;
    this.value.set(newVal);
    this.onChange(newVal);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
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
    this.isOpen.update(v => !v);
    this.onTouched();
  }

  prevMonth(event: Event): void {
    event.stopPropagation();
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(event: Event): void {
    event.stopPropagation();
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDate(date: Date): void {
    this.updateValue(new Date(date));
    this.isOpen.set(false);
  }

  isSelected(date: Date): boolean {
    const val = this.value();
    return !!val && date.toDateString() === val.toDateString();
  }

  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}
