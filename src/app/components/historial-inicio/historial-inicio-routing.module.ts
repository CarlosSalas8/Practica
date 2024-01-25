import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialInicioComponent } from './historial-inicio.component';

const routes: Routes = [
  {path: '', component: HistorialInicioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialInicioRoutingModule { }
