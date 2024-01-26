import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialEnfermeriaComponent } from './historial-enfermeria.component';

const routes: Routes = [
  {path: '', component: HistorialEnfermeriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialEnfermeriaRoutingModule { }
