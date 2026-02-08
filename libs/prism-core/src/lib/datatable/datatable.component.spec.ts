import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismTableComponent } from './datatable.component';
import { PrismColumn } from './datatable.types';

// 1. Test Host: Simulates a real parent component usage
@Component({
  template: `
    <prism-table [data]="testData" [columns]="testCols"></prism-table>
    <ng-template #statusCell let-row="row">
      <span class="test-badge">{{ row.status }}</span>
    </ng-template>
  `,
  imports: [PrismTableComponent],
  standalone: true
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
    fixture.detectChanges(); // Trigger initial render
  });

  // --- Rendering Tests ---
  it('should render the correct number of rows based on data input', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });

  it('should display text content correctly in default cells', () => {
    const firstCell = fixture.debugElement.query(By.css('tbody tr:first-child td'));
    expect(firstCell.nativeElement.textContent.trim()).toBe('Alpha');
  });

  // --- Interaction Tests (Signals) ---
  it('should sort data ascending and descending when header is clicked', () => {
    const nameHeader = fixture.debugElement.query(By.css('th.sortable')); 
    
    // 1. Sort Ascending
    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();
    let rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('Alpha'); 

    // 2. Sort Descending
    nameHeader.triggerEventHandler('click', null);
    fixture.detectChanges();
    rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('Gamma'); 
  });

  // --- Content Projection Tests ---
  it('should render custom templates when provided', () => {
    // Already set in ngOnInit
    const badge = fixture.debugElement.query(By.css('.test-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toBe('Active');
  });
});
