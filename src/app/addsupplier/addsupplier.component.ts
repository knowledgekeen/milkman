import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-addsupplier",
  templateUrl: "./addsupplier.component.html",
  styleUrls: ["./addsupplier.component.css"],
})
export class AddsupplierComponent implements OnInit {
  cno: string = null;
  cno1: string = null;
  fname: string = null;
  cperson: string = null;
  address: string = null;
  additionalinfo: string = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;
  buffalorate: String = "0";
  cowrate: String = "0";
  ctype: string = "1";
  customertype_id: string = "0";

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

  addClient() {
    let tmpobj = {
      fname: this.fname,
      cno: this.cno,
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      customertype_id: this.customertype_id,
      buffalorate: this.buffalorate,
      routeno: null,
      cowrate: this.cowrate,
      addinfo: this.additionalinfo,
      ctype: this.ctype,
    };
    console.log(tmpobj);

    this._rest.postData("client.php", "addClient", tmpobj).subscribe(
      (Response) => {
        this.msgtext = "Supplier " + " Added Successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Supplier" + " Addition Failed";
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
    this.buffalorate = "0";
    this.cowrate = "0";
    this.additionalinfo = null;
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
          this.buffalorate = data.buffalorate;
          this.cowrate = data.cowrate;
          this.address = data.address;
          this.additionalinfo = data.addinfo;
          this.ctype = "1";
        }
      });
  }

  updateClient() {
    let tmpobj = {
      clientid: this.clientid,
      fname: this.fname,
      cno: this.cno,
      buffalorate: this.buffalorate,
      cowrate: this.cowrate,
      cperson: this.cperson,
      cno1: this.cno1,
      routeno: null,
      address: this.address,
      addinfo: this.additionalinfo,
      ctype: this.ctype,
    };

    this._rest.postData("client.php", "updateClient", tmpobj).subscribe(
      (Response) => {
        this.msgtext = "supplier" + " updated successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "supplier" + " updation failed";
        this.msgclass = "danger";
        this.timercnt();
      }
    );
  }
}
