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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchComponent,
    CompanydetailComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialAllModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
