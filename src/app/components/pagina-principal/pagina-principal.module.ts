import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaPrincipalRoutingModule } from './pagina-principal-routing.module';
import { PaginaPrincipalComponent } from './pagina-principal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    PaginaPrincipalRoutingModule,
    SharedModule
  ]
})
export class PaginaPrincipalModule { }
