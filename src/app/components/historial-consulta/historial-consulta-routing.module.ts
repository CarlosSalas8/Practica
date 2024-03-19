import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialConsultaComponent } from './historial-consulta.component';

const routes: Routes = [
  {path: '', component: HistorialConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialConsultaRoutingModule { }
