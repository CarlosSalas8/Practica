import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListInicioComponent } from './components/list-inicio/list-inicio.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';

const routes: Routes = [

  {path: '', redirectTo: 'login',pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(x => x.InicioModule)},
  {path: 'enfermeria', loadChildren: () => import('./components/enfermeria/enfermeria.module').then(x => x.EnfermeriaModule)},
  {path: 'consulta', loadChildren: () => import('./components/consulta/consulta.module').then(x => x.ConsultaModule)},
  {path: 'list-inicio', component: ListInicioComponent},
  {path: 'pagina-principal', loadChildren: () => import('./components/pagina-principal/pagina-principal.module').then(x => x.PaginaPrincipalModule)},
  {path: 'historial-inicio', loadChildren: () => import('./components/historial-inicio/historial-inicio.module').then(x => x.HistorialInicioModule)},
  {path: '**', redirectTo: 'login',pathMatch: 'full'  } 


];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
