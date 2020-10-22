import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '~guards/auth.guard';
import { AdminLayoutComponent } from '~modules/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from '~modules/login-layout/login-layout.component';
import { NotFoundComponent } from '~utils/index.pages';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: '~modules/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'client',
        loadChildren: '~modules/client/client.module#ClientModule',
      },
      {
        path: 'users',
        loadChildren: '~modules/user/user.module#UserModule',
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: '~modules/login-layout/login/login.module#LoginModule',
      },
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

