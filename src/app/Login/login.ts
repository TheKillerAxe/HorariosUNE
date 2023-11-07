import { Component } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { Usuario } from '../database/database';
import { collection, query, where, collectionData } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import swal from 'sweetalert2'


@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class loginComponent {
    Usuario = new Usuario();

    constructor(private firestore: Firestore, public router: Router) {
        localStorage.setItem('Usuario', JSON.stringify(new Usuario()));
    }

    login() {
        console.log(this.Usuario)

        const user = collection(this.firestore, "Usuario");
        const q = query(user,
            where("NombreUsuario", "==", this.Usuario.NombreUsuario),
            where("Contrasena", "==", this.Usuario.Contrasena),
        );

        let flag = true;
        collectionData(q).subscribe((snapUser) => {
            if (snapUser.length > 0 && flag) {
                flag = false;
                swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sesion iniciada.',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    this.Usuario.setData(snapUser[0]);

                    switch (this.Usuario.TipoUsuario) {
                        case "Admin":
                            this.router.navigate(['admin'], { state: this.Usuario });
                            break;
                        case "Ingles":
                            this.router.navigate(['ingles'], { state: this.Usuario });
                            break;
                        case "Maestro":
                            this.router.navigate(['docente'], { state: this.Usuario });
                            break;
                    }
                })
            }
            else {
                swal.fire({
                    icon: 'error',
                    title: 'Usuario o Contraseña Incorrectos',
                    text: 'Usuario o Contraseña Incorrectos'
                });
            }
        });
    }

    navigate(route: string) {
        this.router.navigate([route], { state: this.Usuario });
      }
}