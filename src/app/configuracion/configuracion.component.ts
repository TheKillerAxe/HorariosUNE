import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  Usuario: Usuario = new Usuario();
  NuevoUsuario: Usuario = new Usuario();

  constructor(private router: Router, private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    this.NuevoUsuario = this.Usuario;

    if (this.Usuario.IdUsuario == "") {
      this.router.navigate(['']);
    }
  }

  actualizarUsuario() {
    Swal.fire({
      title: 'Actualización',
      text: "¿Está seguro de estos cambios?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        let rutaDoc = doc(this.firestore, "Usuario", this.NuevoUsuario.IdUsuario);
        let data = {
          Nombre: this.NuevoUsuario.Nombre,
          NombreUsuario: this.NuevoUsuario.NombreUsuario,
          Correo: this.Usuario.Correo,
          Contrasena: this.Usuario.Contrasena
        };

        updateDoc(rutaDoc, data);
        this.Usuario = this.NuevoUsuario;

        Swal.fire({
          title: 'Usuario Actualizado',
          text: "Los datos se actualizaron con éxito!",
          icon: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        this.Usuario.CambiosRecientes = true;
        if (this.Usuario.TipoUsuario == "Admin") {
          this.router.navigate(['admin'], { state: this.Usuario });
        }
        if (this.Usuario.TipoUsuario == "Maestro") {
          this.router.navigate(['docente'], { state: this.Usuario });
        }
        if (this.Usuario.TipoUsuario == "Ingles") {
          this.router.navigate(['ingles'], { state: this.Usuario });
        }
      }
    });
  }
}
