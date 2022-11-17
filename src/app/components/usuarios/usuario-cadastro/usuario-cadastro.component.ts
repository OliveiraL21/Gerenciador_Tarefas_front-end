import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
export class UsuarioCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Usuários';
  breadCrumbItem: string = 'Cadastro';

  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
      email: [null, Validators.required, Validators.email],
    });
  }
}
