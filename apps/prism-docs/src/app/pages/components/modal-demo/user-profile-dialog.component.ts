import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { PrismDialogRef, DIALOG_DATA, PrismButtonComponent } from '@prism-monorepo/prism-core';

type UserProfileData = {
  name: string;
  role: string;
  email?: string;
}

@Component({
  selector: 'app-user-profile-dialog',
  standalone: true,
  imports: [PrismButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      <div class="space-y-5">
        <div class="field-group">
          <dt class="field-label">Name</dt>
          <dd class="field-value">{{ data.name }}</dd>
        </div>
        
        <div class="field-group">
          <dt class="field-label">Role</dt>
          <dd class="field-value">{{ data.role }}</dd>
        </div>
        
        @if (data.email) {
          <div class="field-group">
            <dt class="field-label">Email</dt>
            <dd class="field-value">{{ data.email }}</dd>
          </div>
        }
      </div>
      
      <div class="dialogue-footer flex justify-end gap-3" footer>
        <prism-button 
          label="Cancel" 
          variant="text" 
          (click)="ref.close()" />
        <prism-button 
          label="Save Changes" 
          (click)="ref.close({ saved: true, data: data })" />
      </div>
    </div>
  `,
  styles: [`
    .dialogue-footer{
      padding-top: 15px;
      border-top: 1px solid var(--surface-200);
      margin-top: 10px;
    }
    .space-y-5 > * + * {
      margin-top: 1.25rem;
    }
    
    .field-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }
    
    .field-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--surface-500);
    }
    
    .field-value {
      font-size: 1rem;
      font-weight: 500;
      color: var(--surface-900);
    }
    
    :host-context(.dark) .field-value {
      color: var(--surface-50);
    }
  `]
})
export class UserProfileDialogComponent {
  ref = inject(PrismDialogRef);
  data: UserProfileData = inject(DIALOG_DATA) as UserProfileData;
}
