import { Component, OnInit } from '@angular/core';
import { banks } from 'src/app/extra/banks';
import { ApplyService } from 'src/app/services/apply.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  email = "";
  phone = "";
  bankname:any;
  bankcode = "";
  accountnumber = ""

  constructor(private applyservice: ApplyService) { }

  ngOnInit(): void {
    this.getOfferData();
  }

  getOfferData(){
    const id = localStorage.getItem('id');
    const formDetail = {
      id : id
    }
    return this.applyservice.getOfferData(formDetail).subscribe(
      res => {
        this.email = res.data.user.email;
        this.phone = res.data.user.telephone;
        this.bankcode = res.data.preferred_bank_code;
        this.accountnumber = res.data.preferred_bank_account_no;

        let obj = banks.find(o => o.bankcode === this.bankcode);
        this.bankname = obj?.name;
      },

      err => {
        console.log(err);
      }
    )
  }


}
