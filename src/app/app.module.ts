import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { Horarios2Component } from './horarios2/horarios2.component';
import { generarhorarioPruebaComponent } from './generarhorarioPRUEBA/generarhorarioPrueba';
import { altamaestrosPrueba } from './altamaestrosPRUEBA/altamaestrosPrueba';
import { imprimirhorarioPruebaComponent } from './imprimirhorarioPRUEBA/imprimirhorarioPrueba';
import { MenuingComponent } from './menuing/menuing.component';
import { MenudocentesComponent } from './menudocentes/menudocentes.component';
import { AsignarmateriasComponent } from './asignarmaterias/asignarmaterias.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { HorarioinglesComponent } from './horarioingles/horarioingles.component';
import { EditaruserComponent } from './editaruser/editaruser.component';
@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    navbarComponent,
    menuComponent,
    AltadocentesComponent,
    ImprimirhorarioComponent,
    Horarios2Component,
    generarhorarioPruebaComponent,
    altamaestrosPrueba,
    imprimirhorarioPruebaComponent,
    MenuingComponent,
    MenudocentesComponent,
    AsignarmateriasComponent,
    DisponibilidadComponent,
    HorarioinglesComponent,
    EditaruserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
