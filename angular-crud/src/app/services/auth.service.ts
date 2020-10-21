import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Response } from '~models/response';
import { User } from '~models/user';
import { CONSTANST } from '~utils/constanst';


@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    public http: HttpClient
  ) { }

  headers = new HttpHeaders({
    'x-access-token': localStorage.getItem('token')
  });

  login(user: User) {
    if (user.user_name !== '' && user.password !== '') {
      return this.http.post(
        CONSTANST.routes.authorization.login, {
        username: user.user_name,
        txtEmail: user.email,
        password: user.password
      });
    }
  }

  logout() {
    return this.http.get<Response>(
      CONSTANST.routes.authorization.logout,
      { headers: this.headers }
    );
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
