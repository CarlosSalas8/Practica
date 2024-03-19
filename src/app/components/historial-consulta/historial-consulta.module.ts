import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialConsultaRoutingModule } from './historial-consulta-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HistorialConsultaComponent } from './historial-consulta.component';


@NgModule({
  declarations: [
    HistorialConsultaComponent
  ],
  imports: [
    CommonModule,
    HistorialConsultaRoutingModule,
    SharedModule
  ]
})
export class HistorialConsultaModule { }
