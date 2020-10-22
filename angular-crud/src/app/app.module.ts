import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '~app/app.routes';
import '~app/rxjs-operators';
import { ClientService } from '~app/services/client.service';
import { AppComponent } from '~components/app/app.component';
import { ConfirmComponent } from '~components/confirm/confirm.component';
import { NotFoundComponent } from '~components/not-found/not-found.component';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import { AuthGuard } from '~guards/auth.guard';
import { AdminLayoutModule } from '~modules/admin-layout/admin-layout.module';
import { LoginLayoutModule } from '~modules/login-layout/login-layout.module';
import { UserModule } from '~modules/user/user.module';
import { AuthService } from '~services/auth.service';
import { UserService } from '~services/user.service';
import { SharedModule } from '~utils/shared.module';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { CEPService } from './services/cep.service';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        ConfirmComponent,
        SnackbarComponent,
    ],
    imports: [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AdminLayoutModule,
        LoginLayoutModule,
        UserModule,
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        ClientService,
        CEPService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    entryComponents: [
        ConfirmComponent,
        SnackbarComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
