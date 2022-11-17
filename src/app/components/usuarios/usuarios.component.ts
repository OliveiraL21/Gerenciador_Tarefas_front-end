import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  listOfUsuarios: Usuarios[] = [];
  constructor(private router: Router) {}

  novoUsuario() {
    this.router.navigateByUrl('usuarios/cadastro');
  }

  ngOnInit(): void {
    this.listOfUsuarios.push({
      nome: 'Lucas',
      login: 'Lucasxpd',
      email: 'lucas@luxfacta.com',
      senha: 'teste',
    });
  }
}
