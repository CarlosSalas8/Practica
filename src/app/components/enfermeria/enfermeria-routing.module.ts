import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnfermeriaComponent } from './enfermeria.component';

const routes: Routes = [
  {path: '', component: EnfermeriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfermeriaRoutingModule { }
