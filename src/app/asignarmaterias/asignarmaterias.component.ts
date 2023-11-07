import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-asignarmaterias',
  templateUrl: './asignarmaterias.component.html',
  styleUrls: ['./asignarmaterias.component.css']
})
export class AsignarmateriasComponent implements OnInit {

  Usuario : Usuario = new Usuario();
  constructor(public router: Router) { }
  habilitarmaterias: boolean = true;
  Carrera: string = '';
  Periodo: string = '';
  Materia: string='';
  buscador: boolean = true;

  ngOnInit(): void {
    this.buscadortoggle()
  }

  desactivar(){
    Swal.fire({
      title: 'Está seguro que desea remover la materia a este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Remover',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Materia Removida!', '', 'success')
      } 
    })
  }
 
  buscar() {
    if (this.Carrera === '' || this.Periodo === '') {
      Swal.fire('Por favor seleccione Carrera y Periodo', '', 'error');
    } else {
      this.habilitarmaterias = false;
    }
  }

  buscadortoggle(){
    if(this.Materia === ""){
      this.buscador = true;
    }else{
      this.buscador = false;
    }
  }
}
