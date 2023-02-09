import { TarefasCadastroComponent } from './components/tarefas/tarefas-cadastro/tarefas-cadastro.component';
import { UsuarioCadastroComponent } from './components/usuarios/usuario-cadastro/usuario-cadastro.component';
import { ClientesCadastroComponent } from './components/clientes/clientes-cadastro/clientes-cadastro.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { ProjetosCadastroComponent } from './components/projetos/projetos-cadastro/projetos-cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { MinhaContaComponent } from './components/usuarios/minha-conta/minha-conta.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientes/lista', component: ClientesComponent },
  { path: 'clientes/cadastro', component: ClientesCadastroComponent },
  { path: 'clientes/visualizar/:id', component: ClientesCadastroComponent },
  { path: 'clientes/editar/:id', component: ClientesCadastroComponent },
  { path: 'usuarios/cadastro', component: UsuarioCadastroComponent },
  { path: 'usuario/conta/minhaConta/:id', component: MinhaContaComponent },
  { path: 'projetos/listagem', component: ProjetosComponent },
  { path: 'projetos/cadastro', component: ProjetosCadastroComponent },
  { path: 'projetos/editar/:id', component: ProjetosCadastroComponent },
  { path: 'projetos/visualizar/:id', component: ProjetosCadastroComponent },
  { path: 'tarefas/listagem', component: TarefasComponent },
  { path: 'tarefas/cadastro', component: TarefasCadastroComponent },
  { path: 'tarefas/editar/:id', component: TarefasCadastroComponent },
  { path: 'tarefas/visualizar/:id', component: TarefasCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
