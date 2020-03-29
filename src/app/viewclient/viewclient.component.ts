import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {
  activetab: number = 1;
  allcust: any = [];
  allsupp: any = [];

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this._rest.getData("client.php", "getAllClients").subscribe(Response => {
      if (Response && Response["data"]) {
        this.sortClients(Response["data"]);
      }
    });
  }

  sortClients(data) {
    this.allcust = [];
    this.allsupp = [];
    console.log(data)
    for (let i in data) {
      if (data[i].ctype == "1") {
        this.allsupp.push(data[i]);
      } else {
        this.allcust.push(data[i]);
      }
    }
  }
}
