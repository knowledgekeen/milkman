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
  drivernm: string = null;
  vehno: string = null;
  routesdata: any = null;
  driverdetspresent: boolean = false;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    let tomorrowdt = new Date();
    tomorrowdt.setHours(0, 0, 0, 1);
    tomorrowdt.setDate(tomorrowdt.getDate() + 1);
    this.deldate = moment(tomorrowdt, 'YYYY-MM-DD').format("YYYY-MM-DD");
    this.getAllDistinctRoutes()
  }

  getAllDistinctRoutes() {
    this.routesdata = null;
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);
    let enddt = new Date(this.deldate);
    enddt.setHours(23, 59, 59, 999);
    let urldata = "startdt=" + startdt.getTime() + "&enddt=" + enddt.getTime();
    this._rest.getData("routes.php", "getAllDistinctRoutes", urldata)
      .subscribe(Response => {
        if (Response && Response["data"]) {
          this.routesdata = Response["data"];
          this.routeno = this.routesdata[0].route;
          this.routeval = this.routesdata[0].route;
          this.getDriverDetails();
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
    setTimeout(() => {
      _this.routeval = _this.routeno;
    }, 50);
  }

  getDriverDetails() {
    this.drivernm = null;
    this.driverdetspresent = null;
    this.vehno = null;
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);
    let urldata = "startdt=" + startdt.getTime() + "&routeno=" + this.routeno;
    this._rest.getData("routes.php", "getDriverDetails", urldata).subscribe(Response => {
      if (Response && Response["data"]) {
        let data = Response["data"];
        this.drivernm = data.drivernm;
        this.vehno = data.vehicleno;
        this.driverdetspresent = true;
        data = null;
      }
    });
  }

  addDriver() {
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);

    let tmpobj = {
      startdt: startdt.getTime(),
      drivernm: this.drivernm,
      vehno: this.vehno,
      routeno: parseInt(this.routeno)
    }
    this._rest.postData("routes.php", "addDriverDetails", tmpobj).subscribe(Response => {
      if (Response) {
        this.msgtext = "Driver Details added successfully";
        this.msgclass = "success";
        this.timer();
      }
    });
  }

  updateDriver() {
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);

    let tmpobj = {
      startdt: startdt.getTime(),
      drivernm: this.drivernm,
      vehno: this.vehno,
      routeno: parseInt(this.routeno)
    }
    this._rest.postData("routes.php", "updateDriverDetails", tmpobj).subscribe(Response => {
      if (Response) {
        this.msgtext = "Driver Details updated successfully";
        this.msgclass = "success";
        this.timer();
      }
    });
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }
}
