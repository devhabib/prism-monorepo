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
  OnDestroy
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'prism-menu-item',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'prism-menu-item',
    '[class.disabled]': 'disabled()',
    'role': 'menuitem',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
  },
})
export class PrismMenuItemComponent {
  readonly disabled = input<boolean>(false);
}

@Component({
  selector: 'prism-dropdown-menu',
  standalone: true,
  imports: [],
  template: `
    <div class="prism-dropdown-content">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'prismDropdownMenu',
  host: {
    'class': 'prism-dropdown-menu',
    '[class.visible]': 'visible()',
    'role': 'menu',
    '(click)': 'onInternalClick($event)'
  }
})
export class PrismDropdownMenuComponent {
  readonly elementRef = inject(ElementRef);
  private readonly _visible = signal(false);
  
  readonly visible = this._visible.asReadonly();
  readonly isOpen = this.visible;

  show(): void {
    this._visible.set(true);
  }

  hide(): void {
    this._visible.set(false);
  }

  toggle(): void {
    this._visible.update(v => !v);
  }

  onInternalClick(event: MouseEvent): void {
    // Prevent closing when clicking inside the menu
    event.stopPropagation();
  }
}

export type PrismDropdownPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

@Directive({
  selector: '[prismDropdown]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismDropdownTriggerDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly menu = input.required<any>({ alias: 'prismDropdown' });
  readonly trigger = input<'click' | 'hover'>('hover');
  readonly placement = input<PrismDropdownPlacement>('bottomLeft');

  private _hoverTimeout?: ReturnType<typeof setTimeout>;
  private _isMenuMoved = false;
  private _unlistenMenuEnter?: () => void;
  private _unlistenMenuLeave?: () => void;

  constructor() {
    afterNextRender(() => {
      this.initMenuElement();
    });
  }


  private initMenuElement(): void {
    if (this._isMenuMoved || !this.menu() || !this.menu().elementRef) return;

    const menuEl = this.menu().elementRef.nativeElement;
    if (!menuEl) return;

    this.renderer.setStyle(menuEl, 'position', 'absolute');
    this.renderer.setStyle(menuEl, 'z-index', '1050');
    
    // Safety check: only append if not already in body
    if (menuEl.parentNode !== this.document.body) {
      this.renderer.appendChild(this.document.body, menuEl);
    }
    this._isMenuMoved = true;

    // Add listeners to the menu element for safe hover
    if (this._unlistenMenuEnter) {
      this._unlistenMenuEnter();
    }
    if (this._unlistenMenuLeave) {
      this._unlistenMenuLeave();
    }

    this._unlistenMenuEnter = this.renderer.listen(menuEl, 'mouseenter', () => {
      if (this.trigger() === 'hover') {
        this.clearCloseTimer();
      }
    });

    this._unlistenMenuLeave = this.renderer.listen(menuEl, 'mouseleave', () => {
      if (this.trigger() === 'hover') {
        this.startCloseTimer();
      }
    });
  }

  onClick(event: MouseEvent): void {
    if (this.trigger() === 'click') {
      event.stopPropagation();
      const menu = this.menu();
      if (menu && typeof menu.visible === 'function' && menu.visible()) {
        menu.hide();
      } else {
        this.showMenu();
      }
    }
  }

  onMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.clearCloseTimer();
      this.showMenu();
    }
  }

  onMouseLeave(): void {
    if (this.trigger() === 'hover') {
      this.startCloseTimer();
    }
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
      const menu = this.menu();
      if (menu && typeof menu.hide === 'function') {
        menu.hide();
      }
    }, 200);
  }

  ngOnDestroy(): void {
    this.clearCloseTimer();
    if (this._unlistenMenuEnter) {
      this._unlistenMenuEnter();
    }
    if (this._unlistenMenuLeave) {
      this._unlistenMenuLeave();
    }
  }

  onDocumentClick(event: MouseEvent): void {
    const menu = this.menu();
    if (menu && typeof menu.visible === 'function' && menu.visible()) {
      const menuEl = menu.elementRef?.nativeElement;
      const clickedInsideTrigger = this.elementRef.nativeElement.contains(event.target);
      const clickedInsideMenu = menuEl?.contains(event.target);
      
      if (!clickedInsideTrigger && !clickedInsideMenu) {
        menu.hide();
      }
    }
  }

  private showMenu(): void {
    const menu = this.menu();
    if (!menu) return;

    if (isPlatformBrowser(this.platformId)) {
      // Ensure menu is moved and styles applied before calculating position
      this.initMenuElement();
      this.updatePosition();
    }
    
    if (typeof menu.show === 'function') {
      menu.show();
    }
  }

  private updatePosition(): void {
    const win = this.document.defaultView;
    const menu = this.menu();
    if (!win || !menu || !menu.elementRef) return;

    const triggerEl = this.elementRef.nativeElement;
    const menuEl = menu.elementRef.nativeElement;
    
    // We need to make it visible but transparent to measure it if it's not already visible
    const isAlreadyVisible = typeof menu.visible === 'function' && menu.visible();
    if (!isAlreadyVisible) {
      this.renderer.setStyle(menuEl, 'visibility', 'hidden');
      this.renderer.setStyle(menuEl, 'display', 'block');
    }

    const triggerRect = triggerEl.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();

    if (!isAlreadyVisible) {
      this.renderer.removeStyle(menuEl, 'visibility');
      this.renderer.removeStyle(menuEl, 'display');
    }

    const viewportWidth = win.innerWidth;
    const viewportHeight = win.innerHeight;
    const scrollX = win.scrollX || win.pageXOffset;
    const scrollY = win.scrollY || win.pageYOffset;

    let top = 0;
    let left = 0;
    let currentPlacement = this.placement();

    // Check for vertical space and flip if necessary
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (currentPlacement.startsWith('bottom') && spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
      currentPlacement = currentPlacement.replace('bottom', 'top') as PrismDropdownPlacement;
    } else if (currentPlacement.startsWith('top') && spaceAbove < menuRect.height && spaceBelow > spaceAbove) {
      currentPlacement = currentPlacement.replace('top', 'bottom') as PrismDropdownPlacement;
    }

    // Calculate vertical position (absolute to document)
    if (currentPlacement.startsWith('bottom')) {
      top = triggerRect.bottom + scrollY;
    } else {
      top = triggerRect.top + scrollY - menuRect.height;
    }

    // Calculate horizontal position (absolute to document)
    if (currentPlacement.endsWith('Left')) {
      left = triggerRect.left + scrollX;
      // Safety check for right boundary
      if (left + menuRect.width > viewportWidth + scrollX) {
        left = Math.max(scrollX, viewportWidth + scrollX - menuRect.width - 8);
      }
    } else {
      left = triggerRect.right + scrollX - menuRect.width;
      // Safety check for left boundary
      if (left < scrollX) {
        left = scrollX + 8;
      }
    }

    this.renderer.setStyle(menuEl, 'top', `${top}px`);
    this.renderer.setStyle(menuEl, 'left', `${left}px`);
    this.renderer.setStyle(menuEl, 'min-width', `${triggerRect.width}px`);
    
    // Transform for animation base
    const translateY = (currentPlacement as string).startsWith('bottom') ? -10 : 10;
    this.renderer.setStyle(menuEl, '--prism-dropdown-offset', `${translateY}px`);
  }
}
