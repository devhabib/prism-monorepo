import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismDatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-date-picker 
      [(value)]="value" 
      [placeholder]="placeholder()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismDatePickerComponent, FormsModule]
})
class TestHostComponent {
  value = signal<Date | null>(null);
  placeholder = signal('Select a date');
  disabled = signal(false);
}

describe('PrismDatePickerComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismDatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismDatePickerComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dropdown on click', () => {
    const trigger = fixture.debugElement.query(By.css('.prism-date-picker__trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.isOpen()).toBe(true);
    expect(fixture.debugElement.query(By.css('.is-open'))).toBeTruthy();
  });

  it('should bind date via ngModel', async () => {
    const testDate = new Date(2026, 5, 15); // June 15, 2026
    host.value.set(testDate);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.value()?.toDateString()).toBe(testDate.toDateString());
    expect(fixture.debugElement.query(By.css('.prism-date-picker__value')).nativeElement.textContent).toContain('Jun 15, 2026');
  });

  it('should select date on day click', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const days = fixture.debugElement.queryAll(By.css('.prism-date-picker__day:not(.is-other-month)'));
    days[10].nativeElement.click(); // Click 11th day of current month
    fixture.detectChanges();

    expect(host.value()?.getDate()).toBe(11);
    expect(component.isOpen()).toBe(false);
  });

  it('should navigate months', () => {
    const initialViewDate = new Date(component.viewDate());
    
    component.isOpen.set(true);
    fixture.detectChanges();

    const nextBtn = fixture.debugElement.query(By.css('.prism-date-picker__header button:last-child'));
    nextBtn.nativeElement.click();
    fixture.detectChanges();

    const expectedMonth = (initialViewDate.getMonth() + 1) % 12;
    expect(component.viewDate().getMonth()).toBe(expectedMonth);

    const prevBtn = fixture.debugElement.query(By.css('.prism-date-picker__header button:first-child'));
    prevBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.viewDate().getMonth()).toBe(initialViewDate.getMonth());
  });

  it('should close on outside click', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it('should handle disabled state', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.prism-date-picker__trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});
