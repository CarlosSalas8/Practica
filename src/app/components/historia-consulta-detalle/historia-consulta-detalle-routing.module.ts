import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaConsultaDetalleComponent } from './historia-consulta-detalle.component';

const routes: Routes = [
  {path: '', component: HistoriaConsultaDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaConsultaDetalleRoutingModule { }
