import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { HorarioComponent } from './horario/horario.component';
import { menuComponent } from './menu/menu';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { AsignarMateriasComponent } from './asignar-materias/asignar-materias.component';


const routes: Routes = [
  { path: "", component: loginComponent },
  { path: "alta", component: AltadocentesComponent },
  { path: "admin", component: menuComponent },
  { path: "horario", component: HorarioComponent },
  { path: "imprimir", component: ImprimirhorarioComponent },
  { path: "asignar", component: AsignarMateriasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
