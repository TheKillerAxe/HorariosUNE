import { Component } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { Usuario } from 'src/database/database';
import { collection, query, where, collectionData, getDocs} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import swal from 'sweetalert2'


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class loginComponent {

    Usuario = new Usuario();

    constructor(private firestore : Firestore, public router: Router){ }
    
 login(){
     const user = collection(this.firestore, "Usuario");
     const q = query(user,
         where("NombreUsuario", "==", this.Usuario.NombreUsuario),
         where("Contrasena", "==", this.Usuario.Contrasena),
         );

     let flag = true;

     collectionData(q).subscribe((snapUser) => {
         if(flag){   
             if(snapUser.length > 0){
                 flag = false;
                 swal.fire({
                     position: 'center',
                     icon: 'success',
                     title: 'Sesion iniciada.',
                     showConfirmButton: false,
                     timer: 2000
                 }).then(() => {
                     this.Usuario.setData(snapUser[0]);
                     this.router.navigate(['/Menu'], { state: this.Usuario })
                 })
             }
             else{
                 swal.fire({
                     icon: 'error',
                     title: 'Usuario o Contraseña Incorrectos',
                     text: 'Usuario o Contraseña Incorrectos'
                 })
             }
         }
     });
 }

}
