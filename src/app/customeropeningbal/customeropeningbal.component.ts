import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-customeropeningbal",
  templateUrl: "./customeropeningbal.component.html",
  styleUrls: ["./customeropeningbal.component.css"],
})
export class CustomeropeningbalComponent implements OnInit {
  customernm: String = null;
  openingbal: any = null;
  openingbaldate: any = null;

  constructor() {}

  ngOnInit() {}
}
