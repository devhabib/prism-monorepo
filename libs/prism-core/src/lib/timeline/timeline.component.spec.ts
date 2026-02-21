import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrismTimelineComponent } from './timeline.component';
import { PrismTimelineItemComponent } from './timeline-item.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <prism-timeline>
      <prism-timeline-item>Item 1</prism-timeline-item>
      <prism-timeline-item [last]="true">Item 2</prism-timeline-item>
    </prism-timeline>
  `,
  imports: [PrismTimelineComponent, PrismTimelineItemComponent]
})
class TestHostComponent {}

describe('PrismTimelineComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, PrismTimelineComponent, PrismTimelineItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render timeline items', () => {
    const items = fixture.nativeElement.querySelectorAll('.prism-timeline-item');
    expect(items.length).toBe(2);
  });

  it('should remove tail for last item', () => {
    // Note: We use [last]="true" explicitly or CSS :last-child
    // In our implementation, we use both.
    const items = fixture.nativeElement.querySelectorAll('.prism-timeline-item');
    const lastItem = items[1];
    
    // We check if it has the last class or if CSS rule would apply
    expect(lastItem.classList.contains('prism-timeline-item-last')).toBe(true);
    
    // In the template, we have: &:last-child &-tail { display: none; }
    // And also for the input: [class.prism-timeline-item-last]="last()"
  });

  it('should show pending state', () => {
    TestBed.resetTestingModule();
    @Component({
      template: `<prism-timeline pending="Loading..."></prism-timeline>`,
      imports: [PrismTimelineComponent]
    })
    class PendingHostComponent {}
    
    const pendingFixture = TestBed.createComponent(PendingHostComponent);
    pendingFixture.detectChanges();
    
    expect(pendingFixture.nativeElement.textContent).toContain('Loading...');
    expect(pendingFixture.nativeElement.querySelector('.prism-timeline-item-head-pending')).toBeTruthy();
  });
});
