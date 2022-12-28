import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/models/Tarefas/tarefa';
import { TarefaService } from 'src/app/services/tarefas/tarefa.service';
import { ProjetoService } from 'src/app/services/projetos/projeto.service';
import { Projeto } from 'src/app/models/Projetos/projeto';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
})
export class TarefasComponent implements OnInit {
  form!: FormGroup;
  formHoras!: FormGroup;
  isSpinning = false;
  tarefas: Tarefa[] = [];
  projetos: Projeto[] = [];

  modalVisible: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tarefasService: TarefaService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private projetoService: ProjetoService
  ) {}

  listaProjetos(): void {
    this.projetoService.listaTodos().subscribe({
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
    this.router.navigateByUrl(`tarefas/visualizar/${id}`);
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
        next: (totais) => {
          console.log(totais);
          this.formHoras.get('horas')?.setValue(totais);
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

  ngOnInit(): void {
    this.listarTarefas();
    this.initForm();
  }
}
