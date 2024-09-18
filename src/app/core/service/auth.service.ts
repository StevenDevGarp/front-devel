import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/auth/login';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return this.http.post<any>(this.authUrl, { username, password })
      .pipe(
        tap(response => {
          console.log(response.accessToken);
          if (response && response.accessToken) {
            console.log(response);
            this.setToken(response.accessToken);
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

  revoke(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
