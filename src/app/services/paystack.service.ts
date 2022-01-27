import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer sk_live_efd68a918240c9547f01cca56c26929ab4038cfc');
  // .set('Accept','application/json');

@Injectable({
  providedIn: 'root'
})
export class PaystackService {


  constructor(private http: HttpClient) { }

  getBank(){
    const url = "https://api.paystack.co/bank";
    return this.http.get<any>(`${url}`,{ 'headers': headers })
  }
}
