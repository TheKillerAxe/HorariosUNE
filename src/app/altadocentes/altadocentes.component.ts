import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';


@Component({
  selector: 'app-altadocentes',
  templateUrl: './altadocentes.component.html',
  styleUrls: ['./altadocentes.component.css']
})
export class AltadocentesComponent implements OnInit {

  Usuario: Usuario = new Usuario();
  usuario = '';
  nombre = '';
  correo = '';
  tipo = '';
  contrasena = '';

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  guardar() {
    Swal.fire({
      title: 'Estás seguro de subir este archivo?',
      showDenyButton: true,
      confirmButtonText: 'Subir',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Archivo  Subido!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Archivo no Subido', '', 'error')
      }
    })
  }

  subirdocente() {
    if (this.usuario === "" || this.nombre === "" || this.correo === "" || this.tipo === "" || this.contrasena === "") {
      Swal.fire({
        icon: 'error',
        text: 'Favor de llenar todos los campos',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['./registro'], { state: this.Usuario });
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Usuario registrado con exito en el sistema',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['./inicio'], { state: this.Usuario });
      })
    }
  
  }
}
