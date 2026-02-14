import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private http = inject(HttpClient);
  
  // Base URLs for different controllers
  private authUrl = 'https://localhost:7169/api/Auth';
  private bookingUrl = 'https://localhost:7169/api/Bookings'; // Points to your new BookingsController
 private trackingUrl = 'https://localhost:7169/api/Tracking';
 // Inside AuthenticationService

private historyUrl = 'https://localhost:7169/api/History';



  // Helper to create Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  register$(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData);
  }

  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('auth_token')
  );
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  login$(role: string, email: string, pass: string): Observable<boolean> {
    const body = { email, password: pass, role };

    return this.http.post<any>(`${this.authUrl}/login`, body).pipe(
      map(res => {
        if (res.success && res.token) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('auth_role', res.role);
          localStorage.setItem('userId', res.id);
          this._isLoggedIn$.next(true);
          return true;
        }
        return false;
      })
    );
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Inside AuthenticationService


getBookingStatus$(customerId: string): Observable<any> {
  // Matches the route: api/Tracking/status/{customerId}
  return this.http.get(`${this.trackingUrl}/status/${customerId}`, { 
    headers: this.getAuthHeaders() 
  });
}

  // FIXED: Points to the correct Controller and adds Authorization Headers
  bookService$(data: any): Observable<any> {
    return this.http.post(this.bookingUrl, data, { headers: this.getAuthHeaders() });
  }

  getServiceHistory$(customerId: string): Observable<any[]> {
  // Matches the route: api/History/customer/{customerId}
  return this.http.get<any[]>(`${this.historyUrl}/customer/${customerId}`, { 
    headers: this.getAuthHeaders() 
  });
}

  logout(): void {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('userId');
  }
}