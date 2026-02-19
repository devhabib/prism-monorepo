import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismAutoCompleteComponent } from './autocomplete.component';

@Component({
  template: `
    <prism-autocomplete 
      [(value)]="value" 
      [options]="options"
      (selected)="onSelected($event)"
      (searchChange)="onSearchChange($event)"
    />
  `,
  imports: [PrismAutoCompleteComponent]
})
class TestHostComponent {
  value = signal('');
  options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  selectedVal = '';
  searchQuery = '';

  onSelected(val: string) {
    this.selectedVal = val;
  }

  onSearchChange(val: string) {
    this.searchQuery = val;
  }
}

describe('PrismAutoCompleteComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismAutoCompleteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismAutoCompleteComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should filter options based on input value', () => {
    host.value.set('a');
    fixture.detectChanges();
    
    // Open panel
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.prism-autocomplete__option'));
    // Apple, Banana, Date (all contain 'a')
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent.trim()).toBe('Apple');
  });

  it('should select an option on click', () => {
    host.value.set('Ap');
    fixture.detectChanges();
    
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('.prism-autocomplete__option'));
    option.nativeElement.click();
    fixture.detectChanges();

    expect(host.value()).toBe('Apple');
    expect(host.selectedVal).toBe('Apple');
    expect(component.isOpen()).toBe(false);
  });

  it('should navigate options with keyboard', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    // ArrowDown should open and highlight first
    input.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
    fixture.detectChanges();
    expect(component.activeIndex()).toBe(0);

    // ArrowDown again
    input.triggerEventHandler('keydown', { key: 'ArrowDown', preventDefault: () => {} });
    fixture.detectChanges();
    expect(component.activeIndex()).toBe(1);

    // Enter to select
    input.triggerEventHandler('keydown', { key: 'Enter', preventDefault: () => {} });
    fixture.detectChanges();
    expect(host.value()).toBe('Banana');
    expect(component.isOpen()).toBe(false);
  });

  it('should close on Escape', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('keydown', { key: 'Escape' });
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it('should close on outside click', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});
