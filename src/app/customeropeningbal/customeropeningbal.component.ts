import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-customeropeningbal",
  templateUrl: "./customeropeningbal.component.html",
  styleUrls: ["./customeropeningbal.component.css"],
})
export class CustomeropeningbalComponent implements OnInit {
  customernm: string = null;
  openingbal: any = null;
  openingbaldate: any = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;

  constructor(
    private _rest: RestService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((parm) => {
      this.clientid = parm.clientid;
     // if (parm.clientid.toString() != "0") {
        //this.fetchClientDetails();
     // }
    });
  }
  updateopeningbal() {
    let tmpobj = {
      customernm: this.customernm,
      openingbal: this.openingbal,
      openingbaldate: this.openingbaldate,
    };
    console.log(tmpobj);
    this._rest
      .postData("openingbalance.php", "customeropeningbal", tmpobj)
      .subscribe(
        (Response) => {
          this.msgtext = "Customer opening balance" + " added successfully";
          this.msgclass = "success";
          this.timercnt();
        },
        (error) => {
          console.log(error);
          this.msgtext = "Customer opening balance" + " addition failed";
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
    this.customernm = null;
    this.openingbal = null;
    this.openingbaldate = null;
  }

  /*fetchClientDetails() {
    let urldata = "clientid=" + this.clientid;
    this._rest
      .getData("openingbalance.php", "getClientDetails", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          let data = Response["data"];
          this.customernm = data.customernm;
          this.openingbal = data.openingbal;
          this.openingbaldate = data.openingbaldate;
        }
      });*/
  }
}
