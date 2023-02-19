import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientesService } from 'src/app/services/clientes.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Clientes/cliente';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  pageTitle: string = 'Clientes';
  breadCrumbItem: string = 'Listagem';
  form!: UntypedFormGroup;
  isSpinning: boolean = false;

  listaClientes: Cliente[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private route: Router,
    private clienteService: ClientesService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) { }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  novoCliente(): void {
    this.route.navigateByUrl('clientes/cadastro');
  }

  visualizarCliente(id: number | null) {
    this.route.navigateByUrl(`clientes/visualizar/${id}`);
  }

  editarCliente(id: number | null) {
    this.route.navigateByUrl(`clientes/editar/${id}`);
  }

  deletarCliente(id: number | null) {
    this.modal.create({
      nzTitle: 'Deletar Cliente',
      nzContent: 'Deseja deletar o cliente ?',
      nzOkText: 'Sim',
      nzCancelText: 'Não',
      nzOkDanger: true,
      nzOnOk: () => {
        this.clienteService.delete(id).subscribe({
          next: (response) => {
            this.createNotification(
              'success',
              'Deletar Cliente',
              'Cliente deletado com sucesso !'
            );
            this.listar();
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Deletar Cliente',
              `Erro ${erro.status} ao tentar deletar o cliente, tente novamente mais tarde`
            );
          },
        });
      },
    });
  }

  listar() {
    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes.sort((a: any, b: any) =>
          a.Razao_Social < b.Razao_Social ? -1 : 1
        );
        console.log(this.listaClientes);
      },
    });
  }

  filtrar(): void {
    this.isSpinning = true;
    let razaoSocial = this.form.get('Razao_Social')?.value === null || this.form.get('Razao_Social')?.value === undefined || this.form.get('Razao_Social')?.value === '' ? null : this.form.get('Razao_Social')?.value;

    let cnpj = this.form.get('Cnpj')?.value === null || this.form.get('Cnpj')?.value === undefined || this.form.get('Cnpj')?.value === '' ? null : this.form.get('Cnpj')?.value.replace('/', '').replace('.', '').replace('-', '').replace('.', '');

    let email = this.form.get('email')?.value === null || this.form.get('email')?.value === undefined || this.form.get('email')?.value === '' ? null : this.form.get('email')?.value;


    this.clienteService.filtrar(razaoSocial, cnpj, email).subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      },
      error: (erro) => {
        this.createNotification('error', 'Clientes', `Erro ${erro.status} ao tentar filtrar, tente novamente mais tarde`);
      }
    });
    this.isSpinning = false;
  }

  initForm(): void {
    this.form = this.fb.group({
      Razao_Social: [null, null],
      Cnpj: [null, null],
      email: [null, null]
    });
  }

  ngOnInit(): void {
    this.isSpinning = true;
    this.listar();
    this.initForm();
    this.isSpinning = false;
  }
}
