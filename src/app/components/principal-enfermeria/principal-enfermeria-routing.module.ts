import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalEnfermeriaComponent } from './principal-enfermeria.component';

const routes: Routes = [
  {path: '', component: PrincipalEnfermeriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalEnfermeriaRoutingModule { }
