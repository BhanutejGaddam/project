import { inject, Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { loginData } from './login_data';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private http = inject(HttpClient);
  
  // Replace with your actual .NET Port from Swagger
private apiUrl = 'https://localhost:7169/api/Auth';

  register$(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Holds whether the user is logged in
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('auth_isLoggedIn')
  );
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  // Convenience getter
  get isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  

login$(role: string, email: string, pass: string): Observable<boolean> {
  const loginData = { email: email, password: pass, role: role };
  
  return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
    map(response => {
      // If the API returns success, we return true to the component
      return response.success === true;
    })
  );
}

  logout(): void {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('auth_isLoggedIn');
    // localStorage.removeItem('auth_role');
  }
}
