import { Component } from '@angular/core';
import { Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import Swal from 'sweetalert2';
import readXlsxFile from 'read-excel-file';


@Component({
  selector: 'app-altadocentes',
  templateUrl: './altadocentes.component.html',
  styleUrls: ['./altadocentes.component.css']
})
export class AltadocentesComponent {
  Usuario: Usuario = new Usuario();
  NuevoUsuario: Usuario = new Usuario();

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

  validarCorreo(): boolean {
    let validacion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (validacion.test(this.NuevoUsuario.Correo)) {
      return true;
    } else {
      return false;
    }
  }

  registro() {
    if (this.NuevoUsuario.NombreUsuario == "" || this.NuevoUsuario.Nombre == "" || this.NuevoUsuario.Correo == "" ||
        this.NuevoUsuario.TipoMaestro == "" || this.NuevoUsuario.Contrasena == "") {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Favor de llenar todos los campos.',
        showConfirmButton: true
      });
      return;
    }

    if (this.validarCorreo()) {
      this.NuevoUsuario.IdUsuario = this.NuevoUsuario.NombreUsuario + this.NuevoUsuario.Contrasena;
      this.NuevoUsuario.TipoUsuario = "Maestro";

      let rutaDoc = doc(this.firestore, "Usuario", this.NuevoUsuario.IdUsuario);

      setDoc(rutaDoc, JSON.parse(JSON.stringify(this.NuevoUsuario))).then(() => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Tus datos se guardaron correctamente!',
          showConfirmButton: false,
          timer: 1200
        });

        this.NuevoUsuario = new Usuario();
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'El correo es inválido.',
        showConfirmButton: true
      });
    }
  }

  generateID = (fecha: string) => {
    let partes = fecha.split('/');
    let dia = partes[0];
    let mes = partes[1];
    let ano = partes[2];
    let fechaSinDiagonales = dia + mes + ano;
    return fechaSinDiagonales;
  };

  subirExcel() {
    let ExcelMaestros = <HTMLInputElement>document.getElementById('inputGroupFile01');
    readXlsxFile(ExcelMaestros.files![0]).then((rows) => {
      rows = rows.slice(0);
      let flag = true;
      rows.forEach((fila) => {
        if (flag) {
          flag = false;
        } else {
          let newUser = new Usuario();
          newUser.IdUsuario = fila[2] == null ? '' : fila[2]!.toString() + this.generateID(fila[4] == null ? '' : fila[4]!.toString());
          newUser.TipoMaestro = fila[0] == null ? '' : fila[0]!.toString()
          newUser.TipoUsuario = "Maestro"
          newUser.Nombre = fila[1] == null ? '' : fila[1]!.toString()
          newUser.NombreUsuario = fila[2] == null ? '' : fila[2]!.toString()
          newUser.Correo = fila[3] == null ? '' : fila[3]!.toString()
          newUser.Contrasena = this.generateID(fila[4] == null ? '' : fila[4]!.toString())

          let rutaDoc = doc(this.firestore, 'Usuario', newUser.IdUsuario);
          setDoc(rutaDoc, JSON.parse(JSON.stringify(newUser)))

        }
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Los datos se guardaron correctamente!',
        showConfirmButton: false,
        timer: 2000
      })
    });
  }
}
