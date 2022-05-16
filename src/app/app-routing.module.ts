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
<<<<<<< HEAD
  { path: '**', component: DiversityComponent }
=======
  { path: 'data', component: DataComponent },
  { path: '**', component: SearchComponent }
>>>>>>> f31b4ed4ee27676e3b8b1a2c0fc897288493ad20
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
