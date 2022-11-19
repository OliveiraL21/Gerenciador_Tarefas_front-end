import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService
  ) {}

  novoUsuario() {
    this.router.navigateByUrl('usuarios/cadastro');
  }
  visualizarUsuario(id: any): void {
    this.router.navigateByUrl(`usuarios/visualizar/${id}`);
  }

  editarUsuario(id: any): void {
    this.router.navigateByUrl(`usuarios/editar/${id}`);
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
    this.form = this.fb.group({
      login: [null, null],
      email: [null, Validators.email],
      nome: [null, null],
    });
  }

  filtrar(): void {
    if (this.form.valid) {
      let data = this.form.value;

      let nome =
        data.nome === null || data.nome === undefined || data.nome === ''
          ? null
          : data.nome;

      let login =
        data.login === null || data.login === undefined || data.login === ''
          ? null
          : data.login;

      let email =
        data.email === null || data.email === undefined || data.email === ''
          ? null
          : data.email;

      this.usuarioService.filtro(login, email, nome).subscribe({
        next: (usuarios) => {
          console.log(usuarios);
          this.listOfUsuarios = usuarios.sort((a: any, b: any) =>
            a.nome < b.nome ? -1 : 1
          );
        },
      });
    }
  }
}
