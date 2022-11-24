import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.scss'],
})
export class ClientesCadastroComponent implements OnInit {
  pageTitle: string = 'Cadastro de Clientes';
  breadCrumbItem: string = 'Cadastro';

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private clientesService: ClientesService
  ) {}
  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

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

  submitForm() {
    if (this.form.valid) {
      let data = this.form.value;
      this.clientesService.create(data).subscribe({
        next: (cliente) => {
          this.createNotification(
            'success',
            'Cadastro de Cliente',
            'Cliente cadastrado com sucesso'
          );
        },
        error: (erro) => {
          this.createNotification(
            'error',
            'Cadastro de Clietne',
            `Erro ${erro.status} ao tentar cadastrar o cliente, tente novamente mais tarde`
          );
        },
      });
    }
  }
}
