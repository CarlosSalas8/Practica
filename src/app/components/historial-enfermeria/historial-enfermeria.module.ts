import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialEnfermeriaRoutingModule } from './historial-enfermeria-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HistorialEnfermeriaComponent } from './historial-enfermeria.component';


@NgModule({
  declarations: [
    HistorialEnfermeriaComponent
  ],
  imports: [
    CommonModule,
    HistorialEnfermeriaRoutingModule,
    SharedModule
  ]
})
export class HistorialEnfermeriaModule { }
