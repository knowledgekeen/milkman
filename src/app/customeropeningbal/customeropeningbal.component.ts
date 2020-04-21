import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-customeropeningbal",
  templateUrl: "./customeropeningbal.component.html",
  styleUrls: ["./customeropeningbal.component.css"],
})
export class CustomeropeningbalComponent implements OnInit {
  customernm: string = null;
  custdata: any = null;
  openingbal: any = null;
  openingbaldate: any = null;
  msgtext: string = null;
  msgclass: string = null;
  custid: string = null;
  disableval: boolean = false;
  editdata: any = null;
  invalidcustomer: any = null;

  constructor(
    private _rest: RestService,
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.getCustomers();
  }

  addOpeningBalance() {
    let tmpobj = {
      clientid: this.custid,
      openingbal: this.openingbal,
      openingbaldate: new Date(this.openingbaldate).getTime(),
    };
    console.log(tmpobj);
    this._rest
      .postData("openingbalance.php", "addOpeningBalance", tmpobj)
      .subscribe(
        (Response) => {
          this.msgtext = "Customer opening balance added successfully";
          this.msgclass = "success";
          this.timercnt();
        },
        (error) => {
          console.log(error);
          this.msgtext = "Customer opening balance addition failed";
          this.msgclass = "danger";
          this.timercnt();
        }
      );
  }

  getCustomers() {
    let geturl = "ctype=2";
    this._rest
      .getData("client.php", "getAllClientsByType", geturl)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.custdata = Response["data"];
        }
      });
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
    this.customernm = null;
    this.openingbal = 0;
    this.setCurrFinanDate();
  }

  setCurrFinanDate() {
    let finandate = new Date();
    finandate.setMonth(3, 1);  //Here 3 is April and 1 is Day 1
    finandate.setHours(0, 0, 0, 1); //This sets hours to night 12:00:00:0001 AM
    this.openingbaldate = moment(finandate, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  updateOpeningBalance() {
    let tmpobj = {
      openbalid: this.editdata.openbalid,
      clientid: this.custid,
      openingbal: this.openingbal,
      openingbaldate: new Date(this.openingbaldate).getTime(),
    };
    console.log(tmpobj);
    this._rest
      .postData("openingbalance.php", "updateOpeningBalance", tmpobj)
      .subscribe(
        (Response) => {
          this.msgtext = "Customer Opening Balance Updated successfully";
          this.msgclass = "success";
          this.timercnt();
        },
        (error) => {
          console.log(error);
          this.msgtext = "Customer Opening Balance Updation Failed";
          this.msgclass = "danger";
          this.timercnt();
        }
      );
  }

  checkIfOpeningBalPresent() {
    this.editdata = null;
    this.custid = null;
    this.invalidcustomer = null;
    console.log(this.customernm);
    this.disableval = true;
    for (let i in this.custdata) {
      if (this.customernm == this.custdata[i].name) {
        this.custid = this.custdata[i].clientid;
        break;
      }
    }
    if (this.custid == null) {
      this.invalidcustomer = true;
      this.disableval = false;
      return;
    }

    let urldata = "clientid=" + this.custid + "&openbaldate=" + (new Date(this.openingbaldate).getTime());
    this._rest.getData("openingbalance.php", "checkIfOpeningBalPresent", urldata).subscribe(Response => {
      if (Response && Response["data"]) {
        let data = Response["data"];
        this.editdata = data;
        this.disableval = false;
        this.openingbal = data.amount;
      }
      else { this.disableval = false; }
    })
  }
}
