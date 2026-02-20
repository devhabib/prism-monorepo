import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismCheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-checkbox 
      [(checked)]="checked" 
      [label]="label()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismCheckboxComponent, FormsModule]
})
class TestHostComponent {
  checked = signal(false);
  label = signal('Accept terms');
  disabled = signal(false);
}

describe('PrismCheckboxComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismCheckboxComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind checked via ngModel', async () => {
    host.checked.set(true);
    fixture.detectChanges();
    await fixture.whenStable();
    
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.checked).toBe(true);

    input.checked = false;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    expect(host.checked()).toBe(false);
  });

  it('should display label', () => {
    const label = fixture.debugElement.query(By.css('.prism-checkbox__label')).nativeElement;
    expect(label.textContent).toContain('Accept terms');
  });

  it('should disable when disabled input is true', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.disabled).toBe(true);
    expect(fixture.debugElement.query(By.css('.disabled'))).toBeTruthy();
  });

  it('should call onTouched on blur', () => {
    const spy = vi.spyOn(component, 'onTouched');
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
