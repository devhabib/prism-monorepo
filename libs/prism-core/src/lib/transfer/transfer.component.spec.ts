import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismTransferComponent, TransferItem } from './transfer.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-transfer 
      [(targetKeys)]="targetKeys" 
      [dataSource]="dataSource()"
      [showSearch]="showSearch()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismTransferComponent, FormsModule]
})
class TestHostComponent {
  targetKeys = signal<string[]>(['2']);
  dataSource = signal<TransferItem[]>([
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
    { key: '3', label: 'Item 3', disabled: true },
    { key: '4', label: 'Item 4' },
  ]);
  showSearch = signal(false);
  disabled = signal(false);
}

describe('PrismTransferComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismTransferComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismTransferComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items correctly in left and right panes', () => {
    const lists = fixture.debugElement.queryAll(By.css('.prism-transfer__list-body'));
    const leftItems = lists[0].queryAll(By.css('.prism-transfer__item'));
    const rightItems = lists[1].queryAll(By.css('.prism-transfer__item'));

    expect(leftItems.length).toBe(3); // Items 1, 3, 4
    expect(rightItems.length).toBe(1); // Item 2
  });

  it('should move item to right', () => {
    // Select item 1 in left list
    const lists = fixture.debugElement.queryAll(By.css('.prism-transfer__list-body'));
    const leftItems = lists[0].queryAll(By.css('.prism-transfer__item'));
    
    // Click un-disabled item 1
    leftItems[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.leftSelected()).toContain('1');

    // Click move right button
    const rightBtn = fixture.debugElement.query(By.css('.prism-transfer__btn-right'));
    rightBtn.nativeElement.click();
    fixture.detectChanges();

    expect(host.targetKeys()).toContain('1');
    expect(component.rightItems().length).toBe(2);
    expect(component.leftItems().length).toBe(2);
  });

  it('should filter items via search', async () => {
    host.showSearch.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    component.leftSearch.set('Item 1');
    fixture.detectChanges();

    const lists = fixture.debugElement.queryAll(By.css('.prism-transfer__list-body'));
    const leftItems = lists[0].queryAll(By.css('.prism-transfer__item'));
    
    expect(leftItems.length).toBe(1);
    expect(leftItems[0].nativeElement.textContent).toContain('Item 1');
  });

  it('should respect disabled item state', () => {
    const lists = fixture.debugElement.queryAll(By.css('.prism-transfer__list-body'));
    const leftItems = lists[0].queryAll(By.css('.prism-transfer__item'));
    
    // Item 3 is disabled, which is index 1 in the left pane (Items 1, 3, 4)
    leftItems[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.leftSelected()).not.toContain('3');
  });
});
