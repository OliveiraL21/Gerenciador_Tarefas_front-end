import { Projeto } from '../Projetos/projeto';

export class Cliente {
  id: number | null = null;
  razao_Social: string | undefined;
  cnpj: string = '';
  telefone: string = '';
  celular: string | undefined;

  projetos: Projeto[] = [];
}
