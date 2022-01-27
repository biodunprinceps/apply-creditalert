import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.scss']
})
export class MobilenavComponent implements OnInit {

  loggedIn: boolean = false;
  menu: boolean = false;
  photo!: any;

  constructor(private tokenservice: TokenService, private toastr: ToastrService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.processLogin()
    this.loadPic();
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

  showMenu(){
    this.menu = !this.menu;
    console.log('works');
  }

}
