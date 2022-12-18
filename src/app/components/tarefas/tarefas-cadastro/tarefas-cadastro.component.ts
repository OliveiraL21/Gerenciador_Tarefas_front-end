import { TarefaService } from './../../../services/tarefas/tarefa.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { throws } from 'assert';
import * as moment from 'moment';
import { Time } from '@angular/common';
import { Tarefa } from 'src/app/models/Tarefas/tarefa';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { Projeto } from 'src/app/models/Projetos/projeto';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private tarefaService: TarefaService,
    private projetoService: ProjetoService
  ) {}
  voltar(): void {
    this.router.navigateByUrl('tarefas/listagem');
  }

  listProjetos(): void {
    this.projetoService.listaTodos().subscribe({
      next: (data) => {
        this.projetos = data;
      },
    });
  }
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required]],
      horarioFim: [null, [Validators.required]],
      duracao: [null, null],
      data: [null, [Validators.required]],
      projeto: [null, [Validators.required]],
      observacao: [null, null],
    });
  }

  calcularDuracao() {
    let horarioInicio: Date = this.form.get('horarioInicio')?.value;
    let horarioFim: Date = this.form.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioInicio !== null &&
      horarioFim &&
      horarioFim !== null
    ) {
      let duracao = horarioInicio.setHours(
        horarioFim.getHours() - horarioInicio.getHours()
      );
      this.form.get('duracao')?.setValue(duracao);
      this.duracao = new Date(duracao);
    } else {
      this.form.get('duracao')?.setValue(null);
    }
  }

  getDetails(id: number) {
    this.tarefaService.details(id).subscribe({
      next: (tarefa) => {
        this.form.get('descricao')?.setValue(tarefa.descricao);
        this.form.get('data')?.setValue(tarefa.data);
        this.form.get('horarioInicio')?.setValue(tarefa.horarioInicio);
        this.form.get('horarioFim')?.setValue(tarefa.horarioFim);
        this.form.get('duracao')?.setValue(tarefa.duracao);
        this.form.get('projeto')?.setValue(tarefa.projeto);
        this.form.get('observacao')?.setValue(tarefa.observacao);
      },
    });
  }

  editar(): void {
    this.editButtom = false;
    this.saveButtom = true;
    this.form.enable();
  }

  isCreate(): void {
    this.route.snapshot.url[1].path == 'cadastro'
      ? (this.saveButtom = true)
      : (this.saveButtom = false);
    this.form.get('duracao')?.disable();
  }

  isDetails(): void {
    if (this.route.snapshot.url[1].path == 'visualizar') {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.pageHeader = 'Visualizar Tarefa';
      this.breadcrumbItem = 'Visualizar';
      this.editButtom = true;
      this.form.disable();
      this.getDetails(id);
    }
  }

  isUpdate(): void {
    if (this.route.snapshot.url[1].path == 'editar') {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.pageHeader = 'Editar Tarefa';
      this.breadcrumbItem = 'Editar';
      this.form.enable();
      this.getDetails(id);
    }
  }

  ngOnInit() {
    this.initForm();
    this.listProjetos();
    this.isCreate();
    this.isUpdate();
    this.isDetails();
  }

  submitForm(): void {
    if (this.form.valid) {
      let date = this.form.value;
      let projeto: any;

      this.projetoService.details(date.projeto).subscribe({
        next: (project) => {
          projeto = project;
        },
      });

      let horarioInicio: Date = date.horarioInicio;
      let horarioFim: Date = date.horarioFim;

      let payload: Tarefa = {
        descricao: date.descricao,
        data: date.data,
        horarioInicio: horarioInicio,
        horarioFim: horarioFim,
        duracao: this.duracao,
        observacao: date.observacao,
        status: {
          id: 1,
          descricao: 'Ativo',
        },
        projeto: projeto,
      };

      console.log(date);
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
