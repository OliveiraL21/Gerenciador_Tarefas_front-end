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

interface IItemData {
  id: number;
  descricao: string;
  data_inicio: Date;
  status: string;
  cliente: string | undefined;
  clienteId: number;
}
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
  listOfData: IItemData[] = [];

  isSpinning: boolean = false;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private route: Router,
    private router: ActivatedRoute,
    private projetoService: ProjetoService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {}

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  novoProjeto() {
    this.route.navigateByUrl('projetos/cadastro');
  }

  visualizarProjeto(id: number) {
    this.route.navigateByUrl(`projetos/visualizar/${id}`);
  }

  editarProjeto(id: number) {
    this.route.navigateByUrl(`projetos/editar/${id}`);
  }

  deleteProjeto(id: number) {
    this.modalService.confirm({
      nzTitle: 'Deletar Projeto',
      nzContent:
        'Deseja mesmo deletar este registro ?' +
        '<br/>' +
        'Uma vez deletado o registro ele não pode ser recuperado.',
      nzOkDanger: true,
      nzOnOk: () => {
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
      },
    });
  }

  listaProjetos(): void {
    this.listaClientes();
    this.projetoService.listaTodos().subscribe({
      next: (projetos) => {
        console.log(projetos);
        this.listOfData = projetos.map((projeto: any, index: any) => ({
          id: projeto.id,
          descricao: projeto.descricao,
          data_inicio: projeto.data_Inicio,
          data_fim: projeto.data_Fim,
          cliente:
            this.clientes.find((x) => x.id == projeto.clienteId) !== undefined
              ? this.clientes.find((x) => x.id == projeto.clienteId)
                  ?.razao_Social
              : '',
          clienteId: projeto.clienteId,
          status: projeto.status?.descricao,
        }));
      },
    });
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

  ngOnInit(): void {
    this.listaProjetos();
    this.form = this.fb.group({
      projeto: [null, null],
      cliente: [null, null],
    });
  }
}
