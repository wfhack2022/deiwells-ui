import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { onGlobalMenuSection } from '../app.component';

@Component({
  selector: 'app-diversity',
  templateUrl: './diversity.component.html',
  styleUrls: ['./diversity.component.scss']
})
export class DiversityComponent implements OnInit {

   categories: string[] = ['Women Led', 
                          'Women Founded', 
                          'Black African Americal Led',  
                          'Hispanic Led',
                          'Sounth Asian Led',
                          'Differently Abled people Led',
                        ];
   selectedCategory: string[] = [];


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
      console.log(item);
      console.log(this.pieChartLabels[item[0]['_index']]);
      this.router.navigateByUrl('/leads',{ state: { diverity:
         this.pieChartLabels[item[0]['_index']], 
         customerBase: this.pieChartLabels[item[0]['_index']] + ' '+ this.pieChartData[item[0]['_index']] + '%'} });
    }
  };

  public pieChartLabels: Label[] = ['Women Led', 'Women Founded', 'Black African Americal Led', 'Hispanic Led', 'Differently Abled people Led', 'Sounth Asian Led'];
  public pieChartData: SingleDataSet = [20, 30, 20, 5, 5,20];
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
    const data = this.getGoalData();
    this.barChartLabels = Object.keys(data);
    this.barChartLabels.forEach(label => {
      this.barChartData[0].data.push(data[label]['Actual']);
      this.barChartData[1].data.push(data[label]['Target']);
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
