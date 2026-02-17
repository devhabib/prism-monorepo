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
  NgZone,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PrismTooltipComponent } from './tooltip.component';

@Directive({
  selector: '[prismTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focusin)': 'onFocus()',
    '(focusout)': 'onBlur()',
    '(click)': 'onClick()'
  }
})
export class PrismTooltipDirective implements OnDestroy {
  readonly prismTooltip = input.required<string | unknown>();
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly tooltipTrigger = input<'hover' | 'click' | 'focus'>('hover');

  private _componentRef: ComponentRef<PrismTooltipComponent> | null = null;
  private _el = inject(ElementRef);
  private _appRef = inject(ApplicationRef);
  private _injector = inject(EnvironmentInjector);
  private _ngZone = inject(NgZone);
  private _document = inject(DOCUMENT);
  private _platformId = inject(PLATFORM_ID);

  private get _isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  onMouseEnter(): void { 
    if (this.tooltipTrigger() === 'hover') this.show(); 
  }
  onMouseLeave(): void { 
    if (this.tooltipTrigger() === 'hover') this.hide(); 
  }
  onFocus(): void { 
    if (this.tooltipTrigger() === 'focus') this.show(); 
  }
  onBlur(): void { 
    if (this.tooltipTrigger() === 'focus') this.hide(); 
  }
  onClick(): void {
    if (this.tooltipTrigger() === 'click') {
      if (this._componentRef) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  show(): void {
    if (!this._isBrowser || this._componentRef || !this.prismTooltip()) return;

    // 1. Create Component
    this._componentRef = createComponent(PrismTooltipComponent, {
      environmentInjector: this._injector
    });

    // 2. Set Inputs
    this._componentRef.setInput('content', this.prismTooltip());
    this._componentRef.setInput('position', this.tooltipPosition());

    // 3. Attach to Body (Floating)
    this._document.body.appendChild(this._componentRef.location.nativeElement);
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
      const win = this._document.defaultView;
      if (win) {
        win.addEventListener('scroll', this._onRefresh, true);
        win.addEventListener('resize', this._onRefresh);
      }
    });
  }

  hide(): void {
    if (!this._componentRef) return;
    
    const ref = this._componentRef;
    ref.location.nativeElement.classList.remove('visible');
    
    // Destroy after transition
    setTimeout(() => {
      try {
        this._appRef.detachView(ref.hostView);
      } catch { /* ignore */ }
      ref.destroy();
    }, 150);
    
    this._componentRef = null;

    if (this._isBrowser) {
      const win = this._document.defaultView;
      if (win) {
        win.removeEventListener('scroll', this._onRefresh, true);
        win.removeEventListener('resize', this._onRefresh);
      }
    }
  }

  private _onRefresh = (): void => {
    if (this._componentRef) {
      this.updatePosition();
    }
  }

  updatePosition(): void {
    if (!this._componentRef || !this._isBrowser) return;
    
    const win = this._document.defaultView;
    if (!win) return;

    const hostRect = this._el.nativeElement.getBoundingClientRect();
    const tooltipEl = this._componentRef.location.nativeElement;
    
    const tooltipWidth = tooltipEl.offsetWidth || 120;
    const tooltipHeight = tooltipEl.offsetHeight || 32;
    const padding = 8;
    const gap = 6;

    let top = 0;
    let left = 0;
    let pos = this.tooltipPosition();

    const calculate = (p: string): void => {
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

    const viewportWidth = win.innerWidth;
    const viewportHeight = win.innerHeight;

    // Auto-Flip (Vertical)
    if (pos === 'top' && top < padding) {
      pos = 'bottom';
      calculate(pos);
      this._componentRef.setInput('position', 'bottom');
    } else if (pos === 'bottom' && top + tooltipHeight > viewportHeight - padding) {
      pos = 'top';
      calculate(pos);
      this._componentRef.setInput('position', 'top');
    }

    // Auto-Flip (Horizontal)
    if (pos === 'left' && left < padding) {
      pos = 'right';
      calculate(pos);
      this._componentRef.setInput('position', 'right');
    } else if (pos === 'right' && left + tooltipWidth > viewportWidth - padding) {
      pos = 'left';
      calculate(pos);
      this._componentRef.setInput('position', 'left');
    }

    // Clamping
    left = Math.max(padding, Math.min(left, viewportWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, viewportHeight - tooltipHeight - padding));

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
