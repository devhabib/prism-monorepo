import { Component, ChangeDetectionStrategy, input, model, signal, computed, output, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CascaderOption = {
  label: string;
  value: string;
  disabled?: boolean;
  children?: CascaderOption[];
};

@Component({
  selector: 'prism-cascader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-cascader" [class.prism-cascader--open]="isOpen()" [class.prism-cascader--disabled]="disabled()">
      <button 
        type="button"
        class="prism-cascader__trigger" 
        (click)="togglePanel()"
        [disabled]="disabled()"
        [attr.aria-expanded]="isOpen()"
        aria-controls="prism-cascader-menus"
        role="combobox"
      >
        <span class="prism-cascader__label" [class.prism-cascader__label--placeholder]="!displayLabel()">
          {{ displayLabel() || placeholder() }}
        </span>
        <i class="ri-arrow-down-s-line prism-cascader__arrow"></i>
      </button>

      @if (isOpen()) {
        <div id="prism-cascader-menus" class="prism-cascader__menus" (mousedown)="$event.preventDefault()">
          @for (column of menuColumns(); track $index; let colIndex = $index) {
            <ul class="prism-cascader__menu" role="listbox">
              @for (option of column; track option.value) {
                <li
                  class="prism-cascader__option"
                  [class.prism-cascader__option--active]="isActive(option, colIndex)"
                  [class.prism-cascader__option--disabled]="option.disabled"
                  (click)="onOptionClick(option, colIndex)"
                  (mouseenter)="onOptionMouseEnter(option, colIndex)"
                  (keydown.enter)="onOptionClick(option, colIndex)"
                  role="option"
                  [attr.aria-selected]="isActive(option, colIndex)"
                  tabindex="0"
                >
                  <span class="prism-cascader__option-label">{{ option.label }}</span>
                  @if (option.children?.length) {
                    <i class="ri-arrow-right-s-line prism-cascader__option-arrow"></i>
                  }
                </li>
              }
            </ul>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./cascader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class PrismCascaderComponent {
  // Inputs
  options = input<CascaderOption[]>([]);
  placeholder = input<string>('Please select');
  disabled = input<boolean>(false);
  expandTrigger = input<'click' | 'hover'>('click');
  changeOnSelect = input<boolean>(false);
  
  // Model
  value = model<string[]>([]);
  
  // Outputs
  selectionChange = output<CascaderOption[]>();
  
  // Internal State
  isOpen = signal(false);
  activePath = signal<CascaderOption[]>([]);
  
  private elementRef = inject(ElementRef);

  constructor() {
    // Sync activePath with value on initialization
    const initialOptions = this.options();
    if (this.value().length > 0) {
      this.activePath.set(this.getPathFromValues(this.value(), initialOptions));
    }
  }

  displayLabel = computed(() => {
    const val = this.value();
    if (!val || val.length === 0) return '';
    
    const path = this.getPathFromValues(val, this.options());
    return path.map(p => p.label).join(' / ');
  });

  menuColumns = computed(() => {
    const columns: CascaderOption[][] = [this.options()];
    const currentPath = this.activePath();
    
    for (const segment of currentPath) {
      if (segment.children && segment.children.length > 0) {
        columns.push(segment.children);
      } else {
        break;
      }
    }
    
    return columns;
  });

  togglePanel(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
       // Reset activePath to current selection when opening
       this.activePath.set(this.getPathFromValues(this.value(), this.options()));
    }
  }

  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onOptionClick(option: CascaderOption, index: number): void {
    if (option.disabled) return;
    
    const newPath = [...this.activePath().slice(0, index), option];
    this.activePath.set(newPath);

    const isLeaf = !option.children || option.children.length === 0;
    
    if (isLeaf || this.changeOnSelect()) {
      this.selectPath(newPath);
      if (isLeaf) {
        this.isOpen.set(false);
      }
    }
  }

  onOptionMouseEnter(option: CascaderOption, index: number): void {
    if (option.disabled || this.expandTrigger() !== 'hover') return;
    
    const newPath = [...this.activePath().slice(0, index), option];
    this.activePath.set(newPath);
  }

  private selectPath(path: CascaderOption[]): void {
    const values = path.map(p => p.value);
    this.value.set(values);
    this.selectionChange.emit(path);
  }

  isActive(option: CascaderOption, index: number): boolean {
    const segment = this.activePath()[index];
    return segment?.value === option.value;
  }

  private getPathFromValues(values: string[], options: CascaderOption[]): CascaderOption[] {
    const path: CascaderOption[] = [];
    let currentOptions = options;
    
    for (const val of values) {
      const found = currentOptions.find(o => o.value === val);
      if (found) {
        path.push(found);
        currentOptions = found.children || [];
      } else {
        break;
      }
    }
    
    return path;
  }
}
