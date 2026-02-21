import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  signal, 
  Directive, 
  ViewEncapsulation, 
  ElementRef, 
  inject, 
  Renderer2, 
  PLATFORM_ID,
  afterNextRender,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser, CommonModule } from '@angular/common';

export type PrismPopoverPlacement = 
  'top' | 'left' | 'right' | 'bottom' | 
  'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 
  'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

@Component({
  selector: 'prism-popover',
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'prismPopover',
  host: {
    'class': 'prism-popover',
    '[class.visible]': 'visible()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class PrismPopoverComponent {
  readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  
  private readonly _visible = signal(false);
  
  readonly visible = this._visible.asReadonly();
  
  readonly title = input<string | TemplateRef<unknown>>();
  readonly content = input<string | TemplateRef<unknown>>();

  // Allows trigger to see if popover is currently being hovered
  readonly isHovered = signal(false);

  constructor() {
    afterNextRender(() => {
      // Remove SSG serialized native attributes that display as [object Object] tooltip
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'title');
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'content');
    });
  }

  show(): void {
    this._visible.set(true);
  }

  hide(): void {
    this._visible.set(false);
  }

  toggle(): void {
    this._visible.update(v => !v);
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  // Type guards for templates
  isString(val: unknown): val is string {
    return typeof val === 'string';
  }
  
  isTemplateRef(val: unknown): val is TemplateRef<unknown> {
    return val instanceof TemplateRef;
  }
}

@Directive({
  selector: '[prismPopoverTrigger]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismPopoverTriggerDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly popoverInput = input<PrismPopoverComponent | undefined>(undefined, { alias: 'prismPopoverTrigger' });
  private _manualPopover?: PrismPopoverComponent;

  get popover(): PrismPopoverComponent | undefined {
    return this._manualPopover || this.popoverInput();
  }

  set manualPopover(val: PrismPopoverComponent | undefined) {
    this._manualPopover = val;
  }
  readonly trigger = input<'click' | 'hover' | 'focus'>('hover');
  readonly placement = input<PrismPopoverPlacement>('top');

  private _hoverTimeout?: ReturnType<typeof setTimeout>;
  private _isPopoverMoved = false;

  constructor() {
    afterNextRender(() => {
      this.initPopoverElement();
    });
  }

  private initPopoverElement(): void {
    if (this._isPopoverMoved || !this.popover || !this.popover.elementRef) return;

    const popoverEl = this.popover.elementRef.nativeElement;
    if (!popoverEl) return;

    this.renderer.setStyle(popoverEl, 'position', 'absolute');
    this.renderer.setStyle(popoverEl, 'z-index', '1060');
    
    if (popoverEl.parentNode !== this.document.body) {
      this.renderer.appendChild(this.document.body, popoverEl);
    }
    this._isPopoverMoved = true;
  }

  onClick(event: MouseEvent): void {
    if (this.trigger() === 'click') {
      event.stopPropagation();
      const popover = this.popover;
      if (popover && popover.visible()) {
        popover.hide();
      } else {
        this.showPopover();
      }
    }
  }

  onMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.clearCloseTimer();
      this.showPopover();
    }
  }

  onMouseLeave(): void {
    if (this.trigger() === 'hover') {
      this.startCloseTimer();
    }
  }

  onFocus(): void {
    if (this.trigger() === 'focus') {
      this.showPopover();
    }
  }

  onBlur(): void {
    if (!this.popover) return;
    this.popover.hide();
  }

  private clearCloseTimer(): void {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = undefined;
    }
  }

  private startCloseTimer(): void {
    this.clearCloseTimer();
    this._hoverTimeout = setTimeout(() => {
      const popover = this.popover;
      if (popover && !popover.isHovered()) {
        popover.hide();
      } else if (popover && popover.isHovered()) {
        // Popover is hovered, we wait a bit and check again
        const checkHoverInterval = setInterval(() => {
           if (!popover.isHovered()) {
              popover.hide();
              clearInterval(checkHoverInterval);
           }
        }, 200);
      }
    }, 200);
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();

    if (this._isPopoverMoved && this.popover && this.popover.elementRef) {
      const popoverEl = this.popover.elementRef.nativeElement;
      if (popoverEl && popoverEl.parentNode === this.document.body) {
         try {
            this.renderer.removeChild(this.document.body, popoverEl);
         } catch {
            // safe to ignore
         }
      }
    }
  }

  onDocumentClick(event: MouseEvent): void {
    const popover = this.popover;
    const triggerType = this.trigger();
    
    // Only care about outside clicks for click trigger usually
    // But helpful for focus/hover as well if they somehow got stuck
    if (popover && popover.visible() && triggerType === 'click') {
      const popoverEl = popover.elementRef?.nativeElement;
      const clickedInsideTrigger = this.elementRef.nativeElement.contains(event.target);
      const clickedInsidePopover = popoverEl?.contains(event.target);
      
      if (!clickedInsideTrigger && !clickedInsidePopover) {
        popover.hide();
      }
    }
  }

  private showPopover(): void {
    const popover = this.popover;
    if (!popover) return;

    if (isPlatformBrowser(this.platformId)) {
      this.initPopoverElement();
      this.updatePosition();
    }
    
    popover.show();
  }

  private updatePosition(): void {
    const win = this.document.defaultView;
    const popover = this.popover;
    if (!win || !popover || !popover.elementRef) return;

    const triggerEl = this.elementRef.nativeElement;
    const popoverEl = popover.elementRef.nativeElement;
    
    const isAlreadyVisible = popover.visible();
    if (!isAlreadyVisible) {
      this.renderer.setStyle(popoverEl, 'visibility', 'hidden');
      this.renderer.setStyle(popoverEl, 'display', 'block');
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const popoverRect = popoverEl.getBoundingClientRect();
    
    if (!isAlreadyVisible) {
      this.renderer.removeStyle(popoverEl, 'visibility');
      this.renderer.removeStyle(popoverEl, 'display');
    }

    const scrollX = win.scrollX || win.pageXOffset;
    const scrollY = win.scrollY || win.pageYOffset;

    const GAP = 12;
    let top = 0;
    let left = 0;
    const currentPlacement = this.placement();

    let transformOrigin = 'bottom center';

    switch (currentPlacement) {
       case 'top':
          top = triggerRect.top - popoverRect.height - GAP;
          left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
          transformOrigin = 'bottom center';
          break;
       case 'topLeft':
          top = triggerRect.top - popoverRect.height - GAP;
          left = triggerRect.left;
          transformOrigin = 'bottom left';
          break;
       case 'topRight':
          top = triggerRect.top - popoverRect.height - GAP;
          left = triggerRect.right - popoverRect.width;
          transformOrigin = 'bottom right';
          break;
       case 'bottom':
          top = triggerRect.bottom + GAP;
          left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
          transformOrigin = 'top center';
          break;
       case 'bottomLeft':
          top = triggerRect.bottom + GAP;
          left = triggerRect.left;
          transformOrigin = 'top left';
          break;
       case 'bottomRight':
          top = triggerRect.bottom + GAP;
          left = triggerRect.right - popoverRect.width;
          transformOrigin = 'top right';
          break;
       case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.left - popoverRect.width - GAP;
          transformOrigin = 'center right';
          break;
       case 'leftTop':
          top = triggerRect.top;
          left = triggerRect.left - popoverRect.width - GAP;
          transformOrigin = 'top right';
          break;
       case 'leftBottom':
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.left - popoverRect.width - GAP;
          transformOrigin = 'bottom right';
          break;
       case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
          left = triggerRect.right + GAP;
          transformOrigin = 'center left';
          break;
       case 'rightTop':
          top = triggerRect.top;
          left = triggerRect.right + GAP;
          transformOrigin = 'top left';
          break;
       case 'rightBottom':
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.right + GAP;
          transformOrigin = 'bottom left';
          break;
    }

    top += scrollY;
    left += scrollX;

    this.renderer.setStyle(popoverEl, 'top', `${top}px`);
    this.renderer.setStyle(popoverEl, 'left', `${left}px`);
    this.renderer.setStyle(popoverEl, 'transform-origin', transformOrigin);
    
    ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'].forEach(p => {
        this.renderer.removeClass(popoverEl, `prism-popover-placement-${p}`);
    });
    this.renderer.addClass(popoverEl, `prism-popover-placement-${currentPlacement}`);
  }
}
