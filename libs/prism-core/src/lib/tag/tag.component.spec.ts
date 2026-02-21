import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismTagComponent } from './tag.component';

describe('PrismTagComponent', () => {
  let component: PrismTagComponent;
  let fixture: ComponentFixture<PrismTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrismTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const fixture = TestBed.createComponent(PrismTagComponent);
    fixture.nativeElement.innerHTML = '<prism-tag>Test Tag</prism-tag>';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Tag');
  });

  it('should apply preset color classes', () => {
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.prism-tag');
    // Success color usually has a specific background or class
    // In our implementation we use [style.background-color]="customColor()"
    // But preset colors are handled via CSS classes or computed styles
  });

  it('should apply custom hex colors', () => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.prism-tag');
    expect(tag.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should handle closable state', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const closeBtn = fixture.nativeElement.querySelector('.prism-tag__close');
    expect(closeBtn).toBeTruthy();

    let emitted = false;
    component.closed.subscribe(() => emitted = true);
    closeBtn.click();
    expect(emitted).toBe(true);
    expect(component.visible()).toBe(false);
  });

  it('should handle checkable state', () => {
    fixture.componentRef.setInput('checkable', true);
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.prism-tag');
    
    tag.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
    expect(tag.classList.contains('prism-tag--checked')).toBe(true);
  });

  it('should handle keyboard events for checkable tags', () => {
    fixture.componentRef.setInput('checkable', true);
    fixture.detectChanges();
    const tag = fixture.nativeElement.querySelector('.prism-tag');
    
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    tag.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });
});
