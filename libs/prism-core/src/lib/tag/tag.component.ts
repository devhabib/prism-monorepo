import { Component, ChangeDetectionStrategy, input, output, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tag',
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <span 
        class="prism-tag" 
        [class.prism-tag--checkable]="checkable()"
        [class.prism-tag--checked]="checked()"
        [class.prism-tag--success]="color() === 'success'"
        [class.prism-tag--processing]="color() === 'processing'"
        [class.prism-tag--warning]="color() === 'warning'"
        [class.prism-tag--error]="color() === 'error'"
        [style.background-color]="customColor()"
        [style.border-color]="customColor()"
        [attr.tabindex]="checkable() ? 0 : null"
        (click)="handleClick($event)"
        (keydown.enter)="handleClick($event)"
        (keydown.space)="handleClick($event)"
      >
        <span class="prism-tag__label">
          <ng-content />
          @if (label()) {
            {{ label() }}
          }
        </span>
        @if (isClosable()) {
          <button 
            type="button"
            class="prism-tag__close" 
            (click)="handleClose($event)"
            aria-label="Close tag">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }
      </span>
    }
  `,
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.prism-tag-wrapper]': 'true'
  }
})
export class PrismTagComponent {
  /** Color of the tag (presets: 'success', 'processing', 'error', 'warning', 'default' or hex) */
  readonly color = input<string>('default');
  
  /** Whether the tag is checkable */
  readonly checkable = input<boolean>(false);
  
  /** Whether the tag is checked (for checkable tags) */
  readonly checked = model<boolean>(false);
  
  /** Whether the tag is visible */
  readonly visible = model<boolean>(true);
  
  /** Whether the tag can be closed */
  readonly closable = input<boolean>(false);

  /** Alias for closable to maintain backward compatibility */
  readonly removable = input<boolean>(false);

  /** Legacy label input for backward compatibility */
  readonly label = input<string>('');

  /** Callback executed when tag is closed */
  readonly closed = output<MouseEvent>();
  
  /** Alias for closed to maintain backward compatibility */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  readonly onRemove = output<MouseEvent>();

  /** Alias for closed to maintain backward compatibility */
  readonly remove = output<MouseEvent>();

  /** Callback executed when tag is clicked */
  readonly clicked = output<MouseEvent | KeyboardEvent>();

  /** Effective closable state (either closable or removable) */
  readonly isClosable = computed(() => this.closable() || this.removable());

  readonly customColor = computed(() => {
    const c = this.color();
    const presets = ['success', 'processing', 'error', 'warning', 'default'];
    return presets.includes(c) ? null : c;
  });

  handleClose(event: MouseEvent): void {
    event.stopPropagation();
    this.closed.emit(event);
    this.onRemove.emit(event);
    this.remove.emit(event);
    if (!event.defaultPrevented) {
      this.visible.set(false);
    }
  }

  handleClick(event: Event): void {
    if (this.checkable()) {
      this.checked.update(v => !v);
    }
    this.clicked.emit(event as MouseEvent | KeyboardEvent);
  }
}
