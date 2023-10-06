import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { loginComponent } from './Login/login';
import { HorarioComponent } from './horario/horario.component';
import { RegistroHorario } from 'src/database/database';

const routes: Routes = [
  { path: '', component: loginComponent },
  { path: 'Menu', component: menuComponent },
  { path: 'Horario', component: HorarioComponent },
  { path: 'RegistroDocentes', component: AltadocentesComponent },
  { path: 'Navbar', component:navbarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
