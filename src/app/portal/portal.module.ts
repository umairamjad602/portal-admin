import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      // { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      {
        path: 'shipment',
        loadChildren: () => import('./shipments/shipments.module').then(m => m.ShipmentsModule)
      },
    ])
  ]
})
export class PortalModule { }
