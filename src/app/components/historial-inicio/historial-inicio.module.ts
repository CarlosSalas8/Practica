import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialInicioRoutingModule } from './historial-inicio-routing.module';
import { HistorialInicioComponent } from './historial-inicio.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HistorialInicioComponent
  ],
  imports: [
    CommonModule,
    HistorialInicioRoutingModule,
    SharedModule
  ]
})
export class HistorialInicioModule { }
