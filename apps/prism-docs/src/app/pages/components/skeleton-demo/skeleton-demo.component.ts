import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSkeletonComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-skeleton-demo',
  imports: [
    CommonModule, 
    PrismSkeletonComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './skeleton-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
  readonly snippets = {
    usage: `<prism-skeleton></prism-skeleton>
<prism-skeleton width="300px"></prism-skeleton>
<prism-skeleton variant="circle" width="80px" height="80px"></prism-skeleton>`,
    variants: `<prism-skeleton variant="text" width="100%"></prism-skeleton>
<prism-skeleton variant="rect" width="100%" height="200px"></prism-skeleton>
<prism-skeleton variant="circle" width="60px" height="60px"></prism-skeleton>`
  };
}
