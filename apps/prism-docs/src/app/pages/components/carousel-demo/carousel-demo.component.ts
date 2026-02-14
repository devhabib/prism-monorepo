import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismCarouselComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismCarouselComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './carousel-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselDemoComponent {
  readonly snippets = {
    usage: `<prism-carousel></prism-carousel>`
  };
}
