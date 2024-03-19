import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListInicioComponent } from './components/list-inicio/list-inicio.component';
import { ListEnfermeriaComponent } from './components/list-enfermeria/list-enfermeria.component';
import { ListConsultaComponent } from './components/list-consulta/list-consulta.component';

const routes: Routes = [

  {path: '', redirectTo: 'login',pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(x => x.InicioModule)},
  {path: 'enfermeria', loadChildren: () => import('./components/enfermeria/enfermeria.module').then(x => x.EnfermeriaModule)},
  {path: 'consulta', loadChildren: () => import('./components/consulta/consulta.module').then(x => x.ConsultaModule)},
  {path: 'list-inicio', component: ListInicioComponent},
  {path: 'pagina-principal', loadChildren: () => import('./components/pagina-principal/pagina-principal.module').then(x => x.PaginaPrincipalModule)},
  {path: 'historial-inicio', loadChildren: () => import('./components/historial-inicio/historial-inicio.module').then(x => x.HistorialInicioModule)},
  {path: 'list-enfermeria', component: ListEnfermeriaComponent},
  {path: 'principal-enfermeria', loadChildren: () => import('./components/principal-enfermeria/principal-enfermeria.module').then(x => x.PrincipalEnfermeriaModule)},
  {path: 'historial-enfermeria', loadChildren: () => import('./components/historial-enfermeria/historial-enfermeria.module').then(x => x.HistorialEnfermeriaModule)},
  {path: 'list-consulta', component: ListConsultaComponent},
  {path: 'principal-consulta', loadChildren: () => import('./components/principal-consulta/principal-consulta.module').then(x => x.PrincipalConsultaModule)},
  {path: 'historial-consulta', loadChildren: () => import('./components/historial-consulta/historial-consulta.module').then(x => x.HistorialConsultaModule)},
  {path: 'historia-consulta-detallle', loadChildren: () => import('./components/historia-consulta-detalle/historia-consulta-detalle.module').then(x => x.HistoriaConsultaDetalleModule)},
  {path: '**', redirectTo: 'login',pathMatch: 'full'  } 


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
