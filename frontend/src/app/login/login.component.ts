
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, CanDeactivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: string = '';
  path: string = '';
  submitted = false;

  // NEW: message flags
  authErrorMessage: string = '';
  showValidationErrors = false;

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    })
  });

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.path = this.route.snapshot.routeConfig?.path ?? '';
  }

  onSubmit() {
    // keep your logic; just show validation messages when invalid
    if (this.form.invalid) {
      console.log('Invalid form');
      this.showValidationErrors = true;              // NEW: show field errors
      this.authErrorMessage = '';                    // clear any previous auth message
      return;
    }

    if (this.path === "dealer-login") {
      this.role = "dealer";
    }
    else if (this.path === "customer-login") {
      this.role = "customer";
    }
    else {
      this.role = "admin";
    }

    this.submitted = true;
    this.authErrorMessage = ''; // clear auth error before new attempt

    const enteredMail = this.form.value.email ?? '';
    const enteredPass = this.form.value.password ?? '';

    const subscription = this.authService.login$(this.role, enteredMail, enteredPass).subscribe({
      next: (ok) => {
        if (ok) {
          console.log("Credentials matched");
          this.router.navigate(['/', this.role]);
        } else {
          console.log("Data not matched");
          this.authErrorMessage = 'Incorrect email or password.';   // NEW: auth failure message
        }
      },
      error: (err) => {
        console.log("Error occurred:", err);
        this.authErrorMessage = 'Authorization failed. Please try again later.'; // NEW: error message
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}


export const canLeaveLoginpage:CanDeactivateFn<LoginComponent>=(component)=>{
  const isTouched=component.form.dirty;
  const isSubmitted=component.submitted;
  if(isTouched && !isSubmitted){  //If the form is touched and not submitted
    return window.confirm("Do you really want to leave? You have unsubmitted data");
  }
  //console.log(isTouched);
  return true;
}
