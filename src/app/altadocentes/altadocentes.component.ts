import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-altadocentes',
  templateUrl: './altadocentes.component.html',
  styleUrls: ['./altadocentes.component.css']
})
export class AltadocentesComponent {
  Usuario : Usuario = new Usuario();
  NuevoUsuario : Usuario = new Usuario();

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    console.log(this.Usuario);
  }

  generateRandomString = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLenght = characters.length;
    for (let i = 0; i < num ; i++){
        result1 += characters.charAt(Math.floor(Math.random() * charactersLenght));
    }
    return result1;
  }

  registro(){
    this.NuevoUsuario.IdUsuario = "US-" + this.generateRandomString(5);
    this.NuevoUsuario.TipoUsuario = "Maestro";

    let rutaDoc = doc(this.firestore, "Usuario", this.NuevoUsuario.IdUsuario);

    setDoc(rutaDoc, JSON.parse(JSON.stringify(this.NuevoUsuario))).then(() => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Tus datos se guardaron correctamente',
        showConfirmButton: false,
        timer: 1200
      });

      this.NuevoUsuario = new Usuario();
    });
  }
}
