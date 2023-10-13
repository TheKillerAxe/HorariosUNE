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
    console.log(this.Usuario);
  }

  generateRandomString = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLenght = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLenght));
    }
    return result1;
  }

  registro() {
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

  generateID = (fecha: string) => {
    let partes = fecha.split('/');
    let dia = partes[0];
    let mes = partes[1];
    let ano = partes[2];
    let fechaSinDiagonales = dia + mes + ano;
    return fechaSinDiagonales;
  };

  subirExcel() {
    let ExcelMaestros = <HTMLInputElement>document.getElementById('avatar');

    readXlsxFile(ExcelMaestros.files![0]).then((rows) => {
      rows = rows.slice(1);
      let flag = true;
      rows.forEach((fila) => {
        if (flag) {
          flag = false;
        } else {
          let IdUsuario =
            fila[2] == null
              ? ''
              : fila[2]!.toString() +
              this.generateID(fila[3] == null ? '' : fila[3]!.toString());
          let data = {
            TipoUsuario: 'Maestro',
            TipoMaestro: fila[0] == null ? '' : fila[0]!.toString(),
            Nombre: fila[1] == null ? '' : fila[1]!.toString(),
            NombreUsuario: fila[2] == null ? '' : fila[2]!.toString(),
            Contrasena: this.generateID(
              fila[3] == null ? '' : fila[3]!.toString()
            ),
          };

          let rutaDoc = doc(this.firestore, 'Usuario', this.Usuario.IdUsuario);
          getDoc(rutaDoc).then((docSnap) => {
            if (docSnap.exists()) {
              updateDoc(rutaDoc, { data: data })
            } else {
              const usuario = new Usuario();
              usuario.IdUsuario = IdUsuario;
              usuario.setData(data);
              setDoc(rutaDoc, JSON.parse(JSON.stringify(this.Usuario)))
            }
          })
        }
      });
    });
  }
}
