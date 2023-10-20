import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { HorarioComponent } from './horario/horario.component';
import { menuComponent } from './menu/menu';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { generarhorarioPruebaComponent } from './generarhorarioPRUEBA/generarhorarioPrueba';
import { altamaestrosPrueba } from './altamaestrosPRUEBA/altamaestrosPrueba';
import { imprimirhorarioPruebaComponent } from './imprimirhorarioPRUEBA/imprimirhorarioPrueba';
import { altamaestrosIndividualPrueba } from './altamaestrosIndividualPRUEBA/altamaestrosIndividualPrueba';


const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "registro", component: AltadocentesComponent },
  { path: "navbarr", component: navbarComponent },
  { path: "inicio", component: menuComponent },
  { path: "horarios", component: HorarioComponent },
  { path: "imprimir", component: ImprimirhorarioComponent },
  { path: "horarioPrueba", component: generarhorarioPruebaComponent },
  { path: "altaPrueba", component: altamaestrosPrueba },
  { path: "imprimirPrueba", component: imprimirhorarioPruebaComponent },
  { path: "altaIndividualPrueba", component: altamaestrosIndividualPrueba }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
