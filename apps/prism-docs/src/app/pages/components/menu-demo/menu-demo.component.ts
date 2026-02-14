import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismMenuComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismMenuComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './menu-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  readonly snippets = {
    usage: `<prism-menu></prism-menu>`
  };
}
