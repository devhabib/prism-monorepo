import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrismCarouselComponent } from './carousel.component';
import { PrismCarouselPanelComponent } from './carousel-panel.component';

@Component({
  template: `
    <prism-carousel [autoplay]="false">
      <prism-carousel-panel>Slide 1</prism-carousel-panel>
      <prism-carousel-panel>Slide 2</prism-carousel-panel>
      <prism-carousel-panel>Slide 3</prism-carousel-panel>
    </prism-carousel>
  `,
  imports: [PrismCarouselComponent, PrismCarouselPanelComponent],
})
class TestHostComponent {
  carousel = viewChild(PrismCarouselComponent);
}

@Component({
  template: `
    <prism-carousel [autoplay]="true" [autoplaySpeed]="1000">
      <prism-carousel-panel>A</prism-carousel-panel>
      <prism-carousel-panel>B</prism-carousel-panel>
    </prism-carousel>
  `,
  imports: [PrismCarouselComponent, PrismCarouselPanelComponent],
})
class AutoplayHostComponent {
  carousel = viewChild(PrismCarouselComponent);
}

describe('PrismCarouselComponent', () => {
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
    const carousel = fixture.debugElement.query(By.directive(PrismCarouselComponent));
    expect(carousel).toBeTruthy();
  });

  it('should detect 3 panels', () => {
    const component = host.carousel()!;
    expect(component.totalSlides()).toBe(3);
  });

  it('should start at index 0', () => {
    const component = host.carousel()!;
    expect(component.activeIndex()).toBe(0);
  });

  // ── Wrap-around Navigation ──
  it('should advance to next slide', () => {
    const component = host.carousel()!;
    component.next();
    expect(component.activeIndex()).toBe(1);
  });

  it('should wrap from last slide to first on next()', () => {
    const component = host.carousel()!;
    component.next(); // 1
    component.next(); // 2
    component.next(); // 0 (wrap)
    expect(component.activeIndex()).toBe(0);
  });

  it('should wrap from first slide to last on prev()', () => {
    const component = host.carousel()!;
    component.prev(); // 2 (wrap)
    expect(component.activeIndex()).toBe(2);
  });

  it('should go to specific slide via goTo()', () => {
    const component = host.carousel()!;
    component.goTo(2);
    expect(component.activeIndex()).toBe(2);
  });

  it('should clamp goTo to valid range', () => {
    const component = host.carousel()!;
    component.goTo(10);
    expect(component.activeIndex()).toBe(2); // last index
    component.goTo(-5);
    expect(component.activeIndex()).toBe(0); // first index
  });

  it('should render navigation dots', () => {
    const dots = fixture.debugElement.queryAll(By.css('.prism-carousel__dot'));
    expect(dots.length).toBe(3);
  });

  it('should mark the active dot', () => {
    const dots = fixture.debugElement.queryAll(By.css('.prism-carousel__dot'));
    expect(dots[0].nativeElement.classList.contains('is-active')).toBe(true);

    const component = host.carousel()!;
    component.next();
    fixture.detectChanges();

    const updatedDots = fixture.debugElement.queryAll(By.css('.prism-carousel__dot'));
    expect(updatedDots[1].nativeElement.classList.contains('is-active')).toBe(true);
  });

  it('should navigate when clicking a dot', () => {
    const dots = fixture.debugElement.queryAll(By.css('.prism-carousel__dot'));
    dots[2].nativeElement.click();
    fixture.detectChanges();

    const component = host.carousel()!;
    expect(component.activeIndex()).toBe(2);
  });

  it('should apply correct transform', () => {
    const component = host.carousel()!;
    expect(component.trackTransform()).toBe('translateX(-0%)');

    component.next();
    fixture.detectChanges();
    expect(component.trackTransform()).toBe('translateX(-100%)');
  });
});

describe('PrismCarouselComponent (Autoplay)', () => {
  let fixture: ComponentFixture<AutoplayHostComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [AutoplayHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoplayHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should auto-advance slides', () => {
    const component = fixture.componentInstance.carousel()!;
    expect(component.activeIndex()).toBe(0);

    vi.advanceTimersByTime(1000);
    expect(component.activeIndex()).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(component.activeIndex()).toBe(0); // wrap
  });
});
