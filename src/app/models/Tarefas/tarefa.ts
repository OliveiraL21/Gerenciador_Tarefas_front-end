import { Projeto } from '../Projetos/projeto';

export class Tarefa {
  id?: number;
  data: Date | null = null;
  horarioInicio: any | null = null;
  horarioFim: any | null = null;
  duracao: any | null = null;
  descricao: string = '';
  observacao: string | null = null;
  status: any;
  projeto: Projeto | null = null;
}
