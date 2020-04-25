import { Injectable } from '@angular/core';
import { EncDecService } from './encdec.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storagetype: any = sessionStorage;
  constructor(private _enc: EncDecService, private _global: GlobalService) { }

  checkStorage() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      if (_this.storagetype.getItem("userkey")) {
        let cipherobj = (_this.storagetype.getItem("userkey"));
        let data = _this._enc.decrypt(cipherobj)
        _this._global.setNavStatus(data[0].fullname);
        resolve(data)
      }
      else {
        reject(false);
      }
    });
  }

  setStorage(obj) {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._enc.encrypt(obj).then(Response => {
        _this.storagetype.setItem("userkey", Response.toString());
        resolve(Response);
      });
    });
  }

  clearStorage() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this.storagetype.clear();
      resolve(true);
    });
  }
}
