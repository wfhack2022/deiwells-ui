import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { onGlobalMenuSection } from '../app.component';

@Component({
  selector: 'app-diversity',
  templateUrl: './diversity.component.html',
  styleUrls: ['./diversity.component.scss']
})
export class DiversityComponent implements OnInit {


   selectedCategory: string[] = [];

    graph:boolean=false;
    barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
  };
  barChartLabels: string[];
  barChartType: string = 'bar';
  barChartLegend: boolean = true; 
  barChartData: any[] = [
    { data: [], label: 'Actual' },
    { data: [], label: 'Ambition' }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
      onClick: (evt, item) => {
      this.router.navigateByUrl('/leads',{ state: { diverity:
         this.pieChartLabels[item[0]['_index']], 
         customerBase: this.pieChartLabels[item[0]['_index']] }  });
         //+ '('+ this.pieChartData[item[0]['_index']] + ')'
    }
  };
  categories: string[] = [
            'Women Led',
            'Black or African American Led', 
            'Hispanic or Latino Led', 
            'Native American or Indigenous', 
            'Asian-Pacific Americans',
            'Asian-Indian Americans',
            'LGBTQIA+',
            'Veterans',
            'Unknown'
          ];

  categoriesEnabled: boolean[] = [
    true,
    false,
    false,
    false, 
    false,
    false,
    false,
    false,
    true
  ];


  public pieChartLabels: Label[] = this.categories
  public pieChartData: SingleDataSet = [0, 0, 0, 0, 0,0, 0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

    constructor(
      private http: HttpClient, 
      private formBuilder: FormBuilder,
      private router:Router,
      private activatedRoute:ActivatedRoute,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    onGlobalMenuSection('diversity-view');
    // const data = this.getGoalData();
    //   this.barChartLabels = Object.keys(data);
    //   this.barChartLabels.forEach(label => {
    //     this.barChartData[0].data.push(data[label]['Actual']);
    //     this.barChartData[1].data.push(data[label]['Target']);
    // });
    this.http.get<[]>("http://"+ environment.serviceHost +":5000/aggregates").subscribe(response => {
      console.log(response)
      if(response && response.length>0){
        for (let diversity of response) {
          console.log(diversity)
          Object.keys(diversity).forEach((key) => {
            console.log(diversity[key]); 
            const idx = this.categories.indexOf(key);
            this.pieChartData[idx]=diversity[key];
          });
        }
        console.log(this.pieChartData);
        this.graph=true;
      }
    });
  }

  OnSelectionChange(event) {
  }
  
  onReset() {
  }

  onSearch() {
  }

  getGoalData() {
    return {
      "Women Led": {
        "Actual": "20",
        "Target": "40"
      },
      "Women Founded": {
        "Actual": "30",
        "Target": "50"
      },
      "Black African Americal Led": {
        "Actual": "20",
        "Target": "25"
      },
      "Hispanic Led": {
        "Actual": "5",
        "Target": "25"
      },
      "Differently Abled people Led": {
        "Actual": "5",
        "Target": "25"
      },
      "Sounth Asian Led": {
        "Actual": "20",
        "Target": "25"
      }
    };
  }
}
