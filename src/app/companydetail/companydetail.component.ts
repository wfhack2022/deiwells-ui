import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { onGlobalMenuSection } from '../app.component';

export interface People {
  name: string;
  position: string;
}

export interface News {
  companyNews: string;
}



@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class CompanydetailComponent implements OnInit {

  links = ['People', 'Industry'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  detail: {} = {};

  PEOPLE_DATA: People[] = [];
  dataSource;
  displayedColumns: string[] = ['Name', 'Title'];

  NEWS: News[] = [];
  newsdatasource;
  newsColumns: string[] = ['News'];


  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  constructor(private router: Router) {
    this.detail = this.router.getCurrentNavigation().extras.state;
    console.log(this.detail)
    const people = this.detail['people'];
    const position = this.detail['position'];
    const news = this.detail['news'];
    if (people && position) {
      for (let i = 0; i < people.length; i++) {
        let companyPeople: People = {
          name: people[i],
          position: position[i]
        }
        this.PEOPLE_DATA.push(companyPeople);
      }
      this.dataSource = new MatTableDataSource<People>(this.PEOPLE_DATA);
    }

    this.NEWS.push({companyNews: this.detail['companyUrl']});
    if (news) {
      for (let i = 0; i < news.length; i++) {
        let companyNews: News = {
          companyNews: news[i]
        }
        this.NEWS.push(companyNews);
      }
    }
    this.newsdatasource = new MatTableDataSource<News>(this.NEWS);

  }

  ngOnInit(): void {
    onGlobalMenuSection('research-view');
  }

  onBack() {
    this.router.navigate(['/']);
  }

  tabClick(event){
    // if(event.index == 1){
    //   const hasIframe = document.getElementById('financials');
    //   if(!hasIframe){
    //     let iframe = document.createElement('iframe');
    //     iframe.setAttribute('id', 'financials');
    //     iframe.setAttribute('src', this.detail['companyDetailUrl']);
    //     iframe.setAttribute('width', '100%');
    //     iframe.setAttribute('height', '600');
    //     document.getElementById('fin').appendChild(iframe);
    //   }
    // }
  }

}
