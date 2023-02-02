import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `${environment.api_usuario_url}/Logout`

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  logoutUsuario(): Observable<any> {
    return this.http.post<any>(`${url}`, '');
  }
}
