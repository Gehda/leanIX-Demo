import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContribution } from "../common/contribution.interface";
import { GithubService } from '../common/github.service';
import { LoadingService } from "../common/loading.service";
import { IRepository } from '../common/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService implements  Resolve<Observable<IRepository>>{
  constructor(private github: GithubService, private loading: LoadingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRepository> {
    const id = route.paramMap.get('id');
    if (!id) return of(null);
    
    return this.search(id)
      .pipe(
        map(res => {
          return res.node
        })
      )
  }

  private search(id: string) {
    this.loading.showLoading();
    const subscription$ = this.github.getGraphQLEndpoint<{node:IRepository}>(
      `
      {
        node(id: "${id}"){
          ... on Repository{
            nameWithOwner
            name
            description
            createdAt
            owner{
              avatarUrl
              login
              url
            }
            issues{
              totalCount
            }
            forks{
              totalCount
            }
            defaultBranchRef{
              name 
            }
          }
        }
      }
      `
    )

    subscription$.subscribe(this.loading.hideLoading, this.loading.hideLoading)
    return subscription$;
    

  }


  
  getContributersByReponameWithOwner(nameWithOwner: string, page: number = 1) {
  /**
   * According to this: https://stackoverflow.com/questions/55055471/how-to-query-the-top-contributors-to-a-github-repository-using-graphql
   * We can't search for user via graphql --> Use api here
   */
    return this.github.getRestGetEndpoint<IContribution[]>(`repos/${nameWithOwner}/contributors?page=${page}`)
  }

}
