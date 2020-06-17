import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { RestService } from "../rest.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.css"],
})
export class PurchaseComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  purDate: any = null;
  allmilkdata: any = null;
  purTime: string = "1";
  stockbuffaloqty: any = 0;
  stockcowqty: any = 0;
  newbuffaloqty: any = null;
  newcowqty: any = null;
  supplierName: string = null;
  allsuppdata: any = null;
  morngbuffaloqty: any = null;
  evngbuffaloqty: any = null;
  morngcowqty: any = null;
  evngcowqty: any = null;
  allsupp: any = null;
  oldbuffaloqty: any = null;
  oldcowqty: any = null;
  value: boolean = false;
  wastebuffalomilk: any = null;
  wastecowmilk: any = null;
  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.resetForm();
    this.getPurchaseDetailsForDate();
    this.getAllStocks();
    this.allMilkOnDate();
  }

  getAllClientsByType() {
    let geturl = "ctype=1";
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._rest
        .getData("client.php", "getAllClientsByType", geturl)
        .subscribe((Response) => {
          if (Response && Response["data"]) {
            _this.allsuppdata = Response["data"];
            // This is dynamic qty added to use by later;
            for (let i in _this.allsuppdata) {
              _this.allsuppdata[i].morngcowqty = 0;
              _this.allsuppdata[i].morngcowdisabled = false;
              _this.allsuppdata[i].evngcowqty = 0;
              _this.allsuppdata[i].evngcowdisabled = false;
              _this.allsuppdata[i].morngbuffaloqty = 0;
              _this.allsuppdata[i].morngbuffalodisabled = false;
              _this.allsuppdata[i].evngbuffaloqty = 0;
              _this.allsuppdata[i].evngbuffalodisabled = false;
              _this.allsuppdata[i].amount = 0;
            }
            resolve(true);
          } else {
            reject(false);
          }
          _this = null;
        });
    });
  }

  fetchSuppliersDetails() {
    let dt = new Date(this.purDate);
    dt.setHours(0, 0, 0, 1);
    const urldata = "purdate=" + dt.getTime();
    this._rest
      .getData("purchase.php", "fetchSuppliersDetails", urldata)
      .subscribe(
        (Response) => {
          if (Response && Response["data"]) {
            this.allsupp = Response["data"];
            console.log(this.allsupp, this.allsuppdata);
            for (let x in this.allsuppdata) {
              for (let y in this.allsupp) {
                if (this.allsuppdata[x].clientid == this.allsupp[y].clientid) {
                  if (parseFloat(this.allsupp[y].morngbuffaloqty)) {
                    this.allsuppdata[x].morngbuffaloqty = this.allsupp[
                      y
                    ].morngbuffaloqty;
                    this.allsuppdata[x].morngbuffalodisabled = true;
                  }
                  if (parseFloat(this.allsupp[y].morngcowqty)) {
                    this.allsuppdata[x].morngcowqty = this.allsupp[
                      y
                    ].morngcowqty;
                    this.allsuppdata[x].morngcowdisabled = true;
                  }
                  if (parseFloat(this.allsupp[y].evngbuffaloqty)) {
                    this.allsuppdata[x].evngbuffaloqty = this.allsupp[
                      y
                    ].evngbuffaloqty;
                    this.allsuppdata[x].evngbuffalodisabled = true;
                  }
                  if (parseFloat(this.allsupp[y].evngcowqty)) {
                    this.allsuppdata[x].evngcowqty = this.allsupp[y].evngcowqty;
                    this.allsuppdata[x].evngcowdisabled = true;
                  }
                }
              }
            }
            //console.log(this.allsupp);
          } else {
            console.log("error occured");
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addPurchase() {
    let dt = new Date(this.purDate);
    dt.setHours(0, 0, 0, 1);
    let totalbuffqty = 0,
      totalcowqty = 0;

    this.allsuppdata.map((resp) => {
      console.log(resp);
      totalbuffqty +=
        parseFloat(resp.morngbuffaloqty) + parseFloat(resp.evngbuffaloqty);
      totalcowqty += parseFloat(resp.morngcowqty) + parseFloat(resp.evngcowqty);
    });

    if (
      parseFloat(this.stockbuffaloqty) - totalbuffqty < 0 ||
      parseFloat(this.stockcowqty) - totalcowqty < 0
    ) {
      this.msgclass = "danger";
      this.msgtext =
        "Your total order cannot be greater than available stock...";
      this.timer();
      return;
    }
    let tmpobj = {
      purchdate: dt.getTime(),
      purchtime: this.purTime,
      suppdata: this.allsuppdata,
      buffalostkqty: parseFloat(this.stockbuffaloqty) + totalbuffqty,
      cowstkqty: parseFloat(this.stockcowqty) + totalcowqty,
    };
    this._rest.postData("purchase.php", "addPurchase", tmpobj).subscribe(
      (Response) => {
        this.msgtext = "Purchase successful.";
        this.msgclass = "success";
        this.getPurchaseDetailsForDate();
        this.getAllStocks();
        this.timer();
        this.resetForm();
      },
      (err) => {
        this.msgtext = "Purchase Failed.";
        this.msgclass = "danger";
        this.timer();
        this.resetForm();
      }
    );
  }

  calculateAmount(supp, index) {
    supp.amount =
      parseFloat(supp.morngbuffaloqty) * parseFloat(supp.buffalorate) +
      parseFloat(supp.morngcowqty) * parseFloat(supp.cowrate);
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
  allMilkOnDate() {
    let dt = new Date(this.purDate);
    dt.setHours(0, 0, 0, 1);
    const urldata = "purdate=" + dt.getTime();
    this._rest
      .getData("purchase.php", "allMilkOnDate", urldata)
      .subscribe((Response) => {
        if (Response && Response["data"]) {
          this.allmilkdata = Response["data"];
          this.wastebuffalomilk = this.allmilkdata[0].buffalowastage;
          this.wastecowmilk = this.allmilkdata[0].cowastage;
          this.oldbuffaloqty =
            parseFloat(this.stockbuffaloqty) +
            parseFloat(this.wastebuffalomilk);
          console.log(this.oldbuffaloqty);
          this.oldcowqty =
            parseFloat(this.stockcowqty) + parseFloat(this.wastecowmilk);
        }
      });
  }

  resetForm() {
    let dt = moment(new Date(), "YYYY-MM-DD");
    this.purDate = dt.format("YYYY-MM-DD");
  }

  changeDate() {
    this.getPurchaseDetailsForDate();
  }

  getPurchaseDetailsForDate() {
    this.getAllClientsByType().then((resp) => {
      this.fetchSuppliersDetails();
    });
  }

  timer() {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, 2000);
  }
}
