import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { loginComponent } from './Login/login';
import { HorarioComponent } from './horario/horario.component';

const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "registro", component: AltadocentesComponent },
  { path: "navbarr", component: navbarComponent },
  { path: "horario", component: HorarioComponent },
  { path: "menu", component: menuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
