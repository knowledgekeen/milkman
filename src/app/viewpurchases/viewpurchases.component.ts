import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-viewpurchases',
  templateUrl: './viewpurchases.component.html',
  styleUrls: ['./viewpurchases.component.css']
})
export class ViewpurchasesComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  allpurchase: any = null;
  editdataobj: any = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.getAllPurchases().then(resp => {
    });
  }

  getTotalAmount() {
    for (let i in this.allpurchase) {
      this.allpurchase[i].amount = parseFloat(this.allpurchase[i].quantity) * parseFloat(this.allpurchase[i].rate);
    }
  }

  getAllPurchases() {
    let _this = this;
    return new Promise((resolve, reject) => {
      this.allpurchase = null;
      this._rest.getData("purchase.php", "getAllPurchases").subscribe(Response => {
        if (Response && Response["data"]) {
          this.allpurchase = Response["data"];
          this.getTotalAmount();
          resolve(this.allpurchase);
        }
      });
    });
  }

  editPurchase(purch) {
    this.editdataobj = JSON.stringify(purch);
  }

  closeModal() {
    this.editdataobj = null;
    this.getAllPurchases();
  }
}