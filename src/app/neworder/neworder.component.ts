import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-neworder",
  templateUrl: "./neworder.component.html",
  styleUrls: ["./neworder.component.css"],
})
export class NeworderComponent implements OnInit {
  custdata: any = null;
  productdata: any = null;
  milkdata: any = null;
  custname: string = null;
  msgtext: string = null;
  msgclass: string = null;
  orderdate: any = null;
  buffalomilk: string = "0";
  cowmilk: string = "0";
  deliveryplace: string = null;
  route: string = null;
  deliverydate: any = null;
  deliverytime: any = null;
  buffalomilkrate: string = "0";
  cowmilkrate: string = "0";

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.milkdata = [];
    this.resetForm();
    this.getCustomers();
    this.getAllProducts().then((resp) => {
      let result: any;
      result = resp;
      result.filter((data) => {
        if (data.prodname.match("Milk")) {
          this.milkdata.push(data);
        }
      });
      console.log(this.milkdata);
    });
  }

  getCustomers() {
    let geturl = "ctype=2";
    this._rest
      .getData("client.php", "getAllClientsByType", geturl)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.custdata = Response["data"];
        }
      });
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      this._rest
        .getData("product.php", "getAllProducts")
        .subscribe((Response) => {
          if (Response && Response["data"]) {
            this.productdata = Response["data"];
            resolve(this.productdata);
          }
        });
    });
  }

  placeOrder() {
    if (
      !this.custname ||
      !this.orderdate ||
      !this.buffalomilk ||
      !this.cowmilk ||
      !this.deliveryplace ||
      !this.route ||
      !this.deliverydate ||
      !this.deliverytime ||
      !this.buffalomilkrate ||
      !this.cowmilkrate
    ) {
      this.msgtext = "All Fields are Compulsory";
      this.msgclass = "danger";
      this.timer();
    } else {
      let custid = null;
      for (let i in this.custdata) {
        if (this.custname == this.custdata[i].name) {
          custid = this.custdata[i].clientid;
          break;
        }
      }
      if (custid == null) {
        this.msgtext =
          'Customer cannot be found, Kindly add this customer first in "Add Client" Menu';
        this.msgclass = "danger";
        this.timer(3000);
        return;
      }

      let milkstkobj = [];
      milkstkobj.push({
        prodid: this.milkdata[0].prodid,
        prodname: this.milkdata[0].prodname,
        qty: this.buffalomilk,
      });
      milkstkobj.push({
        prodid: this.milkdata[1].prodid,
        prodname: this.milkdata[1].prodname,
        qty: this.cowmilk,
      });
      let dt = new Date(this.orderdate);
      let deldt = new Date(this.deliverydate);
      deldt.setHours(parseInt(this.deliverytime.split(":")[0]));
      deldt.setMinutes(parseInt(this.deliverytime.split(":")[1]));
      let custobj = {
        clientid: custid,
        orderdt: dt.getTime(),
        buffaloqty: this.buffalomilk,
        cowqty: this.cowmilk,
        deliveryplace: this.deliveryplace,
        route: this.route,
        deliverydt: deldt.getTime(),
        buffaloinr: this.buffalomilkrate,
        cowinr: this.cowmilkrate,
        milkstkobj: milkstkobj,
      };
      console.log(custobj);
      this._rest
        .postData("order.php", "placeOrder", custobj)
        .subscribe((Response) => {
          this.msgtext = "Order Placed Successfully";
          this.msgclass = "success";
          this.timer();
          this.resetForm();
        });
    }
  }

  timer(ms: any = 2000) {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, ms);
  }

  resetForm() {
    let dt = moment(new Date(), "YYYY-MM-DD");
    this.orderdate = dt.format("YYYY-MM-DD");
    let tomorrowdt = new Date();
    tomorrowdt.setHours(5, 0, 0, 0);
    tomorrowdt.setDate(tomorrowdt.getDate() + 1);
    this.deliverydate = moment(tomorrowdt, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.deliverytime = moment(tomorrowdt, "YYYY-MM-DD").format("HH:mm");
    this.custname = null;
    this.buffalomilk = "0";
    this.cowmilk = "0";
    this.deliveryplace = null;
    this.route = null;
    this.buffalomilkrate = "0";
    this.cowmilkrate = "0";
  }

  getCustomerDetails() {
    this.buffalomilk = "0";
    this.cowmilk = "0";
    this.deliveryplace = null;
    this.route = null;
    this.buffalomilkrate = "0";
    this.cowmilkrate = "0";
    for (let i in this.custdata) {
      if (this.custname == this.custdata[i].name) {
        this.deliveryplace = this.custdata[i].address;
        this.getCustomerLastRouteData(this.custdata[i].clientid);
        break;
      }
    }
  }

  getCustomerLastRouteData(clientid) {
    if (!clientid) return;
    let urldata = "clientid=" + clientid;
    this._rest
      .getData("order.php", "getCustomerLastOrderDets", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          let data = Response["data"];
          this.buffalomilk = data.buffaloqty;
          this.cowmilk = data.cowqty;
          this.deliveryplace = data.deliveryplace;
          this.route = data.route;
          this.buffalomilkrate = data.buffaloinr;
          this.cowmilkrate = data.cowinr;
        }
      });
  }
}
