import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-editaruser',
  templateUrl: './editaruser.component.html',
  styleUrls: ['./editaruser.component.css']
})
export class EditaruserComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  nombre: boolean = true;
  correo: boolean = true;
  Usuario: Usuario = new Usuario();


  guardar
  () {
    Swal.fire({
      icon: 'success',
      text: 'Usuario editado',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['./inicio'], { state: this.Usuario });
    })
  }
}
