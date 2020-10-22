import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~utils/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    ],
    exports: [
        RouterModule,
    ]
})
export class DashboardModule { }
