import { Component,inject } from '@angular/core';
import { RouterModule, RouterOutlet,Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
@Component({
  selector: 'app-dealer',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dealer.component.html',
  styleUrl: './dealer.component.css'
})
export class DealerComponent {
  
// constructor(private router: Router, private auth: AuthenticationService) {}
  private router=inject(Router);
  private auth=inject(AuthenticationService);
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['']);
  }

}
