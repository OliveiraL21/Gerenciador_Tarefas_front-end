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

  detailsUsuario(): void {
    if (this.usuarioId) {
      this.usuarioService.details(this.usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.username = usuario.username ?? '';
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
