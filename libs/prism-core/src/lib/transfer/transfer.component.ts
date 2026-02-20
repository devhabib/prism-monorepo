import { Component, ChangeDetectionStrategy, input, model, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PrismButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { PrismCheckboxComponent } from '../checkbox/checkbox.component';
import { PrismInputDirective } from '../input/input.directive';
import { PrismEmptyComponent } from '../empty/empty.component';

export type TransferItem = {
  key: string;
  label: string;
  disabled?: boolean;
};

@Component({
  selector: 'prism-transfer',
  imports: [
    CommonModule, 
    PrismButtonComponent, 
    FormsModule, 
    PrismCheckboxComponent,
    PrismInputDirective,
    PrismEmptyComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismTransferComponent),
      multi: true
    }
  ],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTransferComponent implements ControlValueAccessor {
  readonly dataSource = input<TransferItem[]>([]);
  readonly titles = input<[string, string]>(['Source', 'Target']);
  readonly showSearch = input<boolean>(false);
  readonly disabled = model<boolean>(false);
  
  readonly targetKeys = model<string[]>([]);
  
  readonly leftSearch = signal('');
  readonly rightSearch = signal('');
  
  readonly leftSelected = signal<string[]>([]);
  readonly rightSelected = signal<string[]>([]);

  private onChange: (value: string[]) => void = () => { /* noop */ };
  onTouched: () => void = () => { /* noop */ };

  // Derived collections
  readonly leftItems = computed(() => {
    const targets = new Set(this.targetKeys() || []);
    let items = this.dataSource().filter(item => !targets.has(item.key));
    const search = this.leftSearch().toLowerCase();
    if (search) {
      items = items.filter(item => item.label.toLowerCase().includes(search));
    }
    return items;
  });

  readonly rightItems = computed(() => {
    const targets = new Set(this.targetKeys() || []);
    let items = this.dataSource().filter(item => targets.has(item.key));
    const search = this.rightSearch().toLowerCase();
    if (search) {
      items = items.filter(item => item.label.toLowerCase().includes(search));
    }
    return items;
  });

  // State calculations for Checkbox All
  readonly leftCheckedAll = computed(() => {
    const items = this.leftItems().filter(i => !i.disabled);
    return items.length > 0 && items.every(i => this.leftSelected().includes(i.key));
  });

  readonly leftIndeterminate = computed(() => {
    const checkedLength = this.leftSelected().length;
    return checkedLength > 0 && !this.leftCheckedAll();
  });

  readonly rightCheckedAll = computed(() => {
    const items = this.rightItems().filter(i => !i.disabled);
    return items.length > 0 && items.every(i => this.rightSelected().includes(i.key));
  });

  readonly rightIndeterminate = computed(() => {
    const checkedLength = this.rightSelected().length;
    return checkedLength > 0 && !this.rightCheckedAll();
  });

  readonly leftMoveDisabled = computed(() => this.leftSelected().length === 0 || this.disabled());
  readonly rightMoveDisabled = computed(() => this.rightSelected().length === 0 || this.disabled());

  // Actions
  toggleLeftAll(checked: boolean): void {
    if (this.disabled()) return;
    if (checked) {
      const keys = this.leftItems().filter(i => !i.disabled).map(i => i.key);
      this.leftSelected.set(keys);
    } else {
      this.leftSelected.set([]);
    }
  }

  toggleRightAll(checked: boolean): void {
    if (this.disabled()) return;
    if (checked) {
      const keys = this.rightItems().filter(i => !i.disabled).map(i => i.key);
      this.rightSelected.set(keys);
    } else {
      this.rightSelected.set([]);
    }
  }

  toggleLeftItem(key: string): void {
    if (this.disabled()) return;
    this.leftSelected.update(keys => 
      keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]
    );
  }

  toggleRightItem(key: string): void {
    if (this.disabled()) return;
    this.rightSelected.update(keys => 
      keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]
    );
  }

  moveToRight(): void {
    if (this.leftMoveDisabled()) return;
    const selected = this.leftSelected();
    const newTargetKeys = [...(this.targetKeys() || []), ...selected];
    
    this.targetKeys.set(newTargetKeys);
    this.leftSelected.set([]);
    this.onChange(newTargetKeys);
    this.onTouched();
  }

  moveToLeft(): void {
    if (this.rightMoveDisabled()) return;
    const selected = new Set(this.rightSelected());
    const newTargetKeys = (this.targetKeys() || []).filter(k => !selected.has(k));
    
    this.targetKeys.set(newTargetKeys);
    this.rightSelected.set([]);
    this.onChange(newTargetKeys);
    this.onTouched();
  }

  // CVA
  writeValue(value: string[]): void {
    this.targetKeys.set(value || []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
