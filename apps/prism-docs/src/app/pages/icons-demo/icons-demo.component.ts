import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { 
  PrismIconComponent, 
  PrismIconRegistry,
  ToastService, 
  PrismInputDirective, 
  PrismDemoPageHeaderComponent,
  PrismButtonComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  ApiTableComponent,
  ApiDoc,
  PrismDemoSectionComponent
} from '@devynelogic/prism-core';
import { tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import * as PrismIcons from '@devynelogic/prism-icons';

@Component({
  selector: 'app-icons-demo',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    PrismIconComponent, 
    PrismInputDirective,
    PrismDemoPageHeaderComponent,
    PrismButtonComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    ApiTableComponent,
    PrismDemoSectionComponent
  ],
  templateUrl: './icons-demo.component.html',
  styleUrls: [],
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsDemoComponent {
  private toast = inject(ToastService);
  private registry = inject(PrismIconRegistry);
  
  searchControl = new FormControl('', { nonNullable: true });
  
  // Get all icon definitions
  allIcons: { key: string; name: string }[] = [];

  constructor() {
    // 1. Extract all icon definitions from the module import
    const icons = Object.values(PrismIcons)
      .filter((icon): icon is { name: string; data: string } => {
        return !!(icon && typeof icon === 'object' && 'name' in icon && 'data' in icon);
      });
      
    // 2. Register them with the registry so <prism-icon> can find them
    this.registry.addIcons(icons);

    // 3. Populate local array for the grid display
    this.allIcons = icons.map((icon) => ({
      key: icon.name,
      name: icon.name
    }));
  }

  // Implementation of virtualization/pagination for large set
  private pageSize = 48;
  visibleCount = signal(this.pageSize);

  searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      tap(() => this.visibleCount.set(this.pageSize))
    ), 
    { initialValue: '' }
  );
  
  // Reactive Search
  filteredIcons = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.allIcons.filter(i => i.name.includes(term)); 
  });

  displayedIcons = computed(() => {
    return this.filteredIcons().slice(0, this.visibleCount());
  });

  hasMore = computed(() => {
    return this.visibleCount() < this.filteredIcons().length;
  });

  loadMore(): void {
    this.visibleCount.update(v => v + this.pageSize);
  }
  
  copyIcon(iconName: string): void {
    const tag = `<prism-icon name="${iconName}" />`;
    navigator.clipboard.writeText(tag).then(() => {
      this.toast.show(`Copied: ${iconName}`, 'success');
    });
  }

  // API Documentation Data
  readonly apiData: ApiDoc[] = [
    { name: 'name', type: 'string', default: 'undefined', description: 'The name of the icon to display (e.g., "user", "home"). Required.' },
    { name: 'size', type: 'string', default: 'undefined', description: 'Size of the icon. Accepts any valid CSS value (e.g., "24px", "2rem", "100%"). Inherits font-size by default.' },
    { name: 'class', type: 'string', default: 'undefined', description: 'Standard HTML class attribute for custom styling.' }
  ];

  // Dynamic Sizing Demo
  demoSize = signal('2rem');
  
  updateDemoSize(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.demoSize.set(value);
  }
}
