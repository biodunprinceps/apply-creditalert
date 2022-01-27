import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenservice: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenservice.get();
    // const isLoggedIn = this.tokenservice.loggedIn();
    if(token){
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });
    }
    return next.handle(request);
  }
}
