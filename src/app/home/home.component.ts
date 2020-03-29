import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _rest: RestService, private _storage: StorageService, private _router: Router) { }

  ngOnInit(): void {
    this._storage.checkStorage().then(resp => {
      //console.log("Test", resp)
    }).catch(error => {
      this._router.navigate(["/login"]);
    });
  }

}
