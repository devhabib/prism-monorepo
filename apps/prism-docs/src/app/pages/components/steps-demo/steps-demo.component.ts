import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismStepsComponent, 
  PrismStepComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismButtonComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-steps-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismStepsComponent, 
    PrismStepComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismButtonComponent,
    ApiTableComponent
  ],
  templateUrl: './steps-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsDemoComponent {
  current = signal(0);

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
    vertical: `<prism-steps direction="vertical" [current]="1">
  <prism-step title="Finished" description="This is a description."></prism-step>
  <prism-step title="In Progress" description="This is a description."></prism-step>
  <prism-step title="Waiting" description="This is a description."></prism-step>
</prism-steps>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'current', type: 'number', default: '0', description: 'Current step, counting from 0.' },
    { name: 'direction', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Set steps direction.' },
    { name: 'status', type: `'wait' | 'process' | 'finish' | 'error'`, default: `'process'`, description: 'Set current step status.' },
  ];

  readonly stepApiData: ApiDoc[] = [
    { name: 'title', type: 'string', default: "''", description: 'Title of the step.' },
    { name: 'description', type: 'string', default: "''", description: 'Description of the step.' },
    { name: 'status', type: `'wait' | 'process' | 'finish' | 'error'`, default: `'wait'`, description: 'Status of the step.' },
  ];
}
