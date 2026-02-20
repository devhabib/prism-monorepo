import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  signal,
  computed,
  contentChildren,
  effect,
  output,
  DestroyRef,
  inject,
} from '@angular/core';
import { PrismCarouselPanelComponent } from './carousel-panel.component';

export type CarouselDotPosition = 'top' | 'bottom' | 'left' | 'right';
export type CarouselEffect = 'slide' | 'fade';

@Component({
  selector: 'prism-carousel',
  template: `
    <div class="prism-carousel__container">
      <!-- Arrow: Prev -->
      <button
        type="button"
        class="prism-carousel__arrow prism-carousel__arrow--prev"
        (click)="prev()"
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Track -->
      <div class="prism-carousel__viewport">
        <div
          class="prism-carousel__track"
          [style.transform]="trackTransform()"
        >
          <ng-content select="prism-carousel-panel" />
        </div>
      </div>

      <!-- Arrow: Next -->
      <button
        type="button"
        class="prism-carousel__arrow prism-carousel__arrow--next"
        (click)="next()"
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Dots -->
    @if (dots() && totalSlides() > 1) {
      <div class="prism-carousel__dots" [class]="dotsPositionClass()">
        @for (panel of panels(); track $index) {
          <button
            type="button"
            class="prism-carousel__dot"
            [class.is-active]="$index === activeIndex()"
            (click)="goTo($index)"
            [attr.aria-label]="'Go to slide ' + ($index + 1)"
          ></button>
        }
      </div>
    }
  `,
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'prism-carousel',
    '[class.prism-carousel--vertical]': 'isVertical()',
    '[class.prism-carousel--fade]': "effect() === 'fade'",
  },
})
export class PrismCarouselComponent {
  /** Whether to auto-advance slides */
  readonly autoplay = input<boolean>(false);

  /** Autoplay interval in ms */
  readonly autoplaySpeed = input<number>(3000);

  /** Position of the navigation dots */
  readonly dotPosition = input<CarouselDotPosition>('bottom');

  /** Show dot indicators */
  readonly dots = input<boolean>(true);

  /** Transition effect */
  readonly effect = input<CarouselEffect>('slide');

  /** Whether the carousel is vertical */
  readonly vertical = input<boolean>(false);

  /** Current active slide index */
  readonly activeIndex = signal<number>(0);

  /** Emitted when the active slide changes */
  readonly indexChange = output<number>();

  /** Query projected panels */
  readonly panels = contentChildren(PrismCarouselPanelComponent);

  /** Total number of slides */
  readonly totalSlides = computed(() => this.panels().length);

  /** Whether the layout is vertical */
  readonly isVertical = computed(() => {
    const pos = this.dotPosition();
    return this.vertical() || pos === 'left' || pos === 'right';
  });

  /** CSS transform style for the track */
  readonly trackTransform = computed(() => {
    if (this.effect() === 'fade') return 'none';
    const idx = this.activeIndex();
    if (this.isVertical()) {
      return `translateY(-${idx * 100}%)`;
    }
    return `translateX(-${idx * 100}%)`;
  });

  /** Computed dot position class */
  readonly dotsPositionClass = computed(() => `prism-carousel__dots--${this.dotPosition()}`);

  private readonly destroyRef = inject(DestroyRef);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Sync active state to panels (critical for fade effect)
    effect(() => {
      const currentIdx = this.activeIndex();
      const panelsArray = this.panels();
      panelsArray.forEach((panel, i) => {
        panel.isActive.set(i === currentIdx);
      });
    });

    // Manage autoplay lifecycle
    effect(() => {
      const shouldAutoplay = this.autoplay();
      const speed = this.autoplaySpeed();

      this.clearAutoplay();

      if (shouldAutoplay) {
        this.autoplayTimer = setInterval(() => {
          this.next();
        }, speed);
      }
    });

    this.destroyRef.onDestroy(() => {
      this.clearAutoplay();
    });
  }

  /** Go to next slide (wraps around) */
  next(): void {
    const total = this.totalSlides();
    if (total === 0) return;
    const nextIdx = (this.activeIndex() + 1) % total;
    this.activeIndex.set(nextIdx);
    this.indexChange.emit(nextIdx);
  }

  /** Go to previous slide (wraps around) */
  prev(): void {
    const total = this.totalSlides();
    if (total === 0) return;
    const prevIdx = (this.activeIndex() - 1 + total) % total;
    this.activeIndex.set(prevIdx);
    this.indexChange.emit(prevIdx);
  }

  /** Jump to specific slide */
  goTo(index: number): void {
    const total = this.totalSlides();
    if (total === 0) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    this.activeIndex.set(clamped);
    this.indexChange.emit(clamped);
  }

  private clearAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}
