import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { UsuarioCadastroComponent } from './components/usuarios/usuario-cadastro/usuario-cadastro.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  // {
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  // },
  { path: 'usuarios/lista', component: UsuariosComponent },
  { path: 'usuarios/cadastro', component: UsuarioCadastroComponent },
  { path: 'usuarios/visualizar/:id', component: UsuarioCadastroComponent },
  { path: 'usuarios/editar/:id', component: UsuarioCadastroComponent },
  { path: 'tarefas/lista', component: TarefasComponent },
  { path: 'clientes/lista', component: ClientesComponent },
  { path: 'projetos/lista', component: ProjetosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
