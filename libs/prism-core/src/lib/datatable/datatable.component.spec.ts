import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismTableComponent } from './datatable.component';
import { PrismColumn } from './datatable.types';

@Component({
  template: `
    <ng-template #statusCell let-row="row">
      <span class="test-badge">{{ row.status }}</span>
    </ng-template>
    <prism-table [data]="testData" [columns]="testCols"></prism-table>
  `,
  imports: [PrismTableComponent],
  
})
class TestHostComponent implements OnInit {
  @ViewChild('statusCell', { static: true }) statusTemplate!: TemplateRef<any>;

  testData = [
    { id: 1, name: 'Alpha', status: 'Active' },
    { id: 2, name: 'Beta', status: 'Inactive' },
    { id: 3, name: 'Gamma', status: 'Active' }
  ];

  testCols: PrismColumn<any>[] = [];

  ngOnInit() {
    this.testCols = [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'status', header: 'Status', cellTemplate: this.statusTemplate }
    ];
  }
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

  it('should render custom templates', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('.test-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('Active'); 
  });
});
