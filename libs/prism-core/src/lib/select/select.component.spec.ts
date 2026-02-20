import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismSelectComponent, SelectOption } from './select.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-select 
      [(value)]="value" 
      [options]="options()"
      [multiple]="multiple()"
      [searchable]="searchable()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismSelectComponent, FormsModule]
})
class TestHostComponent {
  value = signal<any>(null);
  options = signal<SelectOption[]>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' }
  ]);
  multiple = signal(false);
  searchable = signal(false);
  disabled = signal(false);
}

describe('PrismSelectComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismSelectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismSelectComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dropdown on click', () => {
    const trigger = fixture.debugElement.query(By.css('.prism-select__trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.isOpen()).toBe(true);
    expect(fixture.debugElement.query(By.css('.is-open'))).toBeTruthy();
  });

  it('should select an option (single mode)', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.prism-select__option'));
    options[1].nativeElement.click(); // Select Banana
    fixture.detectChanges();

    expect(host.value()).toBe('banana');
    expect(component.isOpen()).toBe(false);
  });

  it('should select multiple options (multi mode)', () => {
    host.multiple.set(true);
    host.value.set([]);
    fixture.detectChanges();

    component.isOpen.set(true);
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('.prism-select__option'));
    options[0].nativeElement.click(); // Apple
    fixture.detectChanges();
    options[1].nativeElement.click(); // Banana
    fixture.detectChanges();

    expect(host.value()).toEqual(['apple', 'banana']);
    expect(component.isOpen()).toBe(true); // Should stay open
  });

  it('should filter options when searching', async () => {
    host.searchable.set(true);
    fixture.detectChanges();
    
    component.isOpen.set(true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.prism-select__search-input-trigger')).nativeElement;
    input.value = 'app';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.filteredOptions().length).toBe(1);
    expect(component.filteredOptions()[0].label).toBe('Apple');
  });

  it('should remove tag in multi mode', () => {
    host.multiple.set(true);
    host.value.set(['apple', 'banana']);
    fixture.detectChanges();

    const tags = fixture.debugElement.queryAll(By.css('prism-tag'));
    expect(tags.length).toBe(2);

    // Trigger remove on first tag
    tags[0].componentInstance.remove.emit();
    fixture.detectChanges();

    expect(host.value()).toEqual(['banana']);
  });

  it('should close on outside click', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});
