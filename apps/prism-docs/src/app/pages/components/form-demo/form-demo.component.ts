import { Component, ChangeDetectionStrategy, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { 
  PrismFormFieldComponent,
  PrismInputDirective,
  PrismInputComponent,
  PrismSelectComponent,
  PrismDatePickerComponent,
  PrismCheckboxComponent,
  PrismRadioGroupComponent,
  PrismRadioComponent,
  PrismRateComponent,
  PrismInputNumberComponent,
  PrismButtonComponent,
  PrismCodeBlockComponent, 
  PrismDemoPageHeaderComponent,
  PrismDemoSectionComponent,
  PrismDemoCardComponent,
  PrismTabGroupComponent,
  PrismTabComponent
} from '@devynelogic/prism-core';

type FormValue = {
  username?: string | null;
  email?: string | null;
  age?: number | null;
  gender?: string | null;
  interests?: string[] | null;
  birthdate?: Date | null;
  satisfaction?: number | null;
  agreement?: boolean | null;
};

@Component({
  selector: 'app-form-demo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrismFormFieldComponent,
    PrismInputDirective,
    PrismInputComponent,
    PrismSelectComponent,
    PrismDatePickerComponent,
    PrismCheckboxComponent,
    PrismRadioGroupComponent,
    PrismRadioComponent,
    PrismRateComponent,
    PrismInputNumberComponent,
    PrismButtonComponent,
    PrismCodeBlockComponent,
    PrismDemoPageHeaderComponent,
    PrismDemoSectionComponent,
    PrismDemoCardComponent,
    PrismTabGroupComponent,
    PrismTabComponent
  ],
  templateUrl: './form-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
  form = new FormBuilder().group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [25],
    gender: ['male'],
    interests: [['coding']],
    birthdate: [new Date()],
    satisfaction: [5],
    agreement: [false, Validators.requiredTrue]
  });

  options = [
    { label: 'Coding', value: 'coding' },
    { label: 'Design', value: 'design' },
    { label: 'Music', value: 'music' }
  ];

  isSubmitted = signal(false);
  submittedValue = signal<FormValue | null>(null);
  formValue = signal<FormValue>(this.form.value as FormValue);

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.form.valueChanges
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(value => {
        this.formValue.set(value as FormValue);
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value as FormValue;
      console.warn('Form Value:', value);
      this.submittedValue.set(value);
      this.isSubmitted.set(true);
      setTimeout(() => this.isSubmitted.set(false), 3000);
    }
  }

  hasError(controlName: string, errorType: string = 'required'): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.hasError(errorType) && control.touched);
  }

  readonly snippets = {
    integration: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <prism-form-field label="Username" [required]="true" error="Username is required">
    <input prismInput formControlName="username" placeholder="Enter username" />
  </prism-form-field>

  <prism-form-field label="Email" error="Invalid email address">
    <prism-input formControlName="email" placeholder="example@domain.com" prefix="mail-line" />
  </prism-form-field>

  <prism-form-field label="Age">
    <prism-input-number formControlName="age" [min]="0" [max]="120" />
  </prism-form-field>

  <prism-form-field label="Interests">
    <prism-select formControlName="interests" [options]="options" [multiple]="true" />
  </prism-form-field>

  <prism-form-field label="Birth Date">
    <prism-date-picker formControlName="birthdate" />
  </prism-form-field>

  <prism-form-field label="Service Satisfaction">
    <prism-rate formControlName="satisfaction" [allowHalf]="true" />
  </prism-form-field>

  <div class="mb-4">
    <prism-radio-group formControlName="gender">
      <prism-radio value="male">Male</prism-radio>
      <prism-radio value="female">Female</prism-radio>
    </prism-radio-group>
  </div>

  <prism-checkbox formControlName="agreement">I accept the terms and conditions</prism-checkbox>

  <prism-button type="submit" [disabled]="!form.valid" label="Submit Application" />
</form>`
  };
}
