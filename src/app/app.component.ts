import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LogoutService } from './services/logout/logout.service';
import { TokenService } from './services/token/token.service';

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

  constructor(private router: Router, private logoutService: LogoutService, private tokenService: TokenService) {

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
