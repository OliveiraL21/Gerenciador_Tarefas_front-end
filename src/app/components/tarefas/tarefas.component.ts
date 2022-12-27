import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  isSpinning = false;
  tarefas: Tarefa[] = [];
  projetos: Projeto[] = [];

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
  }

  ngOnInit(): void {
    this.listarTarefas();
    this.initForm();
  }
}
