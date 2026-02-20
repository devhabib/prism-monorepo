import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PrismAutoCompleteComponent, 
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc
} from '@devynelogic/prism-core';

@Component({
  selector: 'app-autocomplete-demo',
  imports: [
    CommonModule, 
    PrismAutoCompleteComponent, 
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent
  ],
  templateUrl: './autocomplete-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteDemoComponent {
  basicValue = signal('');
  customValue = signal('');
  asyncValue = signal('');
  isLoading = signal(false);

  options = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho'
  ];

  customFilter = (q: string, opts: string[]): string[] => {
    return opts.filter(opt => opt.startsWith(q));
  };

  onSearchChange(q: string): void {
    if (!q) return;
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
  }

  readonly snippets = {
    basic: `<prism-autocomplete [(value)]="basicValue" [options]="options" />`,
    custom: `<prism-autocomplete 
  [(value)]="customValue" 
  [options]="options" 
  [filterFn]="customFilter" 
  placeholder="Starts with..." />`,
    async: `<prism-autocomplete 
  [(value)]="asyncValue" 
  [options]="options" 
  [isLoading]="isLoading()"
  (searchChange)="onSearchChange($event)" />`
  };

  readonly apiData: ApiDoc[] = [
    { name: 'options', type: 'input<string[]>', default: '[]', description: 'List of suggestions.' },
    { name: 'value', type: 'model<string>', default: "''", description: 'The current value of the input.' },
    { name: 'placeholder', type: 'input<string>', default: "'Type to search...'", description: 'Input placeholder.' },
    { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Whether the input is disabled.' },
    { name: 'allowFreeText', type: 'input<boolean>', default: 'true', description: 'Whether to allow values not in the options list.' },
    { name: 'maxResults', type: 'input<number>', default: '10', description: 'Maximum number of results to display.' },
    { name: 'isLoading', type: 'input<boolean>', default: 'false', description: 'Display a loading spinner.' },
    { name: 'filterFn', type: 'input<((q: string, opts: string[]) => string[]) | null>', default: 'null', description: 'Custom filter logic.' },
    { name: 'selected', type: 'output<string>', default: '-', description: 'Emitted when an option is selected.' },
    { name: 'searchChange', type: 'output<string>', default: '-', description: 'Emitted on every keystroke.' }
  ];
}
