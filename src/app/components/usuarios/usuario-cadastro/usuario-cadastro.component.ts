import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Usuários';
  breadCrumbItem: string = 'Cadastro';
  isEdit: boolean = true;
  isSpinning: boolean = false;

  usuario: Usuarios = new Usuarios();
  editButtom: boolean = false;
  saveButtom: boolean = true;

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private notification: NzNotificationService,
    private usuarioService: UsuariosService
  ) {}

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  voltar(): void {
    this.route.navigateByUrl('usuarios/lista');
  }

  cancelar(): void {
    this.form.reset();
  }

  visualizar() {
    this.breadCrumbItem = 'Visualizar';
    this.pageTitle = 'Visualizar Usuário';
    this.isEdit = false;
    this.editButtom = true;
    this.saveButtom = false;
    this.form.disable();
  }

  edicao() {
    this.breadCrumbItem = 'Edição';
    this.pageTitle = 'Ediçao de Usuário';
    this.isEdit = false;
    this.editButtom = false;
    this.saveButtom = true;
    this.form.enable();
  }

  ngOnInit(): void {
    let id: any = this.router.snapshot.paramMap.get('id');
    let url = this.route.url.split('/');

    this.form = this.fb.group({
      id: [null, null],
      nome: [null, [Validators.required, Validators.maxLength(30)]],
      login: [null, [Validators.required, Validators.maxLength(20)]],
      senha: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
    });

    if (id !== null && id) {
      if (url[2] == 'visualizar') {
        this.visualizar();
      } else {
        this.edicao();
      }

      this.isSpinning = true;
      this.usuarioService.details(id).subscribe({
        next: (usuario) => {
          this.form.get('nome')?.setValue(usuario.nome);
          this.form.get('email')?.setValue(usuario.email);
          this.form.get('login')?.setValue(usuario.login);

          this.usuario.senha = usuario.senha;
        },
      });
      this.isSpinning = false;
    }
  }

  submitForm() {
    let id: any = this.router.snapshot.paramMap.get('id');

    if (id === null || id === undefined || id === 0) {
      if (this.form.valid) {
        let data = this.form.value;
        this.usuarioService.create(data).subscribe({
          next: (response) => {
            console.log(response);
            this.createNotification(
              'success',
              'Cadastro de Usuário',
              'Usuário cadastrado com sucesso!'
            );
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Cadastro de Usuário',
              `Erro ${erro.status} ao tentar cadastrar um usuário, tente novamente mais tarde !`
            );
          },
        });
      }
    } else {
      this.form.get('senha')?.removeValidators(Validators.required);
      let dataUpdate = this.form.value;
      // debugger;

      dataUpdate.id = parseInt(id);
      dataUpdate.senha = this.usuario.senha;

      this.usuarioService.update(dataUpdate.id, dataUpdate).subscribe({
        next: (response) => {
          this.createNotification(
            'success',
            'Edição de Usuário',
            'Usuário editado com sucesso!'
          );
        },
        error: (erro) => {
          this.createNotification(
            'error',
            'Edição de Usuário',
            `Erro ${erro.status} ao tentar editar um usuário, tente novamente mais tarde !`
          );
        },
      });
      console.log(dataUpdate);
    }
  }
}
