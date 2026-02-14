import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismRadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'prism-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label 
      class="prism-radio-wrapper" 
      [class.is-checked]="isChecked()"
      [class.is-disabled]="isDisabled()">
      <span class="prism-radio">
        <input 
          type="radio" 
          class="radio-input" 
          [name]="group?.name() || ''"
          [value]="value()"
          [checked]="isChecked()"
          [disabled]="isDisabled()"
          (change)="onSelect($event)"
        >
        <span class="radio-inner"></span>
      </span>
      <span class="radio-label">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismRadioComponent {
  value = input<any>();
  disabled = input<boolean>(false);

  group = inject(PrismRadioGroupComponent, { optional: true });

  isChecked = computed(() => {
    if (!this.group) return false;
    return this.group.value() === this.value();
  });

  isDisabled = computed(() => {
    return this.disabled() || (this.group?.disabled() ?? false);
  });

  onSelect(event: Event): void {
    event.stopPropagation();
    if (this.group) {
      this.group.selectValue(this.value());
    }
  }
}
