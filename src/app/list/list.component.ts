import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { IRepository } from '../common/repository.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  repoList: IRepository[] = [];
  search: string = '';
  private searchDeffer: any;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this.loadList('angular');
  }

  triggerSearch(searchStr: string) {
    if (this.searchDeffer) clearTimeout(this.searchDeffer);
    if (!searchStr) return this.repoList = [];
    this.searchDeffer = setTimeout(() => {
      this.loadList(searchStr)
    }, 500);
  }

  private loadList(searchStr: string) {
    this.repoList = [];
    this.listService.getList(searchStr).subscribe(
      res => this.repoList = res.search.nodes
    )
  }

}
