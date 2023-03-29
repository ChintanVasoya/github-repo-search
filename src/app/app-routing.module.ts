import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReposearchComponent } from './reposearch/reposearch.component';

const routes: Routes = [
  { path: '', component: ReposearchComponent},
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
