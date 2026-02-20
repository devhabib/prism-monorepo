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
  PrismTabComponent
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
    PrismTabComponent
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
}
