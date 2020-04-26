import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-neworder",
  templateUrl: "./neworder.component.html",
  styleUrls: ["./neworder.component.css"],
})

// TODO: Once an order is placed and same route is selected get the orders back
export class NeworderComponent implements OnInit {
  msgclass: string = null;
  msgtext: string = null;
  routeno: string = null;
  vehicleno: string = null;
  drivernm: string = null;
  orderdt: any = null;
  allcustdata: any = null;
  routecusts: any = null;
  routesdata: any = null;
  stockbuffaloqty: any = 0;
  stockcowqty: any = 0;
  orderalreadyplaced: boolean = false;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.orderalreadyplaced = false;
    let tomorrowdt = new Date();
    tomorrowdt.setDate(tomorrowdt.getDate() + 1);
    tomorrowdt.setHours(0, 0, 0, 1);
    this.orderdt = moment(tomorrowdt, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.getAllStocks();
    this.getAllClientsByType().then(Resp => {
      this.getAllDistinctRoutes().then(Routes => {
        this.filterCustAsPerRoutes();
      }).catch(routeerr => {
        this.routecusts = [];
      })
    }).catch(err => {
      this.msgclass = 'danger';
      this.msgtext = 'Cannot find any customers, Kindly add a customer first';
      this.timer();
    })
  }

  // This method checks if any data present for this route and date
  getRoutesOrders(dt) {
    this.orderalreadyplaced = false;
    let urldata = 'routeno=' + this.routeno + "&tomdt=" + dt.getTime();
    this._rest.getData("routes.php", "getRoutesOrders", urldata)
      .subscribe(Response => {
        if (Response && Response["data"]) {
          console.log(Response)
          this.setRouteOrdersData(Response);
        }
      });
  }

  // This method is only called if there is some data present for this route and on this date, AND sets the data back
  setRouteOrdersData(Response) {
    this.orderalreadyplaced = true;
    let data = Response["data"];
    let driverdets = Response["driverdets"];
    for (let i in this.routecusts) {
      this.routecusts[i].buffaloqty = data[i].buffaloqty;
      this.routecusts[i].cowqty = data[i].cowqty;
      this.routecusts[i].amount = data[i].amount;
    }
    this.drivernm = driverdets.drivernm;
    this.vehicleno = driverdets.vehicleno;
  }

  filterCustAsPerRoutes() {
    this.resetForm();
    let tmpcustdata = JSON.parse(JSON.stringify(this.allcustdata)); //Deep Copy

    for (let i in tmpcustdata) {
      if (this.routeno === tmpcustdata[i].routeno) {
        this.routecusts.push(tmpcustdata[i]);
      }
    }
    if (this.routecusts.length > 0) {
    } else {
      this.routecusts = []
    }

    let tomorrowdt = new Date(this.orderdt);
    tomorrowdt.setHours(0, 0, 0, 1);
    this.getRoutesOrders(tomorrowdt);
  }

  getAllDistinctRoutes() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._rest.getData("routes.php", "getAllDistinctRoutes").subscribe(Response => {
        if (Response && Response["data"]) {
          _this.routesdata = Response["data"];
          _this.routeno = _this.routesdata[0].routeno;
          resolve(true);
        }
        else {
          reject(false);
        }
      });
    });
  }

  getAllStocks() {
    this._rest.getData("stocks.php", "getAllStocks").subscribe(Response => {
      if (Response && Response["data"]) {
        let data = Response["data"];
        for (let i in data) {
          if (data[i].stockid.toString() === "1") {
            this.stockcowqty = data[i].quantity;
          }
          if (data[i].stockid.toString() === "2") {
            this.stockbuffaloqty = data[i].quantity;
          }
        }
      }
    })
  }

  getAllClientsByType() {
    let geturl = 'ctype=2';
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._rest.getData("client.php", 'getAllClientsByType', geturl).subscribe(Response => {
        if (Response && Response["data"]) {
          _this.allcustdata = Response["data"];
          // This is dynamic qty added to use by later;
          for (let i in _this.allcustdata) {
            _this.allcustdata[i].buffaloqty = 0;
            _this.allcustdata[i].cowqty = 0;
            _this.allcustdata[i].amount = 0;
          }
          resolve(true);
        }
        else {
          reject(false)
        }
        _this = null;
      });
    });
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }

  placeOrder() {
    let totalbuffqty = 0, totalcowqty = 0;
    for (let i in this.routecusts) {
      totalbuffqty += parseFloat(this.routecusts[i].buffaloqty);
      totalcowqty += parseFloat(this.routecusts[i].cowqty);
    }
    if ((parseFloat(this.stockbuffaloqty) - totalbuffqty) < 0 || (parseFloat(this.stockcowqty) - totalcowqty) < 0) {
      this.msgclass = "danger";
      this.msgtext = "Your total order cannot be greater than available stock...";
      this.timer();
      return;
    }
    let dt = new Date(this.orderdt);
    dt.setHours(0, 0, 0, 1);
    let tmpobj = {
      orderdt: dt.getTime(),
      routeno: this.routeno,
      drivernm: this.drivernm,
      vehicleno: this.vehicleno,
      custorders: this.routecusts,
      buffalostkqty: (parseFloat(this.stockbuffaloqty) - totalbuffqty),
      cowstkqty: (parseFloat(this.stockcowqty) - totalcowqty),
    };
    console.log(tmpobj);

    this._rest.postData("order.php", "placeOrder", tmpobj).subscribe(Response => {
      this.msgtext = "Order Placed Successfully...";
      this.msgclass = "success";
      this.getAllStocks();
      this.timer();
      this.resetForm();
    }, err => {
      this.msgtext = "Order Cannot Be Placed.";
      this.msgclass = "danger";
      this.timer();
      this.resetForm();
    })
  }

  resetForm() {
    this.routecusts = [];
    this.drivernm = null;
    this.vehicleno = null;
  }

  calculateAmount(cust, index) {
    cust.amount = (parseFloat(cust.buffaloqty) * parseFloat(cust.buffalorate)) + (parseFloat(cust.cowqty) * parseFloat(cust.cowrate));
  }
}
