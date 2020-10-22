import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CONSTANST } from '~app/utils/constanst';
import { AuthService } from '~services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public isLogin = false;
    private formSubmitAttempt: boolean;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public snack: MatSnackBar,
    ) { }

    public ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.router.navigate(['/']);
        }

        this.form = this.fb.group({
            user_name: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public isFieldInvalid(field: string): boolean {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.isLogin = true;
            this.authService.login(this.form.value).subscribe((data: any) => {
                this.isLogin = false;
                if (data.token) {
                    this.authService.loggedIn.next(true);

                    const token = AuthService.getDecodedAccessToken(data.token);
                    CONSTANST.permissions = token.rules.map(v => v.authority);

                    localStorage.setItem('token', data.token);
                    this.router.navigate(['/']);
                }
            }, (error) => {
                console.log(error);
                this.isLogin = false;
            });
        }
        this.formSubmitAttempt = true;
    }
}
