import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { TOKEN_STORAGE_KEY, USER_ID_STORAGE_KEY } from './constants';
import { IAccessTokenPayload, ILoginPayload, ITokenResponse } from './interfaces';
import { envs } from '../shared/envs';
import { UserDataDto } from '../user/dtos/user-data.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = envs.getApiUrl();

  private accessToken$$ = new BehaviorSubject<string | null>(null);
  private userData$$ = new BehaviorSubject<IAccessTokenPayload | null>(null);
  private userId$$ = new BehaviorSubject<string | null>(null);

  accessToken$ = this.accessToken$$.pipe();
  userData$ = this.userData$$.pipe();
  userId$ = this.userId$$.pipe();

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

  setUserId(val: string) {
    localStorage.setItem(USER_ID_STORAGE_KEY, val);
  }

  getUserId() {
    return this.userId$$.value;
  }

  loadUserId() {
    console.log(`JwtTokenService#loadUserId`);
    const userId = localStorage.getItem(USER_ID_STORAGE_KEY);
    console.log(`JwtTokenService#loadUserId - userId: ${userId}`);
    if (userId) {
      this.userId$$.next(userId);
    }
  }

  loginUser(data: ILoginPayload): Observable<ITokenResponse> {
    return this.http.post<ITokenResponse>(`${this.baseUrl}/auth/login`, data).pipe(tap(({ access_token }) => {
      this.setToken(access_token);
      this.userData$$.next(this.decodeToken(access_token));
      this.identifyUser()?.subscribe();
    }));
  }

  logoutUser() {
    this.removeToken();
    this.userData$$.next(null);
  }

  identifyUser() {
    const userEmail = this.userData$$.value?.['email'];
    if (!userEmail) {
      return null;
    }
    return this.http.post<UserDataDto>(`${this.baseUrl}/auth/identify`, { email: userEmail }).pipe(tap((user) => {
      this.setUserId(user.id)
      this.userId$$.next(user.id)
    }))
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
