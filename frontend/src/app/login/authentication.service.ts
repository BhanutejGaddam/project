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
  const body = { email, password: pass, role };

  return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
    map(res => {
      // We check for 'token' because that's what your C# API sends back
      if (res.success && res.token) {
        // 1. Save the JWT Token
        localStorage.setItem('auth_token', res.token);
        
        // 2. Save the login state
        localStorage.setItem('auth_isLoggedIn', 'true');
        localStorage.setItem('auth_role', res.role);
        
        // Update the BehaviorSubject so the UI reacts immediately
        this._isLoggedIn$.next(true);
        
        return true;
      }
      return false;
    })
  );
}

// Helper method to get the ID later
getLoggedInUserId(): string | null {
  return localStorage.getItem('userId');
}

bookService$(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/book-service`, data);
}

getBookingStatus$(customerId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/track-service/${customerId}`);
}

getServiceHistory$(customerId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/service-history/${customerId}`);
}
  logout(): void {
  this._isLoggedIn$.next(false);
  localStorage.removeItem('auth_isLoggedIn');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_role');
  localStorage.removeItem('userId'); // Cleanup old keys if any
}
}
