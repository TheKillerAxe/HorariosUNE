import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'altamaestrosIndividualPrueba',
  templateUrl: './altamaestrosIndividualPrueba.html',
  styleUrls: ['./altamaestrosIndividualPrueba.css']
})
export class altamaestrosIndividualPrueba {
//   Usuario : Usuario = new Usuario();

//   constructor(public router: Router) { }

//   navigate(route: string) {
//     this.router.navigate([route], { state: this.Usuario });
//   }

NuevoUsuario = new Usuario();

IdNum = 0;

constructor(private firestore: Firestore, public router : Router, private fireStorage : Storage) { }

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
  this.NuevoUsuario.IdUsuario = this.generateRandomString(5);
  let rutaDoc = doc(this.firestore, "Usuario", this.NuevoUsuario.IdUsuario);

  setDoc(rutaDoc, JSON.parse(JSON.stringify(this.NuevoUsuario))).then(() => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Tus datos se guardaron correctamente',
      showConfirmButton: false,
      timer: 1200
    }) 
  });
}
}

