import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplyService } from 'src/app/services/apply.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  loggedIn: boolean = false;
  photo!: any;

  constructor(private router: Router, private tokenservice: TokenService, private toastr: ToastrService, private applyservice: ApplyService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.processLogin()
    if(this.loggedIn){
      this.loadPic();
    }

  }

  processLogin(){
    if(this.tokenservice.get()){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

  logout(){
    localStorage.clear();
    this.toastr.error("Logged Out Successfully")
    this.router.navigateByUrl('/login');
  }

  loadPic(){
    return this.authservice.loadDashboard().subscribe(
      res => {
        this.photo = res.loans[0].photo_url
      },

      err => {
        console.log(err)
      }
    )
  }

}
