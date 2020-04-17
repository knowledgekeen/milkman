import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";
import { timer } from "rxjs";
@Component({
  selector: "app-purchasepayment",
  templateUrl: "./purchasepayment.component.html",
  styleUrls: ["./purchasepayment.component.css"],
})
export class PurchasepaymentComponent implements OnInit {
  supplierdata: any = null;
  suppliernm: String = null;
  paymentdate: any = null;
  amountpaid: any = null;
  modeofpayment: String = null;
  Particulars: any = null;

  constructor(private _rest: RestService) {}
  ngOnInit(): void {
    //this.addPayment();
  }
  /* addPayment() {
    if (
      !this.suppliernm ||
      !this.paymentdate ||
      this.amountpaid ||
      this.modeofpayment ||
      this.Particulars
    ) { 
      this.msgtext = "All Fields are Compulsory";
      this.msgclass = "danger";
      //this.timer();
    } else {
      this.msgtext = "Order Placed Successfully";
      this.msgclass = "success";
    }
  }*/
}
