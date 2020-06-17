import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import * as moment from "moment";

@Component({
  selector: "app-wastagemilk",
  templateUrl: "./wastagemilk.component.html",
  styleUrls: ["./wastagemilk.component.css"],
})
export class WastagemilkComponent implements OnInit {
  buffalowastage: any = null;
  cowastage: any = null;
  msgtext: any = null;
  msgclass: any = null;
  todate: any = null;
  stockcowqty: any = null;
  stockbuffaloqty: any = null;

  constructor(private _rest: RestService) {}
  ngOnInit(): void {
    this.resetForm();
    let todate = new Date();
    todate.setHours(0, 0, 0, 1);
    todate.setDate(todate.getDate());
    this.todate = moment(todate, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.getAllStocks();
  }
  addWastageMilk() {
    let dt = new Date(this.todate);
    dt.setHours(0, 0, 0, 1);
    let tmpobj = {
      todate: dt.getTime(),
      buffalowastage: this.buffalowastage,
      cowastage: this.cowastage,
      buffalostkqty:
        parseFloat(this.stockbuffaloqty) - parseFloat(this.buffalowastage),
      cowstkqty: parseFloat(this.stockcowqty) - parseFloat(this.cowastage),
    };
    console.log(tmpobj);

    this._rest.postData("product.php", "addWastageMilk", tmpobj).subscribe(
      (Response) => {
        this.msgtext = " Record " + " added successfully";
        this.msgclass = "success";
        this.timercnt();
      },
      (error) => {
        console.log(error);
        this.msgtext = "Record" + " addition failed";
        this.msgclass = "danger";
        this.timercnt();
      }
    );
  }
  getAllStocks() {
    this._rest.getData("stocks.php", "getAllStocks").subscribe((Response) => {
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
    });
  }

  timercnt() {
    let _this = this;
    this.resetForm();
    setTimeout(function () {
      _this.msgtext = null;
      _this.msgclass = null;
    }, 2000);
  }

  resetForm() {
    this.buffalowastage = null;
    this.cowastage = null;
  }
}
