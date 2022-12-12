import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientesService } from 'src/app/services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/Clientes/cliente';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { Status } from 'src/app/models/status/status';

@Component({
  selector: 'app-projetos-cadastro',
  templateUrl: './projetos-cadastro.component.html',
  styleUrls: ['./projetos-cadastro.component.scss'],
})
export class ProjetosCadastroComponent {
  breadCrumbItem: string = 'Cadastro';
  pageTitle: string = 'Cadastro de Projetos';

  form!: FormGroup;
  clientes: Cliente[] = [];

  isEdit: boolean = false;
  saveButtom: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private clienteService: ClientesService,
    private projetosService: ProjetoService,
    private notification: NzNotificationService,
    private router: ActivatedRoute
  ) {}

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  voltar(): void {
    this.route.navigateByUrl('projetos/listagem');
  }

  listaClientes(): void {
    this.clienteService.listarTodos().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
    });
  }

  visualizar() {
    this.form.disable();
    this.pageTitle = 'Visualizar Projeto';
    this.breadCrumbItem = 'Visualizar';
    this.isEdit = true;
    this.saveButtom = false;
  }

  editar() {
    this.form.enable();
    this.pageTitle = 'Editar Projeto';
    this.breadCrumbItem = 'Editar';
    this.isEdit = false;
    this.saveButtom = true;
  }

  ngOnInit() {
    let id: any = this.router.snapshot.paramMap.get('id');

    this.listaClientes();
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      data_inicio: [null, [Validators.required]],
      data_fim: [null, Validators.required],
      cliente: [null, Validators.required],
    });

    if (id && id !== null) {
      this.projetosService.details(id).subscribe({
        next: (projeto) => {
          this.form.get('descricao')?.setValue(projeto.descricao);
          this.form.get('data_inicio')?.setValue(projeto.data_Inicio);
          this.form.get('data_fim')?.setValue(projeto.data_Fim);
          this.form.get('cliente')?.setValue(projeto.clienteId);
        },
      });

      let url = this.route.url.split('/');
      if (url[2] == 'visualizar') {
        console.log(url);
        this.visualizar();
      } else {
        this.editar();
      }
    }
  }

  submitForm() {
    let id: any = this.router.snapshot.paramMap.get('id');

    console.log(id);

    if (this.form.valid) {
      let data = this.form.value;

      let cliente = this.clientes.find((x) => x.id == data.cliente);

      let dataSubmit = {
        descricao: data.descricao,
        data_Inicio: data.data_inicio,
        data_Fim: data.data_fim,
        cliente: cliente !== null && cliente !== undefined ? cliente : null,
        clienteId: data.cliente,
        tarefas: [],
        status: {
          id: 1,
          descricao: 'Ativo',
        },
      };

      if (id == null || !id) {
        this.projetosService.create(dataSubmit).subscribe({
          next: (projeto) => {
            console.log(projeto);
            this.createNotification(
              'success',
              'Cadastro de Projetos',
              'O Projeto foi cadstrado com sucesso !'
            );
          },
          error: (erro) => {
            console.error(erro);
            this.createNotification(
              'error',
              'Cadastro de Projetos',
              `Erro ${erro.status} ao tentar cadastrar o projeto, tente novamente masi tarde !`
            );
          },
        });
      } else {
        this.projetosService.update(id, dataSubmit).subscribe({
          next: (projeto) => {
            this.createNotification(
              'success',
              'Edição de Projeto',
              'Projeto editado com sucesso.'
            );
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Edição de Projeto',
              `Erro ${erro.status} ao tentar editar o projeto por favor tente novamente mais tarde.`
            );
          },
        });
      }
    }
  }
}
