
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '~services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    public canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => !!isLoggedIn),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        );
    }
}

