import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListService } from './list.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ListComponent
  ],
  providers: [
    ListService
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
