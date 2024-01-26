import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalConsultaComponent } from './principal-consulta.component';

const routes: Routes = [
  {path: '', component: PrincipalConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalConsultaRoutingModule { }
