import { inject } from '@angular/core';
import { LoadingSpinnerService } from '../loadding/loading-spinner.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let spinnerservec=inject(LoadingSpinnerService)
  spinnerservec.vewspinner()
    return next.handle(req).pipe(
      delay(500), 
      finalize(()=>{
        spinnerservec.Hidepinner()
           })
    );
  }
}
