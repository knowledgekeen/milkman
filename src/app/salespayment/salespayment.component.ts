import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-salespayment",
  templateUrl: "./salespayment.component.html",
  styleUrls: ["./salespayment.component.css"],
})
export class SalespaymentComponent implements OnInit {
  custdata: any = null;
  customernm: String = null;
  paydate: any = null;
  amountpaid: any = null;
  modeofpayment: any = null;
  particulars: any = null;
  name: String = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;
  invalidcust: boolean = false;

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.modeofpayment = 1;
    this.resetForm();
  }
  getCustomers() {
    let geturl = "ctype=2";
    this._rest
      .getData("client.php", "getAllClientsByType", geturl)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.custdata = Response["data"];
          console.log(this.custdata);
        }
      });
  }

  getClientId() {
    this.clientid = null;
    for (let i in this.custdata) {
      if (this.customernm == this.custdata[i].name) {
        this.invalidcust = false;
        this.clientid = this.custdata[i].clientid;
        break;
      }
    }
    if (!this.clientid) {
      this.invalidcust = true;
    }
  }

  resetForm() {
    this.paydate = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
    this.customernm = null;
    this.amountpaid = null;
    this.modeofpayment = 1;
    this.particulars = null;
    this.getCustomers();
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
        paymode: this.modeofpayment,
      };
      this._rest.postData("payments.php", "addPayment", purchobj).subscribe(
        (Response) => {
          this.msgtext = "Purchase Payments Made Successfully";
          this.msgclass = "success";
          this.timer();
          this.resetForm();
        },
        (err) => {
          this.msgtext = "Payments Failed.";
          this.msgclass = "danger";
          this.timer();
        }
      );
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
