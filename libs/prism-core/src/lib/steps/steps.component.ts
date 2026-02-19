import { Component, ChangeDetectionStrategy, input, contentChildren, effect, model, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismStepComponent } from './step.component';

@Component({
  selector: 'prism-steps',
  imports: [CommonModule],
  template: `
    <div class="prism-steps" 
         [class.prism-steps-vertical]="direction() === 'vertical'">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './steps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class PrismStepsComponent {
  readonly current = model<number>(0);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly status = input<'wait' | 'process' | 'finish' | 'error'>('process');


  readonly steps = contentChildren(PrismStepComponent);

  constructor() {
    effect(() => {
      const steps = this.steps();
      const current = this.current();
      const globalStatus = this.status();

      steps.forEach((step, index) => {
        step.index.set(index);
        step.isLast.set(index === steps.length - 1);
        
        // Only override status if it's not manually set on the step (optional logic)
        // For simplicity and following Ant Design, parent manages status based on current index
        if (index < current) {
          step.status.set('finish');
        } else if (index === current) {
          step.status.set(globalStatus);
        } else {
          step.status.set('wait');
        }
      });
    });
  }
}
