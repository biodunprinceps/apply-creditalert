import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageGuard implements CanActivate {

  constructor(private storage: LocalstorageService, private router: Router, private toastr: ToastrService, private tokenservice: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.storage.storageValid() && !this.tokenservice.get()){
        this.toastr.error("Session ended");
        this.router.navigateByUrl('/apply');
        return false;
      }
    return true;
  }

}
