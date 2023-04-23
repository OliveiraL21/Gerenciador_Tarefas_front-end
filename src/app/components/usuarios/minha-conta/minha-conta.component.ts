import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { read } from 'fs';
import { Utils } from 'src/app/utils/utils';

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
  imgPerfil?: any;
  save: boolean = false;
  isSpinning: boolean = false;
  isEdit: boolean = false;
  util: Utils;


  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private route: Router, private notification: NzNotificationService) {
    this.util = new Utils();
  }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  initForm() {
    this.form = this.fb.group({
      profileImageUrl: [null, null],
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

  dataURItoBlob(dataURI: string) {
    try {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      return blob;
    } catch (error: any) {
      this.isSpinning = false;
      this.createNotification('error', 'Imagem de Perfil', 'Erro ao tentar carregar a imagem do usúario, tente novamente mais tarde !');
      throw (error);
    }
  }

  getPerfil(): string {
    return this.form.get('profileImageUrl')?.value;
  }

  getFile(base64: string): File {
    var file = null;

    var imageBlob: Blob | null = null;
    var dataType: string = 'image/jpeg';
    if (base64 !== null && base64.indexOf(',') > 0) {
      imageBlob = this.dataURItoBlob(base64.substring(base64.indexOf(',') + 1));
      dataType = base64.substring(base64.indexOf(':') + 1).split(';')[0];
    } else {
      imageBlob = this.dataURItoBlob(base64);
    }
    file = new File([imageBlob], 'imagem.png', { type: dataType });
    return file;
  }


  onSelect(event: any) {
    if (event && event !== '') {
      if (event.rejectedFiles.length > 0) {
        event.rejectedFiles.forEach((element: any) => {
          switch (element.reasion) {
            case 'type':
              this.createNotification('error', 'Extensão Inválida', `Erro ao tentar salvar a imagem - ${element.name}, o tipo ${element.type} não é aceito no sistema`);
              break;

            case 'size':
              this.createNotification('error', 'Tamanho Inválido', `O arquivo deve ser menor que 8MB`);
              break;

            default:
              this.createNotification(
                'error',
                'Arquivo inválido',
                'Arquivo ' + element.name + ' inválido'
              );
              break;
          }
        });
      }
      var files: File[] = [];

      files.push(...event.addedFiles);
      files.forEach((file: File) => {
        this.util.fileToBase64(file).then((base64: string) => {
          this.form.get('profileImageUrl')?.setValue(base64);
          this.imgPerfil = this.getFile(this.getPerfil());
        })
      });
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.form.get('profileImageUrl')?.setValue(null);
    this.imgPerfil = null;
  }

  detailsUsuario(): void {
    if (this.usuarioId) {
      this.usuarioService.details(this.usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.form.get('username')?.setValue(usuario.username);
          this.form.get('email')?.setValue(usuario.email);
          this.form.get('phoneNumber')?.setValue(usuario.phoneNumber);
          this.form.get('profileImageUrl')?.setValue(usuario.profileImageUrl);
          this.imgPerfil = this.getFile(this.getPerfil());
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
