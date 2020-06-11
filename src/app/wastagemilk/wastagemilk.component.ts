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
  constructor(private _rest: RestService) {}
  ngOnInit(): void {
    let todate = new Date();
    todate.setHours(0, 0, 0, 1);
    todate.setDate(todate.getDate());
    this.todate = moment(todate, "YYYY-MM-DD").format("YYYY-MM-DD");
  }
  addWastageMilk() {
    let tmpobj = {
      todate: this.todate,
      buffalowastage: this.buffalowastage,
      cowastage: this.cowastage,
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
  timercnt() {
    let _this = this;
    this.resetForm();
    setTimeout(function () {
      _this.msgtext = null;
      _this.msgclass = null;
    }, 2000);
  }

  resetForm() {
    this.todate = null;
    this.buffalowastage = null;
    this.cowastage = null;
  }
}
