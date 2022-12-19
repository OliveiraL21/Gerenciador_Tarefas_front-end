import { Tarefa } from './../../models/Tarefas/tarefa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const url = `${environment.api_url}/Tarefas`;

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor(private http: HttpClient) {}

  listaTodos(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${url}`);
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

  excluirTarefa(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${url}/${id}`);
  }
}
