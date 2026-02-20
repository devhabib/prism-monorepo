import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrismCalendarComponent,
  PrismCodeBlockComponent,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc,
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-calendar-demo',
  imports: [
    CommonModule,
    PrismCalendarComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
  ],
  templateUrl: './calendar-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDemoComponent {
  readonly selectedDate = signal<Date | null>(null);
  readonly fullscreenDate = signal<Date | null>(new Date());

  onDateSelect(date: Date): void {
    this.selectedDate.set(date);
  }

  readonly snippets = {
    card: `<prism-calendar
  [fullscreen]="false"
  [(value)]="selectedDate"
  (selectChange)="onDateSelect($event)"
/>`,
    fullscreen: `<prism-calendar
  [fullscreen]="true"
  [(value)]="selectedDate"
/>`,
    yearView: `<prism-calendar
  [fullscreen]="false"
  mode="year"
/>`,
    disabledDates: `// Disable weekends
disabledFn = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

<prism-calendar
  [fullscreen]="false"
  [disabledDate]="disabledFn"
/>`,
  };

  readonly apiData: ApiDoc[] = [
    { name: 'value', type: 'Date | null', default: 'null', description: 'Selected date (two-way binding via model).' },
    { name: 'mode', type: "'month' | 'year'", default: "'month'", description: 'View mode: day grid or month picker.' },
    { name: 'fullscreen', type: 'boolean', default: 'true', description: 'Full-width mode or compact card mode.' },
    { name: 'disabledDate', type: '(date: Date) => boolean', default: 'null', description: 'Function to disable specific dates.' },
    { name: 'panelChange', type: 'EventEmitter<{date, mode}>', default: '—', description: 'Emitted when month/year navigation changes.' },
    { name: 'selectChange', type: 'EventEmitter<Date>', default: '—', description: 'Emitted when a date is clicked.' },
  ];

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}
