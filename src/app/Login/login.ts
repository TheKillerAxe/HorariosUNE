import { Component } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
//import { Usuario } from "database/database.ts";
import { collection, query, where, collectionData, getDocs} from "@angular/fire/firestore";
import { Router } from "@angular/router";
//import swal from 'sweetalert2'

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class loginComponent {

    //Usuario = new Usuario();
    constructor(private firestore : Firestore, public router: Router){
}
}
// login(){
//     const user = collection(this.firestore, "usuario");
//     const q = query(user,
//         where("NombreUsuario", "==", this.Usuario.NombreUsuario),
//         where("contrasena", "==", this.Usuario.Contraseña),
//         where("activo", "==", true));

//     let flag = true;

//     collectionData(q).subscribe((snapUser) => {
//         if(flag){   
//             if(snapUser.length > 0){
//                 flag = false;
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'success',
//                     title: 'Sesion iniciada con exito.',
//                     showConfirmButton: false,
//                     timer: 2000
//                 }).then(() => {
//                     this.Usuario.setData(snapUser[0]);
//                     //this.router.navigate([''], { state: this.Usuario })
//                 })
//             }
//             else{
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Usuario o Contraseña Incorrectos',
//                     text: 'Usuario o Contraseña Incorrectos'
//                 })
//             }
//         }
//     });
// }}
