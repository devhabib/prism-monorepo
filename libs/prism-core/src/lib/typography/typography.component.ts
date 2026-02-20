
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  signal,
  ElementRef,
  viewChild,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismIconComponent } from '../icon/icon.component';

@Component({
  selector: 'prism-typography',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './typography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.prism-typography]': 'true',
    '[class.prism-typography-nopadding]': 'nopadding()',
    '[style.margin-bottom]': 'nopadding() ? "0" : null'
  }
})
export class PrismTypographyComponent {
  nopadding = input<boolean>(false);
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: `
    h1[prism-title], 
    h2[prism-title], 
    h3[prism-title], 
    h4[prism-title],
    h5[prism-title],
    h6[prism-title]
  `,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrl: './typography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.prism-typography]': 'true',
    '[class.prism-typography-disabled]': 'disabled()'
  }
})
export class PrismTitleComponent {
  level = input<number>(1);
  disabled = input<boolean>(false);
}

@Component({
  selector: 'span[prism-text], prism-text',
  imports: [CommonModule, PrismIconComponent, FormsModule],
  styleUrl: './typography.component.scss',
  template: `
    @if (editing()) {
       <div class="prism-typography-edit-content">
        <textarea
          #textarea
          [ngModel]="content()"
          (ngModelChange)="onContentChange($event)"
          (blur)="confirmEdit()"
          (keydown.enter)="onEnter($event)"
          rows="1"
        ></textarea>
        <prism-icon 
            name="check-line" 
            class="prism-typography-edit-content-confirm"
            (click)="confirmEdit()"
            (mousedown)="$event.preventDefault()" 
        ></prism-icon>
       </div>
    } @else {
      <ng-content></ng-content>
      @if (editable()) {
        <span 
            class="prism-typography-edit" 
            (click)="onEditClick()"
            tabindex="0"
            role="button"
            aria-label="Edit"
        >
            <prism-icon name="edit-line"></prism-icon>
        </span>
      }
      @if (copyable() !== false && copyable() !== undefined) {
        <span 
            class="prism-typography-copy" 
            [class.prism-typography-copy-success]="copied()"
            (click)="onCopyClick()"
            tabindex="0"
            role="button"
            [attr.aria-label]="copied() ? 'Copied' : 'Copy'"
        >
            <prism-icon [name]="copied() ? 'check-line' : 'file-copy-line'"></prism-icon>
        </span>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.prism-typography]': 'true',
    '[class.prism-typography-secondary]': 'type() === "secondary"',
    '[class.prism-typography-warning]': 'type() === "warning"',
    '[class.prism-typography-danger]': 'type() === "danger"',
    '[class.prism-typography-success]': 'type() === "success"',
    '[class.prism-typography-disabled]': 'disabled()',
    '[class.prism-typography-edit-content]': 'editing()',
    
    // Tag styles
    'class': 'prism-typography', 
    '[class.prism-typography-underline]': 'underline()',
    '[class.prism-typography-deleted]': 'deleted()',
    '[class.prism-typography-strong]': 'strong()',
    '[class.prism-typography-italic]': 'italic()',
    '[class.prism-typography-mark]': 'mark()',
    '[class.prism-typography-code]': 'code()',
    '[class.prism-typography-kbd]': 'keyboard()',
    
    // Element Specific classes (if not used as attributes on native elements)
    // Note: The selector targets native elements too, so we rely on those tags often. 
    
    // Handle attributes mapping to classes if needed, 
    // but usually user puts <mark prism-text> or <span prism-text mark=true>
  }
})
export class PrismTextComponent {
  type = input<'secondary' | 'warning' | 'danger' | 'success' | undefined>(undefined);
  disabled = input<boolean>(false);
  mark = input<boolean>(false);
  code = input<boolean>(false);
  keyboard = input<boolean>(false);
  underline = input<boolean>(false);
  deleted = input<boolean>(false);
  strong = input<boolean>(false);
  italic = input<boolean>(false);
  
  copyable = input<boolean | string>(false);
  editable = input<boolean>(false);
  
  hostContent = input<string>(''); 
  
  contentChange = output<string>();

  editing = signal(false);
  copied = signal(false);
  content = signal('');

  elementRef = inject(ElementRef);
  platformId = inject(PLATFORM_ID);

  private textarea = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');

  onEditClick(): void {
    if (!this.editable()) return;
    // Capture current content
    this.content.set(this.elementRef.nativeElement.innerText.trim()); 
    this.editing.set(true);
    
    setTimeout(() => {
        this.textarea()?.nativeElement.focus();
    });
  }

  confirmEdit(): void {
    this.editing.set(false);
    this.contentChange.emit(this.content());
    // In a real app, strict content checks prevent XSS, here assuming trusted input or basic text
  }
  
  onContentChange(val: string): void {
      this.content.set(val);
  }

  onEnter(e: Event): void {
    e.preventDefault();
    this.confirmEdit();
  }

  onCopyClick(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const textToCopy = typeof this.copyable() === 'string' 
        ? (this.copyable() as string) 
        : this.elementRef.nativeElement.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}

@Component({
  selector: 'p[prism-paragraph], prism-paragraph',
  imports: [CommonModule],
  styleUrl: './typography.component.scss',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.prism-typography]': 'true',
    '[class.prism-typography-secondary]': 'type() === "secondary"',
    '[class.prism-typography-warning]': 'type() === "warning"',
    '[class.prism-typography-danger]': 'type() === "danger"',
    '[class.prism-typography-success]': 'type() === "success"',
    '[class.prism-typography-disabled]': 'disabled()',
    '[class.prism-typography-strong]': 'strong()',
    '[class.prism-typography-italic]': 'italic()',
    '[class.prism-typography-underline]': 'underline()',
    '[class.prism-typography-deleted]': 'deleted()',
  }
})
export class PrismParagraphComponent {
  type = input<'secondary' | 'warning' | 'danger' | 'success' | undefined>(undefined);
  disabled = input<boolean>(false);
  strong = input<boolean>(false);
  italic = input<boolean>(false);
  underline = input<boolean>(false);
  deleted = input<boolean>(false);
}
