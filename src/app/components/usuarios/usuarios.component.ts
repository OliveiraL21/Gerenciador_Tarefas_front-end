import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  listOfUsuarios: Usuarios[] = [];
  constructor(
    private router: Router,
    private usuarioService: UsuariosService
  ) {}

  novoUsuario() {
    this.router.navigateByUrl('usuarios/cadastro');
  }

  listaTodos(): void {
    this.usuarioService.listaUsuarios().subscribe({
      next: (response) => {
        this.listOfUsuarios = response;
      },
    });
  }
  ngOnInit(): void {
    this.listaTodos();
  }
}
