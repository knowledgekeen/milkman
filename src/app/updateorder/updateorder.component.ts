import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { RestService } from "../rest.service";

@Component({
  selector: "app-updateorder",
  templateUrl: "./updateorder.component.html",
  styleUrls: ["./updateorder.component.css"],
})
export class UpdateorderComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  deldate: any = null;
  ordersdata: any = null;
  orderdt: any = null;
  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    let deldate = new Date();
    deldate.setHours(0, 0, 0, 1);
    deldate.setDate(deldate.getDate());
    this.deldate = moment(deldate, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.getAllOrders();
  }
  getAllOrders() {
    this.ordersdata = null;
    let dt = new Date(this.deldate);
    dt.setHours(0, 0, 0, 1);
    let dt1 = new Date(this.orderdt);
    dt1.setHours(0, 0, 0, 1);

    let urldata = "deldate=" + dt.getTime(); //"orderdt="+dt1.getTime();
    this._rest.getData("order.php", "getAllOrders", urldata).subscribe(
      (Response) => {
        if (Response && Response["data"]) {
          this.ordersdata = Response["data"];
          console.log(this.ordersdata);
        } else {
          console.log("error occured");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateOrder(dets) {
    dets.amount =
      parseFloat(dets.buffaloqty) * parseFloat(dets.buffalorate) +
      parseFloat(dets.cowqty) * parseFloat(dets.cowrate);

    console.log(dets);
    let tmpobj = {
      //orderid: dets.orderid,
      clientid: dets.clientid,
      name: dets.name,
      buffaloqty: dets.buffaloqty,
      cowqty: dets.cowqty,
      buffaloinr: dets.buffalorate,
      cowinr: dets.cowrate,
      orderdt: dets.orderdt,
      amount: dets.amount,
    };

    console.log(tmpobj);
    this._rest.postData("order.php", "updateOrder", tmpobj).subscribe(
      (Response) => {
        this.msgtext = "order" + " updated successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Order" + " updation failed";
        this.msgclass = "danger";
        this.timercnt();
      }
    );
  }
  timercnt() {
    let _this = this;
    setTimeout(function () {
      _this.msgtext = null;
      _this.msgclass = null;
    }, 2000);
  }
}
