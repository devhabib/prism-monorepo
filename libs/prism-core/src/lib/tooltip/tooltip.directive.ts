import { 
  Directive, 
  ElementRef, 
  HostListener, 
  input, 
  Renderer2, 
  inject,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  PLATFORM_ID,
  NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PrismTooltipComponent } from './tooltip.component';

@Directive({
  selector: '[prismTooltip]',
  standalone: true,
})
export class PrismTooltipDirective implements OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  
  /** The content to display in the tooltip */
  text = input.required<string | TemplateRef<void>>({ alias: 'prismTooltip' });
  
  /** Preferred position of the tooltip */
  position = input<'top' | 'bottom' | 'left' | 'right'>('top', { alias: 'tooltipPosition' });

  /** Trigger type */
  trigger = input<'hover' | 'focus' | 'click'>('hover', { alias: 'tooltipTrigger' });

  private componentRef: ComponentRef<PrismTooltipComponent> | null = null;
  private isVisible = false;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.trigger() === 'hover') this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.trigger() === 'hover') this.hide();
  }

  @HostListener('focusin')
  onFocus(): void {
    if (this.trigger() === 'focus') this.show();
  }

  @HostListener('focusout')
  onBlur(): void {
    if (this.trigger() === 'focus') this.hide();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.trigger() === 'click') {
      event.stopPropagation();
      this.toggle();
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.trigger() === 'click' && this.isVisible) {
      this.hide();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private toggle(): void {
    this.isVisible ? this.hide() : this.show();
  }

  private show(): void {
    if (this.isVisible || !this.text()) return;
    
    this.isVisible = true;
    this.componentRef = this.viewContainerRef.createComponent(PrismTooltipComponent);
    
    // BETTER POSITIONING LOGIC
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.componentRef.location.nativeElement.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    const gap = 8;

    switch (this.position()) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    // --- VIEWPORT BOUNDARY CHECK (Simple) ---
    if (left < 0) left = 10;
    if (top < 0) top = 10;

    this.componentRef.setInput('text', this.text());
    this.componentRef.setInput('position', this.position());
    
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'left', `${left}px`);

    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('scroll', this.onResize, true);
      });
    }
  }

  private hide(): void {
    if (!this.isVisible) return;
    this.isVisible = false;
    
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onResize, true);
    }
  }

  private onResize = (): void => {
    if (this.isVisible) {
      this.show(); // Re-calculate
    }
  };

  private updatePosition(): void {
    // Logic merged into show for simplicity or kept if needed. 
    // The prompt suggested refining showTooltip/show logic.
  }

  private destroy(): void {
    this.hide();
  }
}
