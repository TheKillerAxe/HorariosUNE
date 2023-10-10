import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { loginComponent } from './Login/login';
import { HorarioComponent } from './horario/horario.component';
<<<<<<< HEAD
const routes: Routes = [
  {path:"login",component:loginComponent},{path:"navbarr",component:navbarComponent},{path:"registro",component:AltadocentesComponent},{path:"menu",component:menuComponent}, 
  {path:"horario",component:HorarioComponent}
]
=======
import { RegistroHorario } from 'src/database/database';

const routes: Routes = [
  { path: 'login', component: loginComponent },
  { path: 'Menu', component: menuComponent },
  { path: 'Horario', component: HorarioComponent },
  { path: 'RegistroDocentes', component: AltadocentesComponent },
  { path: 'Navbar', component: navbarComponent }
];
>>>>>>> 0d375aa6f266ffbd3ab750a81fa2640b1b0fd8bb

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
