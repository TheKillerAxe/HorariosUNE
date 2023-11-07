import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-menuing',
  templateUrl: './menuing.component.html',
  styleUrls: ['./menuing.component.css']
})
export class MenuingComponent implements OnInit {
  Usuario : Usuario = new Usuario();

  constructor(public router: Router) {
    if (history.state.IdUsuario != '' && history.state.IdUsuario != undefined) {
      localStorage.setItem('Usuario', JSON.stringify(history.state));
    }

    this.Usuario = JSON.parse(localStorage.getItem('Usuario')!);
    console.log(this.Usuario);
  }
  navigate(route: string) {
    this.router.navigate([route], { state: this.Usuario });
  }
  
  ngOnInit(): void {
  }

}
