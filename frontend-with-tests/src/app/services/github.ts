import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/response';
import { TypeOfSort, TypeOfOrder } from '../types/enums';
import { RepositoryItem } from '../models/repository';
import { IssuesItem } from '../models/issues';


@Injectable({
  providedIn: 'root'
})
class GithubService {
  private apiUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  searchRepositories(
    query: string,
    sort?: TypeOfSort,
    order?: TypeOfOrder
  ): Observable<SearchResponse<RepositoryItem>> {
     let url = `${this.apiUrl}/search/repos/`;
     url += `?q=${query}`;
     if (sort) {
       url += `&sort=${sort}`;
     }
     if (order) {
       url += `&order=${order}`;
     }

     const data = this.http.get<SearchResponse<RepositoryItem>>(url);
     return data;
  }

  searchIssues(
    query: string,
    sort?: TypeOfSort,
    order?: TypeOfOrder
  ): Observable<SearchResponse<IssuesItem>> {
    let url = `${this.apiUrl}/search/issues/`;
    url += `?q=${query}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (order) {
      url += `&order=${order}`;
    }

    const data = this.http.get<SearchResponse<IssuesItem>>(url);
    return data;
  }
}

export { GithubService, TypeOfOrder, TypeOfSort };
