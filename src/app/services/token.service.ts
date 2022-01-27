import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : 'http://127.0.0.1:8000/api/v1/user/login'
  }

  constructor() { }

  handle(token:any){
    this.set(token);
  }

  set(token:any){
    localStorage.setItem('token',token)
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token')
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token)
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token:any){
    const payload = token.split('.')[1];
    // const payloadexpire =  token.split('.')[1].exp;
    // const expire = (Math.floor((new Date).getTime() / 1000)) >= payloadexpire;
    // if(expire){
    //   console.log("token has expired")
    // }else{
    //   console.log("token has not expired")
    // }
    return this.decode(payload);
  }

  decode(payload:any){
    return JSON.parse(atob(payload))
  }


  loggedIn(){
    return this.isValid();
  }
}
