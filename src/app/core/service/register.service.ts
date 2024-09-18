import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private authUrl = 'http://127.0.0.1:000/auth/register';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  register(username: string, password: string, user_name: string, email: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password, user_name, email })
      .pipe(
        tap(response => {
          if (response && response.token) {
            console.log(response.token);
            this.setToken(response.token);
          }
        })
      );
  };

  private setToken( token: string): | void {
    localStorage.setItem(this.tokenKey, token);
    }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now () < exp;
  }
}
