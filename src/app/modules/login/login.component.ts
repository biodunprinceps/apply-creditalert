import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  spinner = false;
  password = ""
  email = ""
  constructor(private router: Router, private authservice: AuthService, private toastr: ToastrService, private tokenservice: TokenService, private loadingbar: LoadingBarService) { }

  ngOnInit(): void {
  }

  login(){
    this.loadingbar.start();
    this.spinner = true;
    const userData = {
      email : this.email,
      pin : this.password
    }
    return this.authservice.login(userData).subscribe(
      res => {
        const token = res.access_token;
        this.tokenservice.handle(token);
        localStorage.setItem('id','000000');
        this.toastr.success('logged in successfully')
        this.router.navigateByUrl('/dashboard');
      },

      err=>{
        const errMessage = err.error.message
        this.toastr.error(errMessage, '', {
          enableHtml: true
        });
        this.loadingbar.stop();
        this.spinner = !this.spinner;
        console.log(err)
      }
    )

  }

}
