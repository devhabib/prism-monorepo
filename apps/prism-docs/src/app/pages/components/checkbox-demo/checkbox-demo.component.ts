import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismCheckboxComponent, 
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
  selector: 'app-checkbox-demo',
  imports: [
    CommonModule, 
    FormsModule,
    PrismCheckboxComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './checkbox-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDemoComponent {
  checked = signal(false);

  readonly snippets = {
    usage: `<prism-checkbox [(checked)]="checked" label="Accept terms" />`,
    states: `
<prism-checkbox [checked]="true" label="Checked" />
<prism-checkbox [disabled]="true" label="Disabled" />
<prism-checkbox [disabled]="true" [checked]="true" label="Checked & Disabled" />`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'label', type: 'input<string>', default: "''", description: 'Text label for the checkbox.' },
    { name: 'type', type: "input<'checkbox' | 'radio'>", default: "'checkbox'", description: 'Type of the input, standard or radio.' },
    { name: 'checked', type: 'model<boolean>', default: 'false', description: 'Two-way binding for checked state.' },
    { name: 'disabled', type: 'model<boolean>', default: 'false', description: 'Whether the checkbox is disabled.' }
  ];
}
