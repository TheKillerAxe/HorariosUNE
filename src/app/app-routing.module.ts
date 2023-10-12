import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { loginComponent } from './Login/login';
import { HorarioComponent } from './horario/horario.component';
import { Horarios2Component } from './horarios2/horarios2.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { generarhorarioPruebaComponent } from './generarhorarioPRUEBA/generarhorarioPrueba';
import { altamaestrosPrueba } from './altamaestrosPRUEBA/altamaestrosPrueba';
import { imprimirhorarioPruebaComponent } from './imprimirhorarioPRUEBA/imprimirhorarioPrueba';

const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "registro", component: AltadocentesComponent },
  { path: "navbarr", component: navbarComponent },
  { path: "horario", component: HorarioComponent },
  { path: "menu", component: menuComponent },
  { path: "horarios", component: Horarios2Component },
  { path: "imprimir", component: ImprimirhorarioComponent },
  { path: "horarioPrueba", component: generarhorarioPruebaComponent },
  { path: "altaPrueba", component: altamaestrosPrueba },
  { path: "imprimirPrueba", component: imprimirhorarioPruebaComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
