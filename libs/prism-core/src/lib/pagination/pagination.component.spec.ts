import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismPaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { PrismIconRegistry } from '../icon/icon-registry.service';
import { piMoreLine, piArrowLeftSLine, piArrowRightSLine } from '@devynelogic/prism-icons';

describe('PrismPaginationComponent', () => {
  let component: PrismPaginationComponent;
  let fixture: ComponentFixture<PrismPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismPaginationComponent],
      providers: [PrismIconRegistry]
    }).compileComponents();

    const registry = TestBed.inject(PrismIconRegistry);
    registry.addIcons([piMoreLine, piArrowLeftSLine, piArrowRightSLine]);

    fixture = TestBed.createComponent(PrismPaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('total', 100);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('pageIndex', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPages()).toBe(10);
  });

  it('should emit pageChange when page button is clicked', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('prism-button'));
    // Find button with text "2"
    const page2Btn = buttons.find(b => b.nativeElement.textContent.trim() === '2');
    page2Btn?.nativeElement.click();
    
    expect(spy).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      total: 100
    });
    expect(component.pageIndex()).toBe(1);
  });

  it('should handle next and previous clicks', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    
    // Test Next
    component.handlePageChange(1);
    expect(spy).toHaveBeenCalledWith({ page: 1, pageSize: 10, total: 100 });
    
    // Test Prev
    component.handlePageChange(0);
    expect(component.pageIndex()).toBe(0);
  });

  it('should handle size change', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    component.handleSizeChange(20);
    
    expect(component.pageSize()).toBe(20);
    expect(component.totalPages()).toBe(5);
    expect(spy).toHaveBeenCalledWith({ page: 0, pageSize: 20, total: 100 });
  });

  it('should handle quick jumper', () => {
    const spy = vi.spyOn(component.pageChange, 'emit');
    // Simulate jump to page 5
    const event = { target: { value: '5' } } as any;
    component.handleJump(event);
    
    expect(component.pageIndex()).toBe(4);
    expect(spy).toHaveBeenCalledWith({ page: 4, pageSize: 10, total: 100 });
  });

  it('should support simple mode', () => {
    fixture.componentRef.setInput('simple', true);
    fixture.detectChanges();
    
    const simpleContainer = fixture.debugElement.query(By.css('.prism-pagination-simple-container'));
    expect(simpleContainer).toBeTruthy();
  });

  it('should generate correct range with ellipses', () => {
    fixture.componentRef.setInput('total', 200); // 20 pages
    fixture.componentRef.setInput('pageIndex', 10); // Page 11
    fixture.detectChanges();
    
    const range = component.range();
    expect(range).toContain('...');
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(20);
  });
});
