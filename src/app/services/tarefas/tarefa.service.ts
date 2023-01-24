import { Tarefa, TarefaListagem } from './../../models/Tarefas/tarefa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/Tarefa`;

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor(private http: HttpClient) { }

  listaTodos(): Observable<any[]> {
    return this.http.get<Tarefa[]>(`${url}`);
  }

  filtrar(descricao?: string, dataInicio?: string, dataFim?: string, projeto?: number): Observable<TarefaListagem[]> {
    return this.http.get<TarefaListagem[]>(`${url}/filtrar/${descricao}/${dataInicio}/${dataFim}/${projeto}`);
  }
  create(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${url}`, tarefa);
  }

  update(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${url}/update_tarefas/${id}`, tarefa);
  }

  details(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${url}/detalhes_tarefas/${id}`);
  }
  calcularDuracao(horarioInicio: string, horarioFIm: string): Observable<any> {
    return this.http.get<any>(`${url}/duracao/${horarioInicio}/${horarioFIm}`);
  }

  calcularTotaisHoras(data: string): Observable<any> {
    return this.http.get<any>(`${url}/horasTotais/${data}`);
  }

  excluirTarefa(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${url}/${id}`);
  }
}
