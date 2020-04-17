import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  msgtext: string = null;
  msgclass: string = null;
  prodnm: string = null;
  isEditClientId: any = false;
  allprods: any = null;

  constructor(private _rest: RestService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct() {
    let obj = { prodnm: this.prodnm };
    this._rest.postData("product.php", "addProduct", obj).subscribe(
      (Response) => {
        this.msgtext = "Product added successfully.";
        this.msgclass = "success";
        this.prodnm = null;
        this.getProducts();
        this.timer();
      },
      (err) => {
        this.msgtext = "Product addition failed.";
        this.msgclass = "danger";
        this.timer();
      }
    );
  }

  editProduct(prodid, prodnm) {
    this.isEditClientId = prodid;
    this.prodnm = prodnm;
    console.log(prodid);
  }

  updateProduct() {
    let obj = {
      prodid: this.isEditClientId,
      prodnm: this.prodnm,
    };
    this._rest.postData("product.php", "updateProduct", obj).subscribe(
      (Response) => {
        this.msgtext = "Product updated successfully.";
        this.msgclass = "success";
        this.prodnm = null;
        this.isEditClientId = null;
        this.getProducts();
        this.timer();
      },
      (err) => {
        this.msgtext = "Product updation failed.";
        this.msgclass = "danger";
        this.timer();
      }
    );
  }

  timer() {
    let _this = this;
    setTimeout(() => {
      _this.msgclass = null;
      _this.msgtext = null;
    }, 2000);
  }

  getProducts() {
    this.allprods = null;
    this._rest
      .getData("product.php", "getAllProducts")
      .subscribe((Response) => {
        console.log(Response);
        if (Response && Response["data"]) {
          this.allprods = Response["data"];
        }
      });
  }
}
