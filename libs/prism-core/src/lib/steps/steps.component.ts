import { Component, ChangeDetectionStrategy, input, contentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismStepComponent } from './step.component';

@Component({
  selector: 'prism-steps',
  standalone: true,
  imports: [CommonModule, PrismStepComponent],
  template: `
    <div class="prism-steps" [class.prism-steps-vertical]="direction() === 'vertical'">
      @for (step of steps(); track $index) {
        <prism-step
          [title]="step.title()"
          [description]="step.description()"
          [index]="$index"
          [status]="getStepStatus($index)"
        ></prism-step>
      }
    </div>
  `,
  styleUrl: './steps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismStepsComponent {
  readonly current = input<number>(0);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly status = input<'wait' | 'process' | 'finish' | 'error'>('process');

  readonly steps = contentChildren(PrismStepComponent);

  getStepStatus(index: number): 'wait' | 'process' | 'finish' | 'error' {
    if (index < this.current()) {
      return 'finish';
    } else if (index === this.current()) {
      return this.status();
    }
    return 'wait';
  }
}
