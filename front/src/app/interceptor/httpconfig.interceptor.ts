import {
    HttpErrorResponse,
    HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '~app/services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => event),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse && err.status === 403) {
                    this.authService.loggedIn.next(false);
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return of(err);
            })
        );
    }
}
