import { ProjetoListagem } from './../../models/Projetos/projeto';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProjetoService } from './../../services/projetos/projeto.service';
import { ClientesService } from './../../services/clientes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Clientes/cliente';
import { Projeto } from 'src/app/models/Projetos/projeto';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { StatusService } from 'src/app/services/status/status.service';
import { Status } from 'src/app/models/status/status';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent implements OnInit {
  pageTitle: string = 'Projetos';
  breadCrumbItem: string = 'Listagem';

  form!: FormGroup;
  clientes: Cliente[] = [];
  listOfData: ProjetoListagem[] = [];
  listOfProjetos: Projeto[] = [];
  listStatus: Status[] = [];

  isSpinning: boolean = false;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private route: Router,
    private router: ActivatedRoute,
    private projetoService: ProjetoService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private statusService: StatusService
  ) { }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  filtrar(): void {
    this.isSpinning = true;
    let projeto = this.form.get('projeto')?.value === undefined || this.form.get('projeto')?.value === null || this.form.get('projeto')?.value === 0 ? 0 :
      this.form.get('projeto')?.value;

    let cliente = this.form.get('cliente')?.value === undefined || this.form.get('cliente')?.value === null || this.form.get('cliente')?.value === 0 ? 0 : this.form.get('cliente')?.value;


    let status = this.form.get('status')?.value === undefined || this.form.get('status')?.value === null || this.form.get('status')?.value === 0 ? 0 : this.form.get('status')?.value;

    this.projetoService.filtrar(projeto, cliente, status).subscribe({
      next: (projetos) => {
        this.listOfData = projetos;
        console.log(this.listOfData);
        this.isSpinning = false;
      }
    });
    this.isSpinning = false;
  }

  novoProjeto() {
    this.route.navigateByUrl('projetos/cadastro');
  }

  visualizarProjeto(id: number | undefined) {
    this.route.navigateByUrl(`projetos/visualizar/${id}`);
  }

  editarProjeto(id: number | undefined) {
    this.route.navigateByUrl(`projetos/editar/${id}`);
  }

  deleteProjeto(id: number | undefined) {
    this.modalService.confirm({
      nzTitle: 'Deletar Projeto',
      nzContent:
        'Deseja mesmo deletar este registro ?' +
        '<br/>' +
        'Uma vez deletado o registro ele não pode ser recuperado.',
      nzOkDanger: true,
      nzOnOk: () => {
        if (id !== undefined) {
          this.projetoService.delete(id).subscribe({
            next: () => {
              this.createNotification(
                'success',
                'Projeto',
                'Projeto deletado com sucesso !'
              );
              this.listaProjetos();
            },
            error: (erro) => {
              this.createNotification(
                'error',
                'Projeto',
                `erro  ${erro.status} ao tentar deletar o registro, tente novamente mais tarde.`
              );
            },
          });
        }

      },
    });
  }

  listaProjetos(): void {
    this.listaClientes();
    this.projetoService.listaTodos().subscribe({
      next: (projetos) => {
        console.log(projetos);
        this.listOfData = projetos;
      },
    });
  }

  listaSimplesProjeto(): void {
    this.projetoService.listaSimples().subscribe({
      next: (projetos) => {
        this.listOfProjetos = projetos;
      }
    })
  }

  listaClientes(): void {
    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (erro) => {
        console.error(erro);
      },
    });
  }

  listaStatus(): void {
    this.statusService.listaTodos().subscribe({
      next: (status) => {
        this.listStatus = status;
      }
    })
  }

  ngOnInit(): void {
    this.isSpinning = true;
    this.listaProjetos();
    this.form = this.fb.group({
      projeto: [null, null],
      cliente: [null, null],
      status: [null, null],
    });
    this.isSpinning = false;
  }
}
