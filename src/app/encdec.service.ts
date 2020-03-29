import { Injectable } from "@angular/core";
import SimpleCrypto from "simple-crypto-js";

@Injectable({
  providedIn: "root"
})
export class EncDecService {
  _secretKey = "m$lkm@n";
  constructor() { }

  encrypt(obj) {
    let _this = this;
    return new Promise(function (resolve, reject) {
      let simpleCrypto = new SimpleCrypto(_this._secretKey);
      let cipherObj = simpleCrypto.encrypt(obj);
      resolve(cipherObj);
    });
  }

  decrypt(cipherObj) {
    let simpleCrypto = new SimpleCrypto(this._secretKey);
    return simpleCrypto.decrypt(cipherObj, true)["data"];
  }
}
