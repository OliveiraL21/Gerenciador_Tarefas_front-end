import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogoutService } from '../logout/logout.service';
import { request } from 'http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private logoutService: LogoutService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.split('/')[2] == environment.api_usuario_url.split('/')[2]) {
      return next.handle(request);
    }
    const token = this.tokenService.getToken();
    if (this.tokenService.possuiToken()) {
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          token: `${token}`
        }
      });
    }
    return next.handle(request);
  }
}
