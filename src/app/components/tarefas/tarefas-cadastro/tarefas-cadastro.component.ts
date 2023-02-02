import { TarefaService } from './../../../services/tarefas/tarefa.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { Tarefa } from 'src/app/models/Tarefas/tarefa';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { Projeto } from 'src/app/models/Projetos/projeto';
import { StatusService } from 'src/app/services/status/status.service';
import { Status } from 'src/app/models/status/status';

@Component({
  selector: 'app-tarefas-cadastro',
  templateUrl: './tarefas-cadastro.component.html',
  styleUrls: ['./tarefas-cadastro.component.scss'],
})
export class TarefasCadastroComponent {
  pageHeader: string = 'Cadastro de Tarefas';
  breadcrumbItem: string = 'Cadastro';
  form!: FormGroup;

  projetos: any[] = [];
  duracao: any;

  saveButtom: boolean = false;
  editButtom: boolean = false;
  isSpinning: boolean = false;
  spinTip: string = 'Carregando Dados';
  status: Status[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private tarefaService: TarefaService,
    private projetoService: ProjetoService,
    private statusService: StatusService
  ) { }

  voltar(): void {
    this.router.navigateByUrl('tarefas/listagem');
  }

  listProjetos(): void {
    this.projetoService.listaSimples().subscribe({
      next: (data) => {
        this.projetos = data;
      },
    });
  }

  listaStatus(): void {
    this.statusService.listaTodos().subscribe({
      next: (data) => {
        this.status = data;
      }
    })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  HoraGasta() {
    let horarioInicio: Date = this.form.get('horarioInicio')?.value;
    let horarioFim: Date = this.form.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioFim &&
      horarioInicio !== null &&
      horarioFim !== null
    ) {
      this.isSpinning = true;
      this.spinTip = 'Calculando Duração';
      if (typeof horarioInicio !== 'object' || typeof horarioFim !== 'object') {
        horarioInicio = new Date(horarioInicio);
        horarioFim = new Date(horarioFim);
      }
      this.tarefaService
        .calcularDuracao(
          horarioInicio.toLocaleTimeString(),
          horarioFim.toLocaleTimeString()
        )
        .subscribe({
          next: (data) => {
            this.form.get('duracao')?.setValue(data.duracao);

          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Calcular Duração',
              `Erro ${erro.status} ao tentar calcular a duração, por favor tente novamente mais tarde !`
            );
          },
        });
      this.isSpinning = false;
      this.spinTip = 'Carregando Dados';
    }
  }

  validarHoras(control: FormControl): ValidationErrors | null {
    let horarioInicio = control.parent?.get('horarioInicio')?.value;
    let horarioFim = control.parent?.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioInicio !== null &&
      horarioFim &&
      horarioFim !== null
    ) {
      if (typeof horarioFim !== 'object' || typeof horarioInicio !== 'object') {
        horarioFim = new Date(horarioFim);
        horarioInicio = new Date(horarioInicio);
      }

      if (horarioFim < horarioInicio) {
        control.setValue(null);
        return { horario: true, error: true };
      }

      return {};
    } else {
      control.parent?.get('duracao')?.setValue(null);
      return {};
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required, this.validarHoras]],
      horarioFim: [null, [Validators.required, this.validarHoras]],
      duracao: [null, null],
      data: [null, [Validators.required]],
      projeto: [null, [Validators.required]],
      observacao: [null, null],
      status: [null, null]
    });
  }

  getDetails(id: number) {
    this.tarefaService.details(id).subscribe({
      next: (tarefa) => {

        this.form.get('descricao')?.setValue(tarefa.descricao);
        this.form.get('data')?.setValue(tarefa.data);

        this.form.get('duracao')?.setValue(tarefa.duracao);
        this.form.get('projeto')?.setValue(tarefa.projetoId);
        this.form.get('observacao')?.setValue(tarefa.observacao);
        this.form.get('horarioInicio')?.setValue(tarefa.horarioInicio);
        this.form.get('horarioFim')?.setValue(tarefa.horarioFim);
      },
    });
  }

  editar(): void {
    this.editButtom = false;
    this.saveButtom = true;
    this.form.enable();
  }

  cancel(): void {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.getDetails(id);
  }

  isCreate(): void {
    this.route.snapshot.url[1].path == 'cadastro'
      ? (this.saveButtom = true)
      : (this.saveButtom = false);
  }

  isDetails(): void {
    if (this.route.snapshot.url[1].path == 'visualizar') {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.pageHeader = 'Visualizar Tarefa';
      this.breadcrumbItem = 'Visualizar';
      this.editButtom = true;
      this.saveButtom = false;
      this.form.disable();
      this.getDetails(id);
    }
  }

  isUpdate(): void {
    if (this.route.snapshot.url[1].path == 'editar') {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.pageHeader = 'Editar Tarefa';
      this.breadcrumbItem = 'Editar';
      this.saveButtom = true;
      this.form.enable();
      this.getDetails(id);
    }
  }

  ngOnInit() {
    this.initForm();
    this.listProjetos();
    this.listaStatus();
    this.isCreate();
    this.isUpdate();
    this.isDetails();
    this.form.get('status')?.setValue(1);
  }

  submitForm(): void {
    const id: any = this.route.snapshot.paramMap.get('id');

    if (this.form.valid) {
      let date = this.form.value;
      let status = this.status.find(x => x.id == date.status);
      let horarioInicio: Date = new Date(date.horarioInicio.toString()?.replace('/', '-'));
      let horarioFim: Date = date.horarioFim;
      console.log(horarioInicio);


      const payload: Tarefa = {
        descricao: date.descricao,
        data: date.data,
        horarioInicio: horarioInicio,
        horarioFim: horarioFim,
        duracao: date.duracao,
        observacao: date.observacao,
        projetoId: date.projeto,
        status: status
      };

      console.log(payload);
      if (id === null || !id) {
        this.tarefaService.create(payload).subscribe({
          next: (data) => {
            this.createNotification(
              'success',
              'Cadastro de Tarefas',
              'Tarefa cadastrada com sucesso'
            );
            this.form.reset();
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Cadastro de Tarefas',
              `Erro ${erro.status} ao tentar cadastrar a tarefa, por favor tente novamente mais tarde`
            );
          },
        });
      } else {
        this.tarefaService.update(id, payload).subscribe({
          next: (tarefa) => {
            this.createNotification(
              'success',
              'Editar Tarefas',
              'Tarefa editada com sucesso !'
            );
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Editar Tarefa',
              `Erro ${erro.status} ao tentar editar a tarefa, por favor tente novamente mais tarde`
            );
          },
        });
      }
    } else {
      this.createNotification(
        'error',
        'Cadastro de Tarefas',
        'Por favor preencha todos os campos obrigatórios'
      );
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
}
