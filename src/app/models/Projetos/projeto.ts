import { Cliente } from '../Clientes/cliente';
import { Status } from '../status/status';
import { Tarefa } from '../Tarefas/tarefa';

export class Projeto {
  id?: number;
  descricao: string | null = null;
  data_Inicio: Date | undefined;
  data_Fim: Date | undefined;
  tarefas: Tarefa[] = [];
  cliente: Cliente | null = null;
  clienteId: number | null = null;
  status: Status | null = null;
}

export class ProjetoListagem {
  id: number | undefined;
  descricao: string | null = null;
  data_Inicio: Date | undefined;
  data_Fim: Date | undefined;
  cliente: Cliente | null = null;
  status: Status | null = null;
}
