import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';




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

  
  testdata:any = 
    [{
        about: "Stitch Fix, Inc. is an online personalized styling service company. The Company operates primarily in the United States and United Kingdom. The Company delivers one-to-one personalization to its clients through the combination of data science and human judgment. The Company serves its clients in categories, such as women's, petite, maternity, men's, kids, and plus. It uses data science throughout its business, including to style its clients, offer personalized direct buy options, predict purchase behavior, forecast demand, optimize inventory, and design new apparel. The Company leverages its data science through a custom-built, Web-based styling application. Its clients can purchase directly from its Website or mobile application based on a personalized assortment of outfit and item recommendations. The Company also provides a direct-buy offering that allows clients the flexibility of purchasing items outside of a Stitch Fix stylist (Fix).",
        address: [
            "1 Montgomery St Ste 1500",
            "SAN FRANCISCO",
            ", ",
            "CA",
            "94104-4544",
            "United States"
        ],
        industry: "Retail (Catalog & Mail Order)",
        name: "Stitch Fix Inc"
    }];

  ELEMENT_DATA: CompanyType[] = [
    // { name: 'WeWork', diversity  : 'Women Founded', industries :'Real Estate',  score: 5, location: 'New York,US'},
    // { name: 'Fast', diversity  : 'Women Founded', industries :'E-Commerence',  score: 5,  location: 'San Francisco,US'}
  ];

  displayedColumns: string[] = ['Company Name', 'Location', 'Diversity Dimension', 'Industry', 'Score'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog, 
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
    });
    this.http.get<[]>("http://"+ environment.serviceHost +":5000/companies").subscribe(response => {
      if(response && response.length){
        this.setCompanies(response);
      }
    });

  }

  ngAfterViewInit(): void {

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
          location: response[i]['address'] ? response[i]['address'][1] + ', ' + response[i]['address'][5] : '',
          about: response[i]['about'] ? response[i]['about'] : '',
          companyDetailUrl: response[i]['companyDetailUrl'] ? response[i]['companyDetailUrl'] : '',
          companyUrl: response[i]['companyUrl'] ? response[i]['companyUrl'] : '',
          people: response[i]['people'] ? response[i]['people'] : [],
          position: response[i]['position'] ? response[i]['position'] : [],
          news: response[i]['news'] ? response[i]['news'] : [].push(response[i]['companyUrl'] ? response[i]['companyUrl'] : ''),
          ticker: response[i]['ticker'] ? response[i]['ticker'] : '',
        };
        this.companyDetails.set(response[i]['name'], companydetail);
        this.ELEMENT_DATA.push(companydetail);
        this.dataSource = new MatTableDataSource<CompanyType>(this.ELEMENT_DATA);
      }
    }
  }

  onCompanySelect(companyName){
    this.router.navigateByUrl('/company', {state: this.companyDetails.get(companyName.textContent)});
  }

  onReset(){
    this.spinner=false;
    this.searchForm.reset();
  }


}
