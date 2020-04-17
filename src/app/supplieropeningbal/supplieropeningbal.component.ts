import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-supplieropeningbal",
  templateUrl: "./supplieropeningbal.component.html",
  styleUrls: ["./supplieropeningbal.component.css"]
})
export class SupplieropeningbalComponent implements OnInit {
  suppliernm: String = null;
  openingBal: any = null;
  openingBalDate: any = null;

  constructor(private _rest: RestService) {}

  ngOnInit(): void {}
}
