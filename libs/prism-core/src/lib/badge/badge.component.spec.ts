import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismBadgeComponent } from './badge.component';

@Component({
  template: `
    <prism-badge
      [count]="count()"
      [dot]="dot()"
      [showZero]="showZero()"
      [overflowCount]="overflowCount()"
      [status]="status()"
    >
      <span class="test-child">Icon</span>
    </prism-badge>
  `,
  imports: [PrismBadgeComponent],
})
class TestHostComponent {
  count = signal<number | string>(5);
  dot = signal(false);
  showZero = signal(false);
  overflowCount = signal(99);
  status = signal<'success' | 'error' | 'warning' | 'default' | 'processing'>('error');
}

describe('PrismBadgeComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const badge = fixture.debugElement.query(By.directive(PrismBadgeComponent));
    expect(badge).toBeTruthy();
  });

  it('should display count text', () => {
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup.nativeElement.textContent.trim()).toBe('5');
  });

  it('should project child content', () => {
    const child = fixture.debugElement.query(By.css('.test-child'));
    expect(child.nativeElement.textContent).toBe('Icon');
  });

  // ── Overflow Logic ──
  it('should display "99+" when count exceeds overflowCount', () => {
    host.count.set(100);
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup.nativeElement.textContent.trim()).toBe('99+');
  });

  it('should display "999+" when overflowCount is 999 and count is 1000', () => {
    host.overflowCount.set(999);
    host.count.set(1000);
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup.nativeElement.textContent.trim()).toBe('999+');
  });

  it('should display exact count when at overflowCount limit', () => {
    host.count.set(99);
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup.nativeElement.textContent.trim()).toBe('99');
  });

  // ── Show Zero ──
  it('should hide badge when count is 0 and showZero is false', () => {
    host.count.set(0);
    host.showZero.set(false);
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup).toBeNull();
  });

  it('should show badge when count is 0 and showZero is true', () => {
    host.count.set(0);
    host.showZero.set(true);
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup).toBeTruthy();
    expect(sup.nativeElement.textContent.trim()).toBe('0');
  });

  // ── Dot Mode ──
  it('should render dot element when dot is true', () => {
    host.dot.set(true);
    fixture.detectChanges();
    const dot = fixture.debugElement.query(By.css('.prism-badge__dot'));
    expect(dot).toBeTruthy();
  });

  it('should not render count text in dot mode', () => {
    host.dot.set(true);
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(count).toBeNull();
  });

  // ── String Count ──
  it('should display string count as-is', () => {
    host.count.set('New');
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup.nativeElement.textContent.trim()).toBe('New');
  });

  it('should hide badge when string count is empty', () => {
    host.count.set('');
    fixture.detectChanges();
    const sup = fixture.debugElement.query(By.css('.prism-badge__count'));
    expect(sup).toBeNull();
  });
});
