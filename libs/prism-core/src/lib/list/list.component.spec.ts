import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PrismListComponent, PrismListItemComponent, PrismListItemMetaComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <prism-list header="List Header" footer="List Footer" [bordered]="true" [split]="true">
       <prism-list-item>
          <prism-list-item-meta title="Item 1" description="Description 1"></prism-list-item-meta>
       </prism-list-item>
       <prism-list-item extra="Details">
          Item 2
       </prism-list-item>
    </prism-list>
  `,
  imports: [PrismListComponent, PrismListItemComponent, PrismListItemMetaComponent, CommonModule]
})
class TestHostComponent {}

@Component({
  template: `
    <prism-list [dataSource]="data()" [itemTemplate]="itemTpl" [grid]="{ gutter: 16, column: 3 }"></prism-list>
    <ng-template #itemTpl let-item>
       <prism-list-item>
          <prism-list-item-meta [title]="item.title"></prism-list-item-meta>
       </prism-list-item>
    </ng-template>
  `,
  imports: [PrismListComponent, PrismListItemComponent, PrismListItemMetaComponent, CommonModule]
})
class TestDataHostComponent {
  data = signal([{ title: 'A' }, { title: 'B' }, { title: 'C' }]);
}

describe('PrismListComponent', () => {
  describe('Static Content', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create list and display header/footer', () => {
      expect(component).toBeTruthy();
      
      const header = fixture.debugElement.query(By.css('.prism-list-header'));
      expect(header.nativeElement.textContent.trim()).toBe('List Header');
      
      const footer = fixture.debugElement.query(By.css('.prism-list-footer'));
      expect(footer.nativeElement.textContent.trim()).toBe('List Footer');
    });

    it('should render correct number of items', () => {
      const items = fixture.debugElement.queryAll(By.css('prism-list-item'));
      expect(items.length).toBe(2);
      
      const title = fixture.debugElement.query(By.css('.prism-list-item-meta-title'));
      expect(title.nativeElement.textContent.trim()).toBe('Item 1');
      
      const extra = fixture.debugElement.query(By.css('.prism-list-item-extra'));
      expect(extra.nativeElement.textContent.trim()).toBe('Details');
    });
  });

  describe('DataSource and Grid', () => {
    let fixture: ComponentFixture<TestDataHostComponent>;
    let component: TestDataHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestDataHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestDataHostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render grid items based on dataSource', () => {
      const grid = fixture.debugElement.query(By.css('.prism-list-grid'));
      expect(grid).toBeTruthy();
      
      const items = fixture.debugElement.queryAll(By.css('.prism-list-grid-item'));
      expect(items.length).toBe(3);
      
      const titles = fixture.debugElement.queryAll(By.css('.prism-list-item-meta-title'));
      expect(titles[0].nativeElement.textContent.trim()).toBe('A');
      expect(titles[1].nativeElement.textContent.trim()).toBe('B');
      expect(titles[2].nativeElement.textContent.trim()).toBe('C');
    });
  });
});
