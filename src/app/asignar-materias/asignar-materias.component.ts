import { Component } from '@angular/core';
import { Materia, Usuario } from '../database/database';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, collectionData } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc, getDoc, getDocs, getFirestore, DocumentData, arrayRemove } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { Carrera } from '../database/database';

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {

  Usuario : Usuario = new Usuario();
  Carrera : Carrera = new Carrera();
  Materia : Materia = new Materia();

  carreras:DocumentData[]=[];
  materias:DocumentData[]=[];

  buscador=false;
  maestroBD:string="";
  profesorsillo:string[]= new Array();

  maestrosBuscados: Usuario[] = new Array()

  aididelprofe:string="";

  constructor(private firestore: Firestore) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.traerMaterias();
    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
  }

    buscarMaterias(){
      if(this.Carrera.Nombre!="" && this.Materia.Periodo !=""){
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
            })
          }
        });
      }
    }

    asignarMateria(){
      if(this.Carrera.Nombre!="" && this.Materia.Periodo !="" && this.maestroBD !="" && this.Materia.Nombre != ""){
        const UsuarioC = collection(this.firestore, "Usuario");
        const Query2 = query(UsuarioC, where("IdUsuario", "==", this.aididelprofe));
      }else{
        console.log(this.aididelprofe);
      }
      
    }

    // cambiaPeriodos(){
    //       for(let i=1; i<= this.Carrera.CantidadPeriodos; i++){
    //       const selectElement = document.getElementById("periodo") as HTMLSelectElement;
    //       const nuevaOpcion = document.createElement("option");
    //       nuevaOpcion.value = "i";
    //       nuevaOpcion.text = "i";
    //       selectElement.appendChild(nuevaOpcion);
    //     }
    // }

    

    async maestros(){
      const maestrosC = collection(this.firestore, 'Usuario');
        const querySnapshot = await getDocs(maestrosC);
        
        if (!querySnapshot.empty) {
          this.maestrosBuscados = querySnapshot.docs.map(doc => {
            const maestro = new Usuario();
            maestro.setData(doc.data());
            return maestro;
          }); 
          this.buscaprofes();
          
        }
    }

    buscaprofes(){
      if (this.maestroBD.trim() !== ' ') {
        this.maestrosBuscados = this.maestrosBuscados.filter(profe => {
          const searchableFields = [
            profe.Nombre.toLowerCase(),
            profe.TipoMaestro.toLowerCase(),
          ];
  
          for (const field of searchableFields) {
            if (field.includes(this.maestroBD.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      }
    }

    buscaprofesLetraxLetra(){
      if (this.maestroBD.trim() !== '') {
        this.maestrosBuscados = this.maestrosBuscados.filter(person => {
          const nombre = person.Nombre.toLowerCase();
          return nombre.startsWith(this.maestroBD.toLowerCase()) 
           && person.IdUsuario !== this.Usuario.IdUsuario;
        });
      } else {
        this.maestros();
      }
    }

    traerMaterias(){
      const CarrerasC = collection(this.firestore, "Carrera");
      const Query = query(CarrerasC);
      collectionData(Query).subscribe((snapCarreras) => {
        // this.carreras = new Array();
        if (snapCarreras.length > 0) {
          snapCarreras.forEach((item: any) => {
            let recInf = new Carrera();
            recInf.setData(item)
            this.carreras.push(recInf);
          })
        }
      });
    }

    pasardato(profesor: Usuario){
      this.maestroBD = profesor.Nombre;   
      this.buscador=false;
   }
}
