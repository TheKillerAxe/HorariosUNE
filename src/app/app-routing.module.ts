import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { HorarioComponent } from './horario/horario.component';


const routes: Routes = [
  {path:"login",component:loginComponent},{path:"navbarr",component:navbarComponent},{path:"registro",component:AltadocentesComponent},{path:"menu",component:menuComponent},{path:"horario",component:HorarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
