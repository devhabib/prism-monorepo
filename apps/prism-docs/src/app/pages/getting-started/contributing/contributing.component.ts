import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismCardComponent, PrismCodeBlockComponent } from '@devynelogic/prism-core';

@Component({
  selector: 'prism-contributing',
  imports: [CommonModule, PrismCardComponent, PrismCodeBlockComponent],
  template: `
    <h1>Contributing to Prism</h1>
    <p class="text-xl text-muted mb-8">Help us build a better Angular UI library. No direct pushes allowed — Pull Requests only.</p>

    <prism-card header="1. Contribution Policy">
      <p class="mb-4">To maintain a stable and high-quality codebase, <strong>direct pushes to the <code>development</code> or <code>main</code> branches are strictly prohibited.</strong></p>
      <ul class="list-disc pl-6 space-y-2">
        <li>All work must be submitted via a Pull Request (PR) targeting the <code>development</code> branch.</li>
        <li>PRs require review and approval from the repository owner (Habib) before merging.</li>
        <li>Branch names should follow conventions: <code>feature/name</code>, <code>fix/description</code>, etc.</li>
      </ul>
    </prism-card>

    <div class="h-8"></div>

    <prism-card header="2. Local Setup & Workflow">
      <p class="mb-2">Fork & Clone the repository:</p>
      <prism-code-block code="git clone https://github.com/devhabib/prism-monorepo.git" language="bash"></prism-code-block>
      
      <p class="mt-4 mb-2">Create a branch off <code>development</code>:</p>
      <prism-code-block code="git checkout development&#10;git checkout -b feature/your-feature" language="bash"></prism-code-block>
      
      <p class="mt-4 mb-2">Install dependencies:</p>
      <prism-code-block code="npm install" language="bash"></prism-code-block>
    </prism-card>

    <div class="h-8"></div>

    <prism-card header="3. Standards">
      <p class="mb-4">Prism is built for <strong>Angular 21</strong> with a <strong>100% zoneless architecture</strong>.</p>
      <p class="mb-2">Verify your changes before committing:</p>
      <prism-code-block code="npx nx lint&#10;npx nx build prism-core" language="bash"></prism-code-block>
    </prism-card>
  `,
  styles: [`
    :host { display: block; }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-muted { color: var(--text-secondary); }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mt-4 { margin-top: 1rem; }
    .h-8 { height: 2rem; }
    .list-disc { list-style-type: disc; }
    .pl-6 { padding-left: 1.5rem; }
    .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributingComponent {
  protected readonly title = 'Contributing';
}
