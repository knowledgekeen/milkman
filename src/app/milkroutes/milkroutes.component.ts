import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { RestService } from '../rest.service';

@Component({
  selector: 'app-milkroutes',
  templateUrl: './milkroutes.component.html',
  styleUrls: ['./milkroutes.component.css']
})
export class MilkroutesComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  deldate: any = null;
  routeno: any = null;
  routeval: any = null;
  routesdata: any = null;
  driverdetspresent: boolean = false;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    let tomorrowdt = new Date();
    tomorrowdt.setHours(0, 0, 0, 1);
    tomorrowdt.setDate(tomorrowdt.getDate() + 1);
    this.deldate = moment(tomorrowdt, 'YYYY-MM-DD').format("YYYY-MM-DD");
    this.getAllOrderRoutes()
  }

  getAllOrderRoutes() {
    this.routesdata = null;
    this.routeval = null;
    this.routeno = null;
    let orderdt = new Date(this.deldate);
    orderdt.setHours(0, 0, 0, 1);
    let urldata = "orderdt=" + orderdt.getTime();
    this._rest.getData("routes.php", "getAllOrderRoutes", urldata)
      .subscribe(Response => {
        if (Response && Response["data"]) {
          this.routesdata = Response["data"];
          this.routeno = this.routesdata[0].route;
          this.routeval = this.routesdata[0].route;
        }
        else {
          this.routeval ="0";
        }

      },
        err => {
          console.log(err);
        });
  }

  routeChange() {
    this.routeval = null;
    let _this = this;
    setTimeout(()=>{
      _this.routeval = _this.routeno;
    },50)
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }
}
