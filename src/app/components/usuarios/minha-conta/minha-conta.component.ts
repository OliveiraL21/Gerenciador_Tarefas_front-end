import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent {

  usuarioId: number = Number.parseInt(localStorage.getItem('Id')?.toString() ?? '0');
  form!: UntypedFormGroup;
  loading = false;
  avatarUrl?: string;
  save: boolean = false;
  isSpinning: boolean = false;

  constructor(private fb: UntypedFormBuilder, private usuarioService: UsuariosService, private route: Router, private notification: NzNotificationService) {

  }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  initForm() {
    this.form = this.fb.group({
      perfil: [null, null],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, null]
    });
  }

  back() {
    this.route.navigate(['/tarefas/listagem']);
  }

  editar(): void {
    this.save = true;
    this.form.enable();
  }

  salvar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      let user: Usuario = formValue;
      user.id = this.usuarioId;
      this.usuarioService.update(user).subscribe({
        next: (data: Usuario) => {
          this.createNotification('success', 'Editar dados do usuário', 'Dados de cadastro editados com sucesso !');
        },
        error: (err) => {
          this.createNotification('error', 'Editar dados do usuário', `Erro ${err.status} ao tentar editar os dados do cadastro, tente novamente mais tarde !`);
        }
      })

    }
  }

  detailsUsuario(): void {
    if (this.usuarioId) {
      this.usuarioService.details(this.usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.form.get('username')?.setValue(usuario.username);
          this.form.get('email')?.setValue(usuario.email);
          this.form.get('phoneNumber')?.setValue(usuario.phoneNumber);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  ngOnInit() {
    this.isSpinning = true;
    this.initForm();
    this.form.disable();
    this.detailsUsuario();
    this.isSpinning = false;
  }

}
