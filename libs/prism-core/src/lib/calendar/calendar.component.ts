import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  model,
  signal,
  computed,
  output,
  contentChild,
  TemplateRef,
  effect,
} from '@angular/core';
import { NgTemplateOutlet, CommonModule } from '@angular/common';

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
};

export type CalendarMonth = {
  index: number;
  label: string;
  shortLabel: string;
  isCurrent: boolean;
};

export type CalendarMode = 'month' | 'year';

@Component({
  selector: 'prism-calendar',
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <div class="prism-calendar__inner">
      <!-- Header -->
      <div class="prism-calendar__header">
        <div class="prism-calendar__header-left">
          @if (mode() === 'month') {
            <button type="button" class="prism-calendar__nav-btn" (click)="prevYear()" aria-label="Previous year">
              «
            </button>
            <button type="button" class="prism-calendar__nav-btn" (click)="prevMonth()" aria-label="Previous month">
              ‹
            </button>
          } @else {
            <button type="button" class="prism-calendar__nav-btn" (click)="prevYear()" aria-label="Previous year">
              «
            </button>
          }
        </div>

        <button type="button" class="prism-calendar__title-btn" (click)="toggleMode()">
          @if (mode() === 'month') {
            {{ viewMonthName() }} {{ viewYear() }}
          } @else {
            {{ viewYear() }}
          }
        </button>

        <div class="prism-calendar__header-right">
          @if (mode() === 'month') {
            <button type="button" class="prism-calendar__nav-btn" (click)="nextMonth()" aria-label="Next month">
              ›
            </button>
            <button type="button" class="prism-calendar__nav-btn" (click)="nextYear()" aria-label="Next year">
              »
            </button>
          } @else {
            <button type="button" class="prism-calendar__nav-btn" (click)="nextYear()" aria-label="Next year">
              »
            </button>
          }
        </div>
      </div>

      <!-- Month View -->
      @if (mode() === 'month') {
        <div class="prism-calendar__body">
          <div class="prism-calendar__weekdays">
            @for (day of weekdaysShort; track day; let i = $index) {
              <span class="prism-calendar__weekday" [attr.data-mini]="weekdaysMini[i]">{{ day }}</span>
            }
          </div>
          <div class="prism-calendar__days" role="grid">
            @for (day of calendarDays(); track day.date.getTime()) {
              <div
                class="prism-calendar__day"
                [class.is-other-month]="!day.isCurrentMonth"
                [class.is-today]="day.isToday"
                [class.is-selected]="isSelected(day.date)"
                [class.is-disabled]="day.isDisabled"
                (click)="selectDate(day.date)"
                (keydown.enter)="selectDate(day.date)"
                tabindex="0"
                role="gridcell"
                [attr.aria-selected]="isSelected(day.date)"
                [attr.aria-disabled]="day.isDisabled"
              >
                <span class="prism-calendar__day-number">{{ day.date.getDate() }}</span>
                @if (dateCellTpl()) {
                  <div class="prism-calendar__day-content">
                    <ng-container
                      [ngTemplateOutlet]="dateCellTpl()!"
                      [ngTemplateOutletContext]="{ $implicit: day.date }"
                    />
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }

      <!-- Year View (Month Picker) -->
      @if (mode() === 'year') {
        <div class="prism-calendar__months" role="grid">
          @for (m of monthsGrid(); track m.index) {
            <div
              class="prism-calendar__month-cell"
              [class.is-current]="m.isCurrent"
              [class.is-selected]="isSelectedMonth(m.index)"
              (click)="selectMonth(m.index)"
              (keydown.enter)="selectMonth(m.index)"
              tabindex="0"
              role="gridcell"
            >
              @if (monthCellTpl()) {
                <ng-container
                  [ngTemplateOutlet]="monthCellTpl()!"
                  [ngTemplateOutletContext]="{ $implicit: m }"
                />
              } @else {
                {{ m.shortLabel }}
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-calendar',
    '[class.prism-calendar--fullscreen]': 'fullscreen()',
    '[class.prism-calendar--card]': '!fullscreen()',
  },
})
export class PrismCalendarComponent {
  /** Currently selected date (two-way binding) */
  readonly value = model<Date | null>(null);

  /** View mode: month grid or year (month picker) */
  readonly mode = model<CalendarMode>('month');

  /** Whether to render full-width or compact card */
  readonly fullscreen = input<boolean>(true);

  /** Custom function to disable specific dates */
  readonly disabledDate = input<((date: Date) => boolean) | null>(null);

  /** Template for custom date cell content */
  readonly dateCellTpl = contentChild<TemplateRef<unknown>>('dateCell');

  /** Template for custom month cell content */
  readonly monthCellTpl = contentChild<TemplateRef<unknown>>('monthCell');

  /** Emitted when the panel (month/year) changes */
  readonly panelChange = output<{ date: Date; mode: CalendarMode }>();

  /** Emitted when a date is selected */
  readonly selectChange = output<Date>();

  /** Current view pivot date */
  readonly viewDate = signal<Date>(new Date());

  /** Weekday header labels — full and short */
  readonly weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  readonly weekdaysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly weekdaysMini = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  readonly viewYear = computed(() => this.viewDate().getFullYear());
  readonly viewMonth = computed(() => this.viewDate().getMonth());
  readonly viewMonthName = computed(() =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.viewDate())
  );

  /** 42-slot calendar grid */
  readonly calendarDays = computed<CalendarDay[]>(() => {
    const days: CalendarDay[] = [];
    const vd = this.viewDate();
    const year = vd.getFullYear();
    const month = vd.getMonth();
    const disabledFn = this.disabledDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();

    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: false,
        isDisabled: disabledFn ? disabledFn(d) : false,
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      days.push({
        date: d,
        isCurrentMonth: true,
        isToday: d.toDateString() === today.toDateString(),
        isDisabled: disabledFn ? disabledFn(d) : false,
      });
    }

    // Next month padding
    const totalSlots = 42;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isToday: false,
        isDisabled: disabledFn ? disabledFn(d) : false,
      });
    }

    return days;
  });

  /** 12-month grid for year view */
  readonly monthsGrid = computed<CalendarMonth[]>(() => {
    const now = new Date();
    const viewYear = this.viewYear();
    return Array.from({ length: 12 }, (_, i) => ({
      index: i,
      label: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(viewYear, i)),
      shortLabel: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(viewYear, i)),
      isCurrent: now.getFullYear() === viewYear && now.getMonth() === i,
    }));
  });

  constructor() {
    // Sync viewDate when value changes externally
    effect(() => {
      const val = this.value();
      if (val) {
        this.viewDate.set(new Date(val.getFullYear(), val.getMonth(), 1));
      }
    });
  }

  prevMonth(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.panelChange.emit({ date: this.viewDate(), mode: this.mode() });
  }

  nextMonth(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.panelChange.emit({ date: this.viewDate(), mode: this.mode() });
  }

  prevYear(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear() - 1, d.getMonth(), 1));
    this.panelChange.emit({ date: this.viewDate(), mode: this.mode() });
  }

  nextYear(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear() + 1, d.getMonth(), 1));
    this.panelChange.emit({ date: this.viewDate(), mode: this.mode() });
  }

  selectDate(date: Date): void {
    const disabledFn = this.disabledDate();
    if (disabledFn && disabledFn(date)) return;
    this.value.set(date);
    this.selectChange.emit(date);
  }

  selectMonth(monthIndex: number): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), monthIndex, 1));
    this.mode.set('month');
    this.panelChange.emit({ date: this.viewDate(), mode: 'month' });
  }

  toggleMode(): void {
    const newMode: CalendarMode = this.mode() === 'month' ? 'year' : 'month';
    this.mode.set(newMode);
    this.panelChange.emit({ date: this.viewDate(), mode: newMode });
  }

  isSelected(date: Date): boolean {
    const val = this.value();
    return !!val && date.toDateString() === val.toDateString();
  }

  isSelectedMonth(monthIndex: number): boolean {
    const val = this.value();
    return !!val && val.getFullYear() === this.viewYear() && val.getMonth() === monthIndex;
  }
}
