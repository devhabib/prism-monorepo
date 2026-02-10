import { 
  Component, 
  input, 
  signal, 
  contentChildren, 
  effect,
  ChangeDetectionStrategy,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTabComponent } from './tab.component';

@Component({
  selector: 'prism-tab-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTabGroupComponent {
  variant = input<'line' | 'pill'>('line');
  
  tabs = contentChildren(PrismTabComponent);
  activeIndex = signal<number>(0);

  constructor() {
    // Sync active state with child tabs
    effect(() => {
      const allTabs = this.tabs();
      const currentActive = this.activeIndex();
      
      // Update each tab's visibility based on active index
      allTabs.forEach((tab, index) => {
        // Access the internal writable signal to update it
        const isActiveSignal = (tab as any)._isActive as WritableSignal<boolean>;
        if (isActiveSignal) {
          isActiveSignal.set(index === currentActive);
        }
      });
    });
  }

  selectTab(index: number): void {
    this.activeIndex.set(index);
  }

  isTabActive(index: number): boolean {
    return this.activeIndex() === index;
  }
}
