import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PrismTitleComponent, 
  PrismTextComponent, 
  PrismParagraphComponent,
  PrismDemoPageHeaderComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismDividerComponent
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-typography-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    PrismTitleComponent,
    PrismTextComponent,
    PrismParagraphComponent,
    PrismDemoPageHeaderComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismDividerComponent
  ],
  templateUrl: './typography-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyDemoComponent {
  editableStr = signal('This is an editable string.');
  
  readonly snippets = {
    headings: `<!-- Titles -->
<h1 prism-title [level]="1">Heading 1</h1>
<h2 prism-title [level]="2">Heading 2</h2>
<h3 prism-title [level]="3">Heading 3</h3>
<h4 prism-title [level]="4">Heading 4</h4>
<h5 prism-title [level]="5">Heading 5</h5>
<h6 prism-title [level]="6">Heading 6</h6>`,

    inline: `<!-- Inline Text Styles -->
<span prism-text>Base Text</span>
<span prism-text [strong]="true">Strong</span>
<span prism-text [italic]="true">Italic</span>
<span prism-text [underline]="true">Underline</span>
<span prism-text [deleted]="true">Deleted</span>
<span prism-text [mark]="true">Mark</span>
<span prism-text [code]="true">Code</span>
<span prism-text [keyboard]="true">Kbd</span>`,

    variants: `<!-- Text Variants -->
<span prism-text>Default</span>
<span prism-text type="secondary">Secondary</span>
<span prism-text type="success">Success</span>
<span prism-text type="warning">Warning</span>
<span prism-text type="danger">Danger</span>
<span prism-text [disabled]="true">Disabled</span>`,

    interactive: `<!-- Interactive -->
<span prism-text [copyable]="true">Copy This Text</span>
<span prism-text [editable]="true" (contentChange)="onContentChange($event)">{{ editableStr() }}</span>`,

    paragraphs: `<!-- Paragraphs -->
<prism-paragraph>
  <span prism-text [strong]="true" class="text-primary-500">Prism</span> (Default) is a comprehensive design system.
</prism-paragraph>

<prism-paragraph type="secondary">
  <span prism-text [strong]="true">Secondary:</span> Muted metadata text.
</prism-paragraph>

<prism-paragraph type="success">
  <span prism-text [strong]="true">Success:</span> Positive feedback text.
</prism-paragraph>

<prism-paragraph type="warning">
  <span prism-text [strong]="true">Warning:</span> Cautionary text.
</prism-paragraph>

<prism-paragraph type="danger">
  <span prism-text [strong]="true">Danger:</span> Critical error text.
</prism-paragraph>`
  };

  readonly apiProperties = [
    { name: 'prism-title', type: 'selector', default: '-', description: 'Applied to h1-h6 elements.' },
    { name: 'level', type: 'number', default: '1', description: 'Heading level (1-6) for visual styling independent of tag.' },
    { name: 'prism-text', type: 'selector', default: '-', description: 'Applied to span elements for inline styling.' },
    { name: 'type', type: '"secondary" | "success" | "warning" | "danger"', default: 'undefined', description: 'Semantic color variant.' },
    { name: 'strong', type: 'boolean', default: 'false', description: 'Applies font-weight: 600.' },
    { name: 'italic', type: 'boolean', default: 'false', description: 'Applies font-style: italic.' },
    { name: 'underline', type: 'boolean', default: 'false', description: 'Applies text-decoration: underline.' },
    { name: 'deleted', type: 'boolean', default: 'false', description: 'Applies text-decoration: line-through.' },
    { name: 'mark', type: 'boolean', default: 'false', description: 'Applies yellow background highlight.' },
    { name: 'code', type: 'boolean', default: 'false', description: 'Applies monospace font and background.' },
    { name: 'keyboard', type: 'boolean', default: 'false', description: 'Applies keyboard key styling.' },
    { name: 'copyable', type: 'boolean | string', default: 'false', description: 'Enables copy-to-clipboard. Pass string to copy specific text.' },
    { name: 'editable', type: 'boolean', default: 'false', description: 'Enables inline editing mode.' },
    { name: 'prism-paragraph', type: 'selector', default: '-', description: 'Paragraph container component.' },
    { name: 'contentChange', type: 'output<string>', default: '-', description: 'Emits when editable content is confirmed.' },
  ];

  onContentChange(val: string): void {
    this.editableStr.set(val);
  }
}
