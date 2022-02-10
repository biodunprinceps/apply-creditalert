import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ApplyGuard implements CanActivate {

  constructor(private storage: LocalstorageService, private router: Router, private toastr: ToastrService, private tokenservice: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let status = localStorage.getItem('status');

      if(status == "0"){
        this.toastr.error("kindly accept loan amount");
        // this.router.navigateByUrl('/apply');
        return false;
      }


    return true;
  }

}
