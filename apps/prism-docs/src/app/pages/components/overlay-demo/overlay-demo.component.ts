import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
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
  ApiTableComponent,
  ApiDoc
} from '@prism-monorepo/prism-core';

@Component({
  selector: 'prism-overlay-demo',
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
    ApiTableComponent
  ],
  templateUrl: './overlay-demo.component.html',
  styleUrl: './overlay-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayDemoComponent {
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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.formSubmitted.set(true);
      this.formDialog.set(false);
      setTimeout(() => this.formSubmitted.set(false), 3000);
      this.contactForm.reset();
    }
  }

  deleteItem(): void {
    console.log('Item deleted');
    this.confirmDialog.set(false);
  }

  openPositionDialog(position: 'center' | 'top' | 'bottom' | 'left' | 'right'): void {
    this.currentPosition.set(position);
    this.positionDialog.set(true);
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
      description: 'Position and animation direction for the dialog'
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking the backdrop closes the dialog'
    }
  ];

  // Code examples
  readonly basicHTML = `<prism-button 
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
</prism-dialog>`;

  readonly basicTS = `export class MyComponent {
  basicDialog = signal(false);
}`;

  readonly cardHTML = `<prism-dialog 
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
</prism-dialog>`;

  readonly formHTML = `<prism-dialog 
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
</prism-dialog>`;

  readonly confirmHTML = `<prism-dialog 
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
</prism-dialog>`;
}
