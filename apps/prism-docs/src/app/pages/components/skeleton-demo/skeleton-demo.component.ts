import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismSkeletonComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
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
    PrismTabComponent,
    ApiTableComponent
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

  readonly apiData = [
    { name: 'active', type: 'boolean', default: 'true', description: 'Show animation effect' },
    { name: 'variant', type: "'text' | 'rect' | 'circle'", default: "'text'", description: 'The variant of the skeleton' },
    { name: 'width', type: 'string', default: "''", description: 'Width of the skeleton' },
    { name: 'height', type: 'string', default: "''", description: 'Height of the skeleton' },
    { name: 'round', type: 'boolean', default: 'false', description: 'Whether the skeleton has fully rounded corners' }
  ];
}
