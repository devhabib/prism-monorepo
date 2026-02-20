import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismInputNumberComponent } from './input-number.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-input-number 
      [(value)]="value" 
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [precision]="precision() ?? null"
      [size]="size()"
      [disabled]="disabled()"
      [readonly]="readonly()"
    />
  `,
  imports: [PrismInputNumberComponent, FormsModule]
})
class TestHostComponent {
  value = signal(0);
  min = signal<number>(-Infinity);
  max = signal<number>(Infinity);
  step = signal(1);
  precision = signal<number | undefined>(undefined);
  size = signal<'sm' | 'md' | 'lg'>('md');
  disabled = signal(false);
  readonly = signal(false);
}

describe('PrismInputNumberComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismInputNumberComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismInputNumberComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind value via ngModel', async () => {
    host.value.set(10);
    fixture.detectChanges();
    await fixture.whenStable();
    
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('10');

    input.value = '20';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    await fixture.whenStable();
    expect(host.value()).toBe(20);
  });

  it('should step up and down', () => {
    host.value.set(10);
    fixture.detectChanges();

    const upBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-up')).nativeElement;
    const downBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-down')).nativeElement;

    upBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(11);

    downBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(10);
  });

  it('should respect min and max', () => {
    host.min.set(0);
    host.max.set(10);
    host.value.set(9);
    fixture.detectChanges();

    const upBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-up')).nativeElement;
    upBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(10);

    upBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(10); // Still 10

    host.value.set(1);
    fixture.detectChanges();
    const downBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-down')).nativeElement;
    downBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(0);

    downBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(0); // Still 0
  });

  it('should respect precision', () => {
    host.precision.set(2);
    host.value.set(10);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '10.1234';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(host.value()).toBe(10.12);
  });

  it('should disable controls when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const upBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-up')).nativeElement;
    const downBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-down')).nativeElement;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(upBtn.disabled).toBe(true);
    expect(downBtn.disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('should not step when readonly', () => {
    host.readonly.set(true);
    host.value.set(10);
    fixture.detectChanges();

    const upBtn = fixture.debugElement.query(By.css('.prism-input-number-handler-up')).nativeElement;
    upBtn.click();
    fixture.detectChanges();
    expect(host.value()).toBe(10);
  });
});
