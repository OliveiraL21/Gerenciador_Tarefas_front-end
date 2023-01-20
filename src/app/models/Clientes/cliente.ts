import { Projeto } from '../Projetos/projeto';

export class Cliente {
  id: number | null = null;
  razaoSocial: string = '';
  cnpj: string = '';
  email: string = '';
  telefone: string = '';
  celular: string | undefined;

  projetos: Projeto[] = [];
}
