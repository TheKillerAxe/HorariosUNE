import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Materia, Usuario } from '../database/database';
import { Firestore, arrayUnion } from '@angular/fire/firestore';
import { collection, query, where, collectionData, deleteField } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc, getDoc, getDocs, getFirestore, DocumentData, arrayRemove } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Carrera } from '../database/database';
import Swal from 'sweetalert2';
import { realpath } from 'fs';

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {
  Usuario: Usuario = new Usuario();
  Carrera: Carrera = new Carrera();
  Materia: Materia = new Materia();

  carreras: DocumentData[] = [];
  materias: DocumentData[] = [];
  maestrostabla: DocumentData[] = [];

  maestroBD: string = "";
  profesorsillo: string[] = new Array();
  Periodos: number[] = new Array();

  aidi = "";

  maestrosBuscados: Usuario[] = new Array()

  constructor(private firestore: Firestore, private router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.traerCarreras();
    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);

    if (this.Usuario.TipoUsuario != "Admin") {
      this.router.navigate(['']);
    }
  }

  buscarMaterias() {
    if (this.Carrera.Nombre != "" && this.Materia.Periodo != "") {
      const MateriasC = collection(this.firestore, "Materia");
      const Query = query(MateriasC, where("Carrera", "==", this.Carrera.Nombre),
        where("Periodo", "==", this.Materia.Periodo),
      );
      collectionData(Query).subscribe((snapMaterias) => {
        this.materias = new Array();
        if (snapMaterias.length > 0) {
          snapMaterias.forEach((item: any) => {
            let recInf = new Materia();
            recInf.setData(item)
            this.materias.push(recInf);
            (document.getElementById('materia') as HTMLInputElement).disabled = false;
          })
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Selecciona carrera y periodo antes de continuar',
        showConfirmButton: false,
        timer: 1200
      });
    }
  }

  habilitarMaterias() {
    (document.getElementById('materia') as HTMLInputElement).disabled = false;
  }

  habilitarBuscador() {
    (document.getElementById('profe') as HTMLInputElement).disabled = false;
  }

  obtenerPeriodos() {
    this.Periodos = new Array();
    const carreraSeleccionada = this.Carrera.Nombre;
    let periodos = 0;

    this.carreras.forEach(function (carrera) {
      if (carrera.Nombre == carreraSeleccionada) {
        periodos = carrera.CantidadPeriodos;
      }
    });

    for (let i = 1; i <= periodos; i++) {
      this.Periodos[i - 1] = i;
    }

    (document.getElementById('periodo') as HTMLInputElement).disabled = false;
  }

  traerCarreras() {
    const CarrerasC = collection(this.firestore, "Carrera");
    const Query = query(CarrerasC);
    collectionData(Query).subscribe((snapCarreras) => {
      if (snapCarreras.length > 0) {
        snapCarreras.forEach((item: any) => {
          let recInf = new Carrera();
          recInf.setData(item)
          this.carreras.push(recInf);
        })
      }
    });
  }

  buscaprofes2() {
    if (this.maestroBD.trim() !== '') {
      const usuacioC = collection(this.firestore, "Usuario");
      const Q = query(usuacioC,
        where("Nombre", "<=", this.maestroBD + '\uf8ff'),
        where("Nombre", ">=", this.maestroBD)
      );

      collectionData(Q).subscribe((SnapMaestros) => {
        this.maestrosBuscados = new Array()
        if (SnapMaestros.length > 0) {
          SnapMaestros.forEach((item: any) => {
            let maestro = new Usuario();
            maestro.setData(item);
            this.maestrosBuscados.push(maestro);
          })
        }
      });
    };
  }

  // sale un error en la consola de chrome
  maestrostablamet() {
    const maestrosC = collection(this.firestore, "Usuario")
    const QueryM = query(maestrosC, where("Materias", "array-contains", this.Materia.Nombre));
    collectionData(QueryM).subscribe((snapM) => {
      this.maestrostabla = new Array();
      if (snapM.length > 0) {
        snapM.forEach((item: any) => {
          let recInf = new Usuario();
          recInf.setData(item)
          this.maestrostabla.push(recInf)
        })
      }
    });
  }

  // no lo he metido porque no guarda nada pero creo que esta bien
  borrarMateria(i: number) {
    delete this.maestrostabla[i].Materias[this.maestrostabla[i].Materias.indexOf(this.Materia.Nombre)];

    let rutaDoc = doc(this.firestore, "Usuario", this.maestrostabla[i].IdUsuario);
    updateDoc(rutaDoc, {
      Materias: this.maestrostabla[i].Materias
    });
  }

  //guarda en otro lado, especificar id del documento    
  asignarMateria() {
    if (this.Carrera.Nombre != "" && this.maestroBD != "") {
      let rutaDoc = doc(this.firestore, "Usuario", this.aidi);
      updateDoc(rutaDoc, {
        Materias: arrayUnion(this.Materia.Nombre)
      })
    } else {
      console.log("selecciona una materia y un maestro")
    }

  }

  pasardato(profesor: Usuario) {
    this.maestroBD = profesor.Nombre;
    this.aidi = profesor.IdUsuario;
  }

  // async maestros(){
  //   const maestrosC = collection(this.firestore, 'Usuario');
  //     const querySnapshot = await getDocs(maestrosC);

  //     if (!querySnapshot.empty) {
  //       this.maestrosBuscados = querySnapshot.docs.map(doc => {
  //         const maestro = new Usuario();
  //         maestro.setData(doc.data());
  //         return maestro;
  //       }); 
  //       this.buscaprofes();

  //     }
  // }

  // buscaprofes(){
  //   if (this.maestroBD.trim() !== ' ') {
  //     this.maestrosBuscados = this.maestrosBuscados.filter(profe => {
  //       const searchableFields = [
  //         profe.Nombre.toLowerCase(),
  //         profe.TipoMaestro.toLowerCase(),
  //       ];

  //       for (const field of searchableFields) {
  //         if (field.includes(this.maestroBD.toLowerCase())) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     });
  //   }
  // }

  // trae a veces otras cosas o todos los nombres, carga raro a veces si jala
  // buscaprofesLetraxLetra(){
  //   if (this.maestroBD.trim() !== '') {
  //       this.maestrosBuscados = this.maestrosBuscados.filter(person => {
  //       const nombre = person.Nombre.toLowerCase();
  //       return nombre.startsWith(this.maestroBD.toLowerCase()) 
  //        && person.IdUsuario !== this.Usuario.IdUsuario;
  //     });
  //   } else {
  //     this.maestros();
  //   }
  // }

}
