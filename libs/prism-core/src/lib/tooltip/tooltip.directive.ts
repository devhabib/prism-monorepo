import { 
  Directive, 
  ElementRef, 
  inject, 
  input, 
  ComponentRef, 
  createComponent, 
  EnvironmentInjector, 
  ApplicationRef, 
  OnDestroy, 
  HostListener,
  NgZone
} from '@angular/core';
import { PrismTooltipComponent } from './tooltip.component';

@Directive({
  selector: '[prismTooltip]',
  standalone: true
})
export class PrismTooltipDirective implements OnDestroy {
  readonly prismTooltip = input.required<string | any>();
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly tooltipTrigger = input<'hover' | 'click' | 'focus'>('hover');

  private _componentRef: ComponentRef<PrismTooltipComponent> | null = null;
  private _el = inject(ElementRef);
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ngZone = inject(NgZone);

  @HostListener('mouseenter') onMouseEnter() { 
    if (this.tooltipTrigger() === 'hover') this.show(); 
  }
  @HostListener('mouseleave') onMouseLeave() { 
    if (this.tooltipTrigger() === 'hover') this.hide(); 
  }
  @HostListener('focusin') onFocus() { 
    if (this.tooltipTrigger() === 'focus') this.show(); 
  }
  @HostListener('focusout') onBlur() { 
    if (this.tooltipTrigger() === 'focus') this.hide(); 
  }
  @HostListener('click') onClick() {
    if (this.tooltipTrigger() === 'click') {
      this._componentRef ? this.hide() : this.show();
    }
  }

  show() {
    if (this._componentRef || !this.prismTooltip()) return;

    // 1. Create Component
    this._componentRef = createComponent(PrismTooltipComponent, {
      environmentInjector: this._injector
    });

    // 2. Set Inputs
    this._componentRef.setInput('content', this.prismTooltip());
    this._componentRef.setInput('position', this.tooltipPosition());

    // 3. Attach to Body (Floating)
    document.body.appendChild(this._componentRef.location.nativeElement);
    this._appRef.attachView(this._componentRef.hostView);

    // 4. Calculate Position after a frame to ensure dimensions are ready
    requestAnimationFrame(() => {
      this.updatePosition();
      if (this._componentRef) {
        this._componentRef.location.nativeElement.classList.add('visible');
      }
    });

    // 5. Listen to window changes
    this._ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this._onRefresh, true);
      window.addEventListener('resize', this._onRefresh);
    });
  }

  hide() {
    if (!this._componentRef) return;
    
    const ref = this._componentRef;
    ref.location.nativeElement.classList.remove('visible');
    
    // Destroy after transition
    setTimeout(() => {
      try {
        this._appRef.detachView(ref.hostView);
      } catch (e) { /* ignore */ }
      ref.destroy();
    }, 150);
    
    this._componentRef = null;

    window.removeEventListener('scroll', this._onRefresh, true);
    window.removeEventListener('resize', this._onRefresh);
  }

  private _onRefresh = () => {
    if (this._componentRef) {
      this.updatePosition();
    }
  }

  updatePosition() {
    if (!this._componentRef) return;
    
    const hostRect = this._el.nativeElement.getBoundingClientRect();
    const tooltipEl = this._componentRef.location.nativeElement;
    
    const tooltipWidth = tooltipEl.offsetWidth || 120;
    const tooltipHeight = tooltipEl.offsetHeight || 32;
    const padding = 8;
    const gap = 6;

    let top = 0;
    let left = 0;
    let pos = this.tooltipPosition();

    const calculate = (p: string) => {
      switch (p) {
        case 'top':
          top = hostRect.top - tooltipHeight - gap;
          left = hostRect.left + (hostRect.width - tooltipWidth) / 2;
          break;
        case 'bottom':
          top = hostRect.bottom + gap;
          left = hostRect.left + (hostRect.width - tooltipWidth) / 2;
          break;
        case 'left':
          top = hostRect.top + (hostRect.height - tooltipHeight) / 2;
          left = hostRect.left - tooltipWidth - gap;
          break;
        case 'right':
          top = hostRect.top + (hostRect.height - tooltipHeight) / 2;
          left = hostRect.right + gap;
          break;
      }
    };

    calculate(pos);

    // Auto-Flip (Vertical)
    if (pos === 'top' && top < padding) {
      pos = 'bottom';
      calculate(pos);
      this._componentRef.setInput('position', 'bottom');
    } else if (pos === 'bottom' && top + tooltipHeight > window.innerHeight - padding) {
      pos = 'top';
      calculate(pos);
      this._componentRef.setInput('position', 'top');
    }

    // Auto-Flip (Horizontal)
    if (pos === 'left' && left < padding) {
      pos = 'right';
      calculate(pos);
      this._componentRef.setInput('position', 'right');
    } else if (pos === 'right' && left + tooltipWidth > window.innerWidth - padding) {
      pos = 'left';
      calculate(pos);
      this._componentRef.setInput('position', 'left');
    }

    // Clamping
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
  }

  ngOnDestroy() {
    this.hide();
  }
}
