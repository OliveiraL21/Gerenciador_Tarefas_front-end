import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Usuario } from './models/Usuario/usuario';
import { LogoutService } from './services/logout/logout.service';
import { TokenService } from './services/token/token.service';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLogin: boolean = false;
  isCadastro: boolean = false;
  usuarioId: number = Number.parseInt(localStorage.getItem('Id')?.toString() ?? '0');
  avatarUrl: any;
  username!: string;
  constructor(private router: Router, private logoutService: LogoutService, private tokenService: TokenService, private usuarioService: UsuariosService) {

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
      throw (error);
    }
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

  detailsUsuario(): void {
    if (this.usuarioId) {
      this.usuarioService.details(this.usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.username = usuario.username ?? '';
          var url = this.getFile(usuario.profileImageUrl ?? '');
          this.avatarUrl = URL.createObjectURL(url);

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  ngOnInit() {
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(({ url }: any) => {
      const appUrl = url.split('/')[1];
      switch (appUrl) {
        case '/':
          this.isLogin = true;
          break;
        case 'login':
          this.isLogin = true;
          break;

        case 'usuarios':
          this.isCadastro = true;
          this.isLogin = false;
          break;

        case '':
          this.isLogin = true;
          break;


        default:
          this.isLogin = false;
          this.isCadastro = false;
      }
    });

    this.detailsUsuario();
  }

  logout(): void {
    this.logoutService.logoutUsuario().subscribe({
      next: (data) => {
        if (this.tokenService.possuiToken()) {
          this.tokenService.removeToken();
          localStorage.clear();
        }
        this.router.navigate(['/login']);
      }
    })
  }

  minhaConta() {
    if (this.usuarioId !== 0 && this.usuarioId !== undefined && this.usuarioId !== null) {
      this.router.navigateByUrl(`usuario/detalhes/${this.usuarioId}`);
    }
  }
}
