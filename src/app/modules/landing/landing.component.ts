import { Component, OnInit } from '@angular/core';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loan_amount!:any;
  profit!:any
  repayment_amount: number = 0;
  repayment_date!:any

  options: Options = {
    floor: 10000,
    ceil: 0
  };
  constructor() { }

  ngOnInit(): void {
    this.getOfferData()
  }


  getOfferData(){
    this.loan_amount = 700000
    this.options = {...this.options, ceil: this.loan_amount};
    this.profit = 0.15 * this.loan_amount;
    this.repayment_amount = this.profit + this.loan_amount;
    let today = new Date();
    if (today.getDate() < 15){
      let month = today.getMonth();
      let year = today.getFullYear();
      let newDate = new Date(year,month,15).toDateString();
      this.repayment_date = newDate;
    }else{
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      let newDate = new Date(year,month,15).toDateString();
      this.repayment_date = newDate;
    }

  }


  reCalcRepayment(evt:ChangeContext): void {
    this.repayment_amount = this.profit + evt.value
  }

}
