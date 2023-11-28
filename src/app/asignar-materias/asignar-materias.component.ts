import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Materia, Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { Carrera } from '../database/database';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {
  Usuario: Usuario = new Usuario();
  docenteSeleccionado: Usuario = new Usuario();

  Carreras: Carrera[] = new Array();
  Materias: Materia[] = new Array();
  Periodos: number[] = new Array();
  Asignados: Usuario[] = new Array();
  profesorsillo: string[] = new Array();
  Buscados: Usuario[] = new Array();

  Carrera: number = -1;
  Materia: number = -1;
  Periodo: number = 0;
  Maestro: string = "";
  horasTotales: number = 0;

  mostrarBusqueda = false

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }

    this.obtenerCarreras();
  }

  limpiarMaterias() {
    this.Asignados = new Array();

    (document.getElementById('materia') as HTMLInputElement).disabled = true;
    this.Materia = -1;

    (document.getElementById('profe') as HTMLInputElement).disabled = true;
    this.Maestro = "";
  }

  obtenerCarreras() {
    const CarreraCol = collection(this.firestore, "Carrera");
    const Query = query(CarreraCol);

    collectionData(Query).subscribe((snapCarreras) => {
      for (let i = 0; i < snapCarreras.length; i++) {
        this.Carreras[i] = new Carrera();
        this.Carreras[i].setData(snapCarreras[i]);
      }
    });
  }

  obtenerPeriodos() {
    this.Periodos = new Array();

    for (let i = 0; i < this.Carreras[this.Carrera].CantidadPeriodos; i++) {
      this.Periodos[i] = i + 1;
    }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  buscarMaterias() {
    if (this.Carrera > -1 && this.Periodo != 0) {
      this.Materias = new Array();
      const MateriasC = collection(this.firestore, "Materia");
      const Query = query(MateriasC,
        where("Carrera", "==", this.Carreras[this.Carrera].Nombre),
        where("Periodo", "==", this.Periodo)
      );

      collectionData(Query).subscribe((snapMaterias) => {
        if (snapMaterias.length > 0) {
          for (let i = 0; i < snapMaterias.length; i++) {
            this.Materias[i] = new Materia();
            this.Materias[i].setData(snapMaterias[i]);
          }
        }
      });

      (document.getElementById('materia') as HTMLInputElement).disabled = false;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Llene los campos de Carrera y Periodo.'
      });
    }
  }

  buscarAsignados() {
    (document.getElementById('profe') as HTMLInputElement).disabled = false;

    this.Asignados = new Array();
    const AsignadosCol = collection(this.firestore, "Usuario");
    const Query = query(AsignadosCol,
      where("Materias", "array-contains", this.Materias[this.Materia].IdMateria)
    );

    collectionData(Query).subscribe((snapAsignados) => {
      if (snapAsignados.length > 0) {
        for (let i = 0; i < snapAsignados.length; i++) {
          this.Asignados[i] = new Usuario();
          this.Asignados[i].setData(snapAsignados[i]);
        }
      }
    });
  }

  buscador() {
    if (this.Maestro.trim() !== '') {
      this.mostrarBusqueda = true
      this.Buscados = new Array();
      const MaestroCol = collection(this.firestore, "Usuario");
      const Query = query(MaestroCol,
        where("Nombre", "<=", this.Maestro + '\uf8ff'),
        where("Nombre", ">=", this.Maestro)
      );

      collectionData(Query).subscribe((snapBuscados) => {
        if (snapBuscados.length > 0) {
          for (let i = 0; i < snapBuscados.length; i++) {
            this.Buscados[i] = new Usuario();
            this.Buscados[i].setData(snapBuscados[i]);
          }
        }
      });
    };
  }

  pasardato(profesor: Usuario) {
    this.docenteSeleccionado = profesor;
    this.Maestro = profesor.Nombre;
  }

  eliminarDuplicados<T>(array: T[]) {
    const result: T[] = [];
    for (const item of array) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
    return result;
  }

  asignarMateria() {
    if (this.docenteSeleccionado.IdUsuario != "" || this.Materia != -1) {
      this.docenteSeleccionado.Materias.push(this.Materias[this.Materia].IdMateria);
      this.docenteSeleccionado.Materias = this.eliminarDuplicados(this.docenteSeleccionado.Materias);
      this.Asignados.push(this.docenteSeleccionado);

      let rutaDoc = doc(this.firestore, "Usuario", this.docenteSeleccionado.IdUsuario);
      let data = {
        Materias: this.docenteSeleccionado.Materias
      };

      updateDoc(rutaDoc, data);
      this.buscarAsignados();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Maestro Asignado Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.Maestro = "";
      this.mostrarBusqueda = false

    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Seleccione una materia y un docente.'
      });
    }
  }

  borrarMateria(i: number) {
    const docente = this.Asignados[i];
    const materia = this.Materias[this.Materia].IdMateria;
    console.log(docente);

    docente.Materias.splice(docente.Materias.indexOf(materia), 1);
    this.Asignados.splice(i, 1);

    let rutaDoc = doc(this.firestore, "Usuario", docente.IdUsuario);
    let data = {
      Materias: docente.Materias
    };

    updateDoc(rutaDoc, data);
  }
}