import {
  Component,
  ChangeDetectionStrategy,
  input,
  contentChildren,
  Renderer2,
  signal,
  OnDestroy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismSplitterPanelComponent } from './splitter-panel.component';

@Component({
  selector: 'prism-splitter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-splitter" 
      [class.prism-splitter-horizontal]="orientation() === 'horizontal'"
      [class.prism-splitter-vertical]="orientation() === 'vertical'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './splitter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSplitterComponent implements OnDestroy {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  readonly panels = contentChildren(PrismSplitterPanelComponent);

  private dragListeners: (() => void)[] = [];
  private isResizing = false;

  constructor(private renderer: Renderer2) {
    // Set up panels when they change or orientation changes
    effect(() => {
      const currentPanels = this.panels();
      const isVertical = this.orientation() === 'vertical';
      
      currentPanels.forEach((panel, index) => {
        panel.isVertical.set(isVertical);
        panel.showHandle.set(index < currentPanels.length - 1);
        
        // Listen to resize start
        // Using a direct subscription or similar if we were using subjects,
        // but since we have output(), we'll handle it in the parent logic if possible.
        // Wait, contentChildren are already created. We can't easily bind to outputs in @for
        // if we are using <ng-content>.
        // Solution: Use renderer to listen to the custom event or just manually subscribe.
        // Actually, since these are components, we can just access the output emitter?
        // No, best is to use the renderer.listen on the host element if we can,
        // or just have the panels call a method on the parent!
      });
    });

    // To avoid circular or complex wiring, let's have the panels inject the parent
    // and call a method. I'll update the panel component next.
  }

  startResize(event: MouseEvent, panel: PrismSplitterPanelComponent): void {
    event.preventDefault();
    if (this.isResizing) return;
    this.isResizing = true;

    const index = this.panels().indexOf(panel);
    const panelA = panel;
    const panelB = this.panels()[index + 1];

    if (!panelB) {
      this.isResizing = false;
      return;
    }

    const startPos = this.orientation() === 'horizontal' ? event.clientX : event.clientY;
    
    const rectA = panelA._elRef.nativeElement.getBoundingClientRect();
    const rectB = panelB._elRef.nativeElement.getBoundingClientRect();

    const startSizeA = this.orientation() === 'horizontal' ? rectA.width : rectA.height;
    const startSizeB = this.orientation() === 'horizontal' ? rectB.width : rectB.height;

    const moveListener = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => {
      const currentPos = this.orientation() === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPos;
      this.resizePanels(panelA, panelB, startSizeA, startSizeB, delta);
    });

    const upListener = this.renderer.listen('window', 'mouseup', () => {
      this.isResizing = false;
      this.clearListeners();
    });

    this.dragListeners.push(moveListener, upListener);
  }

  private resizePanels(
    panelA: PrismSplitterPanelComponent, 
    panelB: PrismSplitterPanelComponent, 
    startA: number, 
    startB: number, 
    delta: number
  ): void {
    let newA = startA + delta;
    let newB = startB - delta;

    // Constraints check
    const minA = this.toPx(panelA.min(), startA + startB);
    const maxA = this.toPx(panelA.max(), startA + startB);
    const minB = this.toPx(panelB.min(), startA + startB);
    const maxB = this.toPx(panelB.max(), startA + startB);

    if (newA < minA) {
      newA = minA;
      newB = startA + startB - minA;
    } else if (newA > maxA) {
      newA = maxA;
      newB = startA + startB - maxA;
    }

    if (newB < minB) {
      newB = minB;
      newA = startA + startB - minB;
    } else if (newB > maxB) {
      newB = maxB;
      newA = startA + startB - maxB;
    }

    panelA._currentSize.set(newA);
    panelB._currentSize.set(newB);
  }

  private toPx(size: string | number, total: number): number {
    if (typeof size === 'number') return size;
    if (size.endsWith('%')) return (parseFloat(size) / 100) * total;
    return parseFloat(size) || 0;
  }

  private clearListeners(): void {
    this.dragListeners.forEach(l => l());
    this.dragListeners = [];
  }

  ngOnDestroy(): void {
    this.clearListeners();
  }
}
