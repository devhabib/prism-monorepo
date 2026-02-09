import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismEmptyComponent, PrismButtonComponent } from '@prism-monorepo/prism-core';

@Component({
  selector: 'app-empty-demo',
  standalone: true,
  imports: [CommonModule, PrismEmptyComponent, PrismButtonComponent],
  templateUrl: './empty-demo.component.html',
  styleUrls: ['./empty-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyDemoComponent {
  activeTab = signal<'overview' | 'variations' | 'api'>('overview');
  
  setActiveTab(tab: 'overview' | 'variations' | 'api'): void {
    this.activeTab.set(tab);
  }
}
