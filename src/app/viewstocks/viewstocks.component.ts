import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  styleUrls: ['./viewstocks.component.css']
})
export class ViewstocksComponent implements OnInit {
  allstocks: any = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks() {
    this._rest.getData("stocks.php", "getAllStocks").subscribe(Response => {
      if (Response && Response["data"]) {
        this.allstocks = Response["data"];
      }
    })
  }

}
