import { 
  Component, 
  input, 
  contentChildren, 
  effect,
  ChangeDetectionStrategy,
  WritableSignal,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismTabComponent } from './tab.component';

@Component({
  selector: 'prism-tab-group',
  imports: [CommonModule],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTabGroupComponent {
  variant = input<'line' | 'pill' | 'enclosed'>('line');
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  
  tabs = contentChildren(PrismTabComponent);
  selectedIndex = model<number>(0);

  constructor() {
    // Sync active state with child tabs
    effect(() => {
      const allTabs = this.tabs();
      const currentActive = this.selectedIndex();
      
      // Update each tab's visibility based on active index
      allTabs.forEach((tab, index) => {
        // Access the internal writable signal to update it
        const isActiveSignal = (tab as unknown as { _isActive: WritableSignal<boolean> })._isActive;
        if (isActiveSignal) {
          isActiveSignal.set(index === currentActive);
        }
      });
    });
  }

  selectTab(index: number): void {
    this.selectedIndex.set(index);
  }

  isTabActive(index: number): boolean {
    return this.selectedIndex() === index;
  }
}
