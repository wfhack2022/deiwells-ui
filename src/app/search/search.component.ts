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
  position: [];
  ticker: string;
  companyUrl: string;
}


@Component({
  selector: 'app-graph',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {
  searchForm = this.formBuilder.group({
    people: '',
    company: '',
    industry: '',
    location: '',
    diversity: '',
  });

  companyDetails: Map<string, {}> = new Map();
  serviceHost: string;
  spinner: boolean = false;
  @ViewChild('cmpTbSort') cmpTbSort = new MatSort();
  // @ViewChild(MatSort) sort: MatSort;
  displayTable: boolean = false;
  queryParm: string

  ELEMENT_DATA: CompanyType[] = [

  ];

  displayedColumns: string[] = ['Company Name', 'Location', 'Diversity Dimension', 'People', 'URL'];
  dataSource;
  title: string = 'Customer Base';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar) {
    console.log(this.router.getCurrentNavigation().extras.state)

    if (this.router.getCurrentNavigation().extras.state) {
      this.title = this.router.getCurrentNavigation().extras.state['customerBase'];
      this.queryParm = this.router.getCurrentNavigation().extras.state['diverity'];
    }

  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
    });
    this.spinner=true;
    onGlobalMenuSection('leads-view');
  }

  ngAfterViewInit() {

    let url = "http://" + environment.serviceHost + ":5000/companies";
    if (this.queryParm) {
      url = "http://" + environment.serviceHost + ":5000/keywordsearch/" + this.queryParm;
    }
   
    this.http.get<[]>(url).subscribe(response => {
      if (response && response.length) {
        console.log(response.length)
        this.setCompanies(response);
      }
    });
  }

  onSearch() {
    this.spinner=true;
    this.title='Customer Base';
    let url = "http://" + environment.serviceHost + ":5000/company/" + this.searchForm.value['company'];
    if (this.searchForm.value['diversity']) {
      url = "http://" + environment.serviceHost + ":5000/keywordsearch/" + this.searchForm.value['diversity'];
    }else if(this.searchForm.value['company']==null){
      url = "http://" + environment.serviceHost + ":5000/companies";
    }

    this.ELEMENT_DATA = []
    this.dataSource = new MatTableDataSource<CompanyType>(this.ELEMENT_DATA);
    this.snackBar.open('Searching please wait..', 'Undo', {
      duration: 3000
    });

    this.http.get(url).subscribe(response => {
      console.log(response);

      const res: Array<{}> = (response as Array<{}>);
      if (res && res.length == 0) {
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
          diversity: response[i]['diversity'] ? response[i]['diversity'] : 'Unknown',
          industries: response[i]['address'] ? response[i]['industry'] : 'Unknown',
          score: 5,
          location: response[i]['address'] ? response[i]['address'].join() : '',
          about: response[i]['about'] ? response[i]['about'] : '',
          companyDetailUrl: response[i]['companyDetailUrl'] ? response[i]['companyDetailUrl'] : '',
          companyUrl: response[i]['companyurl'] ? response[i]['companyurl'].startsWith('www') ? 'https://' + response[i]['companyurl'] : response[i]['companyurl'] : '',
          people: response[i]['people'] ? this.getPeoplePostion(response[i]) : [],
          position: response[i]['position'] ? response[i]['position'] : [],
          news: [],
          ticker: response[i]['ticker'] ? response[i]['ticker'] : '',
        };
        this.companyDetails.set(response[i]['name'], companydetail);
        this.ELEMENT_DATA.push(companydetail);
      }
    }
    this.dataSource = new MatTableDataSource<CompanyType>(this.ELEMENT_DATA);
    this.dataSource.sort = this.cmpTbSort;
    this.displayTable = true;
    this.spinner = false;
  }

  getPeoplePostion(data): any {
    let people = [];
    for (let i = 0; i < data['people'].length; i++) {
      people.push(data['people'][i] + '-' + data['position'][i]);
    }
    return people;

  }

  onCompanySelect(companyName) {
    this.router.navigateByUrl('/company', { state: this.companyDetails.get(companyName.textContent) });
  }

  onReset() {
    this.title='Customer Base';
    this.spinner = false;
    this.searchForm.reset();
    this.ELEMENT_DATA = []
    this.dataSource = new MatTableDataSource<CompanyType>(this.ELEMENT_DATA);
  }

  exportTable() {
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
