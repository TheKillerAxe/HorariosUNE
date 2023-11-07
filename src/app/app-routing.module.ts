import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { Horarios2Component } from './horarios2/horarios2.component';
import { menuComponent } from './menu/menu';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { generarhorarioPruebaComponent } from './generarhorarioPRUEBA/generarhorarioPrueba';
import { altamaestrosPrueba } from './altamaestrosPRUEBA/altamaestrosPrueba';
import { imprimirhorarioPruebaComponent } from './imprimirhorarioPRUEBA/imprimirhorarioPrueba';
import { MenuingComponent } from './menuing/menuing.component';
import { MenudocentesComponent } from './menudocentes/menudocentes.component';
import { AsignarmateriasComponent } from './asignarmaterias/asignarmaterias.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { HorarioinglesComponent } from './horarioingles/horarioingles.component';
import { EditaruserComponent } from './editaruser/editaruser.component';

const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "registro", component: AltadocentesComponent },
  { path: "navbarr", component: navbarComponent },
  { path: "inicio", component: menuComponent },
  { path: "horarios", component: Horarios2Component },
  { path: "imprimirh", component: ImprimirhorarioComponent },
  { path: "menudocentes", component: MenudocentesComponent },
  { path: "menuingles", component: MenuingComponent },
  { path: "asignarmaterias", component: AsignarmateriasComponent },
  { path: "disponibilidad", component: DisponibilidadComponent },
  { path: "horarioingles", component: HorarioinglesComponent },
  { path: "editaruser", component: EditaruserComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
