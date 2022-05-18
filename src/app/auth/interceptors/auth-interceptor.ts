import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

const UNAUTHORIZED: number = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private token: TokenStorageService,
    public router: Router,
  ) {}

  public intercept(
    req: HttpRequest<Record<string, string>>,
    next: HttpHandler,
  ): Observable<HttpEvent<Record<string, string>>> {
    let authReq: HttpRequest<Record<string, string>> = req;
    const token: string | null = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === UNAUTHORIZED) {
          this.router.navigate(['']);
        }
        return throwError(error);
      }),
    );
  }
}
