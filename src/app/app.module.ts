import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/nav.component';

import { MaterialAllModules } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent} from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { DiversityComponent } from './diversity/diversity.component';
import { GoalsComponent } from './goals/goals.component';
import { ChartsModule } from 'ng2-charts';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchComponent,
    CompanydetailComponent,
    DiversityComponent,
    GoalsComponent,
    DataComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialAllModules,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
