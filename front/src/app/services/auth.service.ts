import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AuthTokenJWT } from '~models/auth';
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

    public static getDecodedAccessToken(token: string): AuthTokenJWT {
        try {
            return jwt_decode(token);
        } catch (e) {
            return null;
        }
    }

    public login(user: User) {
        if (user.user_name !== '' && user.password !== '') {
            return this.http.post(
                CONSTANST.routes.authorization.login, {
                username: user.user_name,
                txtEmail: user.email,
                password: user.password
            });
        }
    }

    public hasToken(): boolean {
        return !!localStorage.getItem('token');
    }
}
