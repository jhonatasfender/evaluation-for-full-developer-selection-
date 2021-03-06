import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~utils/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
    ]
})
export class LoginModule { }
