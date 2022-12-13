import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
})
export class TarefasComponent implements OnInit {
  form!: FormGroup;
  isSpinning = false;
  constructor(private fb: FormBuilder, private router: Router) {}

  adicionarTarefa(): void {
    this.router.navigateByUrl('tarefas/cadastro');
  }

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, null],
      periodo: [null, null],
      horarioPeriodo: [null, null],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
