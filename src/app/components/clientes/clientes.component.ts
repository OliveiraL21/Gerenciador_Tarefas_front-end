import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientesService } from 'src/app/services/clientes.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form!: FormGroup;
  isSpinning: boolean = false;

  listaClientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private clienteService: ClientesService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}

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
  ngOnInit(): void {
    this.listar();
    this.form = this.fb.group({
      Razao_Social: [null, null],
      Cnpj: [null, null],
    });
  }
}
