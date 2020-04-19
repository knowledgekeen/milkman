import { Component, OnInit } from "@angular/core";
import { RestService } from "../rest.service";

@Component({
  selector: "app-viewallcustomers",
  templateUrl: "./viewallcustomers.component.html",
  styleUrls: ["./viewallcustomers.component.css"],
})
export class ViewallcustomersComponent implements OnInit {
  allcustmr: any = [];

  constructor(private _rest: RestService) {}

  ngOnInit(): void {}
}
