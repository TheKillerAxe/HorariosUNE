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
import { navbarComponent } from './navbarr/navbarr';
import { loginComponent } from './Login/login';
import { AltadocentesComponent } from './altadocentes/altadocentes.component';
import { ImprimirhorarioComponent } from './imprimirhorario/imprimirhorario.component';
import { HorarioComponent } from './horario/horario.component';
import { AsignarMateriasComponent } from './asignar-materias/asignar-materias.component';
import { MenuDocentesComponent } from './menu-docentes/menu-docentes.component';
import { MenuInglesComponent } from './menu-ingles/menu-ingles.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { DisponibilidadDocenteComponent } from './disponibilidad-docente/disponibilidad-docente.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { HorarioInglesComponent } from './horario-ingles/horario-ingles.component';

@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    navbarComponent,
    HorarioComponent,
    AltadocentesComponent,
    ImprimirhorarioComponent,
    AsignarMateriasComponent,
    MenuDocentesComponent,
    MenuInglesComponent,
    MenuAdminComponent,
    DisponibilidadDocenteComponent,
    ConfiguracionComponent,
    HorarioInglesComponent
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
