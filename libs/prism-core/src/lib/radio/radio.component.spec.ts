import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismRadioComponent } from './radio.component';
import { PrismRadioGroupComponent } from './radio-group.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-radio-group [(value)]="value" [direction]="direction()" [disabled]="disabled()">
      <prism-radio value="apple">Apple</prism-radio>
      <prism-radio value="banana">Banana</prism-radio>
    </prism-radio-group>
  `,
  imports: [PrismRadioGroupComponent, PrismRadioComponent, FormsModule]
})
class TestHostComponent {
  value = signal('apple');
  direction = signal<'horizontal' | 'vertical'>('horizontal');
  disabled = signal(false);
}

describe('PrismRadioGroup', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let groupComponent: PrismRadioGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    groupComponent = fixture.debugElement.query(By.directive(PrismRadioGroupComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(groupComponent).toBeTruthy();
  });

  it('should bind value via ngModel', async () => {
    host.value.set('banana');
    fixture.detectChanges();
    await fixture.whenStable();

    const radios = fixture.debugElement.queryAll(By.directive(PrismRadioComponent));
    expect(radios[1].componentInstance.isChecked()).toBe(true);
    expect(radios[0].componentInstance.isChecked()).toBe(false);
  });

  it('should select value on click', () => {
    const radios = fixture.debugElement.queryAll(By.directive(PrismRadioComponent));
    const bananaInput = radios[1].query(By.css('input')).nativeElement;
    
    bananaInput.click();
    fixture.detectChanges();
    
    expect(host.value()).toBe('banana');
    expect(radios[1].componentInstance.isChecked()).toBe(true);
  });

  it('should respect disabled state from group', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    const radios = fixture.debugElement.queryAll(By.directive(PrismRadioComponent));
    expect(radios[0].componentInstance.isDisabled()).toBe(true);
    
    const appleInput = radios[0].query(By.css('input')).nativeElement;
    expect(appleInput.disabled).toBe(true);
  });

  it('should change direction', () => {
    host.direction.set('vertical');
    fixture.detectChanges();
    const group = fixture.debugElement.query(By.css('.prism-radio-group'));
    expect(group.nativeElement.classList.contains('is-vertical')).toBe(true);
  });
});
