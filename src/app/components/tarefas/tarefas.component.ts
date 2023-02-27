import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa, TarefaListagem } from 'src/app/models/Tarefas/tarefa';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { Projeto } from 'src/app/models/Projetos/projeto';
import * as moment from 'moment';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
})
export class TarefasComponent implements OnInit {
  form!: UntypedFormGroup;
  formHoras!: UntypedFormGroup;
  isSpinning = false;
  tarefas: TarefaListagem[] = [];
  projetos: Projeto[] = [];

  modalVisible: boolean = false;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private tarefasService: TarefaService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private projetoService: ProjetoService
  ) { }

  listaProjetos(): void {
    this.projetoService.listaSimples().subscribe({
      next: (data) => {
        this.projetos = data;
      },
    });
  }

  showModal(): void {
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.formHoras.reset();
  }

  createNotification(type: string, title: string, message: string) {
    this.notification.create(type, title, message);
  }

  deletar(id: any): void {
    this.modal.confirm({
      nzTitle: 'Excluir Tarefa',
      nzContent:
        'Deseja excluir a tarefa ?' +
        '<br/>' +
        'Uma vez excluida o registro não pode ser recuperada.',
      nzOkDanger: true,
      nzOnOk: () => {
        this.tarefasService.excluirTarefa(id).subscribe({
          next: (data) => {
            this.createNotification(
              'success',
              'Excluir Tarefas',
              'Tarefa excluida com sucesso !'
            );
            this.listarTarefas();
          },
          error: (erro) => {
            this.createNotification(
              'error',
              'Excluir Tarefas',
              `erro ${erro.status} ao tentar excluir a tarefa, tente novamente mais tarde`
            );
          },
        });
      },
    });
  }

  listarTarefas(): void {
    this.tarefasService.listaTodos().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
        this.tarefas = this.tarefas.map((tarefa: TarefaListagem, index: number) => ({
          id: tarefa.id,
          data: tarefa.data,
          horarioInicio: tarefa.horarioInicio.substring(11, 16),
          horarioFim: tarefa.horarioFim.substring(11, 16),
          duracao: tarefa.duracao.substring(11, 16),
          descricao: tarefa.descricao,
          observacao: tarefa.observacao,
          status: tarefa.status,
          projeto: tarefa.projeto
        }))
        console.log(tarefas);
      },
    });
  }

  adicionarTarefa(): void {
    this.router.navigateByUrl('tarefas/cadastro');
  }

  visualizar(id: any) {
    this.router.navigateByUrl(`tarefas/visualizar/${id}`);
  }

  editar(id: any): void {
    this.router.navigateByUrl(`tarefas/editar/${id}`);
  }

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, null],
      periodo: [null, null],
      projeto: [null, null],
    });

    this.formHoras = this.fb.group({
      data: [null, [Validators.required]],
      horas: [{ disabled: true, value: null }, [Validators.required]],
    });
  }
  calcularHorasTrabalhadas(): void {
    let data: Date = this.formHoras.get('data')?.value;


    if (data && data !== null) {
      this.tarefasService.calcularTotaisHoras(data.toDateString()).subscribe({
        next: (data) => {
          this.formHoras.get('horas')?.setValue(data?.horasTotal);
        },
        error: (erro) => {
          this.createNotification(
            'error',
            'Calcular Total Horas',
            `Erro ${erro.status} ao tentar calcular o total de horas diario, tente novamente mais tarde!`
          );
        },
      });
    }
  }

  filtrar(): void {
    this.isSpinning = true;
    let descricao = this.form.get('descricao')?.value === undefined || this.form.get('descricao')?.value === null || this.form.get("descricao")?.value === '' ? null : this.form.get('descricao')?.value;

    let data = this.form.get('periodo')?.value === undefined ||
      this.form.get('periodo')?.value === undefined === null ? null : this.form.get('periodo')?.value;


    let dataInicio = null;
    let dataFim = null;
    if (data !== null && data !== undefined) {
      dataInicio = data[0];
      dataFim = data[1];

      dataInicio = dataInicio.toDateString();
      dataFim = dataFim.toDateString();
    }

    let projeto = this.form.get('projeto')?.value === undefined || this.form.get('projeto')?.value === null ? 0 : this.form.get('projeto')?.value;

    this.tarefasService.filtrar(descricao, dataInicio, dataFim, projeto).subscribe({
      next: (response) => {
        this.tarefas = response;
        this.isSpinning = false;
      },
      error: (erro) => {
        this.createNotification('error', 'Tarefas', `Erro ${erro.status} ao filtrar tarefas, tente novamente mais tarde !`);
        this.isSpinning = false;
      }
    })
  }

  ngOnInit(): void {
    this.isSpinning = true;
    this.listarTarefas();
    this.initForm();
    this.isSpinning = false;
  }
}
