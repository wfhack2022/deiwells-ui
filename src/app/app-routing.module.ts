import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: 'company', component: CompanydetailComponent},
  { path: '**', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
