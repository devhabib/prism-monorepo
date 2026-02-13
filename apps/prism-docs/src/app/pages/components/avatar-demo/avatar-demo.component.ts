import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAvatarComponent, 
  PrismCodeBlockComponent, 
  ApiTableComponent, 
  ApiDoc,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismAvatarComponent, 
    PrismCodeBlockComponent, 
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {
  readonly snippets = {
    shapes: `<prism-avatar label="C" shape="circle" size="lg"></prism-avatar>
<prism-avatar label="S" shape="square" size="lg"></prism-avatar>`,
    sizes: `<prism-avatar label="S" size="sm"></prism-avatar>
<prism-avatar label="M" size="md"></prism-avatar>
<prism-avatar label="L" size="lg"></prism-avatar>
<prism-avatar label="XL" size="xl"></prism-avatar>`,
    fallbacks: `<prism-avatar image="https://i.pravatar.cc/150?u=1" size="lg"></prism-avatar>
<prism-avatar label="AB" size="lg" style="background-color: #3b82f6; color: white"></prism-avatar>
<prism-avatar label="CD" size="lg" style="background-color: #ef4444; color: white"></prism-avatar>`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'image', type: 'string | null', default: 'null', description: 'URL of the image to display.' },
    { name: 'label', type: 'string | null', default: 'null', description: 'Text to display if no image (e.g. initials).' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the avatar.' },
    { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the avatar.' },
  ];
}
