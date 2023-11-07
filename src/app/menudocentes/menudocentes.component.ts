import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../database/database';

@Component({
  selector: 'app-menudocentes',
  templateUrl: './menudocentes.component.html',
  styleUrls: ['./menudocentes.component.css']
})
export class MenudocentesComponent implements OnInit {
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
