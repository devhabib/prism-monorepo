import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTypographyComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-typography-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismTypographyComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './typography-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyDemoComponent {
  readonly snippets = {
    usage: `<prism-typography></prism-typography>`
  };
}
