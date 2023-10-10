import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { loginComponent } from './Login/login';
import { HorarioComponent } from './horario/horario.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';

const routes: Routes = [
  {path:"imprimir",component:ImprimirhorarioComponent},
  {path:"horario",component:HorarioComponent}, 
  {path:"",component:loginComponent},
  {path:"nav",component:navbarComponent},
  {path:"registro",component:AltadocentesComponent},
  {path:"menu",component:menuComponent}, 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
