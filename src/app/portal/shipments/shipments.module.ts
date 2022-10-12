import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    CreateShipmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateShipmentComponent
      }
    ])
  ]
})
export class ShipmentsModule { }
