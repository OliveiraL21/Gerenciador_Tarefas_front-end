import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarefasComponent } from './components/tarefas/tarefas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProjetosComponent } from './components/projetos/projetos.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  { path: 'usuarios/lista', component: UsuariosComponent },
  { path: 'tarefas/lista', component: TarefasComponent },
  { path: 'clientes/lista', component: ClientesComponent },
  { path: 'projetos/lista', component: ProjetosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
