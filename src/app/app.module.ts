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
import { HorarioComponent } from './horario/horario.component';

@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    navbarComponent,
    menuComponent,
    HorarioComponent,
    AltadocentesComponent
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
