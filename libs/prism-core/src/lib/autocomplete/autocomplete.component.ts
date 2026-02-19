import { Component, ChangeDetectionStrategy, input, model, signal, computed, output, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'prism-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="prism-autocomplete" [class.prism-autocomplete--open]="isOpen()">
      <div class="prism-input-icon-wrapper" [class.icon-right]="isLoading()">
        <input
          #inputElement
          type="text"
          class="prism-input"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="value()"
          (input)="onInput($event)"
          (keydown)="onKeyDown($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          role="combobox"
          [attr.aria-expanded]="isOpen()"
          aria-autocomplete="list"
          aria-controls="prism-autocomplete-listbox"
          [attr.aria-activedescendant]="isOpen() && activeIndex() >= 0 ? 'prism-autocomplete-option-' + activeIndex() : null"
        />
        @if (isLoading()) {
          <i class="ri-loader-4-line prism-autocomplete__loader"></i>
        }
      </div>

      @if (isOpen() && !isLoading()) {
        <ul 
          id="prism-autocomplete-listbox"
          class="prism-autocomplete__panel" 
          role="listbox"
          (mousedown)="$event.preventDefault()" 
        >
          @for (option of filteredOptions(); track option; let i = $index) {
            <li
              [id]="'prism-autocomplete-option-' + i"
              role="option"
              class="prism-autocomplete__option"
              [class.prism-autocomplete__option--active]="i === activeIndex()"
              [attr.aria-selected]="i === activeIndex()"
              (click)="selectOption(option)"
              (keydown.enter)="selectOption(option)"
              (mouseenter)="activeIndex.set(i)"
              tabindex="-1"
            >
              {{ option }}
            </li>
          } @empty {
            @if (value()) {
              <li class="prism-autocomplete__option prism-autocomplete__option--empty">
                No results found
              </li>
            }
          }
        </ul>
      }
    </div>
  `,
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismAutoCompleteComponent {
  // Inputs
  options = input<string[]>([]);
  placeholder = input<string>('Type to search...');
  disabled = input<boolean>(false);
  allowFreeText = input<boolean>(true);
  maxResults = input<number>(10);
  isLoading = input<boolean>(false);
  filterFn = input<((q: string, options: string[]) => string[]) | null>(null);
  
  // Model
  value = model<string>('');
  
  // Outputs
  selected = output<string>();
  searchChange = output<string>();
  
  // Internal State
  isOpen = signal(false);
  activeIndex = signal(-1);
  
  private elementRef = inject(ElementRef);
  
  filteredOptions = computed(() => {
    const query = this.value();
    const opts = this.options();
    const customFilter = this.filterFn();
    
    if (customFilter) {
      return customFilter(query, opts).slice(0, this.maxResults());
    }
    
    if (!query) return opts.slice(0, this.maxResults());
    
    const lowerQuery = query.toLowerCase();
    return opts
      .filter(opt => opt.toLowerCase().includes(lowerQuery))
      .slice(0, this.maxResults());
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVal = target.value;
    this.value.set(newVal);
    this.searchChange.emit(newVal);
    this.isOpen.set(true);
    this.activeIndex.set(-1);
  }

  onFocus(): void {
    if (!this.disabled()) {
      this.isOpen.set(true);
    }
  }

  onBlur(): void {
    // Panel closure is handled by onDocumentClick or explicit selection
    // Mousedown on panel prevents blur to allow selection
  }

  onDocumentClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    
    const options = this.filteredOptions();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
        } else {
          this.activeIndex.update(i => (i < options.length - 1 ? i + 1 : 0));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.activeIndex.update(i => (i > 0 ? i - 1 : options.length - 1));
        }
        break;
      case 'Enter':
        if (this.isOpen() && this.activeIndex() >= 0) {
          event.preventDefault();
          this.selectOption(options[this.activeIndex()]);
        } else if (!this.allowFreeText()) {
           // If we don't allow free text and nothing is selected, revert or clear?
           // For now, just close.
           this.isOpen.set(false);
        } else {
           this.isOpen.set(false);
        }
        break;
      case 'Escape':
        this.isOpen.set(false);
        this.activeIndex.set(-1);
        break;
      case 'Tab':
        this.isOpen.set(false);
        break;
    }
  }

  selectOption(option: string): void {
    this.value.set(option);
    this.selected.emit(option);
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }
}
