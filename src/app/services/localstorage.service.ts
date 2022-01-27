import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getId(){
    const id = localStorage.getItem('id');
    return id;
  }

  getLoanAmount(){
    const loan_amount = localStorage.getItem('loan_amount');
    return loan_amount;
  }

  storageValid(){
    if(this.getId()){
      return true;
    }
    return false
  }

  clearStorage(){
    return localStorage.clear();
  }
}
