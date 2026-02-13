import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PrismButtonComponent,
  PrismCardComponent,
  PrismDialogComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismInputDirective,
  PrismCodeBlockComponent,
  ApiDoc,
  ApiTableComponent,
  PrismDialogService,
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent
} from '@prism-monorepo/prism-core';
import { UserProfileDialogComponent } from './user-profile-dialog.component';

@Component({
  selector: 'prism-modal-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrismButtonComponent,
    PrismCardComponent,
    PrismDialogComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismInputDirective,
    PrismCodeBlockComponent,
    ApiTableComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent
  ],
  templateUrl: './modal-demo.component.html',
  styleUrl: './modal-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDemoComponent {
  // Services
  private dialog = inject(PrismDialogService);
  private fb = inject(FormBuilder);
  
  // Dialog visibility states
  basicDialog = signal(false);
  cardDialog = signal(false);
  formDialog = signal(false);
  confirmDialog = signal(false);
  
  // Position variants
  positionDialog = signal(false);
  currentPosition = signal<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');
  
  // Form for form dialog example
  contactForm!: FormGroup;
  formSubmitted = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      this.formSubmitted.set(true);
      this.formDialog.set(false);
      setTimeout(() => this.formSubmitted.set(false), 3000);
      this.contactForm.reset();
    }
  }

  deleteItem(): void {
    this.confirmDialog.set(false);
  }

  openPositionDialog(position: 'center' | 'top' | 'bottom' | 'left' | 'right'): void {
    this.currentPosition.set(position);
    this.positionDialog.set(true);
  }

  openServiceDialog(): void {
    const dialogRef = this.dialog.open(UserProfileDialogComponent, {
      header: 'User Profile (Service)',
      width: '500px',
      position: 'center',
      data: {
        name: 'Sarah Johnson',
        role: 'Senior Developer',
        email: 'sarah.johnson@example.com'
      }
    });

    dialogRef.afterClosed$.subscribe(() => {
      // Result handling
    });
  }

  // API Documentation
  readonly apiData: ApiDoc[] = [
    {
      name: 'visible',
      type: 'model<boolean>',
      default: 'false',
      description: 'Two-way binding for dialog visibility state. Use [(visible)]="mySignal"'
    },
    {
      name: 'header',
      type: 'string',
      default: "''",
      description: 'Title text displayed in the dialog header'
    },
    {
      name: 'width',
      type: 'string',
      default: "'500px'",
      description: 'Custom width for the dialog modal window'
    },
    {
      name: 'position',
      type: "'center' | 'top' | 'bottom' | 'left' | 'right'",
      default: "'center'",
      description: 'Position and animation direction for the dialog. Center scales in, sides slide from edges'
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking the backdrop closes the dialog. Set to false for modals that require explicit action'
    },
    {
      name: 'onHide',
      type: 'OutputEmitterRef<void>',
      default: '-',
      description: 'Event emitted when dialog closes (via X button or dismissable mask click)'
    }
  ];

  readonly serviceApiData: ApiDoc[] = [
    {
      name: 'open<T, D, R>(component, config)',
      type: 'PrismDialogRef<R>',
      default: '-',
      description: 'Opens a dialog dynamically with the specified component. Returns a DialogRef for controlling the dialog lifecycle'
    },
    {
      name: 'config.data',
      type: 'D (generic)',
      default: 'undefined',
      description: 'Data to inject into the dialog component via DIALOG_DATA token'
    },
    {
      name: 'config.header',
      type: 'string',
      default: "''",
      description: 'Dialog header title'
    },
    {
      name: 'config.width',
      type: 'string',
      default: "'50vw'",
      description: 'Dialog width (supports px, %, vw, etc.)'
    },
    {
      name: 'config.position',
      type: "'center' | 'top' | 'bottom' | 'left' | 'right'",
      default: "'center'",
      description: 'Animation direction and position'
    },
    {
      name: 'config.dismissableMask',
      type: 'boolean',
      default: 'true',
      description: 'Enable/disable backdrop dismissal'
    }
  ];

  readonly dialogRefApiData: ApiDoc[] = [
    {
      name: 'close(result?: R)',
      type: 'void',
      default: '-',
      description: 'Closes the dialog and optionally passes a result to afterClosed$ subscribers'
    },
    {
      name: 'afterClosed$',
      type: 'Observable<R | undefined>',
      default: '-',
      description: 'Observable that emits when dialog closes. Completes after emission. Subscribe to handle dialog results'
    }
  ];

  readonly tokensApiData: ApiDoc[] = [
    {
      name: 'DIALOG_DATA',
      type: 'InjectionToken<unknown>',
      default: '-',
      description: 'Token for injecting data into dynamically created dialog components. Use inject(DIALOG_DATA) in your component'
    },
    {
      name: 'PrismDialogRef',
      type: 'Class',
      default: '-',
      description: 'Injectable reference to control the dialog from within the dynamically created component. Use inject(PrismDialogRef)'
    }
  ];

  readonly snippets = {
    basicHTML: `<prism-button 
  label="Open Dialog" 
  (click)="basicDialog.set(true)" />

<prism-dialog 
  [(visible)]="basicDialog" 
  header="Welcome">
  <p>This is a signal-driven dialog with two-way binding!</p>
  <div footer>
    <prism-button 
      label="Close" 
      variant="outline" 
      (click)="basicDialog.set(false)" />
  </div>
</prism-dialog>`,

    basicTS: `export class MyComponent {
  basicDialog = signal(false);
}`,

    cardHTML: `<prism-dialog 
  [(visible)]="cardDialog" 
  header="User Profile"
  width="600px">
  <prism-card 
    header="Sarah Connor" 
    subheader="Frontend Lead">
    <div class="space-y-2">
      <p><strong>Email:</strong> sarah@example.com</p>
      <p><strong>Status:</strong> Active</p>
      <p><strong>Joined:</strong> Jan 2024</p>
    </div>
  </prism-card>
</prism-dialog>`,

    formHTML: `<prism-dialog 
  [(visible)]="formDialog" 
  header="Contact Us"
  width="500px">
  <form [formGroup]="contactForm">
    <div class="space-y-4">
      <input 
        prismInput 
        formControlName="name" 
        placeholder="Your name" />
      <input 
        prismInput 
        formControlName="email" 
        type="email" 
        placeholder="your@email.com" />
      <textarea 
        prismInput 
        formControlName="message" 
        placeholder="Your message" 
        rows="4"></textarea>
    </div>
  </form>
  <div footer>
    <prism-button 
      label="Cancel" 
      variant="text" 
      (click)="formDialog.set(false)" />
    <prism-button 
      label="Send Message" 
      (click)="submitForm()" />
  </div>
</prism-dialog>`,

    confirmHTML: `<prism-dialog 
  [(visible)]="confirmDialog" 
  header="Confirm Delete"
  width="400px">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <div footer>
    <prism-button 
      label="Cancel" 
      variant="outline" 
      (click)="confirmDialog.set(false)" />
    <prism-button 
      label="Delete" 
      variant="danger" 
      (click)="deleteItem()" />
  </div>
</prism-dialog>`,

    serviceHTML: `// Component TypeScript
export class MyComponent {
  dialog = inject(PrismDialogService);
  
  openDialog() {
    const ref = this.dialog.open(UserProfileDialogComponent, {
      header: 'User Profile',
      width: '500px',
      data: { name: 'Sarah', role: 'Developer' }
    });
    
    ref.afterClosed$.subscribe(result => {
      console.log('Result:', result);
    });
  }
}

// Dialog Component
export class UserProfileDialogComponent {
  ref = inject(PrismDialogRef);
  data = inject(DIALOG_DATA);
  
  save() {
    this.ref.close({ saved: true });
  }
}`,

    programmaticUsageTS: `const ref = this.dialog.open(MyComponent, {
  header: 'Title',
  data: { userId: 123 },
  width: '600px'
});

ref.afterClosed$.subscribe(result => {
  // Handle result
});`,

    componentUsageTS: `export class MyDialogComponent {
  ref = inject(PrismDialogRef);
  data = inject(DIALOG_DATA);

  save() {
    this.ref.close({ saved: true });
  }
}`
  };
}
