import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { onGlobalMenuSection } from '../app.component';
import { TableUtil } from './TableUtil';


export interface CompanyType {
  name: string;
  industries: string;
  location: string;
  diversity: string,
  score: number;
  about: string;
  companyDetailUrl: string;
  news: [];
  people: [];
  position:[];
  ticker:string;
  companyUrl:string;
}


@Component({
  selector: 'app-graph',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {
  searchForm = this.formBuilder.group({
    people:'',
    company: '',
    industry: '',
    location: '',
    diversity: '', 
  });

  companyDetails:Map<string, {}> = new Map();
  serviceHost:string;
  spinner:boolean=false;
  @ViewChild('cmpTbSort') cmpTbSort = new MatSort();
  // @ViewChild(MatSort) sort: MatSort;
  displayTable:boolean = false;
  

  ELEMENT_DATA: CompanyType[] = [

  ];

  displayedColumns: string[] = ['Company Name', 'Location', 'Diversity Dimension', 'People', 'URL'];
  dataSource;
  title:string = 'Customer Base';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, 
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar) { 
      this.title = this.router.getCurrentNavigation().extras.state ?
                     this.router.getCurrentNavigation().extras.state['customerBase'] : this.title;
    }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
    });

    onGlobalMenuSection('leads-view');
  }

  ngAfterViewInit() {
    this.http.get<[]>("http://"+ environment.serviceHost +":5000/companies").subscribe(response => {
      if(response && response.length){
        this.setCompanies(response);
      }
    });
  }

  onSearch() {
    this.snackBar.open('Live internet search enabled..', 'Undo', {
      duration: 3000
    });
    this.spinner=true;
    this.http.get("http://"+ environment.serviceHost +":5000/company/"+this.searchForm.value['company']).subscribe(response => {
      console.log(response);
        this.spinner=false;
        const res:Array<{}> = (response as Array<{}>);
        if(res && res.length == 0){
          this.snackBar.open('Live search did not fetch any data..', 'Undo', {
            duration: 3000
          });
        }
        this.setCompanies(response);
    });

  }

  private setCompanies(response: Object) {
    for (let i in response) {
      if (response[i]['name']) {
        let companydetail: CompanyType = {
          name: response[i]['name'],
          diversity: '',
          industries:  response[i]['address'] ? response[i]['industry'] : 'Unknown',
          score: 5,
          location: response[i]['address'] ? response[i]['address'].join() : '',
          about: response[i]['about'] ? response[i]['about'] : '',
          companyDetailUrl: response[i]['companyDetailUrl'] ? response[i]['companyDetailUrl'] : '',
          companyUrl: response[i]['companyUrl'] ?  response[i]['companyUrl'].startsWith('www') ? 'https://'+response[i]['companyUrl'] : response[i]['companyUrl'] : '',
          people: response[i]['people'] ?  this.getPeoplePostion(response[i])  : [],
          position: response[i]['position'] ?  response[i]['position'] : [],
          news: response[i]['news'] ? response[i]['news'] : [].push(response[i]['companyUrl'] ? response[i]['companyUrl'] : ''),
          ticker: response[i]['ticker'] ? response[i]['ticker'] : '',
        };
        this.companyDetails.set(response[i]['name'], companydetail);
        this.ELEMENT_DATA.push(companydetail);
      }
    }
    this.dataSource = new MatTableDataSource<CompanyType>(this.ELEMENT_DATA);
    this.dataSource.sort = this.cmpTbSort;
    this.displayTable=true;
  }

  getPeoplePostion(data):any {
    let people=[];
    for(let i=0;i<data['people'].length;i++){
      people.push(data['people'][i] + '-' + data['position'][i]);
    }
    return people;

  }

  onCompanySelect(companyName){
    this.router.navigateByUrl('/company', {state: this.companyDetails.get(companyName.textContent)});
  }

  onReset(){
    this.spinner=false;
    this.searchForm.reset();
  }
  
  exportTable(){
    TableUtil.exportTableToExcel("minorityOwnedReport");
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
