import { Component, inject } from '@angular/core';
import { RouterModule,Router } from "@angular/router";
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  // constructor(private router: Router, private auth: AuthenticationService) {}
  private router=inject(Router);
  private auth=inject(AuthenticationService);
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
