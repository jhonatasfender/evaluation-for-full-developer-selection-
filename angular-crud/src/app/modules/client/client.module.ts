import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialComponentsModule } from '~app/utils/material.module';
import { SharedModule } from '~utils/shared.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from "./client.routes";
import { FormsComponent } from './forms/forms.component';


@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ClientComponent }]),
        SharedModule,
        ClientRoutingModule,
        MaterialComponentsModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
    declarations: [
        ClientComponent,
        FormsComponent,
    ],
    providers: [],
    entryComponents: [
        FormsComponent
    ],
    exports: [
        RouterModule,
    ]
})
export class ClientModule {
}
