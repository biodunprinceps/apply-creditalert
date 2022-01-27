import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  // .set('Authorization', 'Bearer sk_live_efd68a918240c9547f01cca56c26929ab4038cfc')
  .set('Accept','application/json');

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  constructor(private http:HttpClient) { }
  url: string = "https://api.creditalert.africa/api/v1";

  getOffer(data:any){
    return this.http.post<any>(`${this.url}/loan/apply`,data,{ 'headers': headers });
  }

  getOfferData(data:any){
    return this.http.post<any>(`${this.url}/loan/one`,data,{ 'headers': headers });
  }

  storeCameraCapture(data:any){
  //   const newheaders = new HttpHeaders()

  // .set('Content-Type', 'multipart/form-data')

    return this.http.post<any>(`${this.url}/loan/passport/upload`,data)
  }

  submitApplication(data:any){
    return this.http.post<any>(`${this.url}/loan/submit`,data);
  }
}
