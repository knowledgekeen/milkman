import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";
import { timer } from "rxjs";

@Component({
  selector: "app-salespayment",
  templateUrl: "./salespayment.component.html",
  styleUrls: ["./salespayment.component.css"],
})
export class SalespaymentComponent implements OnInit {
  customerdata: any = null;
  customernm: String = null;
  paymentdate: any = null;
  amountpaid: any = null;
  modeofpayment: String = null;
  Particulars: any = null;
  name: String = null;
  constructor() {}

  ngOnInit() {}
}
