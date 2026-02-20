import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismFormFieldComponent } from './form-field.component';

@Component({
  template: `
    <prism-form-field 
      [label]="label()" 
      [hint]="hint()" 
      [error]="error()" 
      [required]="required()"
    >
      <input type="text" />
    </prism-form-field>
  `,
  imports: [PrismFormFieldComponent]
})
class TestHostComponent {
  label = signal('Username');
  hint = signal('Enter your unique username');
  error = signal<string | null>(null);
  required = signal(false);
}

describe('PrismFormFieldComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render label', () => {
    const label = fixture.debugElement.query(By.css('.prism-form-field__label')).nativeElement;
    expect(label.textContent).toContain('Username');
  });

  it('should show required marker', () => {
    host.required.set(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.prism-form-field__required-marker'))).toBeTruthy();
  });

  it('should show hint when no error', () => {
    const hint = fixture.debugElement.query(By.css('.prism-form-field__hint')).nativeElement;
    expect(hint.textContent).toContain('Enter your unique username');
  });

  it('should show error and hide hint', () => {
    host.error.set('Username is already taken');
    fixture.detectChanges();
    
    const error = fixture.debugElement.query(By.css('.prism-form-field__error')).nativeElement;
    expect(error.textContent).toContain('Username is already taken');
    expect(fixture.debugElement.query(By.css('.prism-form-field__hint'))).toBeFalsy();
  });

  it('should project content', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeTruthy();
  });
});
