import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismInputComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-input-demo',
  imports: [
    CommonModule,
    FormsModule,
    PrismInputComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './input-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  inputValue = signal('');

  readonly snippets = {
    usage: `<prism-input [(value)]="name" placeholder="Enter your name" />`,
    sizes: `
<prism-input size="sm" placeholder="Small size" />
<prism-input size="md" placeholder="Medium size" />
<prism-input size="lg" placeholder="Large size" />`,
    icons: `
<prism-input prefix="user-line" placeholder="Username" />
<prism-input suffix="search-line" placeholder="Search..." />`,
    states: `
<prism-input [error]="true" placeholder="Error state" />
<prism-input [success]="true" placeholder="Success state" />
<prism-input [disabled]="true" placeholder="Disabled input" />`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'value', type: 'model<string>', default: "''", description: 'Two-way bound value of the input.' },
    { name: 'type', type: 'input<string>', default: "'text'", description: 'HTML input type.' },
    { name: 'placeholder', type: 'input<string>', default: "''", description: 'Placeholder text.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the input is disabled.' },
    { name: 'readonly', type: 'input<boolean>', default: 'false', description: 'Whether the input is read-only.' },
    { name: 'size', type: "input<'sm' | 'md' | 'lg'>", default: "'md'", description: 'Size of the input.' },
    { name: 'error', type: "input<boolean>", default: 'false', description: 'Error validation status.' },
    { name: 'success', type: "input<boolean>", default: 'false', description: 'Success validation status.' },
    { name: 'prefix', type: 'input<string | TemplateRef>', default: 'null', description: 'Icon name or template for prefix.' },
    { name: 'suffix', type: 'input<string | TemplateRef>', default: 'null', description: 'Icon name or template for suffix.' }
  ];
}
