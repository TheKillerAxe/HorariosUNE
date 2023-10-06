import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { LoginComponent } from './login/login.component';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';

import { loginComponent } from './login/login';


const routes: Routes = [
  {path:"login",component:loginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
