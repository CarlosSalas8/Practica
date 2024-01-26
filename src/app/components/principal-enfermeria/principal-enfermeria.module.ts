import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalEnfermeriaRoutingModule } from './principal-enfermeria-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalEnfermeriaComponent } from './principal-enfermeria.component';


@NgModule({
  declarations: [
    PrincipalEnfermeriaComponent
  ],
  imports: [
    CommonModule,
    PrincipalEnfermeriaRoutingModule,
    SharedModule
  ]
})
export class PrincipalEnfermeriaModule { }
