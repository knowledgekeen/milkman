import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  styleUrls: ['./viewstocks.component.css']
})
export class ViewstocksComponent implements OnInit {
  allstocks: any = null;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
    this.getAllStocks()
      .then(resp => {
        this.filterDataForChart(resp);
      })
  }

  getAllStocks() {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this._rest.getData("stocks.php", "getAllStocks").subscribe(Response => {
        if (Response && Response["data"]) {
          _this.allstocks = Response["data"];
          resolve(_this.allstocks);
        }
      })

    });
  }

  filterDataForChart(data) {
    let testdata: any = new Array();
    for (let i in data) {
      testdata.push({
        name: data[i].prodname,
        y: parseFloat(data[i].quantity)
      });
    }
    this.plotChart(testdata);
  }

  plotChart(data) {
    Highcharts.chart("stockchart", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      exporting: { enabled: false },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Stock Available: <b>{point.y: .2f} Lts.</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [
        {
          type: "pie",
          data: data
        }
      ]
    });
  }
}
