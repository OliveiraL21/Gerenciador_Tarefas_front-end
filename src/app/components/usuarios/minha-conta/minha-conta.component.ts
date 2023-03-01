import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { read } from 'fs';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent {

  usuarioId: number = Number.parseInt(localStorage.getItem('Id')?.toString() ?? '0');
  uploadUrl: string = `https://localhost:44336/Usuario/UpdateProfileImage/${this.usuarioId}`;
  form!: UntypedFormGroup;
  loading = false;
  avatarUrl?: any;
  save: boolean = false;
  isSpinning: boolean = false;
  isEdit: boolean = false;

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
    this.isEdit = false;
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

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

      if (!isJpgOrPng) {
        this.createNotification('error', 'Imagem de Perfil', 'Erro ao tentar carregar imagem de perfil, só é permitido imagens do tipo jpg');
        observer.complete();
        return;
      }

      const isLtm2 = file.size! / 1024 / 1024 < 8;

      if (!isLtm2) {
        this.createNotification('error', 'Imagem de Perfil', 'A imagem deve ter menos 8MB de tamanho');
        observer.complete();
        return;
      }

      observer.next(isJpgOrPng && isLtm2);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.createNotification('error', 'Imagem de Perfil', 'Erro ao tentar carregar imagem de perfil, tente novamente mais tarde');
        this.loading = false;
        break;
    }
  }


  detailsUsuario(): void {
    if (this.usuarioId) {
      this.usuarioService.details(this.usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.form.get('username')?.setValue(usuario.username);
          this.form.get('email')?.setValue(usuario.email);
          this.form.get('phoneNumber')?.setValue(usuario.phoneNumber);
          let fileName = usuario.profileImageUrl?.split('\\');
          let name = fileName![fileName!.length - 1];

          this.usuarioService.getUserPerfileimg(name).subscribe({
            next: (perfil) => {
              this.avatarUrl = 'data:image/jpeg;base64,' + perfil.image;
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  ngOnInit() {
    this.isSpinning = true;
    this.isEdit = true;
    this.initForm();
    this.form.disable();
    this.detailsUsuario();
    this.isSpinning = false;
  }

}
