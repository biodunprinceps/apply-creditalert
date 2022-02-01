import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyService } from 'src/app/services/apply.service';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-loan-offer',
  templateUrl: './loan-offer.component.html',
  styleUrls: ['./loan-offer.component.scss']
})
export class LoanOfferComponent implements OnInit {
  loan_amount!: any;
  profit!:any
  repayment_amount: number = 0;
  repayment_date = "";
  skeleton_loader = true;

  // value: number = this.loan_amount;
  options: Options = {
    floor: 1000,
    ceil: 0,
    step: 1000
  };

  constructor(private router: Router, private applyservice:ApplyService, private loadingbar: LoadingBarService) { }

  ngOnInit(): void {
    this.loadingbar.start();
    this.getOfferData();
    this.loadingbar.stop();
  }

  goToCamera(){
    localStorage.setItem('loan_amount',this.loan_amount);
    this.router.navigateByUrl('offer/facial-recognition');
  }

  getOfferData(){
    const id = localStorage.getItem('id');
    const formDetail = {
      id : id
    }
    return this.applyservice.getOfferData(formDetail).subscribe(
      res => {
        this.loan_amount = res.data.loan_amount;
        this.options = {...this.options, ceil: this.loan_amount};
        this.profit = 0.15 * parseInt(this.loan_amount) ;
        this.repayment_amount = this.profit + parseInt(this.loan_amount);
        this.repayment_date = res.data.collection_date
        this.skeleton_loader = false;
      },

      err => {
        console.log(err);
      }
    )
  }

  reCalcRepayment(evt:ChangeContext): void {
    this.profit = 0.15 * parseInt(this.loan_amount);
    this.repayment_amount = this.profit + evt.value
  }
}
