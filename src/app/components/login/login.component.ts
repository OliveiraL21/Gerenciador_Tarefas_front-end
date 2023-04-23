import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioLogin } from 'src/app/models/login/usuario-login';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: UntypedFormGroup;
  passwordVisible: boolean = false;
  isSpinning: boolean = false;

  constructor(private fb: UntypedFormBuilder, private loginService: LoginService, private router: Router, private messageService: NzMessageService, private tokenService: TokenService) {


  }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login(): void {
    if (this.form.valid) {
      this.isSpinning = true;
      const login = this.form.value;

      const user: UsuarioLogin = new UsuarioLogin();
      user.Username = login.username;
      user.Password = login.password;

      this.loginService.login(user).subscribe({
        next: (data) => {
          this.tokenService.setToken(data.token);
          if (this.tokenService.possuiToken()) {
            localStorage.setItem('Id', data.usuarioId);
            this.messageService.success("Login Realizado com sucesso!");
            this.router.navigate(['/tarefas/listagem']);
            this.isSpinning = false;
          } else {
            this.messageService.error('Erro ao tentar efetuar login, tente novamente!');
            this.isSpinning = false;
          }
        },
        error: (erro) => {
          console.log(erro);
          this.messageService.error(`${erro.error.error}`);
          this.isSpinning = false;
        }
      })

    }
    else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      this.isSpinning = false;
    }
    this.isSpinning = false;
  }

  cadastrarUsuario(): void {
    this.router.navigate(['/usuarios/cadastro']);
  }

  ngOnInit() {
    this.initForm();
  }
}
