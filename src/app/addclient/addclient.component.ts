import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  cno: string = null;
  cno1: string = null;
  fname: string = null;
  cperson: string = null;
  usertype: string = '1';
  address: string = null;
  additionalinfo: string = null;
  msgtext: string = null;
  msgclass: string = null;
  clientid: string = null;

  constructor(private _rest: RestService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._route.params.subscribe(parm => {
      this.clientid = parm.clientid;
      if (parm.clientid.toString() != '0') {
        //Fetch Client Details
        this.fetchClientDetails();
      }
    });
  }

  addClient() {
    let tmpobj = {
      fname: this.fname,
      cno: this.cno,
      ctype: parseInt(this.usertype),
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      addinfo: this.additionalinfo,
    }
    console.log(tmpobj);

    let clienttype = (this.usertype == "1") ? "Supplier" : "Customer";
    this._rest.postData("client.php", "addClient", tmpobj).subscribe(Response => {
      this.msgtext = clienttype + " added successfully";
      this.msgclass = "success";
      this.timercnt();
    }, error => {
      console.log(error);
      this.msgtext = clienttype + " addition failed";
      this.msgclass = "danger";
      this.timercnt();
    });
  }

  timercnt() {
    let _this = this;
    this.resetForm();
    setTimeout(function () {
      _this.msgtext = null;
      _this.msgclass = null;
      if (_this.clientid != "0") {
        _this._router.navigate(["viewclients"]);
      }
    }, 2000);
  }

  resetForm() {
    this.cno = null;
    this.cno1 = null;
    this.fname = null;
    this.cperson = null;
    this.usertype = '1';
    this.address = null;
    this.additionalinfo = null;
  }

  fetchClientDetails() {
    let urldata = "clientid=" + this.clientid;
    this._rest.getData("client.php", "getClientDetails", urldata).subscribe(Response => {
      if (Response && Response["data"]) {
        let data = Response["data"];
        this.cno = data.cno;
        this.cno1 = data.cno1;
        this.fname = data.name;
        this.cperson = data.cperson;
        this.usertype = data.ctype;
        this.address = data.address;
        this.additionalinfo = data.addinfo;
      }
    })
  }

  updateClient() {
    let tmpobj = {
      clientid: this.clientid,
      fname: this.fname,
      cno: this.cno,
      ctype: parseInt(this.usertype),
      cperson: this.cperson,
      cno1: this.cno1,
      address: this.address,
      addinfo: this.additionalinfo,
    }

    let clienttype = (this.usertype == "1") ? "Supplier" : "Customer";
    this._rest.postData("client.php", "updateClient", tmpobj).subscribe(Response => {
      this.msgtext = clienttype + " updated successfully";
      this.msgclass = "success";
      this.timercnt();
    }, error => {
      console.log(error);
      this.msgtext = clienttype + " updation failed";
      this.msgclass = "danger";
      this.timercnt();
    });
  }
}
