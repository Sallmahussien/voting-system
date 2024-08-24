import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    const loginUrl: string = 'http://localhost:8000/api/v1/auth/login';
    return this.http.post<any>(loginUrl, credentials);
  }

  signup(userData: any): Observable<any> {
    const signupUrl: string = 'http://localhost:8000/api/v1/auth/signup';
    return this.http.post(signupUrl, userData);
  }
}
