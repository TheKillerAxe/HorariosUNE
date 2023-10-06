import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent {

    usuario = {
        NombreUsuario: '',
        Contraseña: ''
    }

    Ingresar() {
        console.log(this.usuario)
    }
    
}
