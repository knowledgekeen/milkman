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
  customertypedata: any = null;
  customertype_id: any = null;
  routeno: any = null;
  customertype: any = null;
  buffalorate: String = "0";
  cowrate: String = "0";
  ctype: string = "2";

  constructor(
    private _rest: RestService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCustomerTypeDetails();
    this._route.params.subscribe((parm) => {
      this.clientid = parm.clientid;
      if (parm.clientid.toString() != "0") {
        this.fetchClientDetails();
      }
    });
  }
  getAllCustomerTypeDetails() {
    this.customertypedata = null;
    this._rest.getData("routes.php", "getAllCustomerTypeDetails").subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.customertypedata = Response["data"];
          console.log(this.customertypedata);
        } else {
          console.log("error occured");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCustomerTypeId() {
    this.customertype_id = null;
    for (let i in this.customertypedata) {
      if (this.customertype == this.customertypedata[i].customertypename) {
        this.customertype_id = this.customertypedata[i].customertype_id;
        break;
      } else {
        console.log("cannot find customer type name");
      }
    }
  }

  addClient() {
    let tmpobj = {
      fname: this.fname,
      cno: this.cno,
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      routeno: this.routeno,
      buffalorate: this.buffalorate,
      cowrate: this.cowrate,
      customertype_id: this.customertype_id,
      addinfo: this.additionalinfo,
      ctype: this.ctype,
    };
    console.log(tmpobj);
    let urldata = "customertype_id" + this.customertype_id;
    console.log(urldata);
    this._rest.postData("client.php", "addClient", tmpobj).subscribe(
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

  fetchClientDetails() {
    let urldata = "clientid=" + this.clientid;
    this._rest
      .getData("client.php", "getClientDetails", urldata)
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
          this.ctype = "2";
        }
      });
  }

  updateClient() {
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
      ctype: this.ctype,
    };

    this._rest.postData("client.php", "updateClient", tmpobj).subscribe(
      (Response) => {
        this.msgtext = " Customer " + " updated successfully";
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
}
