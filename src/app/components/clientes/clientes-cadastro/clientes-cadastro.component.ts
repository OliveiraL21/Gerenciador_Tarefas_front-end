import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private clientesService: ClientesService
  ) {}
  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  voltar() {
    this.router.navigateByUrl('clientes/lista');
  }

  cancelar() {
    this.form.reset();
  }

  ngOnInit(): void {
    let id: any = this.route.snapshot.paramMap.get('id');
    id = parseInt(id);
    console.log(id);
    let url = this.router.url.split('/');
    console.log(url);

    this.form = this.fb.group({
      Razao_Social: [null, [Validators.required]],
      Cnpj: [null, [Validators.required]],
      Telefone: [null, [Validators.required]],
      Celular: [null, [Validators.required]],
    });

    if (id !== undefined && id !== null && id !== 0) {
      if (url[2] == 'editar') {
        this.breadCrumbItem = 'Editar';
        this.pageTitle = 'Editar Clientes';
      } else if (url[2] == 'visualizar') {
        this.breadCrumbItem = 'Visualizar';
        this.pageTitle = 'Visualizar Cliente';
        this.form.disable();
      }

      this.clientesService.details(id).subscribe({
        next: (cliente) => {
          console.log(cliente);
          this.form.get('Razao_Social')?.setValue(cliente.razao_Social);
          this.form.get('Cnpj')?.setValue(cliente.cnpj);
          this.form.get('Telefone')?.setValue(cliente.telefone);
          this.form.get('Celular')?.setValue(cliente.celular);
        },
      });
    }
  }

  submitForm() {
    let id: any = this.route.snapshot.paramMap.get('id');

    if (this.form.valid) {
      let data = this.form.value;
      if (id === undefined || id === null || id === 0) {
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
      } else {
        id = parseInt(id);
        this.clientesService.update(id, data).subscribe({
          next: (response) => {
            this.createNotification(
              'success',
              'Edição de Cliente',
              'Cliente Editado com sucesso'
            );
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Edição de Cliente',
              `Erro ${erro.status} ao tentar editar o cliente, tente novamente mais tarde.`
            );
          },
        });
      }
    }
  }
}
