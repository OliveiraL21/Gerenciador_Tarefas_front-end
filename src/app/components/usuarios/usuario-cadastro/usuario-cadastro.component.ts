import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Usuários';
  breadCrumbItem: string = 'Cadastro';

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
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

  ngOnInit(): void {
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
  }

  submitForm() {
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
      console.log(data);
    }
  }
}
