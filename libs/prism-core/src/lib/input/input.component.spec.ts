import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismInputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-input 
      [(value)]="value" 
      [type]="type()"
      [placeholder]="placeholder()"
      [size]="size()"
      [error]="error()"
      [success]="success()"
      [disabled]="disabled()"
      [prefix]="prefix()"
      [suffix]="suffix()"
    />
  `,
  imports: [PrismInputComponent, FormsModule]
})
class TestHostComponent {
  value = signal('');
  type = signal('text');
  placeholder = signal('Enter text');
  size = signal<'sm' | 'md' | 'lg'>('md');
  error = signal(false);
  success = signal(false);
  disabled = signal(false);
  prefix = signal<string | null>(null);
  suffix = signal<string | null>(null);
}

describe('PrismInputComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismInputComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind value via ngModel', async () => {
    host.value.set('Hello');
    fixture.detectChanges();
    await fixture.whenStable();
    
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('Hello');

    input.value = 'New Value';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(host.value()).toBe('New Value');
  });

  it('should apply size classes', () => {
    host.size.set('sm');
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.classList.contains('prism-input-sm')).toBe(true);

    host.size.set('lg');
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.classList.contains('prism-input-lg')).toBe(true);
  });

  it('should apply error and success classes', () => {
    host.error.set(true);
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.classList.contains('p-error')).toBe(true);

    host.error.set(false);
    host.success.set(true);
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.classList.contains('p-success')).toBe(true);
  });

  it('should disable the input', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.disabled).toBe(true);
    expect(fixture.debugElement.query(By.css('.is-disabled'))).toBeTruthy();
  });

  it('should render prefix icon', () => {
    host.prefix.set('user-line');
    fixture.detectChanges();
    const prefix = fixture.debugElement.query(By.css('.prism-input-prefix'));
    expect(prefix).toBeTruthy();
    expect(prefix.query(By.css('prism-icon'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.icon-left'))).toBeTruthy();
  });

  it('should render suffix icon', () => {
    host.suffix.set('search-line');
    fixture.detectChanges();
    const suffix = fixture.debugElement.query(By.css('.prism-input-suffix'));
    expect(suffix).toBeTruthy();
    expect(suffix.query(By.css('prism-icon'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.icon-right'))).toBeTruthy();
  });

  it('should handle onTouched on blur', () => {
    const spy = vi.spyOn(component, 'onTouched');
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
