import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateUser } from './dtos/create-user.dto';
import { envs } from '../shared/envs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = envs.getApiUrl();

  createUser(data: ICreateUser) {
    return this.http.post<ICreateUser>(`${this.baseUrl}/user`, data);
  }
}
