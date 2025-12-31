import { Component,inject } from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // constructor(private router: Router, private auth: AuthenticationService) {}
  private router=inject(Router);
  private auth=inject(AuthenticationService);
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
