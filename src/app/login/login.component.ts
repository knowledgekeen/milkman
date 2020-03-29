import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { EncDecService } from '../encdec.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "admin";
  password: string = "Assasa";
  errormsg: string = null;

  constructor(private _storage: StorageService, private _rest: RestService, private _router: Router, private _enc: EncDecService, private _global: GlobalService) { }

  ngOnInit(): void {
    this._storage.checkStorage().then(Response => {
      if (Response) {
        this._router.navigate(["/home"]);
      }
    }).catch(function (err) {
    });
  }

  Login(event) {
    if (event && event.code != "Enter" && event.code != undefined) {
      return;
    }
    let tmpobj = {
      username: this.username,
      passwd: this.password
    }
    this.errormsg = null;
    this._rest.postData("user.php", "checkLogin", tmpobj).subscribe(Response => {
      if (Response) {
        this._storage.setStorage(Response).then(Resp => {
          this._global.setNavStatus(true);
          this._router.navigate(["/home"]);
        });
      }
      else {
        let _this = this;
        this.errormsg = "Invalid Credentials !";
        setTimeout(function () {
          _this.errormsg = null;
        }, 2000);
      }
    }, error => {
      console.error(error);
    })
  }
}
