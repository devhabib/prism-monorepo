import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismCalendarComponent, CalendarMode } from './calendar.component';

@Component({
  template: `
    <prism-calendar
      [(value)]="selectedDate"
      [(mode)]="mode"
      [fullscreen]="false"
      (selectChange)="onSelect($event)"
      (panelChange)="onPanelChange($event)"
    />
  `,
  imports: [PrismCalendarComponent],
})
class TestHostComponent {
  selectedDate = signal<Date | null>(null);
  mode = signal<CalendarMode>('month');
  lastSelected: Date | null = null;
  lastPanelEvent: { date: Date; mode: CalendarMode } | null = null;

  calendar = viewChild(PrismCalendarComponent);

  onSelect(date: Date): void {
    this.lastSelected = date;
  }

  onPanelChange(event: { date: Date; mode: CalendarMode }): void {
    this.lastPanelEvent = event;
  }
}

describe('PrismCalendarComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const calendar = fixture.debugElement.query(By.directive(PrismCalendarComponent));
    expect(calendar).toBeTruthy();
  });

  it('should render 42 day cells', () => {
    const days = fixture.debugElement.queryAll(By.css('.prism-calendar__day'));
    expect(days.length).toBe(42);
  });

  it('should render 7 weekday headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('.prism-calendar__weekday'));
    expect(headers.length).toBe(7);
  });

  it('should select a date and emit selectChange', () => {
    const currentMonthDays = fixture.debugElement.queryAll(
      By.css('.prism-calendar__day:not(.is-other-month)')
    );
    expect(currentMonthDays.length).toBeGreaterThan(0);

    currentMonthDays[0].nativeElement.click();
    fixture.detectChanges();

    expect(host.lastSelected).toBeTruthy();
    expect(host.lastSelected instanceof Date).toBe(true);
    expect(host.selectedDate()).toBeTruthy();
  });

  it('should update model when a date is selected', () => {
    const currentMonthDays = fixture.debugElement.queryAll(
      By.css('.prism-calendar__day:not(.is-other-month)')
    );
    currentMonthDays[14].nativeElement.click();
    fixture.detectChanges();

    const selected = host.selectedDate();
    expect(selected).toBeTruthy();
    expect(selected!.getDate()).toBe(15); // 15th day (0-indexed + 1)
  });

  it('should navigate to next month', () => {
    const component = host.calendar()!;
    const initialMonth = component.viewMonth();

    component.nextMonth();
    fixture.detectChanges();

    expect(component.viewMonth()).toBe((initialMonth + 1) % 12);
  });

  it('should navigate to previous month', () => {
    const component = host.calendar()!;
    const initialMonth = component.viewMonth();

    component.prevMonth();
    fixture.detectChanges();

    const expected = (initialMonth - 1 + 12) % 12;
    expect(component.viewMonth()).toBe(expected);
  });

  it('should switch to year mode', () => {
    const component = host.calendar()!;
    component.toggleMode();
    fixture.detectChanges();

    expect(host.mode()).toBe('year');
    const monthCells = fixture.debugElement.queryAll(By.css('.prism-calendar__month-cell'));
    expect(monthCells.length).toBe(12);
  });

  it('should select month in year view and switch back to month mode', () => {
    const component = host.calendar()!;
    component.toggleMode();
    fixture.detectChanges();

    const monthCells = fixture.debugElement.queryAll(By.css('.prism-calendar__month-cell'));
    monthCells[5].nativeElement.click(); // June
    fixture.detectChanges();

    expect(host.mode()).toBe('month');
    expect(component.viewMonth()).toBe(5);
  });
});
