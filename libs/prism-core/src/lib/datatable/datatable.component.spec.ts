import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismTableComponent } from './datatable.component';
import { PrismColumn } from './datatable.types';

@Component({
  template: `
    <prism-table [data]="testData" [columns]="testCols">
      <ng-template #statusCell let-row="row">
        <span class="test-badge">{{ row.status }}</span>
      </ng-template>
    </prism-table>
  `,
  imports: [PrismTableComponent],
  standalone: true
})
class TestHostComponent {
  @ViewChild('statusCell') statusTemplate!: TemplateRef<any>;

  testData = [
    { id: 1, name: 'Alpha', status: 'Active' },
    { id: 2, name: 'Beta', status: 'Inactive' },
    { id: 3, name: 'Gamma', status: 'Active' }
  ];

  testCols: PrismColumn<any>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'status', header: 'Status' }
  ];
}

describe('PrismTableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });

  it('should sort data when header is clicked', () => {
    // Inject the template manually for the test scenario
    host.testCols[1].cellTemplate = host.statusTemplate;
    fixture.detectChanges();

    const nameHeader = fixture.debugElement.query(By.css('th.sortable'));
    
    // Click to Sort Ascending (Alpha first)
    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();
    let rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('Alpha');

    // Click to Sort Descending (Gamma first)
    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();
    rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('Gamma');
  });

  it('should render custom templates', () => {
    // Inject the template manually for the test scenario
    // Note: The previous test might have already done this depending on execution order, 
    // but explicit is better.
    host.testCols[1].cellTemplate = host.statusTemplate;
    fixture.detectChanges();
    
    // We need to make sure the template is actually being used. 
    // The previous test setup modified the columns, but let's ensure it's set here too.
    
    const badge = fixture.debugElement.query(By.css('.test-badge'));
    // The template has class "test-badge"
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('Active'); 
  });
});
