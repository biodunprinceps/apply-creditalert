import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!:any;
  constructor(private http: HttpClient, private tokenservice: TokenService) { }

  private localUrl = "http://127.0.0.1:8000/api/v1";
  private baseUrl = "https://testapi.creditwallet.ng/api/v2/creditalert";

  login(user:any){
    return this.http.post<any>(`${this.baseUrl}/user/login`,user);
  }

  loadDashboard(){
    this.token = this.tokenservice.get();
    // const headers = new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Authorization', `Bearer ${this.token}`)
    // .set('Accept','application/json');

    // if(!this.tokenservice.get()){
    //   this.router.navigateByUrl('/login')
    // }

    return this.http.get<any>(`${this.baseUrl}/user/dashboard`)
  }

  changePassword(data:any){
    return this.http.post<any>(`${this.baseUrl}/user/password/change`,data)
  }
}
