import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.scss'],
})
export class ClientesCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Clientes';
  breadCrumbItem: string = 'Cadastro';

  form!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  voltar() {
    this.router.navigateByUrl('clientes/lista');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      Razao_Social: [null, [Validators.required]],
      Cnpj: [null, [Validators.required]],
      Telefone: [null, [Validators.required]],
      Celular: [null, [Validators.required]],
    });
  }
}
