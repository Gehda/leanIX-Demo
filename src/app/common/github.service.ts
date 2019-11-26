import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private static TOKEN = '53b36795a83555a44857fad8d7061e39063af7d2';
  private static URL = 'https://api.github.com/';
  constructor(private http: HttpClient) { }

  getGraphQLEndpoint<T>(query: string) {
    return this.http.post<{ data: T }>(GithubService.URL + 'graphql', { query: query }, {
      headers: {
        Authorization: 'bearer ' + GithubService.TOKEN
      }
    })
      .pipe(
        map(res => {
          if (res.data) {
            return res.data
          }
          return null;
        })
    )
  }

  getRestGetEndpoint<T>(uri: string) {
    return this.http.get<T>(GithubService.URL + uri, {
      headers: {
        Authorization: 'bearer ' + GithubService.TOKEN
      }
    })
  }
}
