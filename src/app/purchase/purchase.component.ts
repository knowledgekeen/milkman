import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { RestService } from '../rest.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  msgtext: string = null;
  msgclass: string = null;
  supplierName: string = null;
  purDate: any = null;
  purTime: string = null;
  product: string = null;
  quantity: string = null;
  rate: string = null;
  isEdit: any = false;
  editId: string = null;
  tmpdata: any  =null;
  allpurchase: any = null;
  suppdata: any = null;
  proddata: any = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.resetForm();
    this.getAllPurchases();
    this.getSuppliers();
    this.getAllProducts();
  }

  getSuppliers(){
    let geturl = "ctype=1"; 
    this._rest.getData("client.php", "getAllClientsByType", geturl).subscribe(Response=>{
      console.log(Response)
      if(Response && Response["data"]){
        this.suppdata=Response["data"];
      }
    })
  }
  
  getAllProducts(){
    this._rest.getData("product.php", "getAllProducts").subscribe(Response=>{
      if(Response && Response["data"]){
        this.proddata = Response["data"];
        this.product = this.proddata[0].prodid;
      }
    });
  }

  addPurchase() {
    let clientid = null;
    for(let i in this.suppdata){
      if(this.supplierName == this.suppdata[i].name){
        clientid = this.suppdata[i].clientid;
        break;
      }
    }
    let dt = new Date(this.purDate);
    dt.setHours(parseInt(this.purTime.split(":")[0]));
    dt.setMinutes(parseInt(this.purTime.split(":")[1]));
    console.log(dt.getTime());
    let obj = {
      clientid: parseInt(clientid),
      purchdate: dt.getTime(),
      prodid: parseInt(this.product),
      quantity: this.quantity,
      rate: this.rate
    };
    console.log(obj);
    this._rest.postData("purchase.php", "addPurchase", obj).subscribe(Response => {
      this.msgtext = "Purchase successful.";
      this.msgclass = "success";
      this.getAllPurchases();
      this.timer();
      this.resetForm();
    }, err => {
      this.msgtext = "Purchase Failed.";
      this.msgclass = "danger";
      this.timer();
    });
  }

  getAllPurchases() {
    this.allpurchase = null;
    this._rest.getData("purchase.php", "getAllPurchases").subscribe(Response=>{
      if(Response && Response["data"]){
        this.allpurchase = Response["data"];
      }
    });
  }

  editPurchase(data) {
    this.tmpdata = null;
    let dt = moment(new Date(parseFloat(data.purchdate)), "YYYY-MM-DD");
    this.purDate = dt.format("YYYY-MM-DD");
    this.purTime = dt.format("HH:mm")
    this.isEdit = true;
    this.editId = data.purchid;
    this.supplierName = data.name;
    this.product = data.prodid;
    this.quantity = data.quantity;
    this.rate = data.rate;
    this.tmpdata = JSON.parse(JSON.stringify(data));
  }

  updatePurchase() {
    let clientid = null;
    for(let i in this.suppdata){
      if(this.supplierName == this.suppdata[i].name){
        clientid = this.suppdata[i].clientid;
        break;
      }
    }
    let dt = new Date(this.purDate);
    dt.setHours(parseInt(this.purTime.split(":")[0]));
    dt.setMinutes(parseInt(this.purTime.split(":")[1]));
    console.log(this.tmpdata.quantity);
    let obj = {
      purchid: this.editId,
      clientid: parseInt(clientid),
      purchdate: dt.getTime(),
      prodid: parseInt(this.product),
      quantity: this.quantity,
      rate: this.rate,
      prevqty: this.tmpdata.quantity
    };
    
    this._rest.postData("purchase.php", "updatePurchase", obj).subscribe(Response => {
      this.msgtext = "Purchase updated successfully.";
      this.msgclass = "success";
      this.resetForm();
      this.getAllPurchases();
      this.timer();
    }, err => {
      this.msgtext = "Purchase updation failed.";
      this.msgclass = "danger";
      this.timer();
    })
  }

  timer() {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, 2000);
  }

  cancelPurchase(){
    this.resetForm();
  }

  resetForm(){
    let dt = moment(new Date(), "YYYY-MM-DD");
    this.purDate = dt.format("YYYY-MM-DD");
    this.purTime = dt.format("HH:mm");
    this.tmpdata = null;
    this.isEdit = false;
    this.editId = null;
    this.supplierName = "";
    this.product = "";
    this.quantity = "";
    this.rate = ""; 
  }
}
