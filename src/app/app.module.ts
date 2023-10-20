import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { menuComponent } from './menu/menu';
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { HorarioComponent } from './horario/horario.component';
import { Horarios2Component } from './horarios2/horarios2.component';
import { generarhorarioPruebaComponent } from './generarhorarioPRUEBA/generarhorarioPrueba';
import { altamaestrosPrueba } from './altamaestrosPRUEBA/altamaestrosPrueba';
import { imprimirhorarioPruebaComponent } from './imprimirhorarioPRUEBA/imprimirhorarioPrueba';
import { altamaestrosIndividualPrueba } from './altamaestrosIndividualPRUEBA/altamaestrosIndividualPrueba';

@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    navbarComponent,
    menuComponent,
    HorarioComponent,
    AltadocentesComponent,
    ImprimirhorarioComponent,
    Horarios2Component,
    generarhorarioPruebaComponent,
    altamaestrosPrueba,
    imprimirhorarioPruebaComponent,
    altamaestrosIndividualPrueba
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
