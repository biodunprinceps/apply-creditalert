import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ApplyService } from 'src/app/services/apply.service';
import { PaystackService } from 'src/app/services/paystack.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  bankDetails: any = [];

  email!: string;
  pin!: any;
  phone!: string;
  bankname: string = "000";
  accountnumber!: string;
  applyDetails = {}
  id! : any;
  password!: any
  spinner = false;

  successMessage: string = "";
  errorMessage: string = "";


  constructor(private router: Router, private paystackservice: PaystackService, private applyservice: ApplyService, private toastr: ToastrService, private loadingbar: LoadingBarService, private tokenservice: TokenService) { }

  ngOnInit(): void {
    if(this.tokenservice.get()){
      this.router.navigateByUrl('/dashboard');
    }
    this.getBankDetails();
  }

  apply(){
    this.spinner = true;
    this.loadingbar.start();
    this.applyDetails = {
      email: this.email,
      telephone: this.phone,
      bankcode: this.bankname,
      accountnumber: this.accountnumber
  }
    return this.applyservice.getOffer(this.applyDetails).subscribe(
      res => {
        this.id = res.id;
        localStorage.setItem('id',this.id);
        this.toastr.success("Loan Application Successful")
        this.router.navigateByUrl('offer');
      },

      err => {
        this.spinner = false;
        this.loadingbar.stop();
        this.errorMessage = err.error.message;
        if(err.status == 500){
          this.toastr.error("Server Error");
        }else{
          this.toastr.error(this.errorMessage, '', {
            enableHtml: true
          });
        }
        console.log(err)
      }
    )
  }

  // getLoanOffer(){
  //   this.router.navigateByUrl('offer');
  // }

  getBankDetails(){
    return this.paystackservice.getBank().subscribe(
      res => {
        console.log(res);
        this.bankDetails.push(res.data);
      },

      err=> {
        console.log(err);
      }
    )
  }

}
