import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-purchasepayment",
  templateUrl: "./purchasepayment.component.html",
  styleUrls: ["./purchasepayment.component.css"],
})
export class PurchasepaymentComponent implements OnInit {
  suppdata: any = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;
  suppliernm: string = null;
  paydate: any = null;
  amountpaid: any = null;
  modeofpayment: any = null;
  particulars: any = null;
  invalidsupp: boolean = false;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.modeofpayment = 1;
    this.resetForm();
  }

  getSuppliers() {
    let geturl = "ctype=1";
    this._rest.getData("client.php", "getAllClientsByType", geturl).subscribe(Response => {
      if (Response && Response["data"]) {
        this.suppdata = Response["data"];
        console.log(this.suppdata)
      }
    });
  }

  getClientId() {
    this.clientid = null;
    for (let i in this.suppdata) {
      if (this.suppliernm == this.suppdata[i].name) {
        this.invalidsupp = false;
        this.clientid = this.suppdata[i].clientid;
        break;
      }
    }
    if (!this.clientid) {
      this.invalidsupp = true;
    }
  }

  resetForm() {
    this.paydate = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
    this.suppliernm = null;
    this.amountpaid = null;
    this.modeofpayment = 1;
    this.particulars = null;
    this.getSuppliers();
  }

  addPayment() {
    let dt = new Date(this.paydate);
    dt.setHours(0, 0, 0, 1);
    if (parseFloat(this.amountpaid) != 0) {
      let purchobj = {
        clientid: this.clientid,
        paydt: dt.getTime(),
        amount: this.amountpaid,
        particulars: this.particulars,
        paymode: this.modeofpayment
      };
      this._rest.postData("payments.php", "addPayment", purchobj).subscribe(Response => {
        this.msgtext = "Purchase Payments Made Successfully";
        this.msgclass = "success";
        this.timer();
        this.resetForm();
      }, err => {
        this.msgtext = "Payments Failed.";
        this.msgclass = "danger";
        this.timer();
      });
    } else {
      alert("Payment cannot be 0");
    }
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }
}
