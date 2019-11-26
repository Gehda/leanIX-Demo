import { Injectable } from '@angular/core';
import { GithubService } from '../common/github.service';
import { IPageInfo } from '../common/page-info.interface';
import { IRepository } from '../common/repository.interface';
import { LoadingService } from '../common/loading.service';

export interface IList {
  search: {
    nodes: IRepository[]
    pageInfo: IPageInfo,
    repositoryCount: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private graph: GithubService, private loading: LoadingService) { }

  getList(searchStr: string, pointer?: string) {
    this.loading.showLoading();
    const subscription$ = this.graph.getGraphQLEndpoint<IList>(
      `
    {

      search(query: "${searchStr}", type: REPOSITORY, first: 30, after: ${pointer ? '"'+pointer+'"' : null}){
        repositoryCount
        pageInfo{
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        nodes{
          ... on Repository{
            id
            nameWithOwner
            description
          }
        }
      }
    }
      `
    )

    subscription$.subscribe(this.loading.hideLoading, this.loading.hideLoading)
    return subscription$;
  }
  
}
