import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import * as moment from "moment";

@Component({
  selector: 'app-inhouseprod',
  templateUrl: './inhouseprod.component.html',
  styleUrls: ['./inhouseprod.component.css']
})
export class InhouseprodComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  proddt: any = null;
  prod: any = null;
  proddata: any = null;
  qty: string = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    let tomorrowdt = new Date();
    tomorrowdt.setDate(tomorrowdt.getDate() + 1);
    this.proddt = moment(tomorrowdt, 'YYYY-MM-DD').format("YYYY-MM-DD");
    this.getProducts();
  }


  getProducts() {
    this.proddata = null;
    this._rest.getData("product.php", "getAllProducts").subscribe(Response => {
      if (Response && Response["data"]) {
        this.proddata = Response["data"];
        this.prod = this.proddata[0].prodid;
      }
    });
  }

  addProduction() {
    let dt = new Date(this.proddt);
    dt.setHours(0, 0, 0, 1);
    let tmpobj = {
      prodid: this.prod,
      proddt: dt.getTime(),
      qty: this.qty
    }
    console.log(tmpobj);
    this._rest.postData("production.php", "addProduction", tmpobj).subscribe(Response => {
      this.msgtext = "Production quantity added successfully";
      this.msgclass = "success";
      this.timer();
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
