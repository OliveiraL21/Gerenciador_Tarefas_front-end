import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuarioLogin } from 'src/app/models/login/usuario-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  passwordVisible: boolean = false;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {


  }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login(): void {
    if (this.form.valid) {
      const login = this.form.value;

      const user: UsuarioLogin = new UsuarioLogin();
      user.Username = login.username;
      user.Password = login.password;

      console.log(login);
      this.loginService.login(user).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/tarefas/listagem']);
        },
        error: (erro) => {
          console.log(erro);
        }
      })

    }
    else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }

  ngOnInit() {
    this.initForm();
  }
}
