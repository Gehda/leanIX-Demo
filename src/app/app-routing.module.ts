import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RepositoryService } from './repository/repository.service';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
  {
    path:'list', component: ListComponent
  },
  {
    path: 'repository/:id', component: RepositoryComponent, resolve:
    {
      repository: RepositoryService
    }
  },
  {
    path: '', redirectTo: '/list', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/list', pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
