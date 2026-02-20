import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismCardComponent, 
  PrismSwitchComponent, 
  PrismDemoCardComponent, 
  PrismButtonComponent, 
  PrismCodeBlockComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc,
  PrismDemoSectionComponent,
  PrismDemoPageHeaderComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'prism-card-demo',
  imports: [
    CommonModule,
    FormsModule,
    PrismCardComponent,
    PrismSwitchComponent,
    PrismDemoCardComponent,
    PrismButtonComponent,
    PrismCodeBlockComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismDemoSectionComponent,
    PrismDemoPageHeaderComponent
  ],
  templateUrl: './card-demo.component.html',
  styles: [`
    .preview-container {
      width: 100%;
      max-width: 400px;
    }

    .card-image {
      margin: -1.5rem -1.5rem 1rem -1.5rem;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
      }
    }

    .configurator {
      padding: 1.5rem;
      border-top: 1px solid var(--border);
      background: var(--surface-50);
    }

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .config-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-weight: 500;
        color: var(--text-secondary);
      }
      
      select {
        padding: 0.5rem;
        border-radius: 6px;
        border: 1px solid var(--border);
        background: var(--surface-0);
      }
    }

    .hover-lift {
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }
    
    .hover-glow {
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: 0 0 15px rgba(37, 99, 235, 0.3);
        border-color: var(--primary-200);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDemoComponent {
  showImage = signal(true);
  showFooter = signal(true);
  hoverEffect = signal<'none' | 'lift' | 'glow'>('none');

  hoverEffectClass = computed(() => {
    const effect = this.hoverEffect();
    return effect === 'none' ? '' : `hover-${effect}`;
  });

  codeSnippet = computed(() => {
    return `<prism-card 
  header="Dynamic Card" 
  subheader="Interactive Demo"
  class="${this.hoverEffectClass()}">
  
  ${this.showImage() ? '<!-- Image content here -->\n  <img src="..." alt="..."/>\n' : ''}
  <p>Content...</p>
  
  ${this.showFooter() ? '<!-- Footer content here -->\n  <div class="actions">...</div>' : ''}
</prism-card>`;
  });

  simpleCardHTML = `<prism-card header="Simple Card">
  <p>This is a simple card with just a header and some text content.</p>
</prism-card>`;

  richCardHTML = `<prism-card>
  <!-- Custom Image Slot -->
  <div class="rounded-t-xl overflow-hidden -mx-6 -mt-6 mb-4">
      <img src="..." alt="Cover" class="w-full h-48 object-cover">
  </div>
  
  <h3 class="text-lg font-bold mb-1">Destination: Mars</h3>
  <p class="text-sm text-muted mb-4">Explore the red planet like never before.</p>

  <div class="flex items-center justify-between mt-4 main-content">
    <span class="text-2xl font-bold">$499</span>
    <prism-button label="Book Now" icon="rocket-line"></prism-button>
  </div>
</prism-card>`;

  apiData: ApiDoc[] = [
    { name: 'header', type: 'string', default: 'undefined', description: 'Title text to display in the card header.' },
    { name: 'subheader', type: 'string', default: 'undefined', description: 'Subtitle text to display below the header.' },
    { name: 'bordered', type: 'boolean', default: 'true', description: 'Whether to show the card border.' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Whether to apply hover lift effect (simplified input).' },
  ];
}
