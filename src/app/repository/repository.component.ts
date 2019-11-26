import { Component, OnInit } from '@angular/core';
import { IRepository } from '../common/repository.interface';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from './repository.service';
import { IContribution } from '../common/contribution.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  repository: IRepository;
  contributers: IContribution[] = [];
  private _page: number = 1;
  constructor(private route: ActivatedRoute, private repoService: RepositoryService) { }

  ngOnInit() {
    this.repository = this.route.snapshot.data.repository;
    this._loadContributers();
    
  }

  private _loadContributers() {
    this.repoService.getContributersByReponameWithOwner(this.repository.nameWithOwner, this._page).subscribe(res => {
      this.contributers = res
      this._initInfiniteScroll();
    })
  }

  private _initInfiniteScroll() {
    const main = document.querySelector('main');
    let _loadingNext = false;
    console.log(this.contributers.length);
    let _hasNextPage = this.contributers.length === 30 ? true : false;
    main.onscroll = (ev) => {
      const scrollPos = main.clientHeight + main.scrollTop;
      const scrollHeight = main.scrollHeight;
      if (scrollPos > (scrollHeight / 1.5) && !_loadingNext && _hasNextPage) {
        this._page++;
        _loadingNext = true;
        console.log("load next", this.contributers.length);
        this.repoService.getContributersByReponameWithOwner(this.repository.nameWithOwner, this._page)
          .subscribe(res => {
            _hasNextPage = res.length === 30;
            this.contributers.push(...res);
            _loadingNext = false;
          })
      }
    }
  }

}
