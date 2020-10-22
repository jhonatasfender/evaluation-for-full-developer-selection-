import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ClientModule } from '~modules/client/client.module';
import { DashboardModule } from '~modules/dashboard/dashboard.module';
import { SharedModule } from '~utils/shared.module';
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        DashboardModule,
        ClientModule,
        MatToolbarModule
    ],
    declarations: [
        AdminLayoutComponent
    ],
    providers: [],
    exports: []
})
export class AdminLayoutModule {
}
