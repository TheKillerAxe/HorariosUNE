import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuDocentesComponent } from './menu-docentes/menu-docentes.component';
import { MenuInglesComponent } from './menu-ingles/menu-ingles.component';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { HorarioComponent } from './horario/horario.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { AsignarMateriasComponent } from './asignar-materias/asignar-materias.component';
import { DisponibilidadDocenteComponent } from './disponibilidad-docente/disponibilidad-docente.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { HorarioInglesComponent } from './horario-ingles/horario-ingles.component';

const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "navbarr", component: navbarComponent },
  { path: "admin", component: MenuAdminComponent },
  { path: "docente", component: MenuDocentesComponent },
  { path: "ingles", component: MenuInglesComponent },
  { path: "alta", component: AltadocentesComponent },
  { path: "asignar", component: AsignarMateriasComponent },
  { path: "horario", component: HorarioComponent },
  { path: "horarioIngles", component: HorarioInglesComponent },
  { path: "imprimir", component: ImprimirhorarioComponent },
  { path: "disponibilidad", component: DisponibilidadDocenteComponent },
  { path: "configuracion", component: ConfiguracionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
