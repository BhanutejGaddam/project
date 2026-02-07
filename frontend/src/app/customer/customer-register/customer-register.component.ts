import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../login/authentication.service'; // Ensure this path is correct

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthenticationService); // Injected the service here

  registrationForm: FormGroup;
  isSubmitting = false;
  registrationSuccess = false;

  constructor() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]],
      middleName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } : null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      
      // Capture the form data to send to the API
      // .NET usually expects camelCase JSON, which match your form control names
      const userData = this.registrationForm.value;

      // Call the real API service
      this.authService.register$(userData).subscribe({
        next: (response) => {
          console.log('Registration successful in Database:', response);
          this.registrationSuccess = true;
          this.isSubmitting = false;
          
          // Redirect to login after 3 seconds so the user can see the success message
          setTimeout(() => {
            this.router.navigate(['/customer-login']);
          }, 3000);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.isSubmitting = false;
          alert('Registration failed. Please ensure the Backend API is running and try again.');
        }
      });

    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}