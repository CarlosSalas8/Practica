import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalConsultaRoutingModule } from './principal-consulta-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalConsultaComponent } from './principal-consulta.component';


@NgModule({
  declarations: [
    PrincipalConsultaComponent
  ],
  imports: [
    CommonModule,
    PrincipalConsultaRoutingModule,
    SharedModule
  ]
})
export class PrincipalConsultaModule { }
