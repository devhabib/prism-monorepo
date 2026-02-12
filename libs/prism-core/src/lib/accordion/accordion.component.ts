import { 
  Component, 
  ChangeDetectionStrategy, 
  input, 
  contentChildren, 
  effect 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismAccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'prism-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-accordion" [class.prism-accordion--bordered]="bordered()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .prism-accordion {
      display: flex;
      flex-direction: column;
      background-color: var(--surface-0);
      border-radius: 8px;
      overflow: hidden;

      &--bordered {
        border: 1px solid var(--surface-200);
      }
    }

    :host-context([data-theme='dark']) .prism-accordion {
      background-color: var(--surface-900);
      
      &--bordered {
        border-color: var(--surface-800);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAccordionComponent {
  /** If true, only one panel can be open at a time */
  accordion = input<boolean>(false);

  /** Whether the accordion has a border */
  bordered = input<boolean>(true);
  
  /** Query all children panels */
  panels = contentChildren(PrismAccordionPanelComponent);

  constructor() {
    effect(() => {
      // Listen to toggle events from children
      this.panels().forEach((panel: PrismAccordionPanelComponent) => {
        panel.toggleEvent.subscribe(() => this.onPanelToggle(panel));
      });
    });
  }

  private onPanelToggle(toggledPanel: PrismAccordionPanelComponent): void {
    const isExpanding = !toggledPanel.active();

    if (this.accordion() && isExpanding) {
      // Close all other panels if in accordion mode and expanding
      this.panels().forEach(panel => {
        if (panel !== toggledPanel) {
          panel.active.set(false);
        }
      });
    }
    
    // Toggle the clicked panel
    toggledPanel.active.set(isExpanding);
  }
}
