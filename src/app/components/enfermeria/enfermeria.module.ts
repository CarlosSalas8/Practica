import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermeriaRoutingModule } from './enfermeria-routing.module';
import { EnfermeriaComponent } from './enfermeria.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EnfermeriaComponent
  ],
  imports: [
    CommonModule,
    EnfermeriaRoutingModule,
    SharedModule
  ]
})
export class EnfermeriaModule { }
