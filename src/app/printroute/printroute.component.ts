import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { RestService } from "../rest.service";

@Component({
  selector: "app-printroute",
  templateUrl: "./printroute.component.html",
  styleUrls: ["./printroute.component.css"],
})
export class PrintrouteComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  deldate: any = null;
  routeno: any = null;
  routeval: any = null;
  routesdata: any = null;
  totalcowcans: number = 0;
  totalbuffcans: number = 0;

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    let tomorrowdt = new Date();
    tomorrowdt.setHours(0, 0, 0, 1);
    tomorrowdt.setDate(tomorrowdt.getDate());
    this.deldate = moment(tomorrowdt, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.getAllOrderRoutes();
    this.getAllRoutesCustomers();
  }

  getAllOrderRoutes() {
    this.routesdata = null;
    this.routeval = null;
    this.routeno = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime();
    //console.log(orderdt);
    this._rest.getData("routes.php", "getAllOrderRoutes", urldata).subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.getAllRoutesCustomers();
          this.routesdata = Response["data"];
          this.routeno = this.routesdata[0].route;
          this.routeval = this.routesdata[0].route;
          //this.routeChange();
        } else {
          this.routeval = "0";
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  routeChange() {
    this.routeval = null;
    let _this = this;
    setTimeout(() => {
      _this.routeval = _this.routeno;
    }, 50);
  }

  calculateMilkCans() {
    for (let i in this.routesdata) {
      let cowcans =
        parseFloat(this.routesdata[0].cowqty) / 40 -
        Math.floor(parseFloat(this.routesdata[0].cowqty) / 40);
      let buffcans =
        parseFloat(this.routesdata[0].buffaloqty) / 40 -
        Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40);
      if (cowcans != 0) {
        if (cowcans > 0.5) {
          cowcans = Math.floor(parseFloat(this.routesdata[0].cowqty) / 40) + 1;
        } else {
          cowcans =
            Math.floor(parseFloat(this.routesdata[0].cowqty) / 40) + 0.5;
        }
      }
      if (buffcans != 0) {
        if (buffcans > 0.5) {
          buffcans =
            Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40) + 1;
        } else {
          buffcans =
            Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40) + 0.5;
        }
      }
      this.routesdata[i].cowcans = cowcans;
      this.routesdata[i].buffcans = buffcans;
      this.totalcowcans += cowcans;
      this.totalbuffcans += buffcans;
    }
  }
  getAllRoutesCustomers() {
    this.routesdata = null;
    this.routeno = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime() + "&routeno=" + this.routeno;
    console.log(urldata);
    this._rest
      .getData("routes.php", "getAllRoutesCustomers", urldata)
      .subscribe(
        (Response) => {
          if (Response && Response["data"]) {
            this.routesdata = Response["data"];
            this.calculateMilkCans();
          } else {
            console.log("error occured");
            this.routesdata = null;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }
}
