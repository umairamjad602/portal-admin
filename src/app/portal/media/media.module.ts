import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ListMediaComponent } from './list-media/list-media.component';
import { MediaComponent } from './media.component';


@NgModule({
    declarations: [
        MediaComponent,
        ListMediaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ModalModule.forRoot(),
        SharedModule,
        RouterModule.forChild([
            {
                path: 'list-media-component',
                component: ListMediaComponent
            }
        ])
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        MediaComponent,
        ListMediaComponent
    ],
    providers: []
})
export class MediaModule { }
