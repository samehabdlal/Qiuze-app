import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  constructor() { }
  spinner=signal(false)
  vewspinner(){
    this.spinner.set(true)
  }
  Hidepinner(){
    this.spinner.set(false)
  }
}
