import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismTimePickerComponent } from './time-picker.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-time-picker 
      [(value)]="value" 
      [format]="format()"
      [use12Hour]="use12Hour()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismTimePickerComponent, FormsModule]
})
class TestHostComponent {
  value = signal<string | null>(null);
  format = signal<'HH:mm' | 'HH:mm:ss' | 'hh:mm a'>('HH:mm');
  use12Hour = signal(false);
  disabled = signal(false);
}

describe('PrismTimePickerComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismTimePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismTimePickerComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dropdown on click', () => {
    const trigger = fixture.debugElement.query(By.css('.prism-time-picker__trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
  });

  it('should bind value correctly', async () => {
    host.value.set('14:30');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedHour()).toBe(14);
    expect(component.selectedMinute()).toBe(30);
  });

  it('should format 12-hour properly', async () => {
    host.use12Hour.set(true);
    host.format.set('hh:mm a');
    host.value.set('14:30');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.selectedHour()).toBe(2);
    expect(component.selectedAmPm()).toBe('PM');
    
    // Check formatted string
    expect(component.formattedTime()).toBe('02:30 PM');
  });

  it('should allow selection updating value', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const hoursColumn = fixture.debugElement.queryAll(By.css('.prism-time-picker__column'))[0];
    const hourCells = hoursColumn.queryAll(By.css('.prism-time-picker__cell'));
    hourCells[5].nativeElement.click(); // Selects '05'
    
    const minutesColumn = fixture.debugElement.queryAll(By.css('.prism-time-picker__column'))[1];
    const minuteCells = minutesColumn.queryAll(By.css('.prism-time-picker__cell'));
    minuteCells[15].nativeElement.click(); // Selects '15'

    fixture.detectChanges();

    expect(host.value()).toBe('05:15');
  });

  it('should handle arrow up keydown', () => {
    host.value.set('01:00');
    fixture.detectChanges();
    component.isOpen.set(true);
    fixture.detectChanges();

    const hoursColumn = fixture.debugElement.queryAll(By.css('.prism-time-picker__column'))[0];
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    hoursColumn.nativeElement.dispatchEvent(event);
    
    fixture.detectChanges();
    
    // ArrowUp decreases value by 1 (dir = -1) -> 0
    expect(component.selectedHour()).toBe(0);
  });
});
