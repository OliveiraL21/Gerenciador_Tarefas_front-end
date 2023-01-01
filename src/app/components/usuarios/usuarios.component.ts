import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  isSpinning: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) { }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

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

  deleteUsuario(id?: number) {
    this.modal.create({
      nzTitle: 'Excluir Usuário',
      nzContent: 'Deseja excluir este usuario ?',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.usuarioService.delete(id).subscribe({
          next: (response) => {
            this.createNotification(
              'success',
              'Excluir Usuário',
              'Usuário excluido com sucesso!'
            );
            this.listaTodos();
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Excluir Usário',
              `Erro ${erro.status} ao tentar excluir o usuário, tente novamente mais tarde"`
            );
          },
        });
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
    this.isSpinning = true;
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
          this.isSpinning = false;
        },
        error: (erro) => {
          this.createNotification('erro', 'Usuários', `Erro ${erro.status} ao tentar filtrar os dados, por favor tente novamente mais tarde!`);
        }
      });
      this.isSpinning = false;
    }
  }
}
