import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  output, 
  signal, 
  contentChildren, 
  ElementRef, 
  OnDestroy, 
  viewChild,
  inject,
  PLATFORM_ID,
  forwardRef,
  afterNextRender
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';
import { PrismAnchorLinkComponent } from './anchor-link.component';

@Component({
  selector: 'prism-anchor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-anchor" #anchorContainer>
      @if (inkBarVisible()) {
        <div 
          class="prism-anchor__ink-bar" 
          [style.top.px]="inkBarTop()" 
          [style.height.px]="inkBarHeight()">
        </div>
      }
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './anchor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAnchorComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  
  readonly container = input<string | HTMLElement | Window | undefined>(undefined);
  readonly offsetTop = input<number>(0);
  readonly targetOffset = input<number>(0);

  readonly linkClick = output<string>();
  readonly linkChange = output<string>();

  readonly activeLink = signal<string | null>(null);
  readonly inkBarTop = signal<number>(0);
  readonly inkBarHeight = signal<number>(0);
  readonly inkBarVisible = signal<boolean>(false);

  private readonly destroy$ = new Subject<void>();
  private readonly links = contentChildren(forwardRef(() => PrismAnchorLinkComponent), { descendants: true });
  private readonly anchorContainer = viewChild<ElementRef<HTMLElement>>('anchorContainer');

  constructor() {
    afterNextRender(() => {
      this.initScrollSpy();
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initScrollSpy(): void {
    const scrollContainer = this.getScrollContainer();
    if (!scrollContainer) return;

    fromEvent(scrollContainer, 'scroll')
      .pipe(
        throttleTime(50),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.checkActiveLink());
    
    // Initial check
    setTimeout(() => this.checkActiveLink(), 100);
  }

  private getScrollContainer(): HTMLElement | Window | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const c = this.container();
    if (typeof c === 'string') {
      return this.document.querySelector(c) as HTMLElement;
    }
    return c || this.document.defaultView || null;
  }

  private checkActiveLink(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const links = this.links();
    if (!links.length) return;

    let activeHref: string | null = null;
    const scrollContainer = this.getScrollContainer();
    if (!scrollContainer) return;

    const offset = this.targetOffset();
    const containerTop = this.getContainerOffset();

    for (const link of links) {
      const href = link.href();
      const element = this.document.getElementById(href.replace('#', ''));
      if (element) {
        const rect = element.getBoundingClientRect();
        // The element is active if its top is above the threshold
        if (rect.top - containerTop <= offset + 5) { // Small buffer
          activeHref = href;
        }
      }
    }

    if (activeHref !== this.activeLink()) {
      this.activeLink.set(activeHref);
      this.linkChange.emit(activeHref || '');
      this.updateInkBar();
    }
  }

  private getContainerOffset(): number {
    const container = this.getScrollContainer();
    if (!container || (typeof Window !== 'undefined' && container instanceof Window)) return 0;
    return (container as HTMLElement).getBoundingClientRect().top || 0;
  }

  updateInkBar(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const activeHref = this.activeLink();
    if (!activeHref) {
      this.inkBarVisible.set(false);
      return;
    }

    const activeLinkComponent = this.links().find(l => l.href() === activeHref);
    if (activeLinkComponent) {
      const linkEl = activeLinkComponent.elementRef.nativeElement.querySelector('.prism-anchor-link');
      const containerEl = this.anchorContainer()?.nativeElement;
      
      if (linkEl && containerEl) {
        const linkRect = linkEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        
        this.inkBarTop.set(linkRect.top - containerRect.top);
        this.inkBarHeight.set(linkRect.height);
        this.inkBarVisible.set(true);
      }
    }
  }

  handleLinkClick(href: string): void {
    this.linkClick.emit(href);
    this.scrollToTarget(href);
  }

  private scrollToTarget(href: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const targetId = href.startsWith('#') ? href.substring(1) : href;
    const target = this.document.getElementById(targetId);
    
    if (target) {
      const scrollContainer = this.getScrollContainer();
      if (!scrollContainer) return;

      const win = this.document.defaultView;
      if (!win) return;

      if (typeof Window !== 'undefined' && scrollContainer instanceof Window) {
        const rect = target.getBoundingClientRect();
        const top = rect.top + (win.scrollY || win.pageYOffset) - this.targetOffset();
        win.scrollTo({
          top,
          behavior: 'smooth'
        });
      } else {
        const rect = target.getBoundingClientRect();
        const containerRect = (scrollContainer as HTMLElement).getBoundingClientRect();
        const top = (scrollContainer as HTMLElement).scrollTop + (rect.top - containerRect.top) - this.targetOffset();
        
        (scrollContainer as HTMLElement).scrollTo({
          top,
          behavior: 'smooth'
        });
      }

      // Explicitly set active link on click for immediate feedback
      this.activeLink.set(href);
      this.updateInkBar();
    }
  }
}
