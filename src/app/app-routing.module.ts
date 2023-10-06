import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { LoginComponent } from './login/login.component';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';

const routes: Routes = [{path:"inicio", component: menuComponent}, {path:"navb", component: navbarComponent}, {path:"login", component: LoginComponent}, {path:"registro", component: AltadocentesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
