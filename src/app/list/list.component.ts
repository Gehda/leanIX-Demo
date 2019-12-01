import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from './list.service';
import { IRepository } from '../common/repository.interface';
import { IPageInfo } from '../common/page-info.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  repoList: IRepository[] = [];
  private _pageInfo: IPageInfo; 
  search: string = '';
  private searchDeffer: any;
  constructor(private listService: ListService) { }

  ngOnInit() {
    this._loadList('angular');
    this._initInfiniteLoading();
  }

  ngOnDestroy() {
    const main = document.querySelector('main') as HTMLElement;
    main.onscroll = undefined;
  }
  

  triggerSearch(searchStr: string) {
    if (this.searchDeffer) clearTimeout(this.searchDeffer);
    if (!searchStr) return this.repoList = [];
    this.searchDeffer = setTimeout(() => {
      this._loadList(searchStr)
    }, 500);
  }

  private _loadList(searchStr: string) {
    this.repoList = [];
    this.search = searchStr;
    this.listService.getList(searchStr).subscribe(
      res => {
        this.repoList = res.search.nodes;
        this._pageInfo = res.search.pageInfo;
      }
    )
  }

  private _initInfiniteLoading() {
    const main = document.querySelector('main') as HTMLElement;
    let _loadingNext = false;
    main.onscroll = (ev) => {
      const scrollPos = main.clientHeight + main.scrollTop;
      const scrollHeight = main.scrollHeight;
      if (scrollPos > (scrollHeight / 1.5) && !_loadingNext && this._pageInfo.hasNextPage) {
        _loadingNext = true;
        console.log("load next", this.repoList.length);
        this.listService.getList(this.search, this._pageInfo.startCursor).subscribe(
          res => {
            this._pageInfo = res.search.pageInfo;
            this.repoList.push(...res.search.nodes);
            _loadingNext = false;
          }
        )
      }
    }
  }

}
