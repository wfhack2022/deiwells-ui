import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { DataComponent } from './data/data.component';
import { DiversityComponent } from './diversity/diversity.component';
import { GoalsComponent } from './goals/goals.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: 'company', component: CompanydetailComponent},
  {path: 'leads', component: SearchComponent},
  { path: 'diversity', component: DiversityComponent },
  { path: 'research', component: CompanydetailComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'data', component: DataComponent },
  { path: '**', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
