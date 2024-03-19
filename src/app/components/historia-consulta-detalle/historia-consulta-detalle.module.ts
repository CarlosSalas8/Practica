import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaConsultaDetalleRoutingModule } from './historia-consulta-detalle-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HistoriaConsultaDetalleComponent } from './historia-consulta-detalle.component';


@NgModule({
  declarations: [  
    HistoriaConsultaDetalleComponent
  ],
  imports: [
    CommonModule,
    HistoriaConsultaDetalleRoutingModule,
    SharedModule
  ]
})
export class HistoriaConsultaDetalleModule { }
