import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismTagComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PrismTagComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './tag-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {
  readonly snippets = {
    basic: `<prism-tag>Tag 1</prism-tag>
<prism-tag>Tag 2</prism-tag>
<prism-tag>
  <a href="https://github.com/devhabib/prism-monorepo" target="_blank">GitHub</a>
</prism-tag>`,
    colors: `<prism-tag color="success">success</prism-tag>
<prism-tag color="processing">processing</prism-tag>
<prism-tag color="warning">warning</prism-tag>
<prism-tag color="error">error</prism-tag>
<prism-tag color="#108ee9">#108ee9</prism-tag>`,
    closable: `<prism-tag [closable]="true" (closed)="onClose($event)">Closable 1</prism-tag>
<prism-tag [closable]="true" (closed)="$event.preventDefault()">Prevent Default</prism-tag>`,
    checkable: `<prism-tag [checkable]="true" [(checked)]="checked1">Checkable 1</prism-tag>
<prism-tag [checkable]="true" [(checked)]="checked2">Checkable 2</prism-tag>`
  };

  checked1 = true;
  checked2 = false;

  onClose(event: MouseEvent): void {
    console.warn('Tag closed', event);
  }

  readonly apiData = [
    { name: 'color', type: "string", default: "'default'", description: "Color of the tag (presets: 'success', 'processing', 'error', 'warning', 'default' or hex)." },
    { name: 'checkable', type: 'boolean', default: 'false', description: 'Whether the tag is checkable.' },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the tag is checked (two-way bindable).' },
    { name: 'closable', type: 'boolean', default: 'false', description: 'Whether the tag can be closed.' },
    { name: 'visible', type: 'boolean', default: 'true', description: 'Whether the tag is visible (two-way bindable).' },
    { name: 'closed', type: 'EventEmitter<MouseEvent>', default: '-', description: 'Callback executed when tag is closed.' }
  ];
}
