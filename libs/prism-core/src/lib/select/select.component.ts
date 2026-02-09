import { Component, ChangeDetectionStrategy, input, model, signal, computed, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismTagComponent } from '../tag/tag.component';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'prism-select',
  standalone: true,
  imports: [CommonModule, FormsModule, PrismTagComponent],
  template: `
    @if (mode() === 'native') {
      <!-- Native Select -->
      <select 
        class="prism-select-native"
        [value]="value()"
        [multiple]="multiple()"
        (change)="onNativeChange($event)">
        <option value="" disabled>{{ placeholder() }}</option>
        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    } @else {
      <!-- Custom Select -->
      <div class="prism-select" [class.prism-select--open]="isOpen()">
        <!-- Trigger for single select -->
        @if (!multiple()) {
          <button 
            type="button"
            class="prism-select__trigger"
            (click)="toggleDropdown()"
            [attr.aria-expanded]="isOpen()">
            <div class="prism-select__value">
              @if (selectedOptions().length > 0) {
                <span>{{ selectedOptions()[0].label }}</span>
              } @else {
                <span class="prism-select__placeholder">{{ placeholder() }}</span>
              }
            </div>
            <i class="ri-arrow-down-s-line prism-select__arrow"></i>
          </button>
        } @else {
          <!-- Searchable trigger for multi-select -->
          <div 
            class="prism-select__trigger prism-select__trigger--searchable"
            (click)="openDropdown()">
            <div class="prism-select__value">
              @if (selectedOptions().length > 0) {
                <div class="prism-select__tags">
                  @for (option of selectedOptions(); track option.value) {
                    <prism-tag 
                      [label]="option.label" 
                      [removable]="true"
                      (onRemove)="removeOption(option.value)" />
                  }
                </div>
              }
              <input 
                #searchInput
                type="text"
                class="prism-select__search-trigger"
                [placeholder]="selectedOptions().length === 0 ? placeholder() : ''"
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                (click)="openDropdown()"
                (focus)="openDropdown()"
              />
            </div>
            @if (searchQuery()) {
              <button 
                type="button"
                class="prism-select__clear"
                (click)="clearSearch(); $event.stopPropagation()"
                aria-label="Clear search">
                <i class="ri-close-line"></i>
              </button>
            }
            <i class="ri-arrow-down-s-line prism-select__arrow"></i>
          </div>
        }
        
        @if (isOpen()) {
          <div class="prism-select__dropdown" (click)="onDropdownClick($event)">
            <!-- Search for single select only -->
            @if (searchable() && !multiple()) {
              <div class="prism-select__search">
                <input 
                  #singleSearchInput
                  type="text"
                  class="prism-select__search-input"
                  placeholder="Search..."
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                  (click)="$event.stopPropagation()"
                />
                @if (searchQuery()) {
                  <button 
                    type="button"
                    class="prism-select__clear prism-select__clear--search"
                    (click)="clearSearch(); $event.stopPropagation()"
                    aria-label="Clear search">
                    <i class="ri-close-line"></i>
                  </button>
                }
              </div>
            }
            <ul class="prism-select__options">
              @for (option of filteredOptions(); track option.value) {
                <li 
                  class="prism-select__option"
                  [class.prism-select__option--selected]="isSelected(option.value)"
                  (click)="selectOption(option)">
                  @if (multiple()) {
                    <span class="prism-select__checkbox">
                      @if (isSelected(option.value)) {
                        <i class="ri-checkbox-line"></i>
                      } @else {
                        <i class="ri-checkbox-blank-line"></i>
                      }
                    </span>
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
        }
      </div>
    }
  `,
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismSelectComponent {
  options = input<SelectOption[]>([]);
  placeholder = input<string>('Select...');
  mode = input<'native' | 'custom'>('custom');
  searchable = input<boolean>(false);
  multiple = input<boolean>(false);
  closeOnOutsideClick = input<boolean>(true);
  
  value = model<any | any[]>(null);
  
  isOpen = signal(false);
  searchQuery = signal('');
  
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  singleSearchInput = viewChild<ElementRef<HTMLInputElement>>('singleSearchInput');
  
  private hostElement = ElementRef;
  
  constructor(private elementRef: ElementRef) {
    // Auto-focus search input when dropdown opens
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => {
          if (this.multiple()) {
            this.searchInput()?.nativeElement.focus();
          } else if (this.searchable()) {
            this.singleSearchInput()?.nativeElement.focus();
          }
        }, 0);
      }
    });
  }
  
  selectedOptions = computed(() => {
    const val = this.value();
    const opts = this.options();
    
    if (this.multiple()) {
      const values = Array.isArray(val) ? val : [];
      return opts.filter(opt => values.includes(opt.value));
    } else {
      return val ? opts.filter(opt => opt.value === val) : [];
    }
  });
  
  filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const opts = this.options();
    
    if (!query) return opts;
    
    return opts.filter(opt => 
      opt.label.toLowerCase().includes(query)
    );
  });

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.searchQuery.set('');
    }
  }

  openDropdown(): void {
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchInput()?.nativeElement.focus();
  }

  onDropdownClick(event: Event): void {
    event.stopPropagation();
  }

  onDocumentClick(event: Event): void {
    if (!this.closeOnOutsideClick()) return;
    
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.isOpen.set(false);
      this.searchQuery.set('');
    }
  }

  selectOption(option: SelectOption): void {
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? [...this.value()] : [];
      const index = current.indexOf(option.value);
      
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(option.value);
      }
      
      this.value.set(current);
      // Keep dropdown open for multi-select
      this.searchQuery.set('');
      
      // Focus back on search input if available
      setTimeout(() => {
        this.searchInput()?.nativeElement.focus();
      }, 0);
    } else {
      this.value.set(option.value);
      this.isOpen.set(false);
      this.searchQuery.set('');
    }
  }

  removeOption(optionValue: any): void {
    if (this.multiple()) {
      const current = Array.isArray(this.value()) ? [...this.value()] : [];
      const index = current.indexOf(optionValue);
      
      if (index > -1) {
        current.splice(index, 1);
        this.value.set(current);
      }
    }
  }

  isSelected(optionValue: any): boolean {
    if (this.multiple()) {
      const values = Array.isArray(this.value()) ? this.value() : [];
      return values.includes(optionValue);
    } else {
      return this.value() === optionValue;
    }
  }

  onNativeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    
    if (this.multiple()) {
      const selected = Array.from(target.selectedOptions).map(opt => opt.value);
      this.value.set(selected);
    } else {
      this.value.set(target.value);
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
