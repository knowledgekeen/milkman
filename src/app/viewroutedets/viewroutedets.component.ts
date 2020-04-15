import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-viewroutedets',
  templateUrl: './viewroutedets.component.html',
  styleUrls: ['./viewroutedets.component.css']
})
export class ViewroutedetsComponent implements OnInit {
  @Input() routeno;
  @Input() deldate;
  routesdata: any = null;
  totalcowcans: number = 0;
  totalbuffcans: number = 0;
  isChange: any = false;
  newroute: string = null;
  msgtext: string = null;
  msgclass: string = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.getRouteCustomersOnDate();
  }

  getRouteCustomersOnDate() {
    this.routesdata = null;
    let startdt = new Date(this.deldate);
    startdt.setHours(0, 0, 0, 1);
    let enddt = new Date(this.deldate);
    enddt.setHours(23, 59, 59, 999);
    // console.log(startdt.getTime(), enddt.getTime())
    let urldata = "startdt=" + startdt.getTime() + "&enddt=" + enddt.getTime() + "&routeno=" + this.routeno;
    this._rest.getData("routes.php", "getRouteCustomersOnDate", urldata).subscribe(Response => {
      //console.log(Response)
      if (Response && Response["data"]) {
        this.routesdata = Response["data"];
        this.calculateMilkCans()
      } else {
        this.routesdata = null;
      }
    })
  }

  calculateMilkCans() {
    for (let i in this.routesdata) {
      let cowcans = (parseFloat(this.routesdata[0].cowqty) / 40) - Math.floor(parseFloat(this.routesdata[0].cowqty) / 40);
      let buffcans = (parseFloat(this.routesdata[0].buffaloqty) / 40) - Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40);
      if (cowcans != 0) {
        if (cowcans > 0.5) {
          cowcans = Math.floor(parseFloat(this.routesdata[0].cowqty) / 40) + 1;
        } else {
          cowcans = Math.floor(parseFloat(this.routesdata[0].cowqty) / 40) + 0.5;
        }
      }
      if (buffcans != 0) {
        if (buffcans > 0.5) {
          buffcans = Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40) + 1;
        } else {
          buffcans = Math.floor(parseFloat(this.routesdata[0].buffaloqty) / 40) + 0.5;
        }
      }
      this.routesdata[i].cowcans = cowcans;
      this.routesdata[i].buffcans = buffcans;
      this.totalcowcans += cowcans;
      this.totalbuffcans += buffcans;
    }
  }

  openChangeRouteModal(dets) {
    this.isChange = dets;
    this.newroute = null;
  }

  changeRoute() {
    let urldata = {
      ordid: this.isChange.ordid,
      newroute: parseInt(this.newroute)
    };
    this._rest.postData('routes.php', "changeRoute", urldata).subscribe(Response => {
      if (Response) {
        this.msgtext = "Route Updated successfully";
        this.msgclass = "success";
        this.timer();
        this.isChange = false;
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
