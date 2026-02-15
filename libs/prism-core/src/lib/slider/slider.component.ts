import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'prism-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="prism-slider-container">
      <input 
        type="range" 
        class="prism-slider"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [disabled]="disabled()"
        [(ngModel)]="value"
        (input)="onInput($event)"
      >
    </div>
  `,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSliderComponent {
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  disabled = input<boolean>(false);
  
  value = model<number>(0);
  
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(Number(target.value));
  }
}
