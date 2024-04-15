import { Component } from '@angular/core';
import { Firestore } from "@angular/fire/firestore";
import { Usuario } from '../database/database';
import { collection, query, where, collectionData } from "@angular/fire/firestore";
import { Router } from "@angular/router";

import swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  Usuario = new Usuario();
  Correo : string = "";

  constructor(private firestore: Firestore, public router: Router) {
    localStorage.setItem('Usuario', JSON.stringify(new Usuario()));
  }

  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }

  async sendEmail() {
    emailjs.init('KCq5g6y59Yqom-EGF');

    let response = await emailjs.send("service_wvpfz3t","template_n28bwbe",{
      to_name: this.Usuario.Nombre,
      to_username: this.Usuario.NombreUsuario,
      to_password: this.Usuario.Contrasena,
      to_email: this.Usuario.Correo,
    });

    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Correo Enviado!',
      text: 'Se envió un correo con los datos solicitados.',
      showConfirmButton: false,
      timer: 1200
    });

    this.Correo = "";
    this.Usuario = new Usuario();
  }

  verifyEmail() {
    const user = collection(this.firestore, "Usuario");
    const q = query(user, where("Correo", "==", this.Correo));
    
    let flag = true;
    collectionData(q).subscribe((snapUser) => {
      if (snapUser.length > 0 && flag) {
        flag = false;
        this.Usuario.setData(snapUser[0]);
        this.sendEmail();
      } else if (flag) {
        flag = false;
        swal.fire({
          icon: 'error',
          title: 'Este correo no está registrado',
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  }
}
