import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-customeropeningbal",
  templateUrl: "./customeropeningbal.component.html",
  styleUrls: ["./customeropeningbal.component.css"],
})
export class CustomeropeningbalComponent implements OnInit {
  customernm: string = null;
  openingbal: any = null;
  openingbaldate: any = null;
  msgtext: string = null;
  msgclass: string = null;

  constructor(
    private _rest: RestService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {}
  updateopeningbal() {
    let tmpobj = {
      customernm: this.customernm,
      openingbal: this.openingbal,
      openingbaldate: this.openingbaldate,
    };
    console.log(tmpobj);
  }
}
