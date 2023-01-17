import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent {
  form!: FormGroup;
  isSpinning: boolean = false;
  passwordVisible: boolean = false;


  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private notification: NzNotificationService, private router: Router) { }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.isSpinning = true;
      let usuario: Usuario = new Usuario();

      usuario = this.form.value;
      this.usuarioService.create(usuario).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.createNotification('success', 'Cadastro de Usuário', 'Cadastro realizado com sucesso !');
            this.redirectToLogin();
          } else {
            this.createNotification('error', 'Cadastro de Usuário', `Erro ${result.status} - ${result.reasons.message}`);
          }
        },
        error: (erro) => {
          this.createNotification('error', 'Cadastro de Usuários', `Erro ${erro.status} ao tentar cadastrar`)
        }
      });
      this.isSpinning = false;
    } else {
      this.isSpinning = false;
      Object.values(this.form.controls).forEach(control => {
        if (!control.valid && control.hasError('required')) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }
}
