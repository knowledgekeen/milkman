import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-supplieropeningbal",
  templateUrl: "./supplieropeningbal.component.html",
  styleUrls: ["./supplieropeningbal.component.css"],
})
export class SupplieropeningbalComponent implements OnInit {
  suppliernm: String = null;
  openingbal: any = null;
  openingbaldate: any = null;
  suppdata: any = null;
  msgtext: string = null;
  msgclass: string = null;
  suppid: string = null;
  disableval: boolean = false;
  editdata: any = null;
  invalidsupplier: any = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.resetForm();
    this.getCustomers();
  }

  addOpeningBalance() {
    let tmpobj = {
      clientid: this.suppid,
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
    let geturl = "ctype=1";
    this._rest
      .getData("client.php", "getAllClientsByType", geturl)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.suppdata = Response["data"];
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
    this.editdata = null;
    this.suppid = null;
    this.invalidsupplier = null;
    this.suppliernm = null;
    this.openingbal = 0;
    this.setCurrFinanDate();
  }

  setCurrFinanDate() {
    let finandate = new Date();
    finandate.setMonth(3, 1); //Here 3 is April and 1 is Day 1
    finandate.setHours(0, 0, 0, 1); //This sets hours to night 12:00:00:0001 AM
    this.openingbaldate = moment(finandate, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  updateOpeningBalance() {
    let tmpobj = {
      openbalid: this.editdata.openbalid,
      clientid: this.suppid,
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
    this.suppid = null;
    this.invalidsupplier = null;
    console.log(this.suppliernm);
    this.disableval = true;
    for (let i in this.suppdata) {
      if (this.suppliernm == this.suppdata[i].name) {
        this.suppid = this.suppdata[i].clientid;
        break;
      }
    }
    console.log(this.suppid)
    if (this.suppid == null) {
      this.invalidsupplier = true;
      this.disableval = false;
      return;
    }

    let urldata =
      "clientid=" +
      this.suppid +
      "&openbaldate=" +
      new Date(this.openingbaldate).getTime();
    this._rest
      .getData("openingbalance.php", "checkIfOpeningBalPresent", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          let data = Response["data"];
          this.editdata = data;
          this.disableval = false;
          this.openingbal = data.amount;
        } else {
          this.disableval = false;
        }
      });
  }

  clearSupplierName() {
    this.resetForm();
  }
}
