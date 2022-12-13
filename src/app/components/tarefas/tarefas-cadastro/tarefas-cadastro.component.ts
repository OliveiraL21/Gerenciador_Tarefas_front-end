import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { throws } from 'assert';

@Component({
  selector: 'app-tarefas-cadastro',
  templateUrl: './tarefas-cadastro.component.html',
  styleUrls: ['./tarefas-cadastro.component.scss'],
})
export class TarefasCadastroComponent {
  pageHeader: string = 'Cadastro de Tarefas';
  breadcrumbItem: string = 'Cadastro';
  form!: FormGroup;

  saveButtom: boolean = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  initForm(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      horarioInicio: [null, [Validators.required]],
      horarioFim: [null, [Validators.required]],
      duracao: [null, [Validators.required]],
      data: [null, [Validators.required]],
      observacao: [null, null],
    });
  }
  calcularDuracao() {
    let horarioInicio = this.form.get('horarioInicio')?.value;
    let horarioFim = this.form.get('horarioFim')?.value;

    if (
      horarioInicio &&
      horarioInicio !== null &&
      horarioFim &&
      horarioFim !== null
    ) {
      let duracao = horarioFim - horarioInicio;
      console.log(duracao);
      this.form.get('duracao')?.setValue(duracao);
    }
  }
  ngOnInit() {
    this.initForm();
    this.route.snapshot.url[1].path == 'cadastro'
      ? (this.saveButtom = true)
      : (this.saveButtom = false);

    this.form.get('duracao')?.disable();
  }
}
