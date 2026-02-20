import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  effect,
  TemplateRef,
  inject,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'prism-statistic',
  imports: [CommonModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'prism-statistic',
  },
})
export class PrismStatisticComponent {
  readonly title = input<string | TemplateRef<unknown>>();
  readonly value = input<number | string>(0);
  readonly prefix = input<string | TemplateRef<unknown>>();
  readonly suffix = input<string | TemplateRef<unknown>>();
  readonly valueStyle = input<Record<string, string> | null>(null);
  
  // Count up feature
  readonly countUp = input<boolean>(false);
  readonly countUpDuration = input<number>(2000); // ms
  readonly precision = input<number>(0);
  
  // Internal state
  readonly displayValue = signal<number | string>(0);
  
  private animationFrameId: number | null = null;
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  
  constructor() {
    this.destroyRef.onDestroy(() => this.cancelAnimation());
    
    effect(() => {
      const val = this.value();
      const shouldCountUp = this.countUp();
      const isBrowser = isPlatformBrowser(this.platformId);
      
      this.cancelAnimation();
      
      if (shouldCountUp && typeof val === 'number' && isBrowser) {
         this.animateCountUp(val);
      } else {
         this.displayValue.set(val);
      }
    });
  }
  
  private animateCountUp(targetValue: number): void {
     const startValue = typeof this.displayValue() === 'number' ? (this.displayValue() as number) : 0;
     const duration = this.countUpDuration();
     const startTime = performance.now();
     
     const easeOutQuart = (x: number): number => {
         return 1 - Math.pow(1 - x, 4);
     };

     const update = (currentTime: number): void => {
         const elapsed = currentTime - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const easeProgress = easeOutQuart(progress);
         
         const currentVal = startValue + (targetValue - startValue) * easeProgress;
         this.displayValue.set(currentVal);
         
         if (progress < 1) {
            this.animationFrameId = requestAnimationFrame(update);
         } else {
            this.displayValue.set(targetValue);
         }
     };
     this.animationFrameId = requestAnimationFrame(update);
  }
  
  private cancelAnimation(): void {
    if (this.animationFrameId !== null) {
       cancelAnimationFrame(this.animationFrameId);
       this.animationFrameId = null;
    }
  }

  // Type guards for templates
  isString(val: unknown): val is string {
    return typeof val === 'string';
  }
  
  isTemplateRef(val: unknown): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }
  
  isNumber(val: unknown): val is number {
    return typeof val === 'number';
  }
}
