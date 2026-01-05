
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginData } from './login_data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // Holds whether the user is logged in
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('auth_isLoggedIn')
  );
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  // Convenience getter
  get isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  login$(role: string, email: string, password: string): Observable<boolean> {
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedRole = String(role);
    const normalizedPassword = String(password);

    const matched = loginData.find(
      (user) =>
        user.email === normalizedEmail &&
        user.password === normalizedPassword &&
        user.role === normalizedRole
    );

    const ok = Boolean(matched);

    return of(ok).pipe(
      tap((success) => {
        if (success) {
          console.log('Credentials matched');
          this._isLoggedIn$.next(true);
          localStorage.setItem('auth_isLoggedIn', 'true');
          // Optionally store minimal user info/role:
          // localStorage.setItem('auth_role', normalizedRole);
        } else {
          console.log('Credentials not matched');
          this._isLoggedIn$.next(false);
          localStorage.removeItem('auth_isLoggedIn');
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('auth_isLoggedIn');
    // localStorage.removeItem('auth_role');
  }
}
