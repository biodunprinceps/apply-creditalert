import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ApplyService } from 'src/app/services/apply.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  repayment_amount!: any;
  repayment_date!: any;
  created_date!: any;
  fullname!:any

  email!: string;
  pin!: any;
  phone!: string;
  bankcode!: string;
  accountnumber!: string;
  fully_paid_loan: boolean = false;
  // applyDetails = {}
  id! : any;
  password!: any
  successMessage: string = "";
  errorMessage: string = "";

  loans!:any;
  today = Date();
  skeleton_loader = true;

  constructor(private authservice: AuthService, private applyservice: ApplyService, private toastr: ToastrService, private router: Router, private loadingbar: LoadingBarService) { }

  ngOnInit(): void {
    this.loadingbar.start();
    this.loadDashboard();
    this.loadingbar.stop();
  }

  requestLoan(){
    this.loadingbar.start();
    const applyDetails = {
      email: this.email,
      telephone: this.phone,
      bankcode: this.bankcode,
      accountnumber: this.accountnumber
  }
    return this.applyservice.getOffer(applyDetails).subscribe(
      res => {
        this.id = res.id;
        localStorage.setItem('id',this.id);
        this.toastr.success("Loan Application Successful")
        this.router.navigateByUrl('offer');
      },

      err => {
        this.loadingbar.stop();
        this.errorMessage = err.error.message;
        if(err.status == 500){
          this.toastr.error("Server Error");
        }else{
          this.toastr.error(this.errorMessage);
        }
        console.log(err)
      }
    )
  }

  loadDashboard(){
    return this.authservice.loadDashboard().subscribe(
      res => {
        this.repayment_amount = res.loans[0].repayment;
        this.repayment_date = res.loans[0].collection_date
        this.created_date = res.loans[0].created_at
        this.loans = res.loans;
        this.fullname = res.user.fullname
        this.email = res.user.email
        this.phone = res.user.telephone
        this.bankcode = res.user.bankcode;
        this.accountnumber = res.user.accountnumber;
        this.skeleton_loader = false;
        console.log(res)
      },

      err => {
        console.log(err)
      }
    )
  }

}
