import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismFormComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismFormComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './form-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
  readonly snippets = {
    usage: `<prism-form></prism-form>`
  };
}
