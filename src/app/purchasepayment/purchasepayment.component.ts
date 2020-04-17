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
  ngOnInit(): void {}
}
