import { Projeto } from '../Projetos/projeto';
import { Status } from '../status/status';

export class Tarefa {
  id?: number;
  data: string | null = null;
  horarioInicio: any | null = null;
  horarioFim: any | null = null;
  duracao: any | null = null;
  descricao: string = '';
  observacao: string | null = null;
  status: any;
  projetoId: number | null = null;
}

export class TarefaListagem {
  id?: number;
  data: Date | null = null;
  horarioInicio: any | null = null;
  horarioFim: any | null = null;
  duracao: any | null = null;
  descricao: string = '';
  observacao: string | null = null;
  status: Status | null = null;
  projeto: Projeto | null = null;
}
