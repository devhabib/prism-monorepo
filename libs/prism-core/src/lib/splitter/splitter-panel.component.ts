import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  signal, 
  HostBinding, 
  output, 
  ElementRef,
  inject,
  forwardRef,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismSplitterComponent } from './splitter.component';

@Component({
  selector: 'prism-splitter-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-splitter-panel-content">
      <ng-content></ng-content>
    </div>
    @if (showHandle() && resizable()) {
      <div 
        class="prism-splitter-handle" 
        [class.prism-splitter-handle-vertical]="isVertical()"
        (mousedown)="onMousedown($event)"
      >
        <div class="prism-splitter-handle-bar">
          <div class="prism-splitter-handle-grabber"></div>
          @if (handleLabel() || handleTemplate()) {
            <div class="prism-splitter-handle-content">
              @if (handleTemplate()) {
                <ng-container [ngTemplateOutlet]="handleTemplate()!"></ng-container>
              } @else {
                <span>{{ handleLabel() }}</span>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      overflow: visible; /* Allow handles to overlap boundaries */
      position: relative;
    }
    .prism-splitter-panel-content {
      height: 100%;
      width: 100%;
      overflow: auto; /* Content handles its own scrolling */
    }
    .prism-splitter-handle {
      position: absolute;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        .prism-splitter-handle-bar {
          background: var(--primary-500);
          box-shadow: 0 0 12px var(--primary-300);
          height: 100%; /* Interactive fill on hover? No, keep it as a bar but more prominent */
        }
        .prism-splitter-handle-grabber {
          background: white;
          opacity: 1;
        }
        .prism-splitter-handle-content {
          color: var(--primary-700);
          background: rgba(255, 255, 255, 0.9);
          border-radius: 4px;
          padding: 2px 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      }

      &.prism-splitter-handle-vertical {
        width: 100%;
        height: 20px; /* Increased hit area */
        bottom: -10px;
        left: 0;
        cursor: row-resize;

        .prism-splitter-handle-bar {
          width: 64px;
          height: 6px;
          border-radius: 3px;
        }
        .prism-splitter-handle-content {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%); /* Perfectly centered */
        }
      }

      &:not(.prism-splitter-handle-vertical) {
        width: 20px; /* Increased hit area */
        height: 100%;
        right: -10px;
        top: 0;
        cursor: col-resize;

        .prism-splitter-handle-bar {
          width: 6px;
          height: 64px;
          border-radius: 3px;
        }
        .prism-splitter-handle-content {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg); /* Perfectly centered and rotated */
        }
      }
    }
    .prism-splitter-handle-bar {
      background: var(--surface-300);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: inherit;
    }
    .prism-splitter-handle-grabber {
      width: 2px;
      height: 2px;
      background: var(--surface-500);
      border-radius: 50%;
      box-shadow: 0 4px 0 var(--surface-500), 0 -4px 0 var(--surface-500);
      transition: inherit;
      opacity: 0.6;
    }
    .prism-splitter-handle-vertical .prism-splitter-handle-grabber {
      box-shadow: 4px 0 0 var(--surface-500), -4px 0 0 var(--surface-500);
    }
    .prism-splitter-handle-content {
      position: absolute; /* Changed to absolute for centering */
      font-size: 10px;
      font-weight: 700;
      color: var(--surface-600);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      user-select: none;
      pointer-events: none;
      white-space: nowrap;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSplitterPanelComponent {
  size = input<string | number>();
  min = input<string | number>(0);
  max = input<string | number>('100%');
  resizable = input<boolean>(true);
  collapsible = input<boolean>(false);
  handleLabel = input<string>();
  handleTemplate = input<TemplateRef<unknown>>();

  // Set by parent
  showHandle = signal<boolean>(false);
  isVertical = signal<boolean>(false);

  private splitter = inject(forwardRef(() => PrismSplitterComponent), { optional: true });

  readonly _currentSize = signal<string | number | undefined>(undefined);
  readonly _elRef = inject(ElementRef);

  constructor() {
    this._currentSize.set(this.size());
  }

  onMousedown(event: MouseEvent): void {
    if (this.splitter && this.resizable()) {
      this.splitter.startResize(event, this);
    }
  }

  @HostBinding('style.flex-basis')
  get flexBasis(): string {
    const s = this._currentSize();
    if (s === undefined) return 'auto';
    return typeof s === 'number' ? `${s}px` : s;
  }

  @HostBinding('style.flex-grow')
  get flexGrow(): number {
    return this._currentSize() === undefined ? 1 : 0;
  }

  @HostBinding('style.flex-shrink')
  get flexShrink(): number {
    return (this._currentSize() === undefined || this.resizable()) ? 1 : 0;
  }
}
