import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
   x = ``;
  store (symbol: string){
    this.x = symbol;
  }

  getval(){
    return this.x;
  }

  private buttonClickedSource = new Subject<void>();

  buttonClicked$ = this.buttonClickedSource.asObservable();

  triggerButtonClick() {
    this.buttonClickedSource.next();
  }
  constructor() { }
}
