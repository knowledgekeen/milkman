import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-customertype",
  templateUrl: "./customertype.component.html",
  styleUrls: ["./customertype.component.css"],
})
export class CustomertypeComponent implements OnInit {
  customertype: any = "Regular";
  custypename: any = null;
  msgtext: any = null;
  msgclass: any = null;

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.resetForm();
    this.customertype = "Regular";
  }
  addCustomerType() {
    let tmpobj = {
      custypename: this.custypename,
      customertype: this.customertype,
    };

    this._rest.postData("client.php", "addCustomerType", tmpobj).subscribe(
      (Response) => {
        this.msgtext = " Record " + " added successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Record" + " addition failed";
        this.msgclass = "danger";
        this.timercnt();
      }
    );
  }
  timercnt() {
    let _this = this;
    this.resetForm();
    setTimeout(function () {
      _this.msgtext = null;
      _this.msgclass = null;
    }, 2000);
  }

  resetForm() {
    this.customertype = null;
    this.custypename = null;
  }
}
