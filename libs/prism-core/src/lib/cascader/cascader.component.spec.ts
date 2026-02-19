import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismCascaderComponent, CascaderOption } from './cascader.component';

@Component({
  template: `
    <prism-cascader 
      [(value)]="value" 
      [options]="options"
      (selectionChange)="onSelectionChange($event)"
    />
  `,
  imports: [PrismCascaderComponent]
})
class TestHostComponent {
  value = signal<string[]>([]);
  options: CascaderOption[] = [
    {
      label: 'Zhejiang',
      value: 'zhejiang',
      children: [
        {
          label: 'Hangzhou',
          value: 'hangzhou',
          children: [
            { label: 'West Lake', value: 'west_lake' }
          ]
        }
      ]
    },
    {
      label: 'Jiangsu',
      value: 'jiangsu',
      children: [
        { label: 'Nanjing', value: 'nanjing' }
      ]
    }
  ];
  selection: CascaderOption[] = [];

  onSelectionChange(selection: CascaderOption[]) {
    this.selection = selection;
  }
}

describe('PrismCascaderComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismCascaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismCascaderComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should open menus on click', () => {
    const trigger = fixture.debugElement.query(By.css('.prism-cascader__trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    const menus = fixture.debugElement.queryAll(By.css('.prism-cascader__menu'));
    expect(menus.length).toBe(1);
    expect(menus[0].queryAll(By.css('.prism-cascader__option')).length).toBe(2);
  });

  it('should show second column when first level option is clicked', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    const firstOption = fixture.debugElement.query(By.css('.prism-cascader__option'));
    firstOption.nativeElement.click();
    fixture.detectChanges();

    const menus = fixture.debugElement.queryAll(By.css('.prism-cascader__menu'));
    expect(menus.length).toBe(2);
    expect(menus[1].query(By.css('.prism-cascader__option-label')).nativeElement.textContent.trim()).toBe('Hangzhou');
  });

  it('should select value and close when leaf is clicked', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    // Click Zhejiang
    fixture.debugElement.queryAll(By.css('.prism-cascader__option'))[0].nativeElement.click();
    fixture.detectChanges();

    // Click Hangzhou
    fixture.debugElement.queryAll(By.css('.prism-cascader__menu'))[1]
      .query(By.css('.prism-cascader__option')).nativeElement.click();
    fixture.detectChanges();

    // Click West Lake (Leaf)
    fixture.debugElement.queryAll(By.css('.prism-cascader__menu'))[2]
      .query(By.css('.prism-cascader__option')).nativeElement.click();
    fixture.detectChanges();

    expect(host.value()).toEqual(['zhejiang', 'hangzhou', 'west_lake']);
    expect(component.isOpen()).toBe(false);
    expect(fixture.debugElement.query(By.css('.prism-cascader__label')).nativeElement.textContent.trim())
      .toBe('Zhejiang / Hangzhou / West Lake');
  });

  it('should support default values', () => {
    host.value.set(['jiangsu', 'nanjing']);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.prism-cascader__label')).nativeElement.textContent.trim())
      .toBe('Jiangsu / Nanjing');
  });

  it('should close on outside click', () => {
    component.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });
});
