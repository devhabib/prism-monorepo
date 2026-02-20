import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismRateComponent } from './rate.component';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <prism-rate 
      [(value)]="value" 
      [allowHalf]="allowHalf()"
      [disabled]="disabled()"
    />
  `,
  imports: [PrismRateComponent, FormsModule]
})
class TestHostComponent {
  value = signal(0);
  allowHalf = signal(false);
  disabled = signal(false);
}

describe('PrismRateComponent', () => {
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: PrismRateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(PrismRateComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind value via ngModel', async () => {
    host.value.set(3);
    fixture.detectChanges();
    await fixture.whenStable();
    
    expect(component.value()).toBe(3);
    const fullStars = fixture.debugElement.queryAll(By.css('.prism-rate-star.is-full'));
    expect(fullStars.length).toBe(3);
  });

  it('should change value on click', () => {
    const stars = fixture.debugElement.queryAll(By.css('.prism-rate-star'));
    stars[3].nativeElement.click(); // Click 4th star
    fixture.detectChanges();
    
    expect(host.value()).toBe(4);
  });

  it('should handle half stars', () => {
    host.allowHalf.set(true);
    fixture.detectChanges();

    const stars = fixture.debugElement.queryAll(By.css('.prism-rate-star'));
    
    // Mock getBoundingClientRect
    const starElement = stars[0].nativeElement as HTMLElement;
    vi.spyOn(starElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 20,
      height: 20,
      bottom: 30,
      right: 30,
      x: 10,
      y: 10,
      toJSON: () => {}
    } as DOMRect);

    // Simulate click on the left half of the first star (clientX 15, rect.left 10, width/2 = 10)
    // 15 - 10 = 5. 5 < 10 is true.
    const event = { 
      clientX: 15, 
      currentTarget: starElement,
      preventDefault: () => {},
      stopPropagation: () => {}
    };
    
    // We use triggerEventHandler which bypasses the 'instanceof MouseEvent' check? 
    // Wait, in my component I added 'event instanceof MouseEvent'.
    // In Vitest/JSDOM, MouseEvent might not be available or might be different.
    // I'll use a real MouseEvent if possible.
    const mouseEvent = new MouseEvent('click', { clientX: 15 });
    Object.defineProperty(mouseEvent, 'currentTarget', { value: starElement });

    stars[0].triggerEventHandler('click', mouseEvent);
    fixture.detectChanges();
    
    expect(host.value()).toBe(0.5);
    expect(fixture.debugElement.query(By.css('.prism-rate-star.is-half'))).toBeTruthy();
  });

  it('should show hover state', () => {
    const stars = fixture.debugElement.queryAll(By.css('.prism-rate-star'));
    const starElement = stars[2].nativeElement as HTMLElement;
    const mouseEvent = new MouseEvent('mousemove');
    Object.defineProperty(mouseEvent, 'currentTarget', { value: starElement });

    stars[2].triggerEventHandler('mousemove', mouseEvent);
    fixture.detectChanges();
    
    expect(fixture.debugElement.queryAll(By.css('.prism-rate-star.is-active')).length).toBe(3);
    
    stars[2].triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
  });

  it('should be disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();
    
    const stars = fixture.debugElement.queryAll(By.css('.prism-rate-star'));
    stars[0].nativeElement.click();
    fixture.detectChanges();
    
    expect(host.value()).toBe(0); // Should not change
  });
});
