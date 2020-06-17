import { Component, OnInit, Input } from "@angular/core";
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
  drivernm: any = null;
  vehicleno: any = null;
  totalbuffcans: number = 0;
  routedata: any = null;
  routedetails: any = null;
  routdetails: any = null;
  // private _routeno: string;
  // private _deldate: string;

  /*@Input() set deldate(value: string) {
  this._deldate = value;
}

@Input() set routeno(value: string) {
  this._routeno = value;
  //this.getRouteCustomersOnDate();
}

get routeno(): string {
  return this._routeno;
}

get deldate(): string {
  return this._deldate;
}
*/

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    let tomorrowdt = new Date();
    tomorrowdt.setHours(0, 0, 0, 1);
    tomorrowdt.setDate(tomorrowdt.getDate());
    this.deldate = moment(tomorrowdt, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.getAllOrderRoutes();
    this.routChange();
    this.routeDetails();
  }

  getAllOrderRoutes() {
    this.routedata = null;
    this.routeval = null;
    this.routeno = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime();
    this._rest.getData("routes.php", "getAllOrderRoutes", urldata).subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.getAllRoutesCustomers();
          this.routedata = Response["data"];
          console.log(this.routedata);
          this.routeno = this.routedata[0].route;
          this.routeval = this.routedata[0].route;
        } else {
          this.routeval = "0";
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime() + "&routeno" + this.routeno;
    console.log(urldata);
    this._rest
      .getData("routes.php", "getAllRoutesCustomers", urldata)
      .subscribe(
        (Response) => {
          if (Response && Response["data"]) {
            this.routChange();
            this.routesdata = Response["data"];
            this.calculateMilkCans();
            //this.routeDetails();
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
  routChange() {
    this.routesdata = null;
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);
    let enddt = new Date(this.deldate);
    enddt.setHours(23, 59, 59, 999);

    if (isNaN(startdt.getTime()) || isNaN(enddt.getTime())) {
      return;
    }
    let urldata =
      "startdt=" +
      startdt.getTime() +
      "&enddt=" +
      enddt.getTime() +
      "&routeno=" +
      this.routeno;
    this._rest
      .getData("routes.php", "routChange", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.routesdata = Response["data"];
          this.changedRouteDetails();
          this.calculateMilkCans();
        } else {
          this.routesdata = null;
        }
      });
  }
  routeDetails() {
    this.routedetails = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime();

    this._rest.getData("routes.php", "routeDetails", urldata).subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.routedetails = Response["data"];
          console.log(this.routedetails);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  changedRouteDetails() {
    this.routdetails = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime() + "&routeno=" + this.routeno;

    this._rest.getData("routes.php", "changedRouteDetails", urldata).subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.routedetails = Response["data"];
          console.log(this.routedetails);
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
