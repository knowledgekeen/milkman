import { Component, OnInit, Input } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-viewroutedets",
  templateUrl: "./viewroutedets.component.html",
  styleUrls: ["./viewroutedets.component.css"],
})
export class ViewroutedetsComponent implements OnInit {
  private _routeno: string;
  private _deldate: string;
  routesdata: any = null;
  totalcowcans: number = 0;
  totalbuffcans: number = 0;
  newroute: string = null;
  msgtext: string = null;
  msgclass: string = null;

  @Input() set deldate(value: string) {
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
  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.getRouteCustomersOnDate();
  }

  getRouteCustomersOnDate() {
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
      .getData("routes.php", "getRouteCustomersOnDate", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.routesdata = Response["data"];
          this.calculateMilkCans();
        } else {
          this.routesdata = null;
        }
      });
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

  changeRoute(dets) {
    console.log(dets);
    let obj = {
      newroute: dets.route,
      ordid: dets.ordid,
    };
    this._rest.postData("routes.php", "changeRoute", obj).subscribe((Resp) => {
      if (Resp && Resp["data"]) {
        this.msgclass = "success";
        this.msgtext = "Route changed successfully";
        this.timer();
      } else {
        this.msgclass = "danger";
        this.msgtext = "Route cannot be changed now, please try again later.";
        this.timer();
      }
    });
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
      window.location.reload();
    }, ms);
  }
}
