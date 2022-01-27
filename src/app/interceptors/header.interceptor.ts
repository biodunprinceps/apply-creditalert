import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers;

    if(request.url.includes('upload')){
      headers = headers.delete('content-type');
    }else{
      headers = headers.set('Content-Type', 'application/json');
    }

    const newRequest = request.clone({
      headers
    })

  return next.handle(newRequest);
  }
}
