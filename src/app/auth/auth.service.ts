import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { TOKEN_STORAGE_KEY } from './constants';
import { IAccessTokenPayload, ILoginPayload, ITokenResponse } from './interfaces';
import { envs } from '../shared/envs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = envs.getApiUrl();

  private accessToken$$ = new BehaviorSubject<string | null>(null);
  private userData$$ = new BehaviorSubject<IAccessTokenPayload | null>(null);

  accessToken$ = this.accessToken$$.pipe();
  userData$ = this.userData$$.pipe();

  setToken(val: string) {
    // this.accessToken$$.next(null);
    localStorage.setItem(TOKEN_STORAGE_KEY, val);
  }

  getToken() {
    return this.accessToken$$.value;
  }

  removeToken() {
    this.accessToken$$.next(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  loadToken() {
    console.log(`JwtTokenService#loadToken`);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    console.log(`JwtTokenService#loadToken - token: ${token}`);
    if (token) {
      this.accessToken$$.next(token);
    }
  }

  loginUser(data: ILoginPayload): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${this.baseUrl}/auth/login`, data).pipe(tap(({access_token}) => {
      this.setToken(access_token);
      this.userData$$.next(this.decodeToken(access_token));
    }));
  }

  logoutUser() {
    this.removeToken();
    this.userData$$.next(null);
  }

  isTokenExpired(): boolean {
    const expiryTime = this.userData$$.value?.['exp'];
    if (expiryTime) {
      return 1000 * +expiryTime - new Date().getTime() < 5000;
    }
    return false;
  }

  private decodeToken(token: string): IAccessTokenPayload | null {
    if (token) {
      return jwt_decode.jwtDecode<IAccessTokenPayload>(token);
    }
    return null;
  }
}
