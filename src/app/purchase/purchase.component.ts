import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  msgtext: string = null;
  msgclass: string = null;
  supplierName: string = null;
  purDate: string = null;
  purTime: string = null;
  product: string = null;
  quantity: string = null;
  rate: string = null;
  isEdit: any = false;
  editId: string = null;
  allpurchase: any = null;
  constructor() { }

  ngOnInit(): void {
    this.getPurchase();
  }


  addPurchase() {
    let obj = {
      supplierName: this.supplierName,
      purDate: this.purDate,
      purTime: this.purTime,
      product: this.product,
      quantity: this.quantity,
      rate: this.rate
    };
    console.log(obj);
    // this._rest.postData("product.php", "addProduct", obj).subscribe(Response => {
    //   this.msgtext = "Product added successfully.";
    //   this.msgclass = "success";
    //   this.prodnm = null;
    //   this.getProducts();
    //   this.timer();
    // }, err => {
    //   this.msgtext = "Product addition failed.";
    //   this.msgclass = "danger";
    //   this.timer();
    // });
  }

  getPurchase() {
    this.allpurchase = null;
    this.allpurchase = [
      {
        purchaseId: "1",
        supplierName: "ABC",
        purDate: "2019-01-25",
        purTime: "15:30",
        product: "Fodder",
        quantity: "2 kg",
        rate: "25"
      },
      {
        purchaseId: "2",
        supplierName: "PQR",
        purDate: "2019-07-07",
        purTime: "12:30",
        product: "Fodder",
        quantity: "5 kg",
        rate: "25"
      }]
    // this._rest.getData("product.php", "getAllProducts").subscribe(Response => {
    //   console.log(Response)
    //   if (Response && Response["data"]) {
    //     this.allprods = Response["data"];
    //   }
    // })
  }

  editPurchase(data) {
    this.isEdit = true;
    this.editId = data.purchaseId;
    this.supplierName = data.supplierName;
    this.purDate = data.purDate;
    this.purTime = data.purTime;
    this.product = data.product;
    this.quantity = data.quantity;
    this.rate = data.rate;
  }

  updatePurchase() {
    let obj = {
      supplierName: this.supplierName,
      purDate: this.purDate,
      purTime: this.purTime,
      product: this.product,
      quantity: this.quantity,
      rate: this.rate
    };
    console.log(obj);

    this.isEdit = false;
    this.supplierName = "";
    this.purDate = "";
    this.purTime = "";
    this.product = "";
    this.quantity = "";
    this.rate = "";
    // this._rest.postData("product.php", "updateProduct", obj).subscribe(Response => {
    //   this.msgtext = "Product updated successfully.";
    //   this.msgclass = "success";
    //   this.prodnm = null;
    //   this.isEditClientId = null;
    //   this.getProducts();
    //   this.timer();
    // }, err => {
    //   this.msgtext = "Product updation failed.";
    //   this.msgclass = "danger";
    //   this.timer();
    // })
  }
}
