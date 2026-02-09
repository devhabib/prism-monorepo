import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismAvatarComponent, PrismTableComponent, PrismColumn, PrismCodeBlockComponent } from '@prism-monorepo/prism-core';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [CommonModule, PrismAvatarComponent, PrismTableComponent, PrismCodeBlockComponent],
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <h1>Avatar</h1>
      <p class="subtitle">Displays a user's profile image or initials in various sizes and shapes.</p>
    </header>

    <div class="tabs">
      <button 
        class="tab-btn" 
        [class.active]="activeTab() === 'examples'"
        (click)="activeTab.set('examples')"
      >
        Examples
      </button>
      <button 
        class="tab-btn" 
        [class.active]="activeTab() === 'api'"
        (click)="activeTab.set('api')"
      >
        API
      </button>
    </div>

    @if (activeTab() === 'examples') {
      <div class="examples-gallery">
        
        <section class="example-section">
          <h3>Shapes</h3>
          <p>Avatars can be circular or square.</p>
          <div class="demo-row">
            <prism-avatar label="C" shape="circle" size="lg"></prism-avatar>
            <prism-avatar label="S" shape="square" size="lg"></prism-avatar>
          </div>
          <prism-code-block [code]="snippets.shapes"></prism-code-block>
        </section>

        <section class="example-section">
          <h3>Sizes</h3>
          <p>Available in 4 sizes: sm, md, lg, xl.</p>
          <div class="demo-row">
            <prism-avatar label="S" size="sm"></prism-avatar>
            <prism-avatar label="M" size="md"></prism-avatar>
            <prism-avatar label="L" size="lg"></prism-avatar>
            <prism-avatar label="XL" size="xl"></prism-avatar>
          </div>
          <prism-code-block [code]="snippets.sizes"></prism-code-block>
        </section>

        <section class="example-section">
          <h3>Images & Fallbacks</h3>
          <p>Displays initials if the image is missing or fails to load.</p>
          <div class="demo-row">
            <prism-avatar image="https://i.pravatar.cc/150?u=1" size="lg"></prism-avatar>
            <prism-avatar label="AB" size="lg" style="background-color: #3b82f6; color: white"></prism-avatar>
            <prism-avatar label="CD" size="lg" style="background-color: #ef4444; color: white"></prism-avatar>
          </div>
          <prism-code-block [code]="snippets.fallbacks"></prism-code-block>
        </section>

      </div>
    } @else {
      <section class="api-section">
        <h2>Component API</h2>
        <prism-table
          [data]="apiData"
          [columns]="apiCols"
          [striped]="true">
        </prism-table>
      </section>
    }
  `
})
export class AvatarDemoComponent {
  readonly activeTab = signal<'examples' | 'api'>('examples');

  readonly snippets = {
    shapes: `<prism-avatar label="C" shape="circle" size="lg"></prism-avatar>
<prism-avatar label="S" shape="square" size="lg"></prism-avatar>`,
    sizes: `<prism-avatar label="S" size="sm"></prism-avatar>
<prism-avatar label="M" size="md"></prism-avatar>
<prism-avatar label="L" size="lg"></prism-avatar>
<prism-avatar label="XL" size="xl"></prism-avatar>`,
    fallbacks: `<prism-avatar image="https://i.pravatar.cc/150?u=1" size="lg"></prism-avatar>
<prism-avatar label="AB" size="lg" style="background-color: #3b82f6;"></prism-avatar>`
  };

  readonly apiData: {name: string; type: string; default: string; description: string}[] = [
    { name: 'image', type: 'string | null', default: 'null', description: 'URL of the image to display.' },
    { name: 'label', type: 'string | null', default: 'null', description: 'Text to display if no image (e.g. initials).' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the avatar.' },
    { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the avatar.' },
  ];

  readonly apiCols: PrismColumn<{name: string; type: string; default: string; description: string}>[] = [
    { key: 'name', header: 'Name' },
    { key: 'type', header: 'Type' },
    { key: 'default', header: 'Default' },
    { key: 'description', header: 'Description' },
  ];
}
