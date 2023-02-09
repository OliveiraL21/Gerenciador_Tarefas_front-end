import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent {

  usuarioId: number = Number.parseInt(localStorage.getItem('Id')?.toString() ?? '0');
  form!: FormGroup;
  loading = false;
  avatarUrl?: string;
  save: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private route: Router) {

  }

  initForm() {
    this.form = this.fb.group({
      imagem: [null, null],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, null]
    });
  }

  back() {
    this.route.navigate(['/tarefas/listagem']);
  }

  editar(): void {
    this.save = true;
    this.form.enable();
  }

  salvar(): void {

  }


  ngOnInit() {
    this.initForm();
    this.form.disable();
  }

}
