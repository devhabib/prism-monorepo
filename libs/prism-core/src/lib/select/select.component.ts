import { Component, ChangeDetectionStrategy, input, model, signal, computed, effect, viewChild, ElementRef, inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismTagComponent } from '../tag/tag.component';
import { PrismIconComponent } from '../icon/icon.component';

export type SelectOption = {
  label: string;
  value: unknown;
};

@Component({
  selector: 'prism-select',
  imports: [CommonModule, FormsModule, PrismTagComponent, PrismIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismSelectComponent),
      multi: true
    }
  ],
  template: `
    <div 
      class="prism-select" 
      [class.prism-select--open]="isOpen()"
      [class.prism-select--disabled]="disabled()"
      [class.prism-select--multiple]="multiple()"
      [class]="'prism-select--' + size()"
    >
      <div 
        class="prism-select__trigger" 
        (click)="toggleDropdown()"
        (keydown.enter)="toggleDropdown()"
        tabindex="0"
        role="button"
        [attr.aria-expanded]="isOpen()"
      >
        <div class="prism-select__value">
          @if (multiple() && selectedOptions().length > 0) {
            <div class="prism-select__tags">
              @for (option of selectedOptions(); track option.value) {
                <prism-tag 
                  [label]="option.label" 
                  [removable]="!disabled()"
                  (remove)="removeOption(option.value)" 
                />
              }
            </div>
          }
          
          @if (searchable()) {
            <div class="prism-select__search-wrapper">
              @if (!searchQuery() && !multiple() && selectedOptions().length > 0) {
                <span class="prism-select__search-mirror">{{ selectedOptions()[0]?.label }}</span>
              }
              <input 
                #searchInput
                type="text"
                class="prism-select__search-input-trigger"
                [placeholder]="selectedOptions().length === 0 ? placeholder() : ''"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                (click)="$event.stopPropagation()"
                (focus)="openDropdown()"
                [disabled]="disabled()"
              />
            </div>
          } @else if (selectedOptions().length > 0 && !multiple()) {
             <span>{{ selectedOptions()[0]?.label }}</span>
          } @else if (selectedOptions().length === 0) {
            <span class="prism-select__placeholder">{{ placeholder() }}</span>
          }
        </div>
        
        <div class="prism-select__actions">
          @if (allowClear() && value() !== null && !disabled()) {
             <button type="button" class="prism-select__clear" (click)="clearValue(); $event.stopPropagation()" aria-label="Clear value">
                <prism-icon name="close-circle-fill" />
             </button>
          }
          <prism-icon name="arrow-down-s-line" class="prism-select__arrow" />
        </div>
      </div>

      <div class="prism-select__dropdown-container" [class.is-open]="isOpen()" [style.max-height]="maxHeight()">
        <div class="prism-select__dropdown">
          <ul class="prism-select__options">
            @for (option of filteredOptions(); track option.value) {
              <li 
                class="prism-select__option"
                [class.prism-select__option--selected]="isSelected(option.value)"
                (click)="toggleOption(option); $event.stopPropagation()"
                (keydown.enter)="toggleOption(option); $event.stopPropagation()"
                tabindex="0"
                role="option"
                [attr.aria-selected]="isSelected(option.value)"
              >
                @if (multiple()) {
                   <prism-icon 
                    [name]="isSelected(option.value) ? 'checkbox-fill' : 'checkbox-blank-line'" 
                    class="prism-select__checkbox-icon"
                   />
                }
                <span>{{ option.label }}</span>
              </li>
            } @empty {
              <li class="prism-select__option prism-select__option--empty">
                No options found
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismSelectComponent implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input<string>('Select...');
  readonly searchable = input<boolean>(false);
  readonly multiple = input<boolean>(false);
  readonly allowClear = input<boolean>(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly maxHeight = input<string>('300px');
  
  readonly value = model<unknown>(null);
  readonly disabled = model<boolean>(false);
  
  readonly isOpen = signal(false);
  readonly searchQuery = model('');
  
  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  
  private elementRef = inject(ElementRef);
  
  private onChange: (value: unknown) => void = () => {
    // Registered by ControlValueAccessor
  };
  onTouched: () => void = () => {
    // Registered by ControlValueAccessor
  };


  constructor() {
    effect(() => {
      if (this.isOpen() && this.searchable()) {
        setTimeout(() => this.searchInput()?.nativeElement.focus(), 0);
      }
    });
  }

  readonly selectedOptions = computed(() => {
    const val = this.value();
    const opts = this.options();
    if (this.multiple()) {
      const values = Array.isArray(val) ? val : [];
      return opts.filter(opt => values.includes(opt.value));
    }
    return opts.filter(opt => opt.value === val);
  });

  readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const opts = this.options();
    if (!query) return opts;
    return opts.filter(opt => opt.label.toLowerCase().includes(query));
  });

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  protected updateValue(value: unknown): void {
    this.value.set(value);
    this.onChange(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.searchQuery.set('');
    }
    this.onTouched();
  }

  openDropdown(): void {
    if (this.disabled()) return;
    this.isOpen.set(true);
  }

  toggleOption(option: SelectOption): void {
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? [...(this.value() as unknown[])] : [];
      const index = current.indexOf(option.value);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(option.value);
      }
      this.updateValue(current);
    } else {
      this.updateValue(option.value);
      this.isOpen.set(false);
      this.searchQuery.set('');
    }
  }

  removeOption(optionValue: unknown): void {
    if (this.disabled()) return;
    const current = Array.isArray(this.value()) ? [...(this.value() as unknown[])] : [];
    const index = current.indexOf(optionValue);
    if (index > -1) {
      current.splice(index, 1);
      this.updateValue(current);
    }
  }

  clearValue(): void {
    this.updateValue(this.multiple() ? [] : null);
    this.searchQuery.set('');
  }

  isSelected(optionValue: unknown): boolean {
    const val = this.value();
    if (this.multiple()) {
      return Array.isArray(val) && val.includes(optionValue);
    }
    return val === optionValue;
  }

  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isOpen()) {
      this.isOpen.set(false);
      this.searchQuery.set('');
    }
  }
}
