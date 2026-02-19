import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismStepsComponent, 
  PrismStepComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismButtonComponent,
  ApiTableComponent,
  ApiDoc,
  PrismSwitchComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-steps-demo',
  imports: [
    CommonModule, 
    PrismStepsComponent, 
    PrismStepComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismButtonComponent,
    ApiTableComponent,
    PrismSwitchComponent
  ],
  templateUrl: './steps-demo.component.html',
  styleUrl: './steps-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsDemoComponent {
  current = signal(0);
  isDarkMode = signal(false);

  next(): void {
    if (this.current() < 2) {
      this.current.update(c => c + 1);
    }
  }

  prev(): void {
    if (this.current() > 0) {
      this.current.update(c => c - 1);
    }
  }

  readonly snippets = {
    basic: `<prism-steps [current]="0">
  <prism-step title="Finished" description="This is a description."></prism-step>
  <prism-step title="In Progress" description="This is a description."></prism-step>
  <prism-step title="Waiting" description="This is a description."></prism-step>
</prism-steps>`,
    switch: `<prism-steps [(current)]="current">
  <prism-step title="First" description="This is a description."></prism-step>
  <prism-step title="Second" description="This is a description."></prism-step>
  <prism-step title="Third" description="This is a description."></prism-step>
</prism-steps>

<div style="margin-top: 24px;">
  <prism-button (click)="prev()" [disabled]="current() === 0">Previous</prism-button>
  <prism-button (click)="next()" [disabled]="current() === 2" variant="primary" style="margin-left: 8px;">Next</prism-button>
</div>`,
    vertical: `<prism-steps direction="vertical" [current]="1">
  <prism-step title="Finished" description="This is a description."></prism-step>
  <prism-step title="In Progress" description="This is a description."></prism-step>
  <prism-step title="Waiting" description="This is a description."></prism-step>
</prism-steps>`,

    error: `<prism-steps [current]="1" status="error">
  <prism-step title="Finished" description="This is a description."></prism-step>
  <prism-step title="Error" description="This is a description."></prism-step>
  <prism-step title="Waiting" description="This is a description."></prism-step>
</prism-steps>`,
    theming: `<div [attr.data-theme]="isDarkMode() ? 'dark' : 'light'">
  <prism-steps [current]="1">
    <prism-step title="Active" description="Currently active step."></prism-step>
    <prism-step title="Waiting" description="Next step."></prism-step>
  </prism-steps>
</div>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'current', type: 'model<number>', default: '0', description: 'Current step index, counting from 0.' },
    { name: 'direction', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Set steps direction.' },
    { name: 'status', type: `'wait' | 'process' | 'finish' | 'error'`, default: `'process'`, description: 'Set current step status.' },

  ];

  readonly stepApiData: ApiDoc[] = [
    { name: 'title', type: 'input.required<string>', default: '-', description: 'Title of the step.' },
    { name: 'description', type: 'input<string>', default: "''", description: 'Description of the step.' },
    { name: 'status', type: 'model<string>', default: `'wait'`, description: 'Status of the step. Usually managed by parent.' },
    { name: 'index', type: 'model<number>', default: '0', description: 'Step index. Usually managed by parent.' },
  ];
}
