import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  photo!: any;
  skeleton_loader = true;
  current_password!:any;
  new_password!:any;
  confirm_new_password!:any;
  fullname!:any;
  email!:any;

  constructor(private authservice: AuthService, private toastr: ToastrService, private router: Router, private loadingbar: LoadingBarService) { }

  ngOnInit(): void {
    this.loadDashboard()
    this.loadPic();
  }

  loadPic(){
    return this.authservice.loadDashboard().subscribe(
      res => {
        this.photo = res.loans[0].photo_url
        this.skeleton_loader = false;
      },

      err => {
        console.log(err)
      }
    )
  }

  changePassword(){
    this.loadingbar.start();
    if(this.new_password == this.confirm_new_password){
      const data = {
        pin :this.new_password,
        oldPin: this.current_password
      }
      return this.authservice.changePassword(data).subscribe(
        res => {
          this.toastr.success("Password successfully changed");
          this.loadingbar.stop();
          this.resetField();
          // this.router.navigateByUrl('/dashboard/change-password');
        },

        err => {
          this.loadingbar.stop();
          console.log(err.error.message);
          this.toastr.error(err.error.message, '', {
            enableHtml: true
          })
        }
      )
    }
    this.loadingbar.stop();
    this.toastr.error("passwords do not match");
    return false
  }

  resetField(){
    this.current_password = "";
    this.new_password = "";
    this.confirm_new_password = "";
  }

  loadDashboard(){
    return this.authservice.loadDashboard().subscribe(
      res => {

        this.fullname = res.user.fullname
        this.email = res.user.email
        console.log(res)
      },

      err => {
        console.log(err)
      }
    )
  }

}
