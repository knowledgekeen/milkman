import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-addcustomer",
  templateUrl: "./addcustomer.component.html",
  styleUrls: ["./addcustomer.component.css"],
})
export class AddcustomerComponent implements OnInit {
  cno: string = null;
  cno1: string = null;
  fname: string = null;
  cperson: string = null;
  address: string = null;
  additionalinfo: string = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;
  routeno: any = null;
  buffalorate: String = "0";
  cowrate: String = "0";

  constructor(
    private _rest: RestService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((parm) => {
      this.clientid = parm.clientid;
      if (parm.clientid.toString() != "0") {
        //Fetch Client Details
        this.fetchClientDetails();
      }
    });
  }

  addCustomer() {
    let tmpobj = {
      fname: this.fname,
      cno: this.cno,
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      routeno: this.routeno,
      buffalorate: this.buffalorate,
      cowrate: this.cowrate,
      addinfo: this.additionalinfo,
    };
    console.log(tmpobj);

    this._rest.postData("client.php", "addCustomer", tmpobj).subscribe(
      (Response) => {
        this.msgtext = " Customer " + " added successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Customer" + " addition failed";
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
      if (_this.clientid != "0") {
        _this._router.navigate(["viewclients"]);
      }
    }, 2000);
  }

  resetForm() {
    this.cno = null;
    this.cno1 = null;
    this.fname = null;
    this.cperson = null;
    this.address = null;
    this.routeno = null;
    this.buffalorate = "0";
    this.cowrate = "0";
    this.additionalinfo = null;
  }

  fetchClientDetails() {
    let urldata = "clientid=" + this.clientid;

    this._rest
      .getData("client.php", "getCustomerDetails", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          let data = Response["data"];
          this.cno = data.cno;
          this.cno1 = data.cno1;
          this.fname = data.name;
          this.cperson = data.cperson;
          this.routeno = data.routeno;
          this.buffalorate = data.buffalorate;
          this.cowrate = data.cowrate;
          this.address = data.address;
          this.additionalinfo = data.addinfo;
        }
      });
  }

  updateCustomer() {
    let tmpobj = {
      clientid: this.clientid,
      fname: this.fname,
      cno: this.cno,
      routeno: this.routeno,
      buffalorate: this.buffalorate,
      cowrate: this.cowrate,
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      addinfo: this.additionalinfo,
    };

    this._rest.postData("client.php", "updateCustomer", tmpobj).subscribe(
      (Response) => {
        this.msgtext = "Customer" + " updated successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Customer" + " updation failed";
        this.msgclass = "danger";
        this.timercnt();
      }
    );
  }
}
