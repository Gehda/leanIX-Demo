import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from './repository.component';
import { RepositoryService } from './repository.service';
import { AppRoutingModule } from '../app-routing.module';
import { ContributerComponent } from '../contributer/contributer.component';

@NgModule({
  declarations: [
    RepositoryComponent,
    ContributerComponent
  ],
  providers: [
    RepositoryService
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    RepositoryComponent
  ]
})
export class RepositoryModule { }
