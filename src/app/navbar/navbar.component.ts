import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { GlobalService } from '../global.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  hidenavbar: boolean = true;
  username: any = null;
  navstatussubs: Subscription;
  display_navbar: boolean = false;

  constructor(private _storage: StorageService, private _global: GlobalService, private _router: Router) {
    this.navstatussubs = this._global.getNavStatus().subscribe(Response => {
      if (Response.status) {
        this.username = Response.status;
        this.display_navbar = Response.status;
      }
      else {
        this.display_navbar = false;
      }
    }, err => {
      console.log("err", err);
    });
  }

  ngOnInit(): void {
    this._storage.checkStorage().then(Response => {
      // console.log(Response);
      // this.username = Response[0].fullname;
    }, error => {
      console.log("error", error);
      this._router.navigate(["/login"]);
    })
  }

  logout() {
    this._storage.clearStorage().then(resp => {
      this.display_navbar = false;
      this._router.navigate(["/login"]);
    })
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.navstatussubs.unsubscribe();
  }
}
