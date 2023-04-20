import { StatusService } from 'src/app/services/status/status.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientesService } from 'src/app/services/clientes.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  pageTitle: string = 'Cadastro de Projetos';

  form!: UntypedFormGroup;
  clientes: Cliente[] = [];

  isEdit: boolean = false;
  saveButtom: boolean = true;

  status: Status[] = [];
  isSpinning: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private route: Router,
    private clienteService: ClientesService,
    private projetosService: ProjetoService,
    private notification: NzNotificationService,
    private router: ActivatedRoute,
    private statusService: StatusService
  ) { }

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

  listaStatus() {
    this.statusService.listaTodos().subscribe({
      next: (data) => {
        this.status = data;
      }
    })
  }

  visualizar() {
    this.form.disable();
    this.pageTitle = 'Visualizar Projeto';
    this.isEdit = true;
    this.saveButtom = false;
  }

  editar() {
    this.form.enable();
    this.pageTitle = 'Editar Projeto';
    this.isEdit = false;
    this.saveButtom = true;
  }

  cancelar() {
    this.route.navigateByUrl('projetos/listagem');
  }
  ngOnInit() {
    let id: any = this.router.snapshot.paramMap.get('id');

    this.listaClientes();
    this.listaStatus();
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFim: [null, Validators.required],
      cliente: [null, Validators.required],
      status: [null, Validators.required]
    });

    this.form.get('status')?.setValue(1);
    if (id && id !== null) {
      this.isSpinning = true;
      this.projetosService.details(id).subscribe({
        next: (projeto) => {
          this.form.get('descricao')?.setValue(projeto.descricao);
          this.form.get('dataInicio')?.setValue(projeto.dataInicio);
          this.form.get('dataFim')?.setValue(projeto.dataFim);
          this.form.get('cliente')?.setValue(projeto.clienteId);
          this.isSpinning = false;
        },
        error: (erro) => {
          console.log(erro);
          this.isSpinning = false;
        }
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

    if (this.form.valid) {
      this.isSpinning = true;
      let data = this.form.value;

      let cliente = this.clientes.find((x) => x.id == data.cliente);
      let status = this.status.find(x => x.id == data.status);

      let dataSubmit = {
        descricao: data.descricao,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        cliente: cliente !== null && cliente !== undefined ? cliente : null,
        clienteId: data.cliente,
        tarefas: [],
        status: status !== null && status !== undefined ? status : null,
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
            this.isSpinning = false;
            this.route.navigateByUrl('projetos/listagem');
          },
          error: (erro) => {
            console.error(erro);
            this.createNotification(
              'error',
              'Cadastro de Projetos',
              `Erro ${erro.status} ao tentar cadastrar o projeto, tente novamente masi tarde !`
            );
            this.isSpinning = false;
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
            this.isSpinning = false;
            this.route.navigateByUrl('projetos/listagem');
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Edição de Projeto',
              `Erro ${erro.status} ao tentar editar o projeto por favor tente novamente mais tarde.`
            );
            this.isSpinning = false;
          },
        });
      }
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }
}
