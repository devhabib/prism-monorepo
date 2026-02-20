import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismImageComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-image-demo',
  imports: [
    CommonModule, 
    PrismImageComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './image-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDemoComponent {
  readonly snippets = {
    basic: `
<prism-image 
  src="https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=800&auto=format&fit=crop" 
  width="200" 
  height="200">
</prism-image>
    `.trim(),
    error: `
<prism-image 
  src="https://error-image-url.example.com/broken.png"
  fallback="https://images.unsplash.com/photo-1682695794816-7b9da18ed470?q=80&w=800&auto=format&fit=crop"
  width="200" 
  height="200"
  [preview]="false">
</prism-image>
    `.trim()
  };

  readonly apiData = [
    { name: 'src', type: 'string', default: '-', description: 'Image source' },
    { name: 'alt', type: 'string', default: "''", description: 'Image alt text' },
    { name: 'width', type: 'string | number', default: "'100'", description: 'Image width' },
    { name: 'height', type: 'string | number', default: "'100'", description: 'Image height' },
    { name: 'fallback', type: 'string | null', default: 'null', description: 'Load failure fallback image URL' },
    { name: 'preview', type: 'boolean', default: 'true', description: 'Whether to support preview' },
  ];
}
