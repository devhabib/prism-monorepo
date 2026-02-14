import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismInputDirective, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismInputDirective, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './input-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  readonly snippets = {
    usage: `<input prismInput placeholder="Enter text..." />`
  };
}
